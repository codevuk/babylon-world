import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Scene, Engine } from "@babylonjs/core";
import { createCanvas } from "./utils/htmlUtils";

class App {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private worldScene: Scene;

  constructor() {
    // Initialise the canvas, engine and scene;
    this.canvas = createCanvas();
    this.engine = new Engine(this.canvas, true);
    this.worldScene = new Scene(this.engine);
  }
}

new App();
