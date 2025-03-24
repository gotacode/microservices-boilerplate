#!/bin/bash
echo "Generating development JWT..."

HEADER=$(echo -n '{"alg":"HS256","typ":"JWT"}' | base64 | tr -d '=' | tr '/+' '_-' )
PAYLOAD=$(echo -n '{"sub":"user123","email":"user@local.dev","role":"developer"}' | base64 | tr -d '=' | tr '/+' '_-' )
SECRET=${1:-local-secret}

SIGNATURE=$(echo -n "$HEADER.$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" -binary | base64 | tr -d '=' | tr '/+' '_-' )

echo "$HEADER.$PAYLOAD.$SIGNATURE"
