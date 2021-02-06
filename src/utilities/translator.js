import Dictionary from "./dictionary";
import React from "react";

class Translator extends React.PureComponent {
  translateWord(word) {
    const lang = "tr";
    const languageDB = Dictionary(lang);
    if (word in languageDB.words) {
      return languageDB.words[word];
    }
    return word;
  }

  render() {
    const { children } = this.props;
    const lang = "tr";
    if (typeof children === "string" && lang !== "en") {
      return this.translateWord(children.toLowerCase());
    }

    return children;
  }
}
export default Translator;
