const path = require('path');

module.exports = {
  mode: 'production', //圧縮ファイルを出力
  entry: path.join(__dirname, 'src/js/index.js'), //出力元ファイル設定(大元ファイル？)
  output: { //出力先ファイル設定
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ //Babel を利用する
          {
             loader: "babel-loader",
             options: {
               presets: ["@babel/preset-env"] // プリセット指定で、ES6をES5に変換
             }
          }
        ]
      }
    ]
  }
};
