import fetch from "node-fetch";
import { load } from "cheerio";
//import fs from "fs";
// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};
//<video preload="none" playsinline="" aria-label="Embedded video" disablepictureinpicture="" poster="https://pbs.twimg.com/ext_tw_video_thumb/1539424270123560961/pu/img/oN8MypiEFcT2Ohws.jpg" src="blob:https://twitter.com/e9b1f89e-bc96-4d76-a91b-052bb724d05a" style="width: 100%; height: 100%; position: absolute; background-color: black; top: 0%; left: 0%; transform: rotate(0deg) scale(1.005);"></video>
// URL for data
const URL = "https://twitter.com/e9b1f89e-bc96-4d76-a91b-052bb724d05a";
// start of the program
const scrapeData = async () => {
   const rawData = await getRawData(URL);
   // parsing the data
   console.log(rawData);
   const parsedData = load(rawData);
   console.log(parsedData);
   // write code to extract the data
   // here
   // ...
   // ...
};
// invoking the main function
scrapeData();