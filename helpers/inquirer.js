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

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: lugar.id,
      name: `${idx}. ${lugar.nombre}`,
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
      message: 'Seleccione el lugar:',
      choices
    }
  ]

  const { id } = await inquirer.prompt(preguntas);
  return id;
}



module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares
};
