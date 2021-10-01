const { handler } = require("../src/handlers/ec2EmissionsCalculator");

(async () => {
  try {
    const result = await handler({
      region: "us-east-2",
      instanceType: "a1.medium",
      uptime: 1300
    });
    console.log("[RESULT]:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.log("[ERROR]:", JSON.stringify(error, null, 2));
  }
})();
