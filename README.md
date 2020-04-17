# Bucket List

Bucket list is built as a tool to help you track the things that you want to do in your lifetime. You can add bucketlist items to your own personal list. For each item you can list tasks you need to complete to finish you bucket list item. As you complete tasks and items you can check them off you list and see them get crossed out. Have fun and enjoy life!


## Live Demo
https://bucketlist-gules.now.sh/1/bucketlist



##  API Endpoints

### /api/bucketlist
**GET** 
Get bucketlist for a specified user id 
`/id`

**POST** 
Add new item or task for specified user id 
`/id`
The following data is required from the form
type, 
user_id, 
item_id, 
item


### /api/auth
**POST**
`/login`
Send login data to retrieve JWT on succesfull authentication


### /api/users
**POST**
`/`
Add a new user to the database. The following data is required from the form
email,
password


## Preview
### Landing/Login Page
![landing/login page](https://i.imgur.com/CqoT7xB.png "Landing/Login Page")

### Signup  Page
![signup  page](https://i.imgur.com/S1udsU4.png "Signup Page")

### Bucketlist Page
![bucketlist page](https://i.imgur.com/UevAy9p.png "Bucket List Page")


## Built With
* This application uses the following technology
+ HTML
+ CSS
+ React
+ Jest
+ Chai/Mocha
+ Express
+ PostgreSQL
+ Knex