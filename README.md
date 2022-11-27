# Getting Started with Spoti-fun

This Project contains 2 backend servers, FastAPI and Socket.io. <br>
FastAPI manages the request calls and socket.io manages the live chat

## Available Scripts

### `npm start`
You will need to run npm start in two directories, one for react and another for socket.io <br> 
npm start in the root `spoti-fun` folder<br> 
and npm start in the `server` folder

### `FASAPI`
You will also need to run the python script that manages the backend http requets<br>
Navigate to the server/python location and run <br>
```uvicorn main:app --reload```

### `environment variables`
You will need to create a `.env` file and add your variables there. 
I created a .env-template as an example. 
Anywhere in the code where you see `env.proccess.REACT_APP_*` it will need to be in the .env file. 


### `npm run build`

Builds the app for production to the `build` folder\
It correctly bundles React in production mode and optimizes the build for the best performance

The build is minified and the filenames include the hashes\
Your app is ready to be deployed!
