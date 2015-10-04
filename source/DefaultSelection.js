function DefaultSelection(allItems, callback) {
    this.__all = allItems;
    this.__selected = [];
    if (callback)
        this.callback = callback;
}

DefaultSelection.prototype = new DefaultSelectionPrototype();