
 interface Note{
    timeTo:number
    note:string
 }
 const x:Note[]= []
 x.push({timeTo:4,note:'Al ultimo'})
 x.push({timeTo:1,note:'Ya'})
 x.push({timeTo:3,note:'Espera'})
 x.push({timeTo:2,note:'Ya casi'})

 function nextNote(arr:Note[]):number{
    let positionNext:number=0;
    let item:number=0;
    let timeToNext:number= 2441581200000
    for (const iterator of arr) {
        if(iterator.timeTo<timeToNext){
            timeToNext=iterator.timeTo
            positionNext=item
        }
        item++
    }
    return positionNext
 }

 function swapNotesPosition(arr:Note[],pos:number):void{
    let swap:Note=arr[pos]
    arr[pos]=arr[0]
    arr[0]=swap;
 }
 
 function removeNote(arr:Note[]):void{
    arr.shift()
 }

 function setTimer(arr:Note[]):void{//Poner el timer para llamar a la funcion que hara el event

 }


 console.log(x)
 swapNotesPosition(x,1)
 console.log(x)