const path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dist.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['./node_modules']
    }
};