/*globals module,require*/
module.exports = function(grunt) {
  'use strict';
  var appConfig = {
    app: 'app',
    tmp: '.tmp',
    dist: 'dist'
  };

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    config: appConfig,

    clean: {
      dist: ['<%=config.tmp%>', '<%= config.dist%>']
    },
    //task
    autoprefixer: {
      //options
      options: {
        browsers: ['last 2 versions', '> 1%', 'ie >= 8']
      },
      //taget 
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app%>',
          src: 'styles/**/*.css',
          dest: '<%= config.tmp%>'
        }]

      }
    },

    filerev: {
      dist: {
        src: [
          '<%= config.dist %>/scripts/{,*/}*.js',
          '<%= config.dist %>/styles/{,*/}*.css'
        ]
      }
    },

    useminPrepare: {
      html: {
        expand: true,
        cwd : '<%= config.app%>',
        src : ['*.html']
      },
      options: {
        dest: '<%=config.dist%>',
        flow: {
          //target
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }

        }

      }
    },

    usemin: {
      html: ['<%= config.dist%>/{,*/}*.html'],
      css: ['<%= config.dist%>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= config.dist%>',
          '<%= config.dist>/styles'
        ]
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true,
        add : true,
        //先删除所有annotaion,然后再统一新增,防止出现添加的注解个数不一致的情况
        remove : true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.tmp%>',
          src: 'concat/scripts/*.js',
          dest: '<%= config.tmp%>'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%=config.app%>',
          dest: '<%=config.dist%>',
          src: [
            '*.{ico,png.txt}',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%=config.app%>',
          src: 'images/{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= config.dist%>'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= config.dist %>'
        }]
      }
    }

  });



  grunt.registerTask('default', [
    'clean',
    'useminPrepare',
    'concat',
    'autoprefixer',
    'ngAnnotate',
    'copy',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

};
