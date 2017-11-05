export default class LocalList {
    constructor(items) {
        this.items = items
    }

    addToList(item) {
        this.items.push(item)
        this.renderAddToList(item)
    }

    renderAddToList(label){
        const DomQ = document.getElementById('LocalQueue')
        const newitem = document.createElement('li')
        newitem.setAttribute('class','localItem')
        newitem.innerHTML = label
        DomQ.appendChild(newitem)
    }

    clear() {
        document.getElementById('YTqueue').innerHTML = ""
        this.items = []
    }

    reorderElement(item, newPos) {
        //TODO...
    }

    removeVideo(video) {
        //TODO...
    }
}