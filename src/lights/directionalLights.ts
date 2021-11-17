import { Scene, DirectionalLight, Vector3 } from "@babylonjs/core";

const createDirectionalLights = (scene: Scene): void => {
  const light1 = new DirectionalLight(
    "directionalLight0",
    new Vector3(-0.1, -1, 0),
    scene
  );
  const light2 = new DirectionalLight(
    "directionalLight1",
    new Vector3(-1, -1, 0),
    scene
  );
};

export default createDirectionalLights;
