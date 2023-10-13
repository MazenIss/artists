# Artist Search API

This Node.js application allows you to search for an artist by name and write the results to a CSV file. If no results are found for the given artist name, it retrieves random artist names from a JSON dictionary source file.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [API Documentation](#api-documentation)
- [Deployment](#Deployment)


## Getting Started

You can run this app either in a docker container using the Dockerfile or you can run it on your host environment.
In addition the app is hosted on azure and you can try it here: https://artist-search.azurewebsites.net/

## Prerequisites

To run the app locally, you'll need to have Node.js installed. 
Then clone this repository : https://github.com/MazenIss/artists.git and install dependenices using npm i .
In addition create a .env file in the project root and set these variables:
        API_KEY=<api_key>
        API_BASE_URL=http://ws.audioscrobbler.com/2.0/

## API Documentation


**Request**

- **Method:** GET
- **URL:** `/artist`
- **Request Body:**
  - `artist_name` (string, required): The name of the artist you want to search for
  - `file_name` (string, required): The name of the CSV file where the results will be saved
-**Exemple:** 
    GET http://localhost:3000/artist
        Content-Type: application/json
        {
        "artist_name": "Artist Name",
        "file_name": "output.csv"
        }

**Response**
  - If artist results are found it will return 200 as status code with the following message: "A file with the name output has been successfully created with the search result"
  - If no results are found it will return 200 as status code with an array of random artists names with the following message: "No artists were found with the given name, a random artists list is returned"


## Deployment

I used azure app services to delpoy this app:

- https://artist-search.azurewebsites.net/

