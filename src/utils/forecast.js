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
        " \xB0C. The high today is " +
        body.daily.data[0].temperatureHigh +
        " with a low of " +
        body.daily.data[0].temperatureLow +
        ". There is " +
        body.currently.precipProbability +
        "% chance of rain.";
      callback(undefined, forecastInfo);
    }
  });
};

module.exports = forecast;
