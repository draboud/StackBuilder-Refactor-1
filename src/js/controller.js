import * as model from "./model.js";
import compButtonsView from "./views/compButtonsView.js";
import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import optionsView from "./views/optionsView.js";
import controlButtonsView from "./views/controlButtonsView.js";
import View from "./views/View.js";

// console.log("BRANCH: options-modal");
//_________________________________________________________________________
//comp button handler
const controlCompButtons = function (compButtonClickedName) {
  switch (compButtonClickedName) {
    case "plus":
      model.addStateComp();
      stackView.addCompBlock();
      stackView.resetCompBlockIds();
      stackView.setActiveCompBlock();
      break;
    case "minus":
      let canRemoveComp = model.removeStateComp();
      if (canRemoveComp) {
        //check if comp is not 'c-1' (base comp)
        stackView.removeCompBlock();
        model.resetAfterRemoval();
        stackView.resetCompBlockIds();
        stackView.setActiveCompBlock();
      }
      break;
    default:
      model.configActiveStateComp(compButtonClickedName);
      stackView.configCompBlock();
      heightsView.configHeightValue();
      heightsView.displayHeight();
      optionsView.displayOptions();
      break;
  }
};
//_________________________________________________________________________
//comp block handler
const controlCompClick = function (compClickedId) {
  model.setActiveStateComp(compClickedId);
  stackView.setActiveCompBlock();
};
//_________________________________________________________________________
//reveal height modal
const controlHeightClick = function () {
  heightsView.toggleHeightModal();
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//hide height modal, height value entered
const controlHeightForm = function (heightValue) {
  heightsView.configHeightValue(heightValue);
  model.configActiveStateCompHeight(heightValue);
  heightsView.toggleHeightModal();
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//hide height modal, no height value entered
const controlHeightModalBtn = function () {
  heightsView.toggleHeightModal();
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//toggle blockout and close any open modals
const controlModalBlockout = function () {
  if (heightsView.isHeightModalOpen) {
    heightsView.toggleHeightModal();
    heightsView.clearHeightValue();
  }
  if (optionsView.isOptsModalOpen) {
    optionsView.toggleOptsModal();
  }
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//when user clicks options button beside comp to open opts modal
const controlOptsClick = function (optClicked) {
  console.log(
    "this option is second (double): " + optClicked.classList.contains("second")
  );
  optionsView.toggleOptsModal();
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//description
const controlOptsModalBtn = function () {
  optionsView.toggleOptsModal();
  View.toggleModalBlockout();
};
//_________________________________________________________________________
//when user clicks an option in the options modal
const controlOptsModalOpts = function (clickedOpt) {
  console.log(
    clickedOpt.parentElement.querySelector(".category_div").firstChild.innerHTML
  );
  clickedOpt.firstChild.classList.add("selected");
};
//_________________________________________________________________________
//description
const controlReviseBtn = function () {
  console.log("revise button pressed");
};
//_________________________________________________________________________
//initialization
const init = function () {
  //..................................................................
  const testBtn = document.querySelector(".test_button");
  testBtn.addEventListener("click", function (e) {
    //........................................
    console.log("active state id: " + model.state.activeId);
    console.log("state array: ");
    model.state.stateCompsArray.forEach((el) => {
      console.log(el);
    });
    //........................................
  });
  //..................................................................

  //start with base comp block active and fed into model.state, then activate base comp block
  model.setActiveStateComp("c-1");
  stackView.setActiveCompBlock();
  //set handler functions
  compButtonsView.addHandlerCompButtons(controlCompButtons);
  stackView.addHandlerCompClick(controlCompClick);
  View.addHandlerModalBlockout(controlModalBlockout);
  heightsView.addHandlerHeightClick(controlHeightClick);
  heightsView.addHandlerHeightForm(controlHeightForm);
  heightsView.addHandlerHeightModalBtn(controlHeightModalBtn);
  optionsView.addHandlerOptsClick(controlOptsClick);
  optionsView.addHandlerOptsModalBtn(controlOptsModalBtn);
  optionsView.addHandlerOptsModalOpts(controlOptsModalOpts);
  optionsView.addHandlerReviseBtn(controlReviseBtn);
};
init();
