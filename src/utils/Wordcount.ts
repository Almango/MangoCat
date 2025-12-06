// src/utils/Wordcount.ts
// 计算文章的字数和阅读时间
// 使用来自Astro-Pure的Markdown脚本
export interface ReadingTimeResults {
  minutes: number;
  words: number;
}

// CJK character ranges
const CJK_RANGES = [
  [0x4e00, 0x9fff], // CJK Unified Ideographs
  [0x3400, 0x4dbf], // CJK Extension A
  [0x20000, 0x2a6df], // CJK Extension B
  [0x2a700, 0x2b73f], // CJK Extension C
  [0x2b740, 0x2b81f], // CJK Extension D
  [0x2b820, 0x2ceaf], // CJK Extension E
  [0xf900, 0xfaff], // CJK Compatibility Ideographs
  [0x2f800, 0x2fa1f] // CJK Compatibility Ideographs Supplement
];

// CJK punctuation ranges
const CJK_PUNCTUATION = /[\u3000-\u303F\uff00-\uffef]/;

/**
 * Checks if a character is a CJK character
 * @param {string} char - The character to check
 * @returns {boolean} - Returns true if the character is CJK, otherwise false
 */
function isCJK(char: string): boolean {
  const code = char.charCodeAt(0);
  return CJK_RANGES.some(([start, end]) => code >= start && code <= end);
}


export async function readingTime(markdown: string = '', wordsPerMinute: number = 200): Promise<ReadingTimeResults> {
  let words = 0;
  let inWord = false;

  for (let i = 0; i < markdown.length; i++) {
    const char = markdown[i];
    if (isCJK(char)) {
      words++;
      // Skip following CJK punctuation
      while (i + 1 < markdown.length && CJK_PUNCTUATION.test(markdown[i + 1])) {
        i++;
      }
      inWord = false; // reset inWord after counting a CJK character
    } else if (/\S/.test(char)) {
      if (!inWord) {
        words++;
        inWord = true; // mark that we are inside a word
      }
    } else {
      inWord = false; // reset inWord on whitespace
    }
  }

  const minutes = Math.ceil(words / wordsPerMinute);

  return {
    minutes,
    words,
  };
}
