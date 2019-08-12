<!-- <p align="center"><img src="assets/logos/team-taco-logo.png" alt="team taco logo" width="500"/></p> -->

This is the 4th Project of NYC's General Assembly SEI Panda Cohort, created by Erinn Nelson.

# qip

## Project Outline

This app is designed to let users quickly create and share short polls for the purpose of data gathering in a friendly and easily digestable format.

### Set Up
* Fork and clone this repo
* cd into the app directory
* `bundle`
* run `rails s` to initialize the backend server
* `cd client`
* run `npm start` and allow the client server to run on an available port

_Site link not yet available_

Created with [React](https://reactjs.org/) and [Ruby on Rails](https://rubyonrails.org/)

## Feature List/User Stories
* As a group leader, I want to be able to get gather easy to understand feedback from my group so that I can understand what they want and/or feel
* As an event organizer, I would like to be able to see polls I created previously so that I can remember what decisions were made
* As a busy student, I want to be able to vote on a poll without having to register an account, so that I can move on quickly to other pressing matters

## ERD

<img src="assets/erd/erd.png" alt="entity relationship diagram" width="400"/>

## Wireframes

<img src="assets/wireframes/voting-results.png" alt="voting results mockup" width="200"/> <img src="assets/wireframes/vote-screen.png" alt="voting screen mockup" width="200"/> <img src="assets/wireframes/user-profile.png" alt="user profile mockup" width="200"/>

## MVP
* Users may create/edit/delete an account
* Registered users can create/delete and share polls
* Registered users may vote on polls (one time only)
* Registered users can view previously created polls

## PostMVP
* Unregistered users can vote on polls (one time only)
* Polls can marked as closed by the creator
* Users can change their vote
* Polls can be updated on the user's screen in realtime

<!-- ## Additional Libraries

* [Axios](https://www.npmjs.com/package/axios)
* [PostgreSQL](https://www.npmjs.com/package/pg)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [CORS](https://www.npmjs.com/package/cors)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Body Parser](https://www.npmjs.com/package/body-parser)
* [Morgan](https://www.npmjs.com/package/morgan)
* [JSON Web Tokon](https://www.npmjs.com/package/jsonwebtoken)
* [BCrypt](https://www.npmjs.com/package/bcrypt)
* [React Router](https://www.npmjs.com/package/react-router)
* [React Router Hash Link](https://www.npmjs.com/package/react-router-hash-link)
* [React Modal](https://www.npmjs.com/package/react-modal)
* [React OnClick Outside](https://www.npmjs.com/package/react-onclickoutside/v/4.8.0)

## Issues and Resolutions



| **Potential Problem** | **Proposed Solution:** |
| --- | --- |
| Searching | Use PostGreSQL select parameter 'LIKE' |
| Users forgetting passwords | Create temporary token that allows user to create new password | -->