import path from 'path';

const routesPath = path.resolve(process.cwd(), __dirname, 'routes/*.ts');


const config = {
  info: {
    title: 'Zenith',
    version: '1.0.0', // Version (required)
    description: 'tax calculator',
    termsOfService: '',
    contact: {
      email: ''
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  basePath: '/',
  apis: [routesPath]
};

module.exports = config;
