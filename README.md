# linkShareApi

## API description

- It is a website where users post entries on links.

- Each post has title, description, url.

- Each post can be voted with a score between 1 and 5.

- In more detail, this API allows the following actions:
    - registration
    - change, recover or update the password
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

For the 

## Install

1. Install the dependencies (node_modules) using the `npm install` or `npm i` command.

2. Save the `.env.example` file as `.env` and fill in the necessary data. We have left the last three fields filled with some data that you will need for the password recovery code process.

3. Run `npm run initDb` to create the necessary tables in the database.

4. Run `npm run dev` or `node --watch app.js` to launch the server.


## Database tables:
-   **`users:`**
-   **`users:`**
-   **`users:`**
-   **`users:`**

## Users Endpoints

- **POST** - [`/users/register`] -  create a new user - Eve ✅
- **POST**  - [`/users/login`]  - login - Eve ✅
- **GET** - [`/users`] - see profile ➡️ `Token`- karol
- **PUT**  - [`/users/avatar`] - see avatar ➡️ `Token`  **
- **PUT** - [`/users/password`] - change password ➡️ `Token` - Eve ✅
- **POST** - [`/users/password/recover`] - send an password recovery email - Eve ✅
- **PUT** - [`/users/password/reset`] - to update the password with a recovery code - Eve ✅


## APP endpoints
- **POST** - [`/links`] - create a post (URL, title, description) ➡️ `Token` - Ana ✅
- **GET** - [`/links`] - see list of posted links (including previous days) - Ana ✅
- **GET**  - [`/links/:linkId`] -  see a specific post - Ana ✅
- **DELETE** - [`/links/:linkId] - erase previous posts created by user - Ana ✅
- **POST** - [`/links/:linkId/votes`] - vote a post - Ana ✅
