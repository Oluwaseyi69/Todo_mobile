 Welcome to Todo Mobile App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Thought Process
   ```
   Since the whole idea if to achieve a simple but yet user friendly mobile app, and to be secured as well.
   The first thing was to properly design the code structure for readability and clean code, following  one of the software engineering design pattern which is Separation of Concerns, where i have the Service layer which strictly contains the logic of the app, screens where each screen been implemented and then the component. In other to Authenticate and Authorize user, AsyncStorage was used to set and get tokens that is been generated from the back-end, I used the backend Api that I built for this project.
   ```

4. Technology Used
   ```
   React Native (JavaScript)
   React Navigation
   Tailwind CSS...

   Backend
   Nodejs and express
   MongoDb 
   Axios for HTTP client request and response API communications.

   Token-based Auth: All protected routes are accessed using JWTs, securely stored and attached via headers.
    ```
