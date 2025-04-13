export const extractRepresentativeImageUrlFromHTML = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const firstImage = doc.querySelector('img');
  return firstImage?.getAttribute('src') || '';
};
