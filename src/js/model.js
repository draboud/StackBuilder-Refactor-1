import { COMP_IMG } from "./config";

let _idCount = 1;
let _stateComptoActivate;
let _activeStateComp;
let _activeIndex;

const STATE_COMP_TO_ACTIVATE = "_stateCompToActivate";
const ACTIVE_STATE_COMP = "_activeStateComp";
const ACTIVE_INDEX = "_activeIndex";

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

export const _setActiveStateComp = function (id) {
  state.stateCompsArray.forEach((el) => {
    el.active = false;
  });
  _retarget(STATE_COMP_TO_ACTIVATE, id);
  _stateComptoActivate.active = true;
  state.activeId = id;
};

export const _configActiveStateComp = function (compType) {
  _retarget(ACTIVE_STATE_COMP, state.activeId);
  _activeStateComp.image = COMP_IMG[compType];
  _activeStateComp.options = {};
};

export const _resetStateCompIds = function () {
  _idCount = 1;
  for (let i = state.stateCompsArray.length - 1; i > 0; i--) {
    state.stateCompsArray[i].id = `c-${_idCount}`;
    _idCount++;
  }
  _retarget(ACTIVE_STATE_COMP);
  state.activeId = _activeStateComp.id;
};

export const _addStateComp = function () {
  _idCount++;
  const newStateComp = {
    active: true,
    id: `c-${_idCount}`,
    image: COMP_IMG.blank,
    height: 0,
    options: {},
  };
  state.stateCompsArray.splice(_activeIndex, 0, newStateComp);
  _retarget(ACTIVE_INDEX, newStateComp.id);
  _setActiveStateComp(newStateComp.id);
  _resetStateCompIds();
  state.activeId = _activeStateComp.id;
};

export const _retarget = function (stateCompEl, id) {
  switch (stateCompEl) {
    case "_stateCompToActivate":
      _stateComptoActivate = state.stateCompsArray.find((el) => el.id === id);
      break;
    case "_activeStateComp":
      if (id) {
        _activeStateComp = state.stateCompsArray.find((el) => el.id === id);
      } else {
        _activeStateComp = state.stateCompsArray.find(
          (el) => (el.active = true)
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
