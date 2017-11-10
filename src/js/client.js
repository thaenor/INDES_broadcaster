import fs from 'fs'
import YouTubePlayer from 'youtube-player'
import YoutubeStrategy from 'passport-youtube-v3'
import passport from 'passport'
import Camera from './video'
import LocalList from './LocalList'
import YoutubeList from './youtubeList';

window.addEventListener('DOMContentLoaded', _ => {
    initCameras()
    initYoutube()
    intiLocalPlayer()
    createYoutubePlayerList()
    createLocalPlayerList()
    // $("#sortable").sortable()
    // $("#sortable").disableSelection()
});

function createVideoElement(parentEl, id) {
    const newVideo = document.createElement('video')
    newVideo.setAttribute('class', 'video-inactive')
    newVideo.setAttribute('id', id)
    newVideo.setAttribute('width', 210)
    newVideo.setAttribute('height', 120)
    newVideo.setAttribute('autoplay', true)
    parentEl.appendChild(newVideo)
    return newVideo;
}

function initCameras() {
    //Get all cameras
    const videoList = document.getElementById('videoList')
    let cameraArray = []
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach((device, i) => {
                if (device.kind === 'videoinput') {
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
        .catch(function (err) {
            console.error(err)
        });

        const StreamLive = document.getElementById('stream')
        StreamLive.src="http://96.10.1.168/mjpg/1/video.mjpg"//+ new Date().getTime()
        //http://67.128.146.29/mjpg/video.mjpg?COUNTER#.WgXTzKI9PbU.link - US, park city
        
}

function ipLiveStreams(parentEl, id){
    const newStream = document.createElement('img')
    const source= "http://localhost/image.jpg?" + new Date().getTime();
    newVideo.setAttribute('class', 'video-inactive')
    newVideo.setAttribute('id', id)
    newVideo.setAttribute('width', 210)
    newVideo.setAttribute('height', 120)
    newVideo.setAttribute('autoplay', true)
    parentEl.appendChild(newVideo)
    return newVideo;
}

function createVideoElement(parentEl, id) {
    const newVideo = document.createElement('video')
    newVideo.setAttribute('class', 'video-inactive')
    newVideo.setAttribute('id', id)
    newVideo.setAttribute('width', 210)
    newVideo.setAttribute('height', 120)
    newVideo.setAttribute('autoplay', true)
    parentEl.appendChild(newVideo)
    return newVideo;
}

/**
 * https://www.npmjs.com/package/youtube-player
 */
function initYoutube(){
    //signin()
    let player;
    player = YouTubePlayer('player', { width: 250, height: 120 });
    // 'loadVideoById' is queued until the player is ready to receive API calls. 
    player.loadVideoById('OycD-xi4RdE');
    // 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called. 
    player.playVideo();
    // 'stopVideo' is queued after 'playVideo'. 
    player
        .stopVideo()
        .then(() => {
            // Every function returns a promise that is resolved after the target function has been executed. 
        });
}

function signin() {
    const YoutubeV3Strategy = YoutubeStrategy.Strategy
    passport.use(new YoutubeV3Strategy({
        clientID: "841148065998-fklms1k94oo4tmed39save0er1urv5ug.apps.googleusercontent.com",
        clientSecret: "ldDi2FpW-FeNgOniKrAv2kjh",
        callbackURL: "http://localhost:3000/auth/youtube/callback",
        scope: ['https://www.googleapis.com/auth/youtube.readonly']
    },
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({ userId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));
}

function intiLocalPlayer() {
    let localL = []
    const ll = new LocalList(localL, '#LocalQueue')
    ll.addToList('teste')
    ll.addToList('test2')
    ll.addToList('test3')
    document.getElementById('localToQueue').addEventListener('change', _ => {
        const path = _.target.files[0].path
        localL.addToList(_.target.files[0].path)
        document.getElementById('CurrentLocalvideo').src = `file://${_.target.files[0].path}`
    })
}

function createYoutubePlayerList() {
    let ytList = []
    const yt = new YoutubeList(ytList,'#YTqueue')
    yt.addToList('mg2cMqW_hOY')
    yt.addToList('L_XJ_s5IsQc')
    yt.addToList('j_rOAmnISzE')
    //Youtube Video Queue event
    document.getElementById('YoutubeAddToList').addEventListener('click', _ => {
        //TODO: error alternatives: "" or invalid link
        if (document.getElementById('youtubeURLToQueue').value === "") {
            return alert('sorry, I don\'t recognize this as a youtube link')
        }
        //TODO: accept more than the youtube video ID in a way you can get the video name
        const ytVideo = document.getElementById('youtubeURLToQueue').value;
        ytList = yt.addToList(ytVideo)
    })
}
