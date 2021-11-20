import {
  AssetsManager,
  Mesh,
  Scene,
  Skeleton,
  AbstractAssetTask,
  MeshAssetTask,
} from "@babylonjs/core";
import Model from "../objects/modelGeneric";

type OnFinishFunc = (tasks: AbstractAssetTask[]) => void;

class Assets {
  private assetsManager: AssetsManager;

  public dude: Model = {
    meshes: [],
    skeletons: [],
  };

  constructor(scene: Scene, onFinsish?: OnFinishFunc) {
    this.assetsManager = new AssetsManager(scene);
    this.assetsManager.onFinish = onFinsish;
  }

  private initDude(): void {
    const meshTask = this.assetsManager.addMeshTask(
      "dude_loader",
      "him",
      "models/dude/",
      "Dude.babylon"
    );

    meshTask.onSuccess = (task: MeshAssetTask) => {
      this.dude.meshes = task.loadedMeshes as Mesh[];
      this.dude.skeletons = task.loadedSkeletons;
    };

    meshTask.onError = (task: MeshAssetTask, message: string) => {
      console.error("Error", message);
    };
  }

  public load(): void {
    this.initDude();
    this.assetsManager.load();
  }
}

export default Assets;
export { OnFinishFunc };
