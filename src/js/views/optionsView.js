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
  //set only the option that was clicked to active 'selected' state
  setActiveOpt = function (clickedOpt) {
    this.clearActiveOpts(clickedOpt);
    clickedOpt.classList.add("selected");
    this.setSelectedOpts();
  };
  //_________________________________________________________________________
  //closes opts modal and sets active comp's options to those selected
  setSelectedOpts = function () {
    const allBoreOptsText = [
      ...document
        .querySelector(".modal_column.bore")
        .querySelectorAll(".opt_div"),
    ];
    const allPressOptsText = [
      ...document
        .querySelector(".modal_column.press")
        .querySelectorAll(".opt_div"),
    ];
    const allOptsText = [allBoreOptsText, allPressOptsText];

    if (
      allOptsText.every((el) =>
        el.find((el2) => el2.classList.contains("selected"))
      )
    ) {
      console.log("success!");
    }
  };
  //_________________________________________________________________________
  //resets all options to unselected status
  clearActiveOpts = function (clickedOpt) {
    if (clickedOpt) {
      const allOptsInColumn =
        clickedOpt.parentElement.querySelectorAll(".opt_div");
      allOptsInColumn.forEach((el) => {
        el.classList.remove("selected");
      });
    } else {
      const allOpts = document.querySelectorAll(".opt_div");
      allOpts.forEach((el) => {
        el.classList.remove("selected");
      });
    }
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
    this.clearActiveOpts();
  };
  //_________________________________________________________________________
  //description
}
export default new optionsView();
