Simple classes for working with selection. Provide able to select, deselect items and general functions to get more information about selection.

Qui - it's default object name where stored classes implementation.
If you would like changed package name just rename "Qui" variable at start of main js file.

Examples of creating selections:
    var selection = new Qui.DefaultSelection([1,2,3,4]);

    // You can create alias
    var Selection = Qui.DefaultSelection.
    var selection = new Selection([1,2,3,4]);

    // Pass callback into constructor or override object field "callback".
    // Callback will be called each time when some item will be selected or deselected.
    var selection = new Qui.DefaultSelection([1,2,3,4], function(item, isSelected){
        if(isSelected)
            console.log("item ", item, " is selected");
    });
    selection.select(1);


Version 1.0.0 includes next classes: DefaultSelection, DefaultSingleSelection, DefaultSelectionPrototype.
All classes that names end with "Prototype" are used as classes prototypes only.