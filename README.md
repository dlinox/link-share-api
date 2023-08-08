# linkShareApi

## API description

- It is a website where users post entries on links.

- Each post has title, description, url.

- Each post can be voted with a score between 1 and 5.

- In more detail, this API allows the following actions:
    - registration
    - anonymous registration (limited to register and vote)
    - share links (URL, title, description)
    - see history of posting
    - erase a post
    - user votes (votes)
    - edit user profile 
        - name
        - email
        - bio
        - avatar

## Install

1. Install the dependencies (node_modules) using the `npm install` or `npm i` command.

2. Save the `.env.example` file as `.env` and fill in the necessary data.

3. Run `npm run initDb` to create the necessary tables in the database.

4. Run `npm run dev` or `node --watch app.js` to launch the server.


## Users Endpoints
- **POST** - [`/users/register`] -  create a new user ✅ - eve
- **POST**  - [`/users/login`]  - login ✅ - eve
- **GET** - [`/users`] - see profile ➡️ `Token`- karol
- **PUT**  - [`/users/avatar`] - see avatar ➡️ `Token`  ** NO
- **PUT** - [`/users/password`] - change password ➡️ `Token` - karol
- **PUT** - [`/users/email`] || - [`/users/username`] change email and or username ** NO
- **POST** - [`/users/password/recover`] - send an password recovery email ** ✅ eve
- **PUT** - [`/users/password/reset`] - to update the password with a recovery code ** ✅ eve


## APP endpoints
- **POST** - [`/links`] - create a post (URL, title, description) ➡️ `Token` - ana ✅
- **GET** - [`/links`] - see list of posted links (including previous days) - ana✅
- **GET**  - [`/links/:linkId`] -  see a specific post **✅ ana
- **DELETE** - [`/links/:linkId] - erase previous posts created by user - ana
- **POST** - [`/links/:linkId/votes`] - vote a post - ✅ ana

**

For anonymous users we need to add a restriction that they only are able to register and access the API. 

This might be done in the links and votes files. Maybe with an if f(x).

**
