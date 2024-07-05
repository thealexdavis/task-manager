# Requirements
* Node version 18.19.1 or above
* NPM 10.2.4 or above

## Dev Notes
* This was built on a Mac, tested on Chrome, Safari, and Firefox.
* On first load, default data will go into the task manager table.
* Data can be added, edited, or deleted through modals on actions taken inside the application.
* Data will persist between sessions. To reset, please clear your local storage.
* Table headers are sticky. New items appear at the bottom of the list. Scroll inside table to view more.
* Click on the headers to sort the table.
* Use the dropdowns to filter the data.
* Click the checkboxes to select tasks for bulk actions.
* Click the buttons to view, edit, or delete a task.

## Instructions
1: Open up command line or Terminal\
2: Clone this repository to your local machine using HTTPS or SSH\
    *Example: git clone git@github.com:thealexdavis/task-manager.git\
3: Change into the cloned directory\
    *Example: cd task-manager\
4: Run npm install to install all necessary packages\
    *Example: npm install\
5: Once complete, if successful, you may run the start command to run the application in development mode, or the build command to produce the application into the build directory for deployment\
    *Example 1: npm start\
    *Example 2: npm run build

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!