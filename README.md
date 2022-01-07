## LodgeINN
## Table of Contents 

1. [General Info](#general-info)
2. [Wiki-Documentation](#wiki-documentation)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Collaboration](#collaboration)
6. [Images](#images)



### General Info 
***
# Carra 
Carra is an application where users can post questions about their vehicles and the community can share their knowledge by answering questions. Users are able to interact further through comments to form meaningful discussions. 
* Link to live  [Carr](https://carra.herokuapp.com/) project. 


#### Carra Login page
![carraLoginPage (2)](https://user-images.githubusercontent.com/85452797/147454949-a2bc41d8-1102-4429-ab8b-b5bb8bbcae08.png)


#### Carra Sign up page
![carraSignUpPage](https://user-images.githubusercontent.com/85452797/147451908-02f6f91d-f1a9-4a3e-98e7-9c9cec3f0e49.png)


#### Carra Home page
![carraHomePage](https://user-images.githubusercontent.com/85452797/147452010-47661dc2-67f5-47c6-977c-eb3352062f59.png)


#### Question details page with an answer and a comment
![questionDetailsPage](https://user-images.githubusercontent.com/85452797/147455673-e74d8a4d-4850-46fc-bc90-48882a292247.png)


#### Topics page w/ questions related to topic
![topics](https://user-images.githubusercontent.com/85452797/147452071-6f2d81d5-f470-4cce-839c-edb9120a3fc1.png)


## Wiki Documentation: 
***
* [Home](https://github.com/k-dodsonknapp/Cara/wiki)
* [API Documentation](https://github.com/k-dodsonknapp/Cara/wiki/API-Documentation)
* [Database Schema](https://github.com/k-dodsonknapp/Cara/wiki/Database-Schema)
* [Frontend Routes](https://github.com/k-dodsonknapp/Cara/wiki/Frontend-Routes)
* [MVP Feature List](https://github.com/k-dodsonknapp/Cara/wiki/MVP-Feature-List)
* [User Stories](https://github.com/k-dodsonknapp/Cara/wiki/User-Stories)

## Technologies 
***
Technologies used within the project:
* [bcryptjs](https://www.npmjs.com/package/bcrypt): Version 2.4.3
* [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize): Version 7.0.4
*  [cookie-parser](https://www.npmjs.com/package/cookie-parser): Version 1.4.4
*  [csrf](https://www.npmjs.com/package/csrf): Version 3.1.0
*  [csurf](https://www.npmjs.com/package/csurf): Version 1.11.0
*  [debug](https://www.npmjs.com/package/debug): Version 2.6.9
*  [express](https://expressjs.com/en/4x/api.html#express): Version 4.16.1
*  [express-session](https://www.npmjs.com/package/express-session): Version 1.17.2
* [express-validator](https://express-validator.github.io/docs/): Version  6.14.0
* [http-errors](https://www.npmjs.com/package/http-errors): Version 1.6.3
* [morgan](https://www.npmjs.com/package/morgan): Version 1.9.1
* [pre-env](): Version 1.0.2
* [pg](https://www.npmjs.com/package/pg): Version 2.0.4
* [sequelize](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html): Version 5.22.3
* [sequelize-cli](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html): Version 5.5.1
* [dotenv](https://www.npmjs.com/package/dotenv): Version 8.2.0
* [dotenv-cli](https://www.npmjs.com/package/dotenv-cli): Version 4.0.0
* [nodemon](https://www.npmjs.com/package/nodemon): Version 2.0.6

## Languages 
***
* JavaScript
* Pug
* CSS
* Postgres
* Sequelize
* SQL
* Heroku

## Installation 
To install Carra on your local machine please clone the project repository. Once the project has been cloned run ```npm install``` in your terminal to install dependencies.
```
 git clone https://github.com/k-dodsonknapp/Cara.git
 npm install
 npm start
```

To use the application in a development environment use ```npm start``` to start. 


## Collaboration
  This project was developed by a group of four developers Aaron Short, Chris Ramos,    Eric Cortez, and Kenneth Dodson-Knapp. Below are the top two features of the project and a brief description of challenges faced during the one week development cycle. 
#### Highlight features: 
* Question Delete: The implementation of the dynamic delete frontend route allows you to delete a question on the home page without the need to be redirected to a new page. This feature was implemented using an event listener to manipulate the document object model and remove the element from the page. This is done through a fetch request in the event listener which reaches an endpoint on the backend to remove the question from the database. 
* Home Page: The home page displays nested elements as it allows users to post question, answers, and comments. The nested nature of this features required extensive use joint table query searches in addition data manipulation with pug in order to ensure that the question, answers, and comments all correlated to ensure data integrity.  Lastly, we ensured user authentication and permissions when enabling edit and delete features.  


#### Challenges:   
* The planning phase of this project was challenging as it require nested features, which were more difficult to implement than anticipated. Initally we decided to work along side one another but found that we need to work on the same phase for each feature in order to test and refactor our routes to make sure that the functionality was the same across the board. 
* During the implementation of the database we came up against an unforseen problem with our nested features that were dependant on one another that made it more challenging to have working CRUD features. Specifically the deleting of our nested dependencies which required the use of cascading hooks in our sequelize models. 
* Having our site use a uniform style. We realized early on that we needed to pay attention to the way we styled one page so that when our users moved through our site so it  flowed seamlessly allowling them to uniterrupted navigation. 
* For a while we struggled to make sure that the person logged in was the only one that could delete or update content that they had made. Ultimatley it came down to authorization of the user when logged in they were the only ones that could use the delete/edit buttons. 

## Images 
#### Event Listener for dynamically deleting content
![eventListener](https://user-images.githubusercontent.com/85452797/147452111-3a263729-9a71-4b7f-9d7c-43c0d706f1bb.png)


#### Pug form for the home page of Carra aka question list
![questionListPug](https://user-images.githubusercontent.com/85452797/147452118-db5e7eb0-2d65-4199-b374-1da6410ca8c6.png)


#### Code snippet of the route to post a new question 
![postNewQuestion](https://user-images.githubusercontent.com/85452797/147454596-6364b043-1853-4812-aa80-e226db36e6cb.png)


#### Code snippet of the route to edit an answer
![submitEditAnswer](https://user-images.githubusercontent.com/85452797/147454603-5af1b1e5-cd40-44f8-8ce7-c82f7b2899e3.png)


#### Code snippet of the route to get a form to post a new comment
![getNewCommentForm](https://user-images.githubusercontent.com/85452797/147454618-28661dbb-3083-4de9-8533-13e7484e9235.png)


