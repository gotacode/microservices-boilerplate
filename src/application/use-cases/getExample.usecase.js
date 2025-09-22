export class GetExampleUseCase {
  constructor(exampleRepository) {
    this.exampleRepository = exampleRepository;
  }

  async execute({ id }) {
    if (!id) {
      throw new Error('Example id is required');
    }

    const entity = await this.exampleRepository.findById(id);

    if (!entity) {
      throw new Error(`Example with id ${id} not found`);
    }

    return entity.toDTO();
  }
}
