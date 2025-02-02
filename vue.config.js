module.exports = {
    // Delete the prefetch plugin
    chainWebpack: config => {
      config.plugins.delete('prefetch')
    }
  }
