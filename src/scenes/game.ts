import { Scene, Vector3, CannonJSPlugin, Camera } from "@babylonjs/core";
import * as Cannon from "cannon";
import App from "../app";
import Assets from "../assets/assets";
import createFollowCamera from "../cameras/followCamera";
import FPSCamera from "../cameras/freeCamera";
import Ground from "../environment/ground";
import createSky from "../environment/sky";
import InputController from "../input/inputController";
import createDirectionalLights from "../lights/directionalLights";
import Hero from "../objects/hero";

const createGameScene = async (app: App): Promise<Scene> => {
  app.engine.displayLoadingUI();
  const scene = new Scene(app.engine);
  var hero: Hero;

  const inputController = new InputController();
  const gravity = new Vector3(0, -9.81, 0);
  const plugin = new CannonJSPlugin(true, 10, Cannon);

  scene.enablePhysics(gravity, plugin);

  const ground = new Ground(scene);

  const assets = new Assets(scene, (tasks) => {
    hero = new Hero(
      assets.dude.meshes[0],
      assets.dude.skeletons,
      ground,
      scene
    );
  });
  assets.load();

  createDirectionalLights(scene);
  createSky(scene);

  scene.collisionsEnabled = true;

  scene.beforeRender = () => {
    hero.move(inputController.inputs);

    if (inputController.inputs.onePressed) {
      scene.activeCamera = followCamera;
    }

    if (inputController.inputs.twoPressed) {
      scene.activeCamera = fpsCamera.camera;
    }

    if (scene.activeCamera === fpsCamera.camera) {
      fpsCamera.moveWithTaget(hero);
    }
  };

  await scene.whenReadyAsync();
  const fpsCamera = new FPSCamera(scene, hero.mesh.position);
  const followCamera = createFollowCamera(scene, hero.mesh);
  scene.activeCamera = followCamera;

  app.engine.hideLoadingUI();

  return scene;
};

export default createGameScene;
