import * as model from "../model.js";

export default class View {
  _data;
  _activeStateComp;
  _activeCompBlock;
  _allCompBlocks;

  _retarget = function (comp) {
    this._data = model.state;
    switch (comp) {
      case "_activeStateComp":
        this._activeStateComp = this._data.stateCompsArray.find(
          (el) => el.id === this._data.activeId
        );
        break;
      case "_activeCompBlock":
        this._activeCompBlock = document.querySelector(
          `#${this._data.activeId}`
        );
        break;
      case "_allCompBlocks":
        this._allCompBlocks = document.querySelectorAll(".comp-div");
        break;
    }
  };
}
