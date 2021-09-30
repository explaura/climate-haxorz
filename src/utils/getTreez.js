const TREE_CONVERSION_FACTOR = 0.23314;

const getNumberOfTreesToPlant = (
  runningInstanceEmissions,
  manufacturingEmissions,
  uptime
) => {
  const runningInstanceCapacities = [
    "idle",
    "tenPercent",
    "fiftyPercent",
    "hundredPercent"
  ];

  const treesToPlantForAllCapacities = {};
  runningInstanceCapacities.forEach(capacity => {
    const totalEmissionsPerHour =
      (runningInstanceEmissions[capacity] + manufacturingEmissions) / uptime;
    const treesToPlant = (
      totalEmissionsPerHour *
      TREE_CONVERSION_FACTOR *
      uptime
    ).toFixed(1);
    treesToPlantForAllCapacities[capacity] = +treesToPlant;
  });
  return treesToPlantForAllCapacities;
};

module.exports = getNumberOfTreesToPlant;
