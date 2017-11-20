# indes-broadcast

## context

This project was developed in the context of the course "Interfaces e Design" from ISEP.

### the requirements

The goal was to somehow simulate, in a creative way, the same interface TV operators use to monitor a channel broadcast, changing the camera that's currently streaming and queuing up pre-recorded content.

### the decisions

We chose to go with electron as it was a quick and good way to access what we needed to create a quick prototype (the development time was around just a couple of hours).
Access to the cameras is a given, due to chrome's API, Youtube's interface should be relatively transparent, and so does accessing the file system thanks to node's fs.

## features

* You can choose an image to act as a placeholder before you start your broadcast
* The top cameras are your webcams - click them to broadcast their content (red means they're NOT livestreaming, green means they are)
* On the left side is the youtube Area
  * You can copy Youtube video ID's onto the textbox to store them in the list
  * And reorder the list and play the video in test more, before sending it to the "live area" where it's livestreamed to your audience
* The local video are is the same as Youtube but with local videos
* The IP cam let's you select an IP camera from the list and place it on the thing
* You can record videos using your android device and display them in the app - for this you'll need the android app [IP WebCam](https://play.google.com/store/apps/details?id=com.pas.webcam&hl=en)

## to start the project

Take a look at the [releases](https://github.com/thaenor/INDES_broadcaster/releases) and download the version compatible with your system. (Warning: due to lack of time, these have not been fully tested)

### requirements
* node@6 or latest and npm
* git (kinda obvious)
* electron-forge

in terminal:
1. clone the repo `git clone https://github.com/thaenor/INDES_broadcaster.git`
2. `cd INDES_broadcaster`
3. `npm i`
4. And `npm start` will start the electron app

If you get any errors in this proccess try `npm install -g electron-forge`

More information please see the [electron forge documentation](https://github.com/electron-userland/electron-forge)


Project structure
> all code is in `./src` index.html and index.js are the barebones that kickstart electron
> The javascript that runs on node engine just kickstarts the main and tutorial window.
> the client manages the front end and uses the classes localList and YotuubeList classes to manage those respective queues. video.js handles starting the local cameras

##### future updates
* research Youtube's API and evaluate ways to get a broadcast going - (this seems like a separate project on it's own as it probably requires a proxy server to convert WebRTC to RTMP... it looks seriously complicated)
* Consider refactoring the front end to redux
* Consider introducing ipc's to handle processing

###### Project developed by: Francisco Santos, Ricardo Silva - ISEP/INDES 2017