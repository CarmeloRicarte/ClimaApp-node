const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config();

const main = async () => {
    let opt = '';
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const terminoBusqueda = await leerInput('Ingrese una ciudad: ');
                const lugares = await busquedas.ciudad(terminoBusqueda);
                const idSeleccionado = await listarLugares(lugares);

                if (idSeleccionado === '0') continue;

                const lugarSel = lugares.find(lugar => lugar.id === idSeleccionado);

                // Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);

                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Cludad: ' + lugarSel.nombre);
                console.log('Latitud: ' + lugarSel.lat);
                console.log('Longitud: ' + lugarSel.lng);

                console.log('Temperatura: ' + clima.temp + 'ºC');
                console.log('Mínima: ' + clima.min + 'ºC');
                console.log('Máxima: ' + clima.max + 'ºC');
                console.log('Cómo está el clima?: ' + clima.desc);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx}. ${lugar}`);
                })
                break;
            case 0:
                console.log('Hasta pronto!');
                break;
            default:
                console.log("El comando no es reconocido");
                break;
        }

        if (opt !== 0) {
            await pausa();
        }

    } while (opt !== 0);
}
main();