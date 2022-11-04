import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
dotenv.config();
const { API_URL, SECRET_KEY } = process.env;

const METAMASK_SECRET_KEY = SECRET_KEY;
const GOERLI_URL = API_URL;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    goerli: {
      url: GOERLI_URL,
      accounts: [`${METAMASK_SECRET_KEY}`],
    },
  },
};

export default config;
