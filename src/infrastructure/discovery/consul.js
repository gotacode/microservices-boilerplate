import Consul from 'consul';

const consul = new Consul();

export default async function registerService() {
  try {
    const serviceId = `example-service-${process.pid}`;
    await consul.agent.service.register({
      name: 'example-service',
      id: serviceId,
      address: 'localhost',
      port: parseInt(process.env.PORT || '3000'),
      check: {
        http: `http://localhost:${process.env.PORT || 3000}/health`,
        interval: '10s'
      }
    });
  } catch (error) {
    console.error('Consul registration failed', error);
  }
}
