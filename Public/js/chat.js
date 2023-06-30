//accessing socket set it to function return value this will allow us to send and receive //
let c=0
const socket=io()
// to receive //
// socket.on('countUpdated',(count)=>{
//     console.log('count has been updated',count)
//     document.querySelector('#newcount').innerHTML=count 
// })
// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('click is pressed')
//     socket.emit('incement')
//     // c++
//     // document.querySelector('#clientcount').innerHTML=c
// })
// socket.on('Welcome',(message)=>{
//       document.querySelector('#welcomemessage').innerHTML=message
// })




// ELEMENTS
const $messageForm=document.querySelector('#message-form')
const $messageFormInput=document.querySelector('#message')
const $messageFormButton=document.querySelector('button')
const $messages=document.querySelector('#messages')
//templates
const messageTemplate=document.querySelector('#message-template').innerHTML
const locationMessageTemplate=document.querySelector('#location-template').innerHTML


socket.on('message',(msg)=>{
    // document.querySelector('#acknowledgement').innerHTML=msg
    const html=Mustache.render(messageTemplate,{
       message:msg.text,
       //using moment library javascript to fomrat the timing
       createdAt:moment(msg.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
//disable
    $messageFormButton.setAttribute('disable','disable')

     //e.target.elements.attribute_name//
     
    const message=$messageFormInput.value
    //thired variable callback function works for acknowledgement

    socket.emit('sendMessage',message,(err)=>{
        //enable button
        $messageFormButton.removeAttribute('disable')
        $messageFormInput.value=''
        $messageFormInput.focus()
          if(err)
          {
            return  document.querySelector('#acknowledgement').innerHTML=err
          }
          document.querySelector('#acknowledgement').innerHTML='Message delivered successfully'
    })
   
})

document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('GeoLoacion is not supported by your browser')

    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        const location={
            "longitude": position.coords.longitude,
            "latitude":position.coords.latitude
        }
       
       
        socket.emit('sendLocation',location,(err)=>{
            document.querySelector('#acknowledgement').innerHTML=err
        })
    })
   

})
socket.on('LocationMessage',(location)=>{
    
     const html=Mustache.render(locationMessageTemplate,{
        url:location.url,
        createdAt:moment(location.createdAt).format('h:mm a')
     })
     $messages.insertAdjacentHTML('beforeend',html)
  
//    console.log(url)
//     document.querySelector('#location').innerHTML=url
})

socket.emit('join',{username ,room})