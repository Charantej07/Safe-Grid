# Safe-Grid

#Setup git
INITIAL SETUP
-> git init
-> git clone https://github.com/Charantej07/Safe-Grid
FOR EVERY NEW FEATURE 
-> git pull
-> git checkout -b <your branch name>
-> switch to the branch and make changes
-> git add <file_name> and git commit -m <msg>
-> git push origin <branch_name>
-> In the UI, create a pull request and add reviewers and merge


#Backend setup

-> navigate to backend
-> npm install express mongoose dotenv jsonwebtoken bcrypt cors
-> npm install --save-dev nodemon
-> server runs on port - 5000 (can change in .env)
-> Db related info in db.js
