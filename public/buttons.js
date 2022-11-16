// BUTTON LISTENERS ============================================================

   // BUTTON -> CREATE ROOM
   create_room.addEventListener('click', () => {
    connectButton.innerHTML = 'CREATE'
    box.style.visibility = 'visible'
    roomSelectionContainer.style.marginTop = '5%'
    changeItem(create_room , join_room)
  })

  // BUTTON -> JOIN ROOM
  join_room.addEventListener('click', () => {
    connectButton.innerHTML = 'JOIN'
    box.style.visibility = 'visible'
    roomSelectionContainer.style.marginTop = '5%'
    changeItem(join_room, create_room)
  })


    // BUTTON -> CONNECT
  connectButton.addEventListener('click', () => {

    if (connectButton.innerHTML == 'CREATE'){
        socket.emit('create-room' , roomInput.value)
    }
    else if (connectButton.innerHTML == 'JOIN'){
        socket.emit('join-room' , roomInput.value)
    }
    
  })
  
  // BUTTON -> SEND
  sendButton.addEventListener('click', (e) => {
    e.preventDefault()
    //Get message text and room
    const message = messageInput.value
    const room = roomInput.value
    const user = userInput.value

    if (message==="") return
    displayMessage(message)
  })

  // BUTTON -> MIC
  muteButton.addEventListener('click', () => {

    if (muteButton.firstChild.getAttribute('src') == `/assets/mic-opened.png`){
        localStream.getTracks()[0].enabled  = false
        muteButton.firstChild.setAttribute('src' , '/assets/mic-closed.png')
    }
    else{
        localStream.getTracks()[0].enabled  = true
        muteButton.firstChild.setAttribute('src' , '/assets/mic-opened.png')
        document.querySelector('video').volume = 1.0
        deafButton.firstChild.setAttribute('src' , '/assets/deaf.png')
    }
    muteButton.firstChild.setAttribute('style' ,'width : 15px; height: 22px;' ) 
  })

    // BUTTON -> DEAF
    deafButton.addEventListener('click', () => {
        
        if (deafButton.firstChild.getAttribute('src') == `/assets/deaf.png`){
            document.querySelector('video').volume = 0.0
            
            deafButton.firstChild.setAttribute('src' , '/assets/deaf_deaf.png')
            localStream.getTracks()[0].enabled  = false
            muteButton.firstChild.setAttribute('src' , '/assets/mic-closed.png')
        }
        else{
            document.querySelector('video').volume = 1.0
            deafButton.firstChild.setAttribute('src' , '/assets/deaf.png')
        }
        deafButton.firstChild.setAttribute('style' ,'width : 17px; height: 22px;' ) 
      })

  // BUTTON -> EXIT
  exitButton.addEventListener('click', () => {
      console.log(`socket.id = ${socket.id}`)
      if (users.size == 1){ // if user is the only client in the room
        socket.emit("destroy-room")
      }
      else{
        socket.emit("manually-disconnect")// return to room selection stage
      }
      location.reload(); 
  })

// BUTTON -> FULLSCREEN-LOGO
fullscreenButton.addEventListener('click', () => {

    let usersIds = Array.from( users.keys() );
    if (hasFullScreen)
    {

        document.getElementById("fullscreen").firstChild.src = '/assets/fullscreen.png'
        document.getElementById("fullscreen").firstChild.title = 'Normalscreen Enabled'
        while (video_div.firstChild) {
            video_div.removeChild(video_div.firstChild);
        }
    
        while (video_div_bottom.firstChild) {
            video_div_bottom.removeChild(video_div_bottom.firstChild);
        }

        while (medium.firstChild){
            medium.removeChild(medium.firstChild)
        }

        for (i = 0; i < usersIds.length; i++){
            console.log(eventList.get(usersIds[i]))
        }
        
        for (var i = 0; i < usersIds.length; i++){
            if (eventList.has(usersIds[i]) && usersIds[i] != socketId){
                console.log("reinit stream ",usersIds[i])
                setRemoteStream(eventList.get(usersIds[i]) , usersIds[i])
            }
            
        }
         // remove background
         if (medium.children.length == 0){
            medium.style.visibility = 'hidden'
            profile.style.borderTop = 'none'
            nav_background.style.borderTop = 'none'
        }

        hasFullScreen = false
    }
    else{
        hasFullScreen = true
        document.getElementById("fullscreen").firstChild.src = '/assets/smallscreen.png'
  
        document.getElementById("fullscreen").firstChild.title = 'Fullscreen Enabled'
        while (video_div.firstChild) {
            video_div.removeChild(video_div.firstChild);
        }
        while (video_div_bottom.firstChild) {
            video_div_bottom.removeChild(video_div_bottom.firstChild);
        }

        video_div.style.height = '70%'

        let selectedId
        for (i = 0; i < usersIds.length; i++){
            if (eventList.has(usersIds[i]) && usersIds[i] != socketId){
                selectedId = usersIds[i]
                setFullScreenVideo(usersIds , usersIds[i] , true)
                break;
            }
        }
        
        for (i = 0; i < usersIds.length; i++){
            if (eventList.has(usersIds[i]) && usersIds[i] != socketId && selectedId != usersIds[i]){
                UpdateMediumMenuView(usersIds[i] , eventList.get(usersIds[i] , false))
            }
        }

         // set background
        
        if (medium.children.length > 0){
            medium.style.visibility = 'visible'
            profile.style.borderTop = '1px solid #383838'
            nav_background.style.borderTop = '1px solid #383838'
        }
    }
})

// BUTTON -> USERS-LOGO
InitParticipantsArea.addEventListener('click', () => {

    if (userListInput.style.visibility != 'visible'){
        chat.style.visibility = 'hidden'
        userListInput.style.visibility = 'visible'
        InitChatArea.firstChild.setAttribute('src' , '/assets/chat-white.png')
        InitParticipantsArea.firstChild.setAttribute('src' , '/assets/users.png')
    }   
    
})

// BUTTON -> CHAT-LOGO
InitChatArea.addEventListener('click', () => {

    if (chat.style.visibility != 'visible'){
        userListInput.style.visibility = 'hidden'
        chat.style.visibility = 'visible'
        InitChatArea.firstChild.setAttribute('src' , '/assets/chat.png')
        InitParticipantsArea.firstChild.setAttribute('src' , '/assets/users-white.png')
    }   
   
})

 // BUTTON -> ATTACH FILE
 file.addEventListener('click', () => {
    document.getElementById('file-input').click()
    
})

 // BUTTON -> OPEN FILE
selected_file.onchange = e =>{
    var file = e.target.files[0]; 
    console.log(file)    
    sendFile(file)
    displayFileMessage(file ,socketId)
}




