module.exports = function(grunt) {

	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options:{
					livereload:true // 文件改动时重启服务
				}
			},
			js:{
				files:['public/js/**','models/**/*.js','schemas/**/*.js'],
				//tasks:['jshint'],
				options:{
					livereload:true
				}
			}
		},

		nodemon:{
			dev:{
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					watchedFolders:['./'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000
					},
					cwd:__dirname
				}
			}
		},

		mochaTest:{
			options:{
				reporter:'spec' // 测试脚本后缀名为.test.js（表示测试）或者.spec.js（表示规格）
			},
			src:['test/**/*.js']
		},

		mochaTest: {
			options: {
				reporter: 'spec'
			},
			src: ['test/**/*.js']
		}

		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		}
	})


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.option('force', true);
	grunt.registerTask('default', ['concurrent']);

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.registerTask('test', ['mochaTest']);
}