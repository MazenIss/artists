const axios = require("axios");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const path = require("path");

require("dotenv").config();

async function fetchArtistByName(artistName) {
  const api_key = process.env.API_KEY;
  const api_base_url=process.env.API_BASE_URL;
  let page = 1;
  let allArtists = [];
  console.log("fetching page number :");
  while (true) {
    const url = `${api_base_url}?method=artist.search&artist=${artistName}&api_key=${api_key}&format=json&page=${page}&limit=300`;
    const response = await axios.get(url);
    const artistsByPage = response.data.results.artistmatches.artist;

    if (artistsByPage.length === 0) {
      break;
    }

    allArtists = allArtists.concat(artistsByPage);
    console.log(page);
    page++;
  }

  return allArtists;
}

async function writeToCsv(data, file_name) {
  const modifiedData = data.map((artist) => ({
    name: artist.name,
    mbid: artist.mbid,
    url: artist.url,
    image_small: artist.image.find((img) => img.size === "small")["#text"],
    image: JSON.stringify(artist.image),
  }));

  if (!file_name.endsWith(".csv")) {
    file_name += ".csv";
  }
  const csvDirectory = path.join(__dirname, '..', 'csv'); 
  const filePath = path.join(csvDirectory, file_name);

  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: "name", title: "Name" },
      { id: "mbid", title: "MBID" },
      { id: "url", title: "URL" },
      { id: "image_small", title: "Image Small" },
      { id: "image", title: "Image" },
    ],
  });

  try {
    await csvWriter.writeRecords(modifiedData);
    console.log(`CSV file saved at ${filePath}`);
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("An error occurred while writing to the CSV file");
  }
}

async function fetchFromJson() {
  const filePath = "names.json";
  const size = Math.floor(Math.random() * 5) + 5;
  let names = [];
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const namesArray = JSON.parse(data).artists;
    for (let i = 0; i < size; i++) {
      names.push(namesArray[Math.floor(Math.random() * namesArray.length)]);
    }
    return names;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

module.exports = {
  fetchArtistByName,
  writeToCsv,
  fetchFromJson,
};
