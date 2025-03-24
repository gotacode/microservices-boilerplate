export default function (plop) {
  plop.setGenerator('endpoint', {
    description: 'Cria um novo endpoint com controller, rota e teste unitário',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nome do endpoint (ex: getUser)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/api/controllers/{{camelCase name}}.controller.js',
        templateFile: 'plop-templates/endpoint/controller.hbs'
      },
      {
        type: 'add',
        path: 'src/api/routes/{{camelCase name}}.routes.js',
        templateFile: 'plop-templates/endpoint/route.hbs'
      },
      {
        type: 'add',
        path: 'tests/unit/{{camelCase name}}.controller.test.js',
        templateFile: 'plop-templates/endpoint/test.hbs'
      }
    ]
  });
}
