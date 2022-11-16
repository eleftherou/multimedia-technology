const roomSelectionContainer = document.getElementById('room-selection-container')
const roomInput = document.getElementById('room-input')
const userInput = document.getElementById('user-id')
const connectButton = document.getElementById('connect-button')
const messageInput = document.getElementById('message-input')
const create_room = document.getElementById('create-room')
const join_room = document.getElementById('join-room')
const box = document.getElementById('box')

const userListInput = document.getElementById('usersList')
const participantsList = document.getElementById('participants')
const chat = document.getElementById('chat')
const sendButton = document.getElementById('send-button')
const muteButton = document.getElementById("mic")
const deafButton = document.getElementById("deaf")
const exitButton = document.getElementById("exit")
const fullscreenButton = document.getElementById("fullscreen")
const videomedium = document.getElementById("video-medium")
const InitParticipantsArea = document.getElementById("users-logo")
const InitChatArea = document.getElementById("chat-logo")
const hover = document.querySelector("screens")
const file = document.getElementById("attach-file")
const selected_file = document.getElementById("file-input")

const asidenav = document.getElementById('navigation')
const medium = document.getElementById("medium-view")
const video_div = document.getElementById('remote-video-container')
const profile = document.getElementById('profile')
const nav_background = document.getElementById('nav-and-menu')
const video_div_bottom = document.getElementById('remote-video-container2')

const videoChatContainer = document.getElementById('video-chat-container')
const localVideoComponent = document.getElementById('local-video')
const remoteVideoComponent = document.getElementById('remote-video')

const MAXIMUM_CHUNKFILE_SIZE = 65535; // max bytes per chunck 
const END_OF_FILE_MESSAGE = 'EOF';


const socket = io.connect('http://localhost:8080')