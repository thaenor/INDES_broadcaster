# indes-broadcast

to start the project

in terminal:
1. clone the repo `git clone https://github.com/thaenor/INDES_broadcaster.git`
2. `cd INDES_broadcaster`
3. `npm i`
4. And `npm start` will start the electron app

More information @ https://github.com/electron-userland/electron-forge


Project structure
> all code is in `./src` index.html and index.js are the barebones that kickstart electron
`video.js` is an ES2015 module that uses the camera API (nothing fancy, just using getMedia).
`client.js` is running on chromium, meaning you can do whatever you'd want to do with javascript.
you can use common CSS for styling.

## Current bugs
* the iFrame that is loading an external youtube video doesn't update when you paste an URL. It's not as simple as I though and updating the the iFrame's src alone doesn't cut it. I need to investigate this issue.
