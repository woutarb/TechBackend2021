# Beermatching
The Beermatching app is a hypothetical application in which a filter feature is explored.
In the Beermatching app, you and other users are matched based on how much of the same beer you like.
However, different users have different standards, so the filtering feature allows you to change who you see.
You can select the gender, the age and the percentage of the same beers you'd like the other to have, allowing you to focus on finding the person who doesn't just have the same taste, but is also to your taste.

## Live preview
The live preview is live at this https://beermatching-app.herokuapp.com/

## Setting it up locally
### Cloning
If you prefer cloning it in the CLI instead of downloading a ZIP, run the following code:
#### CLI
```` git clone https://github.com/wouterBijns/TechBackend2021.git ````

With npm installed, open your terminal at the folder in which you unpacked the data of this repo and run the following commands:
### Installing dependencies
You can install the dependencies of this project by running
```` npm install ```` in the folder the clone is in.
### Open server 
The server will open on port 3000 by default by using; 
```` npm start ````

### Set up your .env 
Set up your .env file for a MongoDB connection to include;
```` 
DB_USER=<Your Username>
DB_PASS=<Your password>
DB_NAME=<The name of your database> 
````
