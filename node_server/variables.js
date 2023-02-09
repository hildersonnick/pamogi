import { PlayerData } from "./public/playerData.js";

export let io = null;
export let playersDict = [];
export let room = "0"; // Later to be defined by max players, and managing rooms
export let playersData = [];
export let mockData = [];
export const setMockData= (value) =>{
  mockData = value
}
export const addMockData= (value) =>{
  mockData.push(value)
}
export const setServerInstance = (instance) => {
  io = instance;
};
export const addPlayerData = (id, socket, playerData) => {
  playersDict.push({ key: id, value: socket });
  playersData.push({ key: id, value: playerData });
  
};
export const removePlayerData = (id) => {
  playersDict.splice(id, 1);
  
  let index = 0;
  for(let i=0;i<playersData.length;i++){
    if(playersData[i].key === id){
      index = i;
      break
    }
  }
  playersData.splice(index, 1);
};
export const updatePlayerDataPostion = (positionChange) => {
  for (let i = 0; i < playersData.length; i++) {
    if (playersData[i].key === positionChange.socketID) {
      playersData[i].value.positionX = positionChange.positionX;
      playersData[i].value.positionY = positionChange.positionY;
      playersData[i].value.positionZ = positionChange.positionZ;
      break;
    }
  }
};
export const updatePlayerDataRotation = (rotaionChange) => {
  for (let i = 0; i < playersData.length; i++) {
    if (playersData[i].key === rotaionChange.socketID) {
      playersData[i].value.rotationX = rotaionChange.rotationX;
      playersData[i].value.rotationY = rotaionChange.rotationY;
      playersData[i].value.rotationZ = rotaionChange.rotationZ;
      break;
    }
  }
};
