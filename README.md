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

## Development and contributing

Feel free to send pull requests and raise issues.

## Acknowledgements

- Sang Lee, Main Developer
