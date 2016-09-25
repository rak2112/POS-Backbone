module.exports = function(grunt) {
	'use strict';
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 9001,
					// base: 'app',
					keepalive: true
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/styles.css': 'sass/styles.scss'
				}
			}
		},

		less: {
			development: {
				options: {
					paths: ["css"]
				},
				files: {
					"css/styles.css": "css/styles.less"
				}
			}
		},
		jshint: {
			all: ['js/main.js']
		},

		concat: {
			css: {
				src: [
					'css/*.css'
				],
				dest: 'css/styles.css'
			},
			js: {
				src: [
					'js/*.js'
				],
				dest: 'js/app.js'
			}
		},

		cssmin: {
			css: {
				src: 'css/styles.css',
				dest: 'css/styles.min.css'
			}
		},

		uglify: {
			js: {
				files: {
					'dest/js/combined.js': ['dest/js/combined.js']
				}
			}
		},
		imagemin: {

			dynamic: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/'
				}]
			}
		},
		ngmin: {
			files: [{

				cwd: 'src/',
				src: ['src/combined.js'],
				dest: 'dist/combined.js'
			}]
		},

		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass'],
				options: {
					livereload: true,
				},
			}
		}

	});
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	// grunt.loadNpmTasks('grunt-contrib-ngmin');

	// Default task(s).
	grunt.registerTask('default', ['connect',
		'concat:css',
		'concat:js',
		'uglify:js',
		'jshint',
		'watch',
		'imagemin',
		'sass',
		'compass'
	]);

};
