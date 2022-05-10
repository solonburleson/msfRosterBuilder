const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const fs = require('fs');

module.exports = {
   context: __dirname,
   entry: './src/index.js',
   output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'main.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true,
      port: 3000,
      onBeforeSetupMiddleware: function (devServer) {
        devServer.app.all(['/msfRosterBuilder/:fileName'], function(req, res) {
            const methodName = req.method.toLowerCase();

            try {
                const response = require(`./__mocks__/${methodName}_${req.params.fileName}.json`);
                res.json(response);
            } catch(e) {
                const response = fs.readFileSync(path.resolve(__dirname, `./__mocks__/${methodName}_${req.params.fileName}`), 'utf8');
                res.send(response);
            }
        })
      },
   },
   devtool: "inline-source-map",
   module: {
      rules: [
         {
            test: /\.js|jsx$/,
            use: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
         }
]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: 'index.html'
      })
   ]
};