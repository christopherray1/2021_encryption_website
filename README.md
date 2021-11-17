# 2021_encryption_website
This is an encryption website project allowing users to input clear text and have the output be encrypted.

###### URL to webpage: https://sheltered-lake-16307.herokuapp.com/

### Basic Setup
#### 1. Download one of the most current versions node.js at this url https://nodejs.org/en/download/

#### 2. Create a Heroku account here --> https://signup.heroku.com/

#### 3. Create an empty repository on github with a .gitignore file


### Website Setup
#### 1. Create basic folder tree within root project folder.

/public
  /css
    /styles.css
/views
  /index.ejs
.gitignore
README.md
package-lock.json
package.json
server.js


#### 2. Setup our server.js folder
We must let heroku set the port dynamically

We also set the view engine to ejs

We let express look in our public directory for assets like js or css

We create the home page route that routes to our index.ejs file


#### 3. Setup our package.json file
Set the name to our repo name

Add a description

Add a main file to run for node

Setup our starting scripts

Set up dependencies


#### 4. npm install in root folder to install our modules in vscode with terminal or command line/git bash


#### 5. Setup index.ejs with basic html template and import our css


#### 6. Setup heroku app
Login to heroku through command line/git bash

navigate to root project folder and enter "heroku create" to create a new app with this project

then use "git heroku push main" to try and push project to heroku main repoistory, if this does not work then we will have to "git add"
all modified files and then commit them to heroku main.

Test to see if our work has been pushed with "heroku open"

If successful, then push to git repository


#### 7. Setup our styles.css to test if css works
