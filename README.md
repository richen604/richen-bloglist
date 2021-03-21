# richen-bloglist

Visit a production view of the application here at [richen-bloglist](https://richen-bloglist.herokuapp.com/)

List your favourite blogs! Authenticated and secure, this application was built using [NodeJS](https://nodejs.org/en/), [ReactJS](https://reactjs.org/), [MongoDB](https://www.mongodb.com/), [ReduxJS](https://redux.js.org/), [ExpressJS](https://expressjs.com/) and also includes the following frameworks:

- [Cypress](https://www.cypress.io/) for End to End Testing
- [testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom) && [testing-library/react](https://testing-library.com/docs/react-testing-library/intro) for Unit Testing 
- [React Router](https://reactrouter.com/web/guides/quick-start) for routing in React
- [ReactStrap](https://reactstrap.github.io/) for pre-generated React components
- [Mongoose](https://mongoosejs.com/) for MongoDB
- [redux-persist](https://www.npmjs.com/package/redux-persist) for persistent state management
- [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing passwords
- [eslint](https://www.npmjs.com/package/eslint) for linting
## Motivation

Originally making this for the [fso2020](https://fullstackopen.com/en/) course, I've decided to maintain it and showcase it.

It shows knowledge of user authentication, routing, unit testing, end to end testing, state management and production pipelines
## Local Development

- `git fork` or `git clone` this repository and save it locally
- run `npm install` to get dependencies
- for development run `npm run dev-server` and `npm run dev-client`
    - make sure all files in `src/services/` point to the correct endpoints
- for production run `npm build` to build the ui and `npm run start` to start the server
    - make sure you change the endpoints in `src/services/` !!!

Tests can be ran with the following commands `npm run test` and `npm cypress:run` 

## Contributing

Fork this repository. Using the above local development changes.

Make a new branch for your changes and add it to the forked repository you created. Name it related to your fix / refactor `eg. hotfix-styling-login`. Then, make a pull request with your changes and our team will review it.

## TODO

The majority of the older commits seem vague and I plan to add a changelog to accommodate. However, for now the exercises in the application can be viewed:

- [Part 4: Testing Express Servers, User Administration](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-1-4-2)
- [Part 5: Testing React Apps](https://fullstackopen.com/en/part5/login_in_frontend#exercises-5-1-5-4)
- [Part 7: React Router, Custom Hooks, Styling Apps with CSS and Webpack](https://fullstackopen.com/en/part7/exercises_extending_the_bloglist)
 
 Note the links are for Full Stack Open 2021, and this project is based of Full Stack Open 2020. Nothing much has changed in the curriculum from the looks of it.