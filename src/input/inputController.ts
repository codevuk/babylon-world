import InputMap from "./inputMap";

class InputController {
  public inputs: InputMap = {
    wPressed: false,
    aPressed: false,
    sPressed: false,
    dPressed: false,
    onePressed: false,
    twoPressed: false,
    shiftPressed: false,
    spacePressed: false,
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
    const { key, shiftKey } = event;

    this.inputs.shiftPressed = shiftKey;

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
    if (key === "1") {
      this.inputs.onePressed = isPressed;
    }
    if (key === "2") {
      this.inputs.twoPressed = isPressed;
    }
    if (key == " ") {
      this.inputs.spacePressed = isPressed;
    }
  };
}

export default InputController;
