import express from "express";
import axios from "axios";

// Create an express app and set the port number.
const app = express();
const port = 3000;

// Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
  try {
    // get a random secret
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    // display the secret and the username of the secret.
    res.render("index.ejs", {
      secret: response.data.secret,
      user: response.data.username,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

// Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
