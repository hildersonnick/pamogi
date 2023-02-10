export class PlayerData{
    positionX;
    positionY;
    positionZ;
    rotaionX;
    rotaionY;
    rotaionZ;
    socketID;
    constructor(posX,posY,posZ,rotX,rotY,rotZ,id){
        this.positionX = posX;
        this.positionY = posY;
        this.positionZ = posZ;
        this.rotaionX = rotX;
        this.rotaionY = rotY;
        this.rotaionZ = rotZ;
        this.socketID = id;
    }
}

export class DataPosition{
    data = [];
}