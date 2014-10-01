module.exports = function(grunt) {
  //Gruntの設定
  grunt.initConfig({
    //  ファイルの状態を監視する設定
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['app/**/*.html','app/**/*.js','app/**/*.css'],
        tasks:['default']
      },
      coffee: {
        tasks: 'coffee',
        files:['src/coffee/**/*.coffee', 'src/coffee/*.coffee']
      },
      jade: {
        tasks: 'jade',
        files:['src/**/*.jade']
      }
    },
    //  ローカルサーバの設定
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'app'
        }
      }
    },
    //  open処理。ファイルでもurlでも何でも開けるらしい。
    //  ここではデフォルトブラウザでlocalhostを開く
    open: {
        server: {
            url: 'http://localhost:9000'
        }
    },
    //  coffeeファイルのコンパイル設定
    coffee: {
      compile: {
        // フォルダ直下/srcにあるCoffeeScriptをフォルダ直下/app/jsにコンパイル
        expand: true,
        flatten: false,
        cwd: 'src/coffee/',
        src: ['**/*.coffee','*.coffee'],
        dest: 'app/js/',
        ext: '.js',
        /*
         * global空間でオブジェクトを使いまわすので、
         * bareでコンパイルするよう指定する。
         */
        options: {
            bare: true,
        }
      }
    },
    jade: {
      // フォルダ直下/src/jadeのjadeファイルをフォルダ直下/appにコンパイル
      compile: {
        options: {
          pretty: true // コンパイル後のhtmlをインデント表記させる
        },
        expand: true,
        cwd: 'src/jade',
        src: '**/*.jade',
        dest: 'app/',
        ext: '.html'
      }
    }
  });
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  //defaultタスクの定義
  // grunt.registerTask('default', 'coffee');
  grunt.registerTask('default', ['connect', 'open', 'watch']);
};
