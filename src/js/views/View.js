import * as model from "../model.js";

export default class View {
  _data;
  static activeCompType;
  static activeStateComp;
  static activeCompBlock;
  static allCompBlocks;
  static activeOptsDiv;
  static activeOptsText1;
  static activeOptsSpacer;
  static activeOptsText2;

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
      case "activeOptsDiv":
        View.activeOptsDiv = View.activeCompBlock.querySelector(".opts-div");
        break;
      case "activeOptsText1":
        View.activeOptsText1 = View.activeOptsDiv.querySelector(".opts-text");
        break;
      case "activeOptsText2":
        View.activeOptsText2 =
          View.activeOptsDiv.querySelector(".opts-text.second");
        break;
      case "activeOptsSpacer":
        View.activeOptsSpacer =
          View.activeOptsDiv.querySelector(".opts-spacer");
        break;
    }
  };
  static getActiveStateBlock = function () {
    return View.activeStateComp;
  };
  static getActiveCompBlock = function () {
    return View.activeCompBlock;
  };
  static getAllCompBlocks = function () {
    return View.allCompBlocks;
  };
}
