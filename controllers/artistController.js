const artistService = require("../services/artistService");

exports.searchArtist = async function (req, res) {
  const data = req.body;
  const artistName = data.artist_name;
  const fileName = data.file_name;

 //validating data
  if (!artistName || !fileName) {
    res.status(400).send({
      error: "Both artist name and file name are required",
    });
    return;
  }


  const fileNamePattern = /^[\w\-. ]+$/;
  if (!fileNamePattern.test(fileName)) {
    res.status(400).send({
      error: "Invalid file name. Please provide a valid name",
    });
    return;
  }

  //fetching data from api
  let artistData;
  try {
    artistData = await artistService.fetchArtistByName(artistName);
  } catch (error) {
    res.status(500).send({
      error: "Error occurred while fetching artist data",
    });
    return;
  }

  // no result returned from api -> generate random list
  if (artistData.length === 0) {
    let artistNames;
    try {
      artistNames = await artistService.fetchFromJson();
    } catch (error) {
      res.status(500).send({
        error: "Error occured while reading random artist names",
      });
      return;
    }
    res.status(200).send({
      message:
        "No artists were found with the given name, a random artists list is returned",
      artists: artistNames,
    });

  } else {

    // write to csv api result
    try {
      await artistService.writeToCsv(artistData, fileName);
    } catch (error) {
      res.status(500).send({
        error: "Error occured while writing to csv",
      });
      return;
    }

    res.status(200).send({
      message: `A file with the name ${fileName} has been successfully created with the search result`
    });
  }
};
