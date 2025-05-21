import View from "./View";
import {
  _generateMarkup,
  ACTIVE_HEIGHT_DIV,
  ACTIVE_HEIGHT_TEXT,
  COMP_HEIGHTS,
} from "../config";

class heightsView extends View {
  _displayHeight = function () {
    this._retarget(ACTIVE_HEIGHT_DIV);
    this._retarget(ACTIVE_HEIGHT_TEXT);

    View.activeHeightText.innerHTML = View.activeStateComp.height;
    View.activeHeightDiv.classList.remove("hide");
  };
}
export default new heightsView();
