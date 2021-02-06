const MainPagesHelper = {
  FormatCities: (cities) => {
    let formattedCities = [];
    cities.forEach((city) =>
      formattedCities.push({ text: city.label, id: city.value })
    );
    return formattedCities;
  },
};
export default MainPagesHelper;
