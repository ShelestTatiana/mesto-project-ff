(()=>{"use strict";var e=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)},t=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)},n=function(e){var n=document.querySelector(".popup_is-opened");"Escape"===e.key&&t(n)},r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"2b46e9fc-1e2f-4c30-b303-a3bd469f0607","Content-Type":"application/json"}},o=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},c=document.querySelector("#card-template").content;function u(e,t,n,r,o){var u=c.querySelector(".card").cloneNode(!0),a=u.querySelector(".card__delete-button"),i=u.querySelector(".card__image"),l=u.querySelector(".card__like-button"),s=u.querySelector(".card__like-count");return u.querySelector(".card__title").textContent=e.name,i.src=e.link,i.alt=e.name,s.textContent=e.likes.length,e.likes.some((function(e){return e._id===o}))?l.classList.add("card__like-button_is-active"):l.classList.remove("card__like-button_is-active"),e.owner._id===o?(u.dataset.myCardForDelete=e._id,a.addEventListener("click",(function(){return n(e._id,u)}))):a.remove(),i.addEventListener("click",(function(){return t(e)})),l.addEventListener("click",(function(){return r(e,l,s,o)})),u}function a(e,t,n,c){e.likes.some((function(e){return e._id===c}))?function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e._id),{method:"DELETE",headers:r.headers}).then(o)}(e).then((function(r){n.textContent=r.likes.length,t.classList.remove("card__like-button_is-active"),e.likes=r.likes})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:r.headers}).then(o)}(e).then((function(r){n.textContent=r.likes.length,t.classList.add("card__like-button_is-active"),e.likes=r.likes})).catch((function(e){return console.log(e)}))}var i=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)},l=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),t.setCustomValidity(""),r.classList.remove(n.errorClass),r.textContent=""},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),s(n,r,t)};function p(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _,m=document.querySelector(".places__list"),y=document.querySelector(".popup_type_image"),v=y.querySelector(".popup__image"),h=y.querySelector(".popup__caption"),S=document.querySelectorAll(".popup__close"),b=(document.querySelectorAll(".popup__button"),document.querySelector(".popup_type_edit")),q=b.querySelector(".popup__form"),E=q.querySelector(".popup__button"),g=q.querySelector(".popup__input_type_name"),k=q.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),A=document.querySelector(".profile__image"),x=document.querySelector(".profile__add-button"),U=document.querySelector(".profile__edit-button"),T=document.querySelector(".popup_type_edit-avatar"),j=T.querySelector(".popup__form"),D=j.querySelector(".popup__button"),P=j.querySelector(".popup__input_type_url"),w=document.querySelector(".avatar-container"),O=document.querySelector(".popup_type_new-card"),B=O.querySelector(".popup__form"),I=B.querySelector(".popup__input_type_card-name"),M=B.querySelector(".popup__input_type_url"),N=O.querySelector(".popup__button"),H=document.querySelector(".popup_type_delete-card"),J=H.querySelector(".popup__form"),V={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function G(t){v.src=t.link,v.alt=t.name,h.textContent=t.name,e(y)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):i(e,t,t.validationMessage,n)}(e,o,t),s(n,r,t)}))}))}(t,e)}))}(V),U.addEventListener("click",(function(){g.value=C.textContent,k.value=L.textContent,e(b),d(q,V)})),q.addEventListener("submit",(function(e){e.preventDefault(),p(!0,E),function(e,t){return fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:e,about:t})}).then(o)}(g.value,k.value).then((function(){C.textContent=g.value,L.textContent=k.value,t(b)})).catch((function(e){console.log("Ошибка при загрузке данных: ".concat(e))})).finally((function(){p(!1,E)}))})),w.addEventListener("click",(function(){j.reset(),e(T),d(j,V)})),j.addEventListener("submit",(function(e){var n;e.preventDefault(),console.log("Функция editAvatar вызвана"),(n=P.value,fetch(n,{method:"HEAD"}).then((function(e){return e.ok?e.headers.get("Content-type").includes("image")?Promise.resolve():Promise.reject("url не является изображением"):Promise.reject("url не существует")}))).then((function(){var e;console.log("URL проверен"),p(!0,D),(e=P.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e})}).then(o)).then((function(e){console.log("Блок .then вызван",e),A.style.backgroundImage="url(".concat(e.avatar,")"),t(T)})).catch((function(e){console.log("Ошибка при загрузке данных: ".concat(e))})).finally((function(){p(!1,D)})).catch((function(e){i(j,P,e,V),s(P,D,V)}))}))})),x.addEventListener("click",(function(){B.reset(),e(O)})),B.addEventListener("submit",(function(e){e.preventDefault(),p(!0,N),function(e,t){return fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:e,link:t})}).then(o)}(I.value,M.value).then((function(e){m.prepend(u(e,G,F,a,_)),B.reset(),d(B,V),t(O)})).catch((function(e){console.log("Ошибка при загрузке данных: ".concat(e))})).finally((function(){p(!1,N)}))}));var z={},F=function(t,n){z={id:t,cardItem:n},e(H)};J.addEventListener("submit",(function(e){!function(e){var n;e.preventDefault(),(n=z.id,fetch("".concat(r.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:r.headers}).then(o)).then((function(){z.cardItem.remove(),t(H),z={}})).catch((function(e){console.log("Error deleting card: ".concat(e))}))}(e)})),Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{method:"GET",headers:r.headers}).then(o),fetch("".concat(r.baseUrl,"/cards"),{method:"GET",headers:r.headers}).then(o)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];C.textContent=o.name,L.textContent=o.about,A.src=o.avatar,_=o._id,c.forEach((function(e){m.append(u(e,G,F,a,_))}))})).catch((function(e){console.log("Ошибка при загрузке данных: ".concat(e))})),S.forEach((function(e){e.addEventListener("click",(function(e){var n=e.target.closest(".popup");t(n)}))})),[b,O,y,T,H].forEach((function(e){return function(e){e.addEventListener("click",(function(n){n.target.classList.contains("popup_is-opened")&&t(e)}))}(e)}))})();
//# sourceMappingURL=main.js.map