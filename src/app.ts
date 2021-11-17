import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Scene, Engine } from "@babylonjs/core";
import { createCanvas } from "./utils/htmlUtils";
import createStartScene from "./scenes/start";
import State from "./scenes/state";
import { goToStart } from "./scenes/swticher";

class App {
  public canvas: HTMLCanvasElement;
  public engine: Engine;
  public scene: Scene;
  public state: State = State.Start;

  constructor() {
    // Initialise the canvas, engine and scene;
    this.canvas = createCanvas();
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);

    // Run the program
    this.main();
  }

  private main = async (): Promise<void> => {
    await goToStart(this);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  };
}

new App();

export default App;
