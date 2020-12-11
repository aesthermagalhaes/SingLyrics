module.exports = {
    //entry: ,
    output: {
        path: __dirname + '/public', 
        filename: 'bundle.js',
    },
    devServer:{
        contentBase: __dirname + '/public'
    },
    module:{
        rules: [
           {
               test: /\.js$/,
               exclude: /mode_modules/,
               use:{
                   loader: 'babel-loader',
               }
            } 
        ],
    },
};