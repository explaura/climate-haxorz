const middy = require("@middy/core");
const validator = require("@middy/validator");

const {
  getRunningInstanceEmissions,
  getEmissionsProfile,
  getTreez
} = require("../utils");
const emissionsByAwsRegion = require("../data/awsRegions.json");
const emissionsByEc2InstanceType = require("../data/ec2InstanceEmissions.json");

const ec2InstanceEmissions = event => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const { region, instanceType, uptime } = event;
  const regionData = emissionsByAwsRegion.find(
    awsRegion => awsRegion.Region === region
  );

  if (!regionData) {
    throw { status: 422, detail: "Invalid AWS service region." };
  }
  const { PUE, CO2e } = regionData;
  const instanceEmissionsData = emissionsByEc2InstanceType.find(
    instance => instance["Instance type"] === instanceType
  );
  if (!instanceEmissionsData) {
    throw { status: 422, detail: "Invalid EC2 instance type." };
  }
  const manufacturingEmissions =
    instanceEmissionsData["Instance Hourly Manufacturing Emissions (gCO₂eq)"] *
    uptime;

  console.log("Getting emission rates for a running instance...");
  const runningInstanceEmissions = getRunningInstanceEmissions(
    instanceEmissionsData,
    PUE,
    CO2e,
    uptime
  );

  console.log("Getting eco profile...");
  const ecoProfile = getEmissionsProfile(
    runningInstanceEmissions.fiftyPercent,
    manufacturingEmissions
  );

  console.log("Getting number of treez to plant...");
  const treesToPlant = getTreez(
    runningInstanceEmissions,
    manufacturingEmissions,
    uptime
  );

  return {
    manufacturing: manufacturingEmissions,
    running: runningInstanceEmissions,
    treesToPlant,
    ecoProfile
  };
};

const schema = {
  type: "object",
  required: ["region", "instanceType"],
  additionalProperties: false,
  properties: {
    region: {
      type: "string"
    },
    instanceType: {
      type: "string"
    },
    uptime: {
      type: "number",
      minimum: 1,
      maximum: 5000
    }
  }
};

const handler = middy(ec2InstanceEmissions).use(
  validator({
    inputSchema: schema
  })
);

module.exports = { handler, ec2InstanceEmissions };
