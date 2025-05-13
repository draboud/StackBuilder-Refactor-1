import * as model from "./model.js";
import compButtonsView from "./views/compButtonsView.js";
import stackView from "./views/stackView.js";
import controlButtonsView from "./views/controlButtonsView.js";
import { GET_COMP } from "./helpers.js";

console.log("BRANCH: retarget from view");

const controlCompButtons = function (compButtonClickedName) {
  switch (compButtonClickedName) {
    case "plus":
      model._addStateComp();
      stackView._addCompBlock();
      stackView._activateCompBlock();
      break;
    case "minus":
      // model._removeStateComp();
      break;
    default:
      model._configActiveStateComp(compButtonClickedName);
      stackView._configCompBlock(model.state);
      break;
  }
};

const controlCompClick = function (compClickedId) {
  model._activateStateComp(compClickedId);
  stackView._activateCompBlock(model.state);
};

const init = function () {
  const testBtn = document.querySelector(".test_button");
  testBtn.addEventListener("click", function (e) {
    console.log("active state id: " + model.state.activeId);
    console.log("state array: ");
    model.state.stateCompsArray.forEach((el) => {
      console.log(el);
    });
  });

  //start with base comp block active and fed into model.state
  model._activateStateComp("c-1");
  //set handler functions
  compButtonsView._addHandlerCompButtons(controlCompButtons);
  stackView._addHandlerCompClick(controlCompClick);
};
init();
