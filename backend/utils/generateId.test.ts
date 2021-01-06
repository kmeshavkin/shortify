import { generateSentence } from './generateId';

describe('generateId.ts', () => {
  test('Should return link of correct length', async () => {
    const shortSentence = await generateSentence(5, 2);
    const mediumSentence = await generateSentence(10, 5);
    const longSentence = await generateSentence(20, 7);
    expect(shortSentence.length).toEqual(5);
    expect(mediumSentence.length).toEqual(10);
    expect(longSentence.length).toEqual(20);
  });

  test('Should always end with two digits', async () => {
    const regex = /[a-zA-Z]\d{2}$/;

    const shortSentence = await generateSentence(5, 2);
    const mediumSentence = await generateSentence(10, 5);
    const longSentence = await generateSentence(20, 7);
    expect(regex.test(shortSentence)).toEqual(true);
    expect(regex.test(mediumSentence)).toEqual(true);
    expect(regex.test(longSentence)).toEqual(true);
  });

  test('Should correctly limit word size', async () => {
    const longSentence = await generateSentence(100, 7);
    const wordArray = longSentence.match(/[A-Z][a-z]*/g); // split words by capital letter
    expect(wordArray.every((word) => word.length <= 7)).toEqual(true);
  });

  test('Should throw for length less than 3', async () => {
    await expect(generateSentence(2, 2)).rejects.toThrow();
  });
});
