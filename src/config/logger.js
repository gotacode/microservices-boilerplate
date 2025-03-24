import pino from 'pino';

const prettyEnvs = ['development', 'local', 'staging'];
const isPretty =
  process.env.LOG_PRETTY === 'true' ||
  prettyEnvs.includes(process.env.NODE_ENV);

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: { service: '{{dashCase name}}' },
  transport: isPretty
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      }
    : undefined,
  mixin() {
    return { traceId: global.traceId || 'no-trace' };
  }
});
