import video from './video';

window.addEventListener('DOMContentLoaded', _ => {
    const videoEl = document.getElementById('video')
    video(navigator, videoEl)

    //TODO: fix this
    // changing the src in the iFrame doesn't automatically change the video
    // look up how to do this - NOTE: consider using video tag instead
    // document.getElementById('play').addEventListener('click', _ => {
    //     const ytVideo = document.getElementById('youtubeURLToQueue').value;
    //     document.getElementById('youtubeFrame').src = ytVideo;
    // })
});
