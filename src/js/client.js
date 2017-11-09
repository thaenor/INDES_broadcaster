import Camera from './video'
import LocalList from './LocalList'
import fs from 'fs'

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
    let cameraArray = []
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
            console.error(err)
        });

    //Youtube Video Queue event
    document.getElementById('play').addEventListener('click', _ => {
        //TODO: error alternatives: "" or invalid link
        if(document.getElementById('youtubeURLToQueue').value === ""){
            return alert('sorry, I don\'t recognize this as a youtube link')
        }
        const ytVideo = document.getElementById('youtubeURLToQueue').value;
            //OLD Link Validation
             ytVideo.replace('watch?v=', 'embed/')
             var validateUrl = ytVideo.replace("watch?v=", "embed/"); //replace to "embed/", so any yt link work
             validateUrl = validateUrl + '?autoplay=1'
             const ytLink = validateUrl; //new const created because replace only works for var
             
         //NEW VIDEO VALIDATION
         //-- now players loads video id.
        /*
         //extract id from video link
         var video_id= ytVideo;
         var video_id = window.location.search.split('v=')[1];
         var ampersandPosition = video_id.indexOf('&');
         if(ampersandPosition != -1) {
           video_id = video_id.substring(0, ampersandPosition); 
         }*/
         console.log('Watching: ' + ytVideo)
            // document.getElementById('youtubeFrame').src = ytLink;
             //  window.frames['youtubeFrame'].location.href.reload() //force refresh iFrame, not needed I guess

             const q = document.getElementById('YTqueue')
             const li = document.createElement("li")
             li.appendChild(document.createTextNode(ytLink))
             q.appendChild(li)

             li.onclick = function() {
                this.parentNode.removeChild(this); //removes the items from the list
               
              }
        })

    const localL = new LocalList([])
    document.getElementById('localToQueue').addEventListener('change', _ => {
        const path = _.target.files[0].path
        localL.addToList(_.target.files[0])
        document.getElementById('CurrentLocalvideo').src = `file://${_.target.files[0].path}`
    })

    $("#sortable").sortable()
    $("#sortable").disableSelection()
});
