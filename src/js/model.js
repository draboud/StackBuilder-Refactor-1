import { ACTIVE_INDEX, ACTIVE_STATE_COMP, COMP_IMG } from "./config";

let _idCount = 1;
let _activeStateComp;
let _activeIndex;
//_________________________________________________________________________
//function description
export let state = {
  activeId: "c-1",
  stateCompsArray: [
    {
      active: true,
      id: `c-${_idCount}`,
      image: COMP_IMG.blank,
      height: 0,
      options: {},
    },
  ],
};
//_________________________________________________________________________
//function description
export const _setActiveStateComp = function (id) {
  state.stateCompsArray.forEach((el) => {
    el.active = false;
  });
  _retarget(ACTIVE_STATE_COMP, id);
  _activeStateComp.active = true;
  state.activeId = id;
};
//_________________________________________________________________________
//function description
export const _configActiveStateComp = function (compType) {
  _activeStateComp.image = COMP_IMG[compType];
  _activeStateComp.options = {};
};
//_________________________________________________________________________
//function description
export const _resetStateCompIds = function () {
  let counter = 1;
  for (let i = 0; i < state.stateCompsArray.length; i++) {
    if (state.stateCompsArray[i].id === "new") state.activeId = `c-${counter}`;
    state.stateCompsArray[i].id = `c-${counter}`;
    counter++;
  }
};
//_________________________________________________________________________
//function description
export const _addStateComp = function () {
  _idCount++;
  const newStateComp = {
    active: false,
    id: "new",
    image: COMP_IMG.blank,
    height: 0,
    options: {},
  };
  _retarget(ACTIVE_INDEX, state.activeId);
  state.stateCompsArray.splice(_activeIndex + 1, 0, newStateComp);
  _resetStateCompIds();
  _setActiveStateComp(state.activeId);
  // _retarget(ACTIVE_STATE_COMP);
  // _setActiveStateComp(_activeStateComp.id);
  // state.activeId = _activeStateComp.id;
  // console.log(state.stateCompsArray);
};
//_________________________________________________________________________
//function description
export const _retarget = function (stateCompEl, id) {
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
//_________________________________________________________________________
//function description
export const _getStateComp = function (stateCompEl, id) {
  switch (stateCompEl) {
    case "_activeStateComp":
      if (id) {
        return state.stateCompsArray.find((el) => el.id === id);
      } else {
        return state.stateCompsArray.find((el) => el.active === true);
      }
    // break;
    case "_activeIndex":
      return state.stateCompsArray.indexOf(
        state.stateCompsArray.find((el) => el.id === id)
      );
    // break;
  }
};
//_________________________________________________________________________
//function description
export const _setStateComp = function () {};
