const weatherMapApiKey = "86e9a453e4af0c55cc11e8bf54c567d0";
const ipFindApiKey = "52689920-907f-47ba-9113-36bf31106896";
const current = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherMapApiKey}`;
const daily = `https://api.openweathermap.org/data/2.5/onecall?appid=${weatherMapApiKey}&exclude=current,minutely,hourly,alerts`;
const imgBase = "https://openweathermap.org/img/wn/";
const ipFind = `https://ipfind.co/me?auth=${ipFindApiKey}`;

export {current, daily, imgBase, ipFind};
