const emissionsCalculator = (instanceEmissions, PUE, CO2e, uptime) => {
  const result = (((instanceEmissions * PUE * CO2e) / 1000) * uptime).toFixed(
    1
  );
  return +result;
};

const getRunningInstanceEmissions = (
  instanceEmissionsData,
  PUE,
  CO2e,
  uptime
) => {
  const idle = emissionsCalculator(
    instanceEmissionsData["Instance @ Idle"],
    PUE,
    CO2e,
    uptime
  );

  const tenPercent = emissionsCalculator(
    instanceEmissionsData["Instance @ 10%"],
    PUE,
    CO2e,
    uptime
  );
  const fiftyPercent = emissionsCalculator(
    instanceEmissionsData["Instance @ 50%"],
    PUE,
    CO2e,
    uptime
  );
  const hundredPercent = emissionsCalculator(
    instanceEmissionsData["Instance @ 100%"],
    PUE,
    CO2e,
    uptime
  );

  return {
    idle,
    tenPercent,
    fiftyPercent,
    hundredPercent
  };
};

module.exports = getRunningInstanceEmissions;
