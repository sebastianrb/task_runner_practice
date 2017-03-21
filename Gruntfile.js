module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Config will go here
    uglify: {
        all: {
            files: {
                "dest/app.min.js": ["js/*.js"]
            }
        }
    },
    cssmin: {
        target: {
            files: {
                "dest/app.min.css": ["styles/*.css"]
            }
        }
    },
    htmllint: {
        all: ['./html/*.html']
    },
    csslint: {
        all: {
          src: ['styles/*.css']
        }
    },
    jshint: {
      files: {
          src: ['Gruntfile.js', 'js/*.js']
      },
      options: {
        force: true
      }
    },
    sass: {
      all: {
        files: {
          'styles/main.css': 'sass/sassFile.scss'
        }
      }
    },
    watch: {
        scripts: {
          files: ['js/*.js'],
          tasks: ['jshint'],
          options: {
            livereload: true
          }
        },
        sass: {
          files: ['sass/*.scss'],
          tasks: ['sass'],
          options: {
            livereload: true
        }
      }
    },
    jasmine: {
      all: {
        src: ['js/app.js'],
        options: {
          specs: ['spec/**/*Spec.js']
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,                  // Enable globbing
          src: ['img/*.{png,jpg,gif}'],  // Glob patterns to match
          dest: 'dest/'                  // Destination directory
        }]
      }
    },
    version: {
      src: ['package.json', 'index.html'],
      options: {
        prefix: '[\\?]?version[\\\'"]?[=:]\\s*[\\\'"]?'
      }
    },
    exec: {
      add: 'git add .', // Add all changed files in this directory to the commit
      commit: 'git commit -am "Releasing"', // Actually make the commit
      push: 'git push' // Send our changes to the repository
    },
    //grunt postCSS
    postcss: {
      options: {
        map: true, // inline sourcemaps

        // or
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'dist/css/maps/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 4 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dest/*.css'
      }
    },
    gitadd: {
        task: {
          options: {
            force: true
          },
          files: {
            src: ['./*']
          }
        }
      },
      gitcommit: {
          task: {
              options: {
                  message: grunt.option('message'),
                  noVerify: true,
                  noStatus: false
              }
          }
      },
      gitpush: {
        your_target: {
          options: {
            remote: "origin",
            branch: "master"
          }
        }
      },
      gitpull: {
          your_target: {
            options: {
              remote: "origin",
              branch: "master"
            }
          }
        },
  });

  var LOG_LEVEL = grunt.option('LOG_LEVEL');
  var MESSAGE = grunt.option('MESSAGE');

  // Default task(s).
  grunt.registerTask('default', function (arg1, arg2) {
    console.log('Grunt has run');
    console.log("Argument 1: ", arg1, "Argument 2: ", arg2);
    console.log("[" + LOG_LEVEL + "] ", MESSAGE);
  });

  grunt.registerTask('derp', ['cssmin', 'uglify']);

  grunt.registerTask('minify', function (images) {
    if (images) {
      grunt.task.run(['cssmin', 'uglify', 'imagemin']);
    } else {
      grunt.task.run(['cssmin', 'uglify']);
    }
  });

  grunt.registerTask('deploy', ['exec:add', 'exec:commit', 'exec:push']);

  grunt.registerTask('css', ["sass", "cssmin", "postcss"]);
};
