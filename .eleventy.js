const fs = require('fs');

const htmlMin = require('./src/utils/minify-html.js');

module.exports = config => {
  const prod = process.env.NODE_ENV === 'production';

  // Passthrough copy
  config.addPassthroughCopy({ 'src/images': 'images' });

  if (prod) {
    config.addTransform('htmlmin', htmlMin);
  }

  // 404
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        const content_404 = fs.readFileSync('dist/404.html');

        bs.addMiddleware('*', (req, res) => {
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    templateFormats: ['njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src/site',
      output: 'dist'
    }
  };
};
