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


