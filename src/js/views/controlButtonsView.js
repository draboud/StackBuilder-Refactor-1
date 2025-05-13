import View from "./View";

class controlButtonsView extends View {
  _parentElement = document.querySelector(".control_buttons_div");

  controlButtonsViewFunction() {
    console.log("inside controlButtonsViewFunction");
    console.log(this._parentElement);
  }
}

export default new controlButtonsView();
