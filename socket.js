const SocketIO = require("socket.io");
var connectConter=0;
module.exports = server => {
  const io = SocketIO(server);
  io.on("connect", socket => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    connectConter++;
    socket.on('disconnect',function(){connectConter--;});
    console.log("connection!", ip, socket.id, req.ip);
    socket.broadcast.emit("otherConnect", socket.id);
    socket.broadcast.emit("connectCountDeliv", connectConter);
    socket.on("controlAction", data => {
      console.log(data);
      socket.broadcast.emit("displayControl", data);
    });
    socket.on('disconnect',function(){    socket.broadcast.emit("connectCountDeliv", connectConter);
  })
  });
};
