import InputMap from "./inputMap";

class InputController {
  public inputs: InputMap = {
    wPressed: false,
    aPressed: false,
    sPressed: false,
    dPressed: false,
  };

  constructor() {
    document.addEventListener("keydown", (event) =>
      this.updateInputs(event, true)
    );
    document.addEventListener("keyup", (event) =>
      this.updateInputs(event, false)
    );
  }

  private updateInputs = (event: KeyboardEvent, isPressed: boolean) => {
    const { key } = event;

    if (key === "w" || key === "W") {
      this.inputs.wPressed = isPressed;
    }
    if (key === "s" || key === "S") {
      this.inputs.sPressed = isPressed;
    }
    if (key === "a" || key === "A") {
      this.inputs.aPressed = isPressed;
    }
    if (key === "d" || key === "D") {
      this.inputs.dPressed = isPressed;
    }
  };
}

export default InputController;
