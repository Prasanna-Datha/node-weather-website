const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/f9485b5f409802f38618cf4cafa4a16e/" +
    encodeURIComponent(latitude + "," + longitude) +
    "?units=si"; // &lang=kn

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to fine location!");
    } else {
      const forecastInfo =
        body.daily.data[0].summary +
        " It is currently " +
        body.currently.temperature +
        " \xB0C. There is " +
        body.currently.precipProbability +
        "% chance of rain.";
      callback(undefined, forecastInfo);
    }
  });
};

module.exports = forecast;
/* const url =
  "https://api.darksky.net/forecast/f9485b5f409802f38618cf4cafa4a16e/37.8267,-122.4233?units=si"; // &lang=kn

request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service!");
  } else if (response.body.error) {
    console.log("Unable to fine location!");
  } else {
    const currently = response.body.currently;
    const daily = response.body.daily;
    console.log(
      "%s It is currently %f \xB0C. There is %f% chance of rain.",
      daily.data[0].summary,
      currently.temperature,
      currently.precipProbability
    );
  }
}); */
