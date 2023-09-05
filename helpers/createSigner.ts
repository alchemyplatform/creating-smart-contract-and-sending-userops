import {
  type SimpleSmartAccountOwner,
  SimpleSmartContractAccount,
  SmartAccountProvider,
} from "@alchemy/aa-core";
import { privateKeyToAccount } from "viem/accounts";
import { toHex } from "viem/utils";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();

const PRIV_KEY = process.env.PRIV_KEY!;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL!;

const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

export default async function createSigner() {
  const account = privateKeyToAccount(`0x${PRIV_KEY}`);

  const owner: SimpleSmartAccountOwner = {
    signMessage: async (msg) =>
      account.signMessage({
        message: {
          raw: toHex(msg),
        },
      }),
    getAddress: async () => account.address,
  };

  const chain = sepolia;
  const provider = new SmartAccountProvider(
    ALCHEMY_API_URL,
    ENTRYPOINT_ADDRESS,
    chain,
    undefined,
    {
      txMaxRetries: 10,
      txRetryIntervalMs: 5000,
    }
  );

  const signer = provider.connect(
    (rpcClient) =>
      new SimpleSmartContractAccount({
        entryPointAddress: ENTRYPOINT_ADDRESS,
        chain,
        owner,
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        rpcClient,
      })
  );

  return signer;
}
