import {
  Mesh,
  Scene,
  Skeleton,
  Vector3,
  Animatable,
  Scalar,
  MeshBuilder,
  StandardMaterial,
} from "@babylonjs/core";
import Ground from "../environment/ground";
import InputMap from "../input/inputMap";
import calculateBoundingBox from "./calculateBoundingBox";

class Hero {
  private ground: Ground;
  private scene: Scene;
  private walkingAnimation: Animatable;

  public speed: number;
  public mesh: Mesh;
  public skeletons: Skeleton[];
  public front: Vector3;
  public boundingBox: Mesh;
  public dimensions: Vector3;

  constructor(mesh: Mesh, skeletons: Skeleton[], ground: Ground, scene: Scene) {
    this.scene = scene;
    this.speed = 5;
    this.mesh = mesh;

    this.skeletons = skeletons;
    this.mesh.checkCollisions = true;
    this.ground = ground;
    this.mesh.position = new Vector3(0, ground.hieght(0, 0), 0);
    this.front = new Vector3(0, 0, 1);
    this.boundingBox = this.createBoundingBox();

    this.mesh.rotation.y = Math.PI;

    this.walkingAnimation = this.scene.beginAnimation(
      this.skeletons[0],
      0,
      100,
      true,
      1.0
    );
    this.walkingAnimation.pause();
  }

  public move(inputs: InputMap) {
    if (inputs.wPressed || inputs.sPressed) {
      this.walkingAnimation.restart();
    } else {
      this.walkingAnimation.pause();
    }

    inputs.shiftPressed
      ? (this.speed = Scalar.Lerp(5, 15, 0.5))
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

    this.boundingBox.position = new Vector3(
      this.mesh.position.x,
      this.mesh.position.y + this.dimensions.y / 2,
      this.mesh.position.z
    );
    this.boundingBox.rotation.y = this.mesh.rotation.y;
  }

  private adjustYPosition = (): void => {
    // Factors in the slope.
    this.mesh.moveWithCollisions(new Vector3(0, -1, 0));
  };

  private createBoundingBox = () => {
    this.dimensions = calculateBoundingBox(this.mesh);

    const boundryBox = MeshBuilder.CreateBox(
      "heroHitBox",
      {
        width: this.dimensions.x,
        height: this.dimensions.y,
        depth: this.dimensions.z,
      },
      this.scene
    );

    // Material may be used in development to see the outline
    // const material = new StandardMaterial("boundryMaterial", this.scene);
    // material.alpha = 0.4;

    // boundryBox.material = material;
    boundryBox.position = new Vector3(
      this.mesh.position.x,
      this.mesh.position.y,
      this.mesh.position.z
    );

    boundryBox.isVisible = false;

    console.log("box", boundryBox.position);
    console.log("mesh", this.mesh.position);

    return boundryBox;
  };
}

export default Hero;
