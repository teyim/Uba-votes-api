# Uba-votes-api

This is a backend for an e-voting application that allows users to create and participate in online polls. It uses nodejs and expressjs to handle the server-side logic and mongodb to store the data.

## Features

- User authentication and authorization using JWT
- CRUD operations for campaigns and votes
- Validation and sanitization of user input using Joi
- send emails via Nodemailer

## Installation

To run this project, you need to have nodejs, npm and mongodb installed on your machine. Then, follow these steps:

- Clone this repository using `git clone https://github.com/teyim/Uba-votes-api.git`
- Navigate to the project directory using `cd Uba-votes-api`
- Install the dependencies using `npm install`
- Create a `.env` file in the root directory and add the following variables:

```
DB_CONNECTION=<your-mongodb-connection>
JWT_USER_TOKEN_SECRET=<your-jwt-secret-key-for-user>
JWT_USER_TOKEN_SECRET=<your-jwt-secret-key-for-admin>
EMAIL=<your-email-for-nodemail>
PASSWORD=<your-password-for-nodemail>
```

- Start the server using `npm start`
- The server will be running on `http://localhost:3001 

## API Documentation

The API of this project follows the RESTful principles and uses JSON as the data format. The base URL for all requests is `http://localhost:3000/api`.

| Endpoint | Method | Description | Parameters | Response |
| -------- | ------ | ----------- | ---------- | -------- |
| /users | GET | Get all users | None | An array of user objects |
| /users/:id | GET | Get a user by id | id: The user's id | A user object |
| /users | POST | Create a new user | name: The user's name, email: The user's email, password: The user's password, bvn: The user's BVN | A user object |
| /users/:id | PUT | Update a user by id | id: The user's id, name: The user's name, email: The user's email, password: The user's password, bvn: The user's BVN | A user object |
| /users/:id | DELETE | Delete a user by id | id: The user's id | A message object |
| /elections | GET | Get all elections | None | An array of election objects |
| /elections/:id | GET | Get an election by id | id: The election's id | An election object |
| /elections | POST | Create a new election | title: The election's title, description: The election's description, candidates: An array of candidate names, creator: The user's id who created the election | An election object |
| /elections/:id | PUT | Update an election by id | id: The election's id, title: The election's title, description: The election's description, candidates: An array of candidate names, creator: The user's id who created the election | An election object |
| /elections/:id | DELETE | Delete an election by id | id: The election's id | A message object |
| /votes | GET | Get all votes | None | An array of vote objects |
| /votes/:id | GET | Get a vote by id | id: The vote's id | A vote object |
| /votes | POST | Create a new vote | election: The election's id, voter: The user's id who voted, candidate: The candidate's

