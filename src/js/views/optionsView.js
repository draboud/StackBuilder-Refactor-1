import {
  ACTIVE_OPTS_DIV,
  ACTIVE_OPTS_SPACER,
  ACTIVE_OPTS_TEXT_1,
  ACTIVE_OPTS_TEXT_2,
} from "../config";
import View from "./View";

class optionsView extends View {
  _displayOptions = function () {
    this._retarget(ACTIVE_OPTS_DIV);
    this._retarget(ACTIVE_OPTS_TEXT_1);
    this._retarget(ACTIVE_OPTS_TEXT_2);
    this._retarget(ACTIVE_OPTS_SPACER);

    if (View.activeCompType === "double") {
      View.activeOptsText2.innerHTML = View.activeStateComp.options["default"];
      View.activeOptsSpacer.classList.remove("hide");
      View.activeOptsText2.classList.remove("hide");
    } else {
      View.activeOptsSpacer.classList.add("hide");
      View.activeOptsText2.classList.add("hide");
    }
    View.activeOptsText1.innerHTML = View.activeStateComp.options["default"];
    View.activeOptsDiv.classList.remove("hide");
  };
  _displayTest = function () {};
}
export default new optionsView();
