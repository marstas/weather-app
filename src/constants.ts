const weatherMapApiKey = "86e9a453e4af0c55cc11e8bf54c567d0";
const ipFindApiKey = "54151f53-0664-4a57-992c-ecb0f474aaf5";
const current = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherMapApiKey}`;
const onecall = `https://api.openweathermap.org/data/2.5/onecall?appid=${weatherMapApiKey}&exclude=current,minutely,hourly,alerts`;
const imgBase = "https://openweathermap.org/img/wn/";
const ipFind = `https://ipfind.co/me?auth=${ipFindApiKey}`;

export {current, onecall, imgBase, ipFind};
