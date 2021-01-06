import { generateFakeWord, generateFakeWordByLength } from 'fakelish';

function capitalLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export async function generateSentence(
  length: number,
  maxWordLength: number
): Promise<string> {
  if (length < 3) throw new Error('Sentence length cannot be less than 3');
  let str = '';
  // left 2 for twoDigitNumber and 1 so generateFakeWordByLength doesn't have to generate word with length of 1
  while (str.length < length - maxWordLength - 3) {
    str += capitalLetter(await generateFakeWord(2, maxWordLength, 3));
  }
  str += capitalLetter(
    await generateFakeWordByLength(length - str.length - 2, 3)
  );
  const twoDigitNumber = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0');
  return str.slice(0, length - 2) + twoDigitNumber;
}
