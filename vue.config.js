module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': __dirname + '/src/client'
      }
    },
    entry: ['./src/client/main.js']
  },
}
