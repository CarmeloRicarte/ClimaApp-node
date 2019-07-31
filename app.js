const argv = require('./config/yargs').argv;
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

/* lugar.getLugarLatLng(argv.direccion)
    .then(console.log)
    .catch( err => console.error(err));

clima.getClima(argv.latitud, argv.longitud)
    // clima.getClima(40.419998, -3.700000)
    .then (console.log)
    .catch( err => console.error(err)); */

const getInfo = async (direccion) => {
    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${coords.direccion} es de ${temp} ºC`
    } catch (error) {
        throw new Error(`No se pudo determinar el clima de ${direccion}`, error);
    }
}

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log)