const axios = require('axios');

const getLugarLatLng = async(dir) => {
    // codificamos la direccion para que al indicarse en la URL, no haya problemas si hay espacios        
    const encodedUrl = encodeURI(dir);

    // configuramos los Headers
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedUrl}`,
        headers: {
            'x-rapidapi-key': '4cd192e3f3msh93e80380a5a4337p1afc4fjsne95b1d2f191f'
        }
    });
    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    const data = resp.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;
        
    return {
        direccion,
        lat,
        lng
    };    
   
}
module.exports = {
    getLugarLatLng
}