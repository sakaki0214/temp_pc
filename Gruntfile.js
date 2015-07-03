module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask("default", ["connect", "watch", "compass"]);
  grunt.initConfig({
    cssmin: {
      minify: {
        files: {
          'css/style.min.css':'css/style.css'
        }
      }
    },
    compass: {
      compile: {
        options: {
          config: 'config.rb'
        }
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9001
        }
      }
    },
    watch: {
      css: {
        files: ['css/style.css'],
        tasks: ['cssmin']
      },
      scss: {
        files: ['sass/style.scss'],
        tasks: ['compass']
      }
    }
  });
};
