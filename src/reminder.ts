 interface Note{
    timeTo:string
    note:string
 }
 let timerNextEvent:number|null=null
 const bell=new Audio('./campana.mp3')
 const x:Note[]= []
 
 //devuelve la posision de la siguiente nota basado en el tiempo que falta para cumplirse
 function nextNote(arr:Note[]):number{ 
    let positionNext:number=-1;
    let item:number=0;
    let timeToNext:number= 2441581200000
    if(arr.length!=0){      
       for (const iterator of arr) { 
         let iteratorMili = getMilisecond(iterator.timeTo)        
          if(iteratorMili<timeToNext){
             timeToNext=iteratorMili
             positionNext=item
            }
            item++
         }
      }
    return positionNext
 }

 //intercambia la nota siguiente a la pos[0] y manda llamar al setTimer
 function swapNotesPosition(arr:Note[],pos:number, callBack:Function):void{
   if(pos>=0){      
      let swap:Note=arr[pos]
      arr[pos]=arr[0]
      arr[0]=swap;
      callBack(arr)
   }else{
      console.log('No hay recordatorios pendientes')
   } 
 }
 
 //Elimina la nota de la pos[0]
 function removeNote(arr:Note[]):void{
    arr.shift()
 }

 //pone temporizador para la nota siguiente y cuando se cumple manda llamar a removeNote
 function setTimer(arr:Note[]):void{//Poner el timer para llamar a la funcion que hara el event   
   timerNextEvent=setTimeout(()=>{showReminder(arr); removeNote(arr)},getDateResult(arr[0].timeTo))   
 }

 //muestra la nota en un alert
 function showReminder(arr:Note[]):void{
   document.getElementById('noteParagraph').innerHTML=arr[0].note
   document.getElementById('timeParagraph').innerHTML=arr[0].timeTo
   document.getElementById('alertMsj').classList.replace('invisible', 'visible')
   document.getElementById('content').classList.replace('blur-none','blur-sm')
   bell.play()
   
 }

 function AddReminder():void{
   let date = (<HTMLInputElement>document.getElementById('dateInput')).value.split('-')
   let time = (<HTMLInputElement>document.getElementById('timeInput')).value.split(':')
   const d = new Date(Number(date[0]), Number(date[1])-1, Number(date[2]), Number(time[0]), Number(time[1]))
   x.push({timeTo:d.toString(),note:(<HTMLInputElement>document.getElementById('noteInput')).value})
   clearTimeout(timerNextEvent)
   swapNotesPosition(x,nextNote(x),setTimer);
   (<HTMLInputElement>document.getElementById('dateInput')).value=
   (<HTMLInputElement>document.getElementById('timeInput')).value=
   (<HTMLInputElement>document.getElementById('noteInput')).value=''
 }

 //regresa la fecha en milisegundos
 function getMilisecond(date:string):number{
   let dateNote=new Date(date)
   return dateNote.getTime()
 }

 //regresa la fecha resultado de restar la fecha del recordatorio de la fecha actual
 function getDateResult(dateReminder:string):number{
   let curretDate=new Date()
   let reminderDate= getMilisecond(dateReminder)
   return reminderDate-curretDate.getTime()
 }

 function closeReminder():void{
  document.getElementById('alertMsj').classList.replace('visible', 'invisible')
   document.getElementById('content').classList.replace('blur-sm','blur-none')
   clearTimeout(timerNextEvent)
   swapNotesPosition(x,nextNote(x),setTimer)
 }

 window.addEventListener('load',()=>{
   let date=new Date()
   let month= (date.getMonth()+1)<10?0+''+(date.getMonth()+1):(date.getMonth()+1)
   let day= (date.getDate())<10?0+''+(date.getDate()):(date.getDate())
   let today=date.getFullYear()+'-'+month+'-'+day
   document.getElementById('dateInput').setAttribute('min',today)
   document.getElementById('addReminder').addEventListener('click',AddReminder)
   document.getElementById('seenReminder').addEventListener('click',closeReminder)
   swapNotesPosition(x,nextNote(x),setTimer)
 })

 