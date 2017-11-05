import Camera from './video';
import fs from 'fs';

window.addEventListener('DOMContentLoaded', _ => {
    function createVideoElement(parentEl, id){
        const newVideo = document.createElement('video')
        newVideo.setAttribute('class', 'video-inactive')
        newVideo.setAttribute('id', id)
        newVideo.setAttribute('width', 210)
        newVideo.setAttribute('height', 120)
        newVideo.setAttribute('autoplay', true)
        parentEl.appendChild(newVideo)
        return newVideo;
    }

    //Get all cameras
    const videoList = document.getElementById('videoList')
    let cameraArray = [];
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach((device, i) => {
                if (device.kind === 'videoinput'){
                    const newCam = createVideoElement(videoList, `camera_${i}`)
                    const constrains = {
                        audio: false,
                        video: {
                            mandatory: {
                                minWidth: 852,
                                minHeight: 480,
                                maxWidth: 852,
                                maxHeight: 480
                            },
                            optional: [{ sourceId: device.deviceId }]
                        }
                    };
                    const c = new Camera(constrains)
                    c.init(newCam)
                    cameraArray.push()
                }
            });
        })
        .catch(function(err) {
            console.error(err);
        });

    //Youtube Video Queue event
    document.getElementById('play').addEventListener('click', _ => {
        if(document.getElementById('youtubeURLToQueue').value === ""){
            return alert('sorry, I don\'t recognize this as a youtube link')
        }
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

    document.getElementById('localToQueue').addEventListener('change', _ => {
        const path = _.target.files[0].path
        document.getElementById('CurrentLocalvideo').src = `file://${_.target.files[0].path}`;
    })
});
