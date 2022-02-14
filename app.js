const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config();

const main = async () => {
    let opt = '';
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ingrese una ciudad: ');
                await busquedas.ciudad(lugar);
                console.log('\nInformación de la ciudad\n'.green);
                break;
            case 2:
                break;
            case '0':
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