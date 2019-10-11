FrontEnd:reactJS(Using CRA)
npm i
npm start

Server:NodeJS
npm i
nodemon

DB:MongoDB

Steps to use
1)Register the user
2)Login
3)Add Comments
4)View Comments
5)Reply

assumption

1)user registration only includes username and password, So security was not priority during design
2)Deletion of reply and comments is not allowed
3)UI is not given priority as functionality was priority


Design

For nested reply to the comments i have used nested Array of JSON to create Tree type data structure.
Reading and writing of the structure is done same as how tree is traversed.








