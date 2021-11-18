import InputMap from "./inputMap";

class InputController {
  public inputs: InputMap;

  constructor() {
    document.addEventListener("keydown", (event) =>
      this.updateInputs(event, true)
    );
    document.addEventListener("keyup", (event) =>
      this.updateInputs(event, false)
    );
  }

  private updateInputs = (event: KeyboardEvent, isPressed: boolean) => {
    switch (event.key) {
      case "w":
      case "W":
        this.inputs.wPressed = isPressed;
        break;
      case "a":
      case "A":
        this.inputs.aPressed = isPressed;
        break;
      case "s":
      case "S":
        this.inputs.sPressed = isPressed;
        break;
      case "d":
      case "D":
        this.inputs.dPressed = isPressed;
        break;
      default:
        break;
    }
  };
}

export default InputController;
