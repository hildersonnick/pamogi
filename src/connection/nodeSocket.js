import { initNewPlayer, initOtherPlayers, setSocketID,disposePlayer, updatePlayerPosition } from "./variables.js";

export default class NodeSocket {
  socket;

  constructor() {
    if (this.socket !== undefined) return;

    this.socket = io("ws://localhost:3000");
    
    this.socket.emit("connected", this.socket.id);

    this.socket.on("setSocketID", (arg) => {
      setSocketID(arg);
    });

    this.socket.on("initOtherPlayers", (arg) => {
      initOtherPlayers(arg);
    });

    this.socket.on("initNewPlayer", (arg) => {
      initNewPlayer(arg);
    });

    this.socket.on("updateAllPlayersPosition",(positionChange)=>{
      updatePlayerPosition(positionChange);
    })

    this.socket.on("updateAllPlayersRotation",(rotationChange)=>{
      updatePlayerPosition(rotationChange);
    })

    this.socket.on("disposePlayer", arg=>{
      disposePlayer(arg);
    })
  }
}
