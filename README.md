# A simple Node app using SWIG templates to render our new HTML

# Dependencies
* Node
* Npm
* Ruby

Ensure you have Gulp installed:

```bash
sudo npm install -g gulp
```

Ensure you have Nodemon installed (Mac / Linux only):

```bash
sudo npm install -g nodemon
```

Install the bundler gem:
```bash
sudo gem install bundler
```

Install dependencies for the project
```bash
bundle install
```

# Setup the project

Install the Node dependencies from npm:

```bash
npm install
```

Run the Gulp build:

```bash
gulp
```

Start the app:

With NPM:

```bash
npm run-script app
```

Or to watch for changes:

```bash
npm run-script watch
```

With Node directly:

```bash
node src/webapp/app.js
```

Then visit http://localhost:3000 (or whatever port you put into src/config/deployment.json)


# Gulp

To build the static files:

```bash
gulp
```

To build just the Argos JavaScripts:

```bash
gulp scripts:argos
```

To build just the Vendor JavaScripts:

```bash
gulp scripts:vendor
```

To move the static assets manually:

```bash
gulp move
```

# Gulp watch

To watch the static files for changes (images, scss, js and fonts):

```bash
gulp watch
```

To watch just the JavaScript:

```bash
gulp watch:scripts
```

To watch just the Styles:

```bash
gulp watch:styles
```