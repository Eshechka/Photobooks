(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{208:function(t,e,s){},209:function(t,e,s){},210:function(t,e,s){},211:function(t,e,s){},213:function(t,e,s){"use strict";var i=s(208);s.n(i).a},214:function(t,e,s){"use strict";var i=s(209);s.n(i).a},215:function(t,e,s){"use strict";var i=s(210);s.n(i).a},216:function(t){t.exports=JSON.parse('[{"id":"vk","icon":"../icons/soc_vk.svg","text":"vk","isActive":false,"link":"https://vk.com/"},{"id":"fb","icon":"../icons/soc_fb.svg","text":"fb","isActive":false,"link":"https://fb.com/"},{"id":"tw","icon":"../icons/soc_twitter.svg","text":"tw","isActive":false,"link":"https://tw.com/"},{"id":"google","icon":"../icons/social_google.svg","text":"google","isActive":false,"link":"https://vk.com/"},{"id":"email","icon":"../icons/soc_email.svg","text":"email","isActive":false,"link":"https://vk.com/"}]')},217:function(t,e,s){"use strict";var i=s(211);s.n(i).a},219:function(t,e,s){"use strict";s.r(e);const i="https://xeniaweb.online/storage";var a={props:{cardObject:Object},data:()=>({urlAvatars:i+"/avatars",urlPhotos:i+"/photos"}),methods:{mounted(){console.log("this.cardObject",this.cardObject)}}},r=(s(213),s(3)),o=Object(r.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card"},[s("div",{staticClass:"card__img-card"},[s("img",{staticClass:"card__img",attrs:{src:t.urlPhotos+"/"+t.cardObject.photo,alt:"card image"}}),t._v(" "),s("div",{staticClass:"card__img-overlay",on:{click:function(e){return t.$emit("click-card",t.cardObject.id)}}})]),t._v(" "),s("div",{staticClass:"card__info"},[s("router-link",{staticClass:"card__avatar",attrs:{tag:"div",to:"/"+t.cardObject.author.id}},[s("img",{staticClass:"card__avatar-img",attrs:{src:t.urlAvatars+"/"+t.cardObject.author.avatar,alt:"card avatar"}}),t._v(" "),s("div",{staticClass:"card__avatar-overlay"})]),t._v(" "),s("div",{staticClass:"card__desc"},[s("div",{staticClass:"card__desc-title"},[t._v(" "+t._s(t.cardObject.title)+" ")]),t._v(" "),s("div",{staticClass:"card__signs-wrapper"},[s("div",{staticClass:"card__signs card__signs_comments card__signs_mini"},[t._v(t._s(t.cardObject.commentCount))]),t._v(" "),s("div",{staticClass:"card__signs card__signs_likes card__signs_mini"},[t._v(t._s(t.cardObject.likeCount))])])])],1),t._v(" "),s("div",{staticClass:"card__signs-wrapper card__signs-wrapper_toright"},[s("div",{staticClass:"card__signs card__signs_name"},[t._v(t._s(t.cardObject.albumName))])])])}),[],!1,null,null,null).exports,l=s(30);s(1);var c={props:{myAlbumObject:Object,isLoggedUser:Boolean},data:()=>({urlPhotos:"https://xeniaweb.online/storage/photos"}),methods:{getPreviewUrl(){this.myAlbumObject.preview||console.log("No preview")}}},n=(s(214),Object(r.a)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-album"},[s("router-link",{staticClass:"my-album__img-my-album",attrs:{tag:"div",to:"/album/"+t.myAlbumObject.id}},[s("img",{staticClass:"my-album__img",attrs:{src:t.urlPhotos+"/"+t.myAlbumObject.preview,alt:"album image"}}),t._v(" "),s("div",{staticClass:"my-album__img-overlay"},[t._v(t._s(t.myAlbumObject.description))])]),t._v(" "),s("div",{staticClass:"my-album__folder"},[t.isLoggedUser?s("button",{staticClass:"my-album__button my-album__button_edit",attrs:{type:"button"},on:{click:function(e){return t.$emit("click-edit-my-album",t.myAlbumObject)}}}):t._e(),t._v(" "),s("router-link",{staticClass:"my-album__folder-name",attrs:{to:"/album/"+t.myAlbumObject.id},on:{click:function(t){t.preventDefault()}}},[t._v(t._s(t.myAlbumObject.albumName))])],1)],1)}),[],!1,null,null,null).exports);var d={props:{editedAlbumObject:Object,authorId:Number,mode:String},data:()=>({urlPhotos:"https://xeniaweb.online/storage/photos",title:"Добавить альбом",coverTitle:"Загрузить обложку",renderedCover:{pic:""},loadedCover:{},isCoverLoaded:!1,myChangeCurrentObject:{id:Number,description:"",authorId:Number,preview:"",title:""}}),methods:{loadCover(t){this.loadedCover=t.target.files[0],(t=>{const e=new FileReader;return new Promise((s,i)=>{try{e.readAsDataURL(t),e.onloadend=()=>{s(e.result)}}catch(t){throw new Error("Ошибка при чтении файла")}})})(this.loadedCover).then(t=>{this.renderedCover.pic=t,this.isCoverLoaded=!this.isCoverLoaded,this.coverTitle="Изменить обложку"})},setChangedAlbum(){this.myChangeCurrentObject=this.editedAlbumObject,this.title="Отредактировать альбом",this.coverTitle="Редактировать обложку"},clearChangedAlbum(){this.title="Добавить альбом",this.coverTitle="Добавить обложку",this.myChangeCurrentObject={id:this.editedAlbumObject.id,description:"",authorId:this.authorId,preview:"",title:""}},submitChangeAlbumHandler(){if("add"==this.mode&&this.renderedCover){const t=new FormData;t.append("preview",this.loadedCover),t.append("title",this.myChangeCurrentObject.title),t.append("description",this.myChangeCurrentObject.description),t.append("authorId",this.authorId),this.$emit("submit-change-my-album",t,this.mode)}else if("edit"==this.mode){const t={};t.id=this.myChangeCurrentObject.id,t.title=this.myChangeCurrentObject.title,t.description=this.myChangeCurrentObject.description,t.authorId=this.authorId,this.$emit("submit-change-my-album",t,this.mode)}},deleteAlbumHandler(){this.$emit("delete-album",this.editedAlbumObject.id)}},created(){"edit"===this.mode?this.setChangedAlbum():"add"===this.mode&&this.clearChangedAlbum()}},u=(s(215),Object(r.a)(d,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"change-album"},[i("div",{staticClass:"change-album__card"},[i("div",{staticClass:"change-album__topgroup"},[i("h4",{staticClass:"change-album__title"},[t._v(t._s(t.title))]),t._v(" "),i("button",{staticClass:"change-album__button change-album__button_close",attrs:{type:"button"},on:{click:function(e){return t.$emit("click-close-change-my-album")}}})]),t._v(" "),i("div",{staticClass:"change-album__form"},[i("form",{staticClass:"form-changeAlbum",on:{submit:function(e){return e.preventDefault(),t.submitChangeAlbumHandler(e)}}},[i("label",{staticClass:"form-changeAlbum__label"},[t._v("Название альбома\n                    "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.myChangeCurrentObject.title,expression:"myChangeCurrentObject.title"}],staticClass:"form-changeAlbum__input",attrs:{type:"text",placeholder:"Название альбома"},domProps:{value:t.myChangeCurrentObject.title},on:{input:function(e){e.target.composing||t.$set(t.myChangeCurrentObject,"title",e.target.value)}}})]),t._v(" "),i("label",{staticClass:"form-changeAlbum__label"},[t._v("Описание\n                    "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.myChangeCurrentObject.description,expression:"myChangeCurrentObject.description"}],staticClass:"form-changeAlbum__input form-changeAlbum__input_textarea",attrs:{cols:"20",rows:"5",placeholder:"Описание альбома"},domProps:{value:t.myChangeCurrentObject.description},on:{input:function(e){e.target.composing||t.$set(t.myChangeCurrentObject,"description",e.target.value)}}})]),t._v(" "),i("div",{staticClass:"form-changeAlbum__cover"},[i("label",{staticClass:"form-changeAlbum__label form-changeAlbum__label_file-load",attrs:{for:"load-bgcover-album"}},[i("div",{staticClass:"form-changeAlbum__cover-img-wrapper"},[i("input",{staticClass:"form-changeAlbum__input-load",attrs:{type:"file",id:"load-bgcover-album"},on:{change:t.loadCover}}),t._v(" "),t.isCoverLoaded?i("div",{staticClass:"form-changeAlbum__added-photo",style:{backgroundImage:"url("+t.renderedCover.pic+")"}}):t._e(),t._v(" "),t.isCoverLoaded||"edit"!=t.mode?t.isCoverLoaded||"add"!=t.mode?t._e():i("img",{staticClass:"form-changeAlbum__cover-img",attrs:{src:s(37).default,alt:"album cover image"}}):i("img",{staticClass:"form-changeAlbum__cover-img",attrs:{src:t.urlPhotos+"/"+t.myChangeCurrentObject.preview,alt:"album cover image"}})]),t._v(" "),i("div",{staticClass:"form-changeAlbum__cover-button"},[i("button",{staticClass:"site-button site-button_theme-light",attrs:{type:"button"}},[t._v(t._s(t.coverTitle))])])]),t._v(" "),i("div",{staticClass:"form-changeAlbum__notice-size"},[t._v("(файл должен быть размером не более 1024 КБ)")])]),t._v(" "),i("div",{staticClass:"form-changeAlbum__buttons"},[i("button",{staticClass:"site-button",attrs:{type:"submit"}},[t._v("Сохранить")]),t._v(" "),i("button",{staticClass:"site-button site-button_theme-just-text",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.$emit("click-close-change-my-album")}}},[t._v("Отменить")]),t._v(" "),i("button",{staticClass:"round-button round-button_delete",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.deleteAlbumHandler(e)}}},[t._v("Удалить")])])])])])])}),[],!1,null,"35f0b1bc",null).exports),_=s(216),h=s(5),m=s(31);var b={components:{appCard:o,appBigCard:l.a,appMyAlbum:n,appChangeAlbum:u,Flickity:m.a},data:()=>({openBigCardSlider:!1,openEditProfile:!1,openEditHeader:!1,openChangeMyAlbum:!1,urlPhotos:"https://xeniaweb.online/storage/photos",urlAvatars:"https://xeniaweb.online/storage/avatars",urlInlineSvgSprite:s(36).default,isActiveSocial:!1,currentSocialId:"",windowWidth:0,activeSocialLink:"",albumChangeMode:"",idCurrentPhoto:0,cards:[],currentAuthorObject:{albums:[]},myAlbums:[],socials:_,loadedCards:[],amountLoadedPhotos:0,startPhotoLoadingPos:0,loggedUserObject:{id:Number,cover:"",userSocials:[]},editedAlbum:{id:Number,description:"",preview:"",title:""},bigCardSliderTop:0,flickityOptions:{prevNextButtons:!1,pageDots:!1,wrapAround:!0,freeScroll:!1,groupCells:!0,contain:!0},changedUser:{name:"",description:""}}),computed:{...Object(h.c)("cards",{allCards:t=>t.cards}),...Object(h.c)("authors",{thisAuthor:t=>t.author}),socEdit(){return this.$refs["soc-edit"]},idCurrentUser(){return this.$route.params.id}},methods:{...Object(h.b)("cards",["updateAllCards"]),...Object(h.b)("authors",["refreshAuthor"]),...Object(h.b)("albums",["addAlbum","deleteAlbum","changeAlbum"]),...Object(h.b)("user",["logout"]),addNewAlbumHandler(){this.openChangeMyAlbum=!0,this.albumChangeMode="add"},clickEditAlbumHandler(t){this.openChangeMyAlbum=!0,this.albumChangeMode="edit",this.editedAlbum={...t}},async updateAlbums(){await this.refreshAuthor(this.idCurrentUser),this.currentAuthorObject=this.thisAuthor,this.myAlbums=this.thisAuthor.albums},async submitChangeMyAlbum(t,e){"add"===e?await this.addAlbum(t):"edit"===e&&await this.changeAlbum(t),this.updateAlbums(),this.openChangeMyAlbum=!1},async deleteAlbumHandler(t){await this.deleteAlbum(t),this.updateAlbums(),this.openChangeMyAlbum=!1},logoutUser(){this.$router.push("/login")},editUserHeaderHandler(){this.openEditHeader=!0,this.changedUser={...this.currentAuthorObject}},submitUserHeaderHandler(){
//!!!!!!!!!!!!! запрос на редактирование инфо про юзера в шапке
},socEditMouseLeaveHandler(){this.windowWidth>480&&(this.isActiveSocial=!1,this.currentAuthorObject.userSocials.map(t=>{t.isActive=!1}))},socialClickHandler(t){this.windowWidth<=480&&(this.currentSocialId=t,this.currentAuthorObject.userSocials.map(t=>{this.currentSocialId&&(t.id!==this.currentSocialId?t.isActive=!1:(t.isActive=!t.isActive,this.isActiveSocial=t.isActive,this.activeSocialLink=t.link))}))},socialMouseHandler(t,e){if(this.windowWidth>480)if("mouseenter"==e.type)this.currentSocialId=t,this.currentAuthorObject.userSocials.map(t=>{this.currentSocialId&&(t.id!==this.currentSocialId?t.isActive=!1:(t.isActive=!t.isActive,this.isActiveSocial=t.isActive,this.activeSocialLink=t.link))});else if("mouseleave"==e.type){let t=e.relatedTarget;for(;t&&t!=this.socEdit;)t=t.parentElement;t!==this.socEdit&&(this.currentAuthorObject.userSocials.map(t=>{t.isActive=!1}),this.isActiveSocial=!1)}},cardClickHandler(t){this.openBigCardSlider=!0,this.bigCardSliderTop=window.pageYOffset+40;let e=0;this.cards.find(s=>{s.id!==t?e++:this.idCurrentPhoto=e}),this.flickityOptions.initialIndex=this.idCurrentPhoto},checkWidth(){this.currentAuthorObject&&(this.windowWidth=window.innerWidth,this.windowWidth>480&&(this.isActiveSocial=!1,this.currentAuthorObject.userSocials&&this.currentAuthorObject.userSocials.map(t=>{t.isActive=!1})),0===this.amountLoadedPhotos&&(2!==this.amountLoadedPhotos&&this.windowWidth<=768?this.amountLoadedPhotos=2:4!==this.amountLoadedPhotos&&this.windowWidth<=1200?this.amountLoadedPhotos=4:6!==this.amountLoadedPhotos&&this.windowWidth>1200&&(this.amountLoadedPhotos=6)))},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},loadedCardsPush(t){this.checkWidth();let e=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;for(let e=0;e<this.amountLoadedPhotos;e++)this.cards[e+t]&&this.loadedCards.push(this.cards[e+t]),this.cards[e+1+t]||(this.amountLoadedPhotos=-1);-1!==this.amountLoadedPhotos&&(this.startPhotoLoadingPos=t+this.amountLoadedPhotos),this.$nextTick(()=>{window.scrollTo({top:e})})},socEditCancel(){},async updateCards(){await this.updateAllCards(),this.cards=this.allCards},next(){this.$refs.flickity.next()},previous(){this.$refs.flickity.previous()}},watch:{idCurrentUser(){this.updateCards(),this.updateAlbums(),this.openBigCardSlider=this.openEditProfile=this.openChangeMyAlbum=!1}},async created(){await this.updateCards(),await this.updateAlbums(),this.loadedCardsPush(this.startPhotoLoadingPos),window.addEventListener("resize",this.checkWidth)},mounted(){this.windowWidth=window.innerWidth,this.loggedUserObject.id=localStorage.getItem("userId"),this.editedAlbum.author=this.loggedUserObject.id}},v=(s(217),Object(r.a)(b,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[t.openBigCardSlider||t.openEditProfile||t.openChangeMyAlbum?s("div",{staticClass:"wrapper__overlay wrapper__overlay_black",on:{click:function(e){t.openBigCardSlider=t.openEditProfile=t.openChangeMyAlbum=!1}}}):t._e(),t._v(" "),t.openEditHeader?s("div",{staticClass:"wrapper__overlay wrapper__overlay_white",on:{click:function(e){t.openEditHeader=!1}}}):t._e(),t._v(" "),s("header",{staticClass:"header",style:{backgroundImage:"url("+t.urlPhotos+"/"+t.currentAuthorObject.cover+")"}},[t.openEditHeader?t._e():s("div",{staticClass:"header__container"},[t.currentAuthorObject.id==t.loggedUserObject.id?s("div",{staticClass:"header__button-logout"},[s("button",{staticClass:"round-button round-button_logout",attrs:{type:"button"},on:{click:t.logoutUser}},[t._v("Выйти")])]):t._e(),t._v(" "),t.currentAuthorObject.id==t.loggedUserObject.id?s("div",{staticClass:"header__button-edit"},[s("button",{staticClass:"round-button round-button_edit",attrs:{type:"button"},on:{click:t.editUserHeaderHandler}},[t._v("Редактировать")])]):t._e(),t._v(" "),t.currentAuthorObject.id!==t.loggedUserObject.id?s("div",{staticClass:"header__button-home"},[s("router-link",{staticClass:"round-button round-button_home",attrs:{to:"/"},on:{click:function(t){t.preventDefault()}}},[t._v("На главную")])],1):t._e(),t._v(" "),s("div",{staticClass:"header__avatar"},[s("img",{staticClass:"header__avatar-img",attrs:{src:t.urlAvatars+"/"+t.currentAuthorObject.avatar,alt:"avatar"}})]),t._v(" "),s("div",{staticClass:"header__info"},[s("h1",{staticClass:"header__title"},[t._v(t._s(t.currentAuthorObject.name))]),t._v(" "),s("div",{staticClass:"header__text"},[t._v("\t\t\n                        "+t._s(t.currentAuthorObject.description)+"\t\t\n                    ")]),t._v(" "),s("div",{staticClass:"header__socials"},[s("ul",{staticClass:"socials__list"},t._l(t.currentAuthorObject.userSocials,(function(e){return s("li",{key:e.id,staticClass:"socials__item"},[s("a",{staticClass:"socials__link",class:"socials__link_"+e.id,attrs:{target:"blank",href:e.link}},[t._v(t._s(e.text))])])})),0)])])]),t._v(" "),t.openEditProfile?s("div",{staticClass:"header__edit-profile"},[s("div",{staticClass:"edit-profile"},[s("div",{staticClass:"edit-profile__card"},[t._m(0),t._v(" "),s("div",{staticClass:"edit-profile__form"},[s("form",{staticClass:"form-edit-profile"},[t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),s("div",{staticClass:"form-edit-profile__load-image"},[s("div",{staticClass:"form-edit-profile__img-wrapper"},[s("img",{staticClass:"form-edit-profile__img",attrs:{src:t.urlAvatar,alt:"avatar image"}})]),t._v(" "),t._m(4)]),t._v(" "),s("div",{staticClass:"form-edit-profile__load-image"},[s("div",{staticClass:"form-edit-profile__img-wrapper"},[s("img",{staticClass:"form-edit-profile__img",attrs:{src:t.urlPhotos+"/"+t.currentAuthorObject.cover,alt:"background cover image"}})]),t._v(" "),t._m(5)]),t._v(" "),t._m(6),t._v(" "),s("div",{staticClass:"form-edit-profile__buttons"},[s("button",{staticClass:"site-button",attrs:{type:"submit"}},[t._v("Сохранить")]),t._v(" "),s("button",{staticClass:"site-button site-button_theme-just-text",attrs:{type:"button"},on:{click:function(e){t.openEditProfile=!1}}},[t._v("Отменить")])])])])])])]):t._e(),t._v(" "),t.openEditHeader?s("div",{staticClass:"header__edit-header"},[s("div",{staticClass:"edit-header"},[s("div",{staticClass:"edit-header__card"},[s("div",{staticClass:"edit-header__form"},[s("form",{staticClass:"form-edit-header",on:{submit:function(e){return e.preventDefault(),t.submitUserHeaderHandler(e)}}},[s("div",{staticClass:"form-edit-header__load-image"},[s("div",{staticClass:"form-edit-header__img-wrapper"},[s("img",{staticClass:"form-edit-header__img",attrs:{src:t.urlAvatars+"/"+t.currentAuthorObject.avatar,alt:"avatar image"}})])]),t._v(" "),s("label",{staticClass:"form-edit-header__label"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.changedUser.name,expression:"changedUser.name"}],staticClass:"form-edit-header__input",attrs:{type:"text",placeholder:"Введите имя"},domProps:{value:t.changedUser.name},on:{input:function(e){e.target.composing||t.$set(t.changedUser,"name",e.target.value)}}})]),t._v(" "),s("label",{staticClass:"form-edit-header__label"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.changedUser.description,expression:"changedUser.description"}],staticClass:"form-edit-header__input form-edit-header__input_textarea",attrs:{cols:"20",rows:"2",placeholder:"Краткая информация о пользователе"},domProps:{value:t.changedUser.description},on:{input:function(e){e.target.composing||t.$set(t.changedUser,"description",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-edit-header__socials"},[s("div",{staticClass:"socials"},[s("ul",{staticClass:"socials__list"},t._l(t.currentAuthorObject.userSocials,(function(e){return s("li",{key:e.id,staticClass:"socials__item"},[s("a",{class:["socials__link socials__link_"+e.id,{socials__link_active:e.isActive}],on:{mouseenter:function(s){return t.socialMouseHandler(e.id,s)},mouseleave:function(s){return t.socialMouseHandler(e.id,s)},click:function(s){return s.preventDefault(),t.socialClickHandler(e.id)}}},[t._v(t._s(e.text))])])})),0),t._v(" "),s("div",{ref:"soc-edit",staticClass:"soc-edit",class:{"soc-edit_showed":t.isActiveSocial},on:{mouseleave:t.socEditMouseLeaveHandler}},[s("div",{staticClass:"soc-edit__card"},[s("form",{staticClass:"soc-edit__form"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.activeSocialLink,expression:"activeSocialLink"}],staticClass:"soc-edit__input",attrs:{type:"text"},domProps:{value:t.activeSocialLink},on:{input:function(e){e.target.composing||(t.activeSocialLink=e.target.value)}}}),t._v(" "),s("div",{staticClass:"soc-edit__buttons"},[s("button",{staticClass:"site-button site-button_theme_light",attrs:{type:"submit"}},[t._v("Сохранить")]),t._v(" "),s("button",{staticClass:"site-button site-button_theme-just-text",attrs:{type:"button"},on:{click:t.socEditCancel}},[t._v("Отменить")])])])])])])]),t._v(" "),t._m(7),t._v(" "),s("div",{staticClass:"form-edit-header__buttons"},[s("button",{staticClass:"site-button",attrs:{type:"submit"}},[t._v("Сохранить")]),t._v(" "),s("button",{staticClass:"site-button site-button_theme-just-text",attrs:{type:"button"},on:{click:function(e){t.openEditHeader=!1}}},[t._v("Отменить")])])])])])])]):t._e()]),t._v(" "),s("main",{staticClass:"maincontent"},[t.openEditHeader?t._e():s("div",{staticClass:"my-search"},[s("div",{staticClass:"my-search__container"},[s("form",{staticClass:"form-search"},[s("input",{staticClass:"form-search__input",attrs:{type:"search",placeholder:"Исследовать мир"}}),t._v(" "),s("button",{staticClass:"form-search__submit",attrs:{type:"submit"}},[s("svg",{staticClass:"form-search__icon"},[s("use",{attrs:{"xlink:href":t.urlInlineSvgSprite+"#search"}})])])])])]),t._v(" "),t.currentAuthorObject.id==t.loggedUserObject.id?s("section",{staticClass:"new"},[s("div",{staticClass:"new__container"},[s("h2",{staticClass:"new__title"},[t._v("Новое в мире")]),t._v(" "),t.loadedCards.length?t._e():s("p",{staticClass:"new__empty-text"},[t._v("Увы, пока ничего не загружено. Загрузите что-нибудь и станьте первым.")]),t._v(" "),s("ul",{staticClass:"new__card-list"},t._l(t.loadedCards,(function(e){return s("li",{key:e.id,staticClass:"new__card-item"},[s("appCard",{attrs:{cardObject:e},on:{"click-card":t.cardClickHandler}})],1)})),0),t._v(" "),s("div",{staticClass:"new__button-show-more"},[t.loadedCards.length?s("button",{staticClass:"site-button site-button_theme-light",class:{disabled:-1===t.amountLoadedPhotos},attrs:{type:"button"},on:{click:function(e){return t.loadedCardsPush(t.startPhotoLoadingPos)}}},[t._v("Показать ещё")]):t._e()])]),t._v(" "),t.openBigCardSlider?s("div",{staticClass:"new__big-card-slider",style:{top:t.bigCardSliderTop+"px"}},[s("div",{staticClass:"big-card-slider"},[s("flickity",{ref:"flickity",staticClass:"big-card-slider__container",attrs:{options:t.flickityOptions}},t._l(t.loadedCards,(function(e){return s("appBigCard",{key:e.id,attrs:{cardObject:e,userId:e.authorId,currentUserObject:t.currentAuthorObject}})})),1),t._v(" "),s("div",{staticClass:"big-card-slider__close"},[s("button",{staticClass:"round-button round-button_close-transparent",attrs:{type:"button"},on:{click:function(e){t.openBigCardSlider=!1}}})]),t._v(" "),s("button",{staticClass:"big-card-slider__control big-card-slider__control_prev",attrs:{type:"button"},on:{click:function(e){return t.previous()}}}),t._v(" "),s("button",{staticClass:"big-card-slider__control big-card-slider__control_next",attrs:{type:"button"},on:{click:function(e){return t.next()}}})],1)]):t._e()]):t._e(),t._v(" "),s("section",{staticClass:"my-albums"},[s("div",{staticClass:"my-albums__container"},[s("div",{staticClass:"my-albums__topgroup"},[t.currentAuthorObject.id==t.loggedUserObject.id?s("h2",{staticClass:"my-albums__title"},[t._v("Мои альбомы")]):s("h2",{staticClass:"my-albums__title"},[t._v("Альбомы")]),t._v(" "),t.currentAuthorObject.id==t.loggedUserObject.id?s("div",{staticClass:"my-albums__button-plus"},[s("button",{staticClass:"round-button round-button_plus",on:{click:t.addNewAlbumHandler}})]):t._e()]),t._v(" "),t.myAlbums.length?t._e():s("p",{staticClass:"my-albums__empty-text"},[t._v('Альбомы еще не созданы. Создайте альбом с помощью кнопки "Добавить".')]),t._v(" "),s("ul",{staticClass:"my-albums__albums-list"},t._l(t.myAlbums,(function(e){return s("li",{key:e.id,staticClass:"my-albums__albums-item"},[s("appMyAlbum",{attrs:{myAlbumObject:e,isLoggedUser:t.currentAuthorObject.id==t.loggedUserObject.id},on:{"click-edit-my-album":t.clickEditAlbumHandler}})],1)})),0)]),t._v(" "),t.openChangeMyAlbum?s("div",{staticClass:"my-albums__change-album"},[s("appChangeAlbum",{attrs:{editedAlbumObject:t.editedAlbum,authorId:t.currentAuthorObject.id,mode:t.albumChangeMode},on:{"click-close-change-my-album":function(e){t.openChangeMyAlbum=!1},"submit-change-my-album":t.submitChangeMyAlbum,"delete-album":t.deleteAlbumHandler}})],1):t._e()])]),t._v(" "),s("footer",{staticClass:"footer",style:{backgroundImage:"url("+t.urlPhotos+"/"+t.currentAuthorObject.cover+")"}},[s("div",{staticClass:"footer__container"},[s("div",{staticClass:"footer__button-up"},[s("button",{staticClass:"round-button round-button_up",on:{click:t.scrollToTop}})]),t._v(" "),s("div",{staticClass:"footer__desc"},[t._v("\n                    Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!\n                ")]),t._v(" "),t._m(8)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit-profile__topgroup"},[e("h4",{staticClass:"edit-profile__title"},[this._v("Редактировать профиль")]),this._v(" "),e("button",{staticClass:"edit-profile__button edit-profile__button_close",attrs:{type:"button"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"form-edit-profile__label"},[this._v("Имя\n                                    "),e("input",{staticClass:"form-edit-profile__input",attrs:{type:"text",placeholder:"Антон"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"form-edit-profile__label form-edit-profile__label_no_top_padding"},[this._v("Фамилия\n                                    "),e("input",{staticClass:"form-edit-profile__input",attrs:{type:"text",placeholder:"Черепов"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"form-edit-profile__label"},[this._v("О себе\n                                    "),e("textarea",{staticClass:"form-edit-profile__input form-edit-profile__input_textarea",attrs:{cols:"20",rows:"5",placeholder:"Описание альбома"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"form-edit-profile__button"},[e("button",{staticClass:"site-button site-button_theme-light",attrs:{type:"button"}},[this._v("Загрузить фотографию")]),this._v(" "),e("div",{staticClass:"form-edit-profile__notice-size"},[this._v("(файл должен быть размером не более 512 КБ)")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"form-edit-profile__button"},[e("button",{staticClass:"site-button site-button_theme-light",attrs:{type:"button"}},[this._v("Загрузить фон")]),this._v(" "),e("div",{staticClass:"form-edit-profile__notice-size"},[this._v("(файл должен быть размером не более 1024 КБ)")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"form-edit-profile__socials"},[e("label",{staticClass:"form-edit-profile__label"},[this._v("Вконтакте\n                                        "),e("input",{staticClass:"form-edit-profile__input",attrs:{type:"text"}})]),this._v(" "),e("label",{staticClass:"form-edit-profile__label"},[this._v("Facebook\n                                        "),e("input",{staticClass:"form-edit-profile__input",attrs:{type:"text"}})]),this._v(" "),e("label",{staticClass:"form-edit-profile__label"},[this._v("Email\n                                        "),e("input",{staticClass:"form-edit-profile__input",attrs:{type:"text"}})]),this._v(" "),e("label",{staticClass:"form-edit-profile__label"},[this._v("Twitter\n                                        "),e("input",{staticClass:"form-edit-profile__input",attrs:{type:"text"}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"form-edit-header__load-cover"},[e("label",{staticClass:"form-edit-header__label form-edit-header__label_file-load",attrs:{for:"load-bgcover-header"}},[e("input",{staticClass:"form-edit-header__input-load",attrs:{type:"file",id:"load-bgcover-header"}}),this._v(" "),e("div",{staticClass:"form-edit-header__cover-img"}),this._v(" "),e("div",{staticClass:"form-edit-header__cover-img-text"},[this._v("Изменить фон")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"footer__copyright"},[this._v("\n                    2020 | Создано командой профессионалов: "),e("a",{attrs:{target:"_blank",href:"https://vk.com/id594716031"}},[this._v("Lidia")]),this._v(" & "),e("a",{attrs:{target:"_blank",href:"https://xeniaweb.ch/"}},[this._v("XeniaWeb")])])}],!1,null,"5a49d0ca",null));e.default=v.exports}}]);