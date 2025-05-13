(() => {
  // src/js/config.js
  var COMP_IMG = {
    blank: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b4cd1ae8a7f37543072995_border-s-p-500.png",
    side: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png",
    spl: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a5fa6e4d52fd0b3de57a9_3D-spl.png",
    man: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a5fa6725b057559cbf6aa_3D-man.png",
    hyd: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a5fa6f13b04fef09ca675_3D-hyd.png",
    adaptor: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a74027217473126aea363_3D-dsa.png",
    single: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6ec4b8b91a31aa5abe_3D-single.png",
    cross: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6e1a63013f513c6d6b_3D-cross.png",
    cross_limit: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a776323e23acebce2481d_3D-cross-limit.png",
    bell_nipple: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a69c604d50a77f5517d85_3D-bell-nipple.png",
    gate_valve: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6f7172a37aa03166a1_3D-gate-valve.png",
    washington: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6e03fa1f13aafbc392_3D-washington.png",
    wellhead: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a5fa60fc8656bfb6db500_3D-wellhead.png",
    annular: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a68e44adb1f08dc09b296_3D-annular.png",
    spool: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6e7e501610bd690378_3D-spool.png",
    double: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6ed57c9634eecf5172_3D-double.png"
  };
  var _generateMarkup = function(compType, el) {
    if (compType === "_activeCompBlock") {
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
    if (compType === "_activeCompSideBlock") {
      return `
    <div class= "${stackView._sideFlag}_comp active">
      <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
      <div class="hyd_spacer hide"></div>
    </div>`;
    }
  };
  var ACTIVE_STATE_COMP = "_activeStateComp";
  var ACTIVE_COMP_BLOCK = "_activeCompBlock";

  // src/js/model.js
  var _idCount = 1;
  var _stateComptoActivate;
  var _activeStateComp;
  var _activeIndex;
  var STATE_COMP_TO_ACTIVATE = "_stateCompToActivate";
  var ACTIVE_STATE_COMP2 = "_activeStateComp";
  var ACTIVE_INDEX = "_activeIndex";
  var state = {
    activeId: "c-1",
    stateCompsArray: [
      {
        active: true,
        id: `c-${_idCount}`,
        image: COMP_IMG.blank,
        height: 0,
        options: {}
      }
    ]
  };
  var _setActiveStateComp = function(id) {
    state.stateCompsArray.forEach((el) => {
      el.active = false;
    });
    _retarget(STATE_COMP_TO_ACTIVATE, id);
    _stateComptoActivate.active = true;
    state.activeId = id;
  };
  var _configActiveStateComp = function(compType) {
    _retarget(ACTIVE_STATE_COMP2, state.activeId);
    _activeStateComp.image = COMP_IMG[compType];
    _activeStateComp.options = {};
  };
  var _resetStateCompIds = function() {
    _idCount = 1;
    for (let i = state.stateCompsArray.length - 1; i > 0; i--) {
      state.stateCompsArray[i].id = `c-${_idCount}`;
      _idCount++;
    }
    _retarget(ACTIVE_STATE_COMP2);
    state.activeId = _activeStateComp.id;
  };
  var _addStateComp = function() {
    _idCount++;
    const newStateComp = {
      active: true,
      id: `c-${_idCount}`,
      image: COMP_IMG.blank,
      height: 0,
      options: {}
    };
    state.stateCompsArray.splice(_activeIndex, 0, newStateComp);
    _retarget(ACTIVE_INDEX, newStateComp.id);
    _setActiveStateComp(newStateComp.id);
    _resetStateCompIds();
    state.activeId = _activeStateComp.id;
  };
  var _retarget = function(stateCompEl, id) {
    switch (stateCompEl) {
      case "_stateCompToActivate":
        _stateComptoActivate = state.stateCompsArray.find((el) => el.id === id);
        break;
      case "_activeStateComp":
        if (id) {
          _activeStateComp = state.stateCompsArray.find((el) => el.id === id);
        } else {
          _activeStateComp = state.stateCompsArray.find(
            (el) => el.active = true
          );
        }
        break;
      case "_activeIndex":
        _activeIndex = state.stateCompsArray.indexOf(
          state.stateCompsArray.find((el) => el.id === id)
        );
        break;
    }
  };

  // src/js/views/View.js
  var View = class {
    _data;
    _activeStateComp;
    _activeCompBlock;
    _retarget = function(comp) {
      this._data = state;
      switch (comp) {
        case "_activeStateComp":
          this._activeStateComp = this._data.stateCompsArray.find(
            (el) => el.id === this._data.activeId
          );
          break;
        case "_activeCompBlock":
          this._activeCompBlock = document.querySelector(
            `#${this._data.activeId}`
          );
          break;
      }
    };
  };

  // src/js/views/compButtonsView.js
  var compButtonsView = class extends View {
    _parentElement = document.querySelector(".vert_buttons_div");
    _addHandlerCompButtons(handler) {
      this._parentElement.addEventListener("click", function(e) {
        const compButtonClicked = e.target.closest(".comp_button");
        if (!compButtonClicked) return;
        handler(compButtonClicked.className.split(" ")[1]);
      });
    }
  };
  var compButtonsView_default = new compButtonsView();

  // src/js/views/stackView.js
  var stackView2 = class extends View {
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
    _setActiveCompBlock() {
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
      this._activeCompBlock.querySelector(".img").srcset = this._activeStateComp.image;
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
    _deleteCompBlock() {
    }
    //_________________________________________________________________________
  };
  var stackView_default = new stackView2();

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
  console.log("BRANCH: retarget from view");
  var controlCompButtons = function(compButtonClickedName) {
    switch (compButtonClickedName) {
      case "plus":
        _addStateComp();
        stackView_default._addCompBlock();
        stackView_default._setActiveCompBlock();
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
    _setActiveStateComp(compClickedId);
    stackView_default._setActiveCompBlock(state);
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
    _setActiveStateComp("c-1");
    stackView_default._setActiveCompBlock();
    compButtonsView_default._addHandlerCompButtons(controlCompButtons);
    stackView_default._addHandlerCompClick(controlCompClick);
  };
  init();
})();
