const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define pathd for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup hanldebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Prasanna Datha"
  }); // Looks up into the view folder in the root of the application for index page
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Prasanna Datha"
  }); // Looks up into the view folder in the root of the application for about page
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Prasanna Datha"
  }); // Looks up into the view folder in the root of the application for about page
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Prasanna Datha",
    message: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Prasanna Datha",
    message: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
