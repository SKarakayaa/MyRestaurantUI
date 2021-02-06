import Dictionary from "./dictionary";

export const TranslatePlaceholder = (word) => {
  const lang = "tr";
  const languageDB = Dictionary(lang);
  if (lang !== "en") {
    if (word.toLowerCase() in languageDB.words) {
      return languageDB.words[word.toLowerCase()];
    }
  }

  return word;
};
