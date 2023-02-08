export class PlayerData {
  positionX;
  positionY;
  positionZ;
  rotaionX;
  rotaionY;
  rotaionZ;
  socketID;
  constructor(posX, posY, posZ, rotX, rotY, rotZ, id) {
    this.positionX = posX;
    this.positionY = posY;
    this.positionZ = posZ;
    this.rotaionX = rotX;
    this.rotaionY = rotY;
    this.rotaionZ = rotZ;
    this.socketID = id;
  }
}

export class PostionChange {
  positionX;
  positionY;
  positionZ;
  socketID;
  constructor(x, y, z, id) {
    this.positionX = x;
    this.positionY = y;
    this.positionZ = z;
    this.socketID = id;
  }
}

export class RotationChange {
  rotationX;
  rotationY;
  rotationZ;
  socketID;
  constructor(x, y, z, id) {
    this.rotationX = x;
    this.rotationY = y;
    this.rotationZ = z;
    this.socketID = id;
  }
}
