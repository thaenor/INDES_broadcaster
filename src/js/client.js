//adffsdfsdfds
//dfdsfsdfsd d
import fs from 'fs'
import path from 'path'
import YouTubePlayer from 'youtube-player'
import YoutubeStrategy from 'passport-youtube-v3'
import passport from 'passport'
import Camera from './video'
import LocalList from './localList'
import YoutubeList from './youtubeList';

let cameraArray = []
let player
let ytList = []
let ll, yt, currentYoutubeVideo, livePlayerState

window.addEventListener('DOMContentLoaded', _ => {
    loadPlaceholder()
    initCameras()
    initIPCameras()
    initYoutube()
    intiLocalPlayer()
    createYoutubePlayerList()
});

function activateVideoStream(c) {
    $('#cameraList').find('video').removeClass('video-active').addClass('video-inactive')
    $('#YoutubeArea').removeClass('video-active').addClass('video-inactive')
    $('#CurrentLocalvideo').removeClass('video-active').addClass('video-inactive')
    $('#IPCameraArea').removeClass('video-active').addClass('video-inactive')
    $('#YoutubeCacete').addClass('ninja')
    $('#LiveStreamCamera').removeClass('ninja')
    c.classList.remove("video-inactive")
    c.setAttribute('class', 'video-active')
}

function loadPlaceholder() {
    const p = document.getElementById('PlaceholderSelector')
    p.addEventListener('change', _ => {
        const path = _.target.files[0].path
        $('#PlaceholderSelector').remove();
        document.getElementById('LiveStreamCamera').setAttribute('poster', _.target.files[0].path)
    })
}

function createVideoElement(parentEl, id) {
    const newVideo = document.createElement('video')
    newVideo.setAttribute('class', 'video-inactive')
    newVideo.setAttribute('id', id)
    newVideo.setAttribute('width', 210)
    newVideo.setAttribute('height', 120)
    newVideo.setAttribute('autoplay', true)
    newVideo.addEventListener('click', _ => {
        if (newVideo.classList.contains('video-inactive')) {
            activateVideoStream(newVideo)
            document.getElementById('LiveStreamCamera').setAttribute('src', newVideo.src)
        } else {
            newVideo.classList.remove("video-active")
            newVideo.setAttribute('class', 'video-inactive')
            document.getElementById('LiveStreamCamera').setAttribute('src', undefined)
        }
    })
    parentEl.appendChild(newVideo)
    return newVideo;
}

function initCameras() {
    //Get all cameras
    const videoList = document.getElementById('cameraList')
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
                            optional: [{
                                sourceId: device.deviceId
                            }]
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
}

/**
 * https://www.npmjs.com/package/youtube-player
 */
function initYoutube() {
    //signin()
    player = YouTubePlayer('player', {
        width: 250,
        height: 120,
        videoId: 'M7lc1UVf-VE'
    })
    // 'loadVideoById' is queued until the player is ready to receive API calls. 
    player.loadVideoById('_JaYTaBIWDU')
    currentYoutubeVideo = '_JaYTaBIWDU'
    // 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called. 
    // player.playVideo();
    // 'stopVideo' is queued after 'playVideo'. 
    player
        .stopVideo()
        .then(() => {
            // Every function returns a promise that is resolved after the target function has been executed. 
        });
    player.on('stateChange', (event) => {
        if (event.data === 0) {
            const newVid = yt.popVideo()
            currentYoutubeVideo = newVid
            player.loadVideoById(newVid)
        }
    });

    $('#YoutubeArea').click( _ => {
        $('#LiveStreamCamera').addClass('ninja')
        $('#YoutubeCacete').removeClass('ninja')
        $('#YoutubeCacete').addClass('video-active')
        livePlayerState = document.getElementById('YoutubeCacete')
        let player2 = YouTubePlayer('YoutubeCacete', {
            width: 650,
            height: 400,
            videoId: currentYoutubeVideo
        })
    })
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
            User.findOrCreate({
                userId: profile.id
            }, function (err, user) {
                return done(err, user);
            });
        }
    ));
}

