const express = require("express");
const app = express();
const geoip = require("geoip-lite");
const axios = require("axios");

app.get("/api/hello", (req, res) => {
  const visitorName = req.query.visitor_name;
  const userIp = String(req.ip);
  const geoData = geoip.lookup(userIp);
  const location = geoData.city + "," + geoData.country;
  const [latitude, longitude] = [...geoData.ll];
  let temperature;

  axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&forecast_days=1`
    )
    .then((response) => {
      const weatherData = response.data;
      temperature = weatherData.current.temperature_2m;
    })
    .catch((error) => {
      console.log(error);

      res.status(500, {
        message: "Error fetching weather data",
      });
    });

  console.log(userIp, latitude, longitude, location, temperature);

  const response = {
    greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees celcius in ${location}`,
  };

  res.json(response);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
