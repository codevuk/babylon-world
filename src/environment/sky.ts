import { Mesh, Scene } from "@babylonjs/core";
import { SkyMaterial } from "@babylonjs/materials";

const createSky = (scene: Scene): void => {
  const sky = new SkyMaterial("sky", scene);
  sky.backFaceCulling = false;
  sky.turbidity = 10;
  sky.luminance = 0.5;

  const skyBox = Mesh.CreateBox("skyBox", 10000.0, scene);
  skyBox.material = sky;
};

export default createSky;
