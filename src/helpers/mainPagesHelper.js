const MainPagesHelper = {
  FormatCities: (cities) => {
    if (cities === null) return [{ text: "Choose", id: 0 }];

    let formattedCities = [];
    cities.forEach((city) =>
      formattedCities.push({ text: city.label, id: city.value })
    );
    return formattedCities;
  },
};
export default MainPagesHelper;
