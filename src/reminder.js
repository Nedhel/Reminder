var x = [];
x.push({ timeTo: 4, note: 'Al ultimo' });
x.push({ timeTo: 1, note: 'Ya' });
x.push({ timeTo: 3, note: 'Espera' });
x.push({ timeTo: 2, note: 'Ya casi' });
function nextNote(arr) {
    var positionNext = 0;
    var item = 0;
    var timeToNext = 2441581200000;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var iterator = arr_1[_i];
        if (iterator.timeTo < timeToNext) {
            timeToNext = iterator.timeTo;
            positionNext = item;
        }
        item++;
    }
    return positionNext;
}
function swapNotesPosition(arr, pos) {
    var swap = arr[pos];
    arr[pos] = arr[0];
    arr[0] = swap;
}
console.log(x);
swapNotesPosition(x, 1);
console.log(x);
//# sourceMappingURL=reminder.js.map