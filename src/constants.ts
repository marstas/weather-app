const weatherMapApiKey = "1f1c011ac8a3f7b0fac99225b91c9b25";
const ipFindApiKey = "24bc3767-44d0-4b94-987b-54a923b42a19";
const current = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherMapApiKey}`;
const onecall = `https://api.openweathermap.org/data/2.5/onecall?appid=${weatherMapApiKey}&exclude=current,minutely,hourly,alerts`;
const imgBase = "https://openweathermap.org/img/wn/";
const ipFind = `https://ipfind.co/me?auth=${ipFindApiKey}`;

export {current, onecall, imgBase, ipFind};
