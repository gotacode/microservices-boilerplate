import { ExampleEntity } from '../../domain/entities/example.entity.js';

export class GetExampleUseCase {
  async execute() {
    const entity = new ExampleEntity('123', 'Example name');
    return {
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
    };
  }
}
