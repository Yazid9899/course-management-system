# course-management-system

a simple course management system using react native for exercise
This project is a simple example of a client-server app using Expo for the front end with paper for styling,
`json-server` for the dummy server, and `ngrok` to expose the server to the internet for testing purposes.

1. Clone this repository to your local machine:

   ```bash
   git clone [https://github.com/your-username/your-expo-react-native-app.git](https://github.com/Yazid9899/course-management-system.git)https://github.com/Yazid9899/course-management-system.git

   ```

2. Open the folder with your code editor (me: VScode):

   ```bash
   code .\course-management-system\
   ```

3. Install the required dependencies for both the client and the server:

   ```bash
   npm i
   ```

## Running the App

### Start the Dummy Server

1. Navigate to the server directory:

   ```bash
   cd Server
   ```

2. Start the dummy server using json-server:
   https://www.npmjs.com/package/json-server

   ```bash
   json-server --watch db.json
   ```

3. Open ngrok to run your locally hosted server to the internet, allowing react native to hit json server API.
   source: https://ngrok.com/docs/
   and run:
   ```bash
   ngrok http 3000
   ```

### Start the react-nantive expo

1. Change the BASE_URL in ./config/baseurl.js to your ngrok server url

2. run the app using expo command:

   ```bash
   npx expo start
   ```

3. Once you have the Expo React Native app and the dummy server running, you can interact with the app as you normally would. It will make API requests to the exposed ngrok URL, which will be routed to the json-server running locally.

##THANK YOU!
