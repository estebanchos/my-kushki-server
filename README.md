# myKushki Server - Financial Literacy
My Kushki is a web app and iOS app designed to help educate First Nations members of Northern Ontario on financial literacy and provide them with tools to help them manage their finances.
This MVP and the accompanying iOS app were completed in two weeks. Enhancements are expected as I start working closely with interested First Nations communities.

Front-end repo: [my-kushki client](https://github.com/estebanchos/my-kushki-client "my-kushki client")
iOS repo: [my-kushki iOS](https://github.com/estebanchos/myKushki-iOS "my-kushki iOS")

## Problem Space
The general population lacks financial education and the skills to plan their financial future successfully. On top of that, First Nations live in remote areas and lack access to resources available in cities like internet access.

Given that First Nations members generally access the internet through their smartphones and financial education webpages out there are not tailored to their specific situation and needs, My Kushki’s objective is to provide tailored financial literacy training optimized to be consumed on a smartphone screen.

## Features
* Account sign up and login
* Users can access their info anywhere
* Creating and tracking a budget
* Creating and tracking expenses and the impact on the monthly budget
* Learning modules structure, from basic to advance - pending content creation
    * Recommended articles to external sources to strengthen learning

## Teck Stack
### Front-end
* React
* Sass

### Back-end
* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT

### Mobile (iOS)
* Swift
* SwiftUI

## Dependencies
### Front-end
* Axios
* antd
* hamburger-react
* react-router-dom@5.3
* react-number-format
### Back-end
* bcryotjs
* cors
* dotenv
* nodemon
* uniqid

## Environment dependency
### Back-end
Create a .env file and include:
* PORT: port where the server will run
* MONGO_URL: this is the url to your mongoDB Atlas database
* JWT_KEY: key to create JWT tokens

## Installation - Server
### Clone
Clone repo locally:

`git clone git@github.com:estebanchos/my-kushki-server.git`
### Setup
* Open the project folder and install dependencies.

`npm i`
### Run
* Run server locally using nodemon.

`npm run dev`

## Installation - Client
### Clone
Clone repo locally:

`git clone git@github.com:estebanchos/my-kushki-client.git`
### Setup
* Open the project folder and install dependencies.

`npm i`
### Run
* Run react app locally.

`npm start`

## Next Steps
### Features
* Edit and delete budget and expenses
* Implement chat feature with socket.io
* Multi-month tracking - opening, editing and deleting months
* Yearly tracking - yearly summary and month-to-month insights/comparisons
* Savings / Investing tool to help estimate the impact of saving and/or investing
### Content
* Meet with the First Nations community to understand pain points and most critical content
* Phase-out content development based on community priorities and pain points

## Lessons Learned
* As a Junior Dev I enjoyed working with Mongo and Mongoose more than MySQL and Knex.
* The best way to work for me was to implement a feature, debug it, and only then start styling.
* I managed calculations (e.g. budget total, or category remaining budget) on the front-end. I think it would've been easier to deal with the them in the back-end and just fetch them in the front-end. I will test this approach on the next iteration.

## Contact Info
[Email](mailto:charlie@carlosocampo.ca "Email")

[LinkedIn](https://www.linkedin.com/in/carlosocampo/ "LinkedIn")
