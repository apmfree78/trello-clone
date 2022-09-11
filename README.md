# Productivity App - Trello clone build with React, TypeScript, Redux and Material UI

Add, edit, delete, and move cards with this trello clone.  Drag and drop feature
makes it easy to drag a card to another list or reodering within the same list.

## Modern Redux for State Management

Latest version of Redux is used to manage state of all cards and card actions.

In addition to this we use a global context, that includes a ref
containing coordinates (starting and ending) of a card that is being
dragged by user and a function to record drag coordinates. 

This setup works well for scaling if we decide to create another
app that would function as API endpoint to a SQL or mongoDB database.

This would be next steps if goal was to eventually commercialize the app.

## Material UI for design

I used material UI for the design and layout of the application,
as it's a modern and robust framework that is also optimized to
work on different browsers, devices, and screen sizes.

## Coding Best Practices

Application is broken down ito 5 major Components, a global Context file (discuss above),
and a lib folder containing seed data, interfaces, and `useForm` customhook.

*Code is eslint compliant, auto-formatted with prettier, and appropriately commented.*

**A lot of thought was put into variable and component naming to make application easy to understand
and follow.**

Sample data is preloaded onto app. 

## `localStorage` for data persistence 

To make this app usable card data must persist between sessions. I setup
`localStorage` to make this happen. If you update, add, delete, or move
cards and hard refresh or come back to the site later (on the same browser)
than your changes will still be there!

## Setup for continuous deployment on Netlify

App is set to recompile and re-deploy on Netlify every time a new
update is pushed to github from local repository

To run app on your machine just git clone the repository and ...

### `npm install` then `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`



