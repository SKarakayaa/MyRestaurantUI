import Dictionary from "./dictionary";

export const TranslatePlaceholder = (word, lang) => {
  const languageDB = Dictionary(lang);
  if (word.toLowerCase() in languageDB.words) {
    return languageDB.words[word.toLowerCase()];
  }
  return word;
};
