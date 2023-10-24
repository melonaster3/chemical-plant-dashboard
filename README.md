# Real-time Chemical Plant Dashboard

The Real-time Chemical Plant Dashboard is a web application built with React.js for the frontend and Node.js for the backend. It provides a user-friendly interface for monitoring and visualizing real-time data from a virtual chemical plant. The project includes various features and components for data visualization and interaction.

## Built with

- Javascript
- React
- Chart.js
- Node.js
- Express.js
- PostgreSQL

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `mydb`

3. Install dependencies: `npm run install:dependencies`
4. Fix to build: `build:client`
5. Reset database: Database is reset and created after server runs

- Check the db folder to see what gets created, check /server/db/dummyData/generateData function and change to likings

7. Run the application: `npm run start:dev`
8. Visit `http://localhost:3000/`
9. Visit `http://localhost:3001/api` to see backend data

## Functionality

### Main Page

![image](https://github.com/melonaster3/chemical-plant-dashboard/assets/101602590/925dadd4-c79c-4699-9fa4-144db1ab7901)

The Main page is very simple for all users to use. It consists of the chart/graph for users to use on the right side, and a series of buttons for users to use to modify what is showin in the chart

#### Yellow Buttons

The first set of Yellow Buttons ae used to either Fetch the latest data, or to reset the options. Data fetching is done every 5 minutes, but if user wants to see or check the latest data, they can click on it.

#### Purple Buttons

The set of Purple Buttons are to set what type of graph the user wants to see. Temperature, Pressure, Levels and All, with each button respectively showing what they should, but with Level, both Level of 1 and 2 are shown. User can click on the heading label at the top to remove one of the level and see the other level more clearly. All will show all values on the time range.

#### Pink Buttons

The pink buttons determine which type of graph user would like to see.

#### Time Range Green Buttons

The start time and end time are time ranges for users to manually input and check the data of. The green buttons will automatically set the last hour, day, week, and month prior to the time as of now.

#### Dark Green Buttons

The set of Dark Green Buttons will give the avereage of hourly, daily, weekly, monthly of what the time is right now. Reseting will go back to the chart showing the entire data set

#### Purple Buttons

The Purple buttons will allow users to export the data in to a xlsx file. Graph data button will export what is currently on the graph, and full data will export the entire data sheet

### Further Data

On the bottom, the average, max and min value of each components will be shown with data on the graph.


![MainPage](https://github.com/melonaster3/chemical-plant-dashboard/blob/new-main/client/public/simacro.png?raw=true)

## Dependencies

- chartjs-adapter-date-fns ^3.0.0
- luxon ^3.4.3
- xlsx ^0.18.5
- @mui/material ^5.14.14
- axios ^1.5.1
- chart.js ^4.4.0
- react ^18.2.0
- react-chartjs-2 ^5.2.0
- cors ^2.8.5
- dotenv ^16.3.1
- express ^4.18.2
- pg ^8.11.3

### Explanation on Package

For the required packages, React, Node.js and Git were technological requirements as well as Chart.Js for the project requirements. PostgreSQL DB was a recommended DB technology and was chosen for the reason of familiarity. React Chart Js was a package that was downloaded to pair with Chart.js.

Express JS was also chosen for the same reason for familiarity as well as for the easy and simply useage of only one API endpoint. Pg gave easy access to the existing PostgreSQL, and xlsx was use for the simple creation of Excel files to export given.

Axios was used for a more error fixing approach, as it is able to give errors and is easily useable compared to the normal "fetch" function.

Finally, Material UI was installed and used to make and give the application a more modern and easy UI for users to use. Dark Theme reducecs strain on users eyes, making the chart be visible for a longer time.

## Branch Organization

### new-main 
Main Branch. Created for the usage of polishing and deploying for client to use

### features/notes
Branch used to create features of the application that is related to adding the Readme.md as well as to add code notes and polish the application.

### main 
Old main branch, used for dev production.

### fix/Node_Module 
Error handling that happened in Node_Module git merging. (Fixing mistakes)

### features/BarGraph 
Branch used to create and edit all features that were handled for creating and editing the BAR Graph function that is part of Chart.js.

### features/LineGraph
Branch used to create and edit all features that were handled for creating and editing the LINE Graph function that is part of Chart.js.

### features/api 
Branch used to create and edit all features that were handled for craeting and editing the backend api function (that used PostgreSQL and Express)

### features/MUI 
Branch used to polish and tidy up the application

## Development and contributing

Feel free to send pull requests and raise issues.

## Acknowledgements

- Sang Lee, Main Developer
