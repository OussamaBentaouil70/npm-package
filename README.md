# Introduction

web3-api-package is package where you can get cryptocurrency informations and data

# Installation

``npm i web3-api-package`

# Usage

`node`

```js
const web3Api = require("web3-api-package");

web3Api.sendTransaction("from wallet adress", "to wallet adress" , "key of transaction"); //// function to make ethereum transaction
  web3Api.getBalance("pass the wallet adress here"); // get the balance of ethereum wallet
  web3Api.getPriceFeedTop10("pass the name of the coin here");
  web3Api.getCoinPriceByUsd("pass the name of the coin here");// This is a method that get any coin passed price by USD
  web3Api.getNfts(); // this is a method that shows and gets the list of NFTs
  web3Api.getCoinCalculatedPriceByUsd("pass the name of the coin here", pass the desire number here); // this is a method that calculate the price of a coin passed with the number
  web3Api.getCoinInfo("pass the name of the coin here"); // this method gives all information about the coin passed
  web3Api.getNftById();// this is a method that gets NFT by id
  web3Api.getAllCoinsInfo(); // this is a method that gives informations about all the coins
  web3Api.getAllCoinsData(); // this function returns the global data of coins
  web3Api.getCoinMarkets("pass the name of the coin here");// function to get the market of a coin





```
