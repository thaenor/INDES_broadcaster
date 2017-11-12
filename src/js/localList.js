export default class LocalList {
    constructor(element) {
        this.items = []
        this.element = element
        $(this.element).sortable({
            update: (event, ui) => this.reorderElement(event, ui)
        })
        $(this.element).disableSelection()
    }

    addToList(item) {
        this.items.push(item)
        this.renderAddToList(item, `local-video-${this.items.indexOf(item)}`)
        return this.items;
    }

    renderAddToList(label, id){
        const DomQ = document.getElementById('LocalQueue')
        const newitem = document.createElement('li')
        newitem.setAttribute('class','ui-state-default')
        newitem.innerHTML = `<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${label}`
        DomQ.appendChild(newitem)
        $(this.element).sortable('refresh')
    }

    clear() {
        document.getElementById('LocalQueue').innerHTML = ""
        this.items = []
    }

    reorderElement(item, newPos) {
        console.log(this.items)
        this.items = $(this.element).sortable('toArray')
        console.log(this.items)
        return this.items
    }

    popVideo() {
        const videoToRemove = this.items.pop()
        $(`li:contains('${videoToRemove}')`).remove()
        return videoToRemove
    }
}