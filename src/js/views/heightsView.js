import View from "./View";
import { _generateMarkup, COMP_HEIGHTS } from "../config";

class heightsView extends View {
  _displayHeight = function (compButtonClickedName) {
    const activeHeightDiv = View.activeCompBlock.querySelector(".height-div");
    activeHeightDiv.querySelector(".height-text").innerHTML =
      COMP_HEIGHTS[compButtonClickedName];
    activeHeightDiv.classList.remove("hide");
  };
}
export default new heightsView();
