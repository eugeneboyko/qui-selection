var Qui = Qui || {};
(function(Qui) {
  function Selection(selectionLimit, allItems) {
    this.__selectionLimit = selectionLimit || Number.POSITIVE_INFINITY;
    this.__allItems = allItems || [];
    this.__selectedItems = [];
  }

  Selection.prototype = {
    allocate: function(newItemForSelection) {
      return this.deselect(this.firstSelected());
    },
    select: function(item) {
      if (this.__selectionLimit < 1 || this.__selectedItems.indexOf(item) !== -1)
        return false;
      if (this.__selectedItems.length >= this.__selectionLimit && !this.allocate(item))
        return false;
      this.__selectedItems.push(item);
      if (this.callback)
        this.callback(item, true);
      return true;
    },
    deselect: function(item) {
      var index = this.__selectedItems.indexOf(item);
      if (index === -1)
        return false;
      this.__selectedItems.splice(index, 1);
      if (this.callback)
        this.callback(item, false);
      return true;
    },
    isSelected: function(item) {
      return this.__selectedItems.indexOf(item) !== -1;
    },
    toggle: function(item) {
      if (this.isSelected(item))
        this.deselect(item);
      else
        this.select(item);
    },
    selectItems: function(items) {
      for (var i = 0; i < items.length; i++)
        this.select(items[i]);
    },
    deselectItems: function(items) {
      for (var i = 0; i < items.length; i++)
        this.deselect(items[i]);
    },
    toggleItems: function(items) {
      for (var i = 0; i < items.length; i++)
        this.toggle(item);
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
      this.selectItems(this.allItems);
    },
    deselectAll: function() {
      this.deselectItems(this.allItems);
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
    isAnySelected: function() {
      return this.__selectedItems.length > 0;
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
      var itemsToDeselect = [],
        itemsToSelect = [],
        i, item;
      for (i = 0, item = this.__selectedItems[i]; i < this.__selectedItems.length; i++)
        if (newSelectedItems.indexOf(item) === -1)
          itemsToDeselect.push(item);
        else
          itemsToSelect.push(item);
      this.deselectItems(itemsToDeselect);
      this.selectItems(itemsToSelect);
    }
  });

  Object.defineProperty(Selection.prototype, "allItems", {
    get: function() {
      return this.__allItems;
    },
    set: function(newAllItems) {
      this.deselectAll();
      this.__allItems = newAllItems;
    }
  });

  Object.defineProperty(Selection.prototype, "selectionLimit", {
    get: function() {
      return this.__selectionLimit;
    },
    set: function(newSelectionLimit) {
      this.deselectAll();
      this.__selectionLimit = newSelectionLimit;
    }
  });

  Qui.Selection = Selection;
})(Qui);
