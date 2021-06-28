var peer = new Peer();
peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
  });

  function connect(destID){


    var conn = peer.connect(destID);

    conn.on('open', function() {
        
        alert("OPENED CONNECTION")
      });

  }

  peer.on('connection', function(conn) { alert("CONNECTION RECIEVED") });