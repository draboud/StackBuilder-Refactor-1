import * as model from "./model.js";
import compButtonsView from "./views/compButtonsView.js";
import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import optionsView from "./views/optionsView.js";
import controlButtonsView from "./views/controlButtonsView.js";
import View from "./views/View.js";

console.log("BRANCH: custom-height");
//_________________________________________________________________________
//comp button handler
const controlCompButtons = function (compButtonClickedName) {
  switch (compButtonClickedName) {
    case "plus":
      model._addStateComp();
      stackView._addCompBlock();
      stackView._resetCompBlockIds();
      stackView._setActiveCompBlock();
      break;
    case "minus":
      let canRemoveComp = model._removeStateComp();
      if (canRemoveComp) {
        //check if comp is not 'c-1' (base comp)
        stackView._removeCompBlock();
        model._resetAfterRemoval();
        stackView._resetCompBlockIds();
        stackView._setActiveCompBlock();
      }
      break;
    default:
      model._configActiveStateComp(compButtonClickedName);
      stackView._configCompBlock();
      heightsView._displayHeight();
      optionsView._displayOptions();
      break;
  }
};
//_________________________________________________________________________
//comp block handler
const controlCompClick = function (compClickedId) {
  model._setActiveStateComp(compClickedId);
  stackView._setActiveCompBlock();
};
//_________________________________________________________________________
//reveal height modal
const controlHeightClick = function () {
  // heightsView._revealHeightModal();
  heightsView._toggleHeightModal();
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//hide height modal, height value entered
const controlHeightModal = function (heightValue) {
  heightsView.configHeightValue(heightValue);
  heightsView._toggleHeightModal();
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//hide height modal, no height value entered
const controlHeightModalBtn = function () {
  heightsView._toggleHeightModal();
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//toggle blockout and close any open modals
const controlModalBlockout = function () {
  if (heightsView.isHeightModalOpen) {
    heightsView._toggleHeightModal();
    heightsView.clearHeightValue();
  }
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//initialization
const init = function () {
  //..................................................................
  const testBtn = document.querySelector(".test_button");
  testBtn.addEventListener("click", function (e) {
    //........................................
    // console.log("active state id: " + model.state.activeId);
    // console.log("state array: ");
    // model.state.stateCompsArray.forEach((el) => {
    //   console.log(el);
    // });
    //........................................
    optionsView._displayTest();
  });
  //..................................................................

  //start with base comp block active and fed into model.state, then activate base comp block
  model._setActiveStateComp("c-1");
  stackView._setActiveCompBlock();
  //set handler functions
  compButtonsView._addHandlerCompButtons(controlCompButtons);
  stackView._addHandlerCompClick(controlCompClick);
  View._addHandlerModalBlockout(controlModalBlockout);
  heightsView._addHandlerHeightClick(controlHeightClick);
  heightsView._addHandlerHeightModal(controlHeightModal);
  heightsView._addHandlerHeightModalBtn(controlHeightModalBtn);
};
init();
