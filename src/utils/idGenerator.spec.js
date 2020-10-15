import idGenerator from './idGenerator';

const ID_GENERATOR_LENGTH = 10;

describe('idGenerator', () => {
  it(`should generate with ${ID_GENERATOR_LENGTH} characters`, () => {
    expect(idGenerator().length).toBe(ID_GENERATOR_LENGTH);
  });

  it('should generate unique id', () => {
    const firstGeneratedId = idGenerator();
    expect(firstGeneratedId.length).toBe(ID_GENERATOR_LENGTH);

    const secondGeneratedId = idGenerator();
    expect(secondGeneratedId.length).toBe(ID_GENERATOR_LENGTH);
    expect(secondGeneratedId).not.toBe(firstGeneratedId);
  });
});
