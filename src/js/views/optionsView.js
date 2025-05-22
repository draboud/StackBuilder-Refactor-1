import { ACTIVE_OPTS_DIV } from "../config";
import View from "./View";

class optionsView extends View {
  _parentElement = document.querySelector(".comp-wrapper");
  _optsModal = document.querySelector(".options_modal");
  isOptsModalOpen;

  //_________________________________________________________________________
  //description
  addHandlerOptsClick = function (handler) {
    this._parentElement.addEventListener("click", function (e) {
      const clicked = e.target.closest(".opts-text");
      if (!clicked) return;
      handler(clicked);
    });
  };
  //_________________________________________________________________________
  //description
  addHandlerOptsModalBtn = function (handler) {
    this._optsModal.addEventListener("click", (e) => {
      const clicked = e.target.closest(".modal_close_button");
      if (!clicked) return;
      handler();
    });
  };
  //_________________________________________________________________________
  //description
  addHandlerOptsModalOpts = function (handler) {
    this._optsModal.addEventListener("click", (e) => {
      const clicked = e.target.closest(".opt_div");
      if (!clicked) return;
      handler(clicked);
    });
  };
  //_________________________________________________________________________
  //description
  addHandlerReviseBtn = function (handler) {
    this._optsModal.addEventListener("click", (e) => {
      const clicked = e.target.closest(".revise_button");
      if (!clicked) return;
      handler();
    });
  };
  //_________________________________________________________________________
  //description
  configOptions = function () {};
  //_________________________________________________________________________
  //description
  displayOptions = function () {
    this.retarget(ACTIVE_OPTS_DIV);
    if (View.activeCompType === "double") {
      View.activeOptsText2.innerHTML = View.activeStateComp.options["default"];
      View.activeOptsSpacer.classList.remove("hide");
      View.activeOptsText2.classList.remove("hide");
    } else {
      View.activeOptsSpacer.classList.add("hide");
      View.activeOptsText2.classList.add("hide");
    }
    View.activeOptsText1.innerHTML = View.activeStateComp.options["default"];
    View.activeOptsDiv.classList.remove("hide");
  };
  //_________________________________________________________________________
  //description
  toggleOptsModal = function () {
    this._optsModal.classList.toggle("hide");
    if (this._optsModal.classList.contains("hide")) {
      this.isOptsModalOpen = false;
    } else {
      this.isOptsModalOpen = true;
    }
  };
  //_________________________________________________________________________
  //description
}
export default new optionsView();
