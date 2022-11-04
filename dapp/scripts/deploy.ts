import { ethers } from "hardhat";

async function main() {
  const VoteStore = await ethers.getContractFactory("VoteStore");
  const eth = ethers.utils.parseEther("0.01");
  const vote = await VoteStore.deploy({
    // value: eth,
  });

  // デプロイ完了まで待機する
  await vote.deployed();

  // デプロイされたアドレスを出力
  // これは フロントエンドで接続するための情報として必要
  console.log("VoteStore was deployed to:", vote.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
