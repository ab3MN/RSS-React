import { CharacterData } from '@/types/Characker.type';

export const getCharactersFileData = (characters: CharacterData[]): string => {
  const data = characters.reduce((acc, next, i): string => {
    let fileData = acc;

    const { name, hair_color: hair, eye_color: eye, birth_year: birth, planet, url } = next;

    fileData += `${i + 1}.Character: ${name}\n`;
    fileData += `Hair: ${hair === 'n/a' ? 'unknown' : hair}\n`;
    fileData += `Eye: ${eye}\n`;
    fileData += `Birthday: ${birth}\n`;
    fileData += `Homeworld: ${planet}\n`;
    fileData += `Details : ${url}\n`;

    fileData += `___________________________________________________________________________________________________\n \n`;

    return fileData;
  }, '');

  return `Selected characters:\n \n${data}`;
};
