import * as model from "../model.js";

export default class View {
  _data;
  static sActiveStateComp;
  static sActiveCompBlock;
  static sAllCompBlocks;
  _activeStateComp;
  _activeCompBlock;
  _allCompBlocks;

  _retarget = function (comp) {
    this._data = model.state;
    switch (comp) {
      case "_activeStateComp":
        View.sActiveStateComp = this._data.stateCompsArray.find(
          (el) => el.id === this._data.activeId
        );
        break;
      case "_activeCompBlock":
        View.sActiveCompBlock = document.querySelector(
          `#${this._data.activeId}`
        );
        break;
      case "_allCompBlocks":
        View.sAllCompBlocks = document.querySelectorAll(".comp-div");
        break;
    }
  };
  static getActiveStateBlock = function () {
    return View.sActiveStateComp;
  };
  static getActiveCompBlock = function () {
    return View.sActiveCompBlock;
  };
  static getAllCompBlocks = function () {
    return View.sAllCompBlocks;
  };
}
