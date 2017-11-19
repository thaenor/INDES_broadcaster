import fs from 'fs'
import path from 'path'
import YouTubePlayer from 'youtube-player'
import YoutubeStrategy from 'passport-youtube-v3'
import passport from 'passport'
import Camera from './video'
import LocalList from './localList'
import YoutubeList from './youtubeList'

let cameraArray = []
let player
let ytList = []
let ll, yt, currentYoutubeVideo, livePlayerState, currentIPCamera

window.addEventListener('DOMContentLoaded', _ => {
    loadPlaceholder()
    initCameras()
    initIPCameras()
    initYoutube()
    intiLocalPlayer()
    createYoutubePlayerList()
});

function activateVideoStream(c) {
    $('#cameraList').find('video').removeClass('video-active').addClass('video-inactive video-camera')
    //$('#YoutubeArea').removeClass('video-active').addClass('video-inactive')
    //$('#CurrentLocalvideo').removeClass('video-active').addClass('video-inactive')
    //$('#IPCameraArea').removeClass('video-active').addClass('video-inactive')
    $('#YoutubeCacete').addClass('ninja')
    $('#LiveStreamIpCamera').addClass('ninja')
    $('#LiveStreamCamera').removeClass('ninja')
    $('#ioLive').removeClass('btn-success').addClass('btn-danger')
    $('#LocalGoLive').removeClass('btn-success').addClass('btn-danger')
    $('#YoutubeGoLive').removeClass('btn-success').addClass('btn-danger')
    if (c.id != 'CurrentLocalvideo'){
        c.classList.remove("video-inactive")
        c.setAttribute('class', 'video-active video-camera')
    }
}

function shutdownTopCameras() {
    // cameraArray.forEach((el, i) => {
    //     $(el).removeClass('video-active').removeClass('video-inactive').addClass('video-inactive')
    // })
    $('#cameraList').find('video').removeClass('video-active').addClass('video-inactive video-camera')
    document.getElementById('LiveStreamCamera').setAttribute('src', undefined)
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
    newVideo.setAttribute('class', 'video-inactive video-camera')
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
            newVideo.setAttribute('class', 'video-inactive video-camera')
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
                    cameraArray.push(newCam)
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

    $('#YoutubeGoLive').click(_ => {
        if ($('#YoutubeCacete').hasClass('ninja')){
            $('#YoutubeGoLive').text('Online')
            $('#YoutubeGoLive').removeClass('btn-danger').addClass('btn-success')
            $('#LiveStreamCamera').addClass('ninja')
            $('#LiveStreamIpCamera').addClass('ninja')
            $('#YoutubeCacete').removeClass('ninja')
            $('#ioLive').removeClass('btn-success').addClass('btn-danger')
            $('#YoutubeCacete').removeClass('video-inactive')
            $('#YoutubeCacete').addClass('video-active')
            shutdownTopCameras()
            livePlayerState = document.getElementById('YoutubeCacete')
            let player2 = YouTubePlayer('YoutubeCacete', {
                width: 650,
                height: 400,
                videoId: currentYoutubeVideo
            })
            player2.playVideo()
        } else {
            $('#YoutubeGoLive').text('Offline')
            $('#YoutubeGoLive').removeClass('btn-success').addClass('btn-danger')
            $('#LocalGoLive').removeClass('btn-success').addClass('btn-danger')
            $('#LiveStreamCamera').removeClass('ninja')
            $('#YoutubeCacete').addClass('ninja')
            $('#YoutubeCacete').removeClass('video-active')
            $('#YoutubeCacete').addClass('video-inactive')
        }
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
    ll.addToList(path.join(__dirname, 'fixtures/example.mp4'))
    ll.addToList(path.join(__dirname, 'fixtures/music.mp4'))
    ll.addToList(path.join(__dirname, 'fixtures/cartoon.mp4'))
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
        if ($('#LocalGoLive').hasClass('btn-success')){
            document.getElementById('LiveStreamCamera').setAttribute('src', $('#CurrentLocalvideo')[0].src)
        } else {
            document.getElementById('LiveStreamCamera').setAttribute('src', undefined)
        }
    }

    $('#LocalGoLive').click(_ => {
        if ($('#LocalGoLive').hasClass('btn-danger')) {
            activateVideoStream($('#CurrentLocalvideo')[0])
            $('#ioLive').removeClass('btn-success').addClass('btn-danger')
            $('#LocalGoLive').removeClass('btn-danger').addClass('btn-success')
            $('#LocalGoLive').text("Online")
            document.getElementById('LiveStreamCamera').setAttribute('src', $('#CurrentLocalvideo')[0].src)
        } else {
            $('#LocalGoLive').removeClass("btn-success").addClass('btn-danger')
            $('#LocalGoLive').text('Offline')
            document.getElementById('LiveStreamCamera').setAttribute('src', undefined)
        }
    })
}

function createYoutubePlayerList() {
    yt = new YoutubeList(ytList, '#YTqueue')
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


// IPCAM - change cameras by clicking the list elements 

function changeIPCameras(el_ID, link) {

    const StreamLive = document.getElementById(el_ID)

    StreamLive.src = link

}

//Init Ip Cameras
function initIPCameras() {
   
    const StreamLive = document.getElementById('stream')

    StreamLive.src = "http://96.10.1.168/mjpg/1/video.mjpg"
    currentIPCamera = "http://96.10.1.168/mjpg/1/video.mjpg"

    var ul = document.getElementById('ipList'); // Parent

    //changes camera OnClick of list element
    ul.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            // alert(e.target.id);  // Check if the element is a LI
            switch (e.target.id) {
                case "1":
                    currentIPCamera = "http://96.10.1.168/mjpg/1/video.mjpg"
                    changeIPCameras('stream', "http://96.10.1.168/mjpg/1/video.mjpg")
                    break;
                case "2":
                    currentIPCamera = "http://67.128.146.29/mjpg/video.mjpg?COUNTER#.WgXTzKI9PbU.link"
                    changeIPCameras('stream', "http://67.128.146.29/mjpg/video.mjpg?COUNTER#.WgXTzKI9PbU.link")
                    break;
                case "3": //THIS CAM IS DOWN, SWITCH LINK !
                    currentIPCamera = "http://91.133.85.170:8090/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER#.WgXY2mvfjSU.link"
                    changeIPCameras('stream', "http://91.133.85.170:8090/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER#.WgXY2mvfjSU.link")
                    break;
                case "4":
                    currentIPCamera = "http://118.243.204.173/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER#.WgX0RL6V5yI.link"
                    changeIPCameras('stream', "http://118.243.204.173/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER#.WgX0RL6V5yI.link")
                    break;
                case "5":
                    currentIPCamera = "http://98.189.156.36/mjpg/video.mjpg?COUNTER#.WgX0mrAD_xE.link"
                    changeIPCameras('stream', "http://98.189.156.36/mjpg/video.mjpg?COUNTER#.WgX0mrAD_xE.link")
                    break;
                case "6":
                    currentIPCamera = "http://209.12.71.138/mjpg/video.mjpg?COUNTER#.WgX0OyVZsDs.link"
                    changeIPCameras('stream', "http://209.12.71.138/mjpg/video.mjpg?COUNTER#.WgX0OyVZsDs.link")
                    break;
                case "7":
                    currentIPCamera = "http://91.234.133.122:8080/cam_1.cgi#.WgX00oj6pUM.link"
                    changeIPCameras('stream', "http://91.234.133.122:8080/cam_1.cgi#.WgX00oj6pUM.link")
                    break;
            }
        }
    });

    attachIPCameraToLiveEventHandler()
}

