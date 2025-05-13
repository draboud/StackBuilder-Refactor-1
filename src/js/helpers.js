import * as model from "./model.js";

//_________________________________________________________________________
//for retargetting from state
// export const _retarget = function (stateCompEl, id) {
//   switch (stateCompEl) {
//     case _stateComptoActivate:
//       _stateComptoActivate = model.state.stateCompsArray.find(
//         (el) => el.id === id
//       );
//       return _stateComptoActivate;
//       break;
//     case _activeStateComp:
//       _activeStateComp = model.state.stateCompsArray.find(
//         (el) => (el.active = true)
//       );
//       return _activeStateComp;
//       break;
//     case _activeStateCompIndex:
//       _activeStateCompIndex = model.state.stateCompsArray.indexOf(
//         state.stateCompsArray.find((el) => el.id === id)
//       );
//       return _activeStateCompIndex;
//       break;
//   }
// };
//_________________________________________________________________________
//for retargetting
export const GET_COMP = {
  compWrapper: ".comp-wrapper",
  allCompDivs: ".comp-div",
  compDivActive: ".comp-div.active",
};
//_________________________________________________________________________
