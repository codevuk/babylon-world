import { Color4, FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";
import App from "../app";
import { goToGame } from "./swticher";

const createStartScene = async (app: App): Promise<Scene> => {
  app.engine.displayLoadingUI();

  const scene = new Scene(app.engine);
  scene.clearColor = new Color4(0, 0, 0, 1);

  const camera = new FreeCamera("menuCamera", new Vector3(0, 0, 0), scene);
  camera.setTarget(Vector3.Zero());

  const gui = AdvancedDynamicTexture.CreateFullscreenUI(
    "mainMenu",
    true,
    scene
  );
  gui.idealHeight = 720;

  const startButton = Button.CreateSimpleButton("start", "PLAY");
  startButton.width = 0.2;
  startButton.height = "40px";
  startButton.color = "black";
  startButton.top = "-14px";
  startButton.thickness = 0;
  startButton.background = "white";
  startButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

  gui.addControl(startButton);

  startButton.onPointerDownObservable.add(() => {
    goToGame(app);
    scene.detachControl();
  });

  await scene.whenReadyAsync();
  app.engine.hideLoadingUI();

  return scene;
};

export default createStartScene;
