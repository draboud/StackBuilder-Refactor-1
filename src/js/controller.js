import * as model from "./model.js";
import compButtonsView from "./views/compButtonsView.js";
import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import controlButtonsView from "./views/controlButtonsView.js";
// import { GET_COMP } from "./helpers.js";

// console.log("BRANCH: display height");

const controlCompButtons = function (compButtonClickedName) {
  switch (compButtonClickedName) {
    case "plus":
      model._addStateComp();
      stackView._addCompBlock();
      stackView._resetCompBlockIds();
      stackView._setActiveCompBlock();
      break;
    case "minus":
      let canRemoveComp;
      canRemoveComp = model._removeStateComp();
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
      stackView._configCompBlock(model.state);
      heightsView._displayHeight(compButtonClickedName);
      break;
  }
};

const controlCompClick = function (compClickedId) {
  model._setActiveStateComp(compClickedId);
  stackView._setActiveCompBlock();
};

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
  model._setActiveStateComp("c-1");
  stackView._setActiveCompBlock();
  //set handler functions
  compButtonsView._addHandlerCompButtons(controlCompButtons);
  stackView._addHandlerCompClick(controlCompClick);
};
init();
