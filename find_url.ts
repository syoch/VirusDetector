export function findUrls(text: string): string[] {
  const regex = /http(s?):\/\/[^\s]*/gm;
  const matches = [...text.matchAll(regex)];
  return matches.map(match => match[0]);
}