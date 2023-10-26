# Trainee App

Welcome to the trainee app 🤗. Trainee App is a web application designed to streamline the process of collecting and managing trainee information for coaches. It offers a user-friendly interface for coaches and admins to register, log in, and efficiently manage data.

## Project Overview

This project is a monorepo project that contains two parts backend and frontend. It is built using Vite, React, Redux, and React Router on the frontend, and Node.js with Express on the backend, all in TypeScript language. It uses the MongoDB database to store data.

[Trainee app hosted](https://trainee-app.vercel.app/)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)

# Features

- **User Login**: Login is now allowed for admins and coach
- **Reset password**: The user can reset the password by providing the user email where we send a random password which can later be updated through updating the password in the profile setting page
- **Updating user profile**: Both coach and admins can change their data like name, email, and password when they are logged in through profile settings you can go to profile settings by clicking on the user's name

## Admin only features

### User Management

- **User Registration**: Only admins can register both coaches and trainees. When a coach is registered he/she gets sent a password via the registered email which allows him/her to log in so that he/she can fill in the information related to his/her trainees and he/she can be assigned to trainees as a coach. except for the first admin who is registered manually Others get registered by upgrading their role to an admin

- **Update trainee**: Admins can update the information of a trainee by going to the trainee info page and pressing the edit button on the targeted trainee and get edit trainee modal from there you can change the name, email, or assign coach to the trainee.
- **Update coaches and admins**: Admins can update the information of both admins and coaches by going to the coach info page pressing the edit button on the targeted admin or coach and getting the edit coach modal from there you can change the name, email, or change the role of the user.
- **User delete**: Only admins are allowed to delete users. Admins delete users by going to either the trainee info page or the coach and admins info page and press the delete button of the targeted user.

### Form Management

- **Create Forms**: Admins can create forms for collecting trainee data.
- **Update Forms**: Forms are customizable and can be updated as needed.
- **Delete Forms**: Admins can remove obsolete forms.

### Data Visualization

- **Table View**: Display trainee data in a table format for easy access.
- **Form Filling**: Coaches can fill in trainee data through forms in the table the same way as Google sheet. coach can view all data for trainees but is able to change data for trainees assigned to him/her

## coach features

### User Management

- **Update trainee**: Coaches can update the information of a trainee by going to the edit My trainee page pressing the edit button on the targeted trainee and getting the edit trainee modal from there you can change the name, and email of the trainee.

### Data Visualization

- **Table View**: Display trainee data in a table format for easy access for all trainees
- **Filling Forms**: Coach can fill in the information only for their trainees.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

## Installation

1. Clone the repository:

```bash
git clonehttps://github.com/NNesta/trainee-app.git
```

2. Navigate to the repository

```bash
cd trainee-app
```

### Navigate to the project directory to the backend:

```shell
cd backend
```

### Install dependencies for the backend:

```shell
npm install
```

### run backend:

```shell
npm run dev
```

### Navigate to the project directory to frontend:

```shell
cd frontend
```

### Install dependencies for the frontend:

```shell
npm install
```

### run the frontend:

```shell
npm run dev
```

Open your web browser and access the app at http://localhost:5173.

## To contribute

### Install husky to apply eslinting and prettier before committing
 ```bash
npx husky install
```
  
