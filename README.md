![Y2K](https://i.imgur.com/4jo9ruW.png)

# Calendar App

This is a calendar app that allows you to view and manage events for the current month. The app is divided into two portions: a **Calendar portion** and an **Event list portion**.

## Calendar Portion

The calendar portion displays the **current month** and dates of the month. The header displays app title, clock and the current year. The body of the calendar displays the current month, with arrows bordering the sides of the calendar. If the first day of the current month does not start on a Sunday, the last dates of the previous month are displayed as buffers.

## Event Portion

The event portion displays the **current day of the week and the current month and date (numerical)**. A list of events with corresponding dates of the month is displayed, divided by a vertical bar. At the bottom of the list, there is an **"Add Event Icon"** button. When the app loads, any appointments for the current date are displayed. If there are no appointments for the current date, the app displays "No Appointments".

## Modal Form

The modal form is activated via the "Add Event Icon" button. The form **floats above the content** and allows users to add new events to the calendar. The form includes fields for the **event name, datetime, description, location, and description**. The user can close the form without submitting the information, and the form closes on submission of the event information.

## Styling

Minimalistic and Responsive design.

## Functionality

Upon load, the calendar displays the correct layout of the current month, with the weeks starting on Sunday. The app displays the last days of the previous month and/or the first days of the next month as buffers when needed. The current date is set apart from the others in the appointment panel. Scrolling is accurate, allowing users to navigate forward and backward in time.

The app displays a small dot under a day if there is one or more appointments for that day in the displayed month. When a user clicks on a day in the currently displayed month, the labels and appointments update in the appointment panel. When a user inputs a new appointment, the appointment dot under the correct day is shown immediately. The app implements the full CRUD (create, read, update, delete) lifecycle for appointments, using the modal for creating/update/delete and the panel for review.

For **Edit and Delete**, simply click the **Kebab Menu** located at each event.

## Developer Notes

Unfortunately datetime-local doesn't play well with certain browsers, you may need to enter time manually.
Enjoy using the calendar app!

## Getting Started

### Prerequisites

##### This application requires either [yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com/) to run therefore please ensure you have the latest version installed on your computer.

To get the app running locally, you can either:

```
1. git clone https://github.com/Pixelshot/calendar-app.git
```

2. Download the zipfile from https://github.com/Pixelshot/calendar-app.git

### Steps

Type in `yarn/npm install` in your terminal to install all dependencies for this project. Once completed, run `yarn/npm start` to start the server on port `localhost:3000`.

## Built With

- [Remix](https://remix.run/)
- [Tailwind](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)
- [Netlify](https://www.netlify.com/)
