const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${'2.'.green} Historial`,
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.log("=========================\n".green);
  console.log("  Seleccione una opción".white);
  console.log("=========================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  console.log('\n');
  await inquirer.prompt([
    {
      type: "input",
      name: "pause",
      message: `Presione ${"ENTER".green} para continuar...`,
    },
  ]);
};

const leerInput = async (message) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Debe ingresar un valor';
        }
        return true;
      }
    }
  ]

  const { desc } = await inquirer.prompt(question);
  return desc
}

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
    };
  })
  choices.unshift({
    value: '0',
    name: `${'0.'.green} Cancelar`,
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione la tarea a borrar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(preguntas);
  return id;
}

const confirmar = async (message) => {
  const pregunta = [
    {
      type: 'list',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(pregunta);
  return ok;
}

const listadoTareasCompletar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    };
  })


  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione la/s tarea/s a completar',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  listadoTareasCompletar
};
