import"./chunk-BVKL2RYB.js";import{a as s,b as r,c as v,e as _}from"./chunk-O4QQOMKB.js";import{b as n}from"./chunk-GALEMG2F.js";var c=class{_data;_activeStateComp;_activeCompBlock};var l=class extends c{_parentElement=document.querySelector(".vert_buttons_div");_addHandlerCompButtons(t){this._parentElement.addEventListener("click",function(e){let o=e.target.closest(".comp_button").className.split(" ")[1];o&&t(o)})}},u=new l;var m=class i extends c{_parentElement=document.querySelector(".comp-wrapper");_addHandlerCompClick(t){this._parentElement.addEventListener("click",function(e){let o=e.target.closest(".comp-div");o&&t(o.id)})}_activateCompBlock(t){this._data=t;let e=document.querySelector(`#${t.activeId}`);document.querySelectorAll(".comp-div").forEach(o=>{o.classList.remove("active")}),e.classList.add("active")}_configCompBlock(t){this._data=t;let e=t.stateCompsArray.find(a=>a.id===t.activeId),o=document.querySelector(`#${e.id}`);o.querySelector(".img").srcset=e.image}_addCompBlock(t){this._data=t;let e=t.stateCompsArray.find(o=>o.active===!0);this._parentElement.insertAdjacentHTML("afterbegin",this._generateMarkup("compBlock",e)),this._activateCompBlock(t)}_renderStack(t){this._data=t,this._parentElement.innerHTML="",t.stackCompsArray.forEach(e=>{let o=this._generateMarkup("compBlock",e);this._parentElement.insertAdjacentHTML("afterbegin",o);let a=document.querySelector(".comp-div");e.active&&a.classList.add("active")})}_generateMarkup=function(t,e){if(t==="compBlock")return`
    <div id=${e.id} class="comp-div">
      <div class="side_left_div hide">
        <div class="left_comp">
          <img class="img_side" src=${n.side}>
          <div class="hyd_spacer hide"></div>
        </div>
      </div>
      <div class="height-div hide">
        <div class="height-text">height</div>
      </div>
      <img class="img" src=${e.image}>
      <div class="opts-div hide">
        <div class="opts-text">options</div>
        <div class="opts-spacer"></div>
        <div class="opts-text second">options</div>
      </div>
      <div class="side_right_div hide">
        <div class="right_comp">
          <img class="img_side" src=${n.side}>
          <div class="hyd_spacer hide"></div>
        </div>
    </div>`;if(t==="compSideBlock")return`
    <div class= "${i._sideFlag}_comp active">
      <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
      <div class="hyd_spacer hide"></div>
    </div>`}},d=new m;var p=class extends c{_parentElement=document.querySelector(".control_buttons_div");controlButtonsViewFunction(){console.log("inside controlButtonsViewFunction"),console.log(this._parentElement)}},L=new p;var f=function(i){switch(i){case"plus":_(),d._addCompBlock(s);break;case"minus":break;default:v(i),d._configCompBlock(s);break}},C=function(i){r(i),d._activateCompBlock(s)},h=function(){document.querySelector(".test_button").addEventListener("click",function(t){console.log("active state id: "+s.activeId),console.log("state array: "),s.stateCompsArray.forEach(e=>{console.log(e)})}),r("c-1"),u._addHandlerCompButtons(f),d._addHandlerCompClick(C)};h();
