# Safe-Grid

Setup Guide

1. Git Setup

Initial Setup:
- git init
- git clone https://github.com/Charantej07/Safe-Grid

For Every New Feature:
- git checkout main
- git pull
- git checkout -b <your-branch-name>
- Switch to the branch and make changes
- git add <file-name>
- git commit -m "<commit-message>"
- git push origin <branch-name>

  How to resolve merge conflicts if you encounter one:
  - git checkout main
  - git pull 
  - git checkout <your-branch-name>
  - git merge main (You have to resolve the conflicts either in the merge edito or manually)
  - git add <conflicted-file-name> (or simply git add .)
  - git commit -m "<commit-message>"
  - git push oigin <your-branch-name>

- In the UI, create a pull request, add reviewers, and merge the changes.
  

2. Backend Setup

- Navigate to the 'backend' directory:
  `cd backend`

- Install necessary dependencies:
  `npm install` 

- The server runs on port 5000 by default. You can change this in the '.env' file.

- Database-related information can be found in db.js.

Additional Information:
- Make sure to configure environment variables in the '.env' file for sensitive data like API keys, database credentials, etc.

3. Frontend Setup

- Navigate to the front-end directory:
  `cd front-end`

- Install necessary dependencies:
  `npm install`