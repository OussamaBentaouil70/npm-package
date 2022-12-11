const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const fetch = require("node-fetch");
const Web3 = require("web3");
const app = express();

// this is a function that gets the top 10 coins in the market
async function getPriceFeedTop10(coin) {
  try {
    const siteUrl = "https://coinmarketcap.com/";
    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });
    const $ = cheerio.load(data);
    const elemSelector =
      "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-853bfcae-1.eibzVK > table > tbody > tr";
    const keys = [
      "rank",
      "name",
      "price",
      "1h",
      "24h",
      "7d",
      "marketCap",
      "volume",
      "circulatingSupply",
    ];
    const coinArray = [];
    $(elemSelector).each((parentIdx, parentElem) => {
      let keyIdx = 0;
      const coinObj = {};
      if (parentIdx <= 9) {
        $(parentElem)
          .children()
          .each((childIdx, childElem) => {
            let tdValue = $(childElem).text();
            if (keyIdx === 1 || keyIdx === 6) {
              tdValue = $("p:first-child", $(childElem).html()).text();
            }
            if (tdValue) {
              coinObj[keys[keyIdx]] = tdValue;
              keyIdx++;
            }
          });
      }
      coinArray.push(coinObj);
    });
    try {
      const found = coinArray.find((elem) => elem.name == coin);
      console.log(found);
      return found;
    } catch (err) {
      console.log("the coin dosnt existe!");
    }
  } catch (err) {
    console.error(err);
  }
}

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/e92e672e21214da7a7f7ab732e19f171"
);
const web3 = new Web3(provider);
// This is a method that get any coin passed price by USD
getCoinPriceByUsd = async (coin) => {
  const result = await fetch(`https://api.coincap.io/v2/assets/${coin}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(`the ${coin} price by USD is: ${data.data.priceUsd}$`);
      return data.data.priceUsd;
    })
    .catch((err) => console.error(err));
};
// this is a method that shows and gets the list of NFTs
getNfts = async () => {
  const result = await fetch(`https://api.coingecko.com/api/v3/nfts/list?`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.error(err));
};
// this is a method that gets NFT by id
getNftById = async (id) => {
  const result = await fetch(`https://api.coingecko.com/api/v3/nfts/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.error(err));
};
// this is a method that calculate the price of a coin passed with the number

getCoinCalculatedPriceByUsd = async (coin, num) => {
  var api;
  const result = await fetch(`https://api.coincap.io/v2/assets/${coin}`)
    .then((res) => res.json())
    .then((data) => {
      api = data;
    })
    .catch((err) => console.error(err));
  //   console.log(api.data.priceUsd);
  const reponse = num * api.data.priceUsd;
  console.log(`the ${coin} value of the entered number by usd is: ${reponse}$`);
  return reponse;
};
// this method gives all information about the coin passed
getCoinInfo = async (coin) => {
  const result = await fetch(`https://api.coincap.io/v2/assets/${coin}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => console.error(err));
};

// this is a method that gives informations about all the coins
getAllCoinsInfo = async () => {
  const result = await fetch(`https://api.coincap.io/v2/assets?page=1`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => console.error(err));
};
// this function returns the global data of coins
getAllCoinsData = async () => {
  const result = await fetch(`https://api.coingecko.com/api/v3/global`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => console.error(err));
};
// function to get the market of a coin
getCoinMarkets = async (coin) => {
  const result = await fetch(`https://api.coincap.io/v2/assets/${coin}/markets`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => console.error(err));
};
// get the balance of ethereum wallet
function getBalance(adress) {
  web3.eth.getBalance(adress).then((balance) => {
    console.log("the balance of the entered wallet is : " + balance + " ETH");
    return balance;
  });
}
// function to make ethereum transaction
async function sendTransaction(from_adress, to_adress, privateKey) {
  var value = web3.utils.toWei("0.1", "ether");
  var SignedTransaction = await web3.eth.accounts.signTransaction(
    {
      from: from_adress,
      to: to_adress,
      value: value,
      gas: 2000000,
    },
    privateKey
  );
  web3.eth
    .sendSignedTransaction(SignedTransaction.rawTransaction)
    .then((receipt) => {
      console.log(receipt);
    });
}
module.exports = {
  sendTransaction,
  getBalance,
  getPriceFeedTop10,
  getCoinPriceByUsd,
  getNfts,
  getCoinCalculatedPriceByUsd,
  getCoinInfo,
  getNftById,
  getAllCoinsInfo,
  getAllCoinsData,
  getCoinMarkets,
};
