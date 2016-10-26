TrainingAngularJS
=================

This repo  contains the Lab project for the AngularJS Training.
for more details, have a look at [http://got5.github.io/TrainingAngularJS](http://got5.github.io/TrainingAngularJS/#/title)

## To install this application

Install a follow components

Use "**sudo**" to build with Mac and Linux

**install Node.js**

[http://nodejs.org/](http://nodejs.org/)

_Configure NPM proxy_
```bash
npm config set proxy http://[proxy]:[PORT]
npm config set https-proxy http://[proxy]:[PORT]
```

**install Bower**
```bash
npm install -g bower
```

**install bower lib**
```bash
bower install
```

**Install Karma**
```bash
npm install -g karma-cli
npm install -g karma
npm install -g karma-chrome-launcher
npm install -g karma-jasmine
```

## To execute test

**Execute Unit Tests**

launch tests
 ```bash
cd test
karma start karma.conf.js
 ```

## Can also be launched with a grunt task
grunt test:unit

## To execute application

Launch server
```bash
 node server
```

Application is now running in :

[localhost:3000](localhost:3000)


See [got5/Angular-Libraries/angular-training](https://github.com/got5/Angular-Librairies/tree/master/angular-training)

## To update your changes online ( the version hosted by github )

First be sure that you can run the application locally!

Then, suppose you made some modifications on **slides** and want to make them available online,
you will have to:
* generate the new deliverable
* switch to the **gh-pages** branch
* update the **gh-pages** branch based on the generated dist
* push the modifications on gh-branches

```bash
rm -rf dist #remove the previous version if any
gulp #generates a new dist folder
git checkout gh-pages # go to gh-pages branch
rm -rf data/ imgs/ index.html  js/ styles/ views/ # remove previous content
mv dist/* . # update previous content
```

Finally, commit and push you modifications as usually