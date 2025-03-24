import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const openPaths = ['/health', '/docs'];

const client = jwksClient({
  jwksUri: process.env.COGNITO_JWKS_URI,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export const authenticate = (requiredScopes = []) => {
  return (req, res, next) => {
    if (openPaths.some(path => req.path.startsWith(path))) {
      return next();
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const verifyToken = () => {
      jwt.verify(token, getKey, {
        audience: process.env.COGNITO_CLIENT_ID,
        issuer: process.env.COGNITO_ISSUER,
        algorithms: ['RS256']
      }, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid or expired token' });
        }

        const scopes = decoded.scope ? decoded.scope.split(' ') : [];
        const hasScopes = requiredScopes.every(scope => scopes.includes(scope));
        if (!hasScopes) {
          return res.status(403).json({ error: 'Forbidden: missing required scopes' });
        }

        req.user = decoded;
        next();
      });
    };

    if (process.env.MOCK_AUTH === 'true') {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
        req.user = decoded;
        return next();
      } catch {
        return res.status(401).json({ error: 'Invalid local token' });
      }
    } else {
      verifyToken();
    }
  };
};
