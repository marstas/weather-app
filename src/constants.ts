const apiKey = "86e9a453e4af0c55cc11e8bf54c567d0";
const current = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;
const daily = `https://api.openweathermap.org/data/2.5/onecall?appid=${apiKey}&exclude=current,minutely,hourly,alerts`;

export {current, daily};
