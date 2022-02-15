const axios = require('axios');

class Busquedas {
    historial = ['Barcelona', 'Valencia', 'Madrid'];

    constructor() {
        // TODO: leerDB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_TOKEN,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            const instance = await axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json/`,
                params: this.paramsMapbox
            })
            const resp = await instance.get();
            return resp.data.features.map(lugar =>
            ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })
            )
        } catch (error) {
            console.log(error);
        }
    }

    async climaLugar(lat, lon) {
        try {
            const instance = await axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    'appid': process.env.OPENWEATHERMAP_API_KEY,
                    'units': 'metric',
                    'lang': 'es'
                }
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Busquedas;