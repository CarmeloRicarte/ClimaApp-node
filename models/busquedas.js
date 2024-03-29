const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_TOKEN,
            'limit': 5,
            'language': 'es'
        }
    }

    get historialCapitalizado() {
        return this.historial.map((lugar) => {
            let palabaras = lugar.split(' ');
            palabaras = palabaras.map((palabra) => palabra[0].toUpperCase() + palabra.slice(1));
            return palabaras.join(' ');
        });
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

    agregarHistorial(lugar = '') {
        // Prevent duplicates
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(lugar.toLocaleLowerCase());

        // Save to DB
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (fs.readFileSync(this.dbPath, { encoding: 'utf-8' })) {
            const payload = JSON.parse(fs.readFileSync(this.dbPath));
            this.historial = payload.historial;
        } else {
            return;
        }
    }
}

module.exports = Busquedas;