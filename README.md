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


## Online exercices
Here are the solutions for the different online exercice : 

* [Slide 24 - Two-Way Data Binding Magic](https://gist.github.com/got5/d699b5a4362d057fe995)
* [Slide 29 - Expressions in AngularJS](https://gist.github.com/got5/a8fade483f338178dd7b) 
* [Slide 39 - Use of $watch by Angular](https://gist.github.com/got5/a19fe6e66c3c9c927fad)
* [Slide 46 - To conclude about controllers..](https://gist.github.com/got5/65a58721d7ac7a2b8db3)
* [Slide 67 - Main Angular services: $http](https://gist.github.com/got5/e5eb8798533505f87329)
* [Slide 114 - Native Angular directives](https://gist.github.com/got5/ad8e4ccf9a5022509a7a)
* [Slide 115 - Using the link function](https://gist.github.com/got5/19d7a41a8b81c1200bdf)
* [Slide 125 - Using the scope property](https://gist.github.com/got5/378724ebc7fbf37628a0)
* [Slide 130 - Creating new directives](https://gist.github.com/got5/c93cecb0ed1f71a7ad67)
* [Slide 137 - Let's use Angular Filters!](https://gist.github.com/got5/136742dc4170e184476b)
* [Slide 144 - Using form validation methods](https://gist.github.com/got5/fabd51ee4221ebfc347a)

## links

* [Immediately-invoked Function Expressions](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailnamespacing)
* [support for script-async for IE>10](http://caniuse.com/#feat=script-async)
* [difference between angular-route and angular-ui-router](http://www.meanstack.co/difference-between-angular-route-and-angular-ui-router/)
* [ESLint rules for AngularJS project](https://github.com/Gillespie59/angularjs-eslint)
* [How to integrate ESLint inside SuublimeText (French)](http://gillespie59.github.io/2015/01/03/eslint-sublime-text.html)
* [Debugging AngularJS Apps from the Console](http://ionicframework.com/blog/angularjs-console/)
* [L'API Promise d'AngularJS (FR)](http://www.frangular.com/2012/12/api-promise-angularjs.html)
* [$http success versus then](http://www.dwmkerr.com/promises-in-angularjs-the-definitive-guide/)