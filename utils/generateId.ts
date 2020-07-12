import { generateFakeWord } from 'fakelish';

function capitalLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export async function generateSentence(length: number, maxLen: number): Promise<string> {
  let str = '';
  while (str.length < length) {
    str += capitalLetter(await generateFakeWord(2, maxLen, 3));
  }
  return str;
}
