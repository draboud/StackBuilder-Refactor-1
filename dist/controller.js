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
    if (compType === "activeCompBlock") {
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
    if (compType === "activeCompSideBlock") {
      return `
    <div class= "${stackView._sideFlag}_comp active">
      <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
      <div class="hyd_spacer hide"></div>
    </div>`;
    }
  };
  var ACTIVE_STATE_COMP = "activeStateComp";
  var ACTIVE_INDEX = "activeIndex";
  var ACTIVE_COMP_BLOCK = "activeCompBlock";
  var ALL_COMP_BLOCKS = "allCompBlocks";
  var ACTIVE_HEIGHT_DIV = "activeHeightDiv";
  var ACTIVE_OPTS_DIV = "activeOptsDiv";

  // src/js/model.js
  var _activeStateComp;
  var _activeIndex;
  var state = {
    activeId: "c-1",
    activeCompType: "blank",
    stateCompsArray: [
      {
        active: true,
        id: `c-1`,
        image: COMP_IMG.blank,
        height: 0,
        options: {
          default: "options",
          label: "",
          bore: "",
          type: "",
          range: "",
          pressure: ""
        }
      }
    ]
  };
  var setActiveStateComp = function(id) {
    state.stateCompsArray.forEach((el) => {
      el.active = false;
    });
    _retarget(ACTIVE_STATE_COMP, id);
    _activeStateComp.active = true;
    state.activeId = id;
    _retarget(ACTIVE_INDEX, state.activeId);
  };
  var configActiveStateComp = function(compType) {
    state.activeCompType = compType;
    _activeStateComp.height = COMP_HEIGHTS[compType];
    _activeStateComp.image = COMP_IMG[compType];
    _activeStateComp.options = {
      default: "options",
      label: "",
      bore: "",
      type: "",
      range: "",
      pressure: ""
    };
  };
  var resetStateCompIds = function() {
    let counter = 1;
    for (let i = 0; i < state.stateCompsArray.length; i++) {
      if (state.stateCompsArray[i].id === "new") state.activeId = `c-${counter}`;
      state.stateCompsArray[i].id = `c-${counter}`;
      counter++;
    }
  };
  var addStateComp = function() {
    const newStateComp = {
      active: false,
      id: "new",
      height: 0,
      image: COMP_IMG.blank,
      options: {
        default: "options",
        label: "",
        bore: "",
        type: "",
        range: "",
        pressure: ""
      }
    };
    state.stateCompsArray.splice(_activeIndex + 1, 0, newStateComp);
    resetStateCompIds();
    setActiveStateComp(state.activeId);
  };
  var removeStateComp = function() {
    if (_activeStateComp.id != "c-1") {
      state.stateCompsArray.splice(_activeIndex, 1);
      return true;
    } else {
      console.log("you can't delete this one!");
      return false;
    }
  };
  var resetAfterRemoval = function() {
    setActiveStateComp(state.stateCompsArray[_activeIndex - 1].id);
    resetStateCompIds();
  };
  var _retarget = function(stateCompEl, id) {
    switch (stateCompEl) {
      case "activeStateComp":
        if (id) {
          _activeStateComp = state.stateCompsArray.find((el) => el.id === id);
        } else {
          _activeStateComp = state.stateCompsArray.find(
            (el) => el.active === true
          );
        }
        break;
      case "activeIndex":
        _activeIndex = state.stateCompsArray.indexOf(
          state.stateCompsArray.find((el) => el.id === id)
        );
        break;
    }
  };
  var configActiveStateCompHeight = function(userEnteredHeight) {
    _activeStateComp.height = userEnteredHeight;
  };

  // src/js/views/View.js
  var View = class _View {
    _data;
    static _modalBlockout = document.querySelector(".modal_blockout");
    static activeCompType;
    static activeStateComp;
    static activeCompBlock;
    static allCompBlocks;
    static activeHeightDiv;
    static activeHeightText;
    static activeOptsDiv;
    static activeOptsText1;
    static activeOptsSpacer;
    static activeOptsText2;
    //_________________________________________________________________________
    //modal blackout gets click event to close any open modal and hide itself
    static addHandlerModalBlockout = (handler) => {
      this._modalBlockout.addEventListener("click", function(e) {
        const clicked = e.target.closest(".modal_blockout");
        if (!clicked) return;
        handler();
      });
    };
    //_________________________________________________________________________
    //target most recent of the comp passed in
    retarget = function(comp) {
      this._data = state;
      _View.activeCompType = this._data.activeCompType;
      switch (comp) {
        case "activeStateComp":
          _View.activeStateComp = this._data.stateCompsArray.find(
            (el) => el.id === this._data.activeId
          );
          break;
        case "activeCompBlock":
          _View.activeCompBlock = document.querySelector(
            `#${this._data.activeId}`
          );
          break;
        case "allCompBlocks":
          _View.allCompBlocks = document.querySelectorAll(".comp-div");
          break;
        case "activeCompType":
          _View.activeCompType = this._data.activeCompType;
          break;
        case "activeHeightDiv":
          _View.activeHeightDiv = _View.activeCompBlock.querySelector(".height-div");
          _View.activeHeightText = _View.activeCompBlock.querySelector(".height-text");
          break;
        case "activeOptsDiv":
          _View.activeOptsDiv = _View.activeCompBlock.querySelector(".opts-div");
          _View.activeOptsText1 = _View.activeOptsDiv.querySelector(".opts-text");
          _View.activeOptsSpacer = _View.activeOptsDiv.querySelector(".opts-spacer");
          _View.activeOptsText2 = _View.activeOptsDiv.querySelector(".opts-text.second");
          break;
      }
    };
    //_________________________________________________________________________
    //open/close modal blockout
    static toggleModalBlockout = () => {
      this._modalBlockout.classList.toggle("hide");
    };
  };

  // src/js/views/compButtonsView.js
  var compButtonsView = class extends View {
    _parentElement = document.querySelector(".vert_buttons_div");
    addHandlerCompButtons(handler) {
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
    addHandlerCompClick(handler) {
      this._parentElement.addEventListener("click", function(e) {
        const compClicked = e.target.closest(".comp-div");
        if (!compClicked) return;
        handler(compClicked.id);
      });
    }
    //_________________________________________________________________________
    //add active class to comp block via state's active id
    setActiveCompBlock() {
      this.retarget(ACTIVE_STATE_COMP);
      this.retarget(ACTIVE_COMP_BLOCK);
      document.querySelectorAll(".comp-div").forEach((el) => {
        el.classList.remove("active");
      });
      View.activeCompBlock.classList.add("active");
    }
    //_________________________________________________________________________
    //loops forwards through state array, backwards through comp blocks to keep id-1 at bottom
    resetCompBlockIds() {
      this.retarget(ALL_COMP_BLOCKS);
      const stateDataArray = this._data.stateCompsArray;
      const allCompBlocks = View.allCompBlocks;
      for (let i = 0; i < stateDataArray.length; i++) {
        allCompBlocks[i].id = stateDataArray[stateDataArray.length - 1 - i].id;
      }
    }
    //_________________________________________________________________________
    //set active comp's image via state's active id
    configCompBlock() {
      this.retarget(ALL_COMP_BLOCKS);
      View.activeCompBlock.querySelector(".img").srcset = View.activeStateComp.image;
    }
    //_________________________________________________________________________
    //add comp block via state's active id
    addCompBlock() {
      this.retarget(ACTIVE_STATE_COMP);
      View.activeCompBlock.insertAdjacentHTML(
        "beforebegin",
        _generateMarkup(ACTIVE_COMP_BLOCK, View.activeStateComp)
      );
    }
    //_________________________________________________________________________
    //add comp block via state's active id
    removeCompBlock() {
      View.activeCompBlock.parentNode.removeChild(View.activeCompBlock);
    }
    //_________________________________________________________________________
  };
  var stackView_default = new stackView2();

  // src/js/views/heightsView.js
  var heightsView = class extends View {
    _parentElement = document.querySelector(".comp-wrapper");
    _heightModal = document.querySelector(".height_modal");
    _heightInput = document.querySelector(".height_input");
    _heightForm = document.querySelector(".heightForm");
    _heightValue;
    isHeightModalOpen = false;
    //_________________________________________________________________________
    //click events for height div
    addHandlerHeightClick(handler) {
      this._parentElement.addEventListener("click", function(e) {
        const clicked = e.target.closest(".height-div");
        if (!clicked) return;
        handler();
      });
    }
    //_________________________________________________________________________
    //enter height - arrow function for 'this' to access global fields
    addHandlerHeightForm(handler) {
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
    displayHeight = function() {
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
      this.retarget(ACTIVE_HEIGHT_DIV);
      if (this._heightInput.value) {
        View.activeHeightText.innerHTML = this._heightInput.value + '"';
      } else {
        View.activeHeightText.innerHTML = View.activeStateComp.height + '"';
      }
    }
    //_________________________________________________________________________
  };
  var heightsView_default = new heightsView();

  // src/js/views/optionsView.js
  var optionsView = class extends View {
    _parentElement = document.querySelector(".comp-wrapper");
    _optsModal = document.querySelector(".options_modal");
    isOptsModalOpen;
    //_________________________________________________________________________
    //description
    addHandlerOptsClick = function(handler) {
      this._parentElement.addEventListener("click", function(e) {
        const clicked = e.target.closest(".opts-text");
        if (!clicked) return;
        handler(clicked);
      });
    };
    //_________________________________________________________________________
    //description
    addHandlerOptsModalBtn = function(handler) {
      this._optsModal.addEventListener("click", (e) => {
        const clicked = e.target.closest(".modal_close_button");
        if (!clicked) return;
        handler();
      });
    };
    //_________________________________________________________________________
    //description
    addHandlerOptsModalOpts = function(handler) {
      this._optsModal.addEventListener("click", (e) => {
        const clicked = e.target.closest(".opt_div");
        if (!clicked) return;
        handler(clicked);
      });
    };
    //_________________________________________________________________________
    //description
    addHandlerReviseBtn = function(handler) {
      this._optsModal.addEventListener("click", (e) => {
        const clicked = e.target.closest(".revise_button");
        if (!clicked) return;
        handler();
      });
    };
    //_________________________________________________________________________
    //description
    configOptions = function() {
    };
    //_________________________________________________________________________
    //description
    displayOptions = function() {
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
    toggleOptsModal = function() {
      this._optsModal.classList.toggle("hide");
      if (this._optsModal.classList.contains("hide")) {
        this.isOptsModalOpen = false;
      } else {
        this.isOptsModalOpen = true;
      }
    };
    //_________________________________________________________________________
    //description
  };
  var optionsView_default = new optionsView();

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
        addStateComp();
        stackView_default.addCompBlock();
        stackView_default.resetCompBlockIds();
        stackView_default.setActiveCompBlock();
        break;
      case "minus":
        let canRemoveComp = removeStateComp();
        if (canRemoveComp) {
          stackView_default.removeCompBlock();
          resetAfterRemoval();
          stackView_default.resetCompBlockIds();
          stackView_default.setActiveCompBlock();
        }
        break;
      default:
        configActiveStateComp(compButtonClickedName);
        stackView_default.configCompBlock();
        heightsView_default.configHeightValue();
        heightsView_default.displayHeight();
        optionsView_default.displayOptions();
        break;
    }
  };
  var controlCompClick = function(compClickedId) {
    setActiveStateComp(compClickedId);
    stackView_default.setActiveCompBlock();
  };
  var controlHeightClick = function() {
    heightsView_default.toggleHeightModal();
    View.toggleModalBlockout();
  };
  var controlHeightForm = function(heightValue) {
    heightsView_default.configHeightValue(heightValue);
    configActiveStateCompHeight(heightValue);
    heightsView_default.toggleHeightModal();
    View.toggleModalBlockout();
  };
  var controlHeightModalBtn = function() {
    heightsView_default.toggleHeightModal();
    View.toggleModalBlockout();
  };
  var controlModalBlockout = function() {
    if (heightsView_default.isHeightModalOpen) {
      heightsView_default.toggleHeightModal();
      heightsView_default.clearHeightValue();
    }
    if (optionsView_default.isOptsModalOpen) {
      optionsView_default.toggleOptsModal();
    }
    View.toggleModalBlockout();
  };
  var controlOptsClick = function(optClicked) {
    console.log(optClicked.classList.contains("second"));
    optionsView_default.toggleOptsModal();
    View.toggleModalBlockout();
  };
  var controlOptsModalBtn = function() {
    optionsView_default.toggleOptsModal();
    View.toggleModalBlockout();
  };
  var controlOptsModalOpts = function(clickedOpt) {
    console.log(clickedOpt.firstChild.innerHTML);
    clickedOpt.firstChild.classList.add("selected");
  };
  var controlReviseBtn = function() {
    console.log("revise button pressed");
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
    setActiveStateComp("c-1");
    stackView_default.setActiveCompBlock();
    compButtonsView_default.addHandlerCompButtons(controlCompButtons);
    stackView_default.addHandlerCompClick(controlCompClick);
    View.addHandlerModalBlockout(controlModalBlockout);
    heightsView_default.addHandlerHeightClick(controlHeightClick);
    heightsView_default.addHandlerHeightForm(controlHeightForm);
    heightsView_default.addHandlerHeightModalBtn(controlHeightModalBtn);
    optionsView_default.addHandlerOptsClick(controlOptsClick);
    optionsView_default.addHandlerOptsModalBtn(controlOptsModalBtn);
    optionsView_default.addHandlerOptsModalOpts(controlOptsModalOpts);
    optionsView_default.addHandlerReviseBtn(controlReviseBtn);
  };
  init();
})();
