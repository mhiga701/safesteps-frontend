# safesteps-frontend

## About
Mobile App
To properly align each component of our app, we separated our front and backend repos for more clarity. This repo holds the code for the frontend design, as well as the client-side Bluetooth Low Energy (BLE) scanner that will run in the background and scan for nearby sensors when the app is running. 
## Required Software

To get started running this project you will need to have the following setup to your computer:

-Node.js Version 19 or greater 
-VS Code or any code editor that can run React Native Apps
-Have the Expo Go app installed on your mobile devices

Here are the links for the any of the softwares that you would required to be installed

- [Node.js](https://nodejs.org/)
- [npm (Node Package Manager)](https://www.npmjs.com/get-npm)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Getting Started 

1. Clone this repository to your local desktop:

   ```shell
   git clone git@github.com:mhiga701/safesteps-frontend.git
   ```
2. Change the directory to where you clone your repository on your Desktop 
   ```shell
   cd "\safesteps-frontend"
   ```

## Running the app
Once you have cloned the repository from Github and navigated to the appropriate directory, please run the following commands in your terminal to install all necessary dependencies to properly run the project:

1.  Install the project dependencies for the app under the directory above
   ```shell
   npx expo install react-native-ble-plx @config-plugins/react-native-ble-plx react-native-awesome-alerts expo-av expo-font twrnc
   ```
2. Install Expo's EAS framework on your computer
   ```shell
   npx npm install eas-cli
   ```
3. Install all necessary native code that is required for the build to work properly (you shouldn't have to edit any of this)
   ```shell
   npx expo prebuild
   ```
4. Create the EAS build for IOS development and navigate through the steps that follow after running the commands
   ```shell
   eas build --profile development --platform ios
   ```
6. Start the development server on your computer
   ```shell
   npx expo start --dev-client
   ```

## How to view the app from your phone
Once your server is up and running, make sure your computer and phone are connected to the same WiFi in order to connect the app.
There will be a QR code for you to scan and will launch the project. You will be given an option to view in the Expo Go App, or the Development Build. You must select the Development Build, as the Expo Go app is not compatible with this build.
