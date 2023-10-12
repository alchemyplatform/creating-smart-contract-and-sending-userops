import {
  EthersProviderAdapter,
  convertWalletToAccountSigner,
} from "@alchemy/aa-ethers";
import { Network, Alchemy } from "alchemy-sdk";
import { sepolia } from "viem/chains";

import { Wallet } from "@ethersproject/wallet";
import { getChain } from "@alchemy/aa-core";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactory,
} from "@alchemy/aa-accounts";

const PRIV_KEY = process.env.PRIV_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const factoryAddress = getDefaultLightAccountFactory(sepolia);

/**
 * @description Creates a smart contract account that can be used to send user operations.
 * @returns The smart contract account owner + provider, as a signer, that can be used to send user operations from the SCA
 */
export async function createSigner() {
  const alchemy = new Alchemy({
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
  });
  const provider = await alchemy.config.getProvider();

  const owner = new Wallet(PRIV_KEY);

  const accountOwner = convertWalletToAccountSigner(owner);

  const signer = EthersProviderAdapter.fromEthersProvider(
    provider,
    entryPointAddress
  ).connectToAccount(
    (rpcClient) =>
      new LightSmartContractAccount({
        entryPointAddress,
        chain: getChain(provider.network.chainId),
        owner: accountOwner,
        factoryAddress,
        rpcClient,
      })
  );

  return signer;
}
