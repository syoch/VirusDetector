export function findUrls(text: string): string[] {
  const regex = /http(s?):\/\/[^\s]*/gm;
  const ignore = /http(s?):\/\/discord\.(com\/invite|gg)\//gm;

  const matches = [...text.matchAll(regex)];
  return matches
    .map(match => match[0])
    .filter(a => !a.match(ignore));
}