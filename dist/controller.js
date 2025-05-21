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
  var COMP_HEIGHTS = {
    //in inches
    wellhead: 27,
    spool: 44,
    cross: 49,
    single: 72,
    double: 112,
    annular: 91,
    adaptor: 7,
    gate_valve: 72,
    bell_nipple: 112,
    washington: 60
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
  var ACTIVE_INDEX = "_activeIndex";
  var ACTIVE_COMP_BLOCK = "_activeCompBlock";
  var ALL_COMP_BLOCKS = "_allCompBlocks";

  // src/js/model.js
  var _activeStateComp;
  var _activeIndex;
  var state = {
    activeId: "c-1",
    stateCompsArray: [
      {
        active: true,
        id: `c-1`,
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
    _retarget(ACTIVE_STATE_COMP, id);
    _activeStateComp.active = true;
    state.activeId = id;
    _retarget(ACTIVE_INDEX, state.activeId);
  };
  var _configActiveStateComp = function(compType) {
    _activeStateComp.height = COMP_HEIGHTS[compType];
    _activeStateComp.image = COMP_IMG[compType];
    _activeStateComp.options = {};
  };
  var _resetStateCompIds = function() {
    let counter = 1;
    for (let i = 0; i < state.stateCompsArray.length; i++) {
      if (state.stateCompsArray[i].id === "new") state.activeId = `c-${counter}`;
      state.stateCompsArray[i].id = `c-${counter}`;
      counter++;
    }
  };
  var _addStateComp = function() {
    const newStateComp = {
      active: false,
      id: "new",
      height: 0,
      image: COMP_IMG.blank,
      options: {}
    };
    state.stateCompsArray.splice(_activeIndex + 1, 0, newStateComp);
    _resetStateCompIds();
    _setActiveStateComp(state.activeId);
  };
  var _removeStateComp = function() {
    if (_activeStateComp.id != "c-1") {
      state.stateCompsArray.splice(_activeIndex, 1);
      return true;
    } else {
      console.log("you can't delete this one!");
      return false;
    }
  };
  var _resetAfterRemoval = function() {
    _setActiveStateComp(state.stateCompsArray[_activeIndex - 1].id);
    _resetStateCompIds();
  };
  var _retarget = function(stateCompEl, id) {
    switch (stateCompEl) {
      case "_activeStateComp":
        if (id) {
          _activeStateComp = state.stateCompsArray.find((el) => el.id === id);
        } else {
          _activeStateComp = state.stateCompsArray.find(
            (el) => el.active === true
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
  var View = class _View {
    _data;
    static activeStateComp;
    static activeCompBlock;
    static allCompBlocks;
    _retarget = function(comp) {
      this._data = state;
      switch (comp) {
        case "_activeStateComp":
          _View.activeStateComp = this._data.stateCompsArray.find(
            (el) => el.id === this._data.activeId
          );
          break;
        case "_activeCompBlock":
          _View.activeCompBlock = document.querySelector(
            `#${this._data.activeId}`
          );
          break;
        case "_allCompBlocks":
          _View.allCompBlocks = document.querySelectorAll(".comp-div");
          break;
      }
    };
    static getActiveStateBlock = function() {
      return _View.activeStateComp;
    };
    static getActiveCompBlock = function() {
      return _View.activeCompBlock;
    };
    static getAllCompBlocks = function() {
      return _View.allCompBlocks;
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
      this._retarget(ACTIVE_STATE_COMP);
      this._retarget(ACTIVE_COMP_BLOCK);
      document.querySelectorAll(".comp-div").forEach((el) => {
        el.classList.remove("active");
      });
      View.activeCompBlock.classList.add("active");
    }
    //_________________________________________________________________________
    //loops forwards through state array, backwards through comp blocks to keep id-1 at bottom
    _resetCompBlockIds() {
      this._retarget(ALL_COMP_BLOCKS);
      const stateDataArray = this._data.stateCompsArray;
      const allCompBlocks = View.allCompBlocks;
      for (let i = 0; i < stateDataArray.length; i++) {
        allCompBlocks[i].id = stateDataArray[stateDataArray.length - 1 - i].id;
      }
    }
    //_________________________________________________________________________
    //set active comp's image via state's active id
    _configCompBlock() {
      View.activeCompBlock.querySelector(".img").srcset = View.activeStateComp.image;
    }
    //_________________________________________________________________________
    //add comp block via state's active id
    _addCompBlock() {
      this._retarget(ACTIVE_STATE_COMP);
      View.activeCompBlock.insertAdjacentHTML(
        "beforebegin",
        _generateMarkup(ACTIVE_COMP_BLOCK, View.activeStateComp)
      );
    }
    //_________________________________________________________________________
    //add comp block via state's active id
    _removeCompBlock() {
      View.activeCompBlock.parentNode.removeChild(View.activeCompBlock);
    }
    //_________________________________________________________________________
  };
  var stackView_default = new stackView2();

  // src/js/views/heightsView.js
  var heightsView = class extends View {
    _displayHeight = function(compButtonClickedName) {
      const activeHeightDiv = View.activeCompBlock.querySelector(".height-div");
      activeHeightDiv.querySelector(".height-text").innerHTML = COMP_HEIGHTS[compButtonClickedName];
      activeHeightDiv.classList.remove("hide");
    };
  };
  var heightsView_default = new heightsView();

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
  console.log("BRANCH: main");
  var controlCompButtons = function(compButtonClickedName) {
    switch (compButtonClickedName) {
      case "plus":
        _addStateComp();
        stackView_default._addCompBlock();
        stackView_default._resetCompBlockIds();
        stackView_default._setActiveCompBlock();
        break;
      case "minus":
        let canRemoveComp = _removeStateComp();
        if (canRemoveComp) {
          stackView_default._removeCompBlock();
          _resetAfterRemoval();
          stackView_default._resetCompBlockIds();
          stackView_default._setActiveCompBlock();
        }
        break;
      default:
        _configActiveStateComp(compButtonClickedName);
        stackView_default._configCompBlock(state);
        heightsView_default._displayHeight(compButtonClickedName);
        break;
    }
  };
  var controlCompClick = function(compClickedId) {
    _setActiveStateComp(compClickedId);
    stackView_default._setActiveCompBlock();
  };
  var init = function() {
    const testBtn = document.querySelector(".test_button");
    testBtn.addEventListener("click", function(e) {
      View.allCompBlocks.forEach((element) => {
        console.log(element);
      });
    });
    _setActiveStateComp("c-1");
    stackView_default._setActiveCompBlock();
    compButtonsView_default._addHandlerCompButtons(controlCompButtons);
    stackView_default._addHandlerCompClick(controlCompClick);
  };
  init();
})();
