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
            console.log(resp.data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Busquedas;