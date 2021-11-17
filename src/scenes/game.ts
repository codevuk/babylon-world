import { Scene, Vector3, CannonJSPlugin } from "@babylonjs/core";
import * as Cannon from "cannon";
import App from "../app";
import createFreeCamera from "../cameras/freeCamera";
import createGround from "../environment/ground";
import createSky from "../environment/sky";
import createDirectionalLights from "../lights/directionalLights";

const createGameScene = async (app: App): Promise<Scene> => {
  app.engine.displayLoadingUI();
  const scene = new Scene(app.engine);

  const gravity = new Vector3(0, -9.81, 0);
  const plugin = new CannonJSPlugin(true, 10, Cannon);

  scene.enablePhysics(gravity, plugin);

  createFreeCamera(scene, app.canvas);
  createDirectionalLights(scene);
  createGround(scene);
  createSky(scene);

  scene.collisionsEnabled = true;

  await scene.whenReadyAsync();
  app.engine.hideLoadingUI();

  return scene;
};

export default createGameScene;
