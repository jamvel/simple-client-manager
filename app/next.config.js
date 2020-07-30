const path = require('path');
const endpoints = require('./endpoints.json');

module.exports = {
    env: {
        axiosBaseUrl: 'http://localhost:3000',
        ...endpoints
    },
    webpack: (config, { dev }) => {
        if(dev){
            config.module.rules.push({
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            })
        }

        /*
		*	Configure Aliases
		* 	Any added aliases must be resolvible by eslint and have to be added to .eslintrc.json file
		*/
		config.resolve.alias['@API'] = path.join(__dirname, 'pages/api');
        config.resolve.alias['@Components'] = path.join(__dirname, 'components');
        config.resolve.alias['@Hooks'] = path.join(__dirname, 'hooks');
        config.resolve.alias['@Pages'] = path.join(__dirname, 'pages');
        config.resolve.alias['@Public'] = path.join(__dirname, 'public');
        config.resolve.alias['@Stores'] = path.join(__dirname, 'stores');
		config.resolve.alias['@Styles'] = path.join(__dirname, 'styles');
        config.resolve.alias['@Root'] = __dirname;
        
        return config
    }
}