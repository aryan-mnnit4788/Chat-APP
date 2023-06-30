const generateMessage=(text)=>{
    return {
        text,
        createdAt:new Date().getTime()
    }
}
const generateLocationMessage =(location)=>{
     let url=`https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    return {
        url:url,
        createdAt:new Date().getTime()
    }
}
module.exports={
    generateMessage,generateLocationMessage
}