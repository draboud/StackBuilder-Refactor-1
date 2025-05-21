import View from "./View";

class optionsView extends View {
  _activeOptsDiv;
  _activeOptsDiv1Text;
  _activeOptsDivSpacer;
  _activeOptsDiv2Text;

  _displayOptions = function () {
    this._activeOptsDiv = View.activeCompBlock.querySelector(".opts-div");
    this._activeOptsDiv1Text = this._activeOptsDiv.querySelector(".opts-text");
    this._activeOptsDivSpacer =
      this._activeOptsDiv.querySelector(".opts-spacer");
    this._activeOptsDiv2Text =
      this._activeOptsDiv.querySelector(".opts-text.second");

    if (View.activeCompType === "double") {
      this._activeOptsDivSpacer.classList.remove("hide");
      this._activeOptsDiv2Text.classList.remove("hide");
    } else {
      this._activeOptsDivSpacer.classList.add("hide");
      this._activeOptsDiv2Text.classList.add("hide");
    }
    this._activeOptsDiv.classList.remove("hide");
  };
}
export default new optionsView();
