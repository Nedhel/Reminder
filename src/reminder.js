var timerNextEvent = null;
var bell = new Audio('./campana.mp3');
var x = [];
//devuelve la posision de la siguiente nota basado en el tiempo que falta para cumplirse
function nextNote(arr) {
    var positionNext = -1;
    var item = 0;
    var timeToNext = 2441581200000;
    if (arr.length != 0) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var iterator = arr_1[_i];
            var iteratorMili = getMilisecond(iterator.timeTo);
            if (iteratorMili < timeToNext) {
                timeToNext = iteratorMili;
                positionNext = item;
            }
            item++;
        }
    }
    return positionNext;
}
//intercambia la nota siguiente a la pos[0] y manda llamar al setTimer
function swapNotesPosition(arr, pos, callBack) {
    if (pos >= 0) {
        var swap = arr[pos];
        arr[pos] = arr[0];
        arr[0] = swap;
        callBack(arr);
    }
    else {
        console.log('No hay recordatorios pendientes');
    }
}
//Elimina la nota de la pos[0]
function removeNote(arr) {
    arr.shift();
}
//pone temporizador para la nota siguiente y cuando se cumple manda llamar a removeNote
function setTimer(arr) {
    timerNextEvent = setTimeout(function () { showReminder(arr); removeNote(arr); }, getDateResult(arr[0].timeTo));
}
//muestra la nota en un alert
function showReminder(arr) {
    document.getElementById('noteParagraph').innerHTML = arr[0].note;
    document.getElementById('timeParagraph').innerHTML = arr[0].timeTo;
    document.getElementById('alertMsj').classList.replace('invisible', 'visible');
    document.getElementById('content').classList.replace('blur-none', 'blur-sm');
    bell.play();
}
function AddReminder() {
    var date = document.getElementById('dateInput').value.split('-');
    var time = document.getElementById('timeInput').value.split(':');
    var d = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), Number(time[0]), Number(time[1]));
    x.push({ timeTo: d.toString(), note: document.getElementById('noteInput').value });
    clearTimeout(timerNextEvent);
    swapNotesPosition(x, nextNote(x), setTimer);
    document.getElementById('dateInput').value =
        document.getElementById('timeInput').value =
            document.getElementById('noteInput').value = '';
}
//regresa la fecha en milisegundos
function getMilisecond(date) {
    var dateNote = new Date(date);
    return dateNote.getTime();
}
//regresa la fecha resultado de restar la fecha del recordatorio de la fecha actual
function getDateResult(dateReminder) {
    var curretDate = new Date();
    var reminderDate = getMilisecond(dateReminder);
    return reminderDate - curretDate.getTime();
}
function closeReminder() {
    document.getElementById('alertMsj').classList.replace('visible', 'invisible');
    document.getElementById('content').classList.replace('blur-sm', 'blur-none');
    clearTimeout(timerNextEvent);
    swapNotesPosition(x, nextNote(x), setTimer);
}
window.addEventListener('load', function () {
    var date = new Date();
    var month = (date.getMonth() + 1) < 10 ? 0 + '' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = (date.getDate()) < 10 ? 0 + '' + (date.getDate()) : (date.getDate());
    var today = date.getFullYear() + '-' + month + '-' + day;
    document.getElementById('dateInput').setAttribute('min', today);
    document.getElementById('addReminder').addEventListener('click', AddReminder);
    document.getElementById('seenReminder').addEventListener('click', closeReminder);
    swapNotesPosition(x, nextNote(x), setTimer);
});
//# sourceMappingURL=reminder.js.map