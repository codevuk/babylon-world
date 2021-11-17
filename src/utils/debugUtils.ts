import { Scene } from "@babylonjs/core";

const addInspector = (scene: Scene): void => {
  window.addEventListener("keydown", (event) => {
    // Shift+Ctrl+Alt+I
    if (
      event.shiftKey &&
      event.ctrlKey &&
      event.altKey &&
      event.keyCode === 73
    ) {
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide();
      } else {
        scene.debugLayer.show();
      }
    }
  });
};

export default addInspector;
