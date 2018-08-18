const argv = require('yargs').argv;


const config = {
    analyze: argv.analyze * 1 || 0,
    srcPath: 'resources/',
    distPath: 'public/dist',
    host: {
        name: '127.0.0.1',
        port: 7000,
    }
};

export default config;
