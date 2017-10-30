const constrains = {
    audio: false,
    video: {
        mandatory: {
            minWidth: 853,
            minHeight: 480,
            maxWidth: 853,
            maxHeight: 480
        }
    }
}

function handleSuccess(videoEl, stream) {
    videoEl.src = window.URL.createObjectURL(stream);
}

function handleError(error) {
    console.error(error);
}

export default function init (nav, videoEl) {
    nav.getUserMedia = nav.webkitGetUserMedia
    nav.getUserMedia(constrains, stream => handleSuccess(videoEl, stream), handleError)
}
