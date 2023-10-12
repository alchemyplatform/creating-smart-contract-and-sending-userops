import { parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();

import { counterfactualAddress } from "../accountInfo.json";

const PRIV_KEY = process.env.PRIV_KEY!;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL!;

async function main() {
  const account = privateKeyToAccount(`0x${PRIV_KEY}`);

  const wallet = createWalletClient({
    account: account,
    chain: sepolia,
    transport: http(ALCHEMY_API_URL),
  });

  const txHash = await wallet.sendTransaction({
    to: counterfactualAddress as `0x${string}`,
    value: parseEther("0.1"),
  });

  return txHash;
}

main().then((txHash) => {
  console.log("Transation hash: ", txHash);
});
