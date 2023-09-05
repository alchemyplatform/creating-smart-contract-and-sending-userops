import { createSigner } from "./createSigner";
import { parseEther } from "ethers";

const ADDR = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // replace with the adress you want to send SepoliaETH to, unless you want to send ETH to Vitalik :)

/**
 * @description Creates a smart contract account, and sends ETH to the specified address (could be an EOA or SCA)
 * @note We will only be returning the user operation result, and not waiting for the transaction to be mined.
 * The transaction will be mined in the background, and the user operation result will be returned immediately.
 */
export async function main() {
  const signer = await createSigner();

  const amountToSend = parseEther("0.0001");

  const result = await signer.sendUserOperation({
    target: ADDR,
    data: "0x",
    value: amountToSend,
  });

  return result;
}

main()
  .then((result) => {
    console.log("User operation result: ", result);
  })
  .catch((err) => {
    console.error("Error: ", err);
  })
  .finally(() => {
    console.log("\n--- DONE ---");
  });
