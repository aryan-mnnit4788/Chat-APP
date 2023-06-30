const users=[]
// addUser, removeUser, getUser, getUsersinroom

const addUser=({id,username, room})=>{
    //clean the data
    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()
    //validate the data
    if(!username || !room)
    {
        return {
            error:'username and room are required'
        }
    }
    //check for existing user
    const existingUser=users.find((user)=>{
        return user.room===room && user.username===username
    })
    //validate username
    if(existingUser){
        return {
            error: 'Usrname is in use'
        }
    }
    // store user
    const user={id,username,room}
    users.push(user)
    return {user}

}
const removeUser=(id)=>{
    const index=users.findIndex((user)=>{
          return user.id===id
    })
    if(index!=-1){
        //splice  used for removing items by their index and count of users to be removed
        return users.splice(index,1)[0]
    }
}


const getUser=(id)=>{
    const index=users.findIndex((user)=>{
        return user.id===id
    })
    if(index!=-1){
        return users[index]
    }
    return {
        error:'User does not exist'
    }

}

const getUsersInRoom=(room)=>{
      return users.filter((user)=>{
        return user.room===room
      })
      
}


module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}


