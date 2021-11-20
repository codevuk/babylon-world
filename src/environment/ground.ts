import {
  Scene,
  Mesh,
  GroundMesh,
  StandardMaterial,
  Texture,
  PhysicsImpostor,
} from "@babylonjs/core";

class Ground {
  private scene: Scene;

  public mesh: GroundMesh;

  constructor(scene: Scene) {
    this.scene = scene;
    this.mesh = this.createGround(this.scene);
  }

  public hieght = (x: number, z: number) => {
    const h = this.mesh.getHeightAtCoordinates(x, z);
    console.log("hieght", h);

    return h;
  };

  private createGround = (scene: Scene): GroundMesh => {
    const ground = Mesh.CreateGroundFromHeightMap(
      "ground",
      "images/ground/hieght-map.jpg",
      5000,
      5000,
      20,
      0,
      100,
      scene,
      false,
      () => {
        const groundMaterial = new StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseTexture = new Texture(
          "images/ground/grass.jpg",
          scene
        );
        ground.material = groundMaterial;
        ground.checkCollisions = true;
        //   ground.physicsImpostor = new PhysicsImpostor(
        //     ground,
        //     PhysicsImpostor.HeightmapImpostor,
        //     { mass: 0 },
        //     scene
        //   );
      }
    );

    return ground;
  };
}

export default Ground;
