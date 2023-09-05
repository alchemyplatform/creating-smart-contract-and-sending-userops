# Creating a Smart Contract Account and sending ETH

This repository serves as the codebase for Alchemy's Creating a Smart Contract Account and sending ETH [tutorial](https://docs.alchemy.com/docs/creating-a-smart-contract-account-and-sending-userops). This tutorial walks you through creating a smart contract account (SCA) using Alchemy AA-SDK and executing transactions (such as sending ETH) from the SCA to another SCA or an Externally Owned Account (EOA).

We've structured this project to implement the process in four different ways:

- Using TypeScript with AA-core
- Using JavaScript with AA-core
- Using TypeScript with AA-ethers
- Using JavaScript with AA-ethers

## Prerequisites

You will need the latest recommended [Node](https://nodejs.org/en) version v18.16.1 to use this repository.

To check which version you have, run the following in your preferred terminal:

```
node -v
```

If v18.16.1 appears, you are ready to use the repository! If it does not, the best way to install and change your node versions is through [Node Version Manager](https://github.com/nvm-sh/nvm#intro)

Click the above link to install nvm if you do not already have it. Then run the following command.

```
nvm install 18.16.1
node -v
```

In your terminal, you should now see

```
Now using node v18.16.1 (npm v9.5.1)
v18.16.1
```

## Setup

Clone the repository and install the dependencies:

```
git clone https://github.com/alchemyplatform/creating-smart-contract-and-sending-userops.git
cd creating-smart-contract-and-sending-userops
npm install
```

Then create your `.env` file based on `.env.example`.

Once you have created and populated your `.env`, run the following commands

```
npm run getCFaddress
npm run sendETH
```

The first command executes [getCounterfactual.ts](https://github.com/alchemyplatform/creating-smart-contract-and-sending-userops/blob/main/scripts/getCounterfactual.ts) to fetch the counterfactual address. The second command executes [sendETHToSCA.ts](https://github.com/alchemyplatform/creating-smart-contract-and-sending-userops/blob/main/scripts/sendEthToSCA.ts) to send ETH from your EOA to the SCA.

## Explaining the Scripts

Let's briefly review the files within the [Scripts](https://github.com/alchemyplatform/creating-smart-contract-and-sending-userops/tree/main/scripts) folder.

#### getCounterfactual.ts

- retrieves the counterfactual address derived from [CREATE2](https://eips.ethereum.org/EIPS/eip-1014) and saves in the `accountInfo.json` file, which will be created the first time you this file is executed.

#### sendEthToSCA.ts

- sends ETH from your EOA to your SCA. The `to` address is your counterfactual address.

## Executing the code

The respective index file in the relevant combination (TypeScript/JavaScript, core/ethers) will be executed depending on which command you run. They each accomplish the same goal, creating a SCA and sending ETH from it - only the methodology differs.

The four main commands are:

- `npm run execute:ts-core`
- `npm run execute:ts-ethers`
- `npm run execute:js-core`
- `npm run execute:js-ethers`
