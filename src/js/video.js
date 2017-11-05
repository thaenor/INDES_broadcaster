export default class Camera {
    constructor(constrains){
        this.constrains = constrains
    }

    init(domEl) {
        navigator.getUserMedia = navigator.webkitGetUserMedia
        navigator.getUserMedia(this.constrains, 
            stream => this.handleSuccess(domEl, stream), 
            error => this.handleError(error))
    }

    handleSuccess(videoEl, stream) {
        videoEl.src = window.URL.createObjectURL(stream)
    }

    handleError(e) {
        console.error(e)
    }
}