function intiLocalPlayer() {
    ll = new LocalList('#LocalQueue')
    //ll.addToList(path.join(__dirname, 'fixtures/example.mp4'))
    //ll.addToList(path.join(__dirname, 'fixtures/music.mp4'))
    //ll.addToList(path.join(__dirname, 'fixtures/cartoon.mp4'))
    document.getElementById('localToQueue').addEventListener('change', _ => {
        const path = _.target.files[0].path
        ll.addToList(_.target.files[0].path)
        document.getElementById('CurrentLocalvideo').src = `file://${_.target.files[0].path}`
    })
    $('#playLocalVideo').click(_ => {
        const vid = ll.popVideo()
        document.getElementById('CurrentLocalvideo').src = `file://${vid}`
        $('#playLocalVideo').remove()
    })
    const vid = document.getElementById('CurrentLocalvideo')
    vid.onended = _ => {
        const vid = ll.popVideo()
        document.getElementById('CurrentLocalvideo').src = `file://${vid}`
    }

    $('#CurrentLocalvideo').click(_ => {
        if ($('#CurrentLocalvideo').hasClass('video-inactive')) {
            activateVideoStream($('#CurrentLocalvideo')[0])
            document.getElementById('LiveStreamCamera').setAttribute('src', $('#CurrentLocalvideo')[0].src)
        } else {
            $('#CurrentLocalvideo').removeClass("video-active")
            $('#CurrentLocalvideo').addClass('video-inactive')
            document.getElementById('LiveStreamCamera').setAttribute('src', undefined)
        }
    })
}

function createYoutubePlayerList() {
    yt = new YoutubeList(ytList, '#YTqueue')
    //yt.addToList('mg2cMqW_hOY')
    //yt.addToList('L_XJ_s5IsQc')
    //yt.addToList('j_rOAmnISzE')
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


// IPCAM - change cameras by clicking the list elements 

function changeIPCameras(link) {

    const StreamLive = document.getElementById('stream')

    StreamLive.src = link

}

//Init Ip Cameras
function initIPCameras() {
   
    const StreamLive = document.getElementById('stream')

    StreamLive.src = "http://96.10.1.168/mjpg/1/video.mjpg"

    var ul = document.getElementById('ipList'); // Parent

    //changes camera OnClick of list element
    ul.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            // alert(e.target.id);  // Check if the element is a LI
            switch (e.target.id) {
                case "1":
                    changeIPCameras("http://96.10.1.168/mjpg/1/video.mjpg")
                    break;
                case "2":
                    changeIPCameras("http://67.128.146.29/mjpg/video.mjpg?COUNTER#.WgXTzKI9PbU.link")
                    break;
                case "3": //THIS CAM IS DOWN, SWITCH LINK !
                    changeIPCameras("http://91.133.85.170:8090/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER#.WgXY2mvfjSU.link")
                    break;
                case "4":
                    changeIPCameras("http://118.243.204.173/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER#.WgX0RL6V5yI.link")
                    break;
                case "5":
                    changeIPCameras("http://98.189.156.36/mjpg/video.mjpg?COUNTER#.WgX0mrAD_xE.link")
                    break;
                case "6":
                    changeIPCameras("http://209.12.71.138/mjpg/video.mjpg?COUNTER#.WgX0OyVZsDs.link")
                    break;
                case "7":
                    changeIPCameras("http://91.234.133.122:8080/cam_1.cgi#.WgX00oj6pUM.link")
                    break;
            }
        }
    });

 
}

//Toggle colour of list group active item in IpCamera
$(".list-group .list-group-item").click(function(e) {
    $(".list-group .list-group-item").removeClass("active");
    $(e.target).addClass("active");
 });


    $('#ioLive').click(_ => {
  console.log("1")

  
    if ($('#ioLive').hasClass('video-inactive')) {
        console.log("2")
        const ipcam = document.getElementById('stream')
        console.log("stream 2 live" + ipcam.src)
        $('#LiveStreamIpCamera').removeClass('ninja')
        $('#LiveStreamIpCamera').attr('src',ipcam.src) 
        $('#ioLive').removeClass('video-inactive')
        $('#ioLive').addClass('video-active')
    }
    else {
        console.log("3")
        $('#LiveStreamIpCamera').attr('src',"") 
        $('#LiveStreamIpCamera').addClass('ninja')
        $('#ioLive').removeClass('video-active')
        $('#ioLive').addClass('video-inactive')
        const currentlive = document.getElementById('LiveStreamIpCamera').src //debug
        console.log("current live" + currentlive.src)  //debug
    }
});


