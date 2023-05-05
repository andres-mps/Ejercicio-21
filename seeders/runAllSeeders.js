require("dotenv").config();

async function runAllSeeders() {
  await require("./articleSeeder")();
  await require("./userSeeder")();
}

runAllSeeders();
