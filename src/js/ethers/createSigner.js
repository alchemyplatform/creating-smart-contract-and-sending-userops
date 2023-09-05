import {
  EthersProviderAdapter,
  convertWalletToAccountSigner,
} from "@alchemy/aa-ethers";
import { Network, Alchemy } from "alchemy-sdk";

import { Wallet } from "ethers";
import { SimpleSmartContractAccount, getChain } from "@alchemy/aa-core";

const PRIV_KEY = process.env.PRIV_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

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
    ENTRYPOINT_ADDRESS
  ).connectToAccount(
    (rpcClient) =>
      new SimpleSmartContractAccount({
        entryPointAddress: ENTRYPOINT_ADDRESS,
        chain: getChain(provider.network.chainId),
        owner: accountOwner,
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        rpcClient: rpcClient,
      })
  );

  return signer;
}
