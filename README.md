# MongoDB To-Do Backend Application
A backend task application shining a spotlight on MongoDB capabilities. This application is equipped with password hashing using ```bcrypt``` and user authentication using ```jsonwebtokens```.

## Requirements
You must have ```node.js``` & ```mongodb``` installed into your machine.

## Instructions

In order to start the application, you need to have a mongo daemon running in the background. Open a separate and dedicated terminal, then run the following  command to start a mongo daemon:

```
mongod
```

Note: If you are using MacOS and running on Catalina, you may need to use the ```mongod --dbpath``` option. The goal here is to access Mongo's ```/data/db``` directory, wherever that may be on your machine. For example, ```mongod --dbpath ~/somedirectory/data/db``` takes you to the root directory on your computer, accesses a folder named ```/somedirectory```, and finally accesses ```/data/db``` where the mongod instance stores its data. 

After the Mongo daemon is running in the background, you have two options to run the application. Both options require you to be in the project's root directory. The first is meant for production usage and, since the application does not have a frontend currently, it is not recommended yet. However, you may run it anyway using the following command:

```
npm run start
```

The best way to run the application is by using a dev start command:

```
npm run dev
```

Running a dev start will invoke ```nodemon```, thereby making manual refreshes to the server unnecessary.

Lastly, a GUI for the MongoDB interface is highly recommended. Specifically, ```Robot 3T``` is an excellent choice for the purposes of this application.


## Technologies Used
* MongoDB
* Mongoose
* Express
* JSON Web Tokens
* bcrypt
* Robo 3T

## Current Status
Currently, this application is not yet deployed at production level. The biggest reason for this is because it does not have a frontend at the moment. As it stands today, I am focusing all of my attention on both the backend and the database, which is why the application only runs on the backend. 

### Future Endeavors
As previously mentioned, this application does not have a frontend and is not deployed at production level. I intend to deploy it to Heroku or AWS in the coming months. This can happen only after I create the frontend for it. Please check back in the coming months to see any commits for frontend development, as well as a deployment link.