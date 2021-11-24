import {
  Mesh,
  Scene,
  Skeleton,
  Vector3,
  Animatable,
  Scalar,
} from "@babylonjs/core";
import Ground from "../environment/ground";
import InputMap from "../input/inputMap";

class Hero {
  private ground: Ground;
  private scene: Scene;
  private walkingAnimation: Animatable;

  public speed: number;
  public mesh: Mesh;
  public skeletons: Skeleton[];
  public front: Vector3;

  constructor(mesh: Mesh, skeletons: Skeleton[], ground: Ground, scene: Scene) {
    this.scene = scene;
    this.speed = 5;
    this.mesh = mesh;
    this.skeletons = skeletons;
    this.mesh.checkCollisions = true;
    this.ground = ground;
    this.mesh.position = new Vector3(0, ground.hieght(0, 0), 0);
    this.front = new Vector3(0, 0, 1);

    this.mesh.rotation.y = Math.PI;

    this.walkingAnimation = this.scene.beginAnimation(
      this.skeletons[0],
      0,
      100,
      true,
      1.0
    );
    this.walkingAnimation.pause();

    console.log("pos", this.mesh.position);
  }

  public move(inputs: InputMap) {
    if (inputs.wPressed || inputs.sPressed) {
      this.walkingAnimation.restart();
    } else {
      this.walkingAnimation.pause();
    }

    inputs.shiftPressed
      ? (this.speed = Scalar.Lerp(5, 10, 0.5))
      : (this.speed = 5);

    const direction = this.front;
    const normalized = direction.normalize();
    var alpha = Math.atan2(-1 * normalized.x, -1 * normalized.z);
    this.mesh.rotation.y = alpha;

    if (inputs.wPressed) {
      this.mesh.moveWithCollisions(
        this.front.multiplyByFloats(this.speed, this.speed, this.speed)
      );
      this.adjustYPosition();
    }
    if (inputs.sPressed) {
      this.mesh.moveWithCollisions(
        this.front.multiplyByFloats(-this.speed, -this.speed, -this.speed)
      );
      this.adjustYPosition();
    }
    if (inputs.dPressed) {
      this.mesh.rotation.y += 0.05;
      this.front = new Vector3(
        -1 * Math.sin(this.mesh.rotation.y),
        0,
        -1 * Math.cos(this.mesh.rotation.y)
      );
    }
    if (inputs.aPressed) {
      this.mesh.rotation.y -= 0.05;
      this.front = new Vector3(
        -1 * Math.sin(this.mesh.rotation.y),
        0,
        -1 * Math.cos(this.mesh.rotation.y)
      );
    }
  }

  private adjustYPosition = (): void => {
    this.mesh.moveWithCollisions(new Vector3(0, -1, 0));
  };
}

export default Hero;
