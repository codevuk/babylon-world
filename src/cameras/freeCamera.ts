import { Camera, FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import Hero from "../objects/hero";

class FPSCamera {
  public camera: FreeCamera;

  constructor(scene: Scene, position: Vector3) {
    this.camera = new FreeCamera("freeCamera", position, scene);
    this.camera.checkCollisions = false;
    this.camera.ellipsoid = new Vector3(1, 1, 1);
    this.camera.invertRotation = true;
  }

  public moveWithTaget(hero: Hero): void {
    this.camera.position = new Vector3(
      hero.boundingBox.position.x,
      hero.boundingBox.position.y + hero.dimensions.y / 2,
      hero.boundingBox.position.z
    );
    this.camera.rotation.y = hero.boundingBox.rotation.y - Math.PI;
  }
}

export default FPSCamera;
