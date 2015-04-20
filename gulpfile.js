
var gulp= require('gulp'),
  debug= require('gulp-debug'),
  gutil= require('gulp-util'),
	karma = require('gulp-karma'),
  rimraf= require('gulp-rimraf'),
  jshint= require('gulp-jshint'),
  jshintStylish= require('jshint-stylish'),
  uglify= require('gulp-uglify'),
  cssmin= require('gulp-minify-css'),
  concat= require('gulp-concat'),
  mbf= require('main-bower-files'),
  addSrc= require('gulp-add-src'),
  gfilter= require('gulp-filter'),
  rename= require('gulp-rename'),
  usemin=require('gulp-usemin'),
  protractor= require('gulp-protractor').protractor,
  webdriver_standalone = require('gulp-protractor').webdriver_standalone,
  webdriver_update = require('gulp-protractor').webdriver_update,
  myUtils= require(__dirname + '/more/gulp/utils'),
  server= myUtils.getServer();

var appJsGlobs=['src/js/**/*.js'],
    unitTestJsGlobs=['test/unit/utils.js','test/unit/**/*Spec.js'],
    e2eJsGlobs= ['test/e2e/**/*.js'],
    appCssGlobs= ['src/styles/**/*.css'],
    appImages= ['src/imgs/**/*'];

var target='dist',
    targetAppName= myUtils.getPackage().name;

/**
* When used, this task launches the selenium
* server and let it run indefinitely
*/

gulp.task('webdriver_update', webdriver_update);
gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('express', function(cb){
  server.listen(8080, cb);
});


gulp.task('test-unit', function() {

  //Check files to test
  var filesToTest= myUtils.getFilesForPatterns(unitTestJsGlobs);
  if (filesToTest===undefined || filesToTest.length===0){
    return;
  }

  var jsFilter= gfilter('**/*.js');
  
  //Stream all devDependencies js referenced by bower
  return gulp.src(mbf({includeDev:'exclusive'}))
  //Stream all dependencies js referenced by bower
  .pipe(addSrc.append(mbf()))
  .pipe(jsFilter)
  //Then add application specific js
  .pipe(addSrc.append(appJsGlobs))
  //Then add unit tests specific js
  .pipe(addSrc.append(filesToTest))
  //Finally run karma unit tests
  .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run',
      singleRun: false
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});


gulp.task('jshint', function(){

  //Apply jshint rules on application files only
  return gulp.src(appJsGlobs)
  .pipe(jshint({multistr: true}))
  .pipe(jshint.reporter(jshintStylish));

});

gulp.task('test-e2e', ['webdriver_update', 'express'],  function(cb){

  //Check files to test
  var filesToTest= myUtils.getFilesForPatterns(e2eJsGlobs);
  if (filesToTest===undefined || filesToTest.length===0){
    server.close();
    cb();
    return;
  }

  //start protractor
  gulp.src(filesToTest, { read:false })
      .pipe(protractor({
        configFile: './protractor.conf.js',
        args: ['--baseUrl', 'http://localhost:' + server.address().port +'/e2eTemplates/']
      })).on('error', function(e) {
        server.close();
        throw e;
        cb();
      }).on('end', function() {
        server.close();
        cb();
      });
});


gulp.task('prebuild', ['test-unit', 'jshint', 'test-e2e'], function(cb){
  cb();
});


//BUILD PART

gulp.task('clean', ['prebuild'], function (cb) {
  return gulp.src('./' + target)
  .pipe(rimraf({force:true}));
});



gulp.task('copy-resources', ['clean'], function(){
  return gulp.src(['src/data/**/*', 'src/views/**/*'], {base:'./src'})
  .pipe(gulp.dest('./' + target));
});

gulp.task('mbf', ['clean'], function(){

  var imgsFilter= gfilter(['**/*.jpg', '**/*.png', '**/*.gif']);

  return gulp.src(mbf())
  .pipe(imgsFilter)
  .pipe(gulp.dest('./' + target  + '/imgs'));

});

gulp.task('usemin', ['clean'], function(){
  return gulp.src('./src/index.html')
    .pipe(usemin({
      ext_css: [cssmin(), 'concat'],
      css: [cssmin(), 'concat'],
      // ext_js: [uglify({output:{beautify:true}}), 'concat'],
      ext_js: [uglify(), 'concat'],
      js: [uglify(), 'concat']
    }))
    .pipe(gulp.dest('./' + target));
  }
);






gulp.task('build', ['copy-resources', 'mbf', 'usemin']);

gulp.task('default', ['build']);