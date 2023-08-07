const fs = require('fs');
//const archivo = "./db/data.txt";
const archivo = "./db/data.json";

const guardarBD = (data)=>{  
    console.log("guardarBD")  ;
    fs.writeFileSync(archivo, JSON.stringify(data));
    console.log("f guardarBD")  ;
}

const leerBD = () =>{
    if(!fs.existsSync(archivo)){
        return [];
    }
    try{
        const info = fs.readFileSync(archivo, {encoding:'utf-8'});
        const data = JSON.parse(info);
        return  data;
    } catch (error) {
        return [];
        }
}

module.exports={
    guardarBD,
    leerBD
}