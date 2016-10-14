/* 
 * Copyright (C) 2016 jtfalkenstein
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        copy:{
            dependencies:{
                files:[
                    {
                        cwd: 'bower_components/',
                        src:['bootstrap/dist/js/bootstrap.min.js', 
                            'handlebars/handlebars.min.js',
                            'jQuery/dist/jquery.min.js',
                            'jquery-ui/jquery-ui.min.js',
                            'underscore/underscore-min.js',
                            'json-human/src/json.human.js'
                        ],
                        mode: true,
                        dest:"js/lib/deps/",
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src:['bootstrap/dist/css/bootstrap.min.css',
                            'bootstrap/dist/css/bootstrap-theme.min.css',
                        ],
                        mode: true,
                        dest: "css/",
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src:['bootstrap/dist/fonts/*'],
                        mode: true,
                        dest: "fonts/",
                        expand: true,
                        flatten:true
                    },
                    {
                        cwd:'bower_components/jquery-ui/themes/base/',
                        src: ['jquery-ui.min.css','images/*'],
                        mode: true,
                        dest:"css/",
                        expand: true,
                    }
                ]
            }
        },
        handlebars:{
            compile:{
                options:{
                    amd: true,
                    namespace:false,
                    compilerOptions:{
                        min: true
                    },
                },
                files:[
                    {
                        src:['tmpl/*.hbs'],
                        mode: true,
                        dest:"js/lib/templates/",
                        expand: true,
                        flatten: true,
                        rename: function(dest, src){
                            return dest  + src + ".js";
                        }
                    }
                ]
            }
            
        }
        
    });
//    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('copyDependencies',function(){
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.task.run('copy:dependencies');
    });
    
    grunt.registerTask('compileTemplates', function(){
       grunt.loadNpmTasks('grunt-contrib-handlebars');
       grunt.task.run('handlebars:compile');
    });
};
