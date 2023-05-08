require("dotenv").config();

async function runAllSeeders() {
  await require("./userSeeder")();
  await require("./articleSeeder")();
}

runAllSeeders();
