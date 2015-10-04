function DefaultSingleSelection(allItems, callback) {
    this.__all = allItems;
    this.__selected = [];
    if (callback)
        this.callback = callback;
}

DefaultSingleSelection.prototype = new DefaultSelectionPrototype();
DefaultSingleSelection.prototype.select = function (item) {
    if (this.__selected.length !== 0)
        this.deselect(this.__selected[0]);
    this.__selected.push(item);
    if (this.callback)
        this.callback(item, true);
};