const webpackConfig = require('./webpack.config.js');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;


module.exports = function(grunt) {
  grunt.initConfig({
    s3: {
      options: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        bucket: "starkiller-reviews-static",
        region: 'us-east-1'
      },
      build: {
        cwd: "public",
        src: "**"
      }
    },
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: false }, webpackConfig)
    },
    watch: {
        css: {
          files: ['src/css/*.scss'],
          tasks: ['sass:dev']
        },
        js: {
          files: ['src/js/*.js'],
          tasks: ['uglify:dev']
        }
      }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-aws');
//   grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask("default", ["s3"]);
};