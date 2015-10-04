var Qui = Qui || {};
(function (Qui) {
    function DefaultSelectionPrototype() {

    }

    DefaultSelectionPrototype.prototype = {
        select: function (item) {
            if (this.__selected.indexOf(item) !== -1)
                return;
            this.__selected.push(item);
            if (this.callback)
                this.callback(item, true);
        },
        deselect: function (item) {
            var index = this.__selected.indexOf(item);
            if (index === -1)
                return;
            this.__selected.splice(index, 1);
            if (this.callback)
                this.callback(item, false);
        },
        isSelected: function (item) {
            return this.__selected.indexOf(item) !== -1;
        },
        toggle: function (item) {
            if (this.__selected.indexOf(item) === -1)
                this.select(item);
            else
                this.deselect(item);
        },
        getSelected: function () {
            return this.__selected;
        },
        getSelectedCopy: function () {
            return this.__selected.slice();
        },
        getAll: function () {
            return this.__all;
        },
        getAllCopy: function () {
            return this.__all.slice();
        },
        firstSelected: function () {
            return this.__selected[0];
        },
        selectAll: function (items) {
            for (var i = 0; i < items.length; i++)
                this.select(items[i]);
        },
        deselectAll: function (items) {
            for (var i = 0; i < items.length; i++)
                this.deselect(items[i]);
        },
        isAllSelected: function () {
            return this.__all.length === this.__selected.length;
        },
        isAnySelected: function () {
            return this.__selected.length !== 0;
        }
    };

    function DefaultSelection(allItems, callback) {
        this.__all = allItems;
        this.__selected = [];
        if (callback)
            this.callback = callback;
    }

    DefaultSelection.prototype = new DefaultSelectionPrototype();

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

    Qui.DefaultSelectionPrototype = DefaultSelectionPrototype;
    Qui.DefaultSelection = DefaultSelection;
    Qui.DefaultSingleSelection = DefaultSingleSelection;
})(Qui);