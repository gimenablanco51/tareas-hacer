//const { read } = require('fs');

require ('colors');

const mostrarMenu =()=>{
    return new Promise(resolve=>{
        console.clear();
        console.log("=====================================")
        console.log("Seleccione una Opcion:")
        console.log("=====================================")

        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas completas`);
        console.log(`${'4.'.green} Listar Tareas Pendiente`);
        console.log(`${'5.'.green} Completar Tareas`);
        console.log(`${'6.'.green} Borrar Tareas`);
        console.log(`${'0.'.green} Salir`);

        // paquete propio de Node
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
        readline.question('Seleccione una Opcion: ', (opt)=>{
            readline.close();
            // esto nos permite recibir la informacion
            resolve(opt);            
        })
    });
    
}

const pausa=()=>{
    return new Promise(resolve=>{
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
        readline.question(`\nPresione ${'Enter'.green} para continuar\n`,(opt)=>{
            readline.close();
            //Esto resuelve la Promesa
            resolve();
        });
    });
    
}

// para nmostrar  la funcion que pueda ser invocada
module.exports = {
    mostrarMenu,
    pausa
}
