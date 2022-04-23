# ListThis

ListThis is a web application that allows you to create and collaborate on lists. Whether you need to share a shopping list with a group of people, or simply have a checklist for yourself, you can ListThis!

## Running the Application

The steps below assume you have cloned the repository onto your local machine.

### Frontend

1. Change your working directory to the frontend folder (`cd frontend`)
2. Run `npm i` to install the required node modules
3. Run `npm start` to start the frontend on [http://localhost:3000](http://localhost:3000)

### Backend

1. Change your working directory to the backend folder (`cd backend`)
2. Run `npm i` to install the required node modules
3. Run `npm run dev` to start the backend on [http://localhost:5000](http://localhost:5000)

Note: `npm run dev` uses `nodemon` to refresh the server every time a change is made. For a more "permanent" solution, use `npm start` or `node app.js`. Furthermore, some additional configuration is required in a .env file, containing all necessary keys for AWS.

## Deployment

Your repository should contain the necessary secrets (access key id and secret access key for frontend and backend AWS accounts) under the Secrets > Actions section in the settings.

Upon pushing to the main branch, GitHub actions will take care of the rest, deploying the frontend directory to Elastic Beanstalk, the (Docker image of) backend to Elastic Container Registry (ECR), and a new task definition to Elastic Container Service (ECS) using the [task definition](./backend/.aws/task-definition.json) in the AWS configuration directory.
