export default class YtList {
    constructor(items, element) {
        this.items = items
        this.element = element
        $(this.element).sortable({
            update: (event, ui) => this.reorderElement(event, ui),
            placeholder: "ui-state-highlight"
        })
        $(this.element).disableSelection()
    }

    addToList(item) {
        this.items.push(item)
        this.renderAddToList(item)
        return this.items;
    }

    renderAddToList(label) {
        const DomQ = document.getElementById('YTqueue')
        const newitem = document.createElement('li')
        newitem.setAttribute('id', label)
        newitem.setAttribute('class', 'ui-state-default')
        newitem.innerHTML = `<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${label}`
        DomQ.appendChild(newitem)
        $(this.element).sortable('refresh');
    }

    clear() {
        document.getElementById('YTqueue').innerHTML = ""
        this.items = []
    }

    reorderElement(event, ui) {
        // if (ui.item[0] == $(`${this.element} li:first-child`)[0]){
        //     alert('you moved this to the TOP!')
        // }
        return this.items = $(this.element).sortable('toArray');
    }

    popVideo() {
        const videoToRemove = this.items.pop()
        $(`#${videoToRemove}`).remove()
        return videoToRemove
    }
}