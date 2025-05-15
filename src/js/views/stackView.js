import View from "./View";
import {
  _generateMarkup,
  ACTIVE_COMP_BLOCK,
  ACTIVE_STATE_COMP,
  ALL_COMP_BLOCKS,
} from "../config";

class stackView extends View {
  _parentElement = document.querySelector(".comp-wrapper");

  //click events for all comp blocks
  _addHandlerCompClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const compClicked = e.target.closest(".comp-div");
      if (!compClicked) return;
      handler(compClicked.id);
    });
  }
  //_________________________________________________________________________
  //add active class to comp block via state's active id
  _setActiveCompBlock() {
    this._retarget(ACTIVE_STATE_COMP);
    this._retarget(ACTIVE_COMP_BLOCK);
    document.querySelectorAll(".comp-div").forEach((el) => {
      el.classList.remove("active");
    });
    this._activeCompBlock.classList.add("active");
  }
  //_________________________________________________________________________
  //loops forwards through state array, backwards through comp blocks to keep id-1 at bottom
  _resetCompBlockIds() {
    this._retarget(ALL_COMP_BLOCKS);
    const stateDataArray = this._data.stateCompsArray; //these vars to use 'this' in for loop
    const allCompBlocks = this._allCompBlocks;
    for (let i = 0; i < stateDataArray.length; i++) {
      allCompBlocks[i].id = stateDataArray[stateDataArray.length - 1 - i].id;
    }
  }
  //_________________________________________________________________________
  //set active comp's image via state's active id
  _configCompBlock() {
    this._activeCompBlock.querySelector(".img").srcset =
      this._activeStateComp.image;
  }
  //_________________________________________________________________________
  //add comp block via state's active id
  _addCompBlock() {
    this._retarget(ACTIVE_STATE_COMP);
    this._activeCompBlock.insertAdjacentHTML(
      "beforebegin",
      _generateMarkup(ACTIVE_COMP_BLOCK, this._activeStateComp)
    );
  }
  //_________________________________________________________________________
  //add comp block via state's active id
  _removeCompBlock() {
    this._retarget(ACTIVE_STATE_COMP);
    this._retarget(ACTIVE_COMP_BLOCK);
    this._activeCompBlock.parentNode.removeChild(this._activeCompBlock);
  }
  //_________________________________________________________________________
  //function description
  _getAllCompBlocks() {
    const allCompBlocks = this._allCompBlocks;
    return allCompBlocks;
  }
  //_________________________________________________________________________
}

export default new stackView();
