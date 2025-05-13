import View from "./View";
import {
  _generateMarkup,
  ACTIVE_COMP_BLOCK,
  ACTIVE_STATE_COMP,
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
  _activateCompBlock() {
    this._retarget(ACTIVE_COMP_BLOCK);
    document.querySelectorAll(".comp-div").forEach((el) => {
      el.classList.remove("active");
    });
    this._activeCompBlock.classList.add("active");
  }
  //_________________________________________________________________________
  //set active comp's image via state's active id
  _configCompBlock() {
    this._retarget(ACTIVE_STATE_COMP);
    this._retarget(ACTIVE_COMP_BLOCK);
    this._activeCompBlock.querySelector(".img").srcset =
      this._activeStateComp.image;
  }
  //_________________________________________________________________________
  //add comp block via state's active id
  _addCompBlock() {
    this._retarget(ACTIVE_STATE_COMP);
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      _generateMarkup(ACTIVE_COMP_BLOCK, this._activeStateComp)
    );
  }
  //_________________________________________________________________________
}

export default new stackView();
