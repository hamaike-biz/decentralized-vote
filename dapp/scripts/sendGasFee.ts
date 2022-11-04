import { ethers } from "hardhat";

async function main() {
  const transactionSend = {
    to: "0x24A9df4FE8d10633d5E2B4243DD9CCE8DcF17e83",
    value: ethers.utils.parseEther("100.0"),
  };

  const [account] = await ethers.getSigners();
  await account.sendTransaction(transactionSend);
  console.info("success");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
