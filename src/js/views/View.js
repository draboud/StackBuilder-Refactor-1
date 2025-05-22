import * as model from "../model.js";

export default class View {
  _data;
  static _modalBlockout = document.querySelector(".modal_blockout");
  static activeCompType;
  static activeStateComp;
  static activeCompBlock;
  static allCompBlocks;
  static activeHeightDiv;
  static activeHeightText;
  static activeOptsDiv;
  static activeOptsText1;
  static activeOptsSpacer;
  static activeOptsText2;
  //_________________________________________________________________________
  //modal blackout gets click event to close any open modal and hide itself
  static addHandlerModalBlockout = (handler) => {
    this._modalBlockout.addEventListener("click", function (e) {
      const clicked = e.target.closest(".modal_blockout");
      if (!clicked) return;
      handler();
    });
  };
  //_________________________________________________________________________
  //target most recent of the comp passed in
  _retarget = function (comp) {
    this._data = model.state;
    View.activeCompType = this._data.activeCompType;
    switch (comp) {
      case "activeStateComp":
        View.activeStateComp = this._data.stateCompsArray.find(
          (el) => el.id === this._data.activeId
        );
        break;
      case "activeCompBlock":
        View.activeCompBlock = document.querySelector(
          `#${this._data.activeId}`
        );
        break;
      case "allCompBlocks":
        View.allCompBlocks = document.querySelectorAll(".comp-div");
        break;
      case "activeCompType":
        View.activeCompType = this._data.activeCompType;
        break;
      case "activeHeightDiv":
        View.activeHeightDiv =
          View.activeCompBlock.querySelector(".height-div");
        View.activeHeightText =
          View.activeCompBlock.querySelector(".height-text");
        break;
      case "activeOptsDiv":
        View.activeOptsDiv = View.activeCompBlock.querySelector(".opts-div");
        View.activeOptsText1 = View.activeOptsDiv.querySelector(".opts-text");
        View.activeOptsText2 =
          View.activeOptsDiv.querySelector(".opts-text.second");
        View.activeOptsSpacer =
          View.activeOptsDiv.querySelector(".opts-spacer");
        break;
    }
  };
  //_________________________________________________________________________
  //open/close modal blockout
  static toggleModalBlockout = () => {
    this._modalBlockout.classList.toggle("hide");
  };
}
