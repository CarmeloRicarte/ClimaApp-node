const axios = require('axios');
const lugar = require('../lugar/lugar');

const getClima = async(lat, lng) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&units=metric&appid=a561fecb688cb2cb6ccf648e2a8a3b01`);
    
    return resp.data.main.temp;
};

module.exports = { 
    getClima
};