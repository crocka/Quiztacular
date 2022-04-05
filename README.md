Quiztacular
=========
Quiztacular allows users to create, share, and complete quizzes of a variety of topics. Users can share the link of a specific quiz, as well as share the link to a specific quiz attempt result. The user authentication is powered by bcrypt library. The frontend is implemented with jQuery and Ajax libraries for API and event management, and the backend API management is implemented with express server library and PostgreSQL.

## Project Setup

Install dependencies with `npm install`.

## Getting Started

1. Run `npm start`
2. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- "bcrypt": "^5.0.1",
- "chalk": "^2.4.2",
- "cookie-session": "^2.0.0",
- "dotenv": "^2.0.0",
- "ejs": "^2.6.2",
- "express": "^4.17.1",
- "morgan": "^1.9.1",
- "pg": "^8.5.0",
- "sass": "^1.35.1"

## Running Webpack Development Server

```sh
npm start
```

## Screenshots
### Main page
!["Main page"](https://github.com/crocka/Quiztacular/blob/master/image/main_page.png)
### Create quiz page
!["Create a new page"](https://github.com/crocka/Quiztacular/blob/master/image/create_quiz_page.png)
### Attempt quiz page
!["Attempt to do a quiz"](https://github.com/crocka/Quiztacular/blob/master/image/attempt_quiz_page.png)
### Result page
!["The result of your quiz attempt"](https://github.com/crocka/Quiztacular/blob/master/image/result_page.png)
