(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e23df54a"],{"0098":function(t,e,n){},"42b2":function(t,e,n){},"4bdf":function(t,e,n){"use strict";n("42b2")},"6dfd":function(t,e,n){"use strict";n("0098")},"90c27":function(t,e,n){"use strict";n("e7e8")},d7dc:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"components-container"},[n("div",[n("tinymce",{attrs:{height:300},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),n("el-row",{staticClass:"panel"},[n("el-col",{attrs:{span:16}},[n("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"#","http-request":t.update,accept:".doc,.docx,.txt",limit:1,"on-preview":t.handlePreview,"on-remove":t.handleRemove,"file-list":t.fileList,"auto-upload":!1}},[n("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[t._v("上传已有文章")])],1)],1)],1),n("el-row",{staticClass:"panel"},[n("el-col",{attrs:{span:16}},[n("el-row",[n("el-col",{attrs:{span:16}},[n("el-row",[n("el-col",{staticStyle:{"padding-left":"10px"},attrs:{span:3}},[t._v("标题")]),n("el-col",{attrs:{span:21}},[n("el-input",{attrs:{placeholder:"请输入标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)],1)],1),n("el-col",{staticStyle:{"padding-left":"10px"},attrs:{span:8}},[n("el-select",{staticClass:"filter-item",staticStyle:{width:"130px","margin-right":"1%"},attrs:{placeholder:"类型",clearable:""},model:{value:t.typeId,callback:function(e){t.typeId=e},expression:"typeId"}},t._l(t.typeOptions,(function(t){return n("el-option",{key:t.key,attrs:{label:t.display_name,value:t.key}})})),1)],1)],1)],1),n("el-col",{staticStyle:{"text-align":"right"},attrs:{span:8}},[n("el-button",{attrs:{type:"info"},on:{click:t.save}},[t._v("存草稿")]),n("el-button",{attrs:{type:"primary"},on:{click:t.release}},[t._v("发布")])],1)],1),n("div",{staticClass:"editor-content",domProps:{innerHTML:t._s(t.content)}})],1)},a=[],s=n("1da1"),o=(n("99af"),n("b0c0"),n("96cf"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tinymce-container",class:{fullscreen:t.fullscreen},style:{width:t.containerWidth}},[n("textarea",{staticClass:"tinymce-textarea",attrs:{id:t.tinymceId}}),t._v(" "),n("div",{staticClass:"editor-custom-btn-container"})])}),r=[],c=(n("b680"),n("a9e3"),n("ac1f"),n("00b4"),n("d3b7"),n("159b"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"upload-container"},[n("el-button",{style:{background:t.color,borderColor:t.color},attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(e){t.dialogVisible=!0}}},[t._v(" upload ")]),n("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-upload",{staticClass:"editor-slide-upload",attrs:{multiple:!0,"file-list":t.fileList,"show-file-list":!0,"on-remove":t.handleRemove,"on-success":t.handleSuccess,"before-upload":t.beforeUpload,action:"https://httpbin.org/post","list-type":"picture-card"}},[n("el-button",{attrs:{size:"small",type:"primary"}},[t._v(" Click upload ")])],1),n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v(" Cancel ")]),n("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v(" Confirm ")])],1)],1)}),l=[],u=(n("b64b"),n("d81d"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861"),{name:"EditorSlideUpload",props:{color:{type:String,default:"#1890ff"}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[]}},methods:{checkAllSuccess:function(){var t=this;return Object.keys(this.listObj).every((function(e){return t.listObj[e].hasSuccess}))},handleSubmit:function(){var t=this,e=Object.keys(this.listObj).map((function(e){return t.listObj[e]}));this.checkAllSuccess()?(this.$emit("successCBK",e),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("请等待全部上传完成。若有网络问题，请刷新并重新上传！")},handleSuccess:function(t,e){for(var n=e.uid,i=Object.keys(this.listObj),a=0,s=i.length;a<s;a++){if(this.listObj[i[a]].uid===n)return this.listObj[i[a]].url=t.files.file,void(this.listObj[i[a]].hasSuccess=!0);console.log(t)}},handleRemove:function(t){for(var e=t.uid,n=Object.keys(this.listObj),i=0,a=n.length;i<a;i++)if(this.listObj[n[i]].uid===e)return void delete this.listObj[n[i]]},beforeUpload:function(t){var e=this,n=window.URL||window.webkitURL,i=t.uid;return this.listObj[i]={},new Promise((function(a,s){var o=new Image;o.src=n.createObjectURL(t),o.onload=function(){e.listObj[i]={hasSuccess:!1,uid:t.uid,width:this.width,height:this.height}},a(!0)}))}}}),d=u,p=(n("90c27"),n("2877")),h=Object(p["a"])(d,c,l,!1,null,"683bf746",null),f=h.exports,m=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],y=m,b=["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],g=b,v=n("b85c"),w=[];function k(){return window.tinymce}var _=function(t,e){var n=document.getElementById(t),i=e||function(){};if(!n){var a=document.createElement("script");a.src=t,a.id=t,document.body.appendChild(a),w.push(i);var s="onload"in a?o:r;s(a)}function o(e){e.onload=function(){this.onerror=this.onload=null;var t,n=Object(v["a"])(w);try{for(n.s();!(t=n.n()).done;){var i=t.value;i(null,e)}}catch(a){n.e(a)}finally{n.f()}w=null},e.onerror=function(){this.onerror=this.onload=null,i(new Error("Failed to load "+t),e)}}function r(t){t.onreadystatechange=function(){if("complete"===this.readyState||"loaded"===this.readyState){this.onreadystatechange=null;var e,n=Object(v["a"])(w);try{for(n.s();!(e=n.n()).done;){var i=e.value;i(null,t)}}catch(a){n.e(a)}finally{n.f()}w=null}}}n&&i&&(k()?i(null,n):w.push(i))},j=_,O="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js",C={name:"Tinymce",components:{editorImage:f},props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:[Number,String],required:!1,default:360},width:{type:[Number,String],required:!1,default:"auto"}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN",es:"es_MX",ja:"ja"}}},computed:{containerWidth:function(){var t=this.width;return/^[\d]+(\.[\d]+)?$/.test(t)?"".concat(t,"px"):t}},watch:{value:function(t){var e=this;!this.hasChange&&this.hasInit&&this.$nextTick((function(){return window.tinymce.get(e.tinymceId).setContent(t||"")}))}},mounted:function(){this.init()},activated:function(){window.tinymce&&this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{init:function(){var t=this;j(O,(function(e){e?t.$message.error(e.message):t.initTinymce()}))},initTinymce:function(){var t=this,e=this;window.tinymce.init({selector:"#".concat(this.tinymceId),language:this.languageTypeList["zh"],height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:g,menubar:this.menubar,plugins:y,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(n){e.value&&n.setContent(e.value),e.hasInit=!0,n.on("NodeChange Change KeyUp SetContent",(function(){t.hasChange=!0,t.$emit("input",n.getContent())}))},setup:function(t){t.on("FullscreenStateChanged",(function(t){e.fullscreen=t.state}))},convert_urls:!1})},destroyTinymce:function(){var t=window.tinymce.get(this.tinymceId);this.fullscreen&&t.execCommand("mceFullScreen"),t&&t.destroy()},setContent:function(t){window.tinymce.get(this.tinymceId).setContent(t)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(t){var e=this;t.forEach((function(t){return window.tinymce.get(e.tinymceId).insertContent('<img class="wscnph" src="'.concat(t.url,'" >'))}))}}},x=C,I=(n("6dfd"),Object(p["a"])(x,o,r,!1,null,"0bae04e2",null)),S=I.exports,$=n("e9bd"),T=n("5f87"),R=[{key:1,display_name:"体育"},{key:2,display_name:"娱乐"},{key:3,display_name:"家居"},{key:4,display_name:"房产"},{key:5,display_name:"教育"},{key:6,display_name:"时尚"},{key:7,display_name:"时政"},{key:8,display_name:"游戏"},{key:9,display_name:"科技"},{key:10,display_name:"财经"}],L={name:"TinymceDemo",components:{Tinymce:S},data:function(){return{headers:{token:Object(T["c"])()},id:this.$route.query.id,typeId:void 0,title:void 0,fileList:[],content:"<p>在这里编辑内容</p>",typeOptions:R}},created:function(){this.id&&this.getContent(this.id)},methods:{update:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=new FormData,i.append("file",t.file),i.append("typeId",e.typeId),i.append("title",e.title),i.append("status",3),n.next=7,Object($["f"])(i);case 7:e.$message.success("上传成功!");case 8:case"end":return n.stop()}}),n)})))()},getContent:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var i,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object($["c"])({id:t});case 2:i=n.sent,a=i.data,s=["体育","娱乐","家居","房产","教育","时尚","时政","游戏","科技","财经"],e.content=a.content,e.typeId=a.typeId,e.typeName=s[a.typeId],e.title=a.title;case 9:case"end":return n.stop()}}),n)})))()},save:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.$refs.upload.uploadFiles.length>0)){e.next=3;break}return t.$refs.upload.submit(),e.abrupt("return");case 3:return n={},t.$omitBy(Object.assign(n,{title:t.title,id:t.id,content:t.content,typeId:t.typeId,status:2})),e.next=7,Object($["e"])({content:t.content,typeId:t.typeId,title:t.title,status:2});case 7:i=e.sent,a=i.message,t.$notify({title:"Success",message:a,type:"success",duration:2e3});case 10:case"end":return e.stop()}}),e)})))()},release:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.$refs.upload.uploadFiles.length>0)){e.next=3;break}return t.$refs.upload.submit(),e.abrupt("return");case 3:return n={},t.$omitBy(Object.assign(n,{title:t.title,id:t.id,content:t.content,typeId:t.typeId,status:3})),e.next=7,Object($["e"])({content:t.content,typeId:t.typeId,title:t.title,status:3});case 7:i=e.sent,a=i.message,t.$notify({title:"Success",message:a,type:"success",duration:2e3});case 10:case"end":return e.stop()}}),e)})))()},handleRemove:function(t,e){console.log(t,e)},handlePreview:function(t){console.log(t)},handleExceed:function(t,e){this.$message.warning("当前限制选择 1 个文件，本次选择了 ".concat(t.length," 个文件，共选择了 ").concat(t.length+e.length," 个文件"))},beforeRemove:function(t,e){return this.$confirm("确定移除 ".concat(t.name,"？"))}}},F=L,E=(n("4bdf"),Object(p["a"])(F,i,a,!1,null,"80b8764c",null));e["default"]=E.exports},e7e8:function(t,e,n){},e9bd:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"d",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r})),n.d(e,"e",(function(){return c})),n.d(e,"f",(function(){return l}));var i=n("b775"),a=function(t){return i["a"].get("/index/editor",t)},s=function(t,e){return i["a"].get("/editor/articleData/".concat(t),{params:e})},o=function(t){return i["a"].get("/editor/articleContent",{params:t})};function r(t){return Object(i["a"])({url:"/editor/articleDelete",method:"delete",params:{id:t.id}})}function c(t){return Object(i["a"])({url:"/editor/uploadArticle",method:"post",params:{title:t.title,content:t.content,typeId:t.typeId,status:t.status,id:t.id},headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}})}function l(t){return Object(i["a"])({url:"/editor/uploadArticleFile",method:"post",data:t,headers:{"Content-Type":"multipart/form-data;charset=UTF-8"}})}}}]);