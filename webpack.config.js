const path = require('path');

module.exports = (env ,argv) => {
  console.log(argv.mode, 'ahackjh');
  return {
    mode: argv.mode,
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    }
  }
}
