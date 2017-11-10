export default class LocalList {
    constructor(items, element) {
        this.items = items
        this.element = element
        $(this.element).sortable({
            update: (event, ui) => this.reorderElement(event, ui)
        })
        $(this.element).disableSelection()
    }

    addToList(item) {
        this.items.push(item)
        this.renderAddToList(item)
        return this.items;
    }

    renderAddToList(label){
        const DomQ = document.getElementById('LocalQueue')
        const newitem = document.createElement('li')
        newitem.setAttribute('class','ui-state-default')
        newitem.innerHTML = `<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${label}`
        DomQ.appendChild(newitem)
        $(this.element).sortable('refresh');
    }

    clear() {
        document.getElementById('LocalQueue').innerHTML = ""
        this.items = []
    }

    reorderElement(item, newPos) {
        return this.items = $(this.element).sortable('toArray');
    }

    removeVideo(video) {
        //TODO...
    }
}