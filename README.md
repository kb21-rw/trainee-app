# Trainee App

Trainee App is a web application designed to streamline the process of collecting and managing trainee information for coaches. It offers a user-friendly interface for coaches and admins to register, log in, and efficiently manage data. This projectt is monorepo project which contains two part backend and frontend. It is built using Vite, React, Redux, React Router on the frontend, and Node.js with Express on the backend, all in TypeScript language. It use mongodb database to store data

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)

## Features

### User Management
- **User Registration**: Only admins can register both coaches and trainee. When coach is registered he/she get sent password via the registered email which allow him/her to login so that is he/she can fill the informations related to his/her trainees and he/she can be assigned to trainees as a coach.
 except the first admin who is registered  manually other get registered by upgrading their role to an admin

- **User Login**: Login is now allowed for admins and coach
- **User update**: Admins is able to update user data for every user including admins and can change data such as name, email, roles for coach and admins, and coaches for trainees. coaches can change data for their assigned trainees.
- **User delete**: Only admins is alloweed to delete users
- **User delete**: Admins and coaches can change their profile setting like name, email and password

## Admin only features
- **Admin Dashboard**: Admins can manage users, including adding, updating, and deleting users add forms and view the data filled by coaches.
- **Assign Coaches**: Assign coaches to trainees for mentorship and guidance.


### Form Management
- **Create Forms**: Admins can create forms for collecting trainee data.
- **Update Forms**: Forms are customizable and can be updated as needed.
- **Delete Forms**: Admins can remove obsolete forms.

### Data Visualization
- **Table View**: Display trainee data in a table format for easy access.
- **Form Filling**: Coaches can fill in trainee data through forms in table the same way as google sheet. coach can view all data for trainees but is able to change data for  trainees assigned to him/her

### User Management
- **updating trainee**: Coach can view data and update the information of their trainees

## coach features

### Data Visualization
- **Table View**: Display trainee data in a table format for easy access for all trainees
- **Filling Forms**:  Coach can fill the information only for their  trainees.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/trainee-app.git
cd trainee-app
### Navigate to the project directory to backend:
cd backend
### Install dependencies for backend:
npm install
### run backend:
npm run dev
### Navigate to the project directory to frontend:
cd frontend
### Install dependencies for backend:
npm install
### run backend:
npm run dev

cd frontend
### Install dependencies:
npm install

    
### Usage
    
Open your web browser and access the app at http://localhost:5170.
