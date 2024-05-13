// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const lock = await hre.ethers.deployContract("Contract");

  await lock.waitForDeployment();

  console.log(
    `Lock with ETH and unlock timestamp deployed to ${lock.target}`
  );
  // const Transactions = await hre.ethers.getContractFactory("Contract");
  // const transactions = await Transactions.deploy({
  //   gasPrice: hre.ethers.utils.parseUnits("10", "gwei"),
  //   gasLimit: 3000000, // Adjust the gas limit as needed
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
