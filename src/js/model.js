import {
  ACTIVE_INDEX,
  ACTIVE_STATE_COMP,
  COMP_HEIGHTS,
  COMP_IMG,
} from "./config";

let _activeStateComp;
let _activeIndex;
//_________________________________________________________________________
//function description
export let state = {
  activeId: "c-1",
  activeCompType: "blank",
  stateCompsArray: [
    {
      active: true,
      id: `c-1`,
      height: 0,
      image: COMP_IMG.blank,
      options: {
        default: "options",
        label: "",
        bore: "",
        type: "",
        range: "",
        pressure: "",
      },
    },
  ],
};
//_________________________________________________________________________
//function description
export const setActiveStateComp = function (id) {
  state.stateCompsArray.forEach((el) => {
    el.active = false;
  });
  _retarget(ACTIVE_STATE_COMP, id);
  _activeStateComp.active = true;
  state.activeId = id;
  _retarget(ACTIVE_INDEX, state.activeId);
};
//_________________________________________________________________________
//function description
export const configActiveStateComp = function (compType) {
  state.activeCompType = compType;
  _activeStateComp.height = COMP_HEIGHTS[compType];
  _activeStateComp.image = COMP_IMG[compType];
  _activeStateComp.options = {
    default: "options",
    label: "",
    bore: "",
    type: "",
    range: "",
    pressure: "",
  };
};
//_________________________________________________________________________
//function description
export const resetStateCompIds = function () {
  let counter = 1;
  for (let i = 0; i < state.stateCompsArray.length; i++) {
    if (state.stateCompsArray[i].id === "new") state.activeId = `c-${counter}`;
    state.stateCompsArray[i].id = `c-${counter}`;
    counter++;
  }
};
//_________________________________________________________________________
//function description
export const addStateComp = function () {
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
      pressure: "",
    },
  };
  state.stateCompsArray.splice(_activeIndex + 1, 0, newStateComp);
  resetStateCompIds();
  setActiveStateComp(state.activeId);
};
//_________________________________________________________________________
//after removal, stackView updates UI then reset is called to update new active comp
export const removeStateComp = function () {
  if (_activeStateComp.id != "c-1") {
    state.stateCompsArray.splice(_activeIndex, 1);
    return true;
  } else {
    console.log("you can't delete this one!");
    return false;
  }
};
//_________________________________________________________________________
//called after stackView updates the UI from initial removal
export const resetAfterRemoval = function () {
  setActiveStateComp(state.stateCompsArray[_activeIndex - 1].id);
  resetStateCompIds();
};
//_________________________________________________________________________
//function description
export const _retarget = function (stateCompEl, id) {
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
  //_________________________________________________________________________
};
//adjust state comp height after user changes it
export const configActiveStateCompHeight = function (userEnteredHeight) {
  _activeStateComp.height = userEnteredHeight;
};
//_________________________________________________________________________
