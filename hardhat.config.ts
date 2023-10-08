import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "hardhat-prettier";

dotenv.config();

const { MNEMONIC, MNEMONIC_GANACHE } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: MNEMONIC,
        accountsBalance: "2000000000000000000000",
      },
    },
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      chainId: 5777,
      accounts: {
        mnemonic: MNEMONIC_GANACHE,
      },
    },
  },
  paths: {
    deployments: "./deployments",
  },
  contractSizer: {
    alphaSort: false,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  typechain: {
    outDir: "./typechain",
    target: "ethers-v6",
  },
};

export default config;
