# drummerjs

Web based drum machine. 

[Live version here.](http://timholm.es/projects/drummerjs/dist/)

## Building

Instructions intended for Linux users. Mac users may need to prefix these comands with the 'sudo' keyword.

To install dependencies

```shell
npm install
```

Note: To use gulp, make sure you have it installed globally on your system

```shell
npm install gulp -g
```

Default build (build project + start webserver + watch sass)

```shell
gulp default
```

After building, the app is viewable at:

+ https://localhost:8080 for the distributed version
+ https://localhost:9090 for the source version

## Gulp tasks

To compile sass, minify css, and minify JS into a 'dist' folder

```shell
gulp build
```

To run webserver

```shell
gulp webserver
```

Watch Sass for changes

```shell
gulp watch
```

## Usage

+ Click on a box to activate it.
+ Click 'Start' to begin the loop.
+ Click 'Pause' to pause the loop.
+ Click 'Stop' to end the loop.
+ The tempo markers flash on the down and up beats.
+ Adjust the tempo with the tempo controls while the loop is paused.
+ Use 'Clear' clear the selections.
