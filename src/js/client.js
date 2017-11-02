import video from './video';

window.addEventListener('DOMContentLoaded', _ => {
    const videoEl = document.getElementById('video')
    //video(navigator, videoEl)

    //Get all cameras
    navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            devices.forEach(function(device, i) {
                console.log(device.kind + ": " + device.label + " id = " + device.deviceId)
                if (device.kind === 'videoinput'){
                    const videoList = document.getElementById('videoList')
                    const newVideo = document.createElement('video')
                    newVideo.setAttribute('class', 'video')
                    newVideo.setAttribute('id', `camera_${i}`)
                    newVideo.setAttribute('width',250)
                    newVideo.setAttribute('height',120)
                    newVideo.setAttribute('autoplay',true)
                    videoList.appendChild(newVideo)
                    video(navigator, newVideo)
                }
            });
        })
        .catch(function(err) {
            console.log(err.name + ": " + err.message)
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
});
