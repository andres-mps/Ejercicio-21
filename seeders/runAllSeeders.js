require("dotenv").config();

async function runAllSeeders() {
  await require("./userSeeder")();
  await require("./articleSeeder")();
  await require("./commentSeeder")();
}

runAllSeeders();
