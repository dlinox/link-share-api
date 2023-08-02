# linkShareApi

## API description

node --watch app.js ** //ask evelin what does this means (--Ana) It´s the same as nodemon but without dependency//

- API that allows:
    - registration
    - annonimus registration (limited to register and vote)
    - share links (URL, title, description)
    - see history of posting
    - erase a post
    - user votes (likes)
    - edit user profile 
        - name
        - email
        - bio
        - avatar

## Install

1. Install the dependencies (node_modules) using the `npm install` or `npm i` command.

2. Save the `.env.example` file as `.env` and fill in the necessary data.

3. Run `npm run initDb` to create the necessary tables in the database.

4. Run `npm run dev` to launch the server.


## Users Endpoints
- **POST** - [`/users/register`] -  create a new user - eve
- **POST**  - [`/users/login`]  - login - eve
- **GET** - [`/users`] - see profile with token - karol
- **PUT**  - [`/users/avatar`] - see avatar **
- **PUT** - [`/users/password`] - change password with token - karol
- **PUT** - [`/users/email`] || - [`/users/username`] change email and or username ** 
- **POST** - [`/users/password/recover`] - send an password recovery email **
- **PUT** - [`/users/password/reset`] - to update the password with a recovery code **


## APP endpoints
- **POST** - [`/entries`] - create a post (URL, title, description) - with token - ana
- **GET** - [`/entries`] - see list of posted posts (including previous days) - ana
- **GET**  - [`/entries/:entryId`] -  see a specific post **
- **DELETE** - [`/entries/:entryId] - erase previous posts created by user - ana
- **POST** - [`/entries/:entryId/votes`] - like a post - pending
- **DELETE** - [`/entries/:entryId/votes`] - unlike a post **

**

For anonymous users we need to add a restriction that they only are able to register and access the API. 

This might be done in the entries and votes files. Maybe with an if f(x).

**
