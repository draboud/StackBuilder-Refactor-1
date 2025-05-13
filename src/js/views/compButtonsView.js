import View from "./View";

class compButtonsView extends View {
  _parentElement = document.querySelector(".vert_buttons_div");

  _addHandlerCompButtons(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const compButtonClicked = e.target
        .closest(".comp_button")
        .className.split(" ")[1];
      if (!compButtonClicked) return;
      handler(compButtonClicked);
    });
  }
}

export default new compButtonsView();
