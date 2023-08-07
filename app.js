require ('colors');
console.clear();

const { guardarBD, leerBD} = require('./helpers/guardarArchivo');
// Importacion paquetes
//const{mostrarMenu, pausa} = require('./helpers/mensajes')
const{inquirerMenu, 
    pausa,
    leerInput,
    seleccionarTareasCompletar,
    seleccionarTareaBorrar,
    confirmar
    } = require('./helpers/inquirer')
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

// async funcion asincrona

const main = async()=>{
    console.log("Hola Mundo");
    const tareas = new Tareas();
    //const tareasDB = leerBD();
    const tareasDB = leerBD();
    

    let opt ="";    
    do{
        // await = esperemos que nos envien algo
        opt = await inquirerMenu();
        switch(opt){
            case 1:
                // Crear Opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                console.log("Tarea creada.");
                break;
            case 2:
                //console.log(tareas.listadoArr)
                tareas.cargarTareasFromArray(leerBD());
                //console.log(leerBD());
            break;
            case 3:
                //tareas.listadoCompleto(leerBD());
                tareas.listarPendientesCompletadas(true);
            break;
            case 4:
                tareas.listarPendientesCompletadas(false);
            break;
            case 5:
                const tareaIdsCompletar = await seleccionarTareasCompletar(tareas.lista);
                tareas.completarTareas(tareaIdsCompletar);
                console.log('Tarea(s) completada(s) con éxito.');
            break;
            case 6:
                const tareaIdBorrar = await seleccionarTareaBorrar(leerBD());
                if (tareaIdBorrar !== '0') {
                const confirmacion = await confirmar('¿Está seguro de que desea borrar esta tarea?');
                if (confirmacion) {
                    tareas.borrarTarea(tareaIdBorrar);
                    console.log('Tarea borrada con éxito.');
                }
                }
            break;
            case 0:
            break;

            default:
                console.log('Opción no válida.');
            break;

        }
        //const tarea = new Tarea('Comprar Comida');
        await pausa();
        //guardarBD(tareas.listadoArr);//para guardar en todo momento
    } while (opt!=0);
    
    inquirerMenu(); //mostrarMenu();
    //pausa();
}

main();