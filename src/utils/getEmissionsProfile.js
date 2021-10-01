const emissionProfileRanges = require("../data/emissionProfileRanges.json");

const getEmissionsProfile = (fiftyPercent, manufacturingEmissions) => {
  const totalEmissions = fiftyPercent + manufacturingEmissions;

  const profile = emissionProfileRanges.find(profile => {
    const { min, max } = profile;
    return totalEmissions > min && totalEmissions <= max;
  });

  return {
    title: profile.title,
    recommendations: profile.recommendations
  };
};

module.exports = getEmissionsProfile;
