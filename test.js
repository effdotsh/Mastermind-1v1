var peer = new Peer();
peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
  });

  function connect(destID){


    var conn = peer.connect(destID);


  }