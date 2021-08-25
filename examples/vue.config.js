const path = require('path')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@zhengxs/composition-api': path.join(__dirname, '../src/index.ts'),
      },
    },
  },
}
