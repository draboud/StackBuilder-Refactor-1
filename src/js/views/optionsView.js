import View from "./View";

class optionsView extends View {
  _displayOptions = function (compButtonClickedName) {
    const activeOptsDiv = View.activeCompBlock.querySelector(".opts-div");
    const activeOptsDivText = activeOptsDiv.querySelectorAll(".opts-text");
    activeOptsDivText.forEach((el) => {
      el.innerHTML = "test";
    });
    activeOptsDiv.classList.remove("hide");
  };
}
export default new optionsView();
