import { Mesh } from "@babylonjs/core";

class Hero {
  public speed: number;
  public mesh: Mesh;

  constructor(mesh: Mesh) {
    this.speed = 1;
    this.mesh = mesh;
  }
}

export default Hero;
