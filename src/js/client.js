import video from './video';

window.addEventListener('DOMContentLoaded', _ => {
    const videoEl = document.getElementById('video')
    video(navigator, videoEl)

    //Get all cameras
    navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            devices.forEach(function(device) {
                console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
            });
        })
        .catch(function(err) {
            console.log(err.name + ": " + error.message);
        });

    //Youtube Video Queue event
    document.getElementById('play').addEventListener('click', _ => {
        const ytVideo = document.getElementById('youtubeURLToQueue').value;

             ytVideo.replace('watch?v=', 'embed/');
             var validateUrl = ytVideo.replace("watch?v=", "embed/"); //replace to "embed/", so any yt link work
             validateUrl = validateUrl + '?autoplay=1';
             const ytLink = validateUrl; //new const created because replace only works for var
             console.log('Watching: ' + ytLink);
             document.getElementById('youtubeFrame').src = ytLink;
         //  window.frames['youtubeFrame'].location.href.reload() //force refresh iFrame, not needed I guess

             const q = document.getElementById('YTqueue')
             const li = document.createElement("li")
             li.appendChild(document.createTextNode(ytLink));
             q.appendChild(li);
         })

      //   TODO 2: cycle through ytVideo playlist
    //TODO: fix this
    // changing the src in the iFrame doesn't automatically change the video
    // look up how to do this - NOTE: consider using video tag instead
    // document.getElementById('play').addEventListener('click', _ => {
    //     const ytVideo = document.getElementById('youtubeURLToQueue').value;
    //     document.getElementById('youtubeFrame').src = ytVideo;
    // })
});
