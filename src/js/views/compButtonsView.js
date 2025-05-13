import View from "./View";

class compButtonsView extends View {
  _parentElement = document.querySelector(".vert_buttons_div");

  _addHandlerCompButtons(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const compButtonClicked = e.target.closest(".comp_button");
      if (!compButtonClicked) return;
      handler(compButtonClicked.className.split(" ")[1]);
    });
  }
}

export default new compButtonsView();
