import View from "./View";
import {
  _generateMarkup,
  ACTIVE_HEIGHT_DIV,
  ACTIVE_HEIGHT_TEXT,
  COMP_HEIGHTS,
} from "../config";

class heightsView extends View {
  _parentElement = document.querySelector(".comp-wrapper");
  _heightModal = document.querySelector(".height_modal");
  _heightInput = document.querySelector(".height_input");
  _heightForm = document.querySelector(".heightForm");
  _heightValue;
  isHeightModalOpen = false;

  //_________________________________________________________________________
  //click events for height div
  addHandlerHeightClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const clicked = e.target.closest(".height-div");
      if (!clicked) return;
      handler();
    });
  }
  //_________________________________________________________________________
  //enter height - arrow function for 'this' to access global fields
  addHandlerHeightModal(handler) {
    this._heightForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this._heightInput.value);
      this.clearHeightValue();
    });
  }
  //_________________________________________________________________________
  //close height modal- arrow function for 'this' to access global fields
  addHandlerHeightModalBtn(handler) {
    this._heightModal.addEventListener("click", (e) => {
      const clicked = e.target.closest(".modal_close_button");
      if (!clicked) return;
      this.clearHeightValue();
      handler(this._heightInput.value);
    });
  }
  //_________________________________________________________________________
  //open/close height modal
  toggleHeightModal() {
    this._heightModal.classList.toggle("hide");
    if (this._heightModal.classList.contains("hide")) {
      this.isHeightModalOpen = false;
    } else {
      this.isHeightModalOpen = true;
      this._heightInput.focus();
    }
  }
  //_________________________________________________________________________
  //reveal height div
  displayHeight = function () {
    this._retarget(ACTIVE_HEIGHT_DIV);
    View.activeHeightText.innerHTML = View.activeStateComp.height;
    View.activeHeightDiv.classList.remove("hide");
  };
  //_________________________________________________________________________
  //can be called outside the class
  clearHeightValue() {
    this._heightInput.value = "";
  }
  //_________________________________________________________________________
  //can be called outside the class
  configHeightValue() {
    this._retarget(ACTIVE_HEIGHT_DIV);
    View.activeHeightText.innerHTML = this._heightInput.value;
  }
  //_________________________________________________________________________
}
export default new heightsView();
