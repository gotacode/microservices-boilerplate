export class ExampleEntity {
  constructor(id, name, createdAt = new Date()) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
    };
  }
}
