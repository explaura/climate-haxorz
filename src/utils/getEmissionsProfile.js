const emissionProfileRanges = require("../data/emissionProfileRanges.json");

const getEmissionsProfile = (fiftyPercent, manufacturingEmissions) => {
  const totalEmissions = fiftyPercent + manufacturingEmissions;

  const profile = emissionProfileRanges.find(profile => {
    const { min, max } = profile;
    let didFindProfile = totalEmissions > min;
    if (max) {
      didFindProfile = didFindProfile && totalEmissions <= max;
    }
    return didFindProfile;
  });

  return {
    title: profile.title,
    recommendations: profile.recommendations
  };
};

module.exports = getEmissionsProfile;
