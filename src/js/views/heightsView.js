import View from "./View";
import { _generateMarkup, COMP_HEIGHTS } from "../config";

class heightsView extends View {
  _activeHeightDiv;
  _activeHeightText;

  _displayHeight = function () {
    this._activeHeightDiv = View.activeCompBlock.querySelector(".height-div");
    this._activeHeightText =
      this._activeHeightDiv.querySelector(".height-text");

    this._activeHeightText.innerHTML = View.activeStateComp.height;
    this._activeHeightDiv.classList.remove("hide");
  };
}
export default new heightsView();
