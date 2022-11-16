
// FUNCTIONS ==================================================================


function joinRoom(room, user1) {
    if (room === '' && user === '' ) {
      alert('Please type a room ID and a user ID')
    } else if (room === '') {
        alert('Please type a room ID')
    } else if (user === '') {
      alert('Please type a user ID')
    } else {
      roomId = room
      user = user1
      console.log(`room ${room}`)
      
      showVideoConference()
      
    }
  }

  function showVideoConference() {

    roomSelectionContainer.style = 'display: none'
    roomSelectionContainer.style = 'display: none'
    videoChatContainer.style = 'display: block'
    userListInput.style = 'display: block'
    chat.style = 'display: block'
    asidenav.style = 'display: flex'
    
    var mediaConstraints = {
        video: true,
        audio: true,
    };
    //set local video
    navigator.mediaDevices.getUserMedia( mediaConstraints )
        .then( function ( stream ) {      
            localStream = stream;      
            localVideoComponent.srcObject = stream 
            localVideoComponent.play()
            socketId = socket.id;
            socket.emit('join', user , roomId)
            localStream.getTracks()[0].enabled  = false // set mic muted
        })

        // User Profile init
    document.getElementById("Username").innerHTML = user
    document.getElementById("room-id").innerHTML = roomId
    
  }


function changeItem(new_item , old_item){
    
    new_item.style.borderTop = '1px solid #158171'
    new_item.style.borderBottom = '1px solid #ffffff'
    new_item.style.color = '#ffffff'

    old_item.style.borderStyle= 'none'
    old_item.style.color= '#158171'
    
}

function UpdateMediumMenuView(id , event , dlt){

    if (dlt){
        for (var i=0; i<medium.children.length; i++){
            if (medium.children[i].id == id){
                const  target = document.getElementById(id)
                console.log(medium.children[i])//
                medium.children[i].remove()  
                console.log(medium.children[i])
                return          
            }
        }
        return 
    }

    // set background
        
    if (medium.children.length > 0){
        medium.style.visibility = 'visible'
        profile.style.borderTop = '1px solid #383838'
        nav_background.style.borderTop = '1px solid #383838'
    }

    eventList.set(id , event) // add the stream to a list for re-initalization if this is needed 

    const listitem = document.createElement('li')
    const video = document.createElement('video')
    const hover_div = document.createElement('div')
    
    const overlayDiv = document.createElement("div")
    const topText = document.createElement("topText")

    overlayDiv.id = 'overlayDiv_mediumnav'
    topText.id = 'topText_mediumnav'

    //detect if user has muted mic or deaf
    var mic = document.getElementById(`overlay-mic-${id}`)
    if (mic){
        var img = document.createElement('img')
        img.src = '/assets/mic-closed.png'
        img.id = `overlay-mic-${id}-medium`
        img.style.width = "16px"
        img.style.height = "20px"
        img.style.marginLeft = "5px"
        document.getElementById(`${id}`).childNodes[2].appendChild(img)
    }

    var deaf = document.getElementById(`overlay-deaf-${id}`)
    if (deaf){
        var img = document.createElement('img')
        img.src = '/assets/deaf_deaf.png'
        img.id = `overlay-deaf-${id}-medium`
        img.style.width = "16px"
        img.style.height = "20px"
        img.style.marginLeft = "5px"
        document.getElementById(`${id}`).childNodes[2].appendChild(img)
    }

    medium.appendChild(listitem)

    listitem.id = id
    hover_div.className = "hover-item"
    video.id = 'screens'
    video.className = 'screens'
    hover_div.id = id+"-hover"

    listitem.appendChild(video)
    listitem.appendChild(hover_div)

    topText.innerHTML = users.get(id)
    overlayDiv.appendChild(topText)
    listitem.appendChild(overlayDiv)

    topText.style.fontSize =  (6 - medium.children.length+15) + 'px'  
    
    video.onmouseenter  = function(){
        document.getElementById(`${id}-hover`).style.visibility = 'visible'
        overlayDiv.style.left = '10%'
        overlayDiv.style.bottom = '10%'
        if (medium.children.length > 3){
            console.log(window.screen.width)
            if (window.screen.width < 1480)
                topText.style.fontSize =  (6 - medium.children.length+10) + 'px'
            else
                topText.style.fontSize =  (6 - medium.children.length+15) + 'px'
        }
        else
            topText.style.fontSize =  (6 - medium.children.length+15) + 'px'
        
        topText.innerHTML = `Enable fullscreen for ${users.get(id)}`
    }
    listitem.onmouseleave  = function(){
        document.getElementById(`${id}-hover`).style.visibility = 'hidden'
        overlayDiv.style.left = ''
        overlayDiv.style.bottom = '2%'
        topText.innerHTML = `${users.get(id)}`
        topText.style.fontSize =  (6 - medium.children.length+15) + 'px'
    }

    listitem.onclick = function(){
        setFullScreenVideo(Array.from(users.keys()) , id , false)
    }
    
    console.log(event.stream)
    video.srcObject = event.stream;
    video.play();
    video.autoplay = true
    
}


function setFullScreenVideo(usersIds , id , israndomised){
    let selectedId
    for (i = 0; i < usersIds.length; i++){
        if (eventList.has(usersIds[i]) && usersIds[i] != socketId && usersIds[i] == id){
            
            /* if we want to change the fullscreen vvideo we need to remove it from
               bottom bar (medium) , remove current fullscreen video from video-chat-container 
               and reinit them to the correct divs  */ 
            if (!israndomised){
                UpdateMediumMenuView(id , eventList.get(id) ,true)
                selectedId = video_div.firstChild.id 
                video_div.removeChild(video_div.firstChild)            
                setRemoteStream(eventList.get(usersIds[i]) , usersIds[i])
                UpdateMediumMenuView(selectedId , eventList.get(selectedId) ,false)
                console.log(`change video view bettween ${selectedId} and ${id} `)
            }
            else
                setRemoteStream(eventList.get(usersIds[i]) , usersIds[i])
        
            break;
        }
    }    
}


function calculateDelay(startTime){
    var latency =  Date.now() - startTime;
    document.getElementById("latency").innerHTML = `${latency} ms`
}
