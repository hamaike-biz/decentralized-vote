# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# 投票君

.env を作成し、下記を追加すること
```
API_URL="デプロイエンドポイントURL（infra）"
SECRET_KEY="Metamask などからエクスポートした秘密鍵"
```

コントラクトのコンパイル
```
npx hardhat compile
```

ローカルネットワークにデプロイ
```
npx hardhat run scripts/deploy.ts --network localhost
```

goerli ネットワークにデプロイ
```
cd dapp
npx hardhat run --network goerli scripts/deploy.ts
```

