// Import the necessary packages
import { LocalAccountSigner } from "@alchemy/aa-core";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactory,
} from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();

// Import the environment variables
const PRIV_KEY = process.env.PRIV_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Define the constants
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const factoryAddress = getDefaultLightAccountFactory(sepolia);
const owner = LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIV_KEY}`);
const chain = sepolia;

/**
 * @description Creates a smart contract account that can be used to send user operations.
 * @returns The smart contract account owner + provider, as a signer, that can be used to send user operations from the SCA
 */
export async function createSigner() {
  return new AlchemyProvider({
    apiKey: ALCHEMY_API_KEY,
    entryPointAddress,
    chain,
  }).connect(
    (rpcClient) =>
      new LightSmartContractAccount({
        entryPointAddress,
        chain,
        owner,
        factoryAddress,
        rpcClient,
      })
  );
}
