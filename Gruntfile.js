module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'build/app.css' : 'src/app.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
      browserify: {
        files: ['src/**/*.js', 'src/**/*.jsx'],
        tasks: ['browserify']
      }
		},
    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      app: {
        src: 'src/index.js',
        dest: 'build/app.js'
      }
    }
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default',['watch']);
  grunt.registerTask('build',['sass','browserify']);
}