function attachIPCameraToLiveEventHandler() {
    $('#ioLive').click( _ => {
        if ($('#ioLive').hasClass('btn-danger')) {
            $('#ioLive').removeClass('btn-danger').addClass('btn-success')
            $('#YoutubeGoLive').removeClass('btn-success').addClass('btn-danger')
            $('#LocalGoLive').removeClass('btn-success').addClass('btn-danger')
            $('#LiveStreamCamera').addClass('ninja')
            $('#YoutubeCacete').addClass('ninja')
            shutdownTopCameras()
            changeIPCameras('LiveStreamIpCamera', currentIPCamera)
            $('#LiveStreamIpCamera').removeClass('ninja')
        } else {
            $('#ioLive').removeClass('btn-success').addClass('btn-danger')
            $('#LiveStreamIpCamera').addClass('ninja')
            changeIPCameras('LiveStreamIpCamera', "")
            $('LiveStreamCamera').removeClass('ninja')
        }
    })
}

//Toggle colour of list group active item in IpCamera
$(".list-group .list-group-item").click(function(e) {
    $(".list-group .list-group-item").removeClass("active");
    $(e.target).addClass("active");
 });


    // $('#ioLive').click(_ => {
  
    // if ($('#ioLive').hasClass('video-inactive')) {
    //     console.log("2")
    //     const ipcam = document.getElementById('stream')
    //     console.log("stream 2 live" + ipcam.src)
    //     $('#LiveStreamIpCamera').removeClass('ninja')
    //     $('#LiveStreamIpCamera').attr('src',ipcam.src) 
    //     $('#ioLive').removeClass('video-inactive')
    //     $('#ioLive').addClass('video-active')
    // }
    // else {
    //     console.log("3")
    //     $('#LiveStreamIpCamera').attr('src',"") 
    //     $('#LiveStreamIpCamera').addClass('ninja')
    //     $('#ioLive').removeClass('video-active')
    //     $('#ioLive').addClass('video-inactive')
    //     const currentlive = document.getElementById('LiveStreamIpCamera').src //debug
    //     console.log("current live" + currentlive.src)  //debug
    // }
    //});


