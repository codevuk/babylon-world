import { FollowCamera, Mesh, Scene } from "@babylonjs/core";

const createFollowCamera = (scene: Scene, target: Mesh): FollowCamera => {
  console.log("taregt", target);
  const camera = new FollowCamera(
    target.name + "_followCamera",
    target.position,
    scene,
    target
  );

  camera.cameraAcceleration = 0.5;
  camera.maxCameraSpeed = 50;

  camera.radius = 250;
  camera.heightOffset = 80;
  camera.rotationOffset = 0;

  return camera;
};

export default createFollowCamera;
