class Provider {
  static getWeather(city) {
    return Promise.resolve(`The weather of ${city} is Cloudy`);
  }

  static getLocalCurrency(city) {
    return Promise.resolve(`The local currency of ${city} is GBP`);
  }

  static findCity(long, lat) {
    return Promise.resolve("London");
  }
}

// Provider test

//City located at latitude/longitude 51.5074/0.1278
const getCityAtLocation = (lat, long) => {
  if (lat && long) {
    Provider.findCity(lat, long)
      .then((city) =>
        console.log(
          `The city located at latitude/longitude ${lat}/${long} is ${city}`
        )
      )
      .catch((error) => {
        console.error("Error", error);
      });
  }
};

//The weather for city located at latitude/longitude 51.5074/0.1278
const getWeatherForCityAtLocation = async (lat, long) => {
  if (lat && long) {
    try {
      const city = await Provider.findCity(lat, long);
      const message = await Provider.getWeather(city);
      console.log(message);
      return message;
    } catch (error) {
      console.error("Error", error);
    }
  }
};

const getWeatherAndCurrencyForCity = (city) => {
  if (!city) {
    return;
  }

  Promise.all([Provider.getWeather(city), Provider.getLocalCurrency(city)])
    .then((values) => {
      console.log(values.join(" and "));
    })
    .catch((error) => {
      console.error("Error", error);
    });
};

getCityAtLocation("51.5074", "0.1278");
getWeatherForCityAtLocation("51.5074", "0.1278");
getWeatherAndCurrencyForCity("London");
