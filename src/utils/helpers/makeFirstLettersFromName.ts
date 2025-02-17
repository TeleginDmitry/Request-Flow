export function makeFirstLettersFromName(name: string) {
  let result = "";

  const arrayOfWords = name.split(" ");

  arrayOfWords.forEach((word) => {
    const firstLetter = word[0];

    result += `${firstLetter}`;
  });

  return result;
}
