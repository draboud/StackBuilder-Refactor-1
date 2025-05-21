import * as model from "../model.js";

export default class View {
  _data;
  static activeCompType;
  static activeStateComp;
  static activeCompBlock;
  static allCompBlocks;

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
