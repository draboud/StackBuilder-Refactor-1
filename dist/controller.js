import "./chunk-6AXHNNGS.js";
import {
  _activateStateComp,
  _addStateComp,
  _configActiveStateComp,
  state
} from "./chunk-PDMNLWLO.js";
import {
  COMP_IMG
} from "./chunk-Q3GLEH2F.js";

// src/js/views/View.js
var View = class {
  _data;
  _activeStateComp;
  _activeCompBlock;
  // _retarget = function (comp, id) {
  //   switch (comp){
  //     case _activateStateComp
  //   }
  //   _activateStateComp = stateData.stateCompsArray.find(
  //     (el) => el.id === stateData.activeId
  //   );
  // };
};

// src/js/views/compButtonsView.js
var compButtonsView = class extends View {
  _parentElement = document.querySelector(".vert_buttons_div");
  _addHandlerCompButtons(handler) {
    this._parentElement.addEventListener("click", function(e) {
      const compButtonClicked = e.target.closest(".comp_button").className.split(" ")[1];
      if (!compButtonClicked) return;
      handler(compButtonClicked);
    });
  }
};
var compButtonsView_default = new compButtonsView();

// src/js/views/stackView.js
var stackView = class _stackView extends View {
  // _data;
  _parentElement = document.querySelector(".comp-wrapper");
  //click events for all comp blocks
  _addHandlerCompClick(handler) {
    this._parentElement.addEventListener("click", function(e) {
      const compClicked = e.target.closest(".comp-div");
      if (!compClicked) return;
      handler(compClicked.id);
    });
  }
  //_________________________________________________________________________
  //add active class to comp block via state's active id
  _activateCompBlock(stateData) {
    this._data = stateData;
    const activeCompBlock = document.querySelector(`#${stateData.activeId}`);
    document.querySelectorAll(".comp-div").forEach((el) => {
      el.classList.remove("active");
    });
    activeCompBlock.classList.add("active");
  }
  //_________________________________________________________________________
  //set active comp's image via state's active id
  _configCompBlock(stateData) {
    this._data = stateData;
    const activeStateComp = stateData.stateCompsArray.find(
      (el) => el.id === stateData.activeId
    );
    const activeCompBlock = document.querySelector(`#${activeStateComp.id}`);
    activeCompBlock.querySelector(".img").srcset = activeStateComp.image;
  }
  //_________________________________________________________________________
  //add comp block via state's active id
  _addCompBlock(stateData) {
    this._data = stateData;
    const activeStateComp = stateData.stateCompsArray.find(
      (el) => el.active === true
    );
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup("compBlock", activeStateComp)
    );
    this._activateCompBlock(stateData);
  }
  //_________________________________________________________________________
  //render entire stack from model data
  _renderStack(stateData) {
    this._data = stateData;
    this._parentElement.innerHTML = "";
    stateData.stackCompsArray.forEach((el) => {
      let compBlock = this._generateMarkup("compBlock", el);
      this._parentElement.insertAdjacentHTML("afterbegin", compBlock);
      let compDiv = document.querySelector(".comp-div");
      if (el.active) compDiv.classList.add("active");
    });
  }
  //_________________________________________________________________________
  //Send in compType for either 'compBlock', 'compSideBlock'
  _generateMarkup = function(compType, el) {
    if (compType === "compBlock") {
      return `
    <div id=${el.id} class="comp-div">
      <div class="side_left_div hide">
        <div class="left_comp">
          <img class="img_side" src=${COMP_IMG.side}>
          <div class="hyd_spacer hide"></div>
        </div>
      </div>
      <div class="height-div hide">
        <div class="height-text">height</div>
      </div>
      <img class="img" src=${el.image}>
      <div class="opts-div hide">
        <div class="opts-text">options</div>
        <div class="opts-spacer"></div>
        <div class="opts-text second">options</div>
      </div>
      <div class="side_right_div hide">
        <div class="right_comp">
          <img class="img_side" src=${COMP_IMG.side}>
          <div class="hyd_spacer hide"></div>
        </div>
    </div>`;
    }
    if (compType === "compSideBlock") {
      return `
    <div class= "${_stackView._sideFlag}_comp active">
      <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
      <div class="hyd_spacer hide"></div>
    </div>`;
    }
  };
};
var stackView_default = new stackView();

// src/js/views/controlButtonsView.js
var controlButtonsView = class extends View {
  _parentElement = document.querySelector(".control_buttons_div");
  controlButtonsViewFunction() {
    console.log("inside controlButtonsViewFunction");
    console.log(this._parentElement);
  }
};
var controlButtonsView_default = new controlButtonsView();

// src/js/controller.js
var controlCompButtons = function(compButtonClickedName) {
  switch (compButtonClickedName) {
    case "plus":
      _addStateComp();
      stackView_default._addCompBlock(state);
      break;
    case "minus":
      break;
    default:
      _configActiveStateComp(compButtonClickedName);
      stackView_default._configCompBlock(state);
      break;
  }
};
var controlCompClick = function(compClickedId) {
  _activateStateComp(compClickedId);
  stackView_default._activateCompBlock(state);
};
var init = function() {
  const testBtn = document.querySelector(".test_button");
  testBtn.addEventListener("click", function(e) {
    console.log("active state id: " + state.activeId);
    console.log("state array: ");
    state.stateCompsArray.forEach((el) => {
      console.log(el);
    });
  });
  _activateStateComp("c-1");
  compButtonsView_default._addHandlerCompButtons(controlCompButtons);
  stackView_default._addHandlerCompClick(controlCompClick);
};
init();
