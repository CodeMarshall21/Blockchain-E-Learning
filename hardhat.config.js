require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/3Q9SY1dvlnVXei-8M08s-NClcrdYdFco',
      accounts:['127037f56cf46c647d49500abb600df0ac371f3febf3cc0916ffff106b26a6aa']
    }
  }
};
