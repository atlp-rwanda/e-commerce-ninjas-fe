/* eslint-disable */
export function truncateString(str: string , maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.substring(0, maxLength) + "...";
    }
}



export function formatTextToParagraph(text) {
    const maxCharLimit = 200;
    let paragraphs = [];
    const words = text.split(' ');
  
    let currentParagraph = '';
  
    words.forEach((word) => {
      if ((currentParagraph + word).length > maxCharLimit) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = `${word} `;
      } else {
        currentParagraph += `${word} `;
      }
    });
    if (currentParagraph.trim()) {
      paragraphs.push(currentParagraph.trim());
    }
    return paragraphs.join('\n\n');
  }
