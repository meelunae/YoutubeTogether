// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '480',
      width: '720',
      videoId: 'mPVDGOVjRQ0',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

function onPlayerReady(event) {
    initializeButtons();
    updateProgress();
    event.target.playVideo();
  }

  var playerStatus;
  function onPlayerStateChange(event) {
    playerStatus = event.data;
    //only interested in 1 and 2 which are playing and paused cases
    switch(playerStatus) {
      case 1:
        mydata = {state: 'play', time: player.getCurrentTime()}
        socket.emit('event', mydata);
        console.log(playerStatus);
        break;
      case 2:
        mydata = {state: 'pause', time: player.getCurrentTime()}
        socket.emit('event', mydata);
        break;
      default:
        break;
    }

  }

  function playVideo() {
    if(playerStatus == YT.PlayerState.PAUSED)
      player.playVideo();
    }
  function pauseVideo() {
    if (playerStatus == YT.PlayerState.PLAYING)
     player.pauseVideo();
  }
  
  function goToTime(time) {
    player.seekTo(time);
    //lastKnownTimestamp = time;
  }
  function changeVideo(videoID) {
    player.loadVideoById(videoID);
    player.playVideo();
  }