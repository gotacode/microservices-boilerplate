import { ExampleEntity } from '../../domain/entities/example.entity.js';

const EXAMPLES = new Map([
  [
    '123',
    {
      name: 'Example name',
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
    },
  ],
]);

export class InMemoryExampleRepository {
  async findById(id) {
    const record = EXAMPLES.get(id);

    if (!record) {
      return null;
    }

    return new ExampleEntity(id, record.name, record.createdAt);
  }
}

