# E-COMMERCE NINJAS WEB APPLICATION - FRONTEND

Our e-commerce web application server, developed by Team Ninjas, facilitates smooth online shopping with features like user authentication, product cataloging, and secure payments. It's built to enhance the user experience with high performance and reliability. Suitable for any online marketplace looking to grow.


## Hosted Application URL

[https://e-commerce-ninjas.netlify.app/](https://e-commerce-ninjas.netlify.app/)

## Github repository

[https://github.com/atlp-rwanda/e-commerce-ninjas-fe](https://github.com/atlp-rwanda/e-commerce-ninjas-fe/tree/develop)


[![Maintainability](https://api.codeclimate.com/v1/badges/a7dce016f123cdcc9042/maintainability)](https://codeclimate.com/github/atlp-rwanda/e-commerce-ninjas-fe/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a7dce016f123cdcc9042/test_coverage)](https://codeclimate.com/github/atlp-rwanda/e-commerce-ninjas-fe/test_coverage)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a3ed5a75-a862-4f3b-ba21-8369180cf3e6/deploy-status)](https://app.netlify.com/sites/e-commerce-ninja-fn-staging/deploys)
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/e-commerce-ninjas-fe/badge.svg)](https://coveralls.io/github/atlp-rwanda/e-commerce-ninjas-fe)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/e-commerce-ninjas-fe/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/e-commerce-ninjas-fe/tree/develop)
[![CI](https://github.com/atlp-rwanda/e-commerce-ninjas-fe/actions/workflows/ci.yml/badge.svg)](https://github.com/atlp-rwanda/e-commerce-ninjas-fe/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ec14a22a-2d7e-4892-9ff4-9203cd3e8ac3/deploy-status)](https://app.netlify.com/sites/e-commerce-ninjas/deploys)

## Completed features
- Setup empty react
- Setup Redux store
- Setup StoryBook documentation
- Landing page
- Sign up page
- Login/Signup with Google
- Notification panel

## Get started
- Clone repository
  ```bash
  git clone https://github.com/atlp-rwanda/e-commerce-ninjas-fe
  ```
- Install dependencies
  ```bash
  npm install
  ```
- Run App - it will run on http://localhost:5000/
  ```bash
  npm run dev
  ```
     
## StoryBook

To run storybook for documentation, use this command

```sh 
npm run storybook 
```

## Folder Structure

- `public`: Contains static files and folder like `index.html` and images.
- `src`: The main source folder for the React application.
  - `components`: Reusable UI components.
  - `pages`: Different pages/screens of the application.
  - `store`: Redux store setup and slices.
  - `stories`: StoryBook stories for UI components.
  - `utils`: Utility functions and helpers.
- `.babelrc`: Babel configuration file.
- `.eslintrc`: ESLint configuration file.
- `.gitignore`: Specifies which files and directories to ignore in Git.
- `package-lock.json`: Automatically generated file that describes the exact tree of dependencies.
- `package.json`: Contains project metadata and dependencies.
- `README.md`: The readme file you are currently reading.
- `tsconfig.json`: TypeScript configuration file.
- `webpack.dev.config.ts`: Webpack configuration file for development.
- `webpack.prod.config.ts`: Webpack configuration file for production.