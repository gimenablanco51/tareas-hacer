const inquirer = require('inquirer');

require ('colors');

//envio de informacion de forma automatica
let preguntas=[
    {
        type: 'list',
        name: 'opcion',
        message: 'que desea hacer?',
        choices: [
            {
                value:1,
                name:`${'1.'.green} Crear tarea`
            },
            {
                value:2,
                name:`${'2.'.green} Listar Tareas`
            },
            {
                value:3,
                name:`${'3.'.green} Listar tareas completadas`
            },
            {
                value:4,
                name:`${'4.'.green} Listar Tareas pendientes`
            },
            {
                value:5,
                name:`${'5.'.green} Completar tarea(s)`
            },
            {
                value:6,
                name:`${'6.'.green} Borrar Tareas`
            },
            {
                value:0,
                name:`${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu = async()=>{
    console.clear();
    console.log('======================='.green);
    console.log('Seleccione una opcion'.white );
    console.log('=======================\n'.green);

    //esperamos el parametro qeu ingresara
    //que sera un vector de elementos
    const {opcion} = await inquirer.prompt(preguntas);
    //devolvemos la opcion

    return opcion;

};

const pausa = async()=>{
    const question = [
        {
            type:'input',
            name:'enter',
            message:`Presione ${'enter'.green} para continuar`
        }
    ];
    console.log('\n')
    await inquirer.prompt(question);
}

const leerInput = async(message) =>{
    const question = [
        {
            type:'input', //valor de entrada
            name: 'desc', //generador de desestructuracion
            message, //mensaje
            validate(value){
                if(value.length===0){
                    return "Por favor ingrese un valor";
                }
                return true;
            }
        }
    ];
    //aplicamos la desestructuracion
    const {desc}=await inquirer.prompt(question);
    return desc;
}

const confirmar = async (message)=>{
    //generamos el menu de preguntas y opciones
    const question =[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok
}

const seleccionarTareaBorrar = async (tareas) => {
    const choices = tareas.map((tarea, i) => ({
      value: tarea.id,
      name: `${(i + 1 + '.').green} ${tarea.desc}`,
    }));
  
    choices.unshift({
      value: '0',
      name: '0.'.green + ' Cancelar',
    });
  
    const { tareaId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tareaId',
        message: 'Seleccione una tarea para borrar:',
        choices,
      },
    ]);
  
    return tareaId;
  };
  
  const seleccionarTareasCompletar = async (tareas) => {
    const choices = tareas.map((tarea, i) => ({
      value: tarea.id,
      name: `${(i + 1 + '.').green} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    }));
  
    const { tareaIds } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'tareaIds',
        message: 'Seleccione las tareas a completar:',
        choices,
      },
    ]);
  
    return tareaIds;
  };

  
module.exports = {
     inquirerMenu, 
     pausa,
     leerInput,
     seleccionarTareasCompletar,
     confirmar,
     seleccionarTareaBorrar
};