import tr from "../constants/tr.json";

const langs = {
  tr,
};

export default function (lang) {
  if (lang === "en") return { type: "en" };
  return langs[lang];
}
