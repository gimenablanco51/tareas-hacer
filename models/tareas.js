const fs = require('fs');
const Tarea = require('./tarea')
const { guardarBD, leerBD} = require('../helpers/guardarArchivo');

class Tareas{

    get listadoArr(){
        const listado = [];
        // funcion propia de JS
        Object.keys(this._listado).forEach(key=>{
            const tarea = this._listado[key];
            listado.push(tarea);            //console.log(key);
        });
        return listado;
    }
    constructor(){
        this.lista = [];
        this.lista = leerBD();
        //this.cargarTareas();
    }  

    cargarTareasFromArray(tareas=[]){
        /*tareas.forEach(tarea=>{
            this._listado[tarea]=tarea;
        })*/
        console.log();  
        const tareasBD = leerBD();      
        tareasBD.forEach((tarea,i)=>{
            const idx = `${i+1}.`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`)
        })
    }
    
    guardarTareas() {
        fs.writeFileSync('./db/data.json', JSON.stringify(this.lista));
    }

    crearTarea(desc=''){
        const tarea = new Tarea(desc);
        this.lista.push(tarea);
        this.guardarTareas();
    }

    listarPendientesCompletadas(completadas=true){
        console.log();
        let contador=0;
        const tareasBD = leerBD();
        tareasBD.forEach((tarea)=>{
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red;
            if(completadas){
                //Mostrar Completadas
                if(completadoEn){
                    contador +=1;
                    console.log(`${(contador+'.').green} ${desc} :: ${estado}`);
                }            
            }else{
                //mostrar pendientes
                if(!completadoEn){
                    contador +=1;
                    console.log(`${(contador+'.').green} ${desc} :: ${estado}`);
                }

            }
            
        })
    }

    completarTareas(ids) {
        ids.forEach((id) => {
          const tarea = this.lista.find((tarea) => tarea.id === id);
          if (tarea) {
            tarea.completadoEn = true;
          }
          tarea.completadoEn = true;
        });
        this.guardarTareas();
      }
    
      borrarTarea(id) {
        this.lista = this.lista.filter((tarea) => tarea.id !== id);
        this.guardarTareas();
      }
}
module.exports = Tareas;