const express = require('express');
const artistController=require("../controllers/artistController");
const router = express.Router();




router.get('/artist',artistController.searchArtist);

router.get('/',(req, res) => {
    res.status(200).json({ message: "Welcome To the app, use the following endpoint `GET /artist " });
  })

module.exports = router;
