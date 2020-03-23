var socket = io();

      socket.on('event', function(msg) {
        if(msg.state == 'play'){
           playVideo(); 
        }
        
        else if(msg.state == 'pause'){ 
          pauseVideo();
          player.seekTo(msg.time);
        }
        else if(msg.state == 'changevideo') {
          changeVideo(msg.video);
        }
      });