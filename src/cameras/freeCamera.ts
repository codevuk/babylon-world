import { FreeCamera, Scene, Vector3 } from "@babylonjs/core";

const createFreeCamera = (
  scene: Scene,
  canvas: HTMLCanvasElement
): FreeCamera => {
  const camera = new FreeCamera("freeCamera", new Vector3(0, 0, 0), scene);
  camera.attachControl(canvas);

  // Add keys for moving camera around
  camera.keysUp.push("w".charCodeAt(0));
  camera.keysUp.push("W".charCodeAt(0));
  camera.keysDown.push("s".charCodeAt(0));
  camera.keysDown.push("S".charCodeAt(0));
  camera.keysLeft.push("a".charCodeAt(0));
  camera.keysLeft.push("A".charCodeAt(0));
  camera.keysRight.push("d".charCodeAt(0));
  camera.keysRight.push("D".charCodeAt(0));

  camera.position.y = 50;
  camera.speed = 5;
  camera.checkCollisions = true;
  camera.applyGravity = false;

  return camera;
};

export default createFreeCamera;
