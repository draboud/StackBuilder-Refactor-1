import * as model from "../model.js";

export default class View {
  _data;
  static activeStateComp;
  static activeCompBlock;
  static allCompBlocks;

  _retarget = function (comp) {
    this._data = model.state;
    switch (comp) {
      case "_activeStateComp":
        View.activeStateComp = this._data.stateCompsArray.find(
          (el) => el.id === this._data.activeId
        );
        break;
      case "_activeCompBlock":
        View.activeCompBlock = document.querySelector(
          `#${this._data.activeId}`
        );
        break;
      case "_allCompBlocks":
        View.allCompBlocks = document.querySelectorAll(".comp-div");
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
