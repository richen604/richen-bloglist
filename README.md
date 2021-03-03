# richen-bloglist

Visit a production view of the application [here]()

List your favourite blogs! Authenticated and secure, this application was built using [NodeJS](), [ReactJS](), [MongoDB](), [ReduxJS]() and also includes the following frameworks:




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

## Motivation

Originally making this for the fso2020 course, I've decided to maintain it and showcase it. It shows knowledge of user authentication, routing, end to end testing