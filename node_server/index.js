import { createServer } from "http";
import { setServerInstance, io, playersDict, addPlayerData, removePlayerData, room, playersData, updatePlayerDataPostion, updatePlayerDataRotation, setMockData, addMockData, mockData } from "./variables.js";

const httpServer = createServer();
import { Server } from "socket.io";
import { PlayerData } from "./public/playerData.js";

setServerInstance(new Server(httpServer, { cors: { origin: "*", methods: ["GET", "POST"] } }));

let port = process.env.PORT || 9000;
io.on("connection", (socket) => {
  socket.on("connected", (arg) => {
    socket.join(room);

    let newPlayerData = new PlayerData(15, 15, 10, 0, 0, 0, socket.id);
    addPlayerData(socket.id, socket, newPlayerData);

    socket.on("newHandleAddTopic", (arg) => {
      socket.to(room).emit("handleAddTopic", arg);
      addMockData(arg);
    });

    socket.on("newHandleAddSubtopic", (arg) => {
      socket.to(room).emit("handleAddSubtopic", arg);
      setMockData(arg);
    });

    socket.on("newHandleAddMainTask", (arg) => {
      socket.to(room).emit("handleAddMainTask", arg);
      setMockData(arg);
    });

    socket.on("newHandleAddSubTask", (arg) => {
      socket.to(room).emit("handleAddSubTask", arg);
      setMockData(arg);
    });

    socket.emit("innitMockData", mockData);

    socket.on("handleNewPos", (arg) => {
      let otherPlayers = [];
      for (let i = 0; i < playersData.length; i++) {
        if (playersData[i].key === socket.id) {
          playersData[i].value.positionX = arg[0];
          playersData[i].value.positionY = arg[1];
          playersData[i].value.positionZ = arg[2];
        }
        playersData[i].value.socketId = playersData[i].key;
        otherPlayers.push(playersData[i].value);
      }
      socket.to(room).emit("receiveNewPos", otherPlayers);
    });

    socket.on("handleNewRot", (arg) => {
      let otherPlayers = [];
      for (let i = 0; i < playersData.length; i++) {
        if (playersData[i].key === socket.id) {
          playersData[i].value.rotaionX = arg[0];
          playersData[i].value.rotaionY = arg[1];
          playersData[i].value.rotaionZ = arg[2];
        }
        playersData[i].value.socketId = playersData[i].key;
        otherPlayers.push(playersData[i].value);
      }
      // socket.to(room).emit("receiveNewRot", otherPlayers);
    });

    // let newPlayerData = new PlayerData(0, 0, 0, 0, 0, 0, socket.id);

    // addPlayerData(socket.id, socket, newPlayerData);

    // socket.emit("setSocketID", socket.id);

    // socket.emit("initOtherPlayers", playersData);
    // socket.to(room).emit("initNewPlayer", newPlayerData);

    socket.on("positionUpdate", (positionChange) => {
      updatePlayerDataPostion(positionChange);
      socket.to(room).emit("updateAllPlayersPosition", positionChange);
    });

    socket.on("rotationUpdate", (rotationChange) => {
      updatePlayerDataRotation(rotationChange);
      io.to(room).emit("updateAllPlayersRotation", rotationChange);
    });
  });

  socket.on("disconnect", function () {
    socket.to(room).emit("disposePlayer", socket.id);
    removePlayerData(socket.id);
  });
});

io.listen(port, () => {
  console.log("listening on port " + port);
});
