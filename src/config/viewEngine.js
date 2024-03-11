const path = require('path');

const configViewEngine = (app) => {
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'resources/views'));
    console.log('PATH: ', path.join(__dirname, 'resources/views'));
}

module.exports = configViewEngine;