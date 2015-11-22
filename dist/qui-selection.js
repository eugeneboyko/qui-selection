var Qui = Qui || {};
(function(Qui) {
  function Selection(allItems, selectionLimit) {
    this.setSelectionLimit(selectionLimit);
    this.__selectedItems = [];
    this.__allItems = allItems || [];
  }

  Selection.prototype = {
    select: function(item) {
      if (this.__selectedItems.indexOf(item) !== -1)
        return;
      this.__selectedItems.push(item);
      if (this.callback)
        this.callback(item, true);
    },
    deselect: function(item) {
      var index = this.__selectedItems.indexOf(item);
      if (index === -1)
        return;
      this.__selectedItems.splice(index, 1);
      if (this.callback)
        this.callback(item, false);
    },
    isSelected: function(item) {
      return this.__selectedItems.indexOf(item) !== -1;
    },
    toggle: function(item) {
      if (this.__selectedItems.indexOf(item) === -1)
        this.selectItem(item);
      else
        this.deselectItem(item);
    },
    selectItems: function(items) {
      for (var i = 0; i < items.length; i++)
        this.select(items);
    },
    deselectItems: function(items) {
      for (var i = 0; i < items.length; i++)
        this.deselect(items);
    },
    toggleItems: function(items) {
      for (var i = 0; i < items.length; i++)
        this.toggle(items);
    },
    isAllItemsSelected: function(items) {
      for (var i = 0; i < items.length; i++)
        if (!this.isSelected(items[i]))
          return false;
      return true;
    },
    isAnyItemSelected: function(items) {
      for (var i = 0; i < items.length; i++)
        if (this.isSelected(items[i]))
          return true;
      return false;
    },
    selectAll: function() {
      this.__selectedItems = this.__allItems.splice();
    },
    deselectAll: function() {
      this.__selectedItems = [];
    },
    toggleAll: function() {
      if (!this.isAllSelected())
        this.selectAll();
      else
        this.deselectAll();
    },
    isAllSelected: function() {
      return this.__selectedItems.length === this.__allItems.length;
    },
    firstSelected: function() {
      return this.__selectedItems[0];
    }
  };

  Object.defineProperty(Selection.prototype, "selectedItems", {
    get: function() {
      return this.__selectedItems;
    },
    set: function(newSelectedItems) {
      var itemsToDeselect = [];
      for (var i = 0; i < this.__selectedItems.length; i++)
        if (newSelectedItems.indexOf(this.__selectedItems[i]) === -1)
          itemsToDeselect.push(this.__selectedItems[i]);
      for (var i = 0; i < itemsToDeselect.length; i++)
        this.deselect(itemsToDeselect[i]);
      for (var i = 0; i < newValue.length; i++)
        this.select(newValue[i]);
    }
  });

  Object.defineProperty(Selection.prototype, "allItems", {
    get: function() {
      return this.__allItems;
    },
    set: function(newAllItems) {
      for (var i = 0; i < this.__selectedItems.length; i++)
        if (newAllItems.indexOf(this.__selectedItems[i]) === -1)
          this.deselect(this.__selectedItems[i]);
      this.__allItems = newAllItems;
    }
  });

  Qui.Selection = Selection;
})(Qui);
