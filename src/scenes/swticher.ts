import App from "../app";
import createGameScene from "./game";
import createStartScene from "./start";
import State from "./state";

const goToStart = async (app: App): Promise<void> => {
  app.state = State.Start;
  app.scene.detachControl();
  app.scene.dispose();

  app.scene = await createStartScene(app);
};

const goToGame = async (app: App): Promise<void> => {
  app.state = State.Start;
  app.scene.detachControl();
  app.scene.dispose();

  app.scene = await createGameScene(app);
};

export { goToStart, goToGame };
