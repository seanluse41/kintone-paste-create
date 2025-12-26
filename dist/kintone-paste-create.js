(function(){"use strict";const w=a=>typeof a=="string",xt=()=>{let a,t;const e=new Promise((i,o)=>{a=i,t=o});return e.resolve=a,e.reject=t,e},_o=a=>a==null?"":""+a,Ta=(a,t,e)=>{a.forEach(i=>{t[i]&&(e[i]=t[i])})},$a=/###/g,po=a=>a&&a.indexOf("###")>-1?a.replace($a,"."):a,go=a=>!a||w(a),yt=(a,t,e)=>{const i=w(t)?t.split("."):t;let o=0;for(;o<i.length-1;){if(go(a))return{};const n=po(i[o]);!a[n]&&e&&(a[n]=new e),Object.prototype.hasOwnProperty.call(a,n)?a=a[n]:a={},++o}return go(a)?{}:{obj:a,k:po(i[o])}},fo=(a,t,e)=>{const{obj:i,k:o}=yt(a,t,Object);if(i!==void 0||t.length===1){i[o]=e;return}let n=t[t.length-1],s=t.slice(0,t.length-1),r=yt(a,s,Object);for(;r.obj===void 0&&s.length;)n=`${s[s.length-1]}.${n}`,s=s.slice(0,s.length-1),r=yt(a,s,Object),r?.obj&&typeof r.obj[`${r.k}.${n}`]<"u"&&(r.obj=void 0);r.obj[`${r.k}.${n}`]=e},La=(a,t,e,i)=>{const{obj:o,k:n}=yt(a,t,Object);o[n]=o[n]||[],o[n].push(e)},Ut=(a,t)=>{const{obj:e,k:i}=yt(a,t);if(e&&Object.prototype.hasOwnProperty.call(e,i))return e[i]},Aa=(a,t,e)=>{const i=Ut(a,e);return i!==void 0?i:Ut(t,e)},bo=(a,t,e)=>{for(const i in t)i!=="__proto__"&&i!=="constructor"&&(i in a?w(a[i])||a[i]instanceof String||w(t[i])||t[i]instanceof String?e&&(a[i]=t[i]):bo(a[i],t[i],e):a[i]=t[i]);return a},_t=a=>a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var Da={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};const Va=a=>w(a)?a.replace(/[&<>"'\/]/g,t=>Da[t]):a;class Ma{constructor(t){this.capacity=t,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(t){const e=this.regExpMap.get(t);if(e!==void 0)return e;const i=new RegExp(t);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(t,i),this.regExpQueue.push(t),i}}const Ba=[" ",",","?","!",";"],Oa=new Ma(20),Ha=(a,t,e)=>{t=t||"",e=e||"";const i=Ba.filter(s=>t.indexOf(s)<0&&e.indexOf(s)<0);if(i.length===0)return!0;const o=Oa.getRegExp(`(${i.map(s=>s==="?"?"\\?":s).join("|")})`);let n=!o.test(a);if(!n){const s=a.indexOf(e);s>0&&!o.test(a.substring(0,s))&&(n=!0)}return n},hi=(a,t,e=".")=>{if(!a)return;if(a[t])return Object.prototype.hasOwnProperty.call(a,t)?a[t]:void 0;const i=t.split(e);let o=a;for(let n=0;n<i.length;){if(!o||typeof o!="object")return;let s,r="";for(let u=n;u<i.length;++u)if(u!==n&&(r+=e),r+=i[u],s=o[r],s!==void 0){if(["string","number","boolean"].indexOf(typeof s)>-1&&u<i.length-1)continue;n+=u-n+1;break}o=s}return o},wt=a=>a?.replace("_","-"),Ra={type:"logger",log(a){this.output("log",a)},warn(a){this.output("warn",a)},error(a){this.output("error",a)},output(a,t){console?.[a]?.apply?.(console,t)}};class Pt{constructor(t,e={}){this.init(t,e)}init(t,e={}){this.prefix=e.prefix||"i18next:",this.logger=t||Ra,this.options=e,this.debug=e.debug}log(...t){return this.forward(t,"log","",!0)}warn(...t){return this.forward(t,"warn","",!0)}error(...t){return this.forward(t,"error","")}deprecate(...t){return this.forward(t,"warn","WARNING DEPRECATED: ",!0)}forward(t,e,i,o){return o&&!this.debug?null:(w(t[0])&&(t[0]=`${i}${this.prefix} ${t[0]}`),this.logger[e](t))}create(t){return new Pt(this.logger,{prefix:`${this.prefix}:${t}:`,...this.options})}clone(t){return t=t||this.options,t.prefix=t.prefix||this.prefix,new Pt(this.logger,t)}}var we=new Pt;class zt{constructor(){this.observers={}}on(t,e){return t.split(" ").forEach(i=>{this.observers[i]||(this.observers[i]=new Map);const o=this.observers[i].get(e)||0;this.observers[i].set(e,o+1)}),this}off(t,e){if(this.observers[t]){if(!e){delete this.observers[t];return}this.observers[t].delete(e)}}emit(t,...e){this.observers[t]&&Array.from(this.observers[t].entries()).forEach(([o,n])=>{for(let s=0;s<n;s++)o(...e)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([o,n])=>{for(let s=0;s<n;s++)o.apply(o,[t,...e])})}}class mo extends zt{constructor(t,e={ns:["translation"],defaultNS:"translation"}){super(),this.data=t||{},this.options=e,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(t){this.options.ns.indexOf(t)<0&&this.options.ns.push(t)}removeNamespaces(t){const e=this.options.ns.indexOf(t);e>-1&&this.options.ns.splice(e,1)}getResource(t,e,i,o={}){const n=o.keySeparator!==void 0?o.keySeparator:this.options.keySeparator,s=o.ignoreJSONStructure!==void 0?o.ignoreJSONStructure:this.options.ignoreJSONStructure;let r;t.indexOf(".")>-1?r=t.split("."):(r=[t,e],i&&(Array.isArray(i)?r.push(...i):w(i)&&n?r.push(...i.split(n)):r.push(i)));const u=Ut(this.data,r);return!u&&!e&&!i&&t.indexOf(".")>-1&&(t=r[0],e=r[1],i=r.slice(2).join(".")),u||!s||!w(i)?u:hi(this.data?.[t]?.[e],i,n)}addResource(t,e,i,o,n={silent:!1}){const s=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator;let r=[t,e];i&&(r=r.concat(s?i.split(s):i)),t.indexOf(".")>-1&&(r=t.split("."),o=e,e=r[1]),this.addNamespaces(e),fo(this.data,r,o),n.silent||this.emit("added",t,e,i,o)}addResources(t,e,i,o={silent:!1}){for(const n in i)(w(i[n])||Array.isArray(i[n]))&&this.addResource(t,e,n,i[n],{silent:!0});o.silent||this.emit("added",t,e,i)}addResourceBundle(t,e,i,o,n,s={silent:!1,skipCopy:!1}){let r=[t,e];t.indexOf(".")>-1&&(r=t.split("."),o=i,i=e,e=r[1]),this.addNamespaces(e);let u=Ut(this.data,r)||{};s.skipCopy||(i=JSON.parse(JSON.stringify(i))),o?bo(u,i,n):u={...u,...i},fo(this.data,r,u),s.silent||this.emit("added",t,e,i)}removeResourceBundle(t,e){this.hasResourceBundle(t,e)&&delete this.data[t][e],this.removeNamespaces(e),this.emit("removed",t,e)}hasResourceBundle(t,e){return this.getResource(t,e)!==void 0}getResourceBundle(t,e){return e||(e=this.options.defaultNS),this.getResource(t,e)}getDataByLanguage(t){return this.data[t]}hasLanguageSomeTranslations(t){const e=this.getDataByLanguage(t);return!!(e&&Object.keys(e)||[]).find(o=>e[o]&&Object.keys(e[o]).length>0)}toJSON(){return this.data}}var vo={processors:{},addPostProcessor(a){this.processors[a.name]=a},handle(a,t,e,i,o){return a.forEach(n=>{t=this.processors[n]?.process(t,e,i,o)??t}),t}};const ko=Symbol("i18next/PATH_KEY");function Na(){const a=[],t=Object.create(null);let e;return t.get=(i,o)=>(e?.revoke?.(),o===ko?a:(a.push(o),e=Proxy.revocable(i,t),e.proxy)),Proxy.revocable(Object.create(null),t).proxy}function _i(a,t){const{[ko]:e}=a(Na());return e.join(t?.keySeparator??".")}const xo={},pi=a=>!w(a)&&typeof a!="boolean"&&typeof a!="number";class jt extends zt{constructor(t,e={}){super(),Ta(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],t,this),this.options=e,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=we.create("translator")}changeLanguage(t){t&&(this.language=t)}exists(t,e={interpolation:{}}){const i={...e};if(t==null)return!1;const o=this.resolve(t,i);if(o?.res===void 0)return!1;const n=pi(o.res);return!(i.returnObjects===!1&&n)}extractFromKey(t,e){let i=e.nsSeparator!==void 0?e.nsSeparator:this.options.nsSeparator;i===void 0&&(i=":");const o=e.keySeparator!==void 0?e.keySeparator:this.options.keySeparator;let n=e.ns||this.options.defaultNS||[];const s=i&&t.indexOf(i)>-1,r=!this.options.userDefinedKeySeparator&&!e.keySeparator&&!this.options.userDefinedNsSeparator&&!e.nsSeparator&&!Ha(t,i,o);if(s&&!r){const u=t.match(this.interpolator.nestingRegexp);if(u&&u.length>0)return{key:t,namespaces:w(n)?[n]:n};const c=t.split(i);(i!==o||i===o&&this.options.ns.indexOf(c[0])>-1)&&(n=c.shift()),t=c.join(o)}return{key:t,namespaces:w(n)?[n]:n}}translate(t,e,i){let o=typeof e=="object"?{...e}:e;if(typeof o!="object"&&this.options.overloadTranslationOptionHandler&&(o=this.options.overloadTranslationOptionHandler(arguments)),typeof o=="object"&&(o={...o}),o||(o={}),t==null)return"";typeof t=="function"&&(t=_i(t,{...this.options,...o})),Array.isArray(t)||(t=[String(t)]);const n=o.returnDetails!==void 0?o.returnDetails:this.options.returnDetails,s=o.keySeparator!==void 0?o.keySeparator:this.options.keySeparator,{key:r,namespaces:u}=this.extractFromKey(t[t.length-1],o),c=u[u.length-1];let d=o.nsSeparator!==void 0?o.nsSeparator:this.options.nsSeparator;d===void 0&&(d=":");const h=o.lng||this.language,p=o.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(h?.toLowerCase()==="cimode")return p?n?{res:`${c}${d}${r}`,usedKey:r,exactUsedKey:r,usedLng:h,usedNS:c,usedParams:this.getUsedParamsDetails(o)}:`${c}${d}${r}`:n?{res:r,usedKey:r,exactUsedKey:r,usedLng:h,usedNS:c,usedParams:this.getUsedParamsDetails(o)}:r;const b=this.resolve(t,o);let m=b?.res;const E=b?.usedKey||r,A=b?.exactUsedKey||r,P=["[object Number]","[object Function]","[object RegExp]"],N=o.joinArrays!==void 0?o.joinArrays:this.options.joinArrays,Pe=!this.i18nFormat||this.i18nFormat.handleAsObject,se=o.count!==void 0&&!w(o.count),Ze=jt.hasDefaultValue(o),vt=se?this.pluralResolver.getSuffix(h,o.count,o):"",kt=o.ordinal&&se?this.pluralResolver.getSuffix(h,o.count,{ordinal:!1}):"",Ca=se&&!o.ordinal&&o.count===0,Je=Ca&&o[`defaultValue${this.options.pluralSeparator}zero`]||o[`defaultValue${vt}`]||o[`defaultValue${kt}`]||o.defaultValue;let Ae=m;Pe&&!m&&Ze&&(Ae=Je);const Er=pi(Ae),Sr=Object.prototype.toString.apply(Ae);if(Pe&&Ae&&Er&&P.indexOf(Sr)<0&&!(w(N)&&Array.isArray(Ae))){if(!o.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const De=this.options.returnedObjectHandler?this.options.returnedObjectHandler(E,Ae,{...o,ns:u}):`key '${r} (${this.language})' returned an object instead of string.`;return n?(b.res=De,b.usedParams=this.getUsedParamsDetails(o),b):De}if(s){const De=Array.isArray(Ae),ye=De?[]:{},Ea=De?A:E;for(const Ve in Ae)if(Object.prototype.hasOwnProperty.call(Ae,Ve)){const ze=`${Ea}${s}${Ve}`;Ze&&!m?ye[Ve]=this.translate(ze,{...o,defaultValue:pi(Je)?Je[Ve]:void 0,joinArrays:!1,ns:u}):ye[Ve]=this.translate(ze,{...o,joinArrays:!1,ns:u}),ye[Ve]===ze&&(ye[Ve]=Ae[Ve])}m=ye}}else if(Pe&&w(N)&&Array.isArray(m))m=m.join(N),m&&(m=this.extendTranslation(m,t,o,i));else{let De=!1,ye=!1;!this.isValidLookup(m)&&Ze&&(De=!0,m=Je),this.isValidLookup(m)||(ye=!0,m=r);const Ve=(o.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&ye?void 0:m,ze=Ze&&Je!==m&&this.options.updateMissing;if(ye||De||ze){if(this.logger.log(ze?"updateKey":"missingKey",h,c,r,ze?Je:m),s){const re=this.resolve(r,{...o,keySeparator:!1});re&&re.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let Rt=[];const di=this.languageUtils.getFallbackCodes(this.options.fallbackLng,o.lng||this.language);if(this.options.saveMissingTo==="fallback"&&di&&di[0])for(let re=0;re<di.length;re++)Rt.push(di[re]);else this.options.saveMissingTo==="all"?Rt=this.languageUtils.toResolveHierarchy(o.lng||this.language):Rt.push(o.lng||this.language);const Sa=(re,ht,Nt)=>{const Ia=Ze&&Nt!==m?Nt:Ve;this.options.missingKeyHandler?this.options.missingKeyHandler(re,c,ht,Ia,ze,o):this.backendConnector?.saveMissing&&this.backendConnector.saveMissing(re,c,ht,Ia,ze,o),this.emit("missingKey",re,c,ht,m)};this.options.saveMissing&&(this.options.saveMissingPlurals&&se?Rt.forEach(re=>{const ht=this.pluralResolver.getSuffixes(re,o);Ca&&o[`defaultValue${this.options.pluralSeparator}zero`]&&ht.indexOf(`${this.options.pluralSeparator}zero`)<0&&ht.push(`${this.options.pluralSeparator}zero`),ht.forEach(Nt=>{Sa([re],r+Nt,o[`defaultValue${Nt}`]||Je)})}):Sa(Rt,r,Je))}m=this.extendTranslation(m,t,o,b,i),ye&&m===r&&this.options.appendNamespaceToMissingKey&&(m=`${c}${d}${r}`),(ye||De)&&this.options.parseMissingKeyHandler&&(m=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${c}${d}${r}`:r,De?m:void 0,o))}return n?(b.res=m,b.usedParams=this.getUsedParamsDetails(o),b):m}extendTranslation(t,e,i,o,n){if(this.i18nFormat?.parse)t=this.i18nFormat.parse(t,{...this.options.interpolation.defaultVariables,...i},i.lng||this.language||o.usedLng,o.usedNS,o.usedKey,{resolved:o});else if(!i.skipInterpolation){i.interpolation&&this.interpolator.init({...i,interpolation:{...this.options.interpolation,...i.interpolation}});const u=w(t)&&(i?.interpolation?.skipOnVariables!==void 0?i.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let c;if(u){const h=t.match(this.interpolator.nestingRegexp);c=h&&h.length}let d=i.replace&&!w(i.replace)?i.replace:i;if(this.options.interpolation.defaultVariables&&(d={...this.options.interpolation.defaultVariables,...d}),t=this.interpolator.interpolate(t,d,i.lng||this.language||o.usedLng,i),u){const h=t.match(this.interpolator.nestingRegexp),p=h&&h.length;c<p&&(i.nest=!1)}!i.lng&&o&&o.res&&(i.lng=this.language||o.usedLng),i.nest!==!1&&(t=this.interpolator.nest(t,(...h)=>n?.[0]===h[0]&&!i.context?(this.logger.warn(`It seems you are nesting recursively key: ${h[0]} in key: ${e[0]}`),null):this.translate(...h,e),i)),i.interpolation&&this.interpolator.reset()}const s=i.postProcess||this.options.postProcess,r=w(s)?[s]:s;return t!=null&&r?.length&&i.applyPostProcessor!==!1&&(t=vo.handle(r,t,e,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...o,usedParams:this.getUsedParamsDetails(i)},...i}:i,this)),t}resolve(t,e={}){let i,o,n,s,r;return w(t)&&(t=[t]),t.forEach(u=>{if(this.isValidLookup(i))return;const c=this.extractFromKey(u,e),d=c.key;o=d;let h=c.namespaces;this.options.fallbackNS&&(h=h.concat(this.options.fallbackNS));const p=e.count!==void 0&&!w(e.count),b=p&&!e.ordinal&&e.count===0,m=e.context!==void 0&&(w(e.context)||typeof e.context=="number")&&e.context!=="",E=e.lngs?e.lngs:this.languageUtils.toResolveHierarchy(e.lng||this.language,e.fallbackLng);h.forEach(A=>{this.isValidLookup(i)||(r=A,!xo[`${E[0]}-${A}`]&&this.utils?.hasLoadedNamespace&&!this.utils?.hasLoadedNamespace(r)&&(xo[`${E[0]}-${A}`]=!0,this.logger.warn(`key "${o}" for languages "${E.join(", ")}" won't get resolved as namespace "${r}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),E.forEach(P=>{if(this.isValidLookup(i))return;s=P;const N=[d];if(this.i18nFormat?.addLookupKeys)this.i18nFormat.addLookupKeys(N,d,P,A,e);else{let se;p&&(se=this.pluralResolver.getSuffix(P,e.count,e));const Ze=`${this.options.pluralSeparator}zero`,vt=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(p&&(e.ordinal&&se.indexOf(vt)===0&&N.push(d+se.replace(vt,this.options.pluralSeparator)),N.push(d+se),b&&N.push(d+Ze)),m){const kt=`${d}${this.options.contextSeparator||"_"}${e.context}`;N.push(kt),p&&(e.ordinal&&se.indexOf(vt)===0&&N.push(kt+se.replace(vt,this.options.pluralSeparator)),N.push(kt+se),b&&N.push(kt+Ze))}}let Pe;for(;Pe=N.pop();)this.isValidLookup(i)||(n=Pe,i=this.getResource(P,A,Pe,e))}))})}),{res:i,usedKey:o,exactUsedKey:n,usedLng:s,usedNS:r}}isValidLookup(t){return t!==void 0&&!(!this.options.returnNull&&t===null)&&!(!this.options.returnEmptyString&&t==="")}getResource(t,e,i,o={}){return this.i18nFormat?.getResource?this.i18nFormat.getResource(t,e,i,o):this.resourceStore.getResource(t,e,i,o)}getUsedParamsDetails(t={}){const e=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],i=t.replace&&!w(t.replace);let o=i?t.replace:t;if(i&&typeof t.count<"u"&&(o.count=t.count),this.options.interpolation.defaultVariables&&(o={...this.options.interpolation.defaultVariables,...o}),!i){o={...o};for(const n of e)delete o[n]}return o}static hasDefaultValue(t){const e="defaultValue";for(const i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&e===i.substring(0,e.length)&&t[i]!==void 0)return!0;return!1}}class yo{constructor(t){this.options=t,this.supportedLngs=this.options.supportedLngs||!1,this.logger=we.create("languageUtils")}getScriptPartFromCode(t){if(t=wt(t),!t||t.indexOf("-")<0)return null;const e=t.split("-");return e.length===2||(e.pop(),e[e.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(e.join("-"))}getLanguagePartFromCode(t){if(t=wt(t),!t||t.indexOf("-")<0)return t;const e=t.split("-");return this.formatLanguageCode(e[0])}formatLanguageCode(t){if(w(t)&&t.indexOf("-")>-1){let e;try{e=Intl.getCanonicalLocales(t)[0]}catch{}return e&&this.options.lowerCaseLng&&(e=e.toLowerCase()),e||(this.options.lowerCaseLng?t.toLowerCase():t)}return this.options.cleanCode||this.options.lowerCaseLng?t.toLowerCase():t}isSupportedCode(t){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(t=this.getLanguagePartFromCode(t)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(t)>-1}getBestMatchFromCodes(t){if(!t)return null;let e;return t.forEach(i=>{if(e)return;const o=this.formatLanguageCode(i);(!this.options.supportedLngs||this.isSupportedCode(o))&&(e=o)}),!e&&this.options.supportedLngs&&t.forEach(i=>{if(e)return;const o=this.getScriptPartFromCode(i);if(this.isSupportedCode(o))return e=o;const n=this.getLanguagePartFromCode(i);if(this.isSupportedCode(n))return e=n;e=this.options.supportedLngs.find(s=>{if(s===n)return s;if(!(s.indexOf("-")<0&&n.indexOf("-")<0)&&(s.indexOf("-")>0&&n.indexOf("-")<0&&s.substring(0,s.indexOf("-"))===n||s.indexOf(n)===0&&n.length>1))return s})}),e||(e=this.getFallbackCodes(this.options.fallbackLng)[0]),e}getFallbackCodes(t,e){if(!t)return[];if(typeof t=="function"&&(t=t(e)),w(t)&&(t=[t]),Array.isArray(t))return t;if(!e)return t.default||[];let i=t[e];return i||(i=t[this.getScriptPartFromCode(e)]),i||(i=t[this.formatLanguageCode(e)]),i||(i=t[this.getLanguagePartFromCode(e)]),i||(i=t.default),i||[]}toResolveHierarchy(t,e){const i=this.getFallbackCodes((e===!1?[]:e)||this.options.fallbackLng||[],t),o=[],n=s=>{s&&(this.isSupportedCode(s)?o.push(s):this.logger.warn(`rejecting language code not found in supportedLngs: ${s}`))};return w(t)&&(t.indexOf("-")>-1||t.indexOf("_")>-1)?(this.options.load!=="languageOnly"&&n(this.formatLanguageCode(t)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&n(this.getScriptPartFromCode(t)),this.options.load!=="currentOnly"&&n(this.getLanguagePartFromCode(t))):w(t)&&n(this.formatLanguageCode(t)),i.forEach(s=>{o.indexOf(s)<0&&n(this.formatLanguageCode(s))}),o}}const wo={zero:0,one:1,two:2,few:3,many:4,other:5},Co={select:a=>a===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class Ua{constructor(t,e={}){this.languageUtils=t,this.options=e,this.logger=we.create("pluralResolver"),this.pluralRulesCache={}}addRule(t,e){this.rules[t]=e}clearCache(){this.pluralRulesCache={}}getRule(t,e={}){const i=wt(t==="dev"?"en":t),o=e.ordinal?"ordinal":"cardinal",n=JSON.stringify({cleanedCode:i,type:o});if(n in this.pluralRulesCache)return this.pluralRulesCache[n];let s;try{s=new Intl.PluralRules(i,{type:o})}catch{if(!Intl)return this.logger.error("No Intl support, please use an Intl polyfill!"),Co;if(!t.match(/-|_/))return Co;const u=this.languageUtils.getLanguagePartFromCode(t);s=this.getRule(u,e)}return this.pluralRulesCache[n]=s,s}needsPlural(t,e={}){let i=this.getRule(t,e);return i||(i=this.getRule("dev",e)),i?.resolvedOptions().pluralCategories.length>1}getPluralFormsOfKey(t,e,i={}){return this.getSuffixes(t,i).map(o=>`${e}${o}`)}getSuffixes(t,e={}){let i=this.getRule(t,e);return i||(i=this.getRule("dev",e)),i?i.resolvedOptions().pluralCategories.sort((o,n)=>wo[o]-wo[n]).map(o=>`${this.options.prepend}${e.ordinal?`ordinal${this.options.prepend}`:""}${o}`):[]}getSuffix(t,e,i={}){const o=this.getRule(t,i);return o?`${this.options.prepend}${i.ordinal?`ordinal${this.options.prepend}`:""}${o.select(e)}`:(this.logger.warn(`no plural rule found for: ${t}`),this.getSuffix("dev",e,i))}}const Eo=(a,t,e,i=".",o=!0)=>{let n=Aa(a,t,e);return!n&&o&&w(e)&&(n=hi(a,e,i),n===void 0&&(n=hi(t,e,i))),n},gi=a=>a.replace(/\$/g,"$$$$");class So{constructor(t={}){this.logger=we.create("interpolator"),this.options=t,this.format=t?.interpolation?.format||(e=>e),this.init(t)}init(t={}){t.interpolation||(t.interpolation={escapeValue:!0});const{escape:e,escapeValue:i,useRawValueToEscape:o,prefix:n,prefixEscaped:s,suffix:r,suffixEscaped:u,formatSeparator:c,unescapeSuffix:d,unescapePrefix:h,nestingPrefix:p,nestingPrefixEscaped:b,nestingSuffix:m,nestingSuffixEscaped:E,nestingOptionsSeparator:A,maxReplaces:P,alwaysFormat:N}=t.interpolation;this.escape=e!==void 0?e:Va,this.escapeValue=i!==void 0?i:!0,this.useRawValueToEscape=o!==void 0?o:!1,this.prefix=n?_t(n):s||"{{",this.suffix=r?_t(r):u||"}}",this.formatSeparator=c||",",this.unescapePrefix=d?"":h||"-",this.unescapeSuffix=this.unescapePrefix?"":d||"",this.nestingPrefix=p?_t(p):b||_t("$t("),this.nestingSuffix=m?_t(m):E||_t(")"),this.nestingOptionsSeparator=A||",",this.maxReplaces=P||1e3,this.alwaysFormat=N!==void 0?N:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const t=(e,i)=>e?.source===i?(e.lastIndex=0,e):new RegExp(i,"g");this.regexp=t(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=t(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=t(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(t,e,i,o){let n,s,r;const u=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},c=b=>{if(b.indexOf(this.formatSeparator)<0){const P=Eo(e,u,b,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(P,void 0,i,{...o,...e,interpolationkey:b}):P}const m=b.split(this.formatSeparator),E=m.shift().trim(),A=m.join(this.formatSeparator).trim();return this.format(Eo(e,u,E,this.options.keySeparator,this.options.ignoreJSONStructure),A,i,{...o,...e,interpolationkey:E})};this.resetRegExp();const d=o?.missingInterpolationHandler||this.options.missingInterpolationHandler,h=o?.interpolation?.skipOnVariables!==void 0?o.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:b=>gi(b)},{regex:this.regexp,safeValue:b=>this.escapeValue?gi(this.escape(b)):gi(b)}].forEach(b=>{for(r=0;n=b.regex.exec(t);){const m=n[1].trim();if(s=c(m),s===void 0)if(typeof d=="function"){const A=d(t,n,o);s=w(A)?A:""}else if(o&&Object.prototype.hasOwnProperty.call(o,m))s="";else if(h){s=n[0];continue}else this.logger.warn(`missed to pass in variable ${m} for interpolating ${t}`),s="";else!w(s)&&!this.useRawValueToEscape&&(s=_o(s));const E=b.safeValue(s);if(t=t.replace(n[0],E),h?(b.regex.lastIndex+=s.length,b.regex.lastIndex-=n[0].length):b.regex.lastIndex=0,r++,r>=this.maxReplaces)break}}),t}nest(t,e,i={}){let o,n,s;const r=(u,c)=>{const d=this.nestingOptionsSeparator;if(u.indexOf(d)<0)return u;const h=u.split(new RegExp(`${d}[ ]*{`));let p=`{${h[1]}`;u=h[0],p=this.interpolate(p,s);const b=p.match(/'/g),m=p.match(/"/g);((b?.length??0)%2===0&&!m||m.length%2!==0)&&(p=p.replace(/'/g,'"'));try{s=JSON.parse(p),c&&(s={...c,...s})}catch(E){return this.logger.warn(`failed parsing options string in nesting for key ${u}`,E),`${u}${d}${p}`}return s.defaultValue&&s.defaultValue.indexOf(this.prefix)>-1&&delete s.defaultValue,u};for(;o=this.nestingRegexp.exec(t);){let u=[];s={...i},s=s.replace&&!w(s.replace)?s.replace:s,s.applyPostProcessor=!1,delete s.defaultValue;const c=/{.*}/.test(o[1])?o[1].lastIndexOf("}")+1:o[1].indexOf(this.formatSeparator);if(c!==-1&&(u=o[1].slice(c).split(this.formatSeparator).map(d=>d.trim()).filter(Boolean),o[1]=o[1].slice(0,c)),n=e(r.call(this,o[1].trim(),s),s),n&&o[0]===t&&!w(n))return n;w(n)||(n=_o(n)),n||(this.logger.warn(`missed to resolve ${o[1]} for nesting ${t}`),n=""),u.length&&(n=u.reduce((d,h)=>this.format(d,h,i.lng,{...i,interpolationkey:o[1].trim()}),n.trim())),t=t.replace(o[0],n),this.regexp.lastIndex=0}return t}}const Pa=a=>{let t=a.toLowerCase().trim();const e={};if(a.indexOf("(")>-1){const i=a.split("(");t=i[0].toLowerCase().trim();const o=i[1].substring(0,i[1].length-1);t==="currency"&&o.indexOf(":")<0?e.currency||(e.currency=o.trim()):t==="relativetime"&&o.indexOf(":")<0?e.range||(e.range=o.trim()):o.split(";").forEach(s=>{if(s){const[r,...u]=s.split(":"),c=u.join(":").trim().replace(/^'+|'+$/g,""),d=r.trim();e[d]||(e[d]=c),c==="false"&&(e[d]=!1),c==="true"&&(e[d]=!0),isNaN(c)||(e[d]=parseInt(c,10))}})}return{formatName:t,formatOptions:e}},Io=a=>{const t={};return(e,i,o)=>{let n=o;o&&o.interpolationkey&&o.formatParams&&o.formatParams[o.interpolationkey]&&o[o.interpolationkey]&&(n={...n,[o.interpolationkey]:void 0});const s=i+JSON.stringify(n);let r=t[s];return r||(r=a(wt(i),o),t[s]=r),r(e)}},za=a=>(t,e,i)=>a(wt(e),i)(t);class ja{constructor(t={}){this.logger=we.create("formatter"),this.options=t,this.init(t)}init(t,e={interpolation:{}}){this.formatSeparator=e.interpolation.formatSeparator||",";const i=e.cacheInBuiltFormats?Io:za;this.formats={number:i((o,n)=>{const s=new Intl.NumberFormat(o,{...n});return r=>s.format(r)}),currency:i((o,n)=>{const s=new Intl.NumberFormat(o,{...n,style:"currency"});return r=>s.format(r)}),datetime:i((o,n)=>{const s=new Intl.DateTimeFormat(o,{...n});return r=>s.format(r)}),relativetime:i((o,n)=>{const s=new Intl.RelativeTimeFormat(o,{...n});return r=>s.format(r,n.range||"day")}),list:i((o,n)=>{const s=new Intl.ListFormat(o,{...n});return r=>s.format(r)})}}add(t,e){this.formats[t.toLowerCase().trim()]=e}addCached(t,e){this.formats[t.toLowerCase().trim()]=Io(e)}format(t,e,i,o={}){const n=e.split(this.formatSeparator);if(n.length>1&&n[0].indexOf("(")>1&&n[0].indexOf(")")<0&&n.find(r=>r.indexOf(")")>-1)){const r=n.findIndex(u=>u.indexOf(")")>-1);n[0]=[n[0],...n.splice(1,r)].join(this.formatSeparator)}return n.reduce((r,u)=>{const{formatName:c,formatOptions:d}=Pa(u);if(this.formats[c]){let h=r;try{const p=o?.formatParams?.[o.interpolationkey]||{},b=p.locale||p.lng||o.locale||o.lng||i;h=this.formats[c](r,b,{...d,...o,...p})}catch(p){this.logger.warn(p)}return h}else this.logger.warn(`there was no format function for ${c}`);return r},t)}}const Fa=(a,t)=>{a.pending[t]!==void 0&&(delete a.pending[t],a.pendingCount--)};class Ga extends zt{constructor(t,e,i,o={}){super(),this.backend=t,this.store=e,this.services=i,this.languageUtils=i.languageUtils,this.options=o,this.logger=we.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=o.maxParallelReads||10,this.readingCalls=0,this.maxRetries=o.maxRetries>=0?o.maxRetries:5,this.retryTimeout=o.retryTimeout>=1?o.retryTimeout:350,this.state={},this.queue=[],this.backend?.init?.(i,o.backend,o)}queueLoad(t,e,i,o){const n={},s={},r={},u={};return t.forEach(c=>{let d=!0;e.forEach(h=>{const p=`${c}|${h}`;!i.reload&&this.store.hasResourceBundle(c,h)?this.state[p]=2:this.state[p]<0||(this.state[p]===1?s[p]===void 0&&(s[p]=!0):(this.state[p]=1,d=!1,s[p]===void 0&&(s[p]=!0),n[p]===void 0&&(n[p]=!0),u[h]===void 0&&(u[h]=!0)))}),d||(r[c]=!0)}),(Object.keys(n).length||Object.keys(s).length)&&this.queue.push({pending:s,pendingCount:Object.keys(s).length,loaded:{},errors:[],callback:o}),{toLoad:Object.keys(n),pending:Object.keys(s),toLoadLanguages:Object.keys(r),toLoadNamespaces:Object.keys(u)}}loaded(t,e,i){const o=t.split("|"),n=o[0],s=o[1];e&&this.emit("failedLoading",n,s,e),!e&&i&&this.store.addResourceBundle(n,s,i,void 0,void 0,{skipCopy:!0}),this.state[t]=e?-1:2,e&&i&&(this.state[t]=0);const r={};this.queue.forEach(u=>{La(u.loaded,[n],s),Fa(u,t),e&&u.errors.push(e),u.pendingCount===0&&!u.done&&(Object.keys(u.loaded).forEach(c=>{r[c]||(r[c]={});const d=u.loaded[c];d.length&&d.forEach(h=>{r[c][h]===void 0&&(r[c][h]=!0)})}),u.done=!0,u.errors.length?u.callback(u.errors):u.callback())}),this.emit("loaded",r),this.queue=this.queue.filter(u=>!u.done)}read(t,e,i,o=0,n=this.retryTimeout,s){if(!t.length)return s(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:t,ns:e,fcName:i,tried:o,wait:n,callback:s});return}this.readingCalls++;const r=(c,d)=>{if(this.readingCalls--,this.waitingReads.length>0){const h=this.waitingReads.shift();this.read(h.lng,h.ns,h.fcName,h.tried,h.wait,h.callback)}if(c&&d&&o<this.maxRetries){setTimeout(()=>{this.read.call(this,t,e,i,o+1,n*2,s)},n);return}s(c,d)},u=this.backend[i].bind(this.backend);if(u.length===2){try{const c=u(t,e);c&&typeof c.then=="function"?c.then(d=>r(null,d)).catch(r):r(null,c)}catch(c){r(c)}return}return u(t,e,r)}prepareLoading(t,e,i={},o){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),o&&o();w(t)&&(t=this.languageUtils.toResolveHierarchy(t)),w(e)&&(e=[e]);const n=this.queueLoad(t,e,i,o);if(!n.toLoad.length)return n.pending.length||o(),null;n.toLoad.forEach(s=>{this.loadOne(s)})}load(t,e,i){this.prepareLoading(t,e,{},i)}reload(t,e,i){this.prepareLoading(t,e,{reload:!0},i)}loadOne(t,e=""){const i=t.split("|"),o=i[0],n=i[1];this.read(o,n,"read",void 0,void 0,(s,r)=>{s&&this.logger.warn(`${e}loading namespace ${n} for language ${o} failed`,s),!s&&r&&this.logger.log(`${e}loaded namespace ${n} for language ${o}`,r),this.loaded(t,s,r)})}saveMissing(t,e,i,o,n,s={},r=()=>{}){if(this.services?.utils?.hasLoadedNamespace&&!this.services?.utils?.hasLoadedNamespace(e)){this.logger.warn(`did not save key "${i}" as the namespace "${e}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(i==null||i==="")){if(this.backend?.create){const u={...s,isUpdate:n},c=this.backend.create.bind(this.backend);if(c.length<6)try{let d;c.length===5?d=c(t,e,i,o,u):d=c(t,e,i,o),d&&typeof d.then=="function"?d.then(h=>r(null,h)).catch(r):r(null,d)}catch(d){r(d)}else c(t,e,i,o,r,u)}!t||!t[0]||this.store.addResource(t[0],e,i,o)}}}const To=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:a=>{let t={};if(typeof a[1]=="object"&&(t=a[1]),w(a[1])&&(t.defaultValue=a[1]),w(a[2])&&(t.tDescription=a[2]),typeof a[2]=="object"||typeof a[3]=="object"){const e=a[3]||a[2];Object.keys(e).forEach(i=>{t[i]=e[i]})}return t},interpolation:{escapeValue:!0,format:a=>a,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),$o=a=>(w(a.ns)&&(a.ns=[a.ns]),w(a.fallbackLng)&&(a.fallbackLng=[a.fallbackLng]),w(a.fallbackNS)&&(a.fallbackNS=[a.fallbackNS]),a.supportedLngs?.indexOf?.("cimode")<0&&(a.supportedLngs=a.supportedLngs.concat(["cimode"])),typeof a.initImmediate=="boolean"&&(a.initAsync=a.initImmediate),a),Ft=()=>{},Wa=a=>{Object.getOwnPropertyNames(Object.getPrototypeOf(a)).forEach(e=>{typeof a[e]=="function"&&(a[e]=a[e].bind(a))})};class Ct extends zt{constructor(t={},e){if(super(),this.options=$o(t),this.services={},this.logger=we,this.modules={external:[]},Wa(this),e&&!this.isInitialized&&!t.isClone){if(!this.options.initAsync)return this.init(t,e),this;setTimeout(()=>{this.init(t,e)},0)}}init(t={},e){this.isInitializing=!0,typeof t=="function"&&(e=t,t={}),t.defaultNS==null&&t.ns&&(w(t.ns)?t.defaultNS=t.ns:t.ns.indexOf("translation")<0&&(t.defaultNS=t.ns[0]));const i=To();this.options={...i,...this.options,...$o(t)},this.options.interpolation={...i.interpolation,...this.options.interpolation},t.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=t.keySeparator),t.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=t.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=i.overloadTranslationOptionHandler);const o=c=>c?typeof c=="function"?new c:c:null;if(!this.options.isClone){this.modules.logger?we.init(o(this.modules.logger),this.options):we.init(null,this.options);let c;this.modules.formatter?c=this.modules.formatter:c=ja;const d=new yo(this.options);this.store=new mo(this.options.resources,this.options);const h=this.services;h.logger=we,h.resourceStore=this.store,h.languageUtils=d,h.pluralResolver=new Ua(d,{prepend:this.options.pluralSeparator,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),this.options.interpolation.format&&this.options.interpolation.format!==i.interpolation.format&&this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"),c&&(!this.options.interpolation.format||this.options.interpolation.format===i.interpolation.format)&&(h.formatter=o(c),h.formatter.init&&h.formatter.init(h,this.options),this.options.interpolation.format=h.formatter.format.bind(h.formatter)),h.interpolator=new So(this.options),h.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},h.backendConnector=new Ga(o(this.modules.backend),h.resourceStore,h,this.options),h.backendConnector.on("*",(b,...m)=>{this.emit(b,...m)}),this.modules.languageDetector&&(h.languageDetector=o(this.modules.languageDetector),h.languageDetector.init&&h.languageDetector.init(h,this.options.detection,this.options)),this.modules.i18nFormat&&(h.i18nFormat=o(this.modules.i18nFormat),h.i18nFormat.init&&h.i18nFormat.init(this)),this.translator=new jt(this.services,this.options),this.translator.on("*",(b,...m)=>{this.emit(b,...m)}),this.modules.external.forEach(b=>{b.init&&b.init(this)})}if(this.format=this.options.interpolation.format,e||(e=Ft),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const c=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);c.length>0&&c[0]!=="dev"&&(this.options.lng=c[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(c=>{this[c]=(...d)=>this.store[c](...d)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(c=>{this[c]=(...d)=>(this.store[c](...d),this)});const r=xt(),u=()=>{const c=(d,h)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),r.resolve(h),e(d,h)};if(this.languages&&!this.isInitialized)return c(null,this.t.bind(this));this.changeLanguage(this.options.lng,c)};return this.options.resources||!this.options.initAsync?u():setTimeout(u,0),r}loadResources(t,e=Ft){let i=e;const o=w(t)?t:this.language;if(typeof t=="function"&&(i=t),!this.options.resources||this.options.partialBundledLanguages){if(o?.toLowerCase()==="cimode"&&(!this.options.preload||this.options.preload.length===0))return i();const n=[],s=r=>{if(!r||r==="cimode")return;this.services.languageUtils.toResolveHierarchy(r).forEach(c=>{c!=="cimode"&&n.indexOf(c)<0&&n.push(c)})};o?s(o):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(u=>s(u)),this.options.preload?.forEach?.(r=>s(r)),this.services.backendConnector.load(n,this.options.ns,r=>{!r&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),i(r)})}else i(null)}reloadResources(t,e,i){const o=xt();return typeof t=="function"&&(i=t,t=void 0),typeof e=="function"&&(i=e,e=void 0),t||(t=this.languages),e||(e=this.options.ns),i||(i=Ft),this.services.backendConnector.reload(t,e,n=>{o.resolve(),i(n)}),o}use(t){if(!t)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!t.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return t.type==="backend"&&(this.modules.backend=t),(t.type==="logger"||t.log&&t.warn&&t.error)&&(this.modules.logger=t),t.type==="languageDetector"&&(this.modules.languageDetector=t),t.type==="i18nFormat"&&(this.modules.i18nFormat=t),t.type==="postProcessor"&&vo.addPostProcessor(t),t.type==="formatter"&&(this.modules.formatter=t),t.type==="3rdParty"&&this.modules.external.push(t),this}setResolvedLanguage(t){if(!(!t||!this.languages)&&!(["cimode","dev"].indexOf(t)>-1)){for(let e=0;e<this.languages.length;e++){const i=this.languages[e];if(!(["cimode","dev"].indexOf(i)>-1)&&this.store.hasLanguageSomeTranslations(i)){this.resolvedLanguage=i;break}}!this.resolvedLanguage&&this.languages.indexOf(t)<0&&this.store.hasLanguageSomeTranslations(t)&&(this.resolvedLanguage=t,this.languages.unshift(t))}}changeLanguage(t,e){this.isLanguageChangingTo=t;const i=xt();this.emit("languageChanging",t);const o=r=>{this.language=r,this.languages=this.services.languageUtils.toResolveHierarchy(r),this.resolvedLanguage=void 0,this.setResolvedLanguage(r)},n=(r,u)=>{u?this.isLanguageChangingTo===t&&(o(u),this.translator.changeLanguage(u),this.isLanguageChangingTo=void 0,this.emit("languageChanged",u),this.logger.log("languageChanged",u)):this.isLanguageChangingTo=void 0,i.resolve((...c)=>this.t(...c)),e&&e(r,(...c)=>this.t(...c))},s=r=>{!t&&!r&&this.services.languageDetector&&(r=[]);const u=w(r)?r:r&&r[0],c=this.store.hasLanguageSomeTranslations(u)?u:this.services.languageUtils.getBestMatchFromCodes(w(r)?[r]:r);c&&(this.language||o(c),this.translator.language||this.translator.changeLanguage(c),this.services.languageDetector?.cacheUserLanguage?.(c)),this.loadResources(c,d=>{n(d,c)})};return!t&&this.services.languageDetector&&!this.services.languageDetector.async?s(this.services.languageDetector.detect()):!t&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(s):this.services.languageDetector.detect(s):s(t),i}getFixedT(t,e,i){const o=(n,s,...r)=>{let u;typeof s!="object"?u=this.options.overloadTranslationOptionHandler([n,s].concat(r)):u={...s},u.lng=u.lng||o.lng,u.lngs=u.lngs||o.lngs,u.ns=u.ns||o.ns,u.keyPrefix!==""&&(u.keyPrefix=u.keyPrefix||i||o.keyPrefix);const c=this.options.keySeparator||".";let d;return u.keyPrefix&&Array.isArray(n)?d=n.map(h=>(typeof h=="function"&&(h=_i(h,{...this.options,...s})),`${u.keyPrefix}${c}${h}`)):(typeof n=="function"&&(n=_i(n,{...this.options,...s})),d=u.keyPrefix?`${u.keyPrefix}${c}${n}`:n),this.t(d,u)};return w(t)?o.lng=t:o.lngs=t,o.ns=e,o.keyPrefix=i,o}t(...t){return this.translator?.translate(...t)}exists(...t){return this.translator?.exists(...t)}setDefaultNamespace(t){this.options.defaultNS=t}hasLoadedNamespace(t,e={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const i=e.lng||this.resolvedLanguage||this.languages[0],o=this.options?this.options.fallbackLng:!1,n=this.languages[this.languages.length-1];if(i.toLowerCase()==="cimode")return!0;const s=(r,u)=>{const c=this.services.backendConnector.state[`${r}|${u}`];return c===-1||c===0||c===2};if(e.precheck){const r=e.precheck(this,s);if(r!==void 0)return r}return!!(this.hasResourceBundle(i,t)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||s(i,t)&&(!o||s(n,t)))}loadNamespaces(t,e){const i=xt();return this.options.ns?(w(t)&&(t=[t]),t.forEach(o=>{this.options.ns.indexOf(o)<0&&this.options.ns.push(o)}),this.loadResources(o=>{i.resolve(),e&&e(o)}),i):(e&&e(),Promise.resolve())}loadLanguages(t,e){const i=xt();w(t)&&(t=[t]);const o=this.options.preload||[],n=t.filter(s=>o.indexOf(s)<0&&this.services.languageUtils.isSupportedCode(s));return n.length?(this.options.preload=o.concat(n),this.loadResources(s=>{i.resolve(),e&&e(s)}),i):(e&&e(),Promise.resolve())}dir(t){if(t||(t=this.resolvedLanguage||(this.languages?.length>0?this.languages[0]:this.language)),!t)return"rtl";try{const o=new Intl.Locale(t);if(o&&o.getTextInfo){const n=o.getTextInfo();if(n&&n.direction)return n.direction}}catch{}const e=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],i=this.services?.languageUtils||new yo(To());return t.toLowerCase().indexOf("-latn")>1?"ltr":e.indexOf(i.getLanguagePartFromCode(t))>-1||t.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(t={},e){const i=new Ct(t,e);return i.createInstance=Ct.createInstance,i}cloneInstance(t={},e=Ft){const i=t.forkResourceStore;i&&delete t.forkResourceStore;const o={...this.options,...t,isClone:!0},n=new Ct(o);if((t.debug!==void 0||t.prefix!==void 0)&&(n.logger=n.logger.clone(t)),["store","services","language"].forEach(r=>{n[r]=this[r]}),n.services={...this.services},n.services.utils={hasLoadedNamespace:n.hasLoadedNamespace.bind(n)},i){const r=Object.keys(this.store.data).reduce((u,c)=>(u[c]={...this.store.data[c]},u[c]=Object.keys(u[c]).reduce((d,h)=>(d[h]={...u[c][h]},d),u[c]),u),{});n.store=new mo(r,o),n.services.resourceStore=n.store}return t.interpolation&&(n.services.interpolator=new So(o)),n.translator=new jt(n.services,o),n.translator.on("*",(r,...u)=>{n.emit(r,...u)}),n.init(o,e),n.translator.options=o,n.translator.backendConnector.services.utils={hasLoadedNamespace:n.hasLoadedNamespace.bind(n)},n}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const $=Ct.createInstance();$.createInstance,$.dir,$.init,$.loadResources,$.reloadResources,$.use,$.changeLanguage,$.getFixedT,$.t,$.exists,$.setDefaultNamespace,$.hasLoadedNamespace,$.loadNamespaces,$.loadLanguages;const Ka={dialog:{title:"Paste & Create App",appNameLabel:"App Name:",appNamePlaceholder:"Enter app name...",jsonLabel:"Record JSON:",jsonPlaceholder:"Paste your record object here...",cancelButton:"Cancel",createButton:"Create",creatingButton:"Creating...",successMessage:"App created successfully! App ID:",errorPrefix:"Error creating app"},validation:{invalidJson:"Invalid JSON format: {{message}}",recordMustBeObject:"The record data must be an object",recordMustHaveFields:"The record object must contain at least one field",fieldMustBeObject:'Field "{{fieldCode}}" must be an object',fieldMustHaveValue:'Field "{{fieldCode}}" must have a "value" property',unknownFieldType:'Field "{{fieldCode}}" has unknown type: {{type}}',subtableNotArray:'Field "{{fieldCode}}" is a SUBTABLE but value is not an array',subtableRowInvalid:'Field "{{fieldCode}}" SUBTABLE row {{index}} must have a "value" object',warningNonCreatable:'⚠️ {{fieldType}} cannot be created via API and will be ignored (field: "{{fieldCode}}")',warningSystemField:'ℹ️ System field "{{fieldCode}}" will be automatically created and will be ignored from input',fieldTypes:{CALC:"Calculated fields",REFERENCE_TABLE:"Related records fields",LABEL:"Label fields",SPACER:"Blank space fields",HR:"Border fields",GROUP:"Field groups"}}},qa={dialog:{title:"貼り付けてアプリ作成",appNameLabel:"アプリ名:",appNamePlaceholder:"アプリ名を入力...",jsonLabel:"レコードJSON:",jsonPlaceholder:"レコードオブジェクトを貼り付けてください...",cancelButton:"キャンセル",createButton:"作成",creatingButton:"作成中...",successMessage:"アプリが正常に作成されました！アプリID:",errorPrefix:"アプリ作成エラー"},validation:{invalidJson:"無効なJSON形式: {{message}}",recordMustBeObject:"レコードデータはオブジェクトである必要があります",recordMustHaveFields:"レコードオブジェクトには少なくとも1つのフィールドが必要です",fieldMustBeObject:'フィールド "{{fieldCode}}" はオブジェクトである必要があります',fieldMustHaveValue:'フィールド "{{fieldCode}}" には "value" プロパティが必要です',unknownFieldType:'フィールド "{{fieldCode}}" に未知のタイプがあります: {{type}}',subtableNotArray:'フィールド "{{fieldCode}}" はサブテーブルですが、値が配列ではありません',subtableRowInvalid:'フィールド "{{fieldCode}}" のサブテーブル行 {{index}} には "value" オブジェクトが必要です',warningNonCreatable:'⚠️ {{fieldType}}はAPI経由で作成できないため、無視されます (フィールド: "{{fieldCode}}")',warningSystemField:'ℹ️ システムフィールド "{{fieldCode}}" は自動的に作成されるため、入力から無視されます',fieldTypes:{CALC:"計算フィールド",REFERENCE_TABLE:"関連レコード一覧フィールド",LABEL:"ラベルフィールド",SPACER:"スペースフィールド",HR:"罫線フィールド",GROUP:"フィールドグループ"}}};$.init({lng:kintone.getLoginUser().language,fallbackLng:"en",resources:{en:{translation:Ka},ja:{translation:qa}}});const Gt=globalThis,fi=Gt.ShadowRoot&&(Gt.ShadyCSS===void 0||Gt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Lo=Symbol(),Ao=new WeakMap;let Ya=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Lo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(fi&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Ao.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ao.set(e,t))}return t}toString(){return this.cssText}};const Za=a=>new Ya(typeof a=="string"?a:a+"",void 0,Lo),Ja=(a,t)=>{if(fi)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),o=Gt.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=e.cssText,a.appendChild(i)}},Do=fi?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Za(e)})(a):a;const{is:Xa,defineProperty:Qa,getOwnPropertyDescriptor:en,getOwnPropertyNames:tn,getOwnPropertySymbols:on,getPrototypeOf:an}=Object,Wt=globalThis,Vo=Wt.trustedTypes,nn=Vo?Vo.emptyScript:"",sn=Wt.reactiveElementPolyfillSupport,Et=(a,t)=>a,Kt={toAttribute(a,t){switch(t){case Boolean:a=a?nn:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},bi=(a,t)=>!Xa(a,t),Mo={attribute:!0,type:String,converter:Kt,reflect:!1,useDefault:!1,hasChanged:bi};Symbol.metadata??=Symbol("metadata"),Wt.litPropertyMetadata??=new WeakMap;let pt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Mo){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);o!==void 0&&Qa(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:n}=en(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:o,set(s){const r=o?.call(this);n?.call(this,s),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Mo}static _$Ei(){if(this.hasOwnProperty(Et("elementProperties")))return;const t=an(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Et("properties"))){const e=this.properties,i=[...tn(e),...on(e)];for(const o of i)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,o]of e)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const o=this._$Eu(e,i);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const o of i)e.unshift(Do(o))}else t!==void 0&&e.push(Do(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ja(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){const n=(i.converter?.toAttribute!==void 0?i.converter:Kt).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const n=i.getPropertyOptions(o),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Kt;this._$Em=o;const r=s.fromAttribute(e,n.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i,o=!1,n){if(t!==void 0){const s=this.constructor;if(o===!1&&(n=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??bi)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),n!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i){const{wrapped:s}=n,r=this[o];s!==!0||this._$AL.has(o)||r===void 0||this.C(o,void 0,n,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};pt.elementStyles=[],pt.shadowRootOptions={mode:"open"},pt[Et("elementProperties")]=new Map,pt[Et("finalized")]=new Map,sn?.({ReactiveElement:pt}),(Wt.reactiveElementVersions??=[]).push("2.1.2");const mi=globalThis,Bo=a=>a,qt=mi.trustedTypes,Oo=qt?qt.createPolicy("lit-html",{createHTML:a=>a}):void 0,Ho="$lit$",je=`lit$${Math.random().toFixed(9).slice(2)}$`,Ro="?"+je,rn=`<${Ro}>`,Xe=document,St=()=>Xe.createComment(""),It=a=>a===null||typeof a!="object"&&typeof a!="function",vi=Array.isArray,ln=a=>vi(a)||typeof a?.[Symbol.iterator]=="function",ki=`[ 	
\f\r]`,Tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,No=/-->/g,Uo=/>/g,Qe=RegExp(`>|${ki}(?:([^\\s"'>=/]+)(${ki}*=${ki}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Po=/'/g,zo=/"/g,jo=/^(?:script|style|textarea|title)$/i,Fo=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),_=Fo(1),C=Fo(2),et=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),Go=new WeakMap,tt=Xe.createTreeWalker(Xe,129);function Wo(a,t){if(!vi(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Oo!==void 0?Oo.createHTML(t):t}const un=(a,t)=>{const e=a.length-1,i=[];let o,n=t===2?"<svg>":t===3?"<math>":"",s=Tt;for(let r=0;r<e;r++){const u=a[r];let c,d,h=-1,p=0;for(;p<u.length&&(s.lastIndex=p,d=s.exec(u),d!==null);)p=s.lastIndex,s===Tt?d[1]==="!--"?s=No:d[1]!==void 0?s=Uo:d[2]!==void 0?(jo.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Qe):d[3]!==void 0&&(s=Qe):s===Qe?d[0]===">"?(s=o??Tt,h=-1):d[1]===void 0?h=-2:(h=s.lastIndex-d[2].length,c=d[1],s=d[3]===void 0?Qe:d[3]==='"'?zo:Po):s===zo||s===Po?s=Qe:s===No||s===Uo?s=Tt:(s=Qe,o=void 0);const b=s===Qe&&a[r+1].startsWith("/>")?" ":"";n+=s===Tt?u+rn:h>=0?(i.push(c),u.slice(0,h)+Ho+u.slice(h)+je+b):u+je+(h===-2?r:b)}return[Wo(a,n+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class $t{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const r=t.length-1,u=this.parts,[c,d]=un(t,e);if(this.el=$t.createElement(c,i),tt.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=tt.nextNode())!==null&&u.length<r;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(Ho)){const p=d[s++],b=o.getAttribute(h).split(je),m=/([.?@])?(.*)/.exec(p);u.push({type:1,index:n,name:m[2],strings:b,ctor:m[1]==="."?dn:m[1]==="?"?hn:m[1]==="@"?_n:Yt}),o.removeAttribute(h)}else h.startsWith(je)&&(u.push({type:6,index:n}),o.removeAttribute(h));if(jo.test(o.tagName)){const h=o.textContent.split(je),p=h.length-1;if(p>0){o.textContent=qt?qt.emptyScript:"";for(let b=0;b<p;b++)o.append(h[b],St()),tt.nextNode(),u.push({type:2,index:++n});o.append(h[p],St())}}}else if(o.nodeType===8)if(o.data===Ro)u.push({type:2,index:n});else{let h=-1;for(;(h=o.data.indexOf(je,h+1))!==-1;)u.push({type:7,index:n}),h+=je.length-1}n++}}static createElement(t,e){const i=Xe.createElement("template");return i.innerHTML=t,i}}function gt(a,t,e=a,i){if(t===et)return t;let o=i!==void 0?e._$Co?.[i]:e._$Cl;const n=It(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(a),o._$AT(a,e,i)),i!==void 0?(e._$Co??=[])[i]=o:e._$Cl=o),o!==void 0&&(t=gt(a,o._$AS(a,t.values),o,i)),t}class cn{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??Xe).importNode(e,!0);tt.currentNode=o;let n=tt.nextNode(),s=0,r=0,u=i[0];for(;u!==void 0;){if(s===u.index){let c;u.type===2?c=new Lt(n,n.nextSibling,this,t):u.type===1?c=new u.ctor(n,u.name,u.strings,this,t):u.type===6&&(c=new pn(n,this,t)),this._$AV.push(c),u=i[++r]}s!==u?.index&&(n=tt.nextNode(),s++)}return tt.currentNode=Xe,o}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Lt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=gt(this,t,e),It(t)?t===B||t==null||t===""?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==et&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ln(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&It(this._$AH)?this._$AA.nextSibling.data=t:this.T(Xe.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=$t.createElement(Wo(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const n=new cn(o,this),s=n.u(this.options);n.p(e),this.T(s),this._$AH=n}}_$AC(t){let e=Go.get(t.strings);return e===void 0&&Go.set(t.strings,e=new $t(t)),e}k(t){vi(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new Lt(this.O(St()),this.O(St()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const i=Bo(t).nextSibling;Bo(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Yt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(n===void 0)t=gt(this,t,e,0),s=!It(t)||t!==this._$AH&&t!==et,s&&(this._$AH=t);else{const r=t;let u,c;for(t=n[0],u=0;u<n.length-1;u++)c=gt(this,r[i+u],e,u),c===et&&(c=this._$AH[u]),s||=!It(c)||c!==this._$AH[u],c===B?t=B:t!==B&&(t+=(c??"")+n[u+1]),this._$AH[u]=c}s&&!o&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class dn extends Yt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class hn extends Yt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class _n extends Yt{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){if((t=gt(this,t,e,0)??B)===et)return;const i=this._$AH,o=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==B&&(i===B||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class pn{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){gt(this,t)}}const gn=mi.litHtmlPolyfillSupport;gn?.($t,Lt),(mi.litHtmlVersions??=[]).push("3.3.2");const fn=(a,t,e)=>{const i=e?.renderBefore??t;let o=i._$litPart$;if(o===void 0){const n=e?.renderBefore??null;i._$litPart$=o=new Lt(t.insertBefore(St(),n),n,void 0,e??{})}return o._$AI(a),o};const xi=globalThis;let At=class extends pt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=fn(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return et}};At._$litElement$=!0,At.finalized=!0,xi.litElementHydrateSupport?.({LitElement:At});const bn=xi.litElementPolyfillSupport;bn?.({LitElement:At}),(xi.litElementVersions??=[]).push("4.2.2");const mn={attribute:!0,type:String,converter:Kt,reflect:!1,hasChanged:bi},vn=(a=mn,t,e)=>{const{kind:i,metadata:o}=e;let n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),i==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(e.name,a),i==="accessor"){const{name:s}=e;return{set(r){const u=t.get.call(this);t.set.call(this,r),this.requestUpdate(s,u,a,!0,r)},init(r){return r!==void 0&&this.C(s,void 0,a,r),r}}}if(i==="setter"){const{name:s}=e;return function(r){const u=this[s];t.call(this,r),this.requestUpdate(s,u,a,!0,r)}}throw Error("Unsupported decorator location: "+i)};function l(a){return(t,e)=>typeof e=="object"?vn(a,t,e):((i,o,n)=>{const s=o.hasOwnProperty(n);return o.constructor.createProperty(n,i),s?Object.getOwnPropertyDescriptor(o,n):void 0})(a,t,e)}function v(a){return l({...a,state:!0,attribute:!1})}const Ko=(a,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(a,t,e),e);function g(a,t){return(e,i,o)=>{const n=s=>s.renderRoot?.querySelector(a)??null;return Ko(e,i,{get(){return n(this)}})}}let kn;function z(a){return(t,e)=>Ko(t,e,{get(){return(this.renderRoot??(kn??=document.createDocumentFragment())).querySelectorAll(a)}})}const qo=1024,Yo=1048576,Zo=1073741824,xn="NaN size",Jo={ATTACHMENT_BROWSE:"Browse",ATTACHMENT_DRAG_DROP_ZONE:"Drop files here."},yn={ATTACHMENT_BROWSE:"参照",ATTACHMENT_DRAG_DROP_ZONE:"ここにファイルをドロップします。"},wn={ATTACHMENT_BROWSE:"选择文件",ATTACHMENT_DRAG_DROP_ZONE:"拖动文件到此。"},Cn={ATTACHMENT_BROWSE:"選擇檔案",ATTACHMENT_DRAG_DROP_ZONE:"拖曳檔案到此。"},En={ATTACHMENT_BROWSE:"Examinar",ATTACHMENT_DRAG_DROP_ZONE:"Suelte los archivos aquí."},y={ITEMS:{IS_NOT_ARRAY:"'items' property is not array.",IS_DUPLICATED:"'value' property is not unique in items.",IS_NOT_SPECIFIED:"'value' property is not specified in items."},FILES:{IS_NOT_ARRAY:"'files' property is not array."},VALUE:{IS_NOT_ARRAY:"'value' property is not array.",IS_NOT_STRING:"'value' property is not string."},SELECTED_INDEX:{IS_NOT_ARRAY:"'selectedIndex' property is not array.",IS_NOT_NUMBER:"'selectedIndex' property is not number."},COLUMNS:{IS_NOT_ARRAY:"'columns' property is not array.",FIELD_REQUIRED:"'field' property is not specified in columns.",FIELD_UNIQUE:"'field' property is not unique in columns."},ROWS_PER_PAGE:{INVALID:"'rowsPerPage' property is not positive integer."},DATA:{IS_NOT_ARRAY:"'data' property is not array."},CONTAINER:{INVALID:"'container' property is not HTMLElement."}};const Sn={CHILD:2},In=a=>(...t)=>({_$litDirective$:a,values:t});class Tn{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}let yi=class extends Tn{constructor(t){if(super(t),this.it=B,t.type!==Sn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===B||t==null)return this._t=void 0,this.it=t;if(t===et)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};yi.directiveName="unsafeHTML",yi.resultType=1;const $n=In(yi),it=60,Me=24,fe=12,Ce={AM:"AM",PM:"PM"},Xo='"max" must be greater than or equal to "min".',Qo="Time is out of valid range.",ea="'timeStep' property is not number.",wi="00:00",ta="23:59",G={VALUE:"'value' property format is not valid.",MAX:"'max' property format is not valid.",MIN:"'min' property format is not valid.",TIME_STEP:"'timeStep' property format is not valid."},ia={MONTH_SELECT:["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"],YEAR_SELECT_POSTFIX:"",WEEK_DAYS:[{text:"SUN",abbr:"Sunday"},{text:"MON",abbr:"Monday"},{text:"TUE",abbr:"Tuesday"},{text:"WED",abbr:"Wednesday"},{text:"THU",abbr:"Thursday"},{text:"FRI",abbr:"Friday"},{text:"SAT",abbr:"Saturday"}],INVALID_FORMAT:"Format is not valid.",INVALID_TIME_FORMAT:"Format is not valid.",CALENDAR_FOOTER_TEXT:{none:"None",today:"Today",close:"Close"},TIME_IS_OUT_OF_VALID_RANGE:"Time is out of valid range."},Ln={MONTH_SELECT:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],YEAR_SELECT_POSTFIX:"年",WEEK_DAYS:[{text:"日",abbr:"日"},{text:"月",abbr:"月"},{text:"火",abbr:"火"},{text:"水",abbr:"水"},{text:"木",abbr:"木"},{text:"金",abbr:"金"},{text:"土",abbr:"土"}],INVALID_FORMAT:"日付の形式が不正です。",INVALID_TIME_FORMAT:"時刻の形式が不正です。",CALENDAR_FOOTER_TEXT:{none:"選択を解除",today:"今日",close:"閉じる"},TIME_IS_OUT_OF_VALID_RANGE:"時刻が有効な範囲外です。"},An={MONTH_SELECT:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],YEAR_SELECT_POSTFIX:"年",WEEK_DAYS:[{text:"周日",abbr:"周日"},{text:"周一",abbr:"周一"},{text:"周二",abbr:"周二"},{text:"周三",abbr:"周三"},{text:"周四",abbr:"周四"},{text:"周五",abbr:"周五"},{text:"周六",abbr:"周六"}],INVALID_FORMAT:"日期格式不正确。",INVALID_TIME_FORMAT:"时间格式不正确。",CALENDAR_FOOTER_TEXT:{none:"清空",today:"今天",close:"关闭"},TIME_IS_OUT_OF_VALID_RANGE:"时间超出有效范围。"},Dn={MONTH_SELECT:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],YEAR_SELECT_POSTFIX:"年",WEEK_DAYS:[{text:"週日",abbr:"週日"},{text:"週一",abbr:"週一"},{text:"週二",abbr:"週二"},{text:"週三",abbr:"週三"},{text:"週四",abbr:"週四"},{text:"週五",abbr:"週五"},{text:"週六",abbr:"週六"}],INVALID_FORMAT:"日期格式錯誤。",INVALID_TIME_FORMAT:"時間格式錯誤。",CALENDAR_FOOTER_TEXT:{none:"清空",today:"今天",close:"關閉"},TIME_IS_OUT_OF_VALID_RANGE:"時間超出有效範圍。"},Vn={MONTH_SELECT:["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"],YEAR_SELECT_POSTFIX:"",WEEK_DAYS:[{text:"Do.",abbr:"Domingo"},{text:"Lu.",abbr:"Lunes"},{text:"Ma.",abbr:"Martes"},{text:"Mi.",abbr:"Miércoles"},{text:"Ju.",abbr:"Jueves"},{text:"Vi.",abbr:"Viernes"},{text:"Sá.",abbr:"Sábado"}],INVALID_FORMAT:"Formato no válido.",INVALID_TIME_FORMAT:"Formato no válido.",CALENDAR_FOOTER_TEXT:{none:"Ninguno",today:"Hoy",close:"Cerrar"},TIME_IS_OUT_OF_VALID_RANGE:"La hora está fuera del rango válido."},oa=(a,t)=>{const e=Pn(a,t);let i=new Date(e.start),o=[];const n=[];for(;i<=e.end;)o.push(Un(i)),o.length===7&&(n.push(o),o=[]),i.setDate(i.getDate()+1),i=new Date(i);return n},Mn=(a,t,e,i)=>{const o=[],n=Math.round(t),s=ft(i),r=ft(e);if(n>0){const u=Math.floor((s-r)/n)+1;for(let c=0;c<u;c++){const d=Bn(r+c*n,a);o.push(d)}}return o},Bn=(a,t)=>{let e,i;e=Math.floor(a/it),i=a%it;const o=e%Me<fe?Ce.AM:Ce.PM;return e=t?e%fe:e%Me,e===0&&t&&(e=fe),e<10&&(e="0"+e),i<10&&(i="0"+i),{label:e+":"+i+(t?" "+o:""),value:e+":"+i+(t?" "+o:"")}},ft=a=>{const t=a.split(":");let e=parseInt(t[0],10),i=parseInt(t[1],10);return isNaN(e)||isNaN(i)?0:(e<0?e=0:e>=Me&&(e=Me-1),i<0?i=0:i>=it&&(i=it-1),e*it+i)},Fe=(a,t)=>{const e=ft(a),i=ft(t);return e>i?1:e===i?0:-1},On=(a,t)=>{const e=a.split(":"),i=parseInt(e[0],10),o=parseInt(e[1],10),n=i%Me;return isNaN(n)||isNaN(o)?{hours:"",minutes:"",suffix:""}:t?Rn(i,o):{hours:I(n),minutes:I(o),suffix:""}},Hn=(a,t)=>{const e={hours:"",minutes:"",suffix:""},i=a.split(":"),o=parseInt(i[0],10),n=parseInt(i[1],10),s=o%Me;return isNaN(s)||(e.hours=I(t?aa(s):s),e.suffix=t?na(s):""),isNaN(n)||(e.minutes=I(n)),e},aa=a=>{let t=a%fe;return t=t===0?fe:t,t},na=a=>a>=fe?Ce.PM:Ce.AM,Rn=(a,t)=>{const e=na(a),i=aa(a);return{hours:I(i),minutes:I(t),suffix:e}},Dt=a=>{const[t,e]=a.split(" "),[i,o]=t.split(":");return e?`${Nn(i,e)}:${o}`:a},Nn=(a,t)=>{const e=parseInt(a,10);if(t===Ce.PM){const o=e===fe?12:e+12;return I(o)}return I(e===fe?0:e)},Un=a=>{const t=new Date(a),e=t.getFullYear(),i=I(t.getMonth()+1),o=I(t.getDate()),n=`${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`,s=`${e}-${i}-${o}`;return{text:n,attr:s}},sa=(a,t)=>{if(t&&!Ei(t)){const e=t.split("-");if(e.length!==3)return t;const i=e[0],o=e[1],n=e[2];return a==="en"?`${o}/${n}/${i}`:`${i}-${o}-${n}`}return t},Ci=(a,t)=>{if(Ei(t))return t;const e=a==="en",i=e?"/":"-",o=t.split(i),n=e?o[2]:o[0],s=e?o[0]:o[1],r=e?o[1]:o[2];return`${n}-${s}-${r}`},Ei=a=>a==null||a.length===0||!/[^(^\s*)|(\s*$)]/.test(a),Ge=(a="ja")=>{const t=new Date,e=t.getFullYear(),i=I(t.getMonth()+1),o=I(t.getDate());return a==="ja"||a==="zh"?e+"-"+i+"-"+o:i+"/"+o+"/"+e},ra=(a,t)=>{if(t&&!Ei(t)){const e=a==="en",i=e?"/":"-";if(new Date(`${t}${e?"":"T00:00:00"}`).getDate()!==parseInt(t.split(i)[e?1:2],10))return!1;const s=/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/;if(a==="en")return t.match(s)!==null;const r=/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g;return t.match(r)!==null}return!1},I=(a,t=2)=>{const e=`0000000000${a}`;return e.substr(e.length-t)},Pn=(a,t)=>{const e=new Date(a,t);e.setDate(1);const i=new Date(e);i.setDate(i.getDate()-i.getDay());const o=new Date(a,t);o.setMonth(o.getMonth()+1,0);const n=new Date(o);n.setDate(n.getDate()+(6-n.getDay()));const s=(n.getTime()-i.getTime())/(1e3*60*60*24);return n.setDate(n.getDate()+(42-s)),{start:i,end:n}},O=a=>{switch(a){case"en":return ia;case"zh":return An;case"ja":return Ln;case"zh-TW":return Dn;case"es":return Vn;default:return ia}},zn=(a=1)=>{const t=[];for(let e=0;e<=59;e+=a)t.push({value:I(e),label:I(e)});return t},jn=(a=!1)=>a?la("AM").concat(la("PM")):Fn(),la=a=>{const t=[];t.push({value:`${a} 12`,label:`${a} 12`});for(let e=1;e<=11;e++)t.push({value:`${a} ${I(e)}`,label:`${a} ${I(e)}`});return t},Fn=()=>{const a=[];a.push({value:"00",label:"00"});for(let t=1;t<=23;t++)a.push({value:I(t),label:`${I(t)}`});return a},ua=()=>C`
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.5V1.2764L6 7.5L12 1.2764V0.5L6 6.5L0 0.5Z" fill="#888888"/>
    </svg>
    `,Gn=()=>C`
    <svg
      class="kuc-base-datetime-calendar-header-1-23-1__group__button-icon"
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.06077 7L8.53044 1.53033L7.46978 0.469666L0.939453 7L7.46978 13.5303L8.53044 12.4697L3.06077 7Z"
        fill="#888888"
      />
    </svg>`;function Zt(a,t){const e=a.querySelector(".kuc-base-datetime-listbox-1-23-1__listbox"),i=Vt(a);if(!a.parentElement||!e||!i)return;const{inputToBottom:o,inputToTop:n}=i,u=a.tagName.toLowerCase()==="kuc-base-datetime-header-month-1-23-1"?360:300,c=18,d=a.parentElement.getBoundingClientRect().height;if(e.style.maxHeight=u+"px",a.parentElement.style.position="relative",o>=u){if(e.style.height=u+"px",t==="bottom"){e.style.top=d+"px";return}e.style.bottom=d+"px";return}if(t==="bottom"){e.style.top=d+"px",e.style.height=o-c+"px";return}e.style.height=n-c+"px",e.style.top="auto",e.style.bottom=a.parentElement.getBoundingClientRect().height+"px"}const Vt=a=>{var t,e;if(!a.parentElement)return{inputToBottom:0,inputToTop:0,inputToRight:0,inputToLeft:0};const i=(t=a.closest("kuc-base-date-1-23-1"))!==null&&t!==void 0?t:a.closest("kuc-mobile-base-date-1-23-1"),n=((e=i.getElementsByClassName("kuc-base-date-1-23-1__input")[0])!==null&&e!==void 0?e:i.getElementsByClassName("kuc-mobile-base-date-1-23-1__group")[0]).getBoundingClientRect().width,s=window.innerHeight-a.parentElement.getBoundingClientRect().bottom,r=a.parentElement.getBoundingClientRect().top,u=window.innerWidth-a.parentElement.getBoundingClientRect().left,c=a.parentElement.getBoundingClientRect().left+n;return{inputToBottom:s,inputToTop:r,inputToRight:u,inputToLeft:c}},Wn=()=>C`
    <svg
      class="kuc-base-datetime-calendar-header-1-23-1__group__button-icon"
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.93923 7L0.469557 1.53033L1.53022 0.469666L8.06055 7L1.53022 13.5303L0.469557 12.4697L5.93923 7Z"
        fill="#888888"
      />
    </svg>`,L={fromAttribute(a){return a===null},toAttribute(a){return a?null:""}},ot={fromAttribute:a=>!a||["en","ja","zh","zh-TW","es"].indexOf(a)===-1,toAttribute:a=>{const t=["en","ja","zh","zh-TW","es"];return t.indexOf(a)!==-1?a:t.indexOf(document.documentElement.lang)!==-1?document.documentElement.lang:"en"}},Q=a=>a instanceof HTMLElement?a:$n(a),Jt=a=>{if(a===void 0||a==="")return"";let t=[];return a.indexOf("-")>0&&(t=a.split("-")),t.length<2?`${a}-01-01`:t.length===2?`${I(t[0],4)}-${I(t[1])}-01`:t.length>2?`${I(t[0],4)}-${I(t[1])}-${I(t[2])}`:""},Be=a=>{if(a.length===5||a==="")return a;const e=a.indexOf(":"),i=a.substr(0,e),o=a.substr(e+1,5);return`${I(i)}:${I(o)}`},j=[];for(let a=0;a<256;++a)j.push((a+256).toString(16).slice(1));function Kn(a,t=0){return(j[a[t+0]]+j[a[t+1]]+j[a[t+2]]+j[a[t+3]]+"-"+j[a[t+4]]+j[a[t+5]]+"-"+j[a[t+6]]+j[a[t+7]]+"-"+j[a[t+8]]+j[a[t+9]]+"-"+j[a[t+10]]+j[a[t+11]]+j[a[t+12]]+j[a[t+13]]+j[a[t+14]]+j[a[t+15]]).toLowerCase()}let Si;const qn=new Uint8Array(16);function Yn(){if(!Si){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Si=crypto.getRandomValues.bind(crypto)}return Si(qn)}const ca={randomUUID:typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function Zn(a,t,e){a=a||{};const i=a.random??a.rng?.()??Yn();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,Kn(i)}function Jn(a,t,e){return ca.randomUUID&&!a?ca.randomUUID():Zn(a)}class k extends At{createRenderRoot(){return this}async throwErrorAfterUpdateComplete(t){throw await this.updateComplete,new Error(t)}}const f=(a,t,e)=>{const i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});return a.dispatchEvent(i)},x=a=>{const t="kuc-style-1-23-1";let e=document.getElementById(t);e||(e=document.createElement("style"),e.id=t,document.head.appendChild(e)),e.appendChild(document.createTextNode(a))},D=()=>Jn(),Xn=`
  kuc-base-error-1-23-1,
  kuc-base-error-1-23-1 *,
  kuc-base-error-1-23-1:lang(en),
  kuc-base-error-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-base-error-1-23-1:lang(es),
  kuc-base-error-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-base-error-1-23-1:lang(ja),
  kuc-base-error-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-base-error-1-23-1:lang(zh),
  kuc-base-error-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-base-error-1-23-1:lang(zh-TW),
  kuc-base-error-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-base-error-1-23-1 {
    width: 100%;
    font-size: 14px;
    display: inline-table;
    vertical-align: top;
  }
  kuc-base-error-1-23-1[hidden] {
    display: none;
  }
  .kuc-base-error-1-23-1__error {
    line-height: 1.5;
    padding: 4px 18px;
    box-sizing: border-box;
    background-color: #e74c3c;
    color: #ffffff;
    margin: 8px 0px;
    word-break: break-all;
    white-space: normal;
  }
  .kuc-base-error-1-23-1__error[hidden] {
    display: none;
  }
`;var Ii=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class Xt extends k{constructor(){super(...arguments),this.ariaLive="",this.guid="",this.text=""}render(){return _`
      ${this.ariaLive&&this.ariaLive!==""?_`
            <div
              class="kuc-base-error-1-23-1__error"
              .id="${this.guid}-error"
              role="alert"
              aria-live="${this.ariaLive}"
              ?hidden="${!this.text}"
            >
              ${this.text}
            </div>
          `:_`
            <div
              class="kuc-base-error-1-23-1__error"
              .id="${this.guid}-error"
              role="alert"
              ?hidden="${!this.text}"
            >
              ${this.text}
            </div>
          `}
    `}}Ii([l({type:String})],Xt.prototype,"ariaLive",void 0),Ii([l({type:String})],Xt.prototype,"guid",void 0),Ii([l({type:String})],Xt.prototype,"text",void 0),window.customElements.get("kuc-base-error-1-23-1")||(x(Xn),window.customElements.define("kuc-base-error-1-23-1",Xt));const Qn=`
  kuc-base-label-1-23-1,
  kuc-base-label-1-23-1 *,
  kuc-base-label-1-23-1:lang(en),
  kuc-base-label-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-base-label-1-23-1:lang(es),
  kuc-base-label-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-base-label-1-23-1:lang(ja),
  kuc-base-label-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
  }
  kuc-base-label-1-23-1:lang(zh),
  kuc-base-label-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
  }
  kuc-base-label-1-23-1:lang(zh-TW),
  kuc-base-label-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-base-label-1-23-1 {
    font-size: 14px;
    color: #333333;
    display: inline-table;
    vertical-align: top;
  }
  kuc-base-label-1-23-1[hidden] {
    display: none;
  }
  .kuc-base-label-1-23-1__required-icon {
    font-size: 20px;
    vertical-align: -3px;
    color: #e74c3c;
    margin-left: 4px;
    line-height: 1;
  }
  .kuc-base-label-1-23-1__required-icon[hidden] {
    display: none;
  }
`;var Ti=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class Qt extends k{constructor(){super(...arguments),this.requiredIcon=!1,this.guid="",this.text=""}render(){return _`
      ${this._getTextTemplate()}
      <span
        class="kuc-base-label-1-23-1__required-icon"
        ?hidden="${!this.requiredIcon}"
        >*</span
      >
    `}_getTextTemplate(){return this.guid&&this.guid!==""?_`
          <span class="kuc-base-label-1-23-1__text" .id="${this.guid}-group"
            >${this.text}</span
          >
        `:_` <span class="kuc-base-label-1-23-1__text">${this.text}</span> `}}Ti([l({type:Boolean})],Qt.prototype,"requiredIcon",void 0),Ti([l({type:String})],Qt.prototype,"guid",void 0),Ti([l({type:String})],Qt.prototype,"text",void 0),window.customElements.get("kuc-base-label-1-23-1")||(x(Qn),window.customElements.define("kuc-base-label-1-23-1",Qt));function S(a){if(!a||typeof a!="object")return{};const t={...a};for(const e in t)Object.prototype.hasOwnProperty.call(t,e)&&t[e]===void 0&&delete t[e];return t}function da(a){return!!(a===""||a===void 0||/(^(\d{1,4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$)|(^(\d{1,4})$)|(^(\d{1,4})-(0?[1-9]|1[0-2])$)/g.test(a))}function at(a){return!!(a===""||/^(2[0-3]|[01]?[0-9]):([0-9]|[0-5][0-9])$/.test(a))}function ha(a,t,e){const i=Math.round(a),o=ft(t),n=ft(e);return!isNaN(i)&&i>0&&i<=o-n}function Oe(a){const[t,e,i]=a.split("-"),o=new Date(`${a}T00:00:00`),n=o.getFullYear(),s=o.getMonth(),r=o.getDate();return n===Number(t)&&s===Number(e)-1&&r===Number(i)}function bt(a){return typeof a=="string"}function _a(a,t){const e=/(^(\d{4})-(0[0-9]|1[0-2])-(0[1-9]|([12][0-9]|3[01]))$)|(^(\d{4})$)|(^(\d{4})-(0[0-9]|1[0-2])$)/g,i=/(^([01][0-9]|2[0-3])$)|(^([01][0-9]|2[0-3]):([0-5][0-9]))$|(^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$/;return!(!e.test(a)||!i.test(t))}function $i(a){return a.length<2?!0:!a.some(t=>a.indexOf(t)!==a.lastIndexOf(t))}function Li(a){return!(a<.5||!nt(a))}const es=a=>{for(let t=0;t<a.length;t++)if(!Object.prototype.hasOwnProperty.call(a[t],"field"))return!1;return!0},ts=a=>{const t=a.map(i=>i.field);return t.some(function(i,o){return t.indexOf(i)!==o})};function is(a){return/^[1-9]\d*$/.test(a)}function nt(a){return typeof a=="number"&&!Number.isNaN(a)}function T(a){return Array.isArray(a)}const K=a=>{if(a instanceof HTMLElement)return!0;const t=document.createElement("div");return t.innerHTML=a,t.childElementCount>0},os=`
  kuc-attachment-1-23-1,
  kuc-attachment-1-23-1 *,
  kuc-attachment-1-23-1:lang(en),
  kuc-attachment-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-attachment-1-23-1:lang(ja),
  kuc-attachment-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
        sans-serif;
  }
  kuc-attachment-1-23-1:lang(zh),
  kuc-attachment-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
        Hei, "Heiti SC", sans-serif;
  }
  kuc-attachment-1-23-1:lang(zh-TW),
  kuc-attachment-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
        Hei,"Heiti SC",sans-serif;
  }
  kuc-attachment-1-23-1:lang(es),
  kuc-attachment-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-attachment-1-23-1 {
    font-size: 14px;
    display: inline-table;
    vertical-align: top;
    width: var(--kuc-attachment-width, 191px);
    min-width: var(--kuc-attachment-width, 191px);
  }
  kuc-attachment-1-23-1[hidden] {
    display: none;
  }
  .kuc-attachment-1-23-1__group {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    position: relative;
    display: block;
  }
  .kuc-attachment-1-23-1__group__label {
    display: inline-block;
    padding: 4px 0 8px 0;
    color: #333333;
    white-space: nowrap;
  }
  .kuc-attachment-1-23-1__group__label[hidden] {
    display: none;
  }
  .kuc-attachment-1-23-1__group__files {
    border: solid 1px #e3e7e8;
    background-color: #eeeeee;
    padding: 16px 4px;
    display: block;
    font-size: 14px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    width: var(--kuc-attachment-width, auto);
    height: var(--kuc-attachment-height, auto);
  }
  .kuc-attachment-1-23-1__group__files--disabled {
    cursor: not-allowed;
  }
  .kuc-attachment-1-23-1__group__files__browse-button {
    border: 1px solid transparent;
    position: relative;
    display: inline-block;
    margin-right: 16px;
    padding: 8px;
    text-decoration: none;
  }
  .kuc-attachment-1-23-1__group__files__browse-button[hidden]{
    display: none;
  }
  .kuc-attachment-1-23-1__group__files__browse-button:focus-within {
    border: 1px solid #3498db;
  }
  .kuc-attachment-1-23-1__group__files__browse-button:hover
  .kuc-attachment-1-23-1__group__files__browse-button__text {
    color: #217dbb;
  }
  .kuc-attachment-1-23-1__group__files__browse-button__text {
    color: #3498db;
    font-size: 14px;
  }
  .kuc-attachment-1-23-1__group__files__browse-button__input-container {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: inline-block;
  }
  .kuc-attachment-1-23-1__group__files__browse-button__input-container__input {
    cursor: pointer;
    font-size: 999px;
    vertical-align: middle;
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }
  .kuc-attachment-1-23-1__group__files__display-area {
    padding-inline-start: 0px;
    list-style-type: disc;
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
  .kuc-attachment-1-23-1__group__files__display-area__item {
    position: relative;
    margin-bottom: 8px;
    height: auto;
    min-height: 24px;
    border: 2px solid #f1f4f5;
    background-color: #f1f4f5;
    list-style: none;
    display: flex;
    align-items: center;
  }
  .kuc-attachment-1-23-1__group__files__display-area__item__name {
    display: inline-block;
    padding: 3px calc(4.6em + 4px) 3px 26px;
    width: 100%;
    max-width: 177px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    font-size: var(--kuc-attachment-item-font-size, 14px);
    line-height: 1.2;
  }
  .kuc-attachment-1-23-1__group__files__display-area__item__remove-button__container {
    display: inline-block;
    position: absolute;
    top: calc(50% - 12px);
    left: 0;
    width: 24px;
    height: 24px;
  }
  .kuc-attachment-1-23-1__group__files__display-area__item__remove-button__container[hidden] {
    display: none;
  }
  .kuc-attachment-1-23-1__group__files__display-area__item__remove-button__container__button {
    background-color: #f2f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    padding: 0px;
    width:100%;
    height:100%;
  }
  .kuc-attachment-1-23-1__group__files__display-area__item__remove-button__container__button:hover {
    background: #d8e1e6;
  }
  .kuc-attachment-1-23-1__group__files__display-area__item__remove-button__container__button:focus-within {
    border: 1px solid #3498db;
  }
  .kuc-attachment-1-23-1__group__files__display-area__item__remove-button__container__button:focus {
    outline: none;
  }
  .kuc-attachment-1-23-1__group__files__display-area__item__size {
    display: inline-block;
    position: absolute;
    right: 0;
    color: #888888;
    padding: 0 3px 0 0;
    max-width: 4.6em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    font-size: var(--kuc-attachment-item-font-size, 14px);
    line-height: 1.2;
  }
  .kuc-attachment-1-23-1__group__files__droppable {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto 0;
  }
  .kuc-attachment-1-23-1__group__files__droppable[hidden] {
    display: none;
  }
  .kuc-attachment-1-23-1__group__files__droppable__text {
    background-color: #e2f2fe;
    border: dashed 2px #3498db;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: #3498db;
    font-size: 14px;
  }
  .kuc-attachment-1-23-1__group__files__browse-message {
    display: inline-block;
    color: var(--kuc-attachment-message-color, #888888);
    font-size: var(--kuc-attachment-message-font-size, 14px);
    margin: 3px 0 0;
    word-break: break-all;
  }
  .kuc-attachment-1-23-1__group__files__browse-message--disabled {
    color: #888888;
  }
  .kuc-attachment-1-23-1__group__files__browse-message[hidden] {
    display: none;
  }
  .kuc-attachment-1-23-1__group__files__not-droppable--dragenter {
    visibility: hidden;
  }
`;var F=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Ai;(()=>{if(Ai=window.customElements.get("kuc-attachment-1-23-1"),Ai)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.language="auto",this.message="",this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.files=[],this._isDraging=!1,this._dragEnterCounter=0,this._locale=this._getLocale(),this._isFileOrDirectoryDrag=o=>{if(!o.dataTransfer)return!1;if(o.dataTransfer.items!==void 0){for(let n=0;n<o.dataTransfer.items.length;n++)if(o.dataTransfer.items[n].kind.toLowerCase()==="file")return!0}if(o.dataTransfer.types!==void 0){for(let n=0;n<o.dataTransfer.types.length;n++)if(o.dataTransfer.types[n].toLowerCase()==="files")return!0}return!1},this._GUID=D();const i=S(e);Object.assign(this,i)}shouldUpdate(e){return e.has("files")&&!T(this.files)?(this.throwErrorAfterUpdateComplete(y.FILES.IS_NOT_ARRAY),!1):!0}willUpdate(e){return e.has("language")&&(this._locale=this._getLocale()),!0}render(){return _`
      <div class="kuc-attachment-1-23-1__group">
        <label
          class="kuc-attachment-1-23-1__group__label"
          ?hidden="${!this.label}"
          for="${this._GUID}-input"
          @click="${this._handleClickLabel}"
        >
          <kuc-base-label-1-23-1
            .text="${this.label}"
            .requiredIcon="${this.requiredIcon}"
          ></kuc-base-label-1-23-1>
        </label>
        <div
          class="kuc-attachment-1-23-1__group__files ${this.disabled?" kuc-attachment-1-23-1__group__files--disabled":""}"
          @dragenter="${this._handleDragEnter}"
          @dragover="${this._handleDragOver}"
          @dragleave="${this._handleDragLeave}"
          @drop="${this._handleDragDrop}"
        >
          <div
            class="kuc-attachment-1-23-1__group__files__droppable"
            ?hidden="${!this._isDraging}"
          >
          <div class="kuc-attachment-1-23-1__group__files__droppable__text">${this._locale.ATTACHMENT_DRAG_DROP_ZONE}</div>
          </div>
          <ul
            class="kuc-attachment-1-23-1__group__files__display-area${this._isDraging?" kuc-attachment-1-23-1__group__files__not-droppable--dragenter":""}"
          >
          ${this.files.map((e,i)=>this._getAttachmentItemTemplate(e,i))}
          </ul>
          <div class="kuc-attachment-1-23-1__group__files__browse-button${this._isDraging?" kuc-attachment-1-23-1__group__files__not-droppable--dragenter":""}"
          ?hidden="${this.disabled}">
            <span class="kuc-attachment-1-23-1__group__files__browse-button__text">${this._locale.ATTACHMENT_BROWSE}</span>
            <div class="kuc-attachment-1-23-1__group__files__browse-button__input-container">
              <input class="kuc-attachment-1-23-1__group__files__browse-button__input-container__input" type="file" multiple 
              .id="${this._GUID}-input"
              aria-required="${this.requiredIcon}"
              aria-invalid="${this.error}"
              aria-describedby="${this._GUID}-error"
              @change="${this._handleChangeFiles}"></input>
            </div>
          </div>
          <p class="kuc-attachment-1-23-1__group__files__browse-message${this.disabled?" kuc-attachment-1-23-1__group__files__browse-message--disabled":""}"
            ?hidden="${!this.message}"
          >
            ${this.message}
          </p>
        </div>
        <kuc-base-error-1-23-1
          class="kuc-attachment-1-23-1__error"
          ?hidden="${!this.error}"
          .text="${this.error}"
          .guid="${this._GUID}"
        ></kuc-base-error-1-23-1>
      </div>
    `}_getAttachmentItemTemplate(e,i){return _`
        <li class="kuc-attachment-1-23-1__group__files__display-area__item">
          <div
            title="${e.name||""}"
            class="kuc-attachment-1-23-1__group__files__display-area__item__name"
          >
            ${e.name||""}
          </div>
          <div
            class="kuc-attachment-1-23-1__group__files__display-area__item__remove-button__container"
            ?hidden="${this.disabled}"
          >
            <button
              class="kuc-attachment-1-23-1__group__files__display-area__item__remove-button__container__button"
              type="button"
              aria-label="Cancel File"
              data-file-index="${i}"
              @click="${this._handleClickFileRemove}"
              tabindex="0"
            >
              ${this._getRemoveButtonIcon()}
            </button>
          </div>
          <span class="kuc-attachment-1-23-1__group__files__display-area__item__size">
            ${this._getFileSize(e.size)}
          </span>
        </li>
      `}async updated(e){await this.updateComplete,this._updateFileNameMaxWidth()}_updateFileNameMaxWidth(){const o=this._labelEl.getBoundingClientRect().width;this._fileItemsEl.forEach(n=>{n.style.maxWidth=`calc(var(--kuc-attachment-width, ${o<191?191:o}px) - 14px)`})}_getRemoveButtonIcon(){return C`<svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.93933 7.00001L1.96966 3.03034L1.43933 2.50001L2.49999 1.43935L3.03032 1.96968L6.99999 5.93935L10.9697 1.96968L11.5 1.43935L12.5607 2.50001L12.0303 3.03034L8.06065 7.00001L12.0303 10.9697L12.5607 11.5L11.5 12.5607L10.9697 12.0303L6.99999 8.06067L3.03032 12.0303L2.49999 12.5607L1.43933 11.5L1.96966 10.9697L5.93933 7.00001Z"
          fill="#a8a8a8"
        />
      </svg>`}_getLanguage(){const e=["en","ja","zh","zh-TW","es"];return e.indexOf(this.language)!==-1?this.language:e.indexOf(document.documentElement.lang)!==-1?document.documentElement.lang:"en"}_getLocale(){switch(this._getLanguage()){case"en":return Jo;case"zh":return wn;case"zh-TW":return Cn;case"ja":return yn;case"es":return En;default:return Jo}}_handleClickFileRemove(e){const i=e.currentTarget,o=parseInt(i.getAttribute("data-file-index"),10);if(this.files){o===this.files.length-1&&this._inputEl.focus();const n=[...this.files];this.files.splice(o,1);const s={oldFiles:n,files:this.files,type:"remove-file",fileIndex:[o]};f(this,"change",s),this.requestUpdate(),o<=this.files.length-1&&this._fileRemoveButtons[o].focus()}}_handleClickLabel(e){e.preventDefault()}_handleDragEnter(e){if(!this.disabled&&(this._dragEnterCounter++,this._dragEnterCounter===1&&this._isFileOrDirectoryDrag(e))){e.preventDefault();const i=2,o=1;this._groupFilesEl.style.height=this._groupFilesEl.getBoundingClientRect().height+"px",this._dragTextEl.style.width=this._groupFilesEl.getBoundingClientRect().width-o*2+"px",this._dragTextEl.style.height=this._groupFilesEl.getBoundingClientRect().height-(o+i)*2+"px",this._isDraging=!0}}_handleDragOver(e){this.disabled||(e.stopPropagation(),this._isFileOrDirectoryDrag(e)&&e.preventDefault())}_handleDragDrop(e){this.disabled||!this._isDraging||(e.preventDefault(),this._handleDragLeave(),this._isFileDrop(e)&&this._addFiles(e))}_isFileDrop(e){var i;if(e.dataTransfer&&e.dataTransfer.items){for(let o=0;o<e.dataTransfer.items.length;o++)if(typeof e.dataTransfer.items[o].webkitGetAsEntry=="function"&&(!((i=e.dataTransfer.items[o].webkitGetAsEntry())===null||i===void 0)&&i.isDirectory))return!1}return!0}_handleDragLeave(){this.disabled||(this._dragEnterCounter--,this._dragEnterCounter===0&&(this._groupFilesEl.style.height="var(--kuc-attachment-height, auto)",this._isDraging=!1))}_handleChangeFiles(e){e.preventDefault(),e.stopPropagation(),this._addFiles(e)}_addFiles(e){if(this.files){let i=e.dataTransfer?e.dataTransfer.files:e.target.files;i=Object.keys(i).map(r=>i[r]);const o=[...this.files],n=i.map((r,u)=>o.length+u);i.forEach(r=>this.files.push(r));const s={oldFiles:o,files:this.files,type:"add-file",fileIndex:n};f(this,"change",s),this.requestUpdate()}this._inputEl.value=""}_getFileSize(e){return typeof e=="number"?this._formatFileSize(e):is(e)?this._formatFileSize(parseInt(e,10)):xn}_formatFileSize(e){return e>=Zo?Math.round(e/Zo)+" GB":e>=Yo?Math.round(e/Yo)+" MB":e>=qo?Math.round(e/qo)+" KB":Math.round(e)+" bytes"}}F([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),F([l({type:String})],a.prototype,"error",void 0),F([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),F([l({type:String})],a.prototype,"label",void 0),F([l({type:String,attribute:"lang",reflect:!0,converter:ot})],a.prototype,"language",void 0),F([l({type:String})],a.prototype,"message",void 0),F([l({type:Boolean})],a.prototype,"disabled",void 0),F([l({type:Boolean})],a.prototype,"requiredIcon",void 0),F([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),F([l({type:Array})],a.prototype,"files",void 0),F([v()],a.prototype,"_isDraging",void 0),F([g(".kuc-attachment-1-23-1__group__files")],a.prototype,"_groupFilesEl",void 0),F([g(".kuc-attachment-1-23-1__group__files__droppable__text")],a.prototype,"_dragTextEl",void 0),F([g(".kuc-attachment-1-23-1__group__files__browse-button__input-container__input")],a.prototype,"_inputEl",void 0),F([g(".kuc-attachment-1-23-1__group__label")],a.prototype,"_labelEl",void 0),F([z(".kuc-attachment-1-23-1__group__files__display-area__item__name")],a.prototype,"_fileItemsEl",void 0),F([z(".kuc-attachment-1-23-1__group__files__display-area__item__remove-button__container__button")],a.prototype,"_fileRemoveButtons",void 0),window.customElements.define("kuc-attachment-1-23-1",a),x(os),Ai=a})();const as=`
  kuc-button-1-23-1,
  kuc-button-1-23-1 *,
  kuc-button-1-23-1:lang(en),
  kuc-button-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-button-1-23-1:lang(es),
  kuc-button-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-button-1-23-1:lang(ja),
  kuc-button-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  kuc-button-1-23-1:lang(zh),
  kuc-button-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti, Hei,
      "Heiti SC", sans-serif;
  }
  kuc-button-1-23-1:lang(zh-TW),
  kuc-button-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-button-1-23-1 {
    display: inline-block;
    vertical-align: top;
  }
  kuc-button-1-23-1[hidden] {
    display: none;
  }
  .kuc-button-1-23-1__button {
    display: grid;
    align-items: center;
    align-content: center;
    font-size: var(--kuc-button-font-size, 16px);
    width: var(--kuc-button-width, "auto");
    height: var(--kuc-button-height, 48px);
    min-width: var(--kuc-button-width, 163px);
    padding: 0px 16px;
    user-select: none;
    white-space: nowrap;
  }
  .kuc-button-1-23-1__button--normal {
    background-color: var(--kuc-button-background-color, #f7f9fa);
    color: var(--kuc-button-text-color, #3498db);
    border: 1px solid #e3e7e8;
  }
  .kuc-button-1-23-1__button--normal:hover,
  .kuc-button-1-23-1__button--normal:focus-visible,
  .kuc-button-1-23-1__button--normal:active {
    cursor: pointer;
  }
  .kuc-button-1-23-1__button--normal:hover {
    background-color: var(--kuc-button-background-color-hover, #c8d6dd);
  }
  .kuc-button-1-23-1__button--normal:focus-visible {
    background-color: var(--kuc-button-background-color-focus, #c8d6dd);
  }
  .kuc-button-1-23-1__button--normal:active {
    background-color: var(--kuc-button-background-color-active, #c8d6dd);
  }
  .kuc-button-1-23-1__button--submit {
    background-color: var(--kuc-button-background-color, #3498db);
    color: var(--kuc-button-text-color, #ffffff);
    border: 1px solid #e3e7e8;
  }
  .kuc-button-1-23-1__button--submit:hover,
  .kuc-button-1-23-1__button--submit:focus-visible,
  .kuc-button-1-23-1__button--submit:active {
    cursor: pointer;
  }
  .kuc-button-1-23-1__button--submit:hover {
    background-color: var(--kuc-button-background-color-hover, #1d6fa5);
  }
  .kuc-button-1-23-1__button--submit:focus-visible {
    background-color: var(--kuc-button-background-color-focus, #1d6fa5);
  }
  .kuc-button-1-23-1__button--submit:active {
    background-color: var(--kuc-button-background-color-active, #1d6fa5);
  }
  .kuc-button-1-23-1__button--alert {
    background-color: var(--kuc-button-background-color, #e74c3c);
    color: var(--kuc-button-text-color, #ffffff);
    border: 1px solid #e3e7e8;
  }
  .kuc-button-1-23-1__button--alert:hover,
  .kuc-button-1-23-1__button--alert:focus-visible,
  .kuc-button-1-23-1__button--alert:active {
    cursor: pointer;
  }
  .kuc-button-1-23-1__button--alert:hover {
    background-color: var(--kuc-button-background-color-hover, #bf2718);
  }
  .kuc-button-1-23-1__button--alert:focus-visible {
    background-color: var(--kuc-button-background-color-focus, #bf2718);
  }
  .kuc-button-1-23-1__button--alert:active {
    background-color: var(--kuc-button-background-color-active, #bf2718);
  }
  .kuc-button-1-23-1__button:disabled {
    background-color: #d4d7d7;
    border: 1px solid #e3e7e8;
    color: #888888;
    cursor: not-allowed;
  }
  .kuc-button-1-23-1__button--normal:focus-visible,
  .kuc-button-1-23-1__button--submit:focus-visible,
  .kuc-button-1-23-1__button--alert:focus-visible {
    outline: 1px solid #3498db;
  }
`;var st=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let ei;(()=>{if(ei=window.customElements.get("kuc-button-1-23-1"),ei)return;class a extends k{constructor(e){super(),this.className="",this.id="",this.text="",this.type="normal",this.content="",this.disabled=!1,this.visible=!0,this._content="";const i=S(e);Object.assign(this,i)}_handleClickButton(e){e.stopPropagation(),f(this,"click")}_getButtonColorType(){return this.type==="normal"||this.type==="submit"||this.type==="alert"?this.type:"normal"}willUpdate(e){(e.has("content")||e.has("text"))&&(this.content!==null&&this.content!==void 0&&this.content!==""?K(this.content)?this._content=Q(this.content):this._content=this.content:this._content=this.text)}render(){return _`
        <button
          type="button"
          class="kuc-button-1-23-1__button kuc-button-1-23-1__button--${this._getButtonColorType()}"
          ?disabled="${this.disabled}"
          @click="${this._handleClickButton}"
        >
          ${this._content}
        </button>
      `}}st([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),st([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),st([l({type:String})],a.prototype,"text",void 0),st([l({type:String})],a.prototype,"type",void 0),st([l()],a.prototype,"content",void 0),st([l({type:Boolean})],a.prototype,"disabled",void 0),st([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),window.customElements.define("kuc-button-1-23-1",a),x(as),ei=a})();const pa=ei,ns=`
  kuc-checkbox-1-23-1,
  kuc-checkbox-1-23-1 *,
  kuc-checkbox-1-23-1:lang(en),
  kuc-checkbox-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-checkbox-1-23-1:lang(es),
  kuc-checkbox-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-checkbox-1-23-1:lang(ja),
  kuc-checkbox-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-checkbox-1-23-1:lang(zh),
  kuc-checkbox-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-checkbox-1-23-1:lang(zh-TW),
  kuc-checkbox-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-checkbox-1-23-1 {
    font-size: 14px;
    color: #333333;
    display: inline-table;
    vertical-align: top;
    width: var(--kuc-checkbox-menu-width, 239px);
    min-width: var(--kuc-checkbox-menu-width, 239px);
    line-height: 1.5;
  }
  kuc-checkbox-1-23-1[hidden] {
    display: none;
  }
  .kuc-checkbox-1-23-1__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    width: 100%;
    margin: 0px;
  }
  .kuc-checkbox-1-23-1__group__select-menu {
    white-space: nowrap;
    width: var(--kuc-checkbox-menu-width, auto);
    height: var(--kuc-checkbox-menu-height, auto);
    color: var(--kuc-checkbox-menu-color, #333333);
    font-size: var(--kuc-checkbox-menu-font-size, 14px);
    display: flex;
    align-items: flex-start;
  }
  .kuc-checkbox-1-23-1__group__select-menu[itemLayout="vertical"] {
    display: block;
  }
  .kuc-checkbox-1-23-1__group__label {
    display: inline-block;
    padding: 4px 0 8px 0;
    white-space: nowrap;
  }
  .kuc-checkbox-1-23-1__group__label[hidden] {
    display: none;
  }
  .kuc-checkbox-1-23-1__group__select-menu[borderVisible] {
    border-color: #e3e7e8;
    border-width: 1px;
    border-style: solid;
    padding: 4px 0 0 4px;
  }
  .kuc-checkbox-1-23-1__group__select-menu__item {
    margin-bottom: 4px;
    margin-right: 16px;
    padding: 4px;
    border: 1px solid transparent;
    position: relative;
    white-space: normal;
    word-wrap: normal;
    display: flex;
    align-items: center;
  }
  .kuc-checkbox-1-23-1__group__select-menu__item[focused] {
    border: 1px solid #3498db;
  }
  .kuc-checkbox-1-23-1__group__select-menu__item__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .kuc-checkbox-1-23-1__group__select-menu__item__input:hover
    + .kuc-checkbox-1-23-1__group__select-menu__item__label {
    color: var(--kuc-checkbox-menu-color-hover, #666666);
  }
  .kuc-checkbox-1-23-1__group__select-menu__item__label__icon {
    position: absolute;
    left: -30px;
    box-sizing: border-box;
    width: 21px;
    height: 21px;
    box-shadow: 1px 1px 3px #f5f5f5 inset, -1px -1px 3px #f5f5f5 inset;
    content: "";
  }
  .kuc-checkbox-1-23-1__group__select-menu__item__input[disabled]
    + .kuc-checkbox-1-23-1__group__select-menu__item__label {
    color: #888888;
    cursor: not-allowed;
  }
  .kuc-checkbox-1-23-1__group__select-menu__item__label {
    cursor: pointer;
    position: relative;
    margin-left: 32px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    white-space: nowrap;
    min-height: 24px;
    line-height: 1.2;
  }
  `;var Y=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Di;(()=>{if(Di=window.customElements.get("kuc-checkbox-1-23-1"),Di)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.itemLayout="horizontal",this.label="",this.borderVisible=!0,this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this.selectedIndex=[],this.value=[],this._valueMapping={},this._GUID=D();const i=S(e);this._setInitialValue(i),Object.assign(this,i)}_setInitialValue(e){const i="value"in e,o="selectedIndex"in e,n=e.selectedIndex||[];if(!i&&o){if(!T(n))return;const s=this._getValueMapping(e);this.value=this._getValidValue(s,n)}}shouldUpdate(e){return e.has("items")&&!T(this.items)?(this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1):e.has("value")&&!T(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_ARRAY),!1):e.has("selectedIndex")&&!T(this.selectedIndex)?(this.throwErrorAfterUpdateComplete(y.SELECTED_INDEX.IS_NOT_ARRAY),!1):!0}willUpdate(e){if(e.has("value")){if(this.value.length>0)return;this.selectedIndex=[]}}_getNewValueMapping(e,i){const o=parseInt(i,10),n=Object.keys(this._valueMapping),s={...this._valueMapping};return n.indexOf(i)>-1?(delete s[o],s):(s[o]=e,s)}_handleChangeInput(e){e.stopPropagation();const i=e.target,o=i.dataset.index||"0",n=i.value,s=this.value?[...this.value]:this.value,r=this._getNewValueMapping(n,o),u=this.items.map(p=>p.value),c=Object.values(r).filter(p=>u.indexOf(p)>-1);if(c===s)return;const d=Object.keys(r).map(p=>parseInt(p,10));this.value=c,this.selectedIndex=d,f(this,"change",{oldValue:s,value:c})}_handleFocusInput(e){e.target.parentNode.setAttribute("focused","")}_handleBlurInput(e){e.target.parentNode.removeAttribute("focused")}_getCheckboxIconSvgTemplate(e,i){return C`
    <svg
      class="kuc-checkbox-1-23-1__group__select-menu__item__label__icon"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="19"
        height="19"
        rx="1"
        fill="white"
        stroke="${this._getSVGStrokeValue(e,i)}"
        stroke-width="2"/>
      ${i?C`<path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 11L6.5 9L9.5 11.5L14.5 6L16 7.5L9.5 14.5L5 11Z"
            fill="${e?"#d8d8d8":"#3498db"}"/>`:""}
    </svg>
  `}_getSVGStrokeValue(e,i){return e?"#d8d8d8":i?"#3498db":"#d8d8d8"}_isCheckedItem(e,i){const o=Object.values(this._valueMapping),n=Object.keys(this._valueMapping);return o.filter((r,u)=>r===e.value&&i===parseInt(n[u],10)).length>0}_getItemTemplate(e,i){const o=this._isCheckedItem(e,i),n=e.disabled||this.disabled;return _`
        <div
          class="kuc-checkbox-1-23-1__group__select-menu__item"
          itemLayout="${this.itemLayout}"
        >
          <input
            type="checkbox"
            aria-describedby="${this._GUID}-error"
            aria-required="${this.requiredIcon}"
            data-index="${i}"
            id="${this._GUID}-item-${i}"
            class="kuc-checkbox-1-23-1__group__select-menu__item__input"
            name="${this._GUID}-group"
            value="${e.value!==void 0?e.value:""}"
            ?disabled="${n}"
            @change="${this._handleChangeInput}"
            @focus="${this._handleFocusInput}"
            @blur="${this._handleBlurInput}"
          />
          <label
            for="${this._GUID}-item-${i}"
            class="kuc-checkbox-1-23-1__group__select-menu__item__label"
            >${this._getCheckboxIconSvgTemplate(n,o)}${e.label===void 0?e.value:e.label}
          </label>
        </div>
      `}update(e){(e.has("items")||e.has("value")||e.has("selectedIndex"))&&(this._valueMapping=this._getValueMapping({items:this.items,value:this.value,selectedIndex:this.selectedIndex}),this._setValueAndSelectedIndex()),super.update(e)}render(){return _`
        <div
          class="kuc-checkbox-1-23-1__group"
          role="group"
          aria-labelledby="${this._GUID}-group"
        >
          <div class="kuc-checkbox-1-23-1__group__label" ?hidden="${!this.label}">
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .guid="${this._GUID}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </div>
          <div
            class="kuc-checkbox-1-23-1__group__select-menu"
            ?borderVisible="${this.borderVisible}"
            itemLayout="${this.itemLayout}"
          >
            ${this.items.map((e,i)=>this._getItemTemplate(e,i))}
          </div>
          <kuc-base-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
            ariaLive="assertive"
          ></kuc-base-error-1-23-1>
        </div>
      `}updated(){this._inputEls.forEach(e=>{e.checked=this.value.indexOf(e.value)>-1})}_getValueMapping(e){const i=e.items||[],o=e.value||[],n=e.selectedIndex||[],s=i.map(d=>d.value||""),r=Object.assign({},s),u={};if(o.length===0){const d=this._getValidValue(r,n);return n.forEach((h,p)=>u[h]=d[p]),u}return this._getValidSelectedIndex(r).forEach((d,h)=>u[d]=o[h]),u}_getValidValue(e,i){return i.filter(o=>e[o]).map(o=>e[o])}_getValidSelectedIndex(e){const i=[];for(let o=0;o<this.value.length;o++){const n=this.selectedIndex[o];if(e[n]===this.value[o]){i.push(n);continue}const s=this.items.findIndex(r=>r.value===this.value[o]);i.push(s)}return i}_setValueAndSelectedIndex(){this.value=Object.values(this._valueMapping),this.selectedIndex=Object.keys(this._valueMapping).map(e=>parseInt(e,10))}}Y([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),Y([l({type:String})],a.prototype,"error",void 0),Y([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),Y([l({type:String})],a.prototype,"itemLayout",void 0),Y([l({type:String})],a.prototype,"label",void 0),Y([l({type:Boolean})],a.prototype,"borderVisible",void 0),Y([l({type:Boolean})],a.prototype,"disabled",void 0),Y([l({type:Boolean})],a.prototype,"requiredIcon",void 0),Y([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),Y([l({type:Array})],a.prototype,"items",void 0),Y([l({type:Array})],a.prototype,"selectedIndex",void 0),Y([l({type:Array})],a.prototype,"value",void 0),Y([z(".kuc-checkbox-1-23-1__group__select-menu__item__input")],a.prototype,"_inputEls",void 0),Y([v()],a.prototype,"_valueMapping",void 0),window.customElements.define("kuc-checkbox-1-23-1",a),x(ns),Di=a})();const ss=`
  kuc-combobox-1-23-1,
  kuc-combobox-1-23-1 *,
  kuc-combobox-1-23-1:lang(en),
  kuc-combobox-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-combobox-1-23-1:lang(es),
  kuc-combobox-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-combobox-1-23-1:lang(ja),
  kuc-combobox-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-combobox-1-23-1:lang(zh),
  kuc-combobox-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-combobox-1-23-1:lang(zh-TW),
  kuc-combobox-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體", "Microsoft JhengHei", "新宋体", NSimSun, STHeiti, Hei, "Heiti SC", sans-serif;
  }
  kuc-combobox-1-23-1 {
    position: relative;
    display: inline-table;
    font-size: 14px;
    color: #333333;
    width: var(--kuc-combobox-toggle-width, 180px);
    vertical-align: top;
    line-height: 1.5;
  }
  kuc-combobox-1-23-1[hidden] {
    display: none;
  }
  .kuc-combobox-1-23-1__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    width: 100%;
    margin: 0px;
    position: relative;
  }
  .kuc-combobox-1-23-1__group__label {
    padding: 4px 0px 8px 0px;
    display: inline-block;
    white-space: nowrap;
  }
  .kuc-combobox-1-23-1__group__label[hidden] {
    display: none;
  }
  .kuc-combobox-1-23-1__group__toggle {
    position: relative;
    display: flex;
    width: var(--kuc-combobox-toggle-width);
  }
  input[type=text].kuc-combobox-1-23-1__group__toggle__input {
    width: 100%;
    height: var(--kuc-combobox-toggle-height, 40px);
    box-sizing: border-box;
    box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
    border: 1px solid #e3e7e8;
    background-color: #ffffff;
    color: var(--kuc-combobox-toggle-color, #000000);
    font-size: var(--kuc-combobox-font-size, 14px);
    line-height: 1.5;
    padding: 0 40px 0 8px;
    margin: 0;
  }
  input[type=text].kuc-combobox-1-23-1__group__toggle__input:focus {
    outline: none;
    border: 1px solid #3498db;
    background-color: #e2f2fe;
    box-shadow: none;
  }
  input[type=text].kuc-combobox-1-23-1__group__toggle__input:disabled,
  .kuc-combobox-1-23-1__group__toggle__icon__button:disabled {
    background-color: #d4d7d7;
    box-shadow: none;
    cursor: not-allowed;
    color: #888888;
  }
  .kuc-combobox-1-23-1__group__toggle__icon {
    position: absolute;
    right: 0px;
    top: 2px;
    border-left: 1px solid #e3e7e8;
  }
  .kuc-combobox-1-23-1__group__toggle__icon__button {
    width: 40px;
    height: calc(var(--kuc-combobox-toggle-height, 40px) - 4px);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    border-style: none;
    background-color: transparent;
    cursor: pointer;
  }
  .kuc-combobox-1-23-1__group__select-menu {
    min-width: 280px;
    color: var(--kuc-combobox-menu-color);
    padding: 8px 0;
    border: 1px solid #e3e7e8;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 2000;
    margin: 0;
    list-style: none;
  }
  .kuc-combobox-1-23-1__group__select-menu[hidden] {
    display: none;
  }
  .kuc-combobox-1-23-1__group__select-menu__item {
    font-size: var(--kuc-combobox-font-size, 14px);
    padding: 8px 16px 8px 24px;
    line-height: 1;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
  }
  .kuc-combobox-1-23-1__group__select-menu__item:lang(en) b,
  .kuc-combobox-1-23-1__group__select-menu__item:lang(ja) b,
  .kuc-combobox-1-23-1__group__select-menu__item:lang(zh) b,
  .kuc-combobox-1-23-1__group__select-menu__item:lang(zh-TW) b{
    font-weight: 700;
  }
  .kuc-combobox-1-23-1__group__select-menu__item__icon {
    position: absolute;
    top: 50%;
    left: 6px;
    margin-top: -5px;
  }
  .kuc-combobox-1-23-1__group__select-menu__item[aria-selected="true"] {
    color: var(--kuc-combobox-menu-color-selected, #3498db);
  }
  .kuc-combobox-1-23-1__group__select-menu__item--disabled,
  .kuc-combobox-1-23-1__group__select-menu__item--disabled[aria-selected="true"] {
    background-color: #d4d7d7;
    cursor: not-allowed;
    color: #888888;
  }
  .kuc-combobox-1-23-1__group__select-menu__highlight[role="option"] {
    background-color: #e2f2fe;
  }
`;var M=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Vi;(()=>{if(Vi=window.customElements.get("kuc-combobox-1-23-1"),Vi)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.placeholder="",this.value="",this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this._selectorVisible=!1,this._searchText="",this._DISABLED_CLASS="kuc-combobox-1-23-1__group__select-menu__item--disabled",this._query="",this._matchingItems=[],this._GUID=D();const i=S(e);this._handleClickDocument=this._handleClickDocument.bind(this),this._handleScrollMenu=this._handleScrollMenu.bind(this),Object.assign(this,i)}shouldUpdate(e){if(e.has("items")){if(!T(this.items))return this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1;const i=this.items.map(o=>o.value);if(!$i(i))return this.throwErrorAfterUpdateComplete(y.ITEMS.IS_DUPLICATED),!1}return e.has("value")&&!bt(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_STRING),!1):!0}willUpdate(e){e.has("value")&&(this._searchText=this._getSelectedLabel()||"")}render(){return _`
        <div class="kuc-combobox-1-23-1__group">
          <div
            class="kuc-combobox-1-23-1__group__label"
            id="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </div>
          <div class="kuc-combobox-1-23-1__group__toggle">
            <input
              class="kuc-combobox-1-23-1__group__toggle__input"
              role="combobox"
              type="text"
              .value="${this._searchText}"
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-labelledby="${this._GUID}-label"
              aria-controls="${this._GUID}-listbox"
              aria-describedby="${this._GUID}-error"
              aria-expanded="${this._selectorVisible}"
              aria-required="${this.requiredIcon}"
              placeholder="${this.placeholder}"
              ?disabled="${this.disabled}"
              @change="${this._handleChangeComboboxInput}"
              @input="${this._handleInputComboboxInput}"
              @keydown="${this._handleKeyDownComboboxInput}"
              @click="${this._handleClickComboboxInput}"
              @blur="${this._handleBlurComboboxInput}"
            />
            <div class="kuc-combobox-1-23-1__group__toggle__icon">
              <button
                class="kuc-combobox-1-23-1__group__toggle__icon__button"
                tabindex="-1"
                type="button"
                aria-labelledby="${this._GUID}-label"
                aria-controls="${this._GUID}-listbox"
                aria-expanded="${this._selectorVisible}"
                ?disabled="${this.disabled}"
                @click="${this._handleClickToggleButton}"
              >
                ${this._getToggleIconSvgTemplate()}
              </button>
            </div>
          </div>
          <ul
            class="kuc-combobox-1-23-1__group__select-menu"
            role="listbox"
            id="${this._GUID}-listbox"
            aria-labelledby="${this._GUID}-label"
            aria-hidden="${!this._selectorVisible}"
            ?hidden="${!this._selectorVisible}"
            @mouseleave="${this._handleMouseLeaveMenu}"
            @mousedown="${this._handleMouseDownMenu}"
          >
            ${this._matchingItems.map((e,i)=>this._getItemTemplate(e,i))}
          </ul>
          <kuc-base-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
            ariaLive="assertive"
          ></kuc-base-error-1-23-1>
        </div>
      `}firstUpdated(){window.addEventListener("resize",()=>{this._actionResizeScrollWindow()}),window.addEventListener("scroll",()=>{this._actionResizeScrollWindow()})}async updated(e){super.updated(e),await this.updateComplete,this._selectorVisible?(this._menuEl.addEventListener("scroll",this._handleScrollMenu),this._setMenuPosition(),this._scrollToView(),this._selectedItemEl===null||this._selectedItemEl.classList.contains(this._DISABLED_CLASS)?this._actionClearAllHighlightMenuItem():this._setHighlightAndActiveDescendantMenu(this._selectedItemEl),setTimeout(()=>{document.addEventListener("click",this._handleClickDocument,!0)},1)):setTimeout(()=>{document.removeEventListener("click",this._handleClickDocument,!0)},1)}_getToggleIconSvgTemplate(){return C`
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.2122 15.6665L25 16.1392L19.7332 21.4998H18.2668L13 16.1392L13.7878 15.6665L18.765 20.6866H19.235L24.2122 15.6665Z"
          fill="#3498db"/>
      </svg>
    `}_getItemTemplate(e,i){const o=this._isCheckedItem(e),n=e.disabled,s=e.label===void 0?e.value:e.label;let r=o?_`<b>${s}</b>`:_`${s}`;const u=this._query.trim().toLowerCase();if(u&&s){const c=s.toLowerCase().indexOf(u),d=c+u.length;r=_`
          ${s.slice(0,c)}<b>${s.slice(c,d)}</b>${s.slice(d)}
        `}return _`
        <li
          class="kuc-combobox-1-23-1__group__select-menu__item ${n?this._DISABLED_CLASS:""}"
          role="option"
          aria-selected="${o?"true":"false"}"
          value="${e.value!==void 0?e.value:""}"
          id="${this._GUID}-menuitem-${i}"
          @click="${n?null:this._handleClickComboboxItem}"
          @mouseover="${n?null:this._handleMouseOverComboboxItem}"
        >
          ${this._getComboboxIconSvgTemplate(o,n)}
          ${r}
        </li>
      `}_getComboboxIconSvgTemplate(e,i){return C`
      ${e?C`<svg
          class="kuc-combobox-1-23-1__group__select-menu__item__icon"
          width="11"
          height="9"
          viewBox="0 0 11 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 5L1.5 3L4.5 5.5L9.5 0L11 1.5L4.5 8.5L0 5Z"
            fill="${i?"#888888":"#3498db"}"/>
        </svg>`:""}`}_handleClickComboboxItem(e){const o=this._getItemElementWhenMouseOverDown(e.target).getAttribute("value");this._actionUpdateValue(o)}_handleMouseOverComboboxItem(e){const i=this._getItemElementWhenMouseOverDown(e.target);this._actionHighlightMenuItem(i)}_handleMouseLeaveMenu(){this._actionClearAllHighlightMenuItem()}_handleMouseDownMenu(e){e.preventDefault()}_handleClickToggleButton(e){e.preventDefault(),this._inputEl.focus(),this._inputEl.select(),this._resetToggleInputValue(),this._actionToggleMenu()}_handleInputComboboxInput(e){e.stopPropagation(),this._searchText=this._inputEl.value,this._query=this._inputEl.value,this._setMatchingItems()}_handleClickComboboxInput(e){e.stopPropagation(),this._inputEl.select(),this._setMatchingItems()}_handleChangeComboboxInput(e){e.stopPropagation()}_handleBlurComboboxInput(e){this._resetToggleInputValue()}_handleClickDocument(e){(e.target===this._toggleEl||this._toggleEl.contains(e.target))&&(this._inputEl.focus(),e.stopPropagation()),!Array.from(this._disabledItemsEl).some(i=>i===e.target||i.contains(e.target))&&this._actionHideMenu()}_handleScrollMenu(){this._previousScrollTop=this._menuEl.scrollTop}_handleKeyDownComboboxInput(e){switch(e.key){case"Up":case"ArrowUp":{if(e.preventDefault(),!this._selectorVisible){this._actionShowMenu();break}this._actionHighlightPrevMenuItem();break}case"Tab":this._selectorVisible&&this._actionHideMenu();break;case"Down":case"ArrowDown":{if(e.preventDefault(),!this._selectorVisible){this._actionShowMenu();break}this._actionHighlightNextMenuItem();break}case"Enter":{e.preventDefault();const i=this._highlightItemEl;if(i===null)break;const o=i.getAttribute("value");this._actionUpdateValue(o),this._actionHideMenu();break}case"Escape":{e.preventDefault(),this._selectorVisible&&e.stopPropagation(),this._resetToggleInputValue(),this._actionHideMenu();break}case"Home":{this._selectorVisible&&(e.preventDefault(),this._actionHighlightFirstMenuItem());break}case"End":{this._selectorVisible&&(e.preventDefault(),this._actionHighlightLastMenuItem());break}}}_getSelectedLabel(){const e=this.items.filter((i,o)=>this._isCheckedItem(i));return e.length===0?"":e[0].label===void 0?e[0].value:e[0].label}_actionShowMenu(){this._query.trim()===""&&(this._matchingItems=this.items),!(this.items.length===0||this._matchingItems.length===0)&&(this._inputEl.focus(),this._selectorVisible=!0)}_actionHideMenu(){this._selectorVisible=!1,this._actionRemoveActiveDescendant()}_actionToggleMenu(){if(this._selectorVisible){this._actionHideMenu();return}this._actionShowMenu()}_actionHighlightFirstMenuItem(){let e=this._firstItemEl,i=!1;for(let o=0;o<this._matchingItems.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.nextElementSibling;!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionHighlightLastMenuItem(){let e=this._lastItemEl,i=!1;for(let o=0;o<this._matchingItems.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.previousElementSibling;!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionHighlightPrevMenuItem(){let e=null;this._highlightItemEl!==null&&(e=this._highlightItemEl.previousElementSibling),e===null&&(e=this._lastItemEl);let i=!1;for(let o=0;o<this._matchingItems.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.previousElementSibling,e===null&&(e=this._lastItemEl);!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionHighlightNextMenuItem(){let e=null;this._highlightItemEl!==null&&(e=this._highlightItemEl.nextElementSibling),e===null&&(e=this._firstItemEl);let i=!1;for(let o=0;o<this._matchingItems.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.nextElementSibling,e===null&&(e=this._firstItemEl);!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionClearAllHighlightMenuItem(){this._itemsEl.forEach(e=>{e.classList.remove("kuc-combobox-1-23-1__group__select-menu__highlight")}),this._actionRemoveActiveDescendant()}_setHighlightAndActiveDescendantMenu(e){this._actionHighlightMenuItem(e),this._actionSetActiveDescendant(e.id),this._scrollToView()}_actionHighlightMenuItem(e){this._actionClearAllHighlightMenuItem(),e.classList.add("kuc-combobox-1-23-1__group__select-menu__highlight")}_actionUpdateValue(e){if(this.value===e){this._resetToggleInputValue();return}const i={oldValue:this.value,value:e};this.value=e,this._query="",f(this,"change",i)}_actionSetActiveDescendant(e){e!==void 0&&this._inputEl!==null&&this._inputEl.setAttribute("aria-activedescendant",e)}_actionRemoveActiveDescendant(){this._inputEl.removeAttribute("aria-activedescendant")}_setMatchingItems(){const e=this.items.filter(i=>{const o=s=>s.replace(/[.*+?^=!:${}()|[\]/\\]/g,"\\$&"),n=new RegExp(o(this._query.trim()),"gi");return i.label?n.test(i.label):i.value?n.test(i.value):!1});e.length===0?(this._matchingItems=[],this._actionHideMenu()):(this._matchingItems=e,this._actionShowMenu())}_getScrollbarWidthHeight(){const e=document.createElement("div");e.style.cssText="overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e);const i=e.offsetWidth-e.clientWidth,o=e.offsetHeight-e.clientHeight;return document.body.removeChild(e),{scrollbarWidth:i,scrollbarHeight:o}}_getDistanceToggleButton(){const{scrollbarWidth:e,scrollbarHeight:i}=this._getScrollbarWidthHeight(),o=document.body.scrollHeight>window.innerHeight,n=document.body.scrollWidth>window.innerWidth,s=this._toggleEl.getBoundingClientRect().top,r=window.innerHeight-this._toggleEl.getBoundingClientRect().bottom-(n?i:0),u=this._toggleEl.getBoundingClientRect().left,c=window.innerWidth-this._toggleEl.getBoundingClientRect().left-(o?e:0);return{toTop:s,toBottom:r,toLeft:u,toRight:c}}_setMenuPositionAboveOrBelow(){this._menuEl.style.height="auto",this._menuEl.style.bottom="auto",this._menuEl.style.overflowY="scroll",this._menuEl.style.maxHeight="none";const e=this._menuEl.getBoundingClientRect().height;this._menuEl.style.maxHeight="var(--kuc-combobox-menu-max-height, none)";const i=this._menuEl.getBoundingClientRect().height,o=16,n=this._getDistanceToggleButton();if(n.toBottom>=i){e>i?this._previousScrollTop&&(this._menuEl.scrollTop=this._previousScrollTop):this._menuEl.style.overflowY="";return}if(n.toBottom<n.toTop){const s=this._errorEl.offsetHeight?this._errorEl.offsetHeight+o:0;if(this._menuEl.style.bottom=`${this._toggleEl.offsetHeight+s}px`,n.toTop>=i){e>i?this._previousScrollTop&&(this._menuEl.scrollTop=this._previousScrollTop):this._menuEl.style.overflowY="";return}this._menuEl.style.height=`${n.toTop}px`}else this._menuEl.style.height=`${n.toBottom}px`;this._previousScrollTop&&(this._menuEl.scrollTop=this._previousScrollTop)}_setMenuPositionLeftOrRight(){this._menuEl.style.right="auto";const e=this._menuEl.getBoundingClientRect().width,i=this._getDistanceToggleButton();if(i.toRight>=e||i.toLeft<e||i.toRight<0)return;const o=this._toggleEl.offsetWidth-i.toRight;this._menuEl.style.right=o>0?`${o}px`:"0px"}_setMenuPosition(){this._setMenuPositionAboveOrBelow(),this._setMenuPositionLeftOrRight()}_scrollToView(){if(!this._highlightItemEl||!this._menuEl)return;const e=this._menuEl.getBoundingClientRect(),i=this._highlightItemEl.getBoundingClientRect();i.top<e.top&&(this._menuEl.scrollTop-=e.top-i.top),e.bottom<i.bottom&&(this._menuEl.scrollTop+=i.bottom-e.bottom)}_actionResizeScrollWindow(){this._timeoutID||!this._selectorVisible||(this._timeoutID=window.setTimeout(()=>{this._timeoutID=null,this._setMenuPosition()},50))}_isCheckedItem(e){return e.value===this.value}_resetToggleInputValue(){const e=this._getSelectedLabel();this._searchText!==e&&(this._searchText=e||""),this._query=""}_getItemElementWhenMouseOverDown(e){return e.classList.value.split(" ").includes("kuc-combobox-1-23-1__group__select-menu__item")?e:this._getItemElementWhenMouseOverDown(e.parentElement)}}M([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),M([l({type:String})],a.prototype,"error",void 0),M([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),M([l({type:String})],a.prototype,"label",void 0),M([l({type:String})],a.prototype,"placeholder",void 0),M([l({type:String})],a.prototype,"value",void 0),M([l({type:Boolean})],a.prototype,"disabled",void 0),M([l({type:Boolean})],a.prototype,"requiredIcon",void 0),M([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),M([l({type:Array})],a.prototype,"items",void 0),M([v()],a.prototype,"_selectorVisible",void 0),M([g(".kuc-combobox-1-23-1__group__toggle")],a.prototype,"_toggleEl",void 0),M([g(".kuc-combobox-1-23-1__group__toggle__input")],a.prototype,"_inputEl",void 0),M([g(".kuc-combobox-1-23-1__group__select-menu")],a.prototype,"_menuEl",void 0),M([z(".kuc-combobox-1-23-1__group__select-menu__item")],a.prototype,"_itemsEl",void 0),M([g(".kuc-combobox-1-23-1__group__select-menu__item")],a.prototype,"_firstItemEl",void 0),M([g(".kuc-combobox-1-23-1__group__select-menu__item:last-child")],a.prototype,"_lastItemEl",void 0),M([g(".kuc-combobox-1-23-1__group__select-menu__item[aria-selected=true]")],a.prototype,"_selectedItemEl",void 0),M([g(".kuc-combobox-1-23-1__group__select-menu__highlight")],a.prototype,"_highlightItemEl",void 0),M([g(".kuc-base-error-1-23-1__error")],a.prototype,"_errorEl",void 0),M([z(".kuc-combobox-1-23-1__group__select-menu__item--disabled")],a.prototype,"_disabledItemsEl",void 0),M([v()],a.prototype,"_searchText",void 0),window.customElements.define("kuc-combobox-1-23-1",a),x(ss),Vi=a})();const rs=`
.kuc-base-datetime-header-year-1-23-1__toggle {
  position: relative;
  box-sizing: border-box;
  height: 32px;
  padding: 0 24px 0 8px;
  line-height: 30px;
  overflow: hidden;
  background-color: white;
  border: 1px solid transparent;
  cursor: pointer;
}
.kuc-base-datetime-header-year-1-23-1__toggle__icon {
  position: absolute;
  flex: none;
  width: 24px;
  height: 32px;
}
.kuc-base-datetime-header-year-1-23-1__toggle__label {
  font-size: 13px;
  color: #333333;
}
.kuc-base-datetime-header-year-1-23-1__toggle:focus {
  border: 1px solid #3498db;
  outline: none;
}
`;var ti=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class Mt extends k{constructor(){super(),this.year=new Date().getFullYear(),this.postfix="",this._listBoxVisible=!1,this._handleScrollDocument=this._handleScrollDocument.bind(this)}connectedCallback(){super.connectedCallback(),setTimeout(()=>{document.addEventListener("scroll",this._handleScrollDocument)},1)}disconnectedCallback(){document.removeEventListener("scroll",this._handleScrollDocument),super.disconnectedCallback()}update(t){this._listBoxItems=this._getYearOptions().map(e=>({value:`${e}`,label:`${e}${this.postfix}`})),super.update(t)}render(){return _`
      <button
        class="kuc-base-datetime-header-year-1-23-1__toggle"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="${this._listBoxVisible}"
        tabindex="${this._listBoxVisible?"-1":"0"}"
        @mouseup="${this._handleMouseUpDropdownToggle}"
        @mousedown="${this._handleMouseDownDropdownToggle}"
        @click="${this._handleClickDropdownYearToggle}"
        @keydown="${this._handleKeyDownYearToggle}"
      >
        <span class="kuc-base-datetime-header-year-1-23-1__toggle__label"
          >${this.year}${this.postfix}</span
        >
        <span class="kuc-base-datetime-header-year-1-23-1__toggle__icon"
          >${ua()}
        </span>
      </button>
      ${this._getListBoxTemplate()}
    `}async updated(t){await this.updateComplete,t.has("_listBoxVisible")&&this._listBoxVisible&&this._handleScrollDocument(),super.update(t)}closeListBox(){this._listBoxVisible=!1,this._toggleEl.focus()}_handleScrollDocument(){const t=Vt(this);if(t.inputToBottom>=t.inputToTop){Zt(this,"bottom");return}Zt(this,"top")}_getListBoxTemplate(){return this._listBoxVisible?_`
          <kuc-base-datetime-listbox-1-23-1
            .items="${this._listBoxItems||[]}"
            .value="${this.year.toString()}"
            class="kuc-base-datetime-header-year-1-23-1__listbox"
            @kuc:listbox-click="${this._handleChangeListBox}"
            @kuc:listbox-blur="${this._handleFocusOutListBox}"
            @kuc:listbox-escape="${this._handleListBoxEscape}"
            aria-hidden="${!this._listBoxVisible}"
          >
          </kuc-base-datetime-listbox-1-23-1>
        `:""}_handleFocusOutListBox(){this._listBoxVisible=!1,this._toggleEl.focus()}_handleListBoxEscape(){this._handleFocusOutListBox()}_handleMouseUpDropdownToggle(t){t.preventDefault()}_handleMouseDownDropdownToggle(t){t.preventDefault()}_handleClickDropdownYearToggle(t){t.stopPropagation(),t.preventDefault(),this._listBoxVisible?this.closeListBox():this._openListBox(),f(this,"kuc:year-dropdown-click",{value:this._listBoxVisible.toString(),oldValue:(!this._listBoxVisible).toString()})}_handleKeyDownYearToggle(t){t.key!=="Tab"&&(t.preventDefault(),this._openListBoxByKey(t.key))}_openListBoxByKey(t){[" ","Up","ArrowUp","Down","ArrowDown","Enter"].indexOf(t)>-1&&this._openListBox()}_handleChangeListBox(t){if(t.preventDefault(),t.stopPropagation(),this.closeListBox(),!t.detail.value)return;this.year=Number(t.detail.value);const e={value:`${this.year}`};f(this,"kuc:year-dropdown-change",e)}_openListBox(){this._listBoxVisible=!0}_getYearOptions(){const t=[];Number.isInteger(this.year)||(this.year=new Date().getFullYear());let e=this.year<100?0:this.year-100;const i=this.year>=9899?9999:this.year+100;for(e;e<=i;e++)t.push(e);return t}}ti([l({type:Number})],Mt.prototype,"year",void 0),ti([l({type:String})],Mt.prototype,"postfix",void 0),ti([v()],Mt.prototype,"_listBoxVisible",void 0),ti([g(".kuc-base-datetime-header-year-1-23-1__toggle")],Mt.prototype,"_toggleEl",void 0),window.customElements.get("kuc-base-datetime-header-year-1-23-1")||(x(rs),window.customElements.define("kuc-base-datetime-header-year-1-23-1",Mt));const ls=`
.kuc-base-datetime-header-month-1-23-1__toggle {
  position: relative;
  box-sizing: border-box;
  height: 32px;
  padding: 0 24px 0 8px;
  line-height: 30px;
  overflow: hidden;
  background-color: white;
  border: 1px solid transparent;
  cursor: pointer;
}
.kuc-base-datetime-header-month-1-23-1__toggle__icon {
  position: absolute;
  flex: none;
  width: 24px;
  height: 32px;
}
.kuc-base-datetime-header-month-1-23-1__toggle__label {
  font-size: 13px;
  color: #333333;
}
.kuc-base-datetime-header-month-1-23-1__toggle:focus {
  border: 1px solid #3498db;
  outline: none;
}
`;var ii=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class Bt extends k{constructor(){super(),this.language="auto",this.month=1,this._listBoxVisible=!1,this._locale=O("en"),this._monthLabel="",this._maxHeight=1e3,this._handleScrollDocument=this._handleScrollDocument.bind(this)}connectedCallback(){super.connectedCallback(),setTimeout(()=>{document.addEventListener("scroll",this._handleScrollDocument)},1)}disconnectedCallback(){document.removeEventListener("scroll",this._handleScrollDocument),super.disconnectedCallback()}update(t){t.has("language")&&(this._locale=O(this.language),this._listBoxItems=this._getListBoxItems()),t.has("month")&&(this._monthLabel=this._getMonthLabel()),super.update(t)}render(){return _`
      <button
        class="kuc-base-datetime-header-month-1-23-1__toggle"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="${this._listBoxVisible}"
        tabindex="${this._listBoxVisible?"-1":"0"}"
        @mouseup="${this._handleMouseUpDropdownToggle}"
        @mousedown="${this._handleMouseDownDropdownToggle}"
        @click="${this._handleClickDropdownMonthToggle}"
        @keydown="${this._handleKeyDownMonthToggle}"
      >
        <span class="kuc-base-datetime-header-month-1-23-1__toggle__label"
          >${this._monthLabel}</span
        >
        <span class="kuc-base-datetime-header-month-1-23-1__toggle__icon"
          >${ua()}
        </span>
      </button>
      ${this._getListBoxTemplate()}
    `}async updated(t){await this.updateComplete,t.has("_listBoxVisible")&&this._listBoxVisible&&this._handleScrollDocument(),super.update(t)}_handleScrollDocument(){const t=Vt(this);if(t.inputToBottom>=t.inputToTop){Zt(this,"bottom");return}Zt(this,"top")}closeListBox(){this._listBoxVisible=!1,this._toggleEl.focus()}_getListBoxTemplate(){return this._listBoxVisible?_`
          <kuc-base-datetime-listbox-1-23-1
            .items="${this._listBoxItems||[]}"
            .value="${this.month.toString()}"
            .maxHeight="${this._maxHeight}"
            class="kuc-base-datetime-header-month-1-23-1__listbox"
            @kuc:listbox-click="${this._handleChangeListBox}"
            @kuc:listbox-blur="${this._handleFocusOutListBox}"
            @kuc:listbox-escape="${this._handleListBoxEscape}"
            aria-hidden="${!this._listBoxVisible}"
          >
          </kuc-base-datetime-listbox-1-23-1>
        `:""}_handleFocusOutListBox(){this._listBoxVisible=!1,this._toggleEl.focus()}_handleListBoxEscape(){this._handleFocusOutListBox()}_handleClickDropdownMonthToggle(t){t.stopPropagation(),t.preventDefault(),this._listBoxVisible?this.closeListBox():this._openListBox(),f(this,"kuc:month-dropdown-click",{value:this._listBoxVisible.toString(),oldValue:(!this._listBoxVisible).toString()})}_handleMouseUpDropdownToggle(t){t.preventDefault()}_handleMouseDownDropdownToggle(t){t.preventDefault()}_handleKeyDownMonthToggle(t){this._handleTabKey(t.key)||(t.preventDefault(),this._openListBoxByKey(t.key))}_openListBoxByKey(t){[" ","Up","ArrowUp","Down","ArrowDown","Enter"].indexOf(t)>-1&&this._openListBox()}_handleTabKey(t){return t==="Tab"}_handleChangeListBox(t){if(t.preventDefault(),t.stopPropagation(),this.closeListBox(),!t.detail.value)return;this.month=Number(t.detail.value);const e={value:`${this.month}`};f(this,"kuc:month-dropdown-change",e)}_openListBox(){this._listBoxVisible=!0}_getListBoxItems(){return this._locale.MONTH_SELECT.map((t,e)=>({value:`${e+1}`,label:`${t}`}))}_getMonthLabel(){const t=this._locale.MONTH_SELECT.filter((e,i)=>this.month===i+1);return t.length>0?t[0]:"JANUARY"}}ii([l({type:String,attribute:"lang",reflect:!0})],Bt.prototype,"language",void 0),ii([l({type:Number})],Bt.prototype,"month",void 0),ii([v()],Bt.prototype,"_listBoxVisible",void 0),ii([g(".kuc-base-datetime-header-month-1-23-1__toggle")],Bt.prototype,"_toggleEl",void 0),window.customElements.get("kuc-base-datetime-header-month-1-23-1")||(x(ls),window.customElements.define("kuc-base-datetime-header-month-1-23-1",Bt));const us=`
kuc-base-datetime-calendar-header-1-23-1,
kuc-base-datetime-calendar-header-1-23-1 *,
kuc-base-datetime-calendar-header-1-23-1:lang(en),
kuc-base-datetime-calendar-header-1-23-1:lang(en) * {
  font-family: sans-serif;
}
kuc-base-datetime-calendar-header-1-23-1:lang(ja),
kuc-base-datetime-calendar-header-1-23-1:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
  font-weight: 700;
}
kuc-base-datetime-calendar-header-1-23-1:lang(zh),
kuc-base-datetime-calendar-header-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-base-datetime-calendar-header-1-23-1:lang(zh-TW),
kuc-base-datetime-calendar-header-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC",sans-serif;
}
kuc-base-datetime-calendar-header-1-23-1:lang(es),
kuc-base-datetime-calendar-header-1-23-1:lang(es) * {
  font-family: sans-serif;
}
kuc-base-datetime-calendar-header-1-23-1:lang(ja) kuc-base-datetime-listbox-1-23-1 * {
  font-weight: 400;
}
.kuc-base-datetime-calendar-header-1-23-1__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #e3e7e8;
  padding: 0;
  white-space: nowrap;
  width: 266px;
  height: 44px;
}
.kuc-base-datetime-calendar-header-1-23-1__group__button {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  width: 38px;
  height: 32px;
  margin: 0;
  text-align: center;
}
.kuc-base-datetime-calendar-header-1-23-1__group__button:focus {
  border: 1px solid #3498db;
  outline: none;
}
.kuc-base-datetime-calendar-header-1-23-1__group__button-icon {
  vertical-align: middle;
}
.kuc-base-datetime-calendar-header-1-23-1__group__center {
  width: 190px;
  text-align: center;
  display: flex;
  justify-content: center;
}
.kuc-base-datetime-calendar-header-1-23-1__month {
  margin: 0 4px 0 4px;
}
`;var rt=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};function cs(a){return a>0&&a<13}function ds(a){return a>=0&&a<1e4}class We extends k{constructor(){super(...arguments),this.language="en",this.month=1,this.year=new Date().getFullYear(),this._locale=O("en")}update(t){t.has("language")&&(this._locale=O(this.language)),super.update(t)}render(){return _`
      <div class="kuc-base-datetime-calendar-header-1-23-1__group">
        <button
          aria-label="previous month"
          type="button"
          class="kuc-base-datetime-calendar-header-1-23-1__group__button kuc-base-datetime-calendar-header-1-23-1__group__button--previous-month"
          @click="${this._handleClickCalendarPrevMonthBtn}"
          @keydown="${this._handleKeyDownCalendarPrevMonthBtn}"
        >
          ${Gn()}
        </button>
        <div class="kuc-base-datetime-calendar-header-1-23-1__group__center">
          ${this._getYearMonthTemplate()}
        </div>
        <button
          aria-label="next month"
          type="button"
          class="kuc-base-datetime-calendar-header-1-23-1__group__button kuc-base-datetime-calendar-header-1-23-1__group__button--next-month"
          @click="${this._handleClickCalendarNextMonthBtn}"
        >
          ${Wn()}
        </button>
      </div>
    `}_getYearTemplate(){return _`
      <kuc-base-datetime-header-year-1-23-1
        class="kuc-base-datetime-calendar-header-1-23-1__year"
        .postfix="${this._locale.YEAR_SELECT_POSTFIX}"
        .year="${this.year}"
        @kuc:year-dropdown-change="${this._handleYearDropdownChange}"
        @kuc:year-dropdown-click="${this._handleYearDropdownClick}"
      >
      </kuc-base-datetime-header-year-1-23-1>
    `}_getMonthTemplate(){return _`
      <kuc-base-datetime-header-month-1-23-1
        class="kuc-base-datetime-calendar-header-1-23-1__month"
        .month="${this.month}"
        .language="${this.language}"
        @kuc:month-dropdown-change="${this._handleMonthDropdownChange}"
        @kuc:month-dropdown-click="${this._handleMonthDropdownClick}"
      >
      </kuc-base-datetime-header-month-1-23-1>
    `}_getYearMonthTemplate(){return this.language==="zh"||this.language==="ja"||this.language==="zh-TW"?_` ${this._getYearTemplate()}${this._getMonthTemplate()} `:_` ${this._getMonthTemplate()}${this._getYearTemplate()} `}_handleMonthDropdownChange(t){t.stopPropagation(),t.preventDefault(),this.month=parseInt(t.detail.value,10),this._dispatchCalendarHeaderChangeEvent()}_handleYearDropdownChange(t){t.stopPropagation(),t.preventDefault(),this.year=parseInt(t.detail.value,10),this._dispatchCalendarHeaderChangeEvent()}_handleYearDropdownClick(){this._listBoxMonthEl&&this._baseDateTimeHeaderMonthEl.closeListBox()}_handleMonthDropdownClick(){this._listBoxYearEl&&this._baseDateTimeHeaderYearEl.closeListBox()}_handleClickCalendarPrevMonthBtn(t){t.stopPropagation(),this.month===1?(this.month=12,this.year--):this.month-=1,this._dispatchCalendarHeaderChangeEvent()}_handleKeyDownCalendarPrevMonthBtn(t){!t.shiftKey||t.key!=="Tab"||(t.preventDefault(),f(this,"kuc:calendar-header-previous-shifttab"))}_handleClickCalendarNextMonthBtn(t){t.stopPropagation(),this.month===12?(this.month=1,this.year++):this.month+=1,this._dispatchCalendarHeaderChangeEvent()}_dispatchCalendarHeaderChangeEvent(){const t=this.year,e=this.month,i={value:`${t}-${e}`};f(this,"kuc:calendar-header-change",i)}}rt([l({type:String,attribute:"lang",reflect:!0})],We.prototype,"language",void 0),rt([l({type:Number,hasChanged(a){return cs(a)}})],We.prototype,"month",void 0),rt([l({type:Number,hasChanged(a){return ds(a)}})],We.prototype,"year",void 0),rt([g(".kuc-base-datetime-calendar-header-1-23-1__month")],We.prototype,"_baseDateTimeHeaderMonthEl",void 0),rt([g(".kuc-base-datetime-calendar-header-1-23-1__year")],We.prototype,"_baseDateTimeHeaderYearEl",void 0),rt([g(".kuc-base-datetime-header-month-1-23-1__listbox")],We.prototype,"_listBoxMonthEl",void 0),rt([g(".kuc-base-datetime-header-year-1-23-1__listbox")],We.prototype,"_listBoxYearEl",void 0),window.customElements.get("kuc-base-datetime-calendar-header-1-23-1")||(x(us),window.customElements.define("kuc-base-datetime-calendar-header-1-23-1",We));const hs=`
kuc-base-datetime-calendar-body-1-23-1,
kuc-base-datetime-calendar-body-1-23-1 *,
kuc-base-datetime-calendar-body-1-23-1:lang(en),
kuc-base-datetime-calendar-body-1-23-1:lang(en) * {
  font-family: sans-serif;
}
kuc-base-datetime-calendar-body-1-23-1:lang(ja),
kuc-base-datetime-calendar-body-1-23-1:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
}
kuc-base-datetime-calendar-body-1-23-1:lang(zh),
kuc-base-datetime-calendar-body-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-base-datetime-calendar-body-1-23-1:lang(zh-TW),
kuc-base-datetime-calendar-body-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC",sans-serif;
}
kuc-base-datetime-calendar-body-1-23-1:lang(es),
kuc-base-datetime-calendar-body-1-23-1:lang(es) * {
  font-family: sans-serif;
}
.kuc-base-datetime-calendar-body-1-23-1__table,
.kuc-base-datetime-calendar-body-1-23-1__table tr {
  border-collapse: separate;
  border-spacing: 0;
}
.kuc-base-datetime-calendar-body-1-23-1__table__date,
.kuc-base-datetime-calendar-body-1-23-1__table__date--selected {
  border-spacing: 1px;
  padding: 0px;
  border: 1px solid #ffffff;
}
.kuc-base-datetime-calendar-body-1-23-1__table__header {
  text-align: center;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 400;
  color: #333333;
}
:lang(ja) th.kuc-base-datetime-calendar-body-1-23-1__table__header {
  font-weight: 700;
}
:lang(es) th.kuc-base-datetime-calendar-body-1-23-1__table__header {
  text-transform: revert;
}
.kuc-base-datetime-calendar-body-1-23-1__table__date--selected,
.kuc-base-datetime-calendar-body-1-23-1__table__date,
.kuc-base-datetime-calendar-body-1-23-1__table__header {
  box-sizing: border-box;
  padding: 8px 0;
  width: 36px;
  height: 31px;
  border: 1px solid #ffffff;
  text-align: center;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 400;
  color: #333333;
  cursor: pointer;
}
.kuc-base-datetime-calendar-body-1-23-1__table__header:nth-child(1),
.kuc-base-datetime-calendar-body-1-23-1__table__header:nth-child(7) {
  color: #d4d7d7;
}
.kuc-base-datetime-calendar-body-1-23-1__table__date:focus,
.kuc-base-datetime-calendar-body-1-23-1__table__date--selected:focus {
  outline: none;
}
.kuc-base-datetime-calendar-body-1-23-1__table__date
  .kuc-base-datetime-calendar-body-1-23-1__table__date__button:hover {
  color: #000000;
}
.kuc-base-datetime-calendar-body-1-23-1__table__date--selected {
  border-color: #3498db;
}
.kuc-base-datetime-calendar-body-1-23-1__table__date--selected--today,
.kuc-base-datetime-calendar-body-1-23-1__table__date--today {
  color: #ffffff;
  background: #888888;
}
.kuc-base-datetime-calendar-body-1-23-1__table__date--today:hover {
  color: #333333;
}
.kuc-base-datetime-calendar-body-1-23-1__table__date--other-month,
.kuc-base-datetime-calendar-body-1-23-1__table__date--other-month:hover {
  color: #d4d7d7;
}
`;var He=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class Ee extends k{constructor(){super(),this.month=1,this.year=2021,this.language="en",this.value="",this._month=1,this._year=2021,this._locale=O("en"),this._handleClickDocument=this._handleClickDocument.bind(this),this._handleKeyDownDocument=this._handleKeyDownDocument.bind(this)}connectedCallback(){super.connectedCallback(),setTimeout(()=>{document.addEventListener("click",this._handleClickDocument),document.addEventListener("keydown",this._handleKeyDownDocument)},1)}disconnectedCallback(){document.removeEventListener("click",this._handleClickDocument),document.removeEventListener("keydown",this._handleKeyDownDocument),super.disconnectedCallback()}update(t){if(t.forEach((e,i)=>{i==="language"&&(this._locale=O(this.language))}),t.has("month")&&(this._month=this.month),t.has("year")&&(this._year=this.year),t.has("value")){const{month:e,year:i}=this._separateDateValue();this._month=parseInt(e,10),this._year=parseInt(i,10)}super.update(t)}render(){return _`
      <table class="kuc-base-datetime-calendar-body-1-23-1__table" role="grid">
        ${this._getHeaderItemsTemplate()}<!--
        -->${this._getDateItemsTemplate()}
      </table>
    `}updated(t){t.has("value")&&this._focusDateEl(),super.update(t)}_handleClickDocument(){f(this,"kuc:calendar-body-blur",{})}_handleKeyDownDocument(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),f(this,"kuc:calendar-body-blur",{}))}_handleClickDate(t){t.preventDefault(),t.stopPropagation();const e=t.target;e.setAttribute("aria-selected","true");const i=e.getAttribute("data-date")||"";this._dispatchClickEvent(i)}_handleKeyDownDate(t){let e=!1;switch(t.key){case"Up":case"ArrowUp":{e=!0,this._moveToDate(-7);break}case"Down":case"ArrowDown":{e=!0,this._moveToDate(7);break}case"Left":case"ArrowLeft":{e=!0,this._moveToDate(-1);break}case"Right":case"ArrowRight":{e=!0,this._moveToDate(1);break}case" ":case"Enter":{e=!0;const i=this._getSelectedValue();this._dispatchClickEvent(i);break}}e&&(t.stopPropagation(),t.preventDefault())}_dispatchClickEvent(t){const e={oldValue:this.value,value:t};f(this,"kuc:calendar-body-click-date",e),this.value=t}_isToday(t){const e=new Date;return parseInt(t[0],10)===e.getFullYear()&&parseInt(t[1],10)===e.getMonth()+1&&parseInt(t[2],10)===e.getDate()}_moveToDate(t){let e=this.value;const i=this._getSelectedValue(),{day:o}=this._separateDateValue(i);e=`${this._year}-${I(this._month)}-${o}`;const n=new Date(`${e||this._getValueItemFocused()}T00:00:00`);if(isNaN(n.getTime()))return;n.setDate(n.getDate()+t);const s=this._getDateString(n),r=e;this.value=s,f(this,"kuc:calendar-body-change-date",{oldValue:r,value:s})}_separateDateValue(t=this.value){const e=t.split("-");return{day:e[2],month:e[1],year:e[0]}}_getSelectedValue(){return this._highlightItem?this._highlightItem.dataset.date||"":this._selectedItem&&this._selectedItem.getAttribute("data-date")||""}_getValueItemFocused(){return this._focusedItem&&this._focusedItem.getAttribute("data-date")||""}_getDateClass(t,e){return e?this._isToday(t)?" kuc-base-datetime-calendar-body-1-23-1__table__date--selected--today":"":this._isToday(t)?" kuc-base-datetime-calendar-body-1-23-1__table__date--selected--today":" kuc-base-datetime-calendar-body-1-23-1__table__date--other-month"}_getDateString(t=new Date){const e=t.getFullYear(),i=I(t.getMonth()+1),o=I(t.getDate());return`${e}-${i}-${o}`}_isSameDayOfMoment(t){const e=parseInt(t[1],10),i=parseInt(t[2],10),o=parseInt(t[0],10);let n=new Date().getDate();if(!this.value.split("-")[2])return!1;if(this.value&&(n=new Date(`${this.value}T00:00:00`).getDate()),n===i&&e===this._month)return!0;const r=new Date(o,this._month,0).getDate();return n>r&&r===i&&e===this._month}_getHeaderItemsTemplate(){return _`
      <thead>
        <tr>
          ${this._locale.WEEK_DAYS.map(t=>_`
              <th
                class="kuc-base-datetime-calendar-body-1-23-1__table__header"
                role="columnheader"
                abbr="${t.abbr}"
              >
                ${t.text}
              </th>
            `)}
        </tr>
      </thead>
    `}_getDateItemsTemplate(){const t=oa(this._year,this._month-1),e=this._locale.MONTH_SELECT[this._month-1];return _`
      <tbody>
        ${t.map(i=>_`
            <tr>
              ${i.map(o=>{const n=o.text.split("-"),s=this._isSameDayOfMoment(n),r=parseInt(n[1],10)===this._month,u=(this.value===o.attr||s)&&r;return _`
                  <td
                    role="gridcell"
                    class="kuc-base-datetime-calendar-body-1-23-1__table__date${u?"--selected":""}${this._getDateClass(n,r)}"
                    aria-selected="${this.value===o.attr}"
                    tabindex="${u?"0":"-1"}"
                    aria-current="${this._isToday(n)?"date":!1}"
                    aria-label="${n[2]} ${e}"
                    data-date="${o.attr}"
                    @click="${this._handleClickDate}"
                    @keydown="${this._handleKeyDownDate}"
                  >
                    ${n[2]||""}
                  </td>
                `})}
            </tr>
          `)}
      </tbody>
    `}_focusDateEl(){this._focusedItem&&this._focusedItem.focus({preventScroll:!0})}}He([l({type:Number})],Ee.prototype,"month",void 0),He([l({type:Number})],Ee.prototype,"year",void 0),He([l({type:String,attribute:"lang",reflect:!0})],Ee.prototype,"language",void 0),He([l({type:String,reflect:!0})],Ee.prototype,"value",void 0),He([v()],Ee.prototype,"_month",void 0),He([v()],Ee.prototype,"_year",void 0),He([g('.kuc-base-datetime-calendar-body-1-23-1__table__date--selected[aria-selected="true"]')],Ee.prototype,"_selectedItem",void 0),He([g(".kuc-base-datetime-calendar-body-1-23-1__table__date--selected")],Ee.prototype,"_highlightItem",void 0),He([g('.kuc-base-datetime-calendar-body-1-23-1__table__date--selected[tabindex="0"]')],Ee.prototype,"_focusedItem",void 0),window.customElements.get("kuc-base-datetime-calendar-body-1-23-1")||(x(hs),window.customElements.define("kuc-base-datetime-calendar-body-1-23-1",Ee));const _s=`
kuc-base-datetime-calendar-footer-1-23-1,
kuc-base-datetime-calendar-footer-1-23-1 *,
kuc-base-datetime-calendar-footer-1-23-1:lang(en),
kuc-base-datetime-calendar-footer-1-23-1:lang(en) * {
  font-family: sans-serif;
}
kuc-base-datetime-calendar-footer-1-23-1:lang(ja),
kuc-base-datetime-calendar-footer-1-23-1:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
}
kuc-base-datetime-calendar-footer-1-23-1:lang(zh),
kuc-base-datetime-calendar-footer-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-base-datetime-calendar-footer-1-23-1:lang(zh-TW),
kuc-base-datetime-calendar-footer-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC",sans-serif;
}
kuc-base-datetime-calendar-footer-1-23-1:lang(es),
kuc-base-datetime-calendar-footer-1-23-1:lang(es) * {
  font-family: sans-serif;
}
.kuc-base-datetime-calendar-footer-1-23-1__group {
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 0;
  height: 27px;
  white-space: nowrap;
  width: 272px;
}
.kuc-base-datetime-calendar-footer-1-23-1__group__button {
  background: transparent;
  border: 1px solid transparent;
  color: #3498db;
  cursor: pointer;
  font-size: 13px;
  outline: none;
}
.kuc-base-datetime-calendar-footer-1-23-1__group__button:hover {
  color: #217dbb;
}
.kuc-base-datetime-calendar-footer-1-23-1__group__button:focus {
  border: 1px solid #3498db;
  outline: none;
}
.kuc-base-datetime-calendar-footer-1-23-1__group__center {
  width: 100%;
}
`;var ga=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class Mi extends k{constructor(){super(...arguments),this.language="en",this._locale=O("en")}update(t){t.has("language")&&(this._locale=O(this.language)),super.update(t)}_handleClickCalendarFooterButtonNone(t){t.stopPropagation(),f(this,"kuc:calendar-footer-click-none")}_handleClickCalendarFooterButtonToday(t){t.stopPropagation(),f(this,"kuc:calendar-footer-click-today")}_handleKeyDownCalendarFooterButtonNone(t){t.key==="Tab"&&(t.shiftKey||(t.preventDefault(),f(this,"kuc:calendar-footer-tab-none")))}render(){return _`
      <div class="kuc-base-datetime-calendar-footer-1-23-1__group">
        <button
          type="button"
          tabindex="0"
          class="kuc-base-datetime-calendar-footer-1-23-1__group__button kuc-base-datetime-calendar-footer-1-23-1__group__button--today"
          @click="${this._handleClickCalendarFooterButtonToday}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.today}
        </button>
        <span class="kuc-base-datetime-calendar-footer-1-23-1__group__center"></span>
        <button
          type="button"
          tabindex="0"
          class="kuc-base-datetime-calendar-footer-1-23-1__group__button kuc-base-datetime-calendar-footer-1-23-1__group__button--none"
          @click="${this._handleClickCalendarFooterButtonNone}"
          @keydown="${this._handleKeyDownCalendarFooterButtonNone}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.none}
        </button>
      </div>
    `}}ga([l({type:String,attribute:"lang",reflect:!0})],Mi.prototype,"language",void 0),ga([v()],Mi.prototype,"_locale",void 0),window.customElements.get("kuc-base-datetime-calendar-footer-1-23-1")||(x(_s),window.customElements.define("kuc-base-datetime-calendar-footer-1-23-1",Mi));const ps=`
.kuc-base-datetime-calendar-1-23-1__group {
  display: inline-block;
  box-sizing: border-box;
  width: 336px;
  padding: 32px 32px 24px;
  background: #ffffff;
  box-shadow: 0 0 8px 2px rgb(0 0 0 / 10%);
  text-align: center;
  font-size: 13px;
}
`;var Re=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class Se extends k{constructor(){super(...arguments),this.language="en",this.value="",this._month=1,this._year=new Date().getFullYear()}update(t){t.has("value")&&this._updateValue(),super.update(t)}render(){return _`
      <div
        class="kuc-base-datetime-calendar-1-23-1__group"
        role="dialog"
        aria-modal="true"
        aria-label="Calender"
        @click="${this._handleClickCalendarGroup}"
        @keydown="${this._handleKeyDownCalendarGroup}"
      >
        <kuc-base-datetime-calendar-header-1-23-1
          .year="${this._year}"
          .month="${this._month}"
          .language="${this.language}"
          @kuc:calendar-header-change="${this._handleCalendarHeaderChange}"
        ></kuc-base-datetime-calendar-header-1-23-1>
        <kuc-base-datetime-calendar-body-1-23-1
          .year="${this._year}"
          .month="${this._month}"
          .value="${this.value}"
          .language="${this.language}"
          @kuc:calendar-body-change-date="${this._handleCalendarBodyChangeDate}"
        ></kuc-base-datetime-calendar-body-1-23-1>
        <kuc-base-datetime-calendar-footer-1-23-1
          .language="${this.language}"
        ></kuc-base-datetime-calendar-footer-1-23-1>
      </div>
    `}async updated(t){await this.updateComplete,this._calculateBodyCalendarPosition(),super.updated(t)}_handleKeyDownCalendarGroup(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),f(this,"kuc:calendar-escape",{}))}_handleClickCalendarGroup(t){t.stopPropagation(),this._listBoxMonthEl&&this._monthEl.closeListBox(),this._listBoxYearEl&&this._yearEl.closeListBox()}_calculateBodyCalendarPosition(){const{inputToBottom:t,inputToTop:e,inputToRight:i,inputToLeft:o}=Vt(this),n=this._baseCalendarGroupEl.getBoundingClientRect().height;if(t>=n){this._calculateCalendarPosition(i,o,"bottom");return}if(e<0||t>e){this._calculateCalendarPosition(i,o,"bottom");return}this._calculateCalendarPosition(i,o,"top")}_calculateCalendarPosition(t,e,i){if(!this.parentElement)return;const o=this.parentElement.getElementsByClassName("kuc-base-date-1-23-1__input")[0],n=336,s=o.getBoundingClientRect().height,r=o.getBoundingClientRect().width;if(t<n&&t<e){const h=this.parentElement.getBoundingClientRect().width,p=i==="bottom"?s:"auto",b=i==="bottom"?"auto":s,m=h>r?h-r:0;this._setCalendarPosition({top:p,bottom:b,right:m});return}const u=i==="bottom"?s:"auto",c=i==="bottom"?"auto":s;this._setCalendarPosition({bottom:c,top:u,left:0})}_setCalendarPosition({top:t="auto",left:e="auto",right:i="auto",bottom:o="auto"}){const n=this._baseCalendarGroupEl.parentElement;!this.parentElement||!n||(this.parentElement.style.position="relative",n.style.bottom=o==="auto"?o:o+"px",n.style.top=t==="auto"?t:t+"px",n.style.left=e==="auto"?e:e+"px",n.style.right=i==="auto"?i:i+"px")}_handleCalendarHeaderChange(t){const{year:e,month:i}=this._separateValue(t.detail.value);this._year=e,this._month=i}_handleCalendarBodyChangeDate(t){const{year:e,month:i}=this._separateValue(t.detail.value);this._year=e,this._month=i}_updateValue(){this.value===""&&(this.value=Ge().slice(0,7)+"-01");const{year:t,month:e}=this._separateValue(this.value);this._year=t,this._month=e}_separateValue(t){const e=t.split("-");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}}Re([l({type:String,attribute:"lang",reflect:!0})],Se.prototype,"language",void 0),Re([l({type:String,reflect:!0})],Se.prototype,"value",void 0),Re([g(".kuc-base-datetime-calendar-1-23-1__group")],Se.prototype,"_baseCalendarGroupEl",void 0),Re([g(".kuc-base-datetime-calendar-header-1-23-1__month")],Se.prototype,"_monthEl",void 0),Re([g(".kuc-base-datetime-calendar-header-1-23-1__year")],Se.prototype,"_yearEl",void 0),Re([g(".kuc-base-datetime-header-month-1-23-1__listbox")],Se.prototype,"_listBoxMonthEl",void 0),Re([g(".kuc-base-datetime-header-year-1-23-1__listbox")],Se.prototype,"_listBoxYearEl",void 0),Re([v()],Se.prototype,"_month",void 0),Re([v()],Se.prototype,"_year",void 0),window.customElements.get("kuc-base-datetime-calendar-1-23-1")||(x(ps),window.customElements.define("kuc-base-datetime-calendar-1-23-1",Se));const gs=`
kuc-base-datetime-listbox-1-23-1,
kuc-base-datetime-listbox-1-23-1 *,
kuc-base-datetime-listbox-1-23-1:lang(en),
kuc-base-datetime-listbox-1-23-1:lang(en) * {
  font-family: sans-serif;
}
kuc-base-datetime-listbox-1-23-1:lang(ja),
kuc-base-datetime-listbox-1-23-1:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
}
kuc-base-datetime-listbox-1-23-1:lang(zh),
kuc-base-datetime-listbox-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-base-datetime-listbox-1-23-1:lang(zh-TW),
kuc-base-datetime-listbox-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC"
}
kuc-base-datetime-listbox-1-23-1:lang(es),
kuc-base-datetime-listbox-1-23-1:lang(es) * {
  font-family: sans-serif;
}
.kuc-base-datetime-listbox-1-23-1__listbox {
  position: absolute;
  z-index: 2000;
  min-width: 280px;
  margin: 0;
  padding: 8px 0;
  border: 1px solid #e3e7e8;
  background-color: #ffffff;
  list-style: none;
  line-height: 1;
  overflow-y: auto;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 5px 10px rgb(0 0 0 / 10%);
}
.kuc-base-datetime-listbox-1-23-1__listbox__item {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 16px 8px 25px;
  color: #333333;
  cursor: pointer;
  -webkit-tap-highlight-color: initial;
  text-align: left;
  font-size: 14px;
  user-select: none;
}
.kuc-base-datetime-listbox-1-23-1__listbox__item[aria-selected="true"] {
  color: #3498db;
}
.kuc-base-datetime-listbox-1-23-1__listbox--highlight {
  background-color: #e2f2fe;
  cursor: pointer;
}
.kuc-base-datetime-listbox-1-23-1__listbox__item__icon {
  position: absolute;
  left: 8px;
  top: 10px;
  background-color: transparent;
}
.kuc-base-datetime-listbox-1-23-1__listbox__item:focus {
  outline: none;
}
`;var le=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class ee extends k{constructor(){super(),this.value="",this.items=[],this.maxHeight=300,this.doFocus=!0,this._actionKeyboard=!1,this._firstHighlight=!0,this._handleClickDocument=this._handleClickDocument.bind(this)}connectedCallback(){super.connectedCallback(),setTimeout(()=>{document.addEventListener("click",this._handleClickDocument)},1)}disconnectedCallback(){document.removeEventListener("click",this._handleClickDocument),super.disconnectedCallback()}getHighlightItemEl(){return this._highlightItemEl}render(){return _`
      <ul
        style="max-height: ${this.maxHeight}px;"
        class="kuc-base-datetime-listbox-1-23-1__listbox"
        role="listbox"
        @mousedown="${this._handleMouseDownListBox}"
        @click="${this._handleClickListBox}"
      >
        ${this.items.map(t=>this._getListBoxItemTemplate(t))}
      </ul>
    `}async updated(t){await this.updateComplete,t.has("value")&&this._highlightSelectedItem(),this._setListBoxPosition(),this._scrollToView(),super.updated(t)}_handleClickDocument(){f(this,"kuc:listbox-blur",{})}_handleClickListBox(t){t.stopPropagation()}_handleKeyDownListBox(t){switch(t.preventDefault(),t.stopPropagation(),t.key){case"Up":case"ArrowUp":this._actionKeyboard=!0,this._highlightPrevItemEl(),this._focusHighlightItemEl(),this._scrollToView();break;case"Down":case"ArrowDown":this._actionKeyboard=!0,this._highlightNextItemEl(),this._focusHighlightItemEl(),this._scrollToView();break;case"Home":this._actionKeyboard=!0,this._highlightFirstItem(),this._focusHighlightItemEl();break;case"End":this._actionKeyboard=!0,this._highlightLastItem(),this._focusHighlightItemEl();break;case"Tab":f(this,"kuc:listbox-click",{});break;case"Escape":f(this,"kuc:listbox-escape",{});break;case" ":case"Enter":{const i={value:this._highlightItemEl.getAttribute("value")||""};f(this,"kuc:listbox-click",i);break}}}_handleMouseDownListBox(t){if(t.preventDefault(),t.stopPropagation(),t.target===t.currentTarget)return;const o={value:t.target.getAttribute("value")||""};f(this,"kuc:listbox-click",o)}_handleMouseOverItem(t){if(this._actionKeyboard){this._actionKeyboard=!1;return}const e=t.target;this._setHighlightItemEl(e),this.doFocus&&this._focusHighlightItemEl(!1)}_setListBoxPosition(){const t=this._listBoxEl.getBoundingClientRect().height;if(!this._listBoxEl.parentElement||!this.parentElement)return;const i=window.innerHeight-this.parentElement.getBoundingClientRect().bottom,o=this.parentElement.offsetHeight;this._listBoxEl.style.bottom="auto",this._listBoxEl.style.left="auto",!(i>=t)&&(this.parentElement.style.position="relative",this._listBoxEl.style.bottom=o+"px",this._listBoxEl.style.left="0px")}_setHighlightItemEl(t){this._removeHighlight(),t.classList.add("kuc-base-datetime-listbox-1-23-1__listbox--highlight"),t.setAttribute("tabindex","0")}_highlightSelectedItem(){if(!this.doFocus)return;const e=Array.from(this._itemsEl).filter(i=>i.getAttribute("aria-selected")==="true")[0];e&&(this._itemSelectedEl=e,this._setHighlightItemEl(e),this._focusHighlightItemEl())}_highlightFirstItem(){this._itemSelectedEl=this._firstItemEl,this._setHighlightItemEl(this._firstItemEl)}_highlightLastItem(){this._itemSelectedEl=this._lastItemEl,this._setHighlightItemEl(this._lastItemEl)}_highlightNextItemEl(){if(this._highlightItemEl===null||this._iconChecked===null){this._highlightFirstItem();return}const t=this._getNextItemEl();if(t){this._setHighlightItemEl(t),this._firstHighlight=!1,this._itemSelectedEl=t;return}this._highlightFirstItem()}_getNextItemEl(){const t=this._iconChecked.parentElement;!this._itemSelectedEl&&t&&this._firstHighlight&&(this._itemSelectedEl=t);let e=this._highlightItemEl.nextElementSibling;return this._itemSelectedEl?this._itemSelectedEl.nextElementSibling?(e=this._itemSelectedEl.nextElementSibling,e):this._firstItemEl:e}_highlightPrevItemEl(){if(this._highlightItemEl===null||this._iconChecked===null){this._highlightLastItem();return}const t=this._getPreviousItemEl();if(t){this._setHighlightItemEl(t),this._firstHighlight=!1,this._itemSelectedEl=t;return}this._highlightLastItem()}_getPreviousItemEl(){const t=this._iconChecked.parentElement;!this._itemSelectedEl&&t&&this._firstHighlight&&(this._itemSelectedEl=t);let e=this._highlightItemEl.previousElementSibling;return this._itemSelectedEl?this._itemSelectedEl.previousElementSibling?(e=this._itemSelectedEl.previousElementSibling,e):this._lastItemEl:e}_removeHighlight(){this._highlightItemEl&&(this._highlightItemEl.setAttribute("tabindex","-1"),this._highlightItemEl.classList.remove("kuc-base-datetime-listbox-1-23-1__listbox--highlight"))}_focusHighlightItemEl(t){const e=this._highlightItemEl;e&&(e.focus({preventScroll:!0}),t!==!1&&this._dispatchListBoxFocusChange())}_dispatchListBoxFocusChange(){const e={value:this._highlightItemEl.getAttribute("value")||""};f(this,"kuc:listbox-focus-change",e)}_scrollToView(){const t=this._highlightItemEl||this._getHighlightItemByValue();if(!t||!this._listBoxEl)return;const e=t.offsetHeight,i=this._listBoxEl.clientHeight/e/2;let o=t.offsetTop-i*e;o<0&&(o=0),this._listBoxEl.scrollTop=o}_getHighlightItemByValue(){const t=Array.from(this._listBoxEl.children),e=new Date(Date.parse(`2021/01/01 ${this.value}`));let i=t.find(o=>new Date(Date.parse(`2021/01/01 ${o.title}`))>=e);return i||(i=t[t.length-1]),!this.doFocus||!i||(this._setHighlightItemEl(i),this._focusHighlightItemEl()),i}_getListBoxItemTemplate(t){const e=this.value===t.value&&this.doFocus;return _`
      <li
        class="kuc-base-datetime-listbox-1-23-1__listbox__item"
        role="option"
        tabindex="${e?"0":"-1"}"
        aria-selected="${e}"
        title="${t.label||""}"
        value="${t.value!==void 0?t.value:""}"
        @mouseover="${this._handleMouseOverItem}"
        @keydown="${this._handleKeyDownListBox}"
      >
        ${e?this._getCheckedIconSvgTemplate():""}
        ${t.label===void 0?t.value:t.label}
      </li>
    `}_getCheckedIconSvgTemplate(){return C`<svg
          class="kuc-base-datetime-listbox-1-23-1__listbox__item__icon"
          width="11"
          height="9"
          viewBox="0 0 11 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 5L1.5 3L4.5 5.5L9.5 0L11 1.5L4.5 8.5L0 5Z"
            fill="#3498db"
          />
        </svg>`}}le([l({type:String})],ee.prototype,"value",void 0),le([l({type:Array})],ee.prototype,"items",void 0),le([l({type:Number})],ee.prototype,"maxHeight",void 0),le([l({type:Boolean})],ee.prototype,"doFocus",void 0),le([g(".kuc-base-datetime-listbox-1-23-1__listbox")],ee.prototype,"_listBoxEl",void 0),le([z(".kuc-base-datetime-listbox-1-23-1__listbox__item")],ee.prototype,"_itemsEl",void 0),le([g(".kuc-base-datetime-listbox-1-23-1__listbox__item")],ee.prototype,"_firstItemEl",void 0),le([g(".kuc-base-datetime-listbox-1-23-1__listbox__item:last-child")],ee.prototype,"_lastItemEl",void 0),le([g(".kuc-base-datetime-listbox-1-23-1__listbox--highlight")],ee.prototype,"_highlightItemEl",void 0),le([g(".kuc-base-datetime-listbox-1-23-1__listbox__item__icon")],ee.prototype,"_iconChecked",void 0),le([v()],ee.prototype,"_actionKeyboard",void 0),le([v()],ee.prototype,"_firstHighlight",void 0),window.customElements.get("kuc-base-datetime-listbox-1-23-1")||(x(gs),window.customElements.define("kuc-base-datetime-listbox-1-23-1",ee));const fs=`
input.kuc-base-date-1-23-1__input {
  width: 100px;
  height: 40px;
  padding: 0px;
  text-align: center;
  border: 1px solid #e3e7e8;
  color: #333333;
  box-sizing: border-box;
  font-size: 14px;
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
}

input.kuc-base-date-1-23-1__input:focus {
  outline: none;
  border: 1px solid #3498db;
}
input.kuc-base-date-1-23-1__input--focus {
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
  border: 1px solid #3498db;
  background-color: #ffffff;
  color: #333333;
}
.kuc-datetime-picker-1-23-1__group__inputs--date
  input.kuc-base-date-1-23-1__input--focus {
  border-color: #3498db;
}
input.kuc-base-date-1-23-1__input:disabled {
  color: #888888 !important;
  background-color: #d4d7d7;
  box-shadow: none;
  cursor: not-allowed;
}
.kuc-base-date-1-23-1__calendar {
  position: absolute;
  z-index: 2000;
  background-color: #ffffff;
  text-align: center;
  box-sizing: border-box;
}
.kuc-base-date-1-23-1__assistive-text {
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  position: absolute !important;
  padding: 0px !important;
  border: 0px !important;
  height: 1px !important;
  width: 1px !important;
}
`;var be=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class ue extends k{constructor(){super(...arguments),this.inputAriaLabel="",this.inputId="",this.language="en",this.value="",this.disabled=!1,this.inputAriaInvalid=!1,this.required=!1,this._dateTimeCalendarVisible=!1,this._locale=O("en"),this._calendarValue="",this._inputValue="",this._valueForReset=""}update(t){t.has("inputId")&&(this._GUID=this.inputId),t.has("language")&&(this._locale=O(this.language),this._updateValueProp()),t.has("value")&&this._updateValueProp(),super.update(t)}render(){return _`
      <input
        class="kuc-base-date-1-23-1__input"
        id="${this._GUID}-label"
        type="text"
        text-align="center"
        .value="${this._inputValue}"
        aria-describedby="${this._GUID}-error"
        aria-invalid="${this.inputAriaInvalid}"
        aria-required="${this.required}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        @click="${this._handleClickInput}"
        @change="${this._handleChangeInput}"
        @keydown="${this._handleKeyDownInput}"
        @input="${this._handleInputValue}"
      />
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded="${this._dateTimeCalendarVisible}"
        class="kuc-base-date-1-23-1__assistive-text"
        @click="${this._handleClickButton}"
        @focus="${this._handleFocusButton}"
        @blur="${this._handleBlurButton}"
        ?disabled="${this.disabled}"
      >
        show date picker
      </button>
      ${this._dateTimeCalendarVisible?_`
            <kuc-base-datetime-calendar-1-23-1
              class="kuc-base-date-1-23-1__calendar"
              .language="${this.language}"
              .value="${this._calendarValue}"
              ?hidden="${!this._dateTimeCalendarVisible}"
              @kuc:calendar-header-previous-shifttab="${this._handleShiftTabCalendarPrevMonth}"
              @kuc:calendar-body-change-date="${this._handleClickCalendarChangeDate}"
              @kuc:calendar-body-click-date="${this._handleClickCalendarClickDate}"
              @kuc:calendar-footer-click-none="${this._handleClickCalendarFooterButtonNone}"
              @kuc:calendar-footer-tab-none="${this._handleTabCalendarFooterButtonNone}"
              @kuc:calendar-footer-click-today="${this._handleClickCalendarFooterButtonToday}"
              @kuc:calendar-escape="${this._handleCalendarEscape}"
              @kuc:calendar-body-blur="${this._handleCalendarBlurBody}"
            >
            </kuc-base-datetime-calendar-1-23-1>
          `:""}
    `}updated(t){t.has("inputAriaLabel")&&this.inputAriaLabel&&this._dateInput.setAttribute("aria-label",this.inputAriaLabel),super.updated(t)}_handleInputValue(t){const e=t.target.value;this._inputValue=e||""}_handleClickInput(){if(!this._dateTimeCalendarVisible){this._valueForReset=this.value,this._calendarValue=this._getNewCalendarValue(this._inputValue||""),this._openCalendar();return}this._closeCalendar()}_updateValueProp(){if(this.value){const e=this._setCalendarValueWhenInvalidValue();this._inputValue=sa(this.language,this.value),this._calendarValue=e||this.value;return}const t=Ge();this._inputValue="",this._calendarValue=this._calendarValue?this._calendarValue.slice(0,7)+"-01":t.slice(0,7)}_setCalendarValueWhenInvalidValue(){if(this.value&&!Oe(this.value)){const t=Ge();return this._calendarValue||t.slice(0,7)}return""}_getNewCalendarValue(t){if(ra(this.language,t))return Ci(this.language,t);if(!this._calendarValue)return"";let e=this._calendarValue.slice(0,7);return t===""&&(e=this._calendarValue.slice(0,7)+"-01"),e}_handleChangeInput(t){t.stopPropagation();const e=(t?.target).value;if(this._calendarValue=this._getNewCalendarValue(e),this._calendarValue.length>7){this._dispathDateChangeCustomEvent(Ci(this.language,e));return}const i={value:void 0,oldValue:this.value,error:this._locale.INVALID_FORMAT};this._inputValue=e,f(this,"kuc:base-date-change",i)}_handleKeyDownInput(t){t.key==="Escape"&&this._closeCalendar()}_closeCalendar(){this._dateTimeCalendarVisible=!1}_openCalendar(){this._dateTimeCalendarVisible=!0}_handleShiftTabCalendarPrevMonth(){this._footerNoneBtn.focus()}_handleClickCalendarChangeDate(t){t.detail.oldValue=this.value,this.value=t.detail.value,f(this,"kuc:base-date-change",t.detail)}_handleClickCalendarClickDate(t){this._closeCalendar(),t.detail.oldValue=this.value,this._dateInput.focus(),t.detail.oldValue!==t.detail.value&&(this.value=t.detail.value,f(this,"kuc:base-date-change",t.detail))}_handleClickCalendarFooterButtonNone(){this._closeCalendar(),this._dateInput.focus(),this._inputValue="";const t=Ge();let e=this._setCalendarValueWhenInvalidValue();e||(e=this._calendarValue?this._calendarValue.slice(0,7)+"-01":t.slice(0,7)+"-01"),this._calendarValue=e,this._dispathDateChangeCustomEvent(void 0)}_handleTabCalendarFooterButtonNone(){this._previousMonth.focus()}_handleClickCalendarFooterButtonToday(){this._closeCalendar();const t=Ge();this._dateInput.focus(),this._dispathDateChangeCustomEvent(t)}_handleCalendarEscape(){const t=this._valueForReset;if(this._closeCalendar(),this._dateInput.focus(),t===this.value)return;const e={oldValue:this.value,value:t};this.value=t,f(this,"kuc:base-date-change",e)}_handleCalendarBlurBody(t){t.preventDefault(),this._dateTimeCalendarVisible=!1}_dispathDateChangeCustomEvent(t){const e={value:t,oldValue:this.value};this.value=t===void 0?"":t,f(this,"kuc:base-date-change",e)}_handleClickButton(){if(!this._dateTimeCalendarVisible){this._valueForReset=this.value,this._calendarValue=this._getNewCalendarValue(this._inputValue||""),this._openCalendar();return}this._closeCalendar()}_handleBlurButton(){this._dateInput.classList.remove("kuc-base-date-1-23-1__input--focus")}_handleFocusButton(){this._dateInput.classList.add("kuc-base-date-1-23-1__input--focus")}}be([l({type:String})],ue.prototype,"inputAriaLabel",void 0),be([l({type:String})],ue.prototype,"inputId",void 0),be([l({type:String,attribute:"lang",reflect:!0})],ue.prototype,"language",void 0),be([l({type:String,reflect:!0})],ue.prototype,"value",void 0),be([l({type:Boolean})],ue.prototype,"disabled",void 0),be([l({type:Boolean})],ue.prototype,"inputAriaInvalid",void 0),be([l({type:Boolean})],ue.prototype,"required",void 0),be([g(".kuc-base-date-1-23-1__input")],ue.prototype,"_dateInput",void 0),be([g(".kuc-base-datetime-calendar-header-1-23-1__group__button--previous-month")],ue.prototype,"_previousMonth",void 0),be([g(".kuc-base-datetime-calendar-footer-1-23-1__group__button--none")],ue.prototype,"_footerNoneBtn",void 0),be([v()],ue.prototype,"_dateTimeCalendarVisible",void 0),window.customElements.get("kuc-base-date-1-23-1")||(x(fs),window.customElements.define("kuc-base-date-1-23-1",ue));const bs=`
kuc-date-picker-1-23-1,
kuc-date-picker-1-23-1 *,
kuc-date-picker-1-23-1:lang(en),
kuc-date-picker-1-23-1:lang(en) * {
  font-family: sans-serif;
}
kuc-date-picker-1-23-1:lang(ja),
kuc-date-picker-1-23-1:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
}
kuc-date-picker-1-23-1:lang(zh),
kuc-date-picker-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-date-picker-1-23-1:lang(zh-TW),
kuc-date-picker-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC"
}
kuc-date-picker-1-23-1:lang(es),
kuc-date-picker-1-23-1:lang(es) * {
  font-family: sans-serif;
}
kuc-date-picker-1-23-1 {
  font-size: 14px;
  color: #333333;
  display: inline-table;
  vertical-align: top;
  max-width: var(--kuc-date-picker-input-width, 100px);
  width: var(--kuc-date-picker-input-width, 100px);
  line-height: 1.5;
}
kuc-date-picker-1-23-1[hidden] {
  display: none;
}
.kuc-date-picker-1-23-1__group {
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0px;
  height: auto;
  margin: 0px;
}
.kuc-date-picker-1-23-1__group__label {
  display: inline-block;
  padding: 4px 0px 8px 0px;
  white-space: nowrap;
}
.kuc-date-picker-1-23-1__group__label[hidden] {
  display: none;
}
.kuc-date-picker-1-23-1__group input[type=text].kuc-base-date-1-23-1__input {
  width: var(--kuc-date-picker-input-width, 100px);
  height: var(--kuc-date-picker-input-height, 40px);
  padding: 0px;
  text-align: center;
  color: var(--kuc-date-picker-input-color);
  border: 1px solid #e3e7e8;
  box-sizing: border-box;
  font-size: var(--kuc-date-picker-input-font-size, 14px);
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
}

.kuc-date-picker-1-23-1__group kuc-base-date-1-23-1 {
  display: inline-flex;
}

.kuc-date-picker-1-23-1__group input[type=text].kuc-base-date-1-23-1__input:focus {
  outline: none;
  border: 1px solid #3498db;
}
.kuc-date-picker-1-23-1__group input[type=text].kuc-base-date-1-23-1__input--focus {
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
  border: 1px solid #3498db;
  background-color: #ffffff;
  color: var(--kuc-date-picker-input-color, #333333);
}
.kuc-date-picker-1-23-1__group input[type=text].kuc-base-date-1-23-1__input:disabled {
  color: #888888;
  background-color: #d4d7d7;
  box-shadow: none;
  cursor: not-allowed;
}
`;var Ie=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Bi;(()=>{if(Bi=window.customElements.get("kuc-date-picker-1-23-1"),Bi)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.disabled=!1,this.requiredIcon=!1,this.language="auto",this.value="",this.visible=!0,this._errorFormat="",this._errorText="",this._inputValue="",this._invalidValue="",this._valueConverted="",this._GUID=D();const i=S(e);Object.assign(this,i)}shouldUpdate(e){return this.value===void 0||this.value===""?!0:typeof this.value!="string"||!da(this.value)?(this.throwErrorAfterUpdateComplete(G.VALUE),!1):(this._valueConverted=Jt(this.value),this._valueConverted&&!Oe(this._valueConverted)?(this.throwErrorAfterUpdateComplete(G.VALUE),!1):!0)}willUpdate(e){e.has("value")&&(this.value===void 0?this._inputValue=this._invalidValue:(this.value=this.value===""?this.value:this._valueConverted,this._inputValue=this.value,this._errorFormat="")),this._updateErrorText()}render(){return _`
        <div class="kuc-date-picker-1-23-1__group">
          <label
            class="kuc-date-picker-1-23-1__group__label"
            for="${this._GUID}-label"
            @click="${this._handleClickLabel}"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </label>
          <kuc-base-date-1-23-1
            .inputId="${this._GUID}"
            .inputAriaInvalid="${this.error!==""}"
            .disabled="${this.disabled}"
            .value="${this._inputValue}"
            .required="${this.requiredIcon}"
            .language="${this._getLanguage()}"
            @kuc:base-date-change="${this._handleDateChange}"
          >
          </kuc-base-date-1-23-1>
          <kuc-base-error-1-23-1
            .text="${this._errorText}"
            .guid="${this._GUID}"
          ></kuc-base-error-1-23-1>
        </div>
      `}updated(){this._invalidValue=""}_updateErrorText(){this._errorText=this._errorFormat||this.error}_getLanguage(){const e=["en","ja","zh","zh-TW","es"];return e.indexOf(this.language)!==-1?this.language:e.indexOf(document.documentElement.lang)!==-1?document.documentElement.lang:"en"}_handleClickLabel(e){e.preventDefault()}_handleDateChange(e){e.stopPropagation(),e.preventDefault();const i={oldValue:this.value,value:""};e.detail.error?(this.value=void 0,this._invalidValue=this._dateInput.value,this._errorFormat=e.detail.error,this.error="",i.value=void 0):(this._errorFormat="",this.value=e.detail.value===void 0?"":e.detail.value,i.value=this.value),this._dispatchChangeEvent(i)}_dispatchChangeEvent(e){f(this,"change",e)}}Ie([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),Ie([l({type:String})],a.prototype,"error",void 0),Ie([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),Ie([l({type:String})],a.prototype,"label",void 0),Ie([l({type:Boolean})],a.prototype,"disabled",void 0),Ie([l({type:Boolean})],a.prototype,"requiredIcon",void 0),Ie([l({type:String,attribute:"lang",reflect:!0,converter:ot})],a.prototype,"language",void 0),Ie([l({type:String})],a.prototype,"value",void 0),Ie([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),Ie([g(".kuc-base-date-1-23-1__input")],a.prototype,"_dateInput",void 0),window.customElements.define("kuc-date-picker-1-23-1",a),x(bs),Bi=a})();const ms=`
:lang(ja) .kuc-base-time-1-23-1__group input.kuc-base-time-1-23-1__group__hours,
:lang(ja) .kuc-base-time-1-23-1__group input.kuc-base-time-1-23-1__group__minutes {
  width: 2ch;
}
.kuc-base-time-1-23-1__group {
  display: inline-flex;
  position: relative;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  max-width: 85px;
  width: 85px;
  height: 40px;
  color: #333333;
  border: solid 1px #e3e7e8;
  box-sizing: border-box;
  padding: 0px 8px;
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
  background-color: #ffffff;
  overflow: hidden;
}
.kuc-base-time-1-23-1__group input.kuc-base-time-1-23-1__group__hours {
  border: 0px;
  padding: 0px;
  width: 2ch;
  font-size: inherit;
  outline: none;
  background-color: transparent;
  color: #333333;
  caret-color: transparent;
  user-select: none;
}
.kuc-base-time-1-23-1__group input.kuc-base-time-1-23-1__group__minutes {
  border: 0px;
  padding: 0px;
  width: 2ch;
  font-size: inherit;
  outline: none;
  background-color: transparent;
  color: #333333;
  caret-color: transparent;
  user-select: none;
}
.kuc-base-time-1-23-1__group input.kuc-base-time-1-23-1__group__hours:focus {
  border: 0px;
}
.kuc-base-time-1-23-1__group input.kuc-base-time-1-23-1__group__minutes:focus {
  border: 0px;
}
.kuc-base-time-1-23-1__group__colon {
  width: auto;
  text-align: center;
}
.kuc-base-time-1-23-1__group input.kuc-base-time-1-23-1__group__suffix {
  border: 0px;
  width: 3ch;
  text-align: right;
  font-size: inherit;
  outline: none;
  appearance: none;
  margin-left: 1px;
  padding: 0px;
  background-color: transparent;
  color: #333333;
  caret-color: transparent;
  user-select: none;
}
.kuc-base-time-1-23-1__group--focus {
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
  border: 1px solid #3498db;
  background-color: #ffffff;
  color: #333333;
}
.kuc-base-time-1-23-1__assistive-text {
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  position: absolute !important;
  padding: 0px !important;
  border: 0px !important;
  height: 1px !important;
  width: 1px !important;
}
.kuc-base-time-1-23-1__group--disabled {
  background-color: #d4d7d7;
  box-shadow: none;
  color: #888888;
  cursor: not-allowed;
}
.kuc-base-time-1-23-1__group--disabled input:disabled,
.kuc-base-time-1-23-1__group--disabled span {
  cursor: not-allowed;
  color: #888888;
  -webkit-text-fill-color: #888888;
}
`;var U=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class H extends k{constructor(){super(...arguments),this.language="en",this.max="",this.min="",this.value="",this.disabled=!1,this.hour12=!1,this.timeStep=30,this._listBoxVisible=!1,this._valueLabel="",this._doFocusListBox=!1,this._hours="",this._minutes="",this._suffix="",this._valueForReset="",this._locale=O("en")}update(t){(t.has("hour12")||t.has("timeStep")||t.has("max")||t.has("min"))&&(this._listBoxItems=Mn(this.hour12,this.timeStep,this.min,this.max),this._updateInputValue()),t.has("value")&&this._updateInputValue(),t.has("language")&&(this._locale=O(this.language)),super.update(t)}render(){return _`
      <div class="kuc-base-time-1-23-1__group" @click="${this._handleClickInputGroup}">
        <input
          type="text"
          class="kuc-base-time-1-23-1__group__hours"
          role="spinbutton"
          tabindex="${this._hours?"0":"-1"}"
          aria-label="Hour"
          @focus="${this._handleFocusInput}"
          @blur="${this._handleBlurInput}"
          @keydown="${this._handleKeyDownInput}"
          @paste="${this._handlePasteInput}"
          ?disabled="${this.disabled}"
          value="${this._hours}"
        />
        ${this._getColonTemplate()}
        <input
          type="text"
          class="kuc-base-time-1-23-1__group__minutes"
          role="spinbutton"
          tabindex="${this._minutes?"0":"-1"}"
          aria-label="Minute"
          @focus="${this._handleFocusInput}"
          @blur="${this._handleBlurInput}"
          @keydown="${this._handleKeyDownInput}"
          @paste="${this._handlePasteInput}"
          ?disabled="${this.disabled}"
          value="${this._minutes}"
        />
        ${this._getSuffixTemplate()}
      </div>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="${this._listBoxVisible}"
        class="kuc-base-time-1-23-1__assistive-text"
        @keydown="${this._handleKeyDownButton}"
        @focus="${this._handleFocusButton}"
        @blur="${this._handleBlurButton}"
        ?disabled="${this.disabled}"
      >
        show time picker
      </button>
      ${this._getListBoxTemplate()}
    `}updated(t){t.has("disabled")&&this._toggleDisabledGroup(),super.update(t)}_handleClickInputGroup(t){if(this.disabled)return;if(this.value===""){this._toggleEl.focus(),this._openListBox();return}const e=t.target;if(this._openListBox(),e.tagName.toUpperCase()==="INPUT"){e.select();return}this._hoursEl.select()}_handleBlurListBox(t){t.preventDefault(),!this._inputFocusEl&&(this._listBoxVisible=!1)}_toggleDisabledGroup(){return this.disabled?this._inputGroupEl.classList.add("kuc-base-time-1-23-1__group--disabled"):this._inputGroupEl.classList.remove("kuc-base-time-1-23-1__group--disabled")}_updateInputValue(){var t;const e=On(this.value,this.hour12);this._hours=e.hours,this._minutes=e.minutes,this._suffix=e.suffix||"",this._valueLabel=this._getValueLabel(e),this._inputGroupEl&&(this._setValueToInput(e),(t=this._inputFocusEl)===null||t===void 0||t.select())}_getValueLabel(t){if(!t.hours||!t.minutes)return"";const e=`${t.hours}:${t.minutes}`;return t.suffix?e+` ${t.suffix}`:e}_setValueToInput(t){this._hoursEl.value=t.hours,this._minutesEl.value=t.minutes,this._suffixEl&&(this._suffixEl.value=t.suffix||"")}_handleKeyDownButton(t){switch(t.key){case"Tab":case"Escape":if(t.key==="Escape"&&t.preventDefault(),!this._listBoxVisible)return;this._closeListBox();break;case"Enter":case" ":case"ArrowUp":case"ArrowDown":t.preventDefault(),t.stopPropagation(),this._openListBoxByKey();break;default:t.preventDefault(),t.stopPropagation(),this._handleDefaultKeyButton(t.key);break}}_handleBlurButton(){this._inputGroupEl.classList.remove("kuc-base-time-1-23-1__group--focus")}_handleFocusButton(t){t.stopPropagation(),this._inputGroupEl.classList.add("kuc-base-time-1-23-1__group--focus")}_openListBoxByKey(){return this._listBoxVisible?!1:(this._valueForReset=this.value,this._doFocusListBox=!0,this._listBoxVisible=!0,this._inputGroupEl.classList.remove("kuc-base-time-1-23-1__group--focus"),!0)}_handleListBoxEscape(){if(this._closeListBox(),this.value=this._valueForReset,this._actionUpdateInputValue(this.value),this.value===""){this._toggleEl.focus();return}this._hoursEl.select()}_handleDefaultKeyButton(t){if(!/^[0-9]$/i.test(t)||this.value!=="")return;const i=this._computeNumberKeyValueHours(t);this._actionUpdateInputValue(i),this._hoursEl.select()}_handleChangeListBox(t){if(t.preventDefault(),t.stopPropagation(),this._closeListBox(),this._inputFocusEl=this._hoursEl,this._hoursEl.select(),!t.detail.value)return;const e=t.detail.value;this._actionUpdateInputValue(e)}_handleListBoxFocusChange(t){const e=t.detail.value,i=Dt(e);this._actionUpdateInputValue(i)}_handleFocusInput(t){this._inputFocusEl=t.target,this._inputFocusEl.select(),this._inputGroupEl.classList.add("kuc-base-time-1-23-1__group--focus")}_handleBlurInput(t){this._inputFocusEl=null;const e=t.relatedTarget;e&&e instanceof HTMLInputElement&&[this._hoursEl,this._minutesEl,this._suffixEl].indexOf(e)>-1||(this._closeListBox(),this._inputGroupEl.classList.remove("kuc-base-time-1-23-1__group--focus"))}_handleTabKey(t){return t.key==="Tab"}_handleKeyDownInput(t){this._closeListBox(),!this._handleTabKey(t)&&this._handleSupportedKey(t)}_handlePasteInput(t){t.preventDefault()}_handleSupportedKey(t){t.preventDefault();const e=t.key;let i;switch(e){case"Enter":case"ArrowRight":this._actionSelectNextRange();break;case"ArrowLeft":this._actionSelectPreviousRange();break;case"ArrowUp":i=this._computeArrowUpDownValue(1),this._actionUpdateInputValue(i);break;case"ArrowDown":i=this._computeArrowUpDownValue(-1),this._actionUpdateInputValue(i);break;case"Backspace":case"Delete":i=this._computeDeleteValue(),this._actionUpdateInputValue(i);break;default:i=this._computeDefaultKeyValue(e),this._actionUpdateInputValue(i);break}}_actionUpdateInputValue(t){const e=this.value===""?this.value:this._formatKeyDownValue(),i=Dt(e),o=Dt(t);i!==o&&(this.value=o,this._dispatchEventTimeChange(o,i))}_computeDeleteValue(){return this._inputFocusEl===this._minutesEl?this._formatKeyDownValue({minutes:"00"}):this._inputFocusEl===this._hoursEl?this._formatKeyDownValue({hours:"00"}):this._formatKeyDownValue()}_computeArrowUpDownValue(t){return this._inputFocusEl===this._hoursEl?this._computeArrowUpDownHourValue(t):this._inputFocusEl===this._minutesEl?this._computeArrowUpDownMinuteValue(t):this._computeKeyDownSuffixValue()}_computeKeyDownSuffixValue(t){if(!t){const o=this._suffix===Ce.AM?Ce.PM:Ce.AM;return this._formatKeyDownValue({suffix:o})}if(["a","A","p","P"].indexOf(t)===-1)return this._formatKeyDownValue();const i=t==="a"||t==="A"?Ce.AM:Ce.PM;return this.value===""&&this._hoursEl.select(),this._formatKeyDownValue({suffix:i})}_computeArrowUpDownHourValue(t){let i=parseInt(this._hours,10)+t;return this.hour12?(i%=fe,i=i<=0?fe:i):(i%=Me,i=i<0?Me-1:i),this._formatKeyDownValue({hours:i.toString()})}_computeArrowUpDownMinuteValue(t){let i=parseInt(this._minutes,10)+t;return i%=it,i=i<0?it-1:i,this._formatKeyDownValue({minutes:i.toString()})}_computeDefaultKeyValue(t){return/^[0-9]$/i.test(t)?this._computeNumberKeyValue(t):this._inputFocusEl===this._suffixEl?this._computeKeyDownSuffixValue(t):this._formatKeyDownValue()}_computeNumberKeyValue(t){return this._inputFocusEl===this._minutesEl?this._computeNumberKeyValueMinutes(t):this._inputFocusEl===this._hoursEl?this._computeNumberKeyValueHours(t):this._formatKeyDownValue()}_computeNumberKeyValueMinutes(t){const e=this._getPreviousMinutes(this._minutes),i=I(e+t);return this.value===""?(this._hoursEl.select(),this._computeNumberKeyValueHours(t)):this._formatKeyDownValue({minutes:i})}_computeNumberKeyValueHours(t){const e=this._getPreviousHours(this._hours,t),i=I(e+t);return this.value===""?this._formatKeyDownValue({hours:i,minutes:"00"}):this._formatKeyDownValue({hours:i})}_getPreviousMinutes(t){let e;return e=parseInt(t,10)>10?(""+t)[1]:""+t,e=parseInt(e,10)>5?"0":e,e}_getPreviousHours(t,e){let i;i=parseInt(t,10)>10?(""+t)[1]:""+t;const o=parseInt(i+e,10);return i=this.hour12&&o>fe||!this.hour12&&o>=Me?"0":i,i}_actionSelectNextRange(){if(this._inputFocusEl===this._hoursEl){this._minutesEl.select();return}this.hour12&&this._inputFocusEl===this._minutesEl&&this._suffixEl.select()}_actionSelectPreviousRange(){if(this._inputFocusEl===this._suffixEl){this._minutesEl.select();return}this._inputFocusEl===this._minutesEl&&this._hoursEl.select()}_dispatchEventTimeChange(t,e){const i={value:t,oldValue:e};(Fe(t,this.min)<0||Fe(this.max,t)<0)&&(i.error=this._locale.TIME_IS_OUT_OF_VALID_RANGE),f(this,"kuc:base-time-change",i)}_formatKeyDownValue(t={hours:this._hours,minutes:this._minutes,suffix:this._suffix}){const e=t.hours||this._hours,i=t.minutes||this._minutes,o=t.suffix||this._suffix,n=`${I(e)}:${I(i)}`;return o?`${n} ${o}`:n}_openListBox(){this._listBoxVisible||(this._doFocusListBox=!1,this._listBoxVisible=!0)}_closeListBox(){this._doFocusListBox=!1,this._listBoxVisible=!1}_getColonTemplate(){return this._hours?_` <span class="kuc-base-time-1-23-1__group__colon">:</span> `:""}_getSuffixTemplate(){return this.hour12?_`
          <input
            class="kuc-base-time-1-23-1__group__suffix"
            role="spinbutton"
            tabindex="${this._suffix?"0":"-1"}"
            aria-label="${this._suffix||"suffix"}"
            @focus="${this._handleFocusInput}"
            @blur="${this._handleBlurInput}"
            @keydown="${this._handleKeyDownInput}"
            @paste="${this._handlePasteInput}"
            ?disabled="${this.disabled}"
            value="${this._suffix}"
          />
        `:""}_getListBoxTemplate(){return this._listBoxVisible?_`
          <kuc-base-datetime-listbox-1-23-1
            maxHeight="165"
            aria-hidden="${!this._listBoxVisible}"
            class="kuc-base-time-1-23-1__group__listbox"
            .items="${this._listBoxItems||[]}"
            .value="${this._valueLabel}"
            .doFocus="${this._doFocusListBox}"
            @kuc:listbox-click="${this._handleChangeListBox}"
            @kuc:listbox-blur="${this._handleBlurListBox}"
            @kuc:listbox-focus-change="${this._handleListBoxFocusChange}"
            @kuc:listbox-escape="${this._handleListBoxEscape}"
          ></kuc-base-datetime-listbox-1-23-1>
        `:""}}U([l({type:String,attribute:"lang",reflect:!0})],H.prototype,"language",void 0),U([l({type:String})],H.prototype,"max",void 0),U([l({type:String})],H.prototype,"min",void 0),U([l({type:String})],H.prototype,"value",void 0),U([l({type:Boolean})],H.prototype,"disabled",void 0),U([l({type:Boolean})],H.prototype,"hour12",void 0),U([l({type:Number})],H.prototype,"timeStep",void 0),U([v()],H.prototype,"_listBoxVisible",void 0),U([v()],H.prototype,"_valueLabel",void 0),U([v()],H.prototype,"_doFocusListBox",void 0),U([v()],H.prototype,"_hours",void 0),U([v()],H.prototype,"_minutes",void 0),U([v()],H.prototype,"_suffix",void 0),U([v()],H.prototype,"_inputFocusEl",void 0),U([g(".kuc-base-time-1-23-1__group__hours")],H.prototype,"_hoursEl",void 0),U([g(".kuc-base-time-1-23-1__group__minutes")],H.prototype,"_minutesEl",void 0),U([g(".kuc-base-time-1-23-1__group__suffix")],H.prototype,"_suffixEl",void 0),U([g(".kuc-base-time-1-23-1__assistive-text")],H.prototype,"_toggleEl",void 0),U([g(".kuc-base-time-1-23-1__group")],H.prototype,"_inputGroupEl",void 0),window.customElements.get("kuc-base-time-1-23-1")||(x(ms),window.customElements.define("kuc-base-time-1-23-1",H));const vs=`
kuc-datetime-picker-1-23-1,
kuc-datetime-picker-1-23-1 *,
kuc-datetime-picker-1-23-1:lang(en),
kuc-datetime-picker-1-23-1:lang(en) * {
  font-family: sans-serif;
}
kuc-datetime-picker-1-23-1:lang(ja),
kuc-datetime-picker-1-23-1:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
}
kuc-datetime-picker-1-23-1:lang(zh),
kuc-datetime-picker-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-datetime-picker-1-23-1:lang(zh-TW),
kuc-datetime-picker-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC"
}
kuc-datetime-picker-1-23-1:lang(es),
kuc-datetime-picker-1-23-1:lang(es) * {
  font-family: sans-serif;
}
kuc-datetime-picker-1-23-1 {
  font-size: 14px;
  display: inline-table;
  vertical-align: top;
  line-height: 1.5;
  max-width: calc(var(--kuc-date-time-picker-date-input-width, 100px) + var(--kuc-date-time-picker-time-input-width, 85px));
  width: calc(var(--kuc-date-time-picker-date-input-width, 100px) + var(--kuc-date-time-picker-time-input-width, 85px));
}
kuc-datetime-picker-1-23-1[hidden] {
  display: none;
}
.kuc-datetime-picker-1-23-1__group {
  border: none;
  padding: 0px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 0px;
}
.kuc-datetime-picker-1-23-1__group__label {
  display: inline-block;
  padding: 4px 0px 8px 0px;
  white-space: nowrap;
}
.kuc-datetime-picker-1-23-1__group__label[hidden] {
  display: none;
}
.kuc-datetime-picker-1-23-1__group__inputs {
  display: flex;
  width: calc(var(--kuc-date-time-picker-date-input-width, 100px) + var(--kuc-date-time-picker-time-input-width, 85px));
}
.kuc-datetime-picker-1-23-1__group__inputs--time {
  position: relative;
}
.kuc-datetime-picker-1-23-1__group input[type=text].kuc-base-date-1-23-1__input {
  width: var(--kuc-date-time-picker-date-input-width, 100px);
  height: var(--kuc-date-time-picker-input-height, 40px);
  color: var(--kuc-date-time-picker-input-color, #333333);
  font-size: var(--kuc-date-time-picker-input-font-size, 14px);
}
.kuc-datetime-picker-1-23-1__group .kuc-base-time-1-23-1__group {
  max-width: var(--kuc-date-time-picker-time-input-width, 85px);
  width: var(--kuc-date-time-picker-time-input-width, 85px);
  font-size: var(--kuc-date-time-picker-input-font-size, 14px);
  height: var(--kuc-date-time-picker-input-height, 40px);
  color: var(--kuc-date-time-picker-input-color, #333333);
}
.kuc-datetime-picker-1-23-1__group .kuc-base-time-1-23-1__group input[type=text].kuc-base-time-1-23-1__group__hours,
.kuc-datetime-picker-1-23-1__group .kuc-base-time-1-23-1__group input[type=text].kuc-base-time-1-23-1__group__minutes,
.kuc-datetime-picker-1-23-1__group .kuc-base-time-1-23-1__group input.kuc-base-time-1-23-1__group__suffix,
.kuc-datetime-picker-1-23-1__group .kuc-base-time-1-23-1__group--focus  {
  color: var(--kuc-date-time-picker-input-color, #333333);
}
`;var Z=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Oi;(()=>{if(Oi=window.customElements.get("kuc-datetime-picker-1-23-1"),Oi)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.language="auto",this.max="",this.min="",this.value="",this.disabled=!1,this.hour12=!1,this.requiredIcon=!1,this.visible=!0,this.timeStep=30,this._dateValue="",this._timeValue="",this._previousTimeValue="",this._previousDateValue="",this._errorFormat="",this._errorText="",this._dateConverted="",this._changeDateByUI=!1,this._changeTimeByUI=!1,this._inputMax="",this._inputMin="",this._timeConverted="",this._errorInvalidTime="",this._inputTimeStep=30,this._GUID=D();const i=S(e);Object.assign(this,i)}shouldUpdate(e){return(e.has("max")||e.has("min"))&&!this._checkAndUpdateMaxMinProperty()||e.has("timeStep")&&!this._checkAndUpdateTimeStepProperty()?!1:this.value===void 0||this.value===""?!0:typeof this.value!="string"?(this.throwErrorAfterUpdateComplete(G.VALUE),!1):(this._dateAndTime=this._getDateTimeValue(this.value),this._dateConverted=Jt(this._dateAndTime.date),_a(this._dateAndTime.date,this._dateAndTime.time)&&Oe(this._dateConverted)?(this._timeConverted=Be(this._dateAndTime.time.slice(0,5)),e.has("value")&&(Fe(this._timeConverted,this._inputMin)<0||Fe(this._inputMax,this._timeConverted)<0)?(this.throwErrorAfterUpdateComplete(Qo),!1):!0):(this.throwErrorAfterUpdateComplete(G.VALUE),!1))}willUpdate(e){if(this._changeDateByUI||this._changeTimeByUI){this._updateValueChangeByUI();return}this._updateValueWhenSetter()}_checkAndUpdateMaxMinProperty(){let e=this._inputMin,i=this._inputMax;if(this.max===void 0||this.max==="")i=ta;else{if(!at(this.max))return this.throwErrorAfterUpdateComplete(G.MAX),!1;i=this.max=Be(this.max)}if(this.min===void 0||this.min==="")e=wi;else{if(!at(this.min))return this.throwErrorAfterUpdateComplete(G.MIN),!1;e=this.min=Be(this.min)}return Fe(i,e)<0?(this.throwErrorAfterUpdateComplete(Xo),!1):(this._inputMin=e,this._inputMax=i,!0)}_checkAndUpdateTimeStepProperty(){return nt(this.timeStep)?ha(this.timeStep,this._inputMax,this._inputMin)?(this._inputTimeStep=this.timeStep,!0):(this.throwErrorAfterUpdateComplete(G.TIME_STEP),!1):(this.throwErrorAfterUpdateComplete(ea),!1)}_updateValueChangeByUI(){const e=this._validateDateTimeFormat();this.value=e?this.value:void 0,e&&!this._dateValue&&!this._timeValue&&(this.value="");const i=!this._dateValue&&this._timeValue,o=this._dateValue&&!this._timeValue;if(i||o){this._errorText=this.error||this._errorFormat||this._errorInvalidTime;return}this._errorText=e?this.error:this._errorFormat||this._errorInvalidTime}_validateDateTimeFormat(){const e=!!this._timeValue&&!this._dateValue,i=!!this._dateValue&&!this._timeValue;return!this._errorFormat&&!this._errorInvalidTime&&!e&&!i}_updateValueWhenSetter(){if(this._errorText=this.error,this.value===""||this.value===void 0){this._previousTimeValue="",this._errorFormat="",this._errorInvalidTime="";return}this._setDateTimeValueSeparate(this._dateAndTime,this._dateConverted),this.value=this._getDateTimeString()}_setDateTimeValueSeparate(e,i){this._dateValue=i||this._dateInput.value,this._timeValue=this._dateValue&&Oe(i)?Be(e.time.slice(0,5)):this._previousTimeValue}update(e){e.has("value")&&(this.value===void 0&&this._setUndefinedValue(),this.value===""&&this._setEmptyValue()),(e.has("max")||e.has("min")||e.has("value"))&&this.value!==void 0&&(this._errorInvalidTime=""),super.update(e)}_setUndefinedValue(){if(!this._changeTimeByUI){if(this._errorFormat){if(this._changeDateByUI){this._dateValue=this._dateInput.value;return}this._dateValue="",this._timeValue="";return}this._dateValue=this._previousDateValue,this._timeValue=this._previousTimeValue}}_setEmptyValue(){this._dateValue="",this._timeValue="",this._previousTimeValue="",this._previousDateValue="",this._errorFormat="",this._errorInvalidTime=""}render(){return _`
        <fieldset
          class="kuc-datetime-picker-1-23-1__group"
          aria-describedby="${this._GUID}-error"
        >
          <legend
            class="kuc-datetime-picker-1-23-1__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </legend>
          <div class="kuc-datetime-picker-1-23-1__group__inputs">
            <kuc-base-date-1-23-1
              class="kuc-datetime-picker-1-23-1__group__inputs--date"
              .value="${this._dateValue}"
              .language="${this._getLanguage()}"
              .disabled="${this.disabled}"
              inputAriaLabel="date"
              @kuc:base-date-change="${this._handleDateChange}"
            ></kuc-base-date-1-23-1
            ><kuc-base-time-1-23-1
              class="kuc-datetime-picker-1-23-1__group__inputs--time"
              .value="${this._timeValue}"
              .hour12="${this.hour12}"
              .disabled="${this.disabled}"
              .timeStep="${this._inputTimeStep}"
              .min="${this._inputMin}"
              .max="${this._inputMax}"
              .language="${this._getLanguage()}"
              @kuc:base-time-change="${this._handleTimeChange}"
            ></kuc-base-time-1-23-1>
          </div>
          <kuc-base-error-1-23-1
            .text="${this._errorText}"
            .guid="${this._GUID}"
            ?hidden="${!this._errorText}"
          ></kuc-base-error-1-23-1>
        </fieldset>
      `}updated(){this._resetState()}_resetState(){this._previousTimeValue="",this._previousDateValue="",this._changeDateByUI=!1,this._changeTimeByUI=!1}_handleDateChange(e){e.stopPropagation(),e.preventDefault(),this._changeDateByUI=!0;let i=this._dateValue;e.detail.error?(this._errorFormat=e.detail.error,this.error=""):(i=e.detail.value,this._errorFormat=""),this._updateDateTimeValue(i,"date")}_handleTimeChange(e){e.preventDefault(),e.stopPropagation(),this._changeTimeByUI=!0;const i=e.detail.value;e.detail.error?(this._errorInvalidTime=e.detail.error,this.error=""):this._errorInvalidTime="",this._updateDateTimeValue(i,"time")}_updateDateTimeValue(e,i){const o=this.value;i==="date"?this._dateValue=e||"":this._timeValue=e,this._previousTimeValue=this._timeValue,this._previousDateValue=this._dateValue;const n=this._errorFormat||this._errorInvalidTime?void 0:this._getDateTimeString(),s=this._errorFormat||this._errorInvalidTime?void 0:n;this.value=s,this._validateDateTimeFormat()&&!this._dateValue&&!this._timeValue&&(this.value="");const u={value:this.value,oldValue:o,changedPart:i};f(this,"change",u)}_getDateTimeString(){if(!this._dateValue||!this._timeValue)return;if(!this.value)return`${this._dateValue}T${this._timeValue}:00`;const e=this.value.split(":");return e.length===3?`${this._dateValue}T${this._timeValue}:${e[2]}`:`${this._dateValue}T${this._timeValue}:00`}_getDateTimeValue(e){if(e===""||e===void 0)return{date:"",time:""};const i=e.split("T"),o=i[0],n=i[1];if(e.indexOf("T")===e.length-1||i.length>2)return{date:o,time:""};if(!n)return{date:o,time:wi};const[s,r,u]=n.split(":");if(s===""||r===""||u==="")return{date:o,time:n};const c=`${s}:${r||"00"}`;return u?{date:o,time:`${c}:${u}`}:{date:o,time:c}}_getLanguage(){const e=["en","ja","zh","zh-TW","es"];return e.indexOf(this.language)!==-1?this.language:e.indexOf(document.documentElement.lang)!==-1?document.documentElement.lang:"en"}}Z([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),Z([l({type:String})],a.prototype,"error",void 0),Z([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),Z([l({type:String})],a.prototype,"label",void 0),Z([l({type:String,attribute:"lang",reflect:!0,converter:ot})],a.prototype,"language",void 0),Z([l({type:String})],a.prototype,"max",void 0),Z([l({type:String})],a.prototype,"min",void 0),Z([l({type:String,hasChanged(t,e){return(t===""||t===void 0)&&t===e?!0:t!==e}})],a.prototype,"value",void 0),Z([l({type:Boolean})],a.prototype,"disabled",void 0),Z([l({type:Boolean})],a.prototype,"hour12",void 0),Z([l({type:Boolean})],a.prototype,"requiredIcon",void 0),Z([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),Z([l({type:Number})],a.prototype,"timeStep",void 0),Z([g(".kuc-base-date-1-23-1__input")],a.prototype,"_dateInput",void 0),window.customElements.define("kuc-datetime-picker-1-23-1",a),x(vs),Oi=a})();const ks=`
  kuc-dialog-1-23-1,
  kuc-dialog-1-23-1 *,
  kuc-dialog-1-23-1:lang(en),
  kuc-dialog-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-dialog-1-23-1:lang(es),
  kuc-dialog-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-dialog-1-23-1:lang(ja),
  kuc-dialog-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-dialog-1-23-1:lang(zh),
  kuc-dialog-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-dialog-1-23-1:lang(zh-TW),
  kuc-dialog-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }

  kuc-dialog-1-23-1 {
    display: none;
  }

  kuc-dialog-1-23-1[opened] {
    display: block;
  }

  .kuc-dialog-1-23-1__dialog {
    min-width: 400px;
    max-width: var(--kuc-dialog-max-width, 600px);
    width: max-content;
    font-size: 20px;
    background-color: #ffffff;
    position: fixed;
    line-height: normal;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
  }
  
  .kuc-dialog-1-23-1__dialog:focus-visible {
    outline: 1px solid #3498db;
  }

  .kuc-dialog-1-23-1__dialog__header {
    min-height: 64px;
    border-bottom: 1px solid #e3e7e8;
    display: flex;
    justify-content: space-between;
  }

  .kuc-dialog-1-23-1__dialog__header__title {
    font-size: var(--kuc-dialog-header-font-size, 24px);
    color: var(--kuc-dialog-header-color);
    padding: 0 24px;
    align-self: center;
    overflow-wrap: anywhere;
    word-break: normal;
    font-weight: 400;
  }

  .kuc-dialog-1-23-1__dialog__header__close-button {
    width: 48px;
    height: 48px;
    border: none;
    background-color: #ffffff;
    margin-right: 12px;
    margin-top: 11px;
    cursor: pointer;
  }

  .kuc-dialog-1-23-1__dialog__header__close-button:focus-visible {
    outline: 1px solid #3498db;
  }

  .kuc-dialog-1-23-1__dialog__header__close-button-svg {
    vertical-align: middle;
  }

  .kuc-dialog-1-23-1__dialog__content {
    border-bottom: #e3e7e8 solid 1px;
    background-color: #f7f9fa;
    padding: 24px;
    display: flex;
    overflow: auto;
  }

  .kuc-dialog-1-23-1__dialog__content__content {
    line-height: 1.2;
    overflow-wrap: anywhere;
    word-break: normal;
  }

  .kuc-dialog-1-23-1__dialog__content__icon-info,
  .kuc-dialog-1-23-1__dialog__content__icon-success,
  .kuc-dialog-1-23-1__dialog__content__icon-error,
  .kuc-dialog-1-23-1__dialog__content__icon-warning,
  .kuc-dialog-1-23-1__dialog__content__icon-question {
    margin-right: 16px;
    width: 24px;
    height: 24px;
  }

  .kuc-dialog-1-23-1__dialog__footer {
    padding: 24px;
    overflow-wrap: anywhere;
    word-break: normal;
  }

  .kuc-dialog-1-23-1__dialog__footer[hidden] {
    display: none;
  }

  .kuc-dialog-1-23-1__mask {
    position: fixed;
    top: 0;
    right: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.6;
    z-index: 9999;
  }

  .kuc--has-dialog {
    overflow: hidden;
  }

  .kuc--has-dialog .kuc-dialog-1-23-1__dialog {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 80vh;
  }
`;var ce=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let oi;(()=>{if(oi=window.customElements.get("kuc-dialog-1-23-1"),oi)return;class a extends k{constructor(e){super(),this.className="",this.icon="",this.id="",this.title="",this.content="",this.footer="",this.header="",this.container=document.body,this.footerVisible=!0,this._isOpened=!1,this._triggeredElement=null,this._content="",this._footer="",this._header="",this._GUID=D();const i=S(e);Object.assign(this,i)}_handleFocusFirstDummy(){const e=this._focusableElements[this._focusableElements.length-2];e&&e.focus()}_handleFocusLastDummy(){this._dialogEl.focus()}_handleKeyDownDialog(e){e.key==="Escape"&&(e.preventDefault(),this.close())}_handleClickCloseButton(e){this.close()}_getCloseButtonSvgTemplate(){return C`
        <svg
          class="kuc-dialog-1-23-1__dialog__header__close-button-svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
            fill="#f7f9fa"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.4765 15.7071L20.1229 12.0607L20.4765 11.7071L19.7694 11L19.4158 11.3536L15.7694 15L12.1229 11.3536L11.7694 11L11.0623 11.7071L11.4158 12.0607L15.0623 15.7071L11.3536 19.4158L11 19.7694L11.7071 20.4765L12.0607 20.1229L15.7694 16.4142L19.4781 20.1229L19.8316 20.4765L20.5387 19.7694L20.1852 19.4158L16.4765 15.7071Z"
            fill="#888888"
          />
        </svg>
      `}_getIconTemplate(){switch(this.icon){case"info":return C`
            <svg
              class="kuc-dialog-1-23-1__dialog__content__icon-info"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.09673 17.7173C13.9604 17.7173 17.9032 13.7933 17.9032 8.95287C17.9032 4.11243 13.9604 0.188477 9.09673 0.188477C4.23306 0.188477 0.290283 4.11243 0.290283 8.95287C0.290283 13.7933 4.23306 17.7173 9.09673 17.7173Z"
                fill="#448aca"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.71195 7.96235C8.81719 7.69023 8.67929 7.5524 8.5559 7.5524C7.98977 7.5524 7.24945 8.87059 6.97364 8.87059C6.86531 8.86323 6.77965 8.7783 6.77405 8.67269C6.77405 8.40057 7.44905 7.76444 7.64864 7.57007C8.25505 6.95498 9.08189 6.59163 9.95671 6.5558C10.6172 6.5558 11.3249 6.94808 10.7696 8.4147L9.66276 11.3656C9.53205 11.6338 9.44394 11.9198 9.40147 12.2138C9.3955 12.2661 9.41197 12.3186 9.44701 12.3587C9.48204 12.3988 9.53253 12.4231 9.58655 12.4258C10.0474 12.4258 10.893 11.1394 11.1107 11.1394C11.221 11.1597 11.2987 11.2565 11.2922 11.3656C11.2922 11.8038 9.49582 13.6804 7.9426 13.6804C7.38735 13.6804 7.00268 13.4224 7.00268 12.8499C7.00268 12.1219 7.52889 10.8815 7.63413 10.6235L8.71195 7.96235ZM9.53937 4.97962C9.55317 4.3095 10.114 3.77277 10.8023 3.77099C11.0868 3.75724 11.364 3.86105 11.5658 4.05686C11.7675 4.25267 11.8751 4.52229 11.862 4.79939C11.8604 5.12532 11.7247 5.43704 11.4853 5.66484C11.2459 5.89264 10.9228 6.01752 10.5882 6.01156C10.3033 6.02775 10.0251 5.92385 9.82434 5.72636C9.62362 5.52886 9.51981 5.25684 9.53937 4.97962Z"
                fill="white"
              />
            </svg>
          `;case"success":return C`
            <svg
              class="kuc-dialog-1-23-1__dialog__content__icon-success"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9.09673 17.7173C13.9604 17.7173 17.9032 13.7933 17.9032 8.95287C17.9032 4.11243 13.9604 0.188477 9.09673 0.188477C4.23306 0.188477 0.290283 4.11243 0.290283 8.95287C0.290283 13.7933 4.23306 17.7173 9.09673 17.7173Z"
                fill="#2ecc71"
              />
              <path 
                d="M7.45159 10.3666L4.64513 7.44514L2.9032 9.32996L7.45159 13.9478L15.0967 6.59697L13.258 4.8064L7.45159 10.3666Z"
                fill="white"
              />
            </svg>
          `;case"error":return C`
            <svg
              class="kuc-dialog-1-23-1__dialog__content__icon-error"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
                fill="#e74c3c"
              />
              <path
                d="M10.1497 8.99989L12.7572 6.39244L12.9339 6.21567L12.7572 6.03889L11.9617 5.24339L11.7849 5.06661L11.6081 5.24339L9.00063 7.85084L6.39317 5.24339L6.2164 5.06661L6.03962 5.24339L5.24412 6.03889L5.06734 6.21567L5.24412 6.39244L7.85159 8.99989L5.24412 11.6074L5.06734 11.7842L5.24412 11.9609L6.03962 12.7564L6.2164 12.9332L6.39317 12.7564L9.00063 10.1489L11.6081 12.7564L11.7849 12.9332L11.9617 12.7564L12.7572 11.9609L12.9339 11.7842L12.7572 11.6074L10.1497 8.99989Z"
                fill="white"
                stroke="white"
                stroke-width="0.5"
              />
            </svg>
          `;case"warning":return C`
            <svg
              class="kuc-dialog-1-23-1__dialog__content__icon-warning"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.09673 17.7173C13.9604 17.7173 17.9032 13.7933 17.9032 8.95287C17.9032 4.11243 13.9604 0.188477 9.09673 0.188477C4.23306 0.188477 0.290283 4.11243 0.290283 8.95287C0.290283 13.7933 4.23306 17.7173 9.09673 17.7173Z"
                fill="#ffcc00"
              />
              <path
                d="M7.74182 3.76978H10.645L9.91924 9.42423H8.46763L7.74182 3.76978Z"
                fill="#333333"
              />
              <rect
                x="7.74182"
                y="11.3088"
                width="2.90323"
                height="2.82722"
                rx="1"
                fill="#333333"
              />
            </svg>
          `;case"question":return C`
            <svg
              class="kuc-dialog-1-23-1__dialog__content__icon-question"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.0933 8.87676C10.383 9.34006 10.1707 9.73991 10.1469 10.6575C10.1447 10.7581 10.0632 10.8371 9.96337 10.8371H8.08135C8.03123 10.8371 7.89783 10.7033 7.89783 10.6532V9.90432C7.89783 9.11869 8.32111 8.42752 9.1947 7.79043C9.2632 7.7432 9.91722 7.31559 9.91722 6.72573C9.91722 6.23647 9.54947 5.89467 9.022 5.89467C8.27063 5.89467 7.85168 6.27144 7.81166 6.99037C7.80589 7.08736 7.72549 7.16344 7.62815 7.16344H7.53044H5.64914C5.59902 7.16344 5.54999 7.14252 5.51574 7.10611C5.48149 7.07005 5.46274 7.02066 5.46562 6.97054C5.56802 4.97527 6.86452 3.83053 9.02416 3.83053C10.6614 3.83053 12.4248 4.71892 12.4248 6.66984C12.4248 7.97683 12.1266 8.22381 11.0933 8.87676ZM8.99982 0C4.02976 0 0 4.02948 0 9C0 13.9709 4.02976 18 8.99982 18C13.9702 18 18 13.9709 18 9C18 4.02948 13.9702 0 8.99982 0ZM10.503 14.5101C10.503 14.7124 10.3383 14.8775 10.136 14.8775H7.89742C7.69516 14.8775 7.53003 14.7124 7.53003 14.5101V12.3061C7.53003 12.1038 7.69516 11.9387 7.89742 11.9387H10.136C10.3383 11.9387 10.503 12.1038 10.503 12.3061V14.5101Z"
                fill="#666666"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.0933 8.8768C10.383 9.3401 10.1707 9.73995 10.1469 10.6575C10.1447 10.7581 10.0632 10.8371 9.96337 10.8371H8.08135C8.03123 10.8371 7.89783 10.7033 7.89783 10.6532V9.90436C7.89783 9.11872 8.32111 8.42755 9.1947 7.79047C9.2632 7.74323 9.91722 7.31562 9.91722 6.72577C9.91722 6.2365 9.54947 5.8947 9.022 5.8947C8.27063 5.8947 7.85168 6.27148 7.81166 6.99041C7.80589 7.0874 7.72549 7.16347 7.62815 7.16347H7.53044H5.64914C5.59902 7.16347 5.54999 7.14256 5.51574 7.10615C5.48149 7.07009 5.46274 7.0207 5.46562 6.97058C5.56802 4.97531 6.86452 3.83057 9.02416 3.83057C10.6614 3.83057 12.4248 4.71896 12.4248 6.66988C12.4248 7.97687 12.1266 8.22384 11.0933 8.8768V8.8768Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.503 14.5101C10.503 14.7124 10.3383 14.8775 10.136 14.8775H7.89742C7.69516 14.8775 7.53003 14.7124 7.53003 14.5101V12.3061C7.53003 12.1039 7.69516 11.9387 7.89742 11.9387H10.136C10.3383 11.9387 10.503 12.1039 10.503 12.3061V14.5101Z"
                fill="white"
              />
            </svg>
          `;default:return""}}shouldUpdate(e){if(e.has("container")){if(this.container===null||this.container===void 0)return this._isOpened&&this._close(),!1;const i=this._isValidContainerElement(),o=!i||!document.contains(this.container);if(this._isOpened&&o&&this._close(),!i)return this.throwErrorAfterUpdateComplete(y.CONTAINER.INVALID),!1}return!0}update(e){e.has("content")&&(this.content&&K(this.content)?this._content=Q(this.content):this._content=this.content),e.has("footer")&&(this.footer&&K(this.footer)?this._footer=Q(this.footer):this._footer=this.footer),(e.has("header")||e.has("title"))&&(this.header!==null&&this.header!==void 0&&this.header!==""?K(this.header)?this._header=Q(this.header):this._header=this.header:this._header=this.title),super.update(e)}_isValidContainerElement(){return this.container instanceof HTMLElement}open(){if(!this._isValidContainerElement()){document.body.appendChild(this),requestAnimationFrame(()=>{document.body.removeChild(this)}),this.performUpdate();return}this.container.appendChild(this),this.container.classList.add("kuc--has-dialog"),this.performUpdate(),this.setAttribute("opened",""),this._isOpened=!0,this._triggeredElement=document.activeElement,this._dialogEl&&this._dialogEl.focus()}close(){this._close(),f(this,"close")}_close(){this._isOpened=!1,document.getElementsByTagName("body")[0].classList.remove("kuc--has-dialog"),this.removeAttribute("opened"),this._triggeredElement instanceof HTMLElement&&this._triggeredElement.focus()}render(){return _`
        <span
          class="kuc-dialog-1-23-1__first-dummy"
          tabIndex="0"
          @focus="${this._handleFocusFirstDummy}"
        ></span>
        <div
          class="kuc-dialog-1-23-1__dialog"
          role="dialog"
          tabindex="-1"
          aria-labelledby="${this._GUID}-title"
          aria-modal="true"
          @keydown="${this._handleKeyDownDialog}"
        >
          <div class="kuc-dialog-1-23-1__dialog__header">
            <h2
              class="kuc-dialog-1-23-1__dialog__header__title"
              id="${this._GUID}-title"
            >
              ${this._header}
            </h2>
            <button
              class="kuc-dialog-1-23-1__dialog__header__close-button"
              type="button"
              aria-label="close"
              @click="${this._handleClickCloseButton}"
            >
              ${this._getCloseButtonSvgTemplate()}
            </button>
          </div>
          <div class="kuc-dialog-1-23-1__dialog__content">
            <div class="kuc-dialog-1-23-1__dialog__content__icon">
              ${this._getIconTemplate()}
            </div>
            <div class="kuc-dialog-1-23-1__dialog__content__content">
              ${this._content}
            </div>
          </div>
          <div
            class="kuc-dialog-1-23-1__dialog__footer"
            ?hidden="${!this.footerVisible}"
          >
            ${this._footer}
          </div>
        </div>
        <span
          class="kuc-dialog-1-23-1__last-dummy"
          tabIndex="0"
          @focus="${this._handleFocusLastDummy}"
        ></span>
        <div class="kuc-dialog-1-23-1__mask"></div>
      `}}ce([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),ce([l({type:String})],a.prototype,"icon",void 0),ce([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),ce([l({type:String})],a.prototype,"title",void 0),ce([l()],a.prototype,"content",void 0),ce([l()],a.prototype,"footer",void 0),ce([l()],a.prototype,"header",void 0),ce([l()],a.prototype,"container",void 0),ce([l({type:Boolean})],a.prototype,"footerVisible",void 0),ce([v()],a.prototype,"_isOpened",void 0),ce([g(".kuc-dialog-1-23-1__dialog")],a.prototype,"_dialogEl",void 0),ce([z("a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type='text']:not([disabled]), input[type='radio']:not([disabled]), input[type='checkbox']:not([disabled]), select:not([disabled]),[tabindex='0']")],a.prototype,"_focusableElements",void 0),window.customElements.define("kuc-dialog-1-23-1",a),x(ks),oi=a})();const xs=oi,ys=`
  kuc-dropdown-1-23-1,
  kuc-dropdown-1-23-1 *,
  kuc-dropdown-1-23-1:lang(en),
  kuc-dropdown-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-dropdown-1-23-1:lang(es),
  kuc-dropdown-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-dropdown-1-23-1:lang(ja),
  kuc-dropdown-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-dropdown-1-23-1:lang(zh),
  kuc-dropdown-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-dropdown-1-23-1:lang(zh-TW),
  kuc-dropdown-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-dropdown-1-23-1 {
    display: inline-table;
    font-size: 14px;
    color: #333333;
    vertical-align: top;
    width: var(--kuc-dropdown-toggle-width, 180px);
    min-width: var(--kuc-dropdown-toggle-width, 180px);
    line-height: 1.5;
  }
  kuc-dropdown-1-23-1[hidden] {
    display: none;
  }
  .kuc-dropdown-1-23-1__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    width: 100%;
    margin: 0px;
    position: relative;
  }
  .kuc-dropdown-1-23-1__group__label {
    padding: 4px 0px 8px 0px;
    display: inline-block;
    white-space: nowrap;
  }
  .kuc-dropdown-1-23-1__group__label[hidden] {
    display: none;
  }
  .kuc-dropdown-1-23-1__group__toggle {
    height: var(--kuc-dropdown-toggle-height, 40px);
    box-sizing: border-box;
    box-shadow: 1px 1px 1px #ffffff inset;
    border: 1px solid #e3e7e8;
    color: var(--kuc-dropdown-toggle-color, #3498db);
    background-color: #f7f9fa;
    padding: 0 0 0 24px;
    display: grid;
    grid: auto / auto-flow;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    width: var(--kuc-dropdown-toggle-width, 100%);
    cursor: pointer;
  }
  .kuc-dropdown-1-23-1__group__toggle:focus {
    outline: none;
    border: 1px solid #3498db;
  }
  .kuc-dropdown-1-23-1__group__toggle:disabled {
    background-color: #d4d7d7;
    box-shadow: none;
    cursor: not-allowed;
    color: #888888;
  }
  .kuc-dropdown-1-23-1__group__toggle__selected-item-label {
    font-size: var(--kuc-dropdown-font-size, 14px);
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .kuc-dropdown-1-23-1__group__toggle__icon {
    flex: none;
    width: 38px;
    height: 38px;
  }
  .kuc-dropdown-1-23-1__group__select-menu {
    position: absolute;
    min-width: 280px;
    margin: 0;
    padding: 8px 0;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    z-index: 2000;
    list-style: none;
    box-sizing: border-box;
  }
  .kuc-dropdown-1-23-1__group__select-menu[hidden] {
    display: none;
  }
  .kuc-dropdown-1-23-1__group__select-menu__item {
    padding: 8px 16px 8px 24px;
    line-height: 1;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    color: var(--kuc-dropdown-menu-color, #333333);
    font-size: var(--kuc-dropdown-font-size, 14px);
  }
  .kuc-dropdown-1-23-1__group__select-menu__item__icon {
    position: absolute;
    top: 50%;
    left: 6px;
    margin-top: -5px;
  }
  .kuc-dropdown-1-23-1__group__select-menu__item[aria-selected="true"] {
    color: var(--kuc-dropdown-menu-color-selected, #3498db);
  }
  .kuc-dropdown-1-23-1__group__select-menu__highlight[role="option"] {
    background-color: #e2f2fe;
  }
  .kuc-dropdown-1-23-1__group__select-menu__item--disabled,
  .kuc-dropdown-1-23-1__group__select-menu__item--disabled[aria-selected="true"] {
    background-color: #d4d7d7;
    cursor: not-allowed;
    color: #888888;
  }
`;var R=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Hi;(()=>{if(Hi=window.customElements.get("kuc-dropdown-1-23-1"),Hi)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.value="",this.selectedIndex=-1,this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this._selectorVisible=!1,this._DISABLED_CLASS="kuc-dropdown-1-23-1__group__select-menu__item--disabled",this._hasValueInItems=!1,this._GUID=D();const i=S(e);this._handleClickDocument=this._handleClickDocument.bind(this),this._handleScrollMenu=this._handleScrollMenu.bind(this),this._setInitialValue(i),Object.assign(this,i)}_setInitialValue(e){const i="value"in e,o="selectedIndex"in e;!i&&o&&(this.value=this._getValue(e)||"")}_getSelectedLabel(){const e=this.items.filter((i,o)=>this._isCheckedItem(i,o));return e.length===0?"":e[0].label===void 0?e[0].value:e[0].label}_getToggleIconSvgTemplate(){return C`
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.2122 15.6665L25 16.1392L19.7332 21.4998H18.2668L13 16.1392L13.7878 15.6665L18.765 20.6866H19.235L24.2122 15.6665Z"
          fill="#3498db"/>
      </svg>
    `}shouldUpdate(e){return e.has("items")&&!T(this.items)?(this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1):e.has("value")&&!bt(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_STRING),!1):e.has("selectedIndex")&&!nt(this.selectedIndex)?(this.throwErrorAfterUpdateComplete(y.SELECTED_INDEX.IS_NOT_NUMBER),!1):!0}willUpdate(e){if((e.has("items")||e.has("value"))&&(this._hasValueInItems=this.items.some(i=>i.value===this.value)),e.has("value")){if(this.value!==""||this._hasValueInItems)return;this.selectedIndex=-1}}update(e){(e.has("items")||e.has("value")||e.has("selectedIndex"))&&(this.selectedIndex=this._getSelectedIndex(),this.value=this._getValue({items:this.items,selectedIndex:this.selectedIndex})||""),super.update(e)}_getSelectedIndex(){if(!this.value&&!this._hasValueInItems)return this.items[this.selectedIndex]?this.selectedIndex:-1;const e=this.items.findIndex(o=>o.value===this.value);if(e===-1)return-1;const i=this.items.findIndex((o,n)=>o.value===this.value&&n===this.selectedIndex);return i>-1?i:e}_getValue(e){const i=e.items||[],o=e.selectedIndex===0||e.selectedIndex?e.selectedIndex:-1,n=i[o];return n?n.value:""}render(){return _`
        <div class="kuc-dropdown-1-23-1__group">
          <div
            class="kuc-dropdown-1-23-1__group__label"
            id="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </div>
          <button
            class="kuc-dropdown-1-23-1__group__toggle"
            id="${this._GUID}-toggle"
            type="button"
            aria-haspopup="true"
            aria-labelledby="${this._GUID}-label ${this._GUID}-toggle"
            aria-describedby="${this._GUID}-error"
            aria-required="${this.requiredIcon}"
            ?disabled="${this.disabled}"
            @mouseup="${this._handleMouseUpDropdownToggle}"
            @mousedown="${this._handleMouseDownDropdownToggle}"
            @click="${this._handleClickDropdownToggle}"
            @keydown="${this._handleKeyDownDropdownToggle}"
          >
            <span class="kuc-dropdown-1-23-1__group__toggle__selected-item-label"
              >${this._getSelectedLabel()}</span
            >
            <span class="kuc-dropdown-1-23-1__group__toggle__icon">
              ${this._getToggleIconSvgTemplate()}
            </span>
          </button>
          <ul
            class="kuc-dropdown-1-23-1__group__select-menu"
            role="listbox"
            aria-hidden="${!this._selectorVisible}"
            ?hidden="${!this._selectorVisible}"
            @mouseleave="${this._handleMouseLeaveMenu}"
            @mousedown="${this._handleMouseDownMenu}"
          >
            ${this.items.map((e,i)=>this._getItemTemplate(e,i))}
          </ul>
          <kuc-base-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
            ariaLive="assertive"
          ></kuc-base-error-1-23-1>
        </div>
      `}firstUpdated(){window.addEventListener("resize",()=>{this._actionResizeScrollWindow()}),window.addEventListener("scroll",()=>{this._actionResizeScrollWindow()})}async updated(){await this.updateComplete,this._selectorVisible?(this._menuEl.addEventListener("scroll",this._handleScrollMenu),this._setMenuPosition(),this._scrollToView(),setTimeout(()=>{document.addEventListener("click",this._handleClickDocument,!0)},1)):setTimeout(()=>{document.removeEventListener("click",this._handleClickDocument,!0)},1)}_handleMouseDownDropdownItem(e){const i=this._getItemElementWhenMouseOverDown(e.target),o=i.getAttribute("value"),n=i.dataset.index||"0";this._actionUpdateValue(o,n)}_handleMouseOverDropdownItem(e){const i=this._getItemElementWhenMouseOverDown(e.target);this._actionHighlightMenuItem(i)}_handleMouseLeaveMenu(){this._actionClearAllHighlightMenuItem()}_handleMouseDownMenu(e){e.preventDefault()}_handleMouseDownDropdownToggle(e){e.preventDefault()}_handleMouseUpDropdownToggle(e){e.preventDefault()}_handleClickDropdownToggle(e){e.stopPropagation(),this._actionToggleMenu()}_handleClickDocument(e){(e.target===this._buttonEl||this._buttonEl.contains(e.target))&&e.stopPropagation(),!Array.from(this._disabledItemsEl).some(i=>i===e.target||i.contains(e.target))&&this._actionHideMenu()}_handleScrollMenu(){this._previousScrollTop=this._menuEl.scrollTop}_handleKeyDownDropdownToggle(e){switch(e.key){case"Up":case"ArrowUp":{if(e.preventDefault(),this.items.length===0)break;if(!this._selectorVisible){this._actionShowMenu();break}this._actionHighlightPrevMenuItem();break}case"Tab":this._selectorVisible&&this._actionHideMenu();break;case"Down":case"ArrowDown":{if(e.preventDefault(),this.items.length===0)break;if(!this._selectorVisible){this._actionShowMenu();break}this._actionHighlightNextMenuItem();break}case"Enter":{if(e.preventDefault(),this.items.length===0)break;if(!this._selectorVisible){this._actionShowMenu();break}const{value:i,selectedIndex:o}=this._getInfoHighlightItem();if(i===null)break;this._actionUpdateValue(i,o),this._actionHideMenu();break}case"Escape":{e.preventDefault(),this._selectorVisible&&e.stopPropagation(),this._actionHideMenu();break}case"Home":{this._selectorVisible&&(e.preventDefault(),this._actionHighlightFirstMenuItem());break}case"End":{this._selectorVisible&&(e.preventDefault(),this._actionHighlightLastMenuItem());break}}}_getInfoHighlightItem(){const e=this._highlightItemEl;if(e===null)return{value:null,selectedIndex:"-1"};const i=e.getAttribute("value"),o=e.dataset.index||"0";return{value:i,selectedIndex:o}}_actionShowMenu(){this._buttonEl.focus(),this.items.length!==0&&(this._selectorVisible=!0,!(this._selectedItemEl===null||this._selectedItemEl.classList.contains(this._DISABLED_CLASS))&&this._setHighlightAndActiveDescendantMenu(this._selectedItemEl))}_actionHideMenu(){this._selectorVisible=!1,this._actionRemoveActiveDescendant()}_actionToggleMenu(){if(this.items.length!==0){if(this._selectorVisible){this._actionHideMenu();return}this._actionShowMenu()}}_actionHighlightFirstMenuItem(){let e=this._firstItemEl,i=!1;for(let o=0;o<this.items.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.nextElementSibling;!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionHighlightLastMenuItem(){let e=this._lastItemEl,i=!1;for(let o=0;o<this.items.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.previousElementSibling;!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionHighlightPrevMenuItem(){let e=null;this._highlightItemEl!==null&&(e=this._highlightItemEl.previousElementSibling),e===null&&(e=this._lastItemEl);let i=!1;for(let o=0;o<this.items.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.previousElementSibling,e===null&&(e=this._lastItemEl);!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionHighlightNextMenuItem(){let e=null;this._highlightItemEl!==null&&(e=this._highlightItemEl.nextElementSibling),e===null&&(e=this._firstItemEl);let i=!1;for(let o=0;o<this.items.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.nextElementSibling,e===null&&(e=this._firstItemEl);!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionClearAllHighlightMenuItem(){this._itemsEl.forEach(e=>{e.classList.remove("kuc-dropdown-1-23-1__group__select-menu__highlight")}),this._actionRemoveActiveDescendant()}_setHighlightAndActiveDescendantMenu(e){this._actionHighlightMenuItem(e),this._actionSetActiveDescendant(e.id),this._scrollToView()}_actionHighlightMenuItem(e){this._actionClearAllHighlightMenuItem(),e.classList.add("kuc-dropdown-1-23-1__group__select-menu__highlight")}_actionUpdateValue(e,i){const o=parseInt(i,10);if(this.value===e&&this.selectedIndex===o)return;const n={oldValue:this.value,value:e};this.value=e,this.selectedIndex=o,f(this,"change",n)}_actionSetActiveDescendant(e){e!==void 0&&this._buttonEl!==null&&this._buttonEl.setAttribute("aria-activedescendant",e)}_actionRemoveActiveDescendant(){this._buttonEl.removeAttribute("aria-activedescendant")}_getScrollbarWidthHeight(){const e=document.createElement("div");e.style.cssText="overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e);const i=e.offsetWidth-e.clientWidth,o=e.offsetHeight-e.clientHeight;return document.body.removeChild(e),{scrollbarWidth:i,scrollbarHeight:o}}_getDistanceToggleButton(){const{scrollbarWidth:e,scrollbarHeight:i}=this._getScrollbarWidthHeight(),o=document.body.scrollHeight>window.innerHeight,n=document.body.scrollWidth>window.innerWidth,s=this._buttonEl.getBoundingClientRect().top,r=window.innerHeight-this._buttonEl.getBoundingClientRect().bottom-(n?i:0),u=this._buttonEl.getBoundingClientRect().left,c=window.innerWidth-this._buttonEl.getBoundingClientRect().left-(o?e:0);return{toTop:s,toBottom:r,toLeft:u,toRight:c}}_setMenuPositionAboveOrBelow(){this._menuEl.style.height="auto",this._menuEl.style.bottom="auto",this._menuEl.style.overflowY="scroll",this._menuEl.style.maxHeight="none";const e=this._menuEl.getBoundingClientRect().height;this._menuEl.style.maxHeight="var(--kuc-dropdown-menu-max-height, none)";const i=this._menuEl.getBoundingClientRect().height,o=this._getDistanceToggleButton();if(o.toBottom>=i){e>i?this._previousScrollTop&&(this._menuEl.scrollTop=this._previousScrollTop):this._menuEl.style.overflowY="";return}if(o.toBottom<o.toTop){const n=this._errorEl.offsetHeight?this._errorEl.offsetHeight+16:0;if(this._menuEl.style.bottom=`${this._buttonEl.offsetHeight+n}px`,o.toTop>=i){e>i?this._previousScrollTop&&(this._menuEl.scrollTop=this._previousScrollTop):this._menuEl.style.overflowY="";return}this._menuEl.style.height=`${o.toTop}px`}else this._menuEl.style.height=`${o.toBottom}px`;this._previousScrollTop&&(this._menuEl.scrollTop=this._previousScrollTop)}_setMenuPositionLeftOrRight(){this._menuEl.style.right="auto";const e=this._menuEl.getBoundingClientRect().width,i=this._getDistanceToggleButton();if(i.toRight>=e||i.toLeft<e||i.toRight<0)return;const o=this._buttonEl.offsetWidth-i.toRight;this._menuEl.style.right=o>0?`${o}px`:"0px"}_setMenuPosition(){this._setMenuPositionAboveOrBelow(),this._setMenuPositionLeftOrRight()}_scrollToView(){if(!this._highlightItemEl||!this._menuEl)return;const e=this._menuEl.getBoundingClientRect(),i=this._highlightItemEl.getBoundingClientRect();i.top<e.top&&(this._menuEl.scrollTop-=e.top-i.top),e.bottom<i.bottom&&(this._menuEl.scrollTop+=i.bottom-e.bottom)}_actionResizeScrollWindow(){this._timeoutID||!this._selectorVisible||(this._timeoutID=window.setTimeout(()=>{this._timeoutID=null,this._setMenuPosition()},50))}_isCheckedItem(e,i){return this.value?e.value===this.value&&this.selectedIndex===i:this.selectedIndex===i}_getItemTemplate(e,i){const o=this._isCheckedItem(e,i);return _`
        <li
          class="kuc-dropdown-1-23-1__group__select-menu__item ${e.disabled?this._DISABLED_CLASS:""}"
          role="option"
          tabindex="${!e.disabled&&o?"0":"-1"}"
          aria-selected="${o?"true":"false"}"
          data-index="${i}"
          value="${e.value!==void 0?e.value:""}"
          id="${this._GUID}-menuitem-${i}"
          @mousedown="${e.disabled?null:this._handleMouseDownDropdownItem}"
          @mouseover="${e.disabled?null:this._handleMouseOverDropdownItem}"
        >
          ${this._getDropdownIconSvgTemplate(o,!!e.disabled)}
          ${e.label===void 0?e.value:e.label}
        </li>
      `}_getDropdownIconSvgTemplate(e,i){return C`
      ${e?C`<svg
          class="kuc-dropdown-1-23-1__group__select-menu__item__icon"
          width="11"
          height="9"
          viewBox="0 0 11 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 5L1.5 3L4.5 5.5L9.5 0L11 1.5L4.5 8.5L0 5Z"
            fill="${i?"#888888":"#3498db"}"/>
        </svg>`:""}`}_getItemElementWhenMouseOverDown(e){return e.classList.value.split(" ").includes("kuc-dropdown-1-23-1__group__select-menu__item")?e:this._getItemElementWhenMouseOverDown(e.parentElement)}}R([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),R([l({type:String})],a.prototype,"error",void 0),R([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),R([l({type:String})],a.prototype,"label",void 0),R([l({type:String})],a.prototype,"value",void 0),R([l({type:Number})],a.prototype,"selectedIndex",void 0),R([l({type:Boolean})],a.prototype,"disabled",void 0),R([l({type:Boolean})],a.prototype,"requiredIcon",void 0),R([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),R([l({type:Array})],a.prototype,"items",void 0),R([v()],a.prototype,"_selectorVisible",void 0),R([g(".kuc-dropdown-1-23-1__group__select-menu")],a.prototype,"_menuEl",void 0),R([z(".kuc-dropdown-1-23-1__group__select-menu__item")],a.prototype,"_itemsEl",void 0),R([g("button.kuc-dropdown-1-23-1__group__toggle")],a.prototype,"_buttonEl",void 0),R([g(".kuc-dropdown-1-23-1__group__select-menu__item")],a.prototype,"_firstItemEl",void 0),R([g(".kuc-dropdown-1-23-1__group__select-menu__item:last-child")],a.prototype,"_lastItemEl",void 0),R([g(".kuc-dropdown-1-23-1__group__select-menu__item[aria-selected=true]")],a.prototype,"_selectedItemEl",void 0),R([g(".kuc-dropdown-1-23-1__group__select-menu__highlight")],a.prototype,"_highlightItemEl",void 0),R([z(".kuc-dropdown-1-23-1__group__select-menu__item--disabled")],a.prototype,"_disabledItemsEl",void 0),R([g(".kuc-base-error-1-23-1__error")],a.prototype,"_errorEl",void 0),window.customElements.define("kuc-dropdown-1-23-1",a),x(ys),Hi=a})();const ws=`
  kuc-field-group-1-23-1 .kuc-field-group-1-23-1__group__toggle .kuc-base-label-1-23-1__text,
  kuc-field-group-1-23-1:lang(en) .kuc-field-group-1-23-1__group__toggle .kuc-base-label-1-23-1__text {
    font-family: sans-serif;
  }
  kuc-field-group-1-23-1:lang(es) .kuc-field-group-1-23-1__group__toggle .kuc-base-label-1-23-1__text {
    font-family: sans-serif;
  }
  kuc-field-group-1-23-1:lang(ja) .kuc-field-group-1-23-1__group__toggle .kuc-base-label-1-23-1__text {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-field-group-1-23-1:lang(zh) .kuc-field-group-1-23-1__group__toggle .kuc-base-label-1-23-1__text {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-field-group-1-23-1:lang(zh-TW) .kuc-field-group-1-23-1__group__toggle .kuc-base-label-1-23-1__text {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-field-group-1-23-1 {
    display: inline-table;
  }
  kuc-field-group-1-23-1[hidden] {
    display: none;
  }
  .kuc-field-group-1-23-1__group {
    min-width: 517px;
    padding: 0px 8px;
    border: 1px solid #e3e7e8;
    background-color: #f5f5f5;
  }
  .kuc-field-group-1-23-1__group h3 {
    margin: 0px;
    padding: 0px;
  }
  .kuc-field-group-1-23-1__group__toggle {
    display: flex;
    align-items: center;
    border-style: none;
    position: relative;
    outline: none;
    margin: 12px 0px 12px 8px;
    min-height: 34px;
    padding: 4px 8px 4px 24px;
    color: #333333;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: inherit;
    line-height: 1.5;
  }
  .kuc-field-group-1-23-1__group__toggle:disabled {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
  .kuc-field-group-1-23-1__group__toggle:disabled .kuc-base-label-1-23-1__text {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
  .kuc-field-group-1-23-1__group__toggle .kuc-base-label-1-23-1__text {
    font-size: 16px;
  }
  .kuc-field-group-1-23-1__group__toggle:disabled:focus {
    outline: 0;
    border: 1px solid transparent;
  }
  .kuc-field-group-1-23-1__group__toggle:focus {
    outline: 0;
    border: 1px solid #3498db;
  }
  .kuc-field-group-1-23-1__group__toggle svg {
    position: absolute;
    left: 8px;
  }
  .kuc-field-group-1-23-1__group__body {
    padding: 0px 8px;
    margin-left: 0px;
    white-space: nowrap;
    word-wrap: normal;
    margin-bottom: 12px;
  }
`;var Te=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};const ai=517;let Ri;(()=>{if(Ri=window.customElements.get("kuc-field-group-1-23-1"),Ri)return;class a extends k{constructor(e){super(),this.className="",this.content="",this.id="",this.label="",this.disabled=!1,this.expanded=!1,this.visible=!0,this._content="",this._GUID=D();const i=S(e);Object.assign(this,i)}update(e){e.has("content")&&(this.content&&K(this.content)?this._content=Q(this.content):this._content=this.content),super.update(e)}render(){return _`
        <div
          class="kuc-field-group-1-23-1__group"
          role="group"
          aria-labelledby="${this._GUID}-control"
        >
          <button
            type="button"
            id="${this._GUID}-control"
            class="kuc-field-group-1-23-1__group__toggle"
            aria-controls="${this._GUID}-body"
            aria-expanded="${this.expanded&&!this.disabled}"
            ?disabled="${this.disabled}"
            @click="${this._handleClickButton}"
            @keydown="${this._handleKeyDownButton}"
          >
            ${this._getSvgTemplate()}
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${!1}"
            ></kuc-base-label-1-23-1>
          </button>
          <div
            id="${this._GUID}-body"
            class="kuc-field-group-1-23-1__group__body"
            ?hidden="${!this.expanded||this.disabled}"
            @change="${this._handleChangeBody}"
          >
            ${this._content}
          </div>
        </div>
      `}updated(e){e.has("content")&&(this._groupEl.style.minWidth=ai+"px",requestAnimationFrame(()=>{this._updateContainerWidth()}))}_updateContainerWidth(){if(!this._bodyEl)return;const e=this._bodyEl.hasAttribute("hidden");e&&this._bodyEl.removeAttribute("hidden");const i=this._bodyEl.offsetWidth;e&&this._bodyEl.setAttribute("hidden",""),!(i<=ai)&&(this._groupEl.style.minWidth=i+"px")}_getSvgTemplate(){return this.expanded?_`<svg
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.7122 0.5L12.5 1.03608L7.23318 7.11548L5.76682 7.11548L0.5 1.03608L1.2878 0.5L6.26504 6.19318L6.73496 6.19318L11.7122 0.5Z"
              fill="#939393"
            />
          </svg>`:_`<svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.5 1.2878L1.03608 0.5L7.11548 5.76682V7.23318L1.03608 12.5L0.5 11.7122L6.19318 6.73496V6.26504L0.5 1.2878Z"
              fill="#939393"
            />
          </svg> `}_handleChangeBody(e){e.stopPropagation()}_handleKeyDownButton(e){e.key!=="Tab"&&(e.preventDefault(),(e.key==="Enter"||e.key===" ")&&this._handleClickButton(e))}_handleClickButton(e){if(e.target!==document.activeElement&&this._toggle.focus(),this.expanded){const o=this._bodyEl.getBoundingClientRect().width;o>ai&&(this._groupEl.style.minWidth=o+"px")}else this._groupEl.style.minWidth=ai+"px";this.expanded=!this.expanded;const i={expanded:this.expanded};f(this,"change",i)}}Te([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),Te([l()],a.prototype,"content",void 0),Te([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),Te([l({type:String})],a.prototype,"label",void 0),Te([l({type:Boolean})],a.prototype,"disabled",void 0),Te([l({type:Boolean})],a.prototype,"expanded",void 0),Te([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),Te([g(".kuc-field-group-1-23-1__group")],a.prototype,"_groupEl",void 0),Te([g(".kuc-field-group-1-23-1__group__body")],a.prototype,"_bodyEl",void 0),Te([g(".kuc-field-group-1-23-1__group__toggle")],a.prototype,"_toggle",void 0),window.customElements.define("kuc-field-group-1-23-1",a),x(ws),Ri=a})();const Cs=`
  kuc-multi-choice-1-23-1,
  kuc-multi-choice-1-23-1 *,
  kuc-multi-choice-1-23-1:lang(en),
  kuc-multi-choice-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-multi-choice-1-23-1:lang(es),
  kuc-multi-choice-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-multi-choice-1-23-1:lang(ja),
  kuc-multi-choice-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-multi-choice-1-23-1:lang(zh),
  kuc-multi-choice-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-multi-choice-1-23-1:lang(zh-TW),
  kuc-multi-choice-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-multi-choice-1-23-1 {
    display: inline-table;
    font-size: 14px;
    color: var(--kuc-multi-choice-menu-color, #333333);
    width: var(--kuc-multi-choice-menu-width, 180px);
    min-width: var(--kuc-multi-choice-menu-width, 180px);
    line-height: 1.5;
  }
  kuc-multi-choice-1-23-1[hidden] {
    display: none;
  }
  .kuc-multi-choice-1-23-1__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    vertical-align: top;
    width: 100%;
    margin: 0px;
  }
  .kuc-multi-choice-1-23-1__group__label {
    padding: 4px 0px 8px 0px;
    display: inline-block;
    white-space: nowrap;
  }
  .kuc-multi-choice-1-23-1__group__label[hidden] {
    display: none;
  }
  .kuc-multi-choice-1-23-1__group__menu {
    position: relative;
    background: #ffffff;
    border: 1px solid #e3e7e8;
    box-sizing: border-box;
    box-shadow: 1px 1px 12px #f5f5f5 inset, -1px -1px 12px #f5f5f5 inset;
    padding: 6px 0;
    overflow-y: auto;
    overflow-x: hidden;
    height: var(--kuc-multi-choice-menu-height, auto);
    max-height: var(--kuc-multi-choice-menu-height, 134px);
    width: var(--kuc-multi-choice-menu-width, auto);
    font-size: var(--kuc-multi-choice-menu-font-size, 14px);
  }
  .kuc-multi-choice-1-23-1__group__menu:not([disabled]):focus {
    outline: none;
    border: 1px solid #3498db;
  }
  .kuc-multi-choice-1-23-1__group__menu[disabled] {
    background-color: #dbdcdd;
    box-shadow: none;
    cursor: not-allowed;
    color: #888888;
    outline: none;
  }
  .kuc-multi-choice-1-23-1__group__menu__item {
    padding: 4px 16px;
    margin-bottom: 2px;
    line-height: 1;
    position: relative;
    white-space: nowrap;
  }
  .kuc-multi-choice-1-23-1__group__menu__item__icon {
    position: absolute;
    top: 50%;
    left: 16px;
    margin-top: -6px;
    pointer-events: none;
  }
  .kuc-multi-choice-1-23-1__group__menu__item--disabled {
    background-color: #d4d7d7;
    cursor: not-allowed;
    color: #888888;
  }
  .kuc-multi-choice-1-23-1__group__menu__item[aria-selected="true"] {
    color: var(--kuc-multi-choice-menu-color-selected, #3498db);
    padding-left: 32px;
  }
  .kuc-multi-choice-1-23-1__group__menu__item--disabled[aria-selected="true"] {
    color: #888888;
    padding-left: 32px;
  }
  .kuc-multi-choice-1-23-1__group__menu[disabled]
    .kuc-multi-choice-1-23-1__group__menu__item[aria-selected="true"] {
    color: #888888;
  }
  .kuc-multi-choice-1-23-1__group__menu__highlight[role="option"] {
    background-color: var(--kuc-multi-choice-menu-background-color-hover, #e2f2fe);
    cursor: pointer;
  }
`;var W=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Ni;(()=>{if(Ni=window.customElements.get("kuc-multi-choice-1-23-1"),Ni)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this.selectedIndex=[],this.value=[],this._valueMapping={},this._DISABLED_CLASS="kuc-multi-choice-1-23-1__group__menu__item--disabled",this._GUID=D();const i=S(e);this._setInitialValue(i),Object.assign(this,i)}_setInitialValue(e){const i="value"in e,o="selectedIndex"in e,n=e.selectedIndex||[];if(!i&&o){if(!T(n))return;const s=this._getValueMapping(e);this.value=this._getValidValue(s,n)}}shouldUpdate(e){return e.has("items")&&!T(this.items)?(this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1):e.has("value")&&!T(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_ARRAY),!1):e.has("selectedIndex")&&!T(this.selectedIndex)?(this.throwErrorAfterUpdateComplete(y.SELECTED_INDEX.IS_NOT_ARRAY),!1):!0}willUpdate(e){if(e.has("value")){if(this.value.length>0)return;this.selectedIndex=[]}}update(e){(e.has("items")||e.has("value")||e.has("selectedIndex"))&&(this._valueMapping=this._getValueMapping({items:this.items,value:this.value,selectedIndex:this.selectedIndex}),this._setValueAndSelectedIndex()),super.update(e)}render(){return _`
        <div class="kuc-multi-choice-1-23-1__group">
          <div
            class="kuc-multi-choice-1-23-1__group__label"
            id="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </div>
          <div
            class="kuc-multi-choice-1-23-1__group__menu"
            role="listbox"
            aria-multiselectable="true"
            aria-describedby="${this._GUID}-error"
            aria-labelledby="${this._GUID}-label"
            ?disabled="${this.disabled}"
            tabindex="${this.disabled?"-1":"0"}"
            @keydown="${this._handleKeyDownMultiChoice}"
          >
            ${this.items.map((e,i)=>this._getMenuItemTemplate(e,i))}
          </div>
          <kuc-base-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
            ariaLive="assertive"
          ></kuc-base-error-1-23-1>
        </div>
      `}_getValueMapping(e){const i=e.items||[],o=e.value||[],n=e.selectedIndex||[],s=i.map(d=>d.value||""),r=Object.assign({},s),u={};if(o.length===0){const d=this._getValidValue(r,n);return n.forEach((h,p)=>u[h]=d[p]),u}return this._getValidSelectedIndex(r).forEach((d,h)=>u[d]=o[h]),u}_getValidValue(e,i){return i.filter(o=>e[o]).map(o=>e[o])}_getValidSelectedIndex(e){const i=[];for(let o=0;o<this.value.length;o++){const n=this.selectedIndex[o];if(e[n]===this.value[o]){i.push(n);continue}const s=this.items.findIndex(r=>r.value===this.value[o]);i.push(s)}return i}_setValueAndSelectedIndex(){this.value=Object.values(this._valueMapping),this.selectedIndex=Object.keys(this._valueMapping).map(e=>parseInt(e,10))}_handleMouseDownMultiChoiceItem(e){if(this.disabled)return;const i=e.target,o=i.getAttribute("value"),n=i.dataset.index||"0";this._handleChangeValue(o,n)}_handleMouseOverMultiChoiceItem(e){if(this.disabled)return;this._itemsEl.forEach(o=>{o.classList.contains("kuc-multi-choice-1-23-1__group__menu__highlight")&&o.classList.remove("kuc-multi-choice-1-23-1__group__menu__highlight")});const i=e.currentTarget;i.classList.add("kuc-multi-choice-1-23-1__group__menu__highlight"),this._setActiveDescendant(i.id)}_handleMouseLeaveMultiChoiceItem(e){if(this.disabled)return;e.currentTarget.classList.remove("kuc-multi-choice-1-23-1__group__menu__highlight"),this._setActiveDescendant()}_handleKeyDownMultiChoice(e){if(!this.disabled)switch(e.key){case"Up":case"ArrowUp":{if(e.preventDefault(),this.items.length===0)break;this._actionHighlightPrevMenuItem();break}case"Down":case"ArrowDown":{if(e.preventDefault(),this.items.length===0)break;this._actionHighlightNextMenuItem();break}case"Spacebar":case" ":{e.preventDefault(),this._actionUpdateValue();break}}}_actionHighlightPrevMenuItem(){let e=null;this._highlightItemEl!==null&&(e=this._highlightItemEl.previousElementSibling),e===null&&(e=this._lastItemEl,this._highlightItemEl===null&&(e=this._firstItemEl));let i=!1;this._actionClearAllHighlightMenuItem();for(let o=0;o<this._itemsEl.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.previousElementSibling,e===null&&(e=this._lastItemEl);i||(e.classList.add("kuc-multi-choice-1-23-1__group__menu__highlight"),this._setActiveDescendant(e.id))}_actionHighlightNextMenuItem(){let e=null;this._highlightItemEl!==null&&(e=this._highlightItemEl.nextElementSibling),e===null&&(e=this._firstItemEl);let i=!1;this._actionClearAllHighlightMenuItem();for(let o=0;o<this._itemsEl.length&&(i=e.classList.contains(this._DISABLED_CLASS),i);o++)e=e.nextElementSibling,e===null&&(e=this._firstItemEl);i||(e.classList.add("kuc-multi-choice-1-23-1__group__menu__highlight"),this._setActiveDescendant(e.id))}_actionClearAllHighlightMenuItem(){this._itemsEl.forEach(e=>{e.classList.remove("kuc-multi-choice-1-23-1__group__menu__highlight")})}_actionUpdateValue(){this._itemsEl.forEach(e=>{if(e.classList.contains("kuc-multi-choice-1-23-1__group__menu__highlight")){const i=e.getAttribute("value"),o=e.dataset.index||"0";this._handleChangeValue(i,o)}})}_getMultiChoiceCheckedIconSvgTemplate(e,i){return C`
        ${i?C`<svg
            class="kuc-multi-choice-1-23-1__group__menu__item__icon"
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 5L1.5 3L4.5 5.5L9.5 0L11 1.5L4.5 8.5L0 5Z"
              fill="${e?"#888888":"#3498db"}"
            />
          </svg>`:""}`}_isCheckedItem(e,i){const o=Object.values(this._valueMapping),n=Object.keys(this._valueMapping);return o.filter((r,u)=>r===e.value&&i===parseInt(n[u],10)).length>0}_getMenuItemTemplate(e,i){const o=this._isCheckedItem(e,i),n=e.disabled||this.disabled;return _`
        <div
          class="kuc-multi-choice-1-23-1__group__menu__item ${n?this._DISABLED_CLASS:""}"
          role="option"
          aria-selected="${o}"
          aria-required="${this.requiredIcon}"
          data-index="${i}"
          value="${e.value!==void 0?e.value:""}"
          id="${this._GUID}-menuitem-${i}"
          @mousedown="${n?null:this._handleMouseDownMultiChoiceItem}"
          @mouseover="${n?null:this._handleMouseOverMultiChoiceItem}"
          @mouseleave="${n?null:this._handleMouseLeaveMultiChoiceItem}"
        >
          ${this._getMultiChoiceCheckedIconSvgTemplate(n,o)}
          ${e.label===void 0?e.value:e.label}
        </div>
      `}_setActiveDescendant(e){e!==void 0&&this._menuEl!==null?this._menuEl.setAttribute("aria-activedescendant",e):this._menuEl.removeAttribute("aria-activedescendant")}_handleChangeValue(e,i){const o=this.value?[...this.value]:this.value,n=this._getNewValueMapping(e,i),s=this.items.map(d=>d.value),r=Object.values(n).filter(d=>s.indexOf(d)>-1);if(r===o)return;const u=Object.keys(n).map(d=>parseInt(d,10));this.value=r,this.selectedIndex=u,f(this,"change",{oldValue:o,value:r})}_getNewValueMapping(e,i){const o=parseInt(i,10),n=Object.keys(this._valueMapping),s={...this._valueMapping};return n.indexOf(i)>-1?(delete s[o],s):(s[o]=e,s)}}W([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),W([l({type:String})],a.prototype,"error",void 0),W([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),W([l({type:String})],a.prototype,"label",void 0),W([l({type:Boolean})],a.prototype,"disabled",void 0),W([l({type:Boolean})],a.prototype,"requiredIcon",void 0),W([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),W([l({type:Array})],a.prototype,"items",void 0),W([l({type:Array})],a.prototype,"selectedIndex",void 0),W([l({type:Array})],a.prototype,"value",void 0),W([g(".kuc-multi-choice-1-23-1__group__menu")],a.prototype,"_menuEl",void 0),W([z(".kuc-multi-choice-1-23-1__group__menu__item")],a.prototype,"_itemsEl",void 0),W([g(".kuc-multi-choice-1-23-1__group__menu__item")],a.prototype,"_firstItemEl",void 0),W([g(".kuc-multi-choice-1-23-1__group__menu__item:last-child")],a.prototype,"_lastItemEl",void 0),W([g(".kuc-multi-choice-1-23-1__group__menu__highlight")],a.prototype,"_highlightItemEl",void 0),W([v()],a.prototype,"_valueMapping",void 0),window.customElements.define("kuc-multi-choice-1-23-1",a),x(Cs),Ni=a})();const Es=`
  kuc-notification-1-23-1,
  kuc-notification-1-23-1 *,
  kuc-notification-1-23-1:lang(en),
  kuc-notification-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-notification-1-23-1:lang(es),
  kuc-notification-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-notification-1-23-1:lang(ja),
  kuc-notification-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-notification-1-23-1:lang(zh),
  kuc-notification-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-notification-1-23-1:lang(zh-TW),
  kuc-notification-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-notification-1-23-1 {
    color: #ffffff;
    font-weight: 700;
    text-align: center;
    text-shadow: 1px -1px 0 rgba(0, 0, 0, 0.5);
  }
  kuc-notification-1-23-1 {
    position: fixed;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 1.5;
    z-index: 10000;
    margin-top: 16px;
    pointer-events: none;
    visibility: hidden;
    animation-fill-mode: forwards;
  }
  .kuc-notification-fadein-1-23-1 {
    animation-name: kuc-notification-fade-in-1-23-1;
    animation-duration: 250ms;
    animation-timing-function: ease-out;
  }
  .kuc-notification-fadeout-1-23-1 {
    animation-name: kuc-notification-fade-out-1-23-1;
    animation-duration: 250ms;
    animation-timing-function: ease-out;
  }
  .kuc-notification-1-23-1__notification {
    position: relative;
    display: inline-block;
    text-align: left;
    pointer-events: auto;
    padding: 16px 56px 16px 24px;
    background-color: var(--kuc-notification-background-color, #e74c3c);
  }
  .kuc-notification-1-23-1__notification--info {
    background-color: var(--kuc-notification-background-color, #3498db);
  }
  .kuc-notification-1-23-1__notification--success {
    background-color: var(--kuc-notification-background-color, #91c36c);
  }
  .kuc-notification-1-23-1__notification--danger {
    background-color: var(--kuc-notification-background-color, #e74c3c);
  }
  .kuc-notification-1-23-1__notification__title {
    display: flex;
    align-items: center;
    margin: 0;
    font-size: var(--kuc-notification-font-size, 16px);
    color: var(--kuc-notification-color, #ffffff);
    max-width: 500px;
    min-height: 24px;
    word-break: break-word;
    white-space: pre-wrap;
  }
  .kuc-notification-1-23-1__notification__title--html {
    white-space: normal;
    max-width: 500px;
  }
  .kuc-notification-1-23-1__notification__close-button {
    position: absolute;
    top: 4px;
    right: 0;
    width: 48px;
    height: 48px;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  .kuc-notification-1-23-1__notification__close-button__icon-background--danger {
    fill: var(--kuc-notification-close-button-background-color, #c65040);
  }
  .kuc-notification-1-23-1__notification__close-button__icon-background--info {
    fill: var(--kuc-notification-close-button-background-color, #448aca);
  }
  .kuc-notification-1-23-1__notification__close-button__icon-background--success {
    fill: var(--kuc-notification-close-button-background-color, #9bbc65);
  }
  @keyframes kuc-notification-fade-in-1-23-1 {
    0% {
      visibility: visible;
      top: -56px;
    }
    100% {
      visibility: visible;
      top: 0;
    }
  }
  @keyframes kuc-notification-fade-out-1-23-1 {
    0% {
      visibility: visible;
      top: 0;
    }
    10% {
      visibility: visible;
      top: 14px;
    }
    100% {
      top: -56px;
    }
  }
`;var Ke=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Ui;(()=>{if(Ui=window.customElements.get("kuc-notification-1-23-1"),Ui)return;class a extends k{constructor(e){super(),this.className="",this.id="",this.text="",this.type="danger",this.duration=-1,this.container=document.body,this.content="",this._isOpened=!1,this._content="";const i=S(e);Object.assign(this,i)}shouldUpdate(e){if(e.has("container")){if(this.container===null||this.container===void 0)return this._isOpened&&this._close(),!1;const i=this._isValidContainerElement(),o=!i||!document.contains(this.container);if(this._isOpened&&o&&this._close(),!i)return this.throwErrorAfterUpdateComplete(y.CONTAINER.INVALID),!1}return!0}willUpdate(e){(e.has("content")||e.has("text"))&&(this.content!==null&&this.content!==void 0&&this.content!==""?K(this.content)?this._content=_`<div
              class="kuc-notification-1-23-1__notification__title--html"
            >
              ${Q(this.content)}
            </div>`:this._content=this.content:this._content=this.text)}_isValidContainerElement(){return this.container instanceof HTMLElement}_handleClickCloseButton(e){this.close()}_getCloseButtonColorType(){switch(this.type){case"info":case"success":return this.type;default:return"danger"}}_getCloseButtonSvgTemplate(){return C`
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>close button</title>
          <path
            class="kuc-notification-1-23-1__notification__close-button__icon-background--${this._getCloseButtonColorType()}"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.4765 15.7071L20.1229 12.0607L20.4765 11.7071L19.7694 11L19.4158 11.3536L15.7694 15L12.1229 11.3536L11.7694 11L11.0623 11.7071L11.4158 12.0607L15.0623 15.7071L11.3536 19.4158L11 19.7694L11.7071 20.4765L12.0607 20.1229L15.7694 16.4142L19.4781 20.1229L19.8316 20.4765L20.5387 19.7694L20.1852 19.4158L16.4765 15.7071Z"
            fill="white"
          />
        </svg>
      `}_setAutoCloseTimer(){this._clearAutoCloseTimer(),!(!Number.isFinite(this.duration)||this.duration<0)&&(this._timeoutID=window.setTimeout(()=>{this.close()},this.duration))}_clearAutoCloseTimer(){this._timeoutID&&window.clearTimeout(this._timeoutID)}open(){if(!this._isValidContainerElement()){document.body.appendChild(this),requestAnimationFrame(()=>{document.body.removeChild(this)}),this.performUpdate();return}this.container.appendChild(this),this.performUpdate(),this.classList.remove("kuc-notification-fadeout-1-23-1"),this.classList.add("kuc-notification-fadein-1-23-1"),this._isOpened=!0,this._setAutoCloseTimer()}_close(){this._isOpened=!1,this.classList.remove("kuc-notification-fadein-1-23-1"),this.classList.add("kuc-notification-fadeout-1-23-1"),this._clearAutoCloseTimer()}close(){this._close(),f(this,"close")}render(){return _`
        <div
          class="kuc-notification-1-23-1__notification kuc-notification-1-23-1__notification--${this.type}"
        >
          <pre
            class="kuc-notification-1-23-1__notification__title"
            aria-live="assertive"
            role="${this._isOpened?"alert":""}"
          ><!--
          -->${this._content}</pre>
          <button
            class="kuc-notification-1-23-1__notification__close-button"
            type="button"
            aria-label="close"
            @click="${this._handleClickCloseButton}"
          >
            ${this._getCloseButtonSvgTemplate()}
          </button>
        </div>
      `}}Ke([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),Ke([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),Ke([l({type:String})],a.prototype,"text",void 0),Ke([l({type:String})],a.prototype,"type",void 0),Ke([l({type:Number})],a.prototype,"duration",void 0),Ke([l()],a.prototype,"container",void 0),Ke([l()],a.prototype,"content",void 0),Ke([v()],a.prototype,"_isOpened",void 0),window.customElements.define("kuc-notification-1-23-1",a),x(Es),Ui=a})();const Ss=`
  kuc-radio-button-1-23-1,
  kuc-radio-button-1-23-1 *,
  kuc-radio-button-1-23-1:lang(en),
  kuc-radio-button-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-radio-button-1-23-1:lang(es),
  kuc-radio-button-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-radio-button-1-23-1:lang(ja),
  kuc-radio-button-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-radio-button-1-23-1:lang(zh),
  kuc-radio-button-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-radio-button-1-23-1:lang(zh-TW),
  kuc-radio-button-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-radio-button-1-23-1 {
    font-size: 14px;
    color: #333333;
    display: inline-table;
    width: var(--kuc-radio-button-menu-width, 239px);
    min-width: var(--kuc-radio-button-menu-width, 239px);
    vertical-align: top;
    line-height: 1.5;
  }

  kuc-radio-button-1-23-1[hidden] {
    display: none;
  }

  .kuc-radio-button-1-23-1__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    margin: 0px;
    width: 100%;
  }

  .kuc-radio-button-1-23-1__group__label {
    display: inline-block;
    padding: 4px 0 8px 0;
    white-space: nowrap;
  }

  .kuc-radio-button-1-23-1__group__label[hidden] {
    display: none;
  }

  .kuc-radio-button-1-23-1__group__select-menu {
    display: flex;
    align-items: flex-start;
    width: var(--kuc-radio-button-menu-width, 100%);
    height: var(--kuc-radio-button-menu-height);
    color: var(--kuc-radio-button-menu-color, #333333);
    font-size: var(--kuc-radio-button-menu-font-size, 14px);
  }

  .kuc-radio-button-1-23-1__group__select-menu[itemlayout="vertical"] {
    display: block;
  }

  .kuc-radio-button-1-23-1__group__select-menu[bordervisible] {
    border-color: #e3e7e8;
    border-width: 1px;
    border-style: solid;
    padding-top: 4px;
    box-sizing: border-box;
  }

  .kuc-radio-button-1-23-1__group__select-menu__item {
    margin-left: 4px;
    margin-bottom: 4px;
    margin-right: 16px;
    padding: 4px;
    border: 1px solid transparent;
    position: relative;
    white-space: normal;
    word-wrap: normal;
    display: flex;
    align-items: center;
  }

  .kuc-radio-button-1-23-1__group__select-menu__item[focused] {
    border: 1px solid #3498db;
  }

  .kuc-radio-button-1-23-1__group__select-menu__item__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .kuc-radio-button-1-23-1__group__select-menu__item__input:hover
    + .kuc-radio-button-1-23-1__group__select-menu__item__label {
    color: var(--kuc-radio-button-menu-color-hover, #666666);
  }

  .kuc-radio-button-1-23-1__group__select-menu__item__label__icon {
    position: absolute;
    left: -30px;
    box-sizing: border-box;
    width: 21px;
    height: 21px;
    box-shadow: 1px 1px 3px #f5f5f5 inset, -1px -1px 3px #f5f5f5 inset;
    content: "";
    border-radius: 9px;
  }

  .kuc-radio-button-1-23-1__group__select-menu__item__input[disabled]
    + .kuc-radio-button-1-23-1__group__select-menu__item__label {
    color: #888888;
    cursor: not-allowed;
  }

  .kuc-radio-button-1-23-1__group__select-menu__item__label {
    cursor: pointer;
    position: relative;
    margin-left: 32px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    white-space: nowrap;
    line-height: 1.2;
    min-height: 24px;
  }
`;var te=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Pi;(()=>{if(Pi=window.customElements.get("kuc-radio-button-1-23-1"),Pi)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.itemLayout="horizontal",this.label="",this.value="",this.selectedIndex=-1,this.borderVisible=!0,this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this._GUID=D();const i=S(e);this._setInitialValue(i),Object.assign(this,i)}_setInitialValue(e){const i="value"in e,o="selectedIndex"in e;!i&&o&&(this.value=this._getValue(e)||"")}shouldUpdate(e){return e.has("items")&&!T(this.items)?(this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1):e.has("value")&&!bt(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_STRING),!1):e.has("selectedIndex")&&!nt(this.selectedIndex)?(this.throwErrorAfterUpdateComplete(y.SELECTED_INDEX.IS_NOT_NUMBER),!1):!0}_findItemToFocus(){let e=-1;for(let i=0;i<this.items.length;i++){const o=this.items[i];if(!o.disabled){if(this.selectedIndex===i&&o.value===this.value){e=i;continue}e===-1&&(e=i)}}return e}willUpdate(e){if(e.has("value")){if(this.value!=="")return;this.selectedIndex=-1}}_handleChangeInput(e){e.stopPropagation();const i=e.target,o=i.value,n=i.dataset.index||"0",s=parseInt(n,10);if(this.value===o&&this.selectedIndex===s)return;const r={oldValue:this.value,value:o};this.value=o,this.selectedIndex=s,f(this,"change",r)}_handleFocusInput(e){e.target.parentNode.setAttribute("focused","")}_handleBlurInput(e){e.target.parentNode.removeAttribute("focused")}_getRadioIconSvgTemplate(e,i){return C`
    <svg
      class="kuc-radio-button-1-23-1__group__select-menu__item__label__icon"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="10"
        fill="white"
        stroke="#e3e7e8" stroke-width="1"/>
      ${i?C`<circle cx="10.5" cy="10.5" r="6.5" fill="${e?"#e3e7e8":"#3498db"}"/>`:""}
    </svg>
  `}_isCheckedItem(e,i){return this.value?e.value===this.value&&this.selectedIndex===i:this.selectedIndex===i}_getItemTemplate(e,i){const o=this._isCheckedItem(e,i),n=e.disabled||this.disabled,s=e.value!==void 0?e.value:"",r=i===this._findItemToFocus()?"0":"-1";return _`
        <div
          class="kuc-radio-button-1-23-1__group__select-menu__item"
          itemLayout="${this.itemLayout}"
        >
          <input
            type="radio"
            aria-checked="${o?"true":"false"}"
            aria-describedby="${this._GUID}-error"
            data-index="${i}"
            id="${this._GUID}-item-${i}"
            class="kuc-radio-button-1-23-1__group__select-menu__item__input"
            name="${this._GUID}-group"
            value="${s}"
            tabindex="${r}"
            aria-required="${this.requiredIcon}"
            ?disabled="${n}"
            @change="${this._handleChangeInput}"
            @focus="${this._handleFocusInput}"
            @blur="${this._handleBlurInput}"
          />
          <label
            class="kuc-radio-button-1-23-1__group__select-menu__item__label"
            for="${this._GUID}-item-${i}"
            >${this._getRadioIconSvgTemplate(n,o)}${e.label===void 0?e.value:e.label}
          </label>
        </div>
      `}update(e){(e.has("items")||e.has("value")||e.has("selectedIndex"))&&(this.selectedIndex=this._getSelectedIndex(),this.value=this._getValue({items:this.items,selectedIndex:this.selectedIndex})||""),super.update(e)}render(){return _`
        <div
          class="kuc-radio-button-1-23-1__group"
          role="radiogroup"
          aria-labelledby="${this._GUID}-group"
        >
          <div class="kuc-radio-button-1-23-1__group__label" ?hidden="${!this.label}">
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .guid="${this._GUID}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </div>
          <div
            class="kuc-radio-button-1-23-1__group__select-menu"
            ?borderVisible="${this.borderVisible}"
            itemLayout="${this.itemLayout}"
          >
            ${this.items.map((e,i)=>this._getItemTemplate(e,i))}
          </div>
          <kuc-base-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
            ariaLive="assertive"
          ></kuc-base-error-1-23-1>
        </div>
      `}updated(){this._inputEls.forEach((e,i)=>{e.checked=this.value===e.value&&i===this.selectedIndex})}_getSelectedIndex(){if(!this.value)return this.items[this.selectedIndex]?this.selectedIndex:-1;const e=this.items.findIndex(o=>o.value===this.value);if(e===-1)return-1;const i=this.items.findIndex((o,n)=>o.value===this.value&&n===this.selectedIndex);return i>-1?i:e}_getValue(e){const i=e.items||[],o=e.selectedIndex===0||e.selectedIndex?e.selectedIndex:-1,n=i[o];return n?n.value:""}}te([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),te([l({type:String})],a.prototype,"error",void 0),te([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),te([l({type:String})],a.prototype,"itemLayout",void 0),te([l({type:String})],a.prototype,"label",void 0),te([l({type:String})],a.prototype,"value",void 0),te([l({type:Number})],a.prototype,"selectedIndex",void 0),te([l({type:Boolean})],a.prototype,"borderVisible",void 0),te([l({type:Boolean})],a.prototype,"disabled",void 0),te([l({type:Boolean})],a.prototype,"requiredIcon",void 0),te([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),te([l({type:Array})],a.prototype,"items",void 0),te([z(".kuc-radio-button-1-23-1__group__select-menu__item__input")],a.prototype,"_inputEls",void 0),window.customElements.define("kuc-radio-button-1-23-1",a),x(Ss),Pi=a})();const Is=`
  .kuc-base-pagination-1-23-1__group {
    margin-top: 10px;
  }
  .kuc-base-pagination-1-23-1__group button {
    cursor: pointer;
  }
  .kuc-base-pagination-1-23-1__group__pager-prev {
    border: none;
    background-color: transparent;
    visibility: visible;
    height: 23px;
    vertical-align: middle;
  }
  .kuc-base-pagination-1-23-1__group__pager-next {
    border: none;
    background-color: transparent;
    visibility: visible;
    height: 23px;
    vertical-align: middle;
  }
  .kuc-base-pagination-1-23-1__group__pager-next:hover svg path,
  .kuc-base-pagination-1-23-1__group__pager-prev:hover svg path,
  .kuc-base-pagination-1-23-1__group__pager-next:focus-visible svg path,
  .kuc-base-pagination-1-23-1__group__pager-prev:focus-visible svg path
  {
    fill: #3498db;
  }
  .kuc-base-pagination-1-23-1__group__pager--focus,
  .kuc-base-pagination-1-23-1__group__pager-next:focus-visible,
  .kuc-base-pagination-1-23-1__group__pager-prev:focus-visible {
    outline: 1px solid #3498db;
  }
  .kuc-base-pagination-1-23-1__group__pager--horver svg path {
    fill: #3498db;
  }
  .kuc-base-pagination-1-23-1__group__pager-next svg,
  .kuc-base-pagination-1-23-1__group__pager-prev svg {
    margin-top: 3px;
  }
  .kuc-base-pagination-1-23-1__group__pager-disable {
    visibility: hidden;
  }
  .kuc-base-pagination-1-23-1__group__pager-current {
    display: inline-block;
    height: 23px;
    line-height: 23px;
    vertical-align: middle;
    font-size: 14px;
    color: #333333;
  }
`;var qe=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let zi;(()=>{if(zi=window.customElements.get("kuc-base-pagination-1-23-1"),zi)return;class a extends k{constructor(){super(...arguments),this.pagePosition=1,this.rowsPerPage=5,this.total=1,this.isNext=!0,this.isPrev=!0,this.visible=!0}render(){return _`
        <div class="kuc-base-pagination-1-23-1__group" ?hidden="${!this.visible}">
          <button
            title="previous"
            class="kuc-base-pagination-1-23-1__group__pager-prev${this.isPrev?"":" kuc-base-pagination-1-23-1__group__pager-disable"}"
            type="button"
            @click="${this._handleClickPrevButton}"
            @focus="${this._handleFocusPrevButton}"
            @blur="${this._handleBlurPrevButton}"
            @mouseover="${this._handleMouseOverPrevButton}"
            @mouseleave="${this._handleMouseLeavePrevButton}"
          >
            ${this._getPrevButtonSvgTemplate()}</button
          >${this._getCurrentPageNumberTemplate()}<button
            title="next"
            class="kuc-base-pagination-1-23-1__group__pager-next${this.isNext?"":" kuc-base-pagination-1-23-1__group__pager-disable"}"
            type="button"
            @click="${this._handleClickNextButton}"
            @focus="${this._handleFocusNextButton}"
            @blur="${this._handleBlurNextButton}"
            @mouseover="${this._handleMouseOverNextButton}"
            @mouseleave="${this._handleMouseLeaveNextButton}"
          >
            ${this._getNextButtonSvgTemplate()}
          </button>
        </div>
      `}_handleClickPrevButton(e){e.stopPropagation(),f(this,"kuc:pagination-click-prev")}_handleFocusPrevButton(){this._prevButtonEl.classList.add("kuc-base-pagination-1-23-1__group__pager--focus")}_handleBlurPrevButton(){this._prevButtonEl.classList.remove("kuc-base-pagination-1-23-1__group__pager--focus")}_handleMouseOverPrevButton(){this._prevButtonEl.classList.add("kuc-base-pagination-1-23-1__group__pager--horver")}_handleMouseLeavePrevButton(){this._prevButtonEl.classList.remove("kuc-base-pagination-1-23-1__group__pager--horver")}_handleClickNextButton(e){e.stopPropagation(),f(this,"kuc:pagination-click-next")}_handleFocusNextButton(){this._nextButtonEl.classList.add("kuc-base-pagination-1-23-1__group__pager--focus")}_handleBlurNextButton(){this._nextButtonEl.classList.remove("kuc-base-pagination-1-23-1__group__pager--focus")}_handleMouseOverNextButton(){this._nextButtonEl.classList.add("kuc-base-pagination-1-23-1__group__pager--horver")}_handleMouseLeaveNextButton(){this._nextButtonEl.classList.remove("kuc-base-pagination-1-23-1__group__pager--horver")}_getPrevButtonSvgTemplate(){return C`
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.99061 7.5L9 0.0604158L7.06632 0L0 7.5L7.06632 15L9 14.9396L1.99061 7.5Z"
            fill="#888888"
          />
        </svg>
      `}_getNextButtonSvgTemplate(){return C`
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.00939 7.5L0 0.0604158L1.93368 0L9 7.5L1.93368 15L0 14.9396L7.00939 7.5Z"
          fill="#888888"
        />
      </svg>
      `}_getCurrentPageNumberTemplate(){const e=this._createCurrentPageInfo(),i=`${e.firstNum} - ${e.lastNum} / ${this.total}`;return _`<span class="kuc-base-pagination-1-23-1__group__pager-current"
        >${i}</span
      >`}_createCurrentPageInfo(){const e=(this.pagePosition-1)*this.rowsPerPage+1;let i=this.pagePosition*this.rowsPerPage;return i=i>this.total?this.total:i,{firstNum:e,lastNum:i}}}qe([l({type:Number})],a.prototype,"pagePosition",void 0),qe([l({type:Number})],a.prototype,"rowsPerPage",void 0),qe([l({type:Number})],a.prototype,"total",void 0),qe([l({type:Boolean})],a.prototype,"isNext",void 0),qe([l({type:Boolean})],a.prototype,"isPrev",void 0),qe([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),qe([g(".kuc-base-pagination-1-23-1__group__pager-prev")],a.prototype,"_prevButtonEl",void 0),qe([g(".kuc-base-pagination-1-23-1__group__pager-next")],a.prototype,"_nextButtonEl",void 0),window.customElements.define("kuc-base-pagination-1-23-1",a),x(Is),zi=a})();const Ts=`
  kuc-readonly-table-1-23-1 ,
  kuc-readonly-table-1-23-1  *,
  kuc-readonly-table-1-23-1:lang(en),
  kuc-readonly-table-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-readonly-table-1-23-1:lang(es),
  kuc-readonly-table-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-readonly-table-1-23-1:lang(ja),
  kuc-readonly-table-1-23-1:lang(ja) * {
      font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-readonly-table-1-23-1:lang(zh),
  kuc-readonly-table-1-23-1:lang(zh) * {
      font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-readonly-table-1-23-1:lang(zh-TW),
  kuc-readonly-table-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-readonly-table-1-23-1 {
    font-size: 14px;
    color: #333333;
    display: block;
  }
  kuc-readonly-table-1-23-1[hidden] {
    display: none;
  }
  .kuc-readonly-table-1-23-1__table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    display: inline-block;
  }
  .kuc-readonly-table-1-23-1__table__header {
    border-width: 0px 1px;
    border-color: var(--kuc-readonly-table-header-background-color, #3498db);
    border-style: solid;
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sort.kuc-readonly-table-1-23-1__table__header__cell--first-visible:hover {
    border-left: 1px solid var(--kuc-readonly-table-header-background-color-hover, #1d6fa5);
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sort.kuc-readonly-table-1-23-1__table__header__cell--last-visible:hover {
    border-right: 1px solid var(--kuc-readonly-table-header-background-color-hover, #1d6fa5);
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sort.kuc-readonly-table-1-23-1__table__header__cell--first-visible:focus-visible {
    border-left: 1px solid var(--kuc-readonly-table-header-background-color-focus, #1d6fa5);
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sort.kuc-readonly-table-1-23-1__table__header__cell--last-visible:focus-visible {
    border-right: 1px solid var(--kuc-readonly-table-header-background-color-focus, #1d6fa5);
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sorted-asc.kuc-readonly-table-1-23-1__table__header__cell--first-visible,
  .kuc-readonly-table-1-23-1__table__header__cell--sorted-desc.kuc-readonly-table-1-23-1__table__header__cell--first-visible {
    border-left: 1px solid var(--kuc-readonly-table-header-background-color-sorted, #1d6fa5);
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sorted-asc.kuc-readonly-table-1-23-1__table__header__cell--last-visible,
  .kuc-readonly-table-1-23-1__table__header__cell--sorted-desc.kuc-readonly-table-1-23-1__table__header__cell--last-visible {
    border-right: 1px solid var(--kuc-readonly-table-header-background-color-sorted, #1d6fa5);
  }
  .kuc-readonly-table-1-23-1__table__label {
    text-align: left;
    white-space: normal;
    overflow-wrap: anywhere;
    padding: 4px 0px;
  }
  .kuc-readonly-table-1-23-1__table__label[hidden] {
    display: none;
  }
  .kuc-readonly-table-1-23-1__table__label--no-column {
    overflow-wrap: break-word;
  }
  .kuc-readonly-table-1-23-1__table__header__cell {
    background-color: var(--kuc-readonly-table-header-background-color, #3498db);
    color: var(--kuc-readonly-table-header-color, #ffffff);
    height: var(--kuc-readonly-table-header-height, 40px);
    box-sizing: border-box;
    text-align: left;
    overflow: auto;
    white-space: nowrap;
    word-wrap: break-word;
    padding: 4px 8px;
    font-weight: 400;
    font-size: var(--kuc-readonly-table-header-font-size, 12px);
  }
  .kuc-readonly-table-1-23-1__table__header__cell--html {
    white-space: normal;
    overflow: unset;
  }
  .kuc-readonly-table-1-23-1__table__header__cell[hidden] {
    display: none;
  }
  .kuc-readonly-table-1-23-1__table__header__cell__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .kuc-readonly-table-1-23-1__table__header__cell__wrapper__title {
    flex: 1;
    min-width: 0;
  }
  .kuc-readonly-table-1-23-1__table__header__cell__wrapper__title--html {
    white-space: normal;
  }
  .kuc-readonly-table-1-23-1__table__header__cell__wrapper__sort-icon {
    flex-shrink: 0;
    margin-left: 4px;
    display: flex;
    align-items: center;
    align-self: center;
  }
  .kuc-readonly-table-1-23-1__table__body {
    vertical-align: top;
  }
  .kuc-readonly-table-1-23-1__table__body>.kuc-readonly-table-1-23-1__table__body__row:first-child>.kuc-readonly-table-1-23-1__table__body__row__cell-data {
    border-top-width: 0px;
  }
  .kuc-readonly-table-1-23-1__table__body__row__cell-data {
    box-sizing: border-box;
    padding: 4px 8px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    border-color: #e3e7e8;
    border-style: solid;
    border-width: 1px;
  }
  .kuc-readonly-table-1-23-1__table__body__row__cell-data[hidden] {
    display: none;
  }
  .kuc-readonly-table-1-23-1__table__header__cell,
  .kuc-readonly-table-1-23-1__table__body__row__cell-data {
    scrollbar-width: none; /* Firefox */
  }
  .kuc-readonly-table-1-23-1__table__header__cell::-webkit-scrollbar,
  .kuc-readonly-table-1-23-1__table__body__row__cell-data::-webkit-scrollbar {
    width: 0; /* Safari and Chrome */
    display: none
  }
  .kuc-readonly-table-1-23-1__table__body__row__cell-data--html {
    white-space: normal;
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sort {
    cursor: pointer;
    user-select: none;
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sort:hover {
    background-color: var(--kuc-readonly-table-header-background-color-hover, #1d6fa5);
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sort:focus-visible {
    outline: none;
    background-color: var(--kuc-readonly-table-header-background-color-focus, #1d6fa5);
  }
  .kuc-readonly-table-1-23-1__table__header__cell--sorted-asc,
  .kuc-readonly-table-1-23-1__table__header__cell--sorted-desc {
    background-color: var(--kuc-readonly-table-header-background-color-sorted, #1d6fa5);
  }
`;var de=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let ji;(()=>{if(ji=window.customElements.get("kuc-readonly-table-1-23-1"),ji)return;class a extends k{constructor(e){if(super(),this.className="",this.id="",this.label="",this.columns=[],this.data=[],this.pagination=!0,this.rowsPerPage=5,this.visible=!0,this._pagePosition=1,this._columnOrder=[],this._sortField=null,this._sortDirection=null,!e)return;const i=S(e);Object.assign(this,i)}shouldUpdate(e){return e.has("columns")&&!T(this.columns)?(this.throwErrorAfterUpdateComplete(y.COLUMNS.IS_NOT_ARRAY),!1):e.has("data")&&!T(this.data)?(this.throwErrorAfterUpdateComplete(y.DATA.IS_NOT_ARRAY),!1):e.has("rowsPerPage")&&!Li(this.rowsPerPage)?(this.throwErrorAfterUpdateComplete(y.ROWS_PER_PAGE.INVALID),!1):!0}willUpdate(e){e.has("columns")&&(this._columnOrder=[],this.columns.map(i=>this._columnOrder.push(i.field?i.field:""))),e.has("rowsPerPage")&&(this.rowsPerPage=Math.round(this.rowsPerPage))}render(){const e=this._createDisplayData();return!this.columns||this.columns.length<1?_`
            <table class="kuc-readonly-table-1-23-1__table">
              <caption
                class="kuc-readonly-table-1-23-1__table__label kuc-readonly-table-1-23-1__table__label--no-column"
                ?hidden="${!this.label}"
              >
                ${this.label}
              </caption>
            </table>
          `:_`
            <table class="kuc-readonly-table-1-23-1__table">
              <caption
                class="kuc-readonly-table-1-23-1__table__label"
                ?hidden="${!this.label}"
              >
                ${this.label}
              </caption>
              <thead class="kuc-readonly-table-1-23-1__table__header">
                <tr>
                  ${this.columns.map((i,o)=>this._getColumnsTemplate(i,o))}
                </tr>
              </thead>
              <tbody class="kuc-readonly-table-1-23-1__table__body">
                ${e.map((i,o)=>this._getDataTemplate(i,o))}
              </tbody>
            </table>
            <kuc-base-pagination-1-23-1
              .pagePosition="${this._pagePosition}"
              .rowsPerPage="${this.rowsPerPage}"
              .total="${this.data.length}"
              .visible="${this.pagination}"
              .isPrev="${this._toggleDisplayPreviousButton()}"
              .isNext="${this._toggleDisplayNextButton()}"
              @kuc:pagination-click-prev=${this._handleClickPreviousButton}
              @kuc:pagination-click-next=${this._handleClickNextButton}
            ></kuc-base-pagination-1-23-1>
          `}_createDisplayData(){let e=[...this.data];if(this._sortField&&this._sortDirection&&(e=this._sortData(e,this._sortField,this._sortDirection)),!this.pagination)return e;const i=(this._pagePosition-1)*this.rowsPerPage+1,o=this._pagePosition*this.rowsPerPage;return e.filter((n,s)=>s>=i-1&&s<=o-1)}_sortData(e,i,o){return[...e].sort((n,s)=>{const r=n[i],u=s[i],c=K(r),d=K(u);if(c&&d)return 0;if(c)return 1;if(d)return-1;if(r==null&&u==null)return 0;if(r==null)return 1;if(u==null)return-1;if(typeof r=="number"&&typeof u=="number")return o==="asc"?r-u:u-r;if(typeof r=="string"&&typeof u=="string"&&Oe(r)&&Oe(u)){const m=new Date(r),E=new Date(u);if(!isNaN(m.getTime())&&!isNaN(E.getTime()))return o==="asc"?m.getTime()-E.getTime():E.getTime()-m.getTime()}const h=String(r),p=String(u),b=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});return o==="asc"?b.compare(h,p):b.compare(p,h)})}_handleClickHeader(e){this._sortFields(e)}_handleKeyDownHeader(e,i){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._sortFields(i))}_sortFields(e){const i=this._columnOrder.indexOf(e);i<0||!this.columns[i].sort||(this._sortField===e?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortField=e,this._sortDirection="asc"),this._pagePosition=1)}_customWidthVariables(e){return`var(--kuc-readonly-table-header-${e}-width, var(--kuc-readonly-table-header-width, auto))`}_getColumnsTemplate(e,i){var o;const n=this._customWidthVariables(i),s=e.title?K(e.title):!1,r=e.field||"",u=e.sort===!0,c=this._sortField===r,d=this.columns.map((m,E)=>m.visible!==!1?E:-1).filter(m=>m!==-1),h=i===d[0],p=i===d[d.length-1],b=c?` kuc-readonly-table-1-23-1__table__header__cell--sorted-${this._sortDirection}`:"";return _`
        <th
          class="kuc-readonly-table-1-23-1__table__header__cell${s?" kuc-readonly-table-1-23-1__table__header__cell--html":""}${u?" kuc-readonly-table-1-23-1__table__header__cell--sort":""}${b}${h?" kuc-readonly-table-1-23-1__table__header__cell--first-visible":""}${p?" kuc-readonly-table-1-23-1__table__header__cell--last-visible":""}"
          ?hidden="${e.visible===!1}"
          style="width: ${n}; min-width: ${n}; max-width: ${n};"
          @click="${u?()=>this._handleClickHeader(r):null}"
          tabindex="${u?0:-1}"
          aria-sort="${c?this._getSortDescription(this._sortDirection):"none"}"
          @keydown="${u?m=>this._handleKeyDownHeader(m,r):null}"
        >
          <div class="kuc-readonly-table-1-23-1__table__header__cell__wrapper">
            <div
              class="kuc-readonly-table-1-23-1__table__header__cell__wrapper__title${s?" kuc-readonly-table-1-23-1__table__header__cell__wrapper__title--html":""}"
            >
              ${s?Q(e.title):(o=e.title)!==null&&o!==void 0?o:""}
            </div>
            ${u&&c?_`<div
                  class="kuc-readonly-table-1-23-1__table__header__cell__wrapper__sort-icon"
                >
                  ${this._getSortSvgIcon(this._sortDirection)}
                </div>`:""}
          </div>
        </th>
      `}_getSortDescription(e){return e==="desc"?"descending":e==="asc"?"ascending":"none"}_getSortSvgIcon(e){return e==="desc"?C`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99996 0H5.99996V10.6011L1.4528 5.78021L0.725342 6.46637L6.57169 12.6647L12.1902 6.45887L11.4489 5.78771L6.99996 10.7017V0Z" fill="white"/>
        </svg>
        `:e==="asc"?C`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99996 13H5.99996V2.3989L1.4528 7.21979L0.725342 6.53363L6.57169 0.3353L12.1902 6.54113L11.4489 7.21229L6.99996 2.2983V13Z" fill="white"/>
      </svg>`:""}_getDataTemplate(e,i){return _`
        <tr
          class="kuc-readonly-table-1-23-1__table__body__row kuc-readonly-table-1-23-1__table__body__row-${i}"
        >
          ${this._columnOrder.map((o,n)=>{var s;const r=(s=this.columns[n].visible)!==null&&s!==void 0?s:!0;let u=e[o];K(u)&&(u=_`<div
                class="kuc-readonly-table-1-23-1__table__body__row__cell-data--html"
              >
                ${Q(u)}
              </div>`);const c=this._customWidthVariables(n);return _`<td class="kuc-readonly-table-1-23-1__table__body__row__cell-data" ?hidden="${!r}" style="width: ${c}; min-width: ${c}; max-width: ${c}">${u}</td>`})}
        </tr>
      `}_toggleDisplayPreviousButton(){return this._pagePosition>1}_toggleDisplayNextButton(){return this._pagePosition<this.data.length/this.rowsPerPage}_handleClickPreviousButton(e){if(!(this._pagePosition<2)){if(!Li(this.rowsPerPage)){this.throwErrorAfterUpdateComplete(y.ROWS_PER_PAGE.INVALID);return}this._pagePosition-=1}}_handleClickNextButton(e){if(!Li(this.rowsPerPage)){this.throwErrorAfterUpdateComplete(y.ROWS_PER_PAGE.INVALID);return}this._toggleDisplayNextButton()!==!1&&(this._pagePosition+=1)}}de([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),de([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),de([l({type:String})],a.prototype,"label",void 0),de([l({type:Array})],a.prototype,"columns",void 0),de([l({type:Array})],a.prototype,"data",void 0),de([l({type:Boolean})],a.prototype,"pagination",void 0),de([l({type:Number})],a.prototype,"rowsPerPage",void 0),de([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),de([v()],a.prototype,"_pagePosition",void 0),de([v()],a.prototype,"_columnOrder",void 0),de([v()],a.prototype,"_sortField",void 0),de([v()],a.prototype,"_sortDirection",void 0),window.customElements.define("kuc-readonly-table-1-23-1",a),x(Ts),ji=a})();const $s=`
  kuc-spinner-1-23-1,
  kuc-spinner-1-23-1 *,
  kuc-spinner-1-23-1:lang(en),
  kuc-spinner-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-spinner-1-23-1:lang(es),
  kuc-spinner-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-spinner-1-23-1:lang(ja),
  kuc-spinner-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-spinner-1-23-1:lang(zh),
  kuc-spinner-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-spinner-1-23-1:lang(zh-TW),
  kuc-spinner-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-spinner-1-23-1 {
    font-size: 14px;
    color: #333333;
  }
  .kuc-spinner-1-23-1__spinner {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .kuc-spinner-1-23-1__spinner__loader {
    width: var(--kuc-spinner-loader-width, 50px);
    height: var(--kuc-spinner-loader-height, 50px);
    animation: rotate-loading 1s steps(12) infinite;
    fill: var(--kuc-spinner-loader-color, #99ccff);
  }
  .kuc-spinner-1-23-1__spinner__text {
    margin: 10px 0;
    font-size: var(--kuc-spinner-text-font-size, 14px);
    color: var(--kuc-spinner-text-color, #333333);
  }
  .visually-hidden {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    padding: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    margin: -1px;
  }
  .kuc-spinner-1-23-1__mask {
    position: fixed;
    top: 0;
    right: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #666666;
    opacity: 0.6;
    z-index: 9999;
  }
  .kuc--has-spinner {
    overflow: hidden;
  }
  @keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;var ni=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Fi;(()=>{if(Fi=window.customElements.get("kuc-spinner-1-23-1"),Fi)return;class a extends k{constructor(e){super(),this.className="",this.id="",this.text="",this.container=document.body,this._isOpened=!1;const i=S(e);Object.assign(this,i)}_getSpinnerSvgTemplate(){return C`
        <svg
          class="kuc-spinner-1-23-1__spinner__loader"
          viewBox="0 0 50 50"
          aria-hidden="true"
        >
          <circle r="4" cx="30.43" cy="4.72" opacity="0.3" />
          <circle r="4" cx="39.85" cy="10.15" opacity="0.3" />
          <circle r="4" cx="45.28" cy="19.56" opacity="0.3" />
          <circle r="4" cx="45.28" cy="30.43" opacity="0.3" />
          <circle r="4" cx="39.85" cy="39.85" opacity="0.3" />
          <circle r="4" cx="30.44" cy="45.28" opacity="0.4" />
          <circle r="4" cx="19.56" cy="45.28" opacity="0.5" />
          <circle r="4" cx="10.15" cy="39.85" opacity="0.6" />
          <circle r="4" cx="4.7" cy="30.44" opacity="0.7" />
          <circle r="4" cx="4.7" cy="19.56" opacity="0.8" />
          <circle r="4" cx="10.15" cy="10.15" opacity="0.9" />
          <circle r="4" cx="19.56" cy="4.72" opacity="1" />
        </svg>
      `}_isValidContainerElement(){return this.container instanceof HTMLElement}open(){if(!this._isValidContainerElement()){document.body.appendChild(this),requestAnimationFrame(()=>{document.body.removeChild(this)}),this.performUpdate();return}this.parentElement&&this.parentElement.classList.remove("kuc--has-spinner"),this.container.appendChild(this),this.performUpdate(),this.container.classList.contains("kuc--has-spinner")||this.container.classList.add("kuc--has-spinner"),this._isOpened=!0}close(){this.parentElement&&this.parentElement.classList.remove("kuc--has-spinner"),this._isOpened=!1,this.parentNode&&this.parentNode.removeChild(this)}shouldUpdate(e){if(e.has("container")){if(this.container===null||this.container===void 0)return this._isOpened&&this.close(),!1;const i=this._isValidContainerElement(),o=!i||!document.contains(this.container);if(this._isOpened&&o&&this.close(),!i)return this.throwErrorAfterUpdateComplete(y.CONTAINER.INVALID),!1}return!0}render(){return _`
        <div class="kuc-spinner-1-23-1__spinner" aria-live="assertive" role="alert">
          ${this._getSpinnerSvgTemplate()}
          <div
            class="kuc-spinner-1-23-1__spinner__text${this.text?"":" visually-hidden"}"
          >
            ${this.text?this.text:"now loading…"}
          </div>
        </div>
        <div class="kuc-spinner-1-23-1__mask"></div>
      `}}ni([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),ni([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),ni([l({type:String})],a.prototype,"text",void 0),ni([l()],a.prototype,"container",void 0),window.customElements.define("kuc-spinner-1-23-1",a),x($s),Fi=a})();const Ls=`
  kuc-table-1-23-1,
  kuc-table-1-23-1 *,
  kuc-table-1-23-1:lang(en),
  kuc-table-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-table-1-23-1:lang(es),
  kuc-table-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-table-1-23-1:lang(ja),
  kuc-table-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-table-1-23-1:lang(zh),
  kuc-table-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-table-1-23-1:lang(zh-TW),
  kuc-table-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-table-1-23-1 {
    font-size: 14px;
    color: #333333;
    display: block;
  }
  kuc-table-1-23-1[hidden] {
    display: none;
  }
  kuc-table-1-23-1 kuc-* {
    line-height: 1;
  }
  .kuc-table-1-23-1__table {
    border-collapse: separate;
    border-spacing: 0;
  }
  .kuc-table-1-23-1__table__header {
    border-width: 0px 1px;
    border-color: var(--kuc-table-header-background-color, #3498db);
    border-style: solid;
    border-right: 0;
  }
  .kuc-table-1-23-1__table__header[hidden] {
    display: none;
  }
  .kuc-table-1-23-1__table__header__cell {
    box-sizing: border-box;
    font-size: var(--kuc-table-header-font-size, 12px);
    font-weight: 400;
    background-color: var(--kuc-table-header-background-color, #3498db);
    color: var(--kuc-table-header-color, #ffffff);
    height: var(--kuc-table-header-height, 40px);
    padding: 4px 8px;
    text-align: left;
    white-space: normal;
  }
  .kuc-table-1-23-1__table__header__cell-title {
    overflow-wrap: break-word;
    display: flex;
    align-items: center;
  }
  .kuc-table-1-23-1__table__header__cell[hidden] {
    display: none;
  }
  .kuc-table-1-23-1__table__header__cell .kuc-base-label-1-23-1__required-icon {
    font-size: var(--kuc-table-header-font-size, 20px);
    align-self: flex-start;
  }
  .kuc-table-1-23-1__table__header__cell__action--right {
    box-shadow: -2px 0 4px 0 rgba(0, 0, 0, 8%);
    position: sticky;
    right: var(--kuc-table-action-button-right, 0px);
  }
  .kuc-table-1-23-1__table__header__cell__action--left {
    box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 8%);
    position: sticky;
    left: var(--kuc-table-action-button-left, 0px);
    z-index: 1;
  }
  .kuc-table-1-23-1__table__body__row__cell-data {
    box-sizing: border-box;
    overflow-wrap: break-word;
    white-space: normal;
    border-color: #e3e7e8;
    border-style: solid;
    border-width: 0 1px 1px;
    padding: 8px 8px;
    vertical-align: top;
  }
  .kuc-table-1-23-1__table__body--no-header>.kuc-table-1-23-1__table__body__row:first-child>.kuc-table-1-23-1__table__body__row__cell-data {
    border-top-width: 1px;
  }
  .kuc-table-1-23-1__table__body__row__cell-data:not(.kuc-table-1-23-1__table__body__row__cell-data[hidden])~.kuc-table-1-23-1__table__body__row__cell-data {
    border-left-width: 0px;
  }
  .kuc-table-1-23-1__table__body__row__cell-data[hidden] {
    display: none;
  }
  .kuc-table-1-23-1__table__body__row__action {
    white-space: nowrap;
    background-color: var(--kuc-table-action-button-background-color, #f5f5f5);
    vertical-align: middle;
    position: sticky;
    border-color: #e3e7e8;
    border-style: solid;
    border-width: 0 0 1px;
  }
  .kuc-table-1-23-1__table__body--no-header>.kuc-table-1-23-1__table__body__row:first-child>.kuc-table-1-23-1__table__body__row__action {
    border-top-width: 1px;
  }
  .kuc-table-1-23-1__table__body__row__action--right {
    box-shadow: -2px 0 4px 0 rgba(0, 0, 0, 8%);
    right: var(--kuc-table-action-button-right, 0px);
    border-right-width: 1px;
  }
  .kuc-table-1-23-1__table__body__row__action--left {
    box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 8%);
    left: var(--kuc-table-action-button-left, 0px);
    border-left-width: 1px;
    z-index: 1;
  }
  .kuc-table-1-23-1__table__body__row__action button {
    display: inline-block;
    align-items: center;
    width: 24px;
    height: 24px;
    background: transparent;
    border: 1px solid transparent;
    padding: 2px;
    cursor: pointer;
  }
  .kuc-table-1-23-1__table__body__row__action button[hidden] {
    display: none;
  }
  .kuc-table-1-23-1__table__body__row__action-add {
    margin-left: 8px;
    margin-right: 8px;
  }
  .kuc-table-1-23-1__table__body__row__action-remove {
    margin-left: 4px;
    margin-right: 8px;
  }
  .kuc-table-1-23-1__table__body__row__action-add:focus,
  .kuc-table-1-23-1__table__body__row__action-remove:focus {
    border: 1px solid #3498db;
    outline: none;
  }
  .kuc-table-1-23-1__table__body__row__action-remove:hover path {
    fill: #e74c3c;
  }
  .kuc-table-1-23-1__table__body__row__action[hidden] {
    display: none;
  }
  .kuc-table-1-23-1__table caption {
    text-align: left;
    margin-bottom: 6px;
    overflow-wrap: anywhere;
    white-space: normal;
  }
  .kuc-table-1-23-1__table .kuc-table-1-23-1__table__label--no-column {
    overflow-wrap: break-word;
  }
`;var ie=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};const As="kuc-table-1-23-1__table__body__row__cell-data",Ds="kuc-table-1-23-1__table__body__row",Vs="kuc-table-1-23-1__table__body__row__action",fa="kuc-table-1-23-1__table__body__row__action-add",ba="kuc-table-1-23-1__table__body__row__action-remove",ma=a=>`var(--kuc-table-header-${a}-width, var(--kuc-table-header-width, auto))`,Ms="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.0355 8.49997V7.49997H8.50008V3.96454H7.50008V7.49997H3.96443V8.49997H7.50008V12.0356H8.50008V8.49997H12.0355Z",Bs="#3498db",Os="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM12.0355 7.49997V8.49997L3.96443 8.49997V7.49997H12.0355Z",Hs="#b5b5b5";let Gi;(()=>{if(Gi=window.customElements.get("kuc-table-1-23-1"),Gi)return;class a extends k{constructor(e){if(super(),this.actionButtonPosition="right",this.className="",this.id="",this.label="",this.columns=[],this.data=[],this.actionButton=!0,this.headerVisible=!0,this.visible=!0,this._actionButton={add:!0,remove:!0},this._actionButtonPosition="right",!e)return;const i=S(e);Object.assign(this,i)}shouldUpdate(e){if(e.has("data")||e.has("columns")){const i=this._getErrorValidateColumnsAndData();if(i)return this.throwErrorAfterUpdateComplete(i),!1}return!0}willUpdate(e){e.has("actionButtonPosition")&&(this._actionButtonPosition=this.actionButtonPosition==="left"?"left":"right"),e.has("actionButton")&&(this._actionButton=this._getActionButtonSettings()),this._tBody&&(this._tBody.innerHTML="")}render(){return!this.columns||this.columns.length<1?_`<table class="kuc-table-1-23-1__table">
            <caption
              class="kuc-table-1-23-1__table__label kuc-table-1-23-1__table__label--no-column"
              ?hidden="${!this.label}"
            >
              ${this.label}
            </caption>
          </table>`:_`
            <table class="kuc-table-1-23-1__table">
              <caption class="kuc-table-1-23-1__table__label" ?hidden="${!this.label}">
                ${this.label}
              </caption>
              <thead
                class="kuc-table-1-23-1__table__header"
                ?hidden="${!this.headerVisible}"
              >
                ${this._getTableHeaderTemplate()}
              </thead>
              <tbody
                class="kuc-table-1-23-1__table__body${this.headerVisible?"":" kuc-table-1-23-1__table__body--no-header"}"
              ></tbody>
            </table>
          `}updated(e){if(this.columns.length!==0)for(let i=0;i<this.data.length;i++)this._addRowToTable(i,this.data[i])}_getTableHeaderTemplate(){return _`
        <tr>
          ${this._actionButtonPosition==="left"?this._getActionButtonHeaderTemplate():""}
          ${this.columns.map((e,i)=>this._getColumnHeaderTemplate(e,i))}
          ${this._actionButtonPosition==="right"?this._getActionButtonHeaderTemplate():""}
        </tr>
      `}_getActionButtonHeaderTemplate(){return!this.data||this.data.length<1||!this._actionButton.add&&!this._actionButton.remove?_``:_`
        <th
          class="kuc-table-1-23-1__table__header__cell kuc-table-1-23-1__table__header__cell__action${this._actionButtonPosition==="left"?"--left":"--right"}"
        ></th>
      `}_getColumnHeaderTemplate(e,i){const o=ma(i);return _`
        <th
          class="kuc-table-1-23-1__table__header__cell"
          ?hidden="${e.visible===!1}"
          style="width: ${o}; min-width: ${o}; max-width: ${o}"
        >
          <div class="kuc-table-1-23-1__table__header__cell-title">
            ${e.title&&K(e.title)?Q(e.title):e.title}<!--
        --><span
              class="kuc-base-label-1-23-1__required-icon"
              ?hidden="${!e.requiredIcon}"
              >*</span
            >
          </div>
        </th>
      `}_getActionsCellWhenRemoveRow(e){let i=null,o=e;for(;this.data.length>1;){const n=this._table.rows[o];if(!n)o--;else{i=n.cells[this._actionButtonPosition==="left"?0:this.columns.length];break}}return i}_getDefaultDataRow(e){const i={};for(const o in e)if(Object.prototype.hasOwnProperty.call(e,o)){if(Array.isArray(e[o])){i[o]=[];continue}if(typeof e[o]=="object"&&e[o]!==null){i[o]={};continue}i[o]=""}return i}_addRowToTable(e,i){var o;const n=this._tBody.insertRow(e);n.classList.add(Ds),(this._actionButton.add||this._actionButton.remove)&&this._actionButtonPosition==="left"&&this._addActionsCellToNewRow(n);for(let s=0;s<this.columns.length;s++){const r=ma(s),u=n.insertCell(s+((this._actionButton.add||this._actionButton.remove)&&this._actionButtonPosition==="left"?1:0)),c=this.columns[s];u.classList.add(As),u.style.width=r,u.style.maxWidth=r,u.style.minWidth=r,u.addEventListener("change",h=>{this._handleChangeCell(h,c.field)}),u.hidden=!(!((o=c.visible)!==null&&o!==void 0)||o);const d=c.render?c.render(i[c.field],i,e):i[c.field];d&&d.nodeType?u.appendChild(d):u.innerText=d||""}!this._actionButton.add&&!this._actionButton.remove||this._actionButtonPosition==="left"||this._addActionsCellToNewRow(n)}_handleChangeCell(e,i){e.stopPropagation();const o=this._deepCloneObject(this.data),s=e.currentTarget.parentElement.rowIndex-1,r=this.data[s];if(i in r){let c=e.target.value;"detail"in e&&(c=e.detail.value),r[i]=c}const u={type:"change-cell",rowIndex:s,data:this._deepCloneObject(this.data),oldData:o,field:i};this._dispatchChangeEvent(u)}_handleAddRow(e){const i=this._deepCloneObject(this.data),o=this._getDefaultDataRow(this.data[0]);this._addRowToTable(e,o),this.data.splice(e,0,o);const n={type:"add-row",rowIndex:e,data:this._deepCloneObject(this.data),oldData:i};this._dispatchChangeEvent(n),this._toggleRemoveRowButton()}_handleRemoveRow(e){if(this.data.length===1)return;const i=e-1,o=this._deepCloneObject(this.data);this._table.deleteRow(e),this.data.splice(i,1);const n={type:"remove-row",rowIndex:i,data:this._deepCloneObject(this.data),oldData:o};this._dispatchChangeEvent(n),this._toggleRemoveRowButton(),this._focusActionsButtonWhenRemoveRow(e)}_focusActionsButtonWhenRemoveRow(e){const i=this._getActionsCellWhenRemoveRow(e);if(i){this._focusRemoveRowButton(i);return}this._focusFirstAddRowButton()}_focusRemoveRowButton(e){e.querySelector(`.${ba}`).focus()}_focusFirstAddRowButton(){const i=this._table.rows[1].cells[this._actionButtonPosition==="left"?0:this.columns.length].querySelector(`.${fa}`);i?.focus()}_toggleRemoveRowButton(){const e=this._actionButtonPosition==="left"?this._tBody.rows[0].firstChild:this._tBody.rows[0].lastChild,i=e.lastChild;if(this.data.length===1){i.style.display="none",this._actionButton.add||(e.style.display="none",this._hideActionHeaderCell());return}if(this.data.length===2){const n=(this._actionButtonPosition==="left"?this._tBody.rows[1].firstChild:this._tBody.rows[1].lastChild).lastChild;i.style.display=n.style.display="inline-block",e.style.removeProperty("display")}}_getSvgDOM(e,i){const o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("fill","none"),o.setAttribute("width","18"),o.setAttribute("height","18"),o.setAttribute("viewBox","0 0 16 16"),o.setAttribute("aria-hidden","true");const n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",i),n.setAttribute("fill-rule","evenodd"),n.setAttribute("clip-rule","evenodd"),n.setAttribute("fill",e),o.appendChild(n),o}_addActionsCellToNewRow(e){if(!this._actionButton.add&&!this._actionButton.remove)return;const i=e.insertCell(this._actionButtonPosition==="left"?0:this.columns.length);if(i.classList.add(Vs),this._actionButtonPosition==="left"?i.classList.add("kuc-table-1-23-1__table__body__row__action--left"):i.classList.add("kuc-table-1-23-1__table__body__row__action--right"),this._actionButton.add){const o=this._getActionButtonDOM("add",e);i.appendChild(o)}if(this._actionButton.remove){const o=this._getActionButtonDOM("remove",e);i.appendChild(o),this.data.length===1&&(o.style.display="none")}!this._actionButton.add&&this.data.length===1?(this._hideActionHeaderCell(),i.style.display="none"):(this._showActionHeaderCell(),i.style.removeProperty("display"))}_getActionButtonDOM(e,i){const o="Delete this row",n="Add row";let s=ba,r=o;const u=e==="add";u&&(s=fa,r=n);const c=u?Bs:Hs,d=u?Ms:Os,h=this._getSvgDOM(c,d),p=document.createElement("button");return p.classList.add(s),p.setAttribute("title",r),p.type="button",p.appendChild(h),p.addEventListener("click",()=>{const b=this._getErrorValidateColumnsAndData();if(b){this.throwErrorAfterUpdateComplete(b);return}if(u){this._handleAddRow(i.rowIndex);return}this._handleRemoveRow(i.rowIndex)}),p}_getActionButtonSettings(){const e={add:!0,remove:!0};return this.actionButton?(typeof this.actionButton=="object"&&(e.add=Object.prototype.hasOwnProperty.call(this.actionButton,"add")?!!this.actionButton.add:!0,e.remove=Object.prototype.hasOwnProperty.call(this.actionButton,"remove")?!!this.actionButton.remove:!0),e):(e.add=e.remove=!1,e)}_getErrorValidateColumnsAndData(){const e=this._getErrorMessageWhenValidateColumns();return e||(T(this.data)?"":y.DATA.IS_NOT_ARRAY)}_getErrorMessageWhenValidateColumns(){return T(this.columns)?es(this.columns)?ts(this.columns)?y.COLUMNS.FIELD_UNIQUE:"":y.COLUMNS.FIELD_REQUIRED:y.COLUMNS.IS_NOT_ARRAY}_deepCloneObject(e){return JSON.parse(JSON.stringify(e))}_dispatchChangeEvent(e){f(this,"change",e)}_hideActionHeaderCell(){this._actionHeaderCellRight&&(this._actionHeaderCellRight.hidden=!0),this._actionHeaderCellLeft&&(this._actionHeaderCellLeft.hidden=!0)}_showActionHeaderCell(){this._actionHeaderCellRight&&(this._actionHeaderCellRight.hidden=!1),this._actionHeaderCellLeft&&(this._actionHeaderCellLeft.hidden=!1)}}ie([l({type:String})],a.prototype,"actionButtonPosition",void 0),ie([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),ie([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),ie([l({type:String})],a.prototype,"label",void 0),ie([l({type:Array})],a.prototype,"columns",void 0),ie([l({type:Array})],a.prototype,"data",void 0),ie([l()],a.prototype,"actionButton",void 0),ie([l({type:Boolean})],a.prototype,"headerVisible",void 0),ie([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),ie([g(".kuc-table-1-23-1__table")],a.prototype,"_table",void 0),ie([g(".kuc-table-1-23-1__table__body")],a.prototype,"_tBody",void 0),ie([g(".kuc-table-1-23-1__table__header__cell__action--right")],a.prototype,"_actionHeaderCellRight",void 0),ie([g(".kuc-table-1-23-1__table__header__cell__action--left")],a.prototype,"_actionHeaderCellLeft",void 0),window.customElements.define("kuc-table-1-23-1",a),x(Ls),Gi=a})();const Rs=`
  kuc-tabs-1-23-1,
  kuc-tabs-1-23-1 *,
  kuc-tabs-1-23-1:lang(en),
  kuc-tabs-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-tabs-1-23-1:lang(es),
  kuc-tabs-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-tabs-1-23-1:lang(ja),
  kuc-tabs-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-tabs-1-23-1:lang(zh),
  kuc-tabs-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-tabs-1-23-1:lang(zh-TW),
  kuc-tabs-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-tabs-1-23-1 {
    display: inline-block;
  }
  kuc-tabs-1-23-1[hidden] {
    display: none;
  }
  .kuc-tabs-1-23-1__group__tabs-container {
    display: flex;
    padding: 0;
    align-items: center;
    padding-top: 16px;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-pre-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    background-color: #d4d7d7;
    border: none;
    cursor: pointer;
    height: var(--kuc-tabs-tab-height, 48px);
    width: 24px;
    min-width: 24px;
    margin-right: 1px;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-pre-button[hidden] {
    visibility: hidden;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-pre-button[disabled] {
    cursor: not-allowed;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-next-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    background-color: #d4d7d7;
    border: none;
    cursor: pointer;
    height: var(--kuc-tabs-tab-height, 48px);
    width: 24px;
    min-width: 24px;
    margin-left: 1px;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-next-button[hidden] {
    visibility: hidden;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-next-button[disabled] {
    cursor: not-allowed;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container {
    display: flex;
    flex-direction: row;
    padding: 0;
    overflow-y: hidden;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list {
    display: flex;
    flex: 1;
    margin: 0;
    padding: 0px;
    list-style: none;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container {
    scrollbar-width: none; /* Firefox */
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container::-webkit-scrollbar {
    width: 0; /* Safari and Chrome */
    display: none
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab {
    min-height: var(--kuc-tabs-tab-height, 48px);
    height: var(--kuc-tabs-tab-height, 48px);
    white-space: normal;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button:disabled {
    color: GrayText;
    background-color: #d4d7d7;
    cursor: not-allowed;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button {
    height: 100%;
    margin: 0;
    padding: 0 24px;
    display: grid;
    align-items: center;
    align-content: center;
    font-size: var(--kuc-tabs-tab-font-size, 14px);
    background-color: var(--kuc-tabs-tab-background-color, #d4d7d7);
    color: var(--kuc-tabs-tab-color, #333333);
    border-style: none;
    border-top: 1px solid #c7cbcb;
    border-left: 1px solid #c7cbcb;
    box-shadow: 1px 0 3px #c7cbcb inset;
    box-sizing: border-box;
    cursor: pointer;
    line-height: 1.5;
    width: var(--kuc-tabs-tab-width, auto);
    min-width: var(--kuc-tabs-tab-width, 200px);
    word-wrap: break-word;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button[hidden] {
    display: none;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button:last-of-type {
    border-right: 1px solid #c7cbcb;
  }

  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button:focus {
    outline: none;
    border: 1px solid #3498db;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button--click:focus{
    border: none;
    border-top: 1px solid #c7cbcb;
    border-left: 1px solid #c7cbcb;
    border-right: 1px solid #c7cbcb;
  }
  .kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button[aria-selected="true"] {
    background-color: var(--kuc-tabs-tab-background-color-selected, #ffffff);
    color: var(--kuc-tabs-tab-color-selected, #333333);
    box-shadow: none;
  }
  .kuc-tabs-1-23-1__group__tab-panel {
    display:block;
    padding: 0;
    border-top: 0;
  }
  .kuc-tabs-1-23-1__group__tab-panel[border-visible] {
    box-shadow: 0 0 8px 2px rgb(0 0 0 / 10%);
  }
  .kuc-tabs-1-23-1__group__tab-panel__content[hidden]{
    display:none;
  }
`;var oe=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Wi;(()=>{if(Wi=window.customElements.get("kuc-tabs-1-23-1"),Wi)return;const a=2;class t extends k{constructor(i){super(),this.className="",this.id="",this.value="",this.borderVisible=!0,this.scrollButtons=!1,this.visible=!0,this.items=[],this._selectedValue="",this._resizeObserver=null,this._isClick=!1,this._isAtStart=!0,this._isAtEnd=!1,this._GUID=D();const o=S(i);Object.assign(this,o),this._handleResize=this._handleResize.bind(this)}shouldUpdate(i){if(i.has("items")){if(!T(this.items))return this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1;for(let n=0;n<this.items.length;n++)if(this.items[n].value===void 0)return this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_SPECIFIED),!1;const o=this.items.map(n=>n.value);if(!$i(o))return this.throwErrorAfterUpdateComplete(y.ITEMS.IS_DUPLICATED),!1}return i.has("value")&&!bt(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_STRING),!1):!0}willUpdate(i){let o=this._getMatchedTabIndex();o===-1&&(o=this._getFirstVisibleTabIndex()),o>-1&&(this._selectedValue=this.items[o].value)}render(){return _`
        <div class="kuc-tabs-1-23-1__group">
          <div class="kuc-tabs-1-23-1__group__tabs-container">
            <button
              class="kuc-tabs-1-23-1__group__tabs-container__tab-pre-button"
              type="button"
              @mousedown="${this._handleMouseDownPrevButton}"
              ?hidden="${!this.scrollButtons}"
              ?disabled="${this._isAtStart}"
              aria-hidden="true"
              tabindex="-1"
            >
              ${this._getPrevButtonSvgTemplate()}
            </button>
            <div
              class="kuc-tabs-1-23-1__group__tabs-container__tab-list-container"
              @scroll="${this._handleScroll}"
            >
              <ul
                class="kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list"
                role="tablist"
                @blur="${this._handleBlur}"
              >
                ${this.items.map((i,o)=>this._getTabTemplate(i,o))}
              </ul>
            </div>
            <button
              class="kuc-tabs-1-23-1__group__tabs-container__tab-next-button"
              type="button"
              @mousedown="${this._handleMouseDownNextButton}"
              ?hidden="${!this.scrollButtons}"
              ?disabled="${this._isAtEnd}"
              aria-hidden="true"
              tabindex="-1"
            >
              ${this._getNextButtonSvgTemplate()}
            </button>
          </div>
          <div
            class="kuc-tabs-1-23-1__group__tab-panel"
            ?border-visible="${this.borderVisible}"
          >
            ${this.items.map((i,o)=>this._getTabContentTemplate(i,o))}
          </div>
        </div>
      `}firstUpdated(){window.addEventListener("resize",this._handleResize),this._resizeObserver=new ResizeObserver(()=>{this.scrollButtons&&this._updatePreNextButtonState()}),this._resizeObserver.observe(this._tabListContainer),this._setScrollStyles(),this._scrollToSelectedTab(!0)}updated(i){i.has("scrollButtons")&&this._setScrollStyles(),this.scrollButtons&&this._updatePreNextButtonState()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this._handleResize),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null)}_getTabTemplate(i,o){const n=i.value===this._selectedValue;return _`<li
        role="presentation"
        class="kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab"
      >
        <button
          role="tab"
          type="button"
          ?hidden="${i.visible===!1}"
          aria-selected="${n}"
          tabindex="${n&&!i.disabled?"0":"-1"}"
          class="kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button ${this._isClick?"kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button--click":""}"
          id="${this._GUID}-button-${o}"
          aria-controls="${this._GUID}-tabpanel-${o}"
          value="${i.value}"
          @click="${this._handleClickTab}"
          @mousedown="${this._handleMouseDown}"
          @keydown="${this._handleKeyDownTab}"
          ?disabled="${i.disabled}"
        >
          ${i.label?i.label:""}
        </button>
      </li>`}_getTabContentTemplate(i,o){const n=i.value===this._selectedValue;return _`<div
        class="kuc-tabs-1-23-1__group__tab-panel__content"
        role="tabpanel"
        id="${this._GUID}-tabpanel-${o}"
        aria-labelledby="${this._GUID}-button-${o}"
        ?hidden="${!n||i.visible===!1}"
        @change="${this._handleChangeEvent}"
      >
        ${i.content&&K(i.content)?Q(i.content):i.content}
      </div>`}_getPrevButtonSvgTemplate(){return C`
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.99061 7.5L9 0.0604158L7.06632 0L0 7.5L7.06632 15L9 14.9396L1.99061 7.5Z"
            fill="${this._isAtStart?"GrayText":"#333333"}"
          />
        </svg>
      `}_getNextButtonSvgTemplate(){return C`
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.00939 7.5L0 0.0604158L1.93368 0L9 7.5L1.93368 15L0 14.9396L7.00939 7.5Z"
          fill="${this._isAtEnd?"GrayText":"#333333"}"
        />
      </svg>
      `}_getVisibleTab(i,o){const n=Array.from(this._tabButtons),s=n.indexOf(o),r=i==="next"?1:-1,u=i==="next"?n.length:-1;for(let c=s+r;c!==u;c+=r)if(!n[c].hidden)return n[c];return null}_handleTabScroll(i){const o=this._findVisibleTab(i);if(!o)return;const s=this._isTabPartiallyVisible(o,i)?o:this._getVisibleTab(i,o);s&&this._scrollTab(s,{direction:i,mode:"edge"}),this._updatePreNextButtonState()}_findVisibleTab(i){const o=this._tabListContainer.getBoundingClientRect(),n=Array.from(this._tabButtons),s=r=>{const u=r.getBoundingClientRect();return!(u.right<=o.left||u.left>=o.right)};return i==="next"?n.reverse().find(s):n.find(s)}_isTabPartiallyVisible(i,o){const n=this._tabListContainer.getBoundingClientRect(),s=i.getBoundingClientRect();return o==="next"?s.right>n.right+a:s.left<n.left-a}_calculateScrollPosition(i,o){const{direction:n,mode:s}=o,r=this._tabListContainer.getBoundingClientRect(),u=i.getBoundingClientRect();let c=this._tabListContainer.scrollLeft;return s==="edge"&&n?c+=n==="next"?u.right-r.right:u.left-r.left:u.width>r.width&&n?c+=n==="next"?u.left-r.left:u.right-r.right:u.left<r.left?c+=u.left-r.left:u.right>r.right&&(c+=u.right-r.right),Math.max(0,Math.min(c,this._tabListContainer.scrollWidth-this._tabListContainer.clientWidth))}_scrollTab(i,o){const n=this._calculateScrollPosition(i,o);this._tabListContainer.scrollTo({left:n,behavior:o.immediate?"auto":"smooth"})}_handleMouseDownPrevButton(i){i.preventDefault(),this._handleTabScroll("prev")}_handleMouseDownNextButton(i){i.preventDefault(),this._handleTabScroll("next")}_handleResize(){this.scrollButtons&&this._updatePreNextButtonState()}_handleScroll(){this._updatePreNextButtonState()}_isScrollToLeft(){return this._tabListContainer.scrollLeft===0}_isScrollToRight(){const{scrollWidth:i,scrollLeft:o,clientWidth:n}=this._tabListContainer;return Math.abs(i-o-n)<a}_setScrollStyles(){var i;(i=this._tabGroup.parentElement)===null||i===void 0||i.style.setProperty("max-width",this.scrollButtons?"100%":""),this._tabListContainer.style.setProperty("overflow-x",this.scrollButtons?"auto":"visible")}_updatePreNextButtonState(){const i=this._isScrollToLeft(),o=this._isScrollToRight();i!==this._isAtStart&&(this._isAtStart=i),o!==this._isAtEnd&&(this._isAtEnd=o)}_handleMouseDown(i){this._isClick=!0}_handleClickTab(i){const o=i.target;o.blur();const n=this._getCurrentTabIndex(o.getAttribute("value"));if(this._tabButtons[n].focus(),this.value===o.value)return;const s=this._generateEventDetail(o.value);f(this,"change",s)}_handleChangeEvent(i){i.stopPropagation()}_handleBlur(i){this._isClick=!1}_handleKeyDownTab(i){this._isClick=!1;let o=!1;switch(i.key){case"Left":case"ArrowLeft":{o=!0,this._moveToAdjacentTab(i.target,"prev");break}case"Right":case"ArrowRight":{o=!0,this._moveToAdjacentTab(i.target,"next");break}case"Home":{o=!0,this._moveToLastFirstTab(i.target,"first");break}case"End":{o=!0,this._moveToLastFirstTab(i.target,"last");break}}o&&(i.stopPropagation(),i.preventDefault())}_getCurrentTabIndex(i){let o=-1;for(let n=0;n<this.items.length;n++)if(this.items[n].value===i){o=n;break}return o===-1&&(o=this._getFirstVisibleTabIndex()),o}_getFirstVisibleTabIndex(){return this.items.findIndex(i=>i.visible!==!1)}_getMatchedTabIndex(){return this.items.findIndex(i=>i.visible!==!1&&i.value===this.value)}_moveToLastFirstTab(i,o){const n=this._getCurrentTabIndex(i.getAttribute("value")),s=o==="last"?-1:1;let r=o==="last"?this.items.length-1:0;for(;r!==n;){if(this.items[r].visible!==!1&&this.items[r].disabled!==!0){i.blur(),f(this,"change",this._generateEventDetail(this._tabButtons[r].getAttribute("value"))),this._tabButtons[this._getCurrentTabIndex(this.value)].focus(),this._scrollTab(this._tabButtons[this._getCurrentTabIndex(this.value)],{mode:"visible"});break}r+=s}}_moveToAdjacentTab(i,o){const n=this._getCurrentTabIndex(i.getAttribute("value")),s=o==="next"?1:-1;let r=n+s;for(;r!==n&&(r===this.items.length?r=0:r===-1&&(r=this.items.length-1),r!==n);){if(this.items[r].visible!==!1&&this.items[r].disabled!==!0){i.blur(),f(this,"change",this._generateEventDetail(this._tabButtons[r].getAttribute("value"))),this._tabButtons[this._getCurrentTabIndex(this.value)].focus(),this._scrollTab(this._tabButtons[this._getCurrentTabIndex(this.value)],{mode:"visible",direction:o});break}r+=s}}_scrollToSelectedTab(i=!1){if(!this.value||!this._tabButtons.length)return;const o=this._getCurrentTabIndex(this.value);if(o===-1)return;const n=this._tabButtons[o];n&&(n.hidden||(this._scrollTab(n,{mode:"visible",immediate:i}),this._updatePreNextButtonState()))}_generateEventDetail(i){const o=this.value;return this.value=i,{oldValue:o,value:i}}}oe([l({type:String,reflect:!0,attribute:"class"})],t.prototype,"className",void 0),oe([l({type:String,reflect:!0,attribute:"id"})],t.prototype,"id",void 0),oe([l({type:String})],t.prototype,"value",void 0),oe([l({type:Boolean})],t.prototype,"borderVisible",void 0),oe([l({type:Boolean})],t.prototype,"scrollButtons",void 0),oe([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],t.prototype,"visible",void 0),oe([l({type:Array})],t.prototype,"items",void 0),oe([z(".kuc-tabs-1-23-1__group__tabs-container__tab-list-container__tab-list__tab__button")],t.prototype,"_tabButtons",void 0),oe([g(".kuc-tabs-1-23-1__group__tabs-container__tab-list-container")],t.prototype,"_tabListContainer",void 0),oe([g(".kuc-tabs-1-23-1__group")],t.prototype,"_tabGroup",void 0),oe([v()],t.prototype,"_isClick",void 0),oe([v()],t.prototype,"_isAtStart",void 0),oe([v()],t.prototype,"_isAtEnd",void 0),window.customElements.define("kuc-tabs-1-23-1",t),x(Rs),Wi=t})();const Ns=`
kuc-text-1-23-1,
kuc-text-1-23-1 *,
kuc-text-1-23-1:lang(en),
kuc-text-1-23-1:lang(en) * {
  font-family: sans-serif;
}
kuc-text-1-23-1:lang(es),
kuc-text-1-23-1:lang(es) * {
  font-family: sans-serif;
}
kuc-text-1-23-1:lang(ja),
kuc-text-1-23-1:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
}
kuc-text-1-23-1:lang(zh),
kuc-text-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-text-1-23-1:lang(zh-TW),
kuc-text-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC",sans-serif;
}
kuc-text-1-23-1 {
  font-size: 14px;
  color: #333333;
  display: inline-table;
  vertical-align: top;
  min-width: var(--kuc-text-input-width, 177px);
  width: var(--kuc-text-input-width, 177px);
  line-height: 1.5;
}
kuc-text-1-23-1[hidden] {
  display: none;
}
.kuc-text-1-23-1__group {
  border: none;
  padding: 0px;
  height: auto;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  margin: 0px;
}
.kuc-text-1-23-1__group__label {
  display: inline-block;
  padding: 4px 0px 8px 0px;
  white-space: nowrap;
}
.kuc-text-1-23-1__group__label[hidden] {
  display: none;
}
.kuc-text-1-23-1__group__input-form {
  display: flex;
  align-items: center;
  width: 100%;
}
.kuc-text-1-23-1__group__input-form__prefix-outer__prefix {
  padding-right: 4px;
  white-space: nowrap;
}
.kuc-text-1-23-1__group__input-form__input-outer {
  display: flex;
  min-width: var(--kuc-text-input-width, 26px);
  width: var(--kuc-text-input-width, 100%);
}
input[type="text"].kuc-text-1-23-1__group__input-form__input-outer__input {
  width: var(--kuc-text-input-width, 100%);
  height: var(--kuc-text-input-height, 40px);
  font-size: var(--kuc-text-input-font-size, 14px);
  color: var(--kuc-text-input-color, #000000);
  padding: 0 8px;
  border: 1px solid #e3e7e8;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
}
.kuc-text-1-23-1__group__input-form__input-outer__input[textAlign="left"] {
  text-align: left;
}
.kuc-text-1-23-1__group__input-form__input-outer__input[textAlign="right"] {
  text-align: right;
}
input[type=text].kuc-text-1-23-1__group__input-form__input-outer__input:focus {
  outline: none;
  border: 1px solid #3498db;
}
input[type=text].kuc-text-1-23-1__group__input-form__input-outer__input:disabled {
  color: #888888;
  background-color: #d4d7d7;
  box-shadow: none;
  cursor: not-allowed;
}
.kuc-text-1-23-1__group__input-form__suffix-outer__suffix {
  padding-left: 4px;
  white-space: nowrap;
}
`;var he=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let si;(()=>{if(si=window.customElements.get("kuc-text-1-23-1"),si)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.placeholder="",this.prefix="",this.suffix="",this.textAlign="left",this.value="",this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this._GUID=D();const i=S(e);Object.assign(this,i)}_handleFocusInput(e){const i={value:this.value};f(this,"focus",i)}_handleChangeInput(e){e.stopPropagation();const i=e.target,o={value:"",oldValue:this.value};this.value=i.value,o.value=this.value,f(this,"change",o)}_handleInputText(e){e.stopPropagation();const o={value:e.target.value,data:e.data};f(this,"input",o)}render(){return _`
        <div class="kuc-text-1-23-1__group">
          <label
            class="kuc-text-1-23-1__group__label"
            for="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </label>
          <div class="kuc-text-1-23-1__group__input-form">
            <div class="kuc-text-1-23-1__group__input-form__prefix-outer">
              <span
                class="kuc-text-1-23-1__group__input-form__prefix-outer__prefix"
                ?hidden="${!this.prefix}"
                >${this.prefix}</span
              >
            </div>
            <div class="kuc-text-1-23-1__group__input-form__input-outer">
              <input
                class="kuc-text-1-23-1__group__input-form__input-outer__input"
                id="${this._GUID}-label"
                placeholder="${this.placeholder}"
                textAlign="${this.textAlign}"
                type="text"
                .value="${this.value}"
                aria-required="${this.requiredIcon}"
                aria-invalid="${this.error!==""}"
                aria-describedby="${this._GUID}-error"
                @focus="${this._handleFocusInput}"
                @change="${this._handleChangeInput}"
                @input="${this._handleInputText}"
                ?disabled="${this.disabled}"
              />
            </div>
            <div class="kuc-text-1-23-1__group__input-form__suffix-outer">
              <span
                class="kuc-text-1-23-1__group__input-form__suffix-outer__suffix"
                ?hidden="${!this.suffix}"
                >${this.suffix}</span
              >
            </div>
          </div>
          <kuc-base-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
          ></kuc-base-error-1-23-1>
        </div>
      `}}he([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),he([l({type:String})],a.prototype,"error",void 0),he([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),he([l({type:String})],a.prototype,"label",void 0),he([l({type:String})],a.prototype,"placeholder",void 0),he([l({type:String})],a.prototype,"prefix",void 0),he([l({type:String})],a.prototype,"suffix",void 0),he([l({type:String})],a.prototype,"textAlign",void 0),he([l({type:String})],a.prototype,"value",void 0),he([l({type:Boolean})],a.prototype,"disabled",void 0),he([l({type:Boolean})],a.prototype,"requiredIcon",void 0),he([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),window.customElements.define("kuc-text-1-23-1",a),x(Ns),si=a})();const Us=si,Ps=`
  kuc-textarea-1-23-1,
  kuc-textarea-1-23-1 *,
  kuc-textarea-1-23-1:lang(en),
  kuc-textarea-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-textarea-1-23-1:lang(es),
  kuc-textarea-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-textarea-1-23-1:lang(ja),
  kuc-textarea-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-textarea-1-23-1:lang(zh),
  kuc-textarea-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-textarea-1-23-1:lang(zh-TW),
  kuc-textarea-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-textarea-1-23-1 {
    font-size: 14px;
    color: var(--kuc-textarea-input-color, #333333);
    display: inline-table;
    vertical-align: top;
    width: var(--kuc-textarea-input-width, 299px);
    height: var(--kuc-textarea-input-height, 125px);
    line-height: 1.5;
  }
  kuc-textarea-1-23-1[hidden] {
    display: none;
  }
  .kuc-textarea-1-23-1__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    vertical-align: top;
    width: 100%;
    margin: 0px;
    white-space: normal;
  }
  .kuc-textarea-1-23-1__group__label {
    white-space: nowrap;
    display: inline-block;
    padding: 4px 0px 8px 0px;
  }
  .kuc-textarea-1-23-1__group__label[hidden] {
    display: none;
  }
  .kuc-textarea-1-23-1__group__container {
    position: relative;
    display: inline-table;
    width: var(--kuc-textarea-input-width, 100%);
    min-width: var(--kuc-textarea-input-width, 100%);
  }
  textarea.kuc-textarea-1-23-1__group__textarea {
    display: block;
    border: 1px solid #e3e7e8;
    box-sizing: border-box;
    font-size: var(--kuc-textarea-input-font-size, 14px);
    box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
    min-width: var(--kuc-textarea-input-width, 299px);
    min-height: var(--kuc-textarea-input-height, 125px);
    width: var(--kuc-textarea-input-width, 299px);
    height: var(--kuc-textarea-input-height, 125px);
    padding: 8px;
    resize: none;
    width: 100%;
    background-color: #ffffff;
    color: var(--kuc-textarea-input-color, #333333);
  }
  .kuc-textarea-1-23-1__group__textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
    border: 1px solid #3498db;
    background-color: #ffffff;
    color: var(--kuc-textarea-input-color, #333333);
  }
  .kuc-textarea-1-23-1__group__textarea:disabled {
    color: #888888;
    background-color: #d4d7d7;
    box-shadow: none;
    cursor: not-allowed;
    resize: none;
  }
  .kuc-textarea-1-23-1__group__resizer {
    position: absolute;
    width: 16px;
    height: 16px;
    cursor: se-resize;
    float: right;
    margin: -16px 0px;
    right: 0px;
  }
`;var me=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let ri;(()=>{if(ri=window.customElements.get("kuc-textarea-1-23-1"),ri)return;const a={MIN_WIDTH:16,MIN_HEIGHT:16};class t extends k{constructor(i){super(),this.className="",this.error="",this.id="",this.label="",this.placeholder="",this.value="",this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this._onResize=!1,this._GUID=D();const o=S(i);Object.assign(this,o)}_handleFocusTextarea(i){const o={value:this.value};f(this,"focus",o)}_handleChangeTextarea(i){i.stopPropagation();const o=i.target,n={value:"",oldValue:this.value};this.value=o.value,n.value=this.value,f(this,"change",n)}_handleInputTextArea(i){i.stopPropagation();const n={value:i.target.value,data:i.data};f(this,"input",n)}_handleMouseDownResize(){this._onResize=!0}_handleMouseUpDocument(){this._onResize=!1}_handleMouseMoveDocument(i){if(!this._onResize)return;const o=this._textarea.getBoundingClientRect();let n=i.clientX-o.left,s=i.clientY-o.top;n<a.MIN_WIDTH&&(n=a.MIN_WIDTH),s<a.MIN_HEIGHT&&(s=a.MIN_HEIGHT),this._container.style.width=n+"px",this._textarea.style.height=s+"px"}_getResizerButtonSvgTemplate(){return C`
      <svg height="16" width="16">
        <g fill="none" stroke="#b6b6b6" stroke-width="2">
          <line x1="14" x2="16" y1="15" y2="15" />
          <line x1="14" x2="16" y1="11" y2="11" />
          <line x1="14" x2="16" y1="7" y2="7" />
          <line x1="10" x2="12" y1="15" y2="15" />
          <line x1="6" x2="8" y1="15" y2="15" />
          <line x1="10" x2="12" y1="11" y2="11" />
        </g>
      </svg>
      `}firstUpdated(){document.addEventListener("mousemove",i=>this._handleMouseMoveDocument(i)),document.addEventListener("mouseup",i=>this._handleMouseUpDocument())}render(){return _`
        <div class="kuc-textarea-1-23-1__group">
          <label
            class="kuc-textarea-1-23-1__group__label"
            ?hidden="${!this.label}"
            for="${this._GUID}-label"
          >
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </label>
          <div class="kuc-textarea-1-23-1__group__container">
            <textarea
              id="${this._GUID}-label"
              class="kuc-textarea-1-23-1__group__textarea"
              placeholder="${this.placeholder}"
              .value="${this.value}"
              aria-describedby="${this._GUID}-error"
              aria-required="${this.requiredIcon}"
              aria-invalid="${this.error!==""}"
              @change="${this._handleChangeTextarea}"
              @focus="${this._handleFocusTextarea}"
              @input="${this._handleInputTextArea}"
              ?disabled="${this.disabled}"
            >
            </textarea>
            <div
              class="kuc-textarea-1-23-1__group__resizer"
              @mousedown="${this._handleMouseDownResize}"
              ?hidden="${this.disabled}"
            >
              ${this._getResizerButtonSvgTemplate()}
            </div>
          </div>
          <kuc-base-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
          ></kuc-base-error-1-23-1>
        </div>
      `}}me([l({type:String,reflect:!0,attribute:"class"})],t.prototype,"className",void 0),me([l({type:String})],t.prototype,"error",void 0),me([l({type:String,reflect:!0,attribute:"id"})],t.prototype,"id",void 0),me([l({type:String})],t.prototype,"label",void 0),me([l({type:String})],t.prototype,"placeholder",void 0),me([l({type:String})],t.prototype,"value",void 0),me([l({type:Boolean})],t.prototype,"disabled",void 0),me([l({type:Boolean})],t.prototype,"requiredIcon",void 0),me([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],t.prototype,"visible",void 0),me([g(".kuc-textarea-1-23-1__group__container")],t.prototype,"_container",void 0),me([g(".kuc-textarea-1-23-1__group__textarea")],t.prototype,"_textarea",void 0),window.customElements.define("kuc-textarea-1-23-1",t),x(Ps),ri=t})();const zs=ri,js=`
kuc-time-picker-1-23-1,
kuc-time-picker-1-23-1 *,
kuc-time-picker-1-23-1:lang(en),
kuc-time-picker-1-23-1:lang(en) * {
  font-family: sans-serif;
}
kuc-time-picker-1-23-1:lang(ja),
kuc-time-picker-1-23-1:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
}
kuc-time-picker-1-23-1:lang(zh),
kuc-time-picker-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-time-picker-1-23-1:lang(zh-TW),
kuc-time-picker-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC"
}
kuc-time-picker-1-23-1:lang(es),
kuc-time-picker-1-23-1:lang(es) * {
  font-family: sans-serif;
}
kuc-time-picker-1-23-1 {
  font-size: 14px;
  color: var(--kuc-time-picker-input-color, #333333);
  display: inline-table;
  max-width: var(--kuc-time-picker-input-width, 85px);
  width: var(--kuc-time-picker-input-width, 85px);
  vertical-align: top;
  line-height: 1.5;
}
.kuc-time-picker-1-23-1__group__input {
  position: relative;
}
kuc-time-picker-1-23-1[hidden] {
  display: none;
}
.kuc-time-picker-1-23-1__group {
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0px;
  height: auto;
  margin: 0px;
}

.kuc-time-picker-1-23-1__group kuc-base-time-1-23-1 {
  display: inline-flex;
  flex-direction: column;
}

.kuc-time-picker-1-23-1__group .kuc-base-time-1-23-1__group {
  max-width: var(--kuc-time-picker-input-width, 85px);
  width: var(--kuc-time-picker-input-width, 85px);
  font-size: var(--kuc-time-picker-input-font-size, 14px);
  height: var(--kuc-time-picker-input-height, 40px);
  color: var(--kuc-time-picker-input-color, #333333);
}
.kuc-time-picker-1-23-1__group .kuc-base-time-1-23-1__group input[type=text].kuc-base-time-1-23-1__group__hours,
.kuc-time-picker-1-23-1__group .kuc-base-time-1-23-1__group input[type=text].kuc-base-time-1-23-1__group__minutes,
.kuc-time-picker-1-23-1__group .kuc-base-time-1-23-1__group input.kuc-base-time-1-23-1__group__suffix,
.kuc-time-picker-1-23-1__group .kuc-base-time-1-23-1__group--focus {
  color: var(--kuc-time-picker-input-color, #333333);
}
.kuc-time-picker-1-23-1__group__label {
  padding: 4px 0px 8px 0px;
  display: inline-block;
  white-space: nowrap;
}
.kuc-time-picker-1-23-1__group__label[hidden] {
  display: none;
}
`;var ae=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Ki;(()=>{if(Ki=window.customElements.get("kuc-time-picker-1-23-1"),Ki)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.language="auto",this.max="",this.min="",this.value="",this.disabled=!1,this.hour12=!1,this.requiredIcon=!1,this.visible=!0,this.timeStep=30,this._errorText="",this._inputValue="",this._errorInvalid="",this._inputMax="",this._inputMin="",this._inputTimeStep=30,this._valueConverted="",this._GUID=D();const i=S(e);Object.assign(this,i)}shouldUpdate(e){if(e.has("max")||e.has("min")){let i=this._inputMin,o=this._inputMax;if(this.max===void 0||this.max==="")o=ta;else{if(!at(this.max))return this.throwErrorAfterUpdateComplete(G.MAX),!1;o=this.max=Be(this.max)}if(this.min===void 0||this.min==="")i=wi;else{if(!at(this.min))return this.throwErrorAfterUpdateComplete(G.MIN),!1;i=this.min=Be(this.min)}if(Fe(o,i)<0)return this.throwErrorAfterUpdateComplete(Xo),!1;this._inputMin=i,this._inputMax=o}if(e.has("timeStep")){if(!nt(this.timeStep))return this.throwErrorAfterUpdateComplete(ea),!1;if(!ha(this.timeStep,this._inputMax,this._inputMin))return this.throwErrorAfterUpdateComplete(G.TIME_STEP),!1;this._inputTimeStep=this.timeStep}return this.value===void 0||this.value===""?!0:at(this.value)?(this._valueConverted=Be(this.value),e.has("value")&&(Fe(this._valueConverted,this._inputMin)<0||Fe(this._inputMax,this._valueConverted)<0)?(this.throwErrorAfterUpdateComplete(Qo),!1):!0):(this.throwErrorAfterUpdateComplete(G.VALUE),!1)}update(e){e.has("value")&&(this.value===void 0?this._errorInvalid===""&&(this._inputValue=""):(this.value=this.value===""?this.value:this._valueConverted,this._inputValue=this.value)),(e.has("max")||e.has("min")||e.has("value"))&&this.value!==void 0&&(this._errorInvalid=""),this._errorText=this._errorInvalid||this.error,super.update(e)}render(){return _`
        <fieldset
          class="kuc-time-picker-1-23-1__group"
          aria-describedby="${this._GUID}-error"
        >
          <legend
            class="kuc-time-picker-1-23-1__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </legend>
          <kuc-base-time-1-23-1
            class="kuc-time-picker-1-23-1__group__input"
            .value="${this._inputValue}"
            .hour12="${this.hour12}"
            .disabled="${this.disabled}"
            .timeStep="${this._inputTimeStep}"
            .min="${this._inputMin}"
            .max="${this._inputMax}"
            .language="${this._getLanguage()}"
            @kuc:base-time-change="${this._handleTimeChange}"
          >
          </kuc-base-time-1-23-1>
          <kuc-base-error-1-23-1
            .text="${this._errorText}"
            .guid="${this._GUID}"
            ?hidden="${!this._errorText}"
          ></kuc-base-error-1-23-1>
        </fieldset>
      `}_handleTimeChange(e){e.preventDefault(),e.stopPropagation();const i={value:e.detail.value,oldValue:this.value};e.detail.error?(i.value=void 0,this.value=void 0,this._errorInvalid=e.detail.error,this.error=""):(this.value=e.detail.value,this._errorInvalid=""),this._inputValue=e.detail.value,f(this,"change",i)}_getLanguage(){const e=["en","ja","zh","zh-TW","es"];return e.indexOf(this.language)!==-1?this.language:e.indexOf(document.documentElement.lang)!==-1?document.documentElement.lang:"en"}}ae([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),ae([l({type:String})],a.prototype,"error",void 0),ae([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),ae([l({type:String})],a.prototype,"label",void 0),ae([l({type:String,attribute:"lang",reflect:!0,converter:ot})],a.prototype,"language",void 0),ae([l({type:String})],a.prototype,"max",void 0),ae([l({type:String})],a.prototype,"min",void 0),ae([l({type:String})],a.prototype,"value",void 0),ae([l({type:Boolean})],a.prototype,"disabled",void 0),ae([l({type:Boolean})],a.prototype,"hour12",void 0),ae([l({type:Boolean})],a.prototype,"requiredIcon",void 0),ae([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),ae([l({type:Number})],a.prototype,"timeStep",void 0),window.customElements.define("kuc-time-picker-1-23-1",a),x(js),Ki=a})();const Fs=`
  kuc-tooltip-1-23-1,
  kuc-tooltip-1-23-1 *,
  kuc-tooltip-1-23-1:lang(en),
  kuc-tooltip-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-tooltip-1-23-1:lang(es),
  kuc-tooltip-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-tooltip-1-23-1:lang(ja),
  kuc-tooltip-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-tooltip-1-23-1:lang(zh),
  kuc-tooltip-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-tooltip-1-23-1:lang(zh-TW),
  kuc-tooltip-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  .kuc-tooltip-1-23-1__group__title--hidden {
    display: none;
  }
  .kuc-tooltip-1-23-1__group {
    position: relative;
    display: inline-block;
  }
  .kuc-tooltip-1-23-1__group::after {
    position: absolute;
    right: -20%;
    top: 100%;
    left: -20%;
    display: block;
    height: calc(0.5em * 2);
  }
  .kuc-tooltip-1-23-1__group__title .kuc-tooltip-1-23-1__group__title__wrapper__text {
    max-width: var(--kuc-tooltip-width, 250px);
    width: var(--kuc-tooltip-width, auto);
    min-height: var(--kuc-tooltip-height, 32px);;
    height: var(--kuc-tooltip-height, auto);
    padding: 6px 8px;
    color: var(--kuc-tooltip-color, #ffffff);
    text-align: start;
    text-decoration: none;
    word-wrap: break-word;
    overflow: auto;
    white-space: normal;
    background-color: var(--kuc-tooltip-background-color, #000000);
    font-size: var(--kuc-tooltip-font-size);
    border-radius: 6px;
    box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    box-sizing: border-box;
  }
  .kuc-tooltip-1-23-1__group__title {
    position: absolute;
    top: calc(100% + calc(0.5em * 2));
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    border-radius: 0.25em;
    color: var(--kuc-tooltip-color, #ffffff);
    width: max-content;
    z-index: 1000;
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--top > .kuc-tooltip-1-23-1__group__title {
    top: unset;
    bottom: 100%;
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--bottom > .kuc-tooltip-1-23-1__group__title {
    width: max-content;
    top: auto;
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--left > .kuc-tooltip-1-23-1__group__title {
    width: max-content;
    height: fit-content;
    margin: auto 0;
    right: 100%;
    left: auto;
    top: 0;
    bottom: 0;
    transform: translateX(0);
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--right > .kuc-tooltip-1-23-1__group__title {
    width: max-content;
    height: fit-content;
    margin: auto 0;
    left: 100%;
    top: 0;
    bottom: 0;
    transform: translateX(0);
  }
  .kuc-tooltip-1-23-1__group .kuc-tooltip-1-23-1__group__title__wrapper__arrow {
    border: 0.5em solid transparent;
    border-bottom-color: var(--kuc-tooltip-background-color, #000000);
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--top > .kuc-tooltip-1-23-1__group__title .kuc-tooltip-1-23-1__group__title__wrapper__arrow {
    border-top-color: var(--kuc-tooltip-background-color, #000000);
    border-right-color: transparent;
    border-bottom-color: transparent;
    margin: auto 0;
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--left > .kuc-tooltip-1-23-1__group__title .kuc-tooltip-1-23-1__group__title__wrapper__arrow {
    border-left-color: var(--kuc-tooltip-background-color, #000000);
    border-bottom-color: transparent;
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--right > .kuc-tooltip-1-23-1__group__title .kuc-tooltip-1-23-1__group__title__wrapper__arrow {
    border-right-color: var(--kuc-tooltip-background-color, #000000);
    border-bottom-color: transparent;
    width: fit-content;
    height: fit-content;
    margin: auto 0;
    top: 0;
    bottom: 0;
    right: 100%;
    left: auto;
  }
  .kuc-tooltip-1-23-1__group .kuc-tooltip-1-23-1__group__title__wrapper {
    display: flex;
    align-items: center;
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--top > .kuc-tooltip-1-23-1__group__title .kuc-tooltip-1-23-1__group__title__wrapper {
    flex-direction: column-reverse;
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--bottom > .kuc-tooltip-1-23-1__group__title .kuc-tooltip-1-23-1__group__title__wrapper {
    flex-direction: column;
  }
  .kuc-tooltip-1-23-1__group.kuc-tooltip-1-23-1__group--left > .kuc-tooltip-1-23-1__group__title .kuc-tooltip-1-23-1__group__title__wrapper {
    flex-direction: row-reverse;
  }
`;var Ne=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let qi;(()=>{if(qi=window.customElements.get("kuc-tooltip-1-23-1"),qi)return;class a extends k{constructor(e){super(),this.className="",this.id="",this.placement="top",this.title="",this.container="",this.describeChild=!1,this._container="",this._GUID=D();const i=S(e);Object.assign(this,i),this._globalEscapeBound=this._globalEscape.bind(this)}update(e){e.has("container")&&(this.container&&K(this.container)?this._container=Q(this.container):this._container=this.container),super.update(e)}render(){return _`
        <div
          class="kuc-tooltip-1-23-1__group kuc-tooltip-1-23-1__group--${this._getPlacement()}"
        >
          <div
            class="kuc-tooltip-1-23-1__group__container"
            @focusin="${this._handleFocusinContainer}"
            @focusout="${this._handleFocusoutContainer}"
            @mouseenter="${this._handleMouseEnterContainer}"
            @mouseleave="${this._handleMouseLeaveContainer}"
            @touchstart="${this._handleTouchStartContainer}"
          >
            ${this._container}
          </div>
          ${this._getTitleTemplate()}
        </div>
      `}updated(){this._initializeFirstChildElement(),this.describeChild?this._setChildTitleAttribute():this._setChildAriaLabelAttribute()}_handleMouseEnterContainer(){this._openTooltip()}_handleTouchStartContainer(){this._openTooltip()}_handleMouseLeaveContainer(e){const i=e.relatedTarget;this._titleWrapper&&this._titleWrapper.contains(i)||this._closeTooltip()}_initializeFirstChildElement(){if(typeof this._container!="string"){const e=this._groupContainerEL.firstElementChild;e&&!e.getAttribute("aria-describedby")&&(this._firstChildEl=e)}}_setChildTitleAttribute(){this._firstChildEl&&(this._firstChildEl.setAttribute("title",this.title),this._firstChildEl.removeAttribute("aria-label"))}_setChildAriaLabelAttribute(){this._firstChildEl&&(this._firstChildEl.setAttribute("aria-label",this.title),this._firstChildEl.removeAttribute("title"))}_getTitleTemplate(){return this.title?_`
        <div
          id="${this._GUID}-title"
          class="kuc-tooltip-1-23-1__group__title kuc-tooltip-1-23-1__group__title--hidden"
          role="tooltip"
          @mouseleave="${this._handleMouseLeaveTitle}"
        >
          <div class="kuc-tooltip-1-23-1__group__title__wrapper">
            <div class="kuc-tooltip-1-23-1__group__title__wrapper__arrow"></div>
            <div class="kuc-tooltip-1-23-1__group__title__wrapper__text">
              ${this.title}
            </div>
          </div>
        </div>
      `:_``}_handleMouseLeaveTitle(e){const i=e.relatedTarget;this._groupContainerEL.contains(i)||this._closeTooltip()}_handleFocusinContainer(){this._openTooltip()}_handleFocusoutContainer(){this._closeTooltip()}_openTooltip(){this._updateChildElementAttributes(!0),this._showTooltip(),this._attachGlobalListener()}_closeTooltip(){this._updateChildElementAttributes(!1),this._hideTooltip(),this._removeGlobalListener()}_updateChildElementAttributes(e){if(!(!this._firstChildEl||!this.describeChild)){if(e){this._firstChildEl.removeAttribute("title"),this._firstChildEl.setAttribute("aria-describedby",`${this._GUID}-title`);return}this._firstChildEl.removeAttribute("aria-describedby"),this._firstChildEl.setAttribute("title",this.title)}}_showTooltip(){this._tooltips.length!==0&&this._tooltips.forEach(e=>{e.id===`${this._GUID}-title`&&e.classList.remove("kuc-tooltip-1-23-1__group__title--hidden")})}_hideTooltip(){this._tooltips.length!==0&&this._tooltips.forEach(e=>{e.id===`${this._GUID}-title`&&e.classList.add("kuc-tooltip-1-23-1__group__title--hidden")})}_attachGlobalListener(){document.addEventListener("keydown",this._globalEscapeBound)}_removeGlobalListener(){document.removeEventListener("keydown",this._globalEscapeBound)}_globalEscape(e){(e.key==="Escape"||e.key==="Esc")&&this._closeTooltip()}_getPlacement(){return["top","bottom","left","right"].includes(this.placement)?this.placement:"top"}}Ne([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),Ne([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),Ne([l({type:String})],a.prototype,"placement",void 0),Ne([l({type:String})],a.prototype,"title",void 0),Ne([l()],a.prototype,"container",void 0),Ne([l({type:Boolean})],a.prototype,"describeChild",void 0),Ne([g(".kuc-tooltip-1-23-1__group__container")],a.prototype,"_groupContainerEL",void 0),Ne([g(".kuc-tooltip-1-23-1__group__title__wrapper")],a.prototype,"_titleWrapper",void 0),Ne([z(".kuc-tooltip-1-23-1__group__title")],a.prototype,"_tooltips",void 0),window.customElements.define("kuc-tooltip-1-23-1",a),x(Fs),qi=a})();const Gs=`
  kuc-user-org-group-select-1-23-1,
  kuc-user-org-group-select-1-23-1 *,
  kuc-user-org-group-select-1-23-1:lang(en),
  kuc-user-org-group-select-1-23-1:lang(en) * {
    font-family: sans-serif;
  }
  kuc-user-org-group-select-1-23-1:lang(es),
  kuc-user-org-group-select-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-user-org-group-select-1-23-1:lang(ja),
  kuc-user-org-group-select-1-23-1:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-user-org-group-select-1-23-1:lang(zh),
  kuc-user-org-group-select-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-user-org-group-select-1-23-1:lang(zh-TW),
  kuc-user-org-group-select-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黑體", "Microsoft JhengHei", "新宋体", NSimSun, STHeiti, Hei, "Heiti SC", sans-serif;
  }
  kuc-user-org-group-select-1-23-1 {
    display: inline-table;
    width: var(--kuc-user-org-group-select-toggle-width, 280px);
    position: relative;
    display: inline-table;
    font-size: 14px;
    color: #333333;
    vertical-align: top;
    line-height: 1.5;
  }
  kuc-user-org-group-select-1-23-1[hidden] {
    display: none;
  }
  .kuc-user-org-group-select-1-23-1__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    width: 100%;
    margin: 0px;
  }
  .kuc-user-org-group-select-1-23-1__group__label {
    padding: 4px 0px 8px 0px;
    display: inline-block;
    white-space: nowrap;
  }
  .kuc-user-org-group-select-1-23-1__group__label[hidden] {
    display: none;
  }
  .kuc-user-org-group-select-1-23-1__group__container {
    font-size: var(--kuc-user-org-group-select-font-size, 14px);
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0px;
    margin: 0px;
    align-items: start;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area {
    width: var(--kuc-user-org-group-select-toggle-width, 280px);
    position: relative;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__toggle {
    position: relative;
    display: flex;
    flex-direction: row;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__input {
    width: calc(var(--kuc-user-org-group-select-toggle-width, 280px) - 40px);
    height: var(--kuc-user-org-group-select-toggle-height, 40px);
    box-sizing: border-box;
    box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
    border: 1px solid #e3e7e8;
    border-right: 0;
    background-color: #ffffff;
    color: #000000;
    font-size: var(--kuc-user-org-group-select-font-size, 14px);
    line-height: 1.5;
    padding: 0 8px;
    margin: 0;
  }
  input[type=text].kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__input:focus {
    outline: none;
    border: 1px solid #3498db;
    box-shadow: none;
  }
  input[type=text].kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__input:disabled,
  .kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__icon__button:disabled {
    background-color: #d4d7d7;
    box-shadow: none;
    cursor: not-allowed;
    color: #888888;
  }

  .kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__icon__button {
    width: 40px;
    height: var(--kuc-user-org-group-select-toggle-height, 40px);
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    border: none;
    border-left: 1px solid #e3e7e8;
    background-color: transparent;
    cursor: pointer;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__icon__button__svg {
    border: 1px solid #e3e7e8;
    border-left: none;
    background-color: #eeeeee;
  }
  .kuc-user-org-group-select-1-23-1__group__container__picker {
    margin-left: 8px;
  }
  .kuc-user-org-group-select-1-23-1__group__container__picker__button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .kuc-user-org-group-select-1-23-1__group__container__picker__button:disabled {
    cursor: not-allowed;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu {
    width: 100%;
    padding: 0;
    border: none;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 2000;
    margin: 0;
    list-style: none;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu[hidden] {
    display: none;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item {
   border-bottom: 1px solid #e3e7e8;
   display: flex;
   background-color: #f7f9fa;
   flex-direction: row;
   cursor: pointer;
   box-sizing: border-box;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item--disabled,
  .kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item--disabled[aria-selected="true"] {
    background-color: #d4d7d7;
    cursor: not-allowed;
    color: #888888;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__highlight[role="option"] {
    background-color: #d8e1e6;
    flex-direction: row;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__icon {
    min-width: 48px;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-self: center;
    margin: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__icon--disabled {
    background-color: #d4d7d7;
    box-shadow: none;
    cursor: not-allowed;
    color: #888888;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__text {
    font-size: var(--kuc-user-org-group-select-font-size, 14px);
    line-height: normal;
    width: 100%;
    padding: 2px 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #3498db;
    align-content: center;
    white-space: nowrap;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #e3e7e8;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__content {
    display: flex;
    flex-direction: row;
    flex: 1;
    min-width: 0;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__remove-icon,
  .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__content__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0; 
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__remove-icon__button {
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    flex: 0;
    flex-shrink: 0;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__remove-icon__button:focus-within {
    border: 1px solid #3498db;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__remove-icon__button:focus {
    outline: none;
  }
 .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__content__text{
    padding: 2px 0 2px 8px;
    line-height: normal;
    align-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }
  .kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__content__text--disabled {
    background-color: #d4d7d7;
    color: #888888;
  }
`;var V=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Yi;(()=>{if(Yi=window.customElements.get("kuc-user-org-group-select-1-23-1"),Yi)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.icon="",this.id="",this.label="",this.placeholder="",this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this.value=[],this._selectedValues=[],this._searchText="",this._selectorVisible=!1,this._query="",this._matchingItems=[],this._DISABLED_ITEM_CLASS="kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item--disabled",this._DISABLED_ICON_CLASS="kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__icon--disabled",this._SMALL_ICON_SIZE=24,this._LARGE_ICON_SIZE=48,this._GUID=D();const i=S(e);this._handleClickDocument=this._handleClickDocument.bind(this),this._handleScrollMenu=this._handleScrollMenu.bind(this),Object.assign(this,i)}shouldUpdate(e){if(e.has("items")){if(!T(this.items))return this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1;const i=this.items.map(o=>o.value);if(!$i(i))return this.throwErrorAfterUpdateComplete(y.ITEMS.IS_DUPLICATED),!1}return e.has("value")&&!T(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_ARRAY),!1):!0}render(){const e=this._getIconType();return _`
        <div class="kuc-user-org-group-select-1-23-1__group">
          <div
            class="kuc-user-org-group-select-1-23-1__group__label"
            id="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-23-1>
          </div>
          <div class="kuc-user-org-group-select-1-23-1__group__container">
            <div
              class="kuc-user-org-group-select-1-23-1__group__container__select-area"
            >
              <div
                class="kuc-user-org-group-select-1-23-1__group__container__select-area__toggle"
              >
                <input
                  class="kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__input"
                  role="combobox"
                  type="text"
                  .value="${this._searchText}"
                  aria-haspopup="listbox"
                  aria-autocomplete="list"
                  aria-labelledby="${this._GUID}-label"
                  aria-controls="${this._GUID}-listbox"
                  aria-describedby="${this._GUID}-error"
                  aria-expanded="${this._selectorVisible}"
                  aria-required="${this.requiredIcon}"
                  placeholder="${this.placeholder}"
                  ?disabled="${this.disabled}"
                  @change="${this._handleChangeUserOrgGroupInput}"
                  @input="${this._handleInputUserOrgGroupInput}"
                  @keydown="${this._handleKeyDownUserOrgGroupInput}"
                  @click="${this._handleClickUserOrgGroupInput}"
                  @blur="${this._handleBlurUserOrgGroupInput}"
                />
                <div
                  class="kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__icon"
                >
                  <button
                    class="kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__icon__button"
                    tabindex="-1"
                    type="button"
                    aria-label="search"
                    aria-controls="${this._GUID}-listbox"
                    aria-expanded="${this._selectorVisible}"
                    ?disabled="${this.disabled}"
                    @mousedown="${this._handleMouseDownToggleButton}"
                    @click="${this._handleClickToggleButton}"
                  >
                    ${this._getSearchPickerSvgTemplate()}
                  </button>
                </div>
              </div>
              <ul
                class="kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu"
                role="listbox"
                id="${this._GUID}-listbox"
                aria-labelledby="${this._GUID}-label"
                aria-hidden="${!this._selectorVisible}"
                ?hidden="${!this._selectorVisible}"
                @mouseleave="${this._handleMouseLeaveMenu}"
                @mousedown="${this._handleMouseDownMenu}"
              >
                ${this._matchingItems.map((i,o)=>this._getMatchedItemTemplate(i,o))}
              </ul>
              <ul
                class="kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list"
              >
                ${this._selectedValues.map((i,o)=>this._getSelectedItemTemplate(i,o))}
              </ul>
            </div>
            <div
              class="kuc-user-org-group-select-1-23-1__group__container__picker"
              ?hidden="${!e}"
            >
              <button
                class="kuc-user-org-group-select-1-23-1__group__container__picker__button"
                tabindex="-1"
                type="button"
                ?disabled="${this.disabled}"
                @click="${this._handleClickIconButton}"
              >
                ${this._getPickerSVGTemplateByIcon(e)}
              </button>
            </div>
          </div>
          <kuc-base-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
            ariaLive="assertive"
          ></kuc-base-error-1-23-1>
        </div>
      `}_getIconType(){if(this.icon==="user"||this.icon==="org"||this.icon==="group")return this.icon}firstUpdated(){this._initializeSelectedValues(),window.addEventListener("resize",()=>{this._actionResizeScrollWindow()}),window.addEventListener("scroll",()=>{this._actionResizeScrollWindow()})}_actionResizeScrollWindow(){this._timeoutID||!this._selectorVisible||(this._timeoutID=window.setTimeout(()=>{this._timeoutID=null,this._setMenuPosition()},50))}async updated(e){super.updated(e),e.has("value")&&this._initializeSelectedValues(),await this.updateComplete,this._selectorVisible?(this._menuEl.addEventListener("scroll",this._handleScrollMenu),this._setMenuPosition(),this._scrollToView(),this._actionClearAllHighlightMenuItem(),setTimeout(()=>{document.addEventListener("click",this._handleClickDocument,!0)},1)):setTimeout(()=>{document.removeEventListener("click",this._handleClickDocument,!0)},1)}_initializeSelectedValues(){Array.isArray(this.value)&&(this._selectedValues=this.value.filter(e=>this.items.some(i=>i.value===e)))}_getMatchedItemTemplate(e,i){const o=e.label===void 0||e.label===null?e.value:e.label;let n=_`${o}`;const s=e.disabled,r=this._query.trim().toLowerCase();if(r&&o){const u=o.toLowerCase().indexOf(r),c=u+r.length;n=_`
          ${o.slice(0,u)}<b>${o.slice(u,c)}</b>${o.slice(c)}
        `}return _`
        <li
          class="kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item ${s?this._DISABLED_ITEM_CLASS:""}"
          role="option"
          value="${e.value!==void 0?e.value:""}"
          id="${this._GUID}-menuitem-${i}"
          @click="${s?null:this._handleClickUserOrgGroupItem}"
          @mouseover="${s?null:this._handleMouseOverUserOrgGroupItem}"
        >
          <div
            class="kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__icon ${s?this._DISABLED_ICON_CLASS:""}"
          >
            ${this._getSvgTemplateByType(e?e.type:"")}
          </div>
          <div
            class="kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__text"
          >
            ${n}
          </div>
        </li>
      `}_getSelectedItemTemplate(e,i){const o=this.items.filter(r=>r.value===e)[0];if(!o)return"";const n=o?.disabled,s=o.label===void 0||o.label===null?o.value:o.label;return _`
        <li
          class="kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item"
          value="${e}"
          id="${this._GUID}-selected-item-${i}"
        >
          <div
            class="kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__content"
          >
            <div
              class="kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__content__icon"
            >
              ${this._getSvgTemplateByType(o.type||"",this._SMALL_ICON_SIZE)}
            </div>
            <div
              class="kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__content__text ${n?"kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__content__text--disabled":""}"
            >
              ${s}
            </div>
          </div>
          <div
            class="kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__remove-icon"
            ?hidden="${this.disabled}"
          >
            <button
              class="kuc-user-org-group-select-1-23-1__group__container__select-area__selected-list__item__remove-icon__button"
              type="button"
              aria-label="remove"
              selected-item-index="${i}"
              @click="${this._handleClickRemoveSelectedItem}"
            >
              ${this._getRemoveSVGTemplate()}
            </button>
          </div>
        </li>
      `}_handleChangeUserOrgGroupInput(e){e.stopPropagation()}_handleInputUserOrgGroupInput(e){e.stopPropagation(),this._searchText=this._inputEl.value,this._query=this._inputEl.value,this._setMatchingItems()}_handleClickUserOrgGroupInput(e){e.stopPropagation(),this._inputEl.select(),this._setMatchingItems()}_handleBlurUserOrgGroupInput(e){const o=e.relatedTarget;o&&(this._toggleEl.contains(o)||this._menuEl&&this._menuEl.contains(o))||this._resetToggleInputValue()}_handleKeyDownUserOrgGroupInput(e){switch(e.key){case"Up":case"ArrowUp":{if(e.preventDefault(),!this._selectorVisible){this._actionShowMenu();break}this._actionHighlightPrevMenuItem();break}case"Tab":this._selectorVisible&&this._actionHideMenu();break;case"Down":case"ArrowDown":{if(e.preventDefault(),!this._selectorVisible){this._actionShowMenu();break}this._actionHighlightNextMenuItem();break}case"Enter":{e.preventDefault();const i=this._highlightItemEl;if(i===null)break;const o=i.getAttribute("value");this._actionUpdateValue(o),this._actionHideMenu();break}case"Escape":{e.preventDefault(),this._selectorVisible&&e.stopPropagation(),this._resetToggleInputValue(),this._actionHideMenu();break}case"Home":{this._selectorVisible&&(e.preventDefault(),this._actionHighlightFirstMenuItem());break}case"End":{this._selectorVisible&&(e.preventDefault(),this._actionHighlightLastMenuItem());break}}}_resetToggleInputValue(){this._searchText="",this._query=""}_actionHighlightPrevMenuItem(){let e=null;this._highlightItemEl!==null&&(e=this._highlightItemEl.previousElementSibling),e===null&&(e=this._lastItemEl);let i=!1;for(let o=0;o<this._matchingItems.length&&(i=e.classList.contains(this._DISABLED_ITEM_CLASS),i);o++)e=e.previousElementSibling,e===null&&(e=this._lastItemEl);!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionHighlightNextMenuItem(){let e=null;this._highlightItemEl!==null&&(e=this._highlightItemEl.nextElementSibling),e===null&&(e=this._firstItemEl);let i=!1;for(let o=0;o<this._matchingItems.length&&(i=e.classList.contains(this._DISABLED_ITEM_CLASS),i);o++)e=e.nextElementSibling,e===null&&(e=this._firstItemEl);!i&&this._setHighlightAndActiveDescendantMenu(e)}_setHighlightAndActiveDescendantMenu(e){this._actionHighlightMenuItem(e),this._actionSetActiveDescendant(e.id),this._scrollToView()}_actionSetActiveDescendant(e){e!==void 0&&this._inputEl!==null&&this._inputEl.setAttribute("aria-activedescendant",e)}_actionRemoveActiveDescendant(){this._inputEl.removeAttribute("aria-activedescendant")}_setMenuPosition(){this._setMenuPositionAboveOrBelow(),this._setMenuPositionLeftOrRight()}_handleClickRemoveSelectedItem(e){const i=e.currentTarget,o=parseInt(i.getAttribute("selected-item-index")||"-1",10),n=this._selectedValues.filter((u,c)=>c!==o),s=this.value;this._selectedValues=n,this.value=n;const r={oldValue:s,value:this.value};f(this,"change",r)}_handleClickToggleButton(e){e.preventDefault(),this._inputEl.focus();const i=this._inputEl.value.length;this._inputEl.setSelectionRange(i,i),this._setMatchingItems(),this._actionShowMenu()}_handleMouseDownToggleButton(e){e.preventDefault()}_handleClickIconButton(e){e.preventDefault();const i={value:this.value};f(this,"click-picker-icon",i)}_setMenuPositionAboveOrBelow(){this._menuEl.style.height="auto",this._menuEl.style.bottom="auto",this._menuEl.style.overflowY="scroll",this._menuEl.style.maxHeight="none";const e=this._menuEl.getBoundingClientRect().height;this._menuEl.style.maxHeight="var(--kuc-user-org-group-select-menu-max-height, none)";const i=this._menuEl.getBoundingClientRect().height,o=this._getDistanceToggleButton();if(o.toBottom>=i){e>i?this._previousScrollTop&&(this._menuEl.scrollTop=this._previousScrollTop):this._menuEl.style.overflowY="";return}if(o.toBottom<o.toTop){if(this._menuEl.style.bottom=`${this._selectAreaEl.offsetHeight}px`,o.toTop>=i){e>i?this._previousScrollTop&&(this._menuEl.scrollTop=this._previousScrollTop):this._menuEl.style.overflowY="";return}this._menuEl.style.height=`${o.toTop}px`}else this._menuEl.style.height=`${o.toBottom}px`;this._previousScrollTop&&(this._menuEl.scrollTop=this._previousScrollTop)}_setMenuPositionLeftOrRight(){this._menuEl.style.right="auto";const e=this._menuEl.getBoundingClientRect().width,i=this._getDistanceToggleButton();if(i.toRight>=e||i.toLeft<e||i.toRight<0)return;const o=this._toggleEl.offsetWidth-i.toRight;this._menuEl.style.right=o>0?`${o}px`:"0px"}_getDistanceToggleButton(){const{scrollbarWidth:e,scrollbarHeight:i}=this._getScrollbarWidthHeight(),o=document.body.scrollHeight>window.innerHeight,n=document.body.scrollWidth>window.innerWidth,s=this._toggleEl.getBoundingClientRect().top,r=window.innerHeight-this._toggleEl.getBoundingClientRect().bottom-(n?i:0),u=this._toggleEl.getBoundingClientRect().left,c=window.innerWidth-this._toggleEl.getBoundingClientRect().left-(o?e:0);return{toTop:s,toBottom:r,toLeft:u,toRight:c}}_getScrollbarWidthHeight(){const e=document.createElement("div");e.style.cssText="overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e);const i=e.offsetWidth-e.clientWidth,o=e.offsetHeight-e.clientHeight;return document.body.removeChild(e),{scrollbarWidth:i,scrollbarHeight:o}}_scrollToView(){if(!this._highlightItemEl||!this._menuEl)return;const e=this._menuEl.getBoundingClientRect(),i=this._highlightItemEl.getBoundingClientRect();i.top<e.top&&(this._menuEl.scrollTop-=e.top-i.top),e.bottom<i.bottom&&(this._menuEl.scrollTop+=i.bottom-e.bottom)}_actionHighlightFirstMenuItem(){let e=this._firstItemEl,i=!1;for(let o=0;o<this._matchingItems.length&&(i=e.classList.contains(this._DISABLED_ITEM_CLASS),i);o++)e=e.nextElementSibling;!i&&this._setHighlightAndActiveDescendantMenu(e)}_actionHighlightLastMenuItem(){let e=this._lastItemEl,i=!1;for(let o=0;o<this._matchingItems.length&&(i=e.classList.contains(this._DISABLED_ITEM_CLASS),i);o++)e=e.previousElementSibling;!i&&this._setHighlightAndActiveDescendantMenu(e)}_setMatchingItems(){const e=this.items.filter(i=>{const o=s=>s.replace(/[.*+?^=!:${}()|[\]/\\]/g,"\\$&"),n=new RegExp(o(this._query.trim()),"gi");return i.label?n.test(i.label):i.value?n.test(i.value):!1});e.length===0?(this._matchingItems=[],this._actionHideMenu()):(this._matchingItems=e,this._actionShowMenu())}_actionShowMenu(){this._query.trim()===""&&(this._matchingItems=this.items),!(this.items.length===0||this._matchingItems.length===0)&&(this._inputEl.focus(),this._selectorVisible=!0)}_handleMouseOverUserOrgGroupItem(e){const i=this._getItemElementWhenMouseOverDown(e.target);this._actionHighlightMenuItem(i)}_actionHighlightMenuItem(e){this._actionClearAllHighlightMenuItem(),e.setAttribute("aria-selected","true"),e.classList.add("kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__highlight")}_handleClickUserOrgGroupItem(e){const o=this._getItemElementWhenMouseOverDown(e.target).getAttribute("value");this._actionUpdateValue(o)}_actionUpdateValue(e){if(this._selectedValues.includes(e)){this._resetToggleInputValue();return}const i=this.value,o=[...this._selectedValues,e];this._selectedValues=o,this.value=o;const n={oldValue:i,value:this.value};this._query="",f(this,"change",n),this._resetToggleInputValue()}_getItemElementWhenMouseOverDown(e){return e.classList.value.split(" ").includes("kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item")?e:this._getItemElementWhenMouseOverDown(e.parentElement)}_handleMouseLeaveMenu(){this._actionClearAllHighlightMenuItem()}_actionClearAllHighlightMenuItem(){this._itemsEl.forEach(e=>{e.setAttribute("aria-selected","false"),e.classList.remove("kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__highlight")}),this._actionRemoveActiveDescendant()}_handleMouseDownMenu(e){e.preventDefault()}_handleClickDocument(e){e.target===this._toggleEl||this._toggleEl.contains(e.target)||Array.from(this._disabledItemsEl).some(i=>i===e.target||i.contains(e.target))||this._actionHideMenu()}_handleScrollMenu(){this._previousScrollTop=this._menuEl.scrollTop}_actionHideMenu(){this._selectorVisible=!1,this._actionRemoveActiveDescendant()}_getPickerSVGTemplateByIcon(e){if(!e)return"";switch(e){case"user":return this._getUserPickerSvgTemplate();case"org":return this._getOrgPickerSvgTemplate();case"group":return this._getGroupPickerSvgTemplate();default:return""}}_getSvgTemplateByType(e,i=this._LARGE_ICON_SIZE){if(!e)return"";switch(e){case"user":return this._getUserSvgTemplate(i);case"org":return this._getOrgSvgTemplate(i);case"group":return this._getGroupSvgTemplate(i);default:return""}}_getUserPickerSvgTemplate(){return C`
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_11108_7820)">
            <path d="M40 0H0V40H40V0Z" fill="#3498db"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.7952 29.5014C30.6103 29.1232 29.0893 28.2243 26.4523 27.2194C26.3083 27.1766 26.1685 27.121 26.0346 27.0532C24.9881 26.7068 23.9606 26.3054 22.9564 25.8507L22.8145 25.7719C22.1496 25.3286 22.0013 24.4536 22.0017 22.7937C22.0235 22.0583 22.2846 21.3509 22.7443 20.7784C23.1224 20.1551 23.3587 19.4542 23.4442 18.6661C23.5273 18.1843 23.7029 17.7231 23.923 17.3756C24.1192 16.9983 24.2545 16.5924 24.3239 16.1729L24.3601 16.0255C24.4067 15.883 24.4067 15.7294 24.3636 15.5974C24.2774 15.3437 24.2123 15.0833 24.1689 14.8188L24.1456 14.6767L24.1635 14.5338C24.2604 13.7586 24.3379 13.1224 24.4059 12.5811C24.4211 11.6974 24.0911 10.8425 23.4802 10.1922C22.6022 9.24161 21.3353 8.74834 20.0457 8.85492L19.8783 8.85466C18.5907 8.74424 17.3242 9.23383 16.4373 10.1905C15.8303 10.8294 15.5009 11.6826 15.5145 12.4708C15.5459 12.7398 15.576 13.0061 15.634 13.5218C15.6816 13.9435 15.7157 14.2344 15.7516 14.5219L15.7676 14.6495L15.7506 14.7771C15.7126 15.063 15.6424 15.3438 15.5603 15.5586C15.5129 15.7122 15.5129 15.8764 15.5603 16.03L15.5883 16.1448C15.6658 16.5693 15.8109 16.9785 16.0232 17.367C16.2479 17.789 16.3905 18.2498 16.4437 18.7267C16.5233 19.4513 16.7617 20.1491 17.1417 20.7705C17.6108 21.3382 17.8822 22.0458 17.9138 22.8232V23.1366C17.9893 23.859 17.8735 24.5889 17.5774 25.253L17.4666 25.5013L17.2451 25.6591C16.6349 26.0939 15.9497 26.4124 15.3008 26.5755L13.5299 27.1849C10.7007 28.2494 9.16333 29.179 9.1108 29.4241C9.05833 29.8816 9.02367 30.3408 9.00687 30.8007H30.8764L30.7952 29.5014ZM26.7379 25.1844L26.9153 25.2625C26.9487 25.2812 26.984 25.2961 27.0908 25.3307C30.6256 26.674 32.4548 27.7827 32.7559 29.1001L32.779 29.2601L33 32.7957H7.02157L7.00338 31.8168C6.98712 30.9416 7.02899 30.0664 7.14161 29.1148C7.4095 27.7754 9.24475 26.6656 12.8538 25.3081L14.7282 24.6661C15.1234 24.5647 15.5007 24.405 15.8479 24.1926C15.9346 23.9083 15.9615 23.6082 15.9259 23.3111L15.9187 23.1922L15.9196 22.8648C15.9065 22.551 15.787 22.251 15.5807 22.0142L15.4891 21.8909C14.9273 20.9994 14.5756 19.9919 14.4608 18.9462C14.4357 18.7217 14.3683 18.5039 14.2675 18.3144C13.967 17.765 13.754 17.1722 13.6359 16.5575C13.4886 16.0383 13.4952 15.4851 13.6727 14.9152C13.7077 14.8215 13.735 14.7251 13.7544 14.6271C13.7234 14.3744 13.6923 14.1065 13.6515 13.7459C13.5934 13.229 13.5638 12.9668 13.5264 12.6091C13.4943 11.2011 14.0208 9.83752 14.9825 8.82527C16.2601 7.44706 18.0936 6.7253 19.965 6.86029C21.8377 6.73098 23.6699 7.4573 24.94 8.83235C25.9008 9.85515 26.4248 11.2124 26.3941 12.7139C26.3238 13.3167 26.2511 13.9157 26.1624 14.6273C26.1861 14.739 26.217 14.8509 26.2561 14.9661C26.4263 15.4861 26.4344 16.0449 26.2802 16.5686C26.1732 17.1707 25.9739 17.7555 25.6547 18.3632C25.5325 18.5594 25.4495 18.7773 25.4192 18.9406C25.3084 19.9869 24.9615 20.9944 24.4046 21.887L24.321 22.002C24.1197 22.2407 24.0052 22.5405 23.9964 22.8232C23.9964 23.3728 24.0234 23.8066 24.0731 24.0998C24.953 24.5507 25.838 24.8892 26.7379 25.1844Z" fill="white"/>
          </g>
          <defs>
            <clipPath">
              <rect width="40" height="40" fill="white"/>
            </clipPath>
          </defs>
        </svg>`}_getOrgPickerSvgTemplate(){return C`
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="39" height="39" fill="#3498db"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15 7V14H25V7H15ZM13 5H27V16H21V19H27V21V23H36V34H22V23H25V21H15V23H18V34H4V23H13V21V19H19V16H13V5ZM6 25V32H16V25H6ZM24 32V25H34V32H24Z" fill="white"/>
        </svg>`}_getGroupPickerSvgTemplate(){return C`
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="39" height="39" fill="#3498db"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6551 24.1065C12.3317 23.9525 12.0125 23.7844 11.698 23.6024L11.6295 23.5538C11.3087 23.2805 11.2372 22.741 11.2374 21.7176C11.2479 21.2643 11.3739 20.8281 11.5956 20.4752C11.778 20.0909 11.892 19.6587 11.9333 19.1728C11.9734 18.8758 12.0581 18.5915 12.1643 18.3772C12.2589 18.1446 12.3242 17.8943 12.3577 17.6357L12.3751 17.5448C12.3976 17.457 12.3976 17.3623 12.3768 17.2809C12.3352 17.1245 12.3038 16.9639 12.2829 16.8009L12.2717 16.7132L12.2803 16.6251C12.3034 16.3892 12.3242 16.1742 12.3433 15.9768C12.3628 15.7742 12.3806 15.5902 12.3973 15.4212C12.4046 14.8764 12.2454 14.3493 11.9507 13.9484C11.5271 13.3623 10.9159 13.0582 10.2937 13.1239L10.213 13.1237C9.59178 13.0557 8.98076 13.3575 8.55289 13.9473C8.26007 14.3412 8.10115 14.8673 8.10773 15.3532C8.12287 15.5191 8.13739 15.6833 8.16535 16.0012C8.18835 16.2612 8.20477 16.4405 8.22211 16.6178L8.2298 16.6965L8.22163 16.7751C8.20329 16.9514 8.16943 17.1245 8.1298 17.2569C8.10695 17.3516 8.10695 17.4529 8.1298 17.5476L8.14334 17.6184C8.18073 17.8801 8.25069 18.1324 8.35314 18.3719C8.46153 18.6321 8.53033 18.9162 8.55601 19.2102C8.5944 19.6569 8.70942 20.0871 8.89274 20.4703C9.11905 20.8203 9.24997 21.2565 9.26522 21.7358V21.929C9.30165 22.3744 9.24576 22.8245 9.10291 23.2339L9.04949 23.387L8.94263 23.4843C8.64824 23.7523 8.31767 23.9487 8.00464 24.0493L7.15028 24.425C5.78535 25.0813 5.04368 25.6544 5.01834 25.8055C4.99303 26.0876 4.97631 26.3707 4.9682 26.6542H8.03855C7.71232 27.0377 7.44846 27.4499 7.2567 27.8843H4.01041L4.00163 27.2807C3.99378 26.7411 4.01399 26.2015 4.06832 25.6149C4.19756 24.789 5.08295 24.1048 6.82411 23.2679L7.72834 22.8721C7.91901 22.8096 8.10105 22.7111 8.26854 22.5802C8.31037 22.4049 8.32337 22.2198 8.30616 22.0367L8.30272 21.9633L8.30314 21.7615C8.29682 21.568 8.23916 21.3831 8.13966 21.2371L8.09543 21.1611C7.82441 20.6114 7.65474 19.9902 7.59936 19.3456C7.58726 19.2071 7.55474 19.0729 7.5061 18.956C7.36114 18.6173 7.25836 18.2518 7.2014 17.8728C7.13032 17.5527 7.13353 17.2117 7.21915 16.8603C7.23605 16.8025 7.24922 16.7431 7.25854 16.6827C7.24361 16.5269 7.22861 16.3617 7.20894 16.1394L7.20467 16.0909C7.17941 15.8037 7.16568 15.6476 7.14859 15.4385C7.1331 14.5704 7.38708 13.7297 7.85104 13.1057C8.4674 12.2559 9.35196 11.811 10.2548 11.8942C11.1582 11.8144 12.0422 12.2623 12.6549 13.11C13.1184 13.7406 13.3712 14.5774 13.3564 15.5031C13.3225 15.8748 13.2874 16.2441 13.2446 16.6828C13.2561 16.7517 13.271 16.8206 13.2898 16.8917C13.372 17.2123 13.3758 17.5568 13.3015 17.8797C13.2498 18.2509 13.1537 18.6115 12.9997 18.9861C12.9408 19.1071 12.9007 19.2414 12.8861 19.3421C12.8326 19.9872 12.6653 20.6083 12.3966 21.1587L12.3563 21.2296C12.2592 21.3768 12.2039 21.5616 12.1997 21.7358C12.1997 22.0747 12.2127 22.3422 12.2367 22.5229C12.6612 22.8009 13.0881 23.0096 13.5223 23.1916L13.6079 23.2398C13.624 23.2513 13.641 23.2605 13.6925 23.2818C14.0991 23.4793 14.4589 23.6685 14.773 23.8532C14.0381 23.873 13.328 23.9604 12.6551 24.1065Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M27.3449 24.1065C27.6683 23.9525 27.9875 23.7844 28.302 23.6024L28.3705 23.5538C28.6913 23.2805 28.7628 22.741 28.7626 21.7176C28.7521 21.2643 28.6261 20.8281 28.4044 20.4752C28.222 20.0909 28.108 19.6587 28.0667 19.1728C28.0266 18.8758 27.9419 18.5915 27.8357 18.3772C27.7411 18.1446 27.6758 17.8943 27.6423 17.6357L27.6249 17.5448C27.6024 17.457 27.6024 17.3623 27.6232 17.2809C27.6648 17.1245 27.6962 16.9639 27.7171 16.8009L27.7283 16.7132L27.7197 16.6251C27.6966 16.3892 27.6758 16.1742 27.6567 15.9768C27.6372 15.7742 27.6194 15.5902 27.6027 15.4212C27.5954 14.8764 27.7546 14.3493 28.0493 13.9484C28.4729 13.3623 29.0841 13.0582 29.7063 13.1239L29.787 13.1237C30.4082 13.0557 31.0192 13.3575 31.4471 13.9473C31.7399 14.3412 31.8989 14.8673 31.8923 15.3532C31.8771 15.5191 31.8626 15.6833 31.8346 16.0012C31.8117 16.2612 31.7952 16.4405 31.7779 16.6178L31.7702 16.6965L31.7784 16.7751C31.7967 16.9514 31.8306 17.1245 31.8702 17.2569C31.8931 17.3516 31.8931 17.4529 31.8702 17.5476L31.8567 17.6184C31.8193 17.8801 31.7493 18.1324 31.6469 18.3719C31.5385 18.6321 31.4697 18.9162 31.444 19.2102C31.4056 19.6569 31.2906 20.0871 31.1073 20.4703C30.8809 20.8203 30.75 21.2565 30.7348 21.7358V21.9291C30.6983 22.3744 30.7542 22.8245 30.8971 23.2339L30.9505 23.387L31.0574 23.4843C31.3518 23.7523 31.6823 23.9487 31.9954 24.0493L32.8497 24.425C34.2146 25.0813 34.9563 25.6544 34.9817 25.8055C35.007 26.0876 35.0237 26.3707 35.0318 26.6542H31.9614C32.2877 27.0377 32.5515 27.4499 32.7433 27.8843H35.9896L35.9984 27.2807C36.0062 26.7411 35.986 26.2015 35.9317 25.6149C35.8024 24.789 34.9171 24.1048 33.1759 23.2679L32.2717 22.8721C32.081 22.8096 31.8989 22.7111 31.7315 22.5802C31.6896 22.4049 31.6766 22.2198 31.6938 22.0367L31.6973 21.9633L31.6969 21.7615C31.7032 21.568 31.7608 21.3831 31.8603 21.2371L31.9046 21.1611C32.1756 20.6114 32.3453 19.9902 32.4006 19.3456C32.4127 19.2071 32.4453 19.0729 32.4939 18.956C32.6389 18.6173 32.7416 18.2518 32.7986 17.8728C32.8697 17.5527 32.8665 17.2117 32.7809 16.8603C32.7639 16.8025 32.7508 16.7431 32.7415 16.6827C32.7564 16.5269 32.7714 16.3617 32.7911 16.1394L32.7953 16.0911C32.8206 15.8038 32.8343 15.6476 32.8514 15.4385C32.8669 14.5704 32.6129 13.7297 32.149 13.1057C31.5326 12.2559 30.648 11.811 29.7452 11.8942C28.8418 11.8144 27.9578 12.2623 27.3451 13.11C26.8816 13.7406 26.6288 14.5774 26.6436 15.5031C26.6775 15.8748 26.7126 16.2441 26.7554 16.6828C26.7439 16.7517 26.729 16.8206 26.7102 16.8917C26.628 17.2123 26.6242 17.5568 26.6985 17.8797C26.7502 18.2509 26.8463 18.6115 27.0003 18.9861C27.0592 19.1071 27.0993 19.2414 27.1139 19.3421C27.1674 19.9872 27.3347 20.6083 27.6034 21.1587L27.6437 21.2296C27.7408 21.3768 27.7961 21.5616 27.8003 21.7358C27.8003 22.0747 27.7873 22.3422 27.7633 22.5229C27.3388 22.8009 26.9119 23.0096 26.4777 23.1916L26.3921 23.2398C26.376 23.2513 26.359 23.2605 26.3075 23.2818C25.9009 23.4793 25.5411 23.6685 25.227 23.8532C25.9619 23.873 26.672 23.9604 27.3449 24.1065Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8186 29.5726C30.6403 29.1791 29.1727 28.2439 26.6283 27.1984C26.4894 27.1538 26.3545 27.096 26.2253 27.0255C25.2156 26.665 24.2242 26.2474 23.2552 25.7743L23.1183 25.6924C22.4767 25.2312 22.3337 24.3208 22.3341 22.5938C22.3551 21.8288 22.6071 21.0928 23.0506 20.4972C23.4154 19.8487 23.6434 19.1194 23.7259 18.2995C23.8061 17.7982 23.9756 17.3184 24.1879 16.9569C24.3772 16.5643 24.5077 16.142 24.5748 15.7056L24.6096 15.5522C24.6546 15.404 24.6546 15.2441 24.613 15.1068C24.5298 14.8429 24.467 14.5719 24.4252 14.2968L24.4027 14.1489L24.4199 14.0002C24.5134 13.1937 24.5882 12.5318 24.6538 11.9686C24.6685 11.0492 24.3501 10.1598 23.7607 9.4832C22.9135 8.49423 21.6911 7.98104 20.4468 8.09191L20.2853 8.09164C19.0429 7.97677 17.8209 8.48614 16.9651 9.48141C16.3795 10.1462 16.0616 11.0338 16.0748 11.8539C16.1051 12.1338 16.1341 12.4109 16.19 12.9474C16.236 13.3861 16.2689 13.6887 16.3036 13.9879L16.3189 14.1207L16.3026 14.2533C16.2659 14.5508 16.1982 14.8429 16.1189 15.0664C16.0732 15.2262 16.0732 15.3971 16.1189 15.5569L16.146 15.6764C16.2208 16.1179 16.3607 16.5437 16.5656 16.9479C16.7824 17.3869 16.92 17.8663 16.9714 18.3625C17.0481 19.1164 17.2782 19.8424 17.6448 20.4889C18.0975 21.0795 18.3593 21.8157 18.3898 22.6245V22.9506C18.4626 23.7022 18.3509 24.4616 18.0652 25.1525L17.9583 25.4109L17.7446 25.5751C17.1558 26.0274 16.4947 26.3587 15.8686 26.5284L14.1599 27.1625C11.43 28.27 9.94671 29.2372 9.89602 29.4921C9.8454 29.9681 9.81195 30.4459 9.79575 30.9243H30.897L30.8186 29.5726ZM26.9039 25.0812L27.0751 25.1624C27.1073 25.1818 27.1413 25.1974 27.2444 25.2334C30.6551 26.6309 32.42 27.7844 32.7105 29.155L32.7328 29.3215L32.946 33H7.88019L7.86263 31.9814C7.84694 31.071 7.88735 30.1603 7.99601 29.1703C8.25449 27.7768 10.0253 26.6222 13.5076 25.2099L15.3161 24.5419C15.6974 24.4364 16.0615 24.2702 16.3964 24.0493C16.4801 23.7535 16.5061 23.4412 16.4717 23.1322L16.4648 23.0084L16.4657 22.6678C16.453 22.3413 16.3377 22.0292 16.1387 21.7828L16.0502 21.6546C15.5082 20.7271 15.1689 19.6788 15.0581 18.5909C15.0339 18.3573 14.9689 18.1307 14.8716 17.9335C14.5817 17.3619 14.3761 16.7453 14.2622 16.1057C14.12 15.5655 14.1264 14.99 14.2977 14.3971C14.3315 14.2996 14.3578 14.1993 14.3765 14.0973C14.3466 13.8344 14.3166 13.5557 14.2773 13.1805C14.2212 12.6427 14.1926 12.37 14.1566 11.9978C14.1256 10.5328 14.6335 9.11422 15.5614 8.06107C16.7942 6.62717 18.5633 5.87626 20.369 6.0167C22.1758 5.88217 23.9437 6.63783 25.1692 8.06843C26.0962 9.13255 26.6019 10.5446 26.5722 12.1068C26.5043 12.734 26.4342 13.3572 26.3486 14.0975C26.3715 14.2138 26.4013 14.3301 26.439 14.45C26.6033 14.991 26.6111 15.5724 26.4623 16.1172C26.3591 16.7437 26.1668 17.3521 25.8588 17.9844C25.7409 18.1884 25.6608 18.4152 25.6315 18.5851C25.5247 19.6736 25.1899 20.7218 24.6526 21.6506L24.5719 21.7702C24.3777 22.0186 24.2672 22.3305 24.2587 22.6245C24.2587 23.1963 24.2848 23.6477 24.3327 23.9527C25.1817 24.4218 26.0357 24.774 26.9039 25.0812Z" fill="white"/>
        </svg>`}_getSearchPickerSvgTemplate(){return C`
        <svg width="38" height="38" viewBox="-8 -8 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__icon__button__svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1034 16.5176C11.5697 19.3478 6.3971 19.125 3.12139 15.8493C-0.393328 12.3346 -0.393328 6.63611 3.12139 3.12139C6.63611 -0.393328 12.3346 -0.393328 15.8493 3.12139C18.878 6.15005 19.2968 10.8002 17.1058 14.2774L23.6275 20.7991L21.5062 22.9204L15.1034 16.5176ZM13.728 5.24271C16.0711 7.58586 16.0711 11.3848 13.728 13.728C11.3848 16.0711 7.58586 16.0711 5.24271 13.728C2.89957 11.3848 2.89957 7.58586 5.24271 5.24271C7.58586 2.89957 11.3848 2.89957 13.728 5.24271Z" fill="#888888"/>
        </svg>`}_getRemoveSVGTemplate(){return C`
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_11108_7852)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8999 5.96056L0.930232 1.99089L0.399902 1.46056L1.46056 0.399902L1.99089 0.930232L5.96056 4.8999L9.93023 0.930232L10.4606 0.399902L11.5212 1.46056L10.9909 1.99089L7.02122 5.96056L10.9909 9.93023L11.5212 10.4606L10.4606 11.5212L9.93023 10.9909L5.96056 7.02122L1.99089 10.9909L1.46056 11.5212L0.399902 10.4606L0.930233 9.93023L4.8999 5.96056Z" fill="#3498db"/>
        </g>
        <defs>
          <clipPath>
            <rect width="12" height="12" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      `}_getUserSvgTemplate(e){return C`
        <svg width="${e}" height="${e}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_11108_7825)">
            <path d="M32.5866 -0.521484H-0.586548V32.6516H32.5866V-0.521484Z" fill="#717272"/>
            <path d="M15.9413 5.64404C18.4049 5.64404 20.6468 8.02938 20.6077 11.4053C20.5686 14.7552 19.2 15.407 18.4309 16.8278C18.1442 17.3622 18.066 19.0306 18.6134 19.3565C21.1291 20.8815 23.5926 22.0416 25.6912 23.2669C26.6167 23.8143 26.747 24.9483 26.747 25.7174C25.0525 25.7174 20.4774 25.7174 15.9413 25.7174C11.4053 25.7174 6.83012 25.7174 5.13562 25.7174C5.13562 24.9483 5.26597 23.8143 6.19142 23.2669C8.29 22.0416 10.7535 20.8815 13.2692 19.3565C13.8167 19.0306 13.7385 17.3622 13.4517 16.8278C12.6827 15.407 11.314 14.7422 11.2749 11.4053C11.2358 8.02938 13.4778 5.64404 15.9413 5.64404Z" fill="white"/>
          </g>
          <defs>
            <clipPath>
              <rect width="32" height="31.9348" fill="white"/>
            </clipPath>
          </defs>
        </svg>`}_getOrgSvgTemplate(e){return C`
        <svg width="${e}" height="${e}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_11108_7858)">
            <path d="M32 0H0V32H32V0Z" fill="#4f91c5"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3335 5.3335H10.0002V14.0002H21.3335V5.3335ZM20.0002 6.66683H18.0002V8.66683H20.0002V6.66683ZM16.6668 19.3335H26.6668V27.3335H16.6668V19.3335ZM15.3335 19.3335H5.3335V27.3335H15.3335V19.3335ZM24.0002 21.3335H25.3335V22.6668H24.0002V21.3335ZM14.0002 21.3335H12.6668V22.6668H14.0002V21.3335Z" fill="#eff3f4"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6668 14H15.3335V16H9.3335V17.3333V19.3333H10.6668V17.3333H20.6668V19.3333H22.0002V17.3333V16H16.6668V14Z" fill="#a6b2b3"/>
          </g>
          <defs>
            <clipPath>
              <rect width="32" height="32" fill="white"/>
            </clipPath>
          </defs>
        </svg>`}_getGroupSvgTemplate(e){return C`
        <svg width="${e}" height="${e}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_11108_7756)">
            <path d="M32 0H0V31.9032H32V0Z" fill="#86bac0"/>
            <path d="M32.0005 15.6099L20.1262 3.72021L3.74902 20.0193L15.749 31.9033H32.0005V15.6099Z" fill="#6c969b"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1141 0.0854492C24.9541 0.0854492 31.9998 7.22949 31.9998 16.0427C31.9998 24.856 24.9541 32 16.1141 32C7.27412 32 0.108398 24.856 0.108398 16.0427C0.108398 7.22949 7.27412 0.0854492 16.1141 0.0854492Z" fill="#86bac0"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.983 16.6751C31.6459 24.8845 25.2059 31.5329 17.0001 31.983L6.85156 21.8651L25.1487 9.78174L31.9887 16.601L31.983 16.6751Z" fill="#6c969b"/>
            <path d="M25.1487 9.78174H6.85156V21.8651H25.1487V9.78174Z" fill="#e5e5e4"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85156 21.8653L16.0001 13.8154L25.1487 21.8653H6.85156Z" fill="#cccccc"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85156 21.8653L16.0001 14.3794L25.1487 21.8653H6.85156Z" fill="#e5e5e4"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85156 9.78174L16.0001 17.8202L25.1487 9.78174H6.85156Z" fill="#cccccc"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85156 9.78174L16.0001 17.2676L25.1487 9.78174H6.85156Z" fill="white"/>
            <path d="M32 0H0V31.9032H32V0Z" fill="#9cc076"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.3942 24.6003H16.2011C16.192 24.1094 16.2156 23.6184 16.2717 23.1307C16.3705 22.6384 17.3704 22.0361 19.2712 21.3235L20.337 20.9579C20.6968 20.8659 21.0366 20.7085 21.3392 20.4938C21.4763 20.1873 21.5275 19.8495 21.4874 19.5164V19.2984C21.474 18.9793 21.352 18.6743 21.1415 18.4335C20.8563 17.9824 20.6777 17.4727 20.6193 16.9427C20.5961 16.7361 20.5339 16.5356 20.4358 16.3521C20.2827 16.0732 20.1755 15.7717 20.1182 15.459C20.0551 15.2552 20.0551 15.0371 20.1182 14.8332C20.1625 14.7152 20.1933 14.5925 20.2099 14.4676C20.1605 14.0738 20.1182 13.673 20.0688 13.2511C20.0533 12.5749 20.307 11.9202 20.7745 11.4298C21.4194 10.7368 22.3491 10.3787 23.2941 10.4595C24.2402 10.3816 25.1696 10.7421 25.8137 11.4369C26.278 11.9293 26.5312 12.5826 26.5195 13.2581C26.4701 13.68 26.4207 14.0808 26.3713 14.4746C26.3917 14.5988 26.4224 14.7211 26.4631 14.8402C26.5299 15.0435 26.5299 15.2628 26.4631 15.4661C26.4117 15.7751 26.3117 16.0741 26.1666 16.3521C26.0537 16.5326 25.9771 16.7332 25.9408 16.9427C25.8845 17.4721 25.7084 17.9818 25.4256 18.4335C25.2202 18.6762 25.1033 18.981 25.0939 19.2984C25.0939 20.0015 25.1644 20.4516 25.3127 20.55C25.9041 20.8168 26.5096 21.0516 27.1265 21.2532C27.1846 21.2857 27.2461 21.3116 27.31 21.3305C29.192 22.0431 30.1895 22.6455 30.3025 23.1377L30.3942 24.6003Z" fill="#d4d7d8"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0016 24.6003H1.80856C1.79941 24.1094 1.82298 23.6184 1.87914 23.1307C1.97795 22.6384 2.97779 22.0361 4.87867 21.3235L5.94438 20.9579C6.30425 20.8659 6.644 20.7085 6.94658 20.4938C7.08374 20.1873 7.13496 19.8495 7.09479 19.5164V19.2984C7.08142 18.9793 6.95946 18.6743 6.74896 18.4335C6.46369 17.9824 6.28509 17.4727 6.22669 16.9427C6.20354 16.7361 6.14127 16.5356 6.04319 16.3521C5.89012 16.0732 5.78289 15.7717 5.7256 15.459C5.66249 15.2552 5.66249 15.0371 5.7256 14.8332C5.7699 14.7152 5.80068 14.5925 5.81735 14.4676C5.76794 14.0738 5.7256 13.673 5.67619 13.2511C5.66071 12.5749 5.91445 11.9202 6.38196 11.4298C7.02682 10.7368 7.95648 10.3787 8.90157 10.4595C9.84766 10.3816 10.777 10.7421 11.4212 11.4369C11.8854 11.9293 12.1386 12.5826 12.1269 13.2581C12.0775 13.68 12.0281 14.0808 11.9787 14.4746C11.9992 14.5988 12.0298 14.7211 12.0705 14.8402C12.1373 15.0435 12.1373 15.2628 12.0705 15.4661C12.0191 15.7751 11.9191 16.0741 11.7741 16.3521C11.6612 16.5326 11.5845 16.7332 11.5482 16.9427C11.492 17.4721 11.3158 17.9818 11.033 18.4335C10.8276 18.6762 10.7107 18.981 10.7013 19.2984C10.7013 20.0015 10.7719 20.4516 10.9201 20.55C11.5115 20.8168 12.117 21.0516 12.7339 21.2532C12.792 21.2857 12.8535 21.3116 12.9174 21.3305C14.7995 22.0431 15.797 22.6455 15.9099 23.1377L16.0016 24.6003Z" fill="#d4d7d8"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6766 24.6002H7.3295C7.31831 24.0002 7.34712 23.4001 7.41576 22.804C7.53652 22.2024 8.75855 21.4661 11.0818 20.5952L12.3844 20.1483C12.8242 20.0359 13.2395 19.8436 13.6093 19.5811C13.7769 19.2065 13.8395 18.7937 13.7904 18.3865V18.12C13.7741 17.7301 13.625 17.3573 13.3678 17.0629C13.0191 16.5117 12.8008 15.8886 12.7294 15.2409C12.7011 14.9883 12.625 14.7434 12.5052 14.519C12.3181 14.1782 12.187 13.8097 12.117 13.4275C12.0399 13.1784 12.0399 12.9118 12.117 12.6626C12.1711 12.5183 12.2088 12.3684 12.2291 12.2157C12.1687 11.7344 12.117 11.2446 12.0566 10.7289C12.0377 9.90252 12.3478 9.10226 12.9192 8.50296C13.7074 7.65586 14.8436 7.21826 15.9987 7.31694C17.1551 7.22174 18.291 7.66239 19.0782 8.51156C19.6457 9.11336 19.9551 9.91193 19.9409 10.7375C19.8805 11.2532 19.8201 11.743 19.7597 12.2243C19.7847 12.3761 19.8222 12.5256 19.8718 12.6712C19.9535 12.9197 19.9535 13.1876 19.8718 13.4361C19.8091 13.8138 19.6868 14.1793 19.5095 14.519C19.3716 14.7396 19.2778 14.9848 19.2335 15.2409C19.1648 15.8879 18.9494 16.5109 18.6038 17.0629C18.3528 17.3596 18.2099 17.7322 18.1984 18.12C18.1984 18.9795 18.2846 19.5295 18.4658 19.6498C19.1887 19.9759 19.9287 20.2628 20.6827 20.5093C20.7537 20.549 20.8289 20.5807 20.907 20.6038C23.2073 21.4747 24.4264 22.211 24.5644 22.8126L24.6766 24.6002Z" fill="white"/>
          </g>
          <defs>
            <clipPath>
              <rect width="32" height="32" fill="white"/>
            </clipPath>
          </defs>
        </svg>`}}V([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),V([l({type:String})],a.prototype,"error",void 0),V([l({type:String})],a.prototype,"icon",void 0),V([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),V([l({type:String})],a.prototype,"label",void 0),V([l({type:String})],a.prototype,"placeholder",void 0),V([l({type:Boolean})],a.prototype,"disabled",void 0),V([l({type:Boolean})],a.prototype,"requiredIcon",void 0),V([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),V([l({type:Array})],a.prototype,"items",void 0),V([l({type:Array})],a.prototype,"value",void 0),V([z(".kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item")],a.prototype,"_itemsEl",void 0),V([g(".kuc-user-org-group-select-1-23-1__group__container__select-area__toggle__input")],a.prototype,"_inputEl",void 0),V([g(".kuc-user-org-group-select-1-23-1__group__container__select-area__toggle")],a.prototype,"_toggleEl",void 0),V([g(".kuc-user-org-group-select-1-23-1__group__container__select-area")],a.prototype,"_selectAreaEl",void 0),V([g(".kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu")],a.prototype,"_menuEl",void 0),V([g(".kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item__highlight")],a.prototype,"_highlightItemEl",void 0),V([g(".kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item:first-child")],a.prototype,"_firstItemEl",void 0),V([g(".kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item:last-child")],a.prototype,"_lastItemEl",void 0),V([z(".kuc-user-org-group-select-1-23-1__group__container__select-area__select-menu__item--disabled")],a.prototype,"_disabledItemsEl",void 0),V([v()],a.prototype,"_selectedValues",void 0),V([v()],a.prototype,"_searchText",void 0),V([v()],a.prototype,"_selectorVisible",void 0),window.customElements.define("kuc-user-org-group-select-1-23-1",a),x(Gs),Yi=a})();const Ws=`
  kuc-mobile-button-1-23-1,
  kuc-mobile-button-1-23-1 * {
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
  }
  kuc-mobile-button-1-23-1:lang(es),
  kuc-mobile-button-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-mobile-button-1-23-1:lang(zh),
  kuc-mobile-button-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-mobile-button-1-23-1:lang(zh-TW),
  kuc-mobile-button-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  kuc-mobile-button-1-23-1 {
    display: inline-block;
    vertical-align: top;
  }
  kuc-mobile-button-1-23-1[hidden] {
    display: none;
  }
  .kuc-mobile-button-1-23-1__button {
    min-width: var(--kuc-mobile-button-width, 100px);
    width: var(--kuc-mobile-button-width, auto);
    height: var(--kuc-mobile-button-height, 42px);
    padding: 0 12px;
    user-select: none;
    font-weight: 700;
    font-size: var(--kuc-mobile-button-font-size, 14px);
    line-height: 1;
    display: grid;
    align-items: center;
    align-content: center;
  }
  .kuc-mobile-button-1-23-1__button:focus {
    outline: none;
  }
  .kuc-mobile-button-1-23-1__button--submit {
    border: 2px solid;
    border-color: var(--kuc-mobile-button-background-color, #206694);
    background-color: var(--kuc-mobile-button-background-color, #206694);
    color: var(--kuc-mobile-button-text-color, #ffffff);
    border-radius: 6px;
  }
  .kuc-mobile-button-1-23-1__button--submit:focus {
    border-color: var(--kuc-mobile-button-background-color-focus, var(--kuc-mobile-button-background-color, #206694));
    background-color: var(--kuc-mobile-button-background-color-focus, var(--kuc-mobile-button-background-color, #206694));
  }
  .kuc-mobile-button-1-23-1__button--submit:active {
    border-color: var(--kuc-mobile-button-background-color-active, var(--kuc-mobile-button-background-color, #206694));
    background-color: var(--kuc-mobile-button-background-color-active, var(--kuc-mobile-button-background-color, #206694));
  }
  .kuc-mobile-button-1-23-1__button--submit:disabled {
    color: #ffffff;
    border-color: #a5a5a5;
    background: #a5a5a5;
  }
  .kuc-mobile-button-1-23-1__button--normal {
    border: 2px solid;
    border-color: var(--kuc-mobile-button-background-color, #206694);
    background-color: var(--kuc-mobile-button-background-color, #ffffff);
    color: var(--kuc-mobile-button-text-color, #206694);
    border-radius: 6px;
  }
  .kuc-mobile-button-1-23-1__button--normal:focus {
    border-color: var(--kuc-mobile-button-background-color-focus, var(--kuc-mobile-button-background-color, #206694));
    background-color: var(--kuc-mobile-button-background-color-focus, var(--kuc-mobile-button-background-color, #ffffff));
  }
  .kuc-mobile-button-1-23-1__button--normal:active {
    border-color: var(--kuc-mobile-button-background-color-active, var(--kuc-mobile-button-background-color, #206694));
    background-color: var(--kuc-mobile-button-background-color-active, var(--kuc-mobile-button-background-color, #ffffff));
  }
  .kuc-mobile-button-1-23-1__button--normal:disabled {
    color: #a5a5a5;
    border-color: #a5a5a5;
    background-color: #ffffff;
    cursor: default;
  }
`;var lt=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Zi;(()=>{if(Zi=window.customElements.get("kuc-mobile-button-1-23-1"),Zi)return;class a extends k{constructor(e){super(),this.className="",this.id="",this.text="",this.type="normal",this.content="",this.disabled=!1,this.visible=!0,this._content="";const i=S(e);Object.assign(this,i)}_handleClickButton(e){e.stopPropagation(),f(this,"click")}_getButtonColorType(){return this.type==="normal"||this.type==="submit"?this.type:"normal"}willUpdate(e){(e.has("content")||e.has("text"))&&(this.content!==null&&this.content!==void 0&&this.content!==""?K(this.content)?this._content=Q(this.content):this._content=this.content:this._content=this.text)}render(){return _`
        <button
          type="button"
          class="kuc-mobile-button-1-23-1__button kuc-mobile-button-1-23-1__button--${this._getButtonColorType()}"
          ?disabled="${this.disabled}"
          @click="${this._handleClickButton}"
        >
          ${this._content}
        </button>
      `}}lt([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),lt([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),lt([l({type:String})],a.prototype,"text",void 0),lt([l({type:String})],a.prototype,"type",void 0),lt([l()],a.prototype,"content",void 0),lt([l({type:Boolean})],a.prototype,"disabled",void 0),lt([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),window.customElements.define("kuc-mobile-button-1-23-1",a),x(Ws),Zi=a})();const Ks=`
  kuc-base-mobile-error-1-23-1 {
    display: block;
    font-size: 13px;
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
  }
  kuc-base-mobile-error-1-23-1:lang(es),
  kuc-base-mobile-error-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-base-mobile-error-1-23-1:lang(zh),
  kuc-base-mobile-error-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-base-mobile-error-1-23-1:lang(zh-TW),
  kuc-base-mobile-error-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  kuc-base-mobile-error-1-23-1[hidden] {
    display: none;
  }
  .kuc-base-mobile-error-1-23-1__error {
    line-height: 1.5;
    color: #000000;
    background-color: #fdffc9;
    border: 1px solid #e5db68;
    border-radius: 0.4em;
    padding: 0.4em 1em;
    margin-top: 0.3em;
    margin-left: 0.5em;
  }
  .kuc-base-mobile-error-1-23-1__error[hidden] {
    display: none;
  }
`;var Ji=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class li extends k{constructor(){super(...arguments),this.ariaLive="",this.guid="",this.text=""}render(){return _`
      ${this.ariaLive&&this.ariaLive!==""?_`
            <div
              class="kuc-base-mobile-error-1-23-1__error"
              .id="${this.guid}-error"
              role="alert"
              aria-live="${this.ariaLive}"
              ?hidden="${!this.text}"
            >
              ${this.text}
            </div>
          `:_`
            <div
              class="kuc-base-mobile-error-1-23-1__error"
              .id="${this.guid}-error"
              role="alert"
              ?hidden="${!this.text}"
            >
              ${this.text}
            </div>
          `}
    `}}Ji([l({type:String})],li.prototype,"ariaLive",void 0),Ji([l({type:String})],li.prototype,"guid",void 0),Ji([l({type:String})],li.prototype,"text",void 0),window.customElements.get("kuc-base-mobile-error-1-23-1")||(x(Ks),window.customElements.define("kuc-base-mobile-error-1-23-1",li));const qs=`
  kuc-base-mobile-label-1-23-1 {
    display: inline-table;
    font-size: 13px;
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
  }
  kuc-base-mobile-label-1-23-1:lang(es) ,
  kuc-base-mobile-label-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-base-mobile-label-1-23-1:lang(zh) ,
  kuc-base-mobile-label-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-base-mobile-label-1-23-1:lang(zh-TW),
  kuc-base-mobile-label-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  kuc-base-mobile-label-1-23-1[hidden] {
    display: none;
  }
  .kuc-base-mobile-label-1-23-1__text {
    text-shadow: 0 1px 0 #ffffff;
    color: #888888;
    white-space: normal;
    font-size: 86%;
  }
  .kuc-base-mobile-label-1-23-1__required-icon {
    font-size: 86%;
    position: relative;
    left: 3px;
    color: #d01212;
  }
  .kuc-base-mobile-label-1-23-1__required-icon[hidden] {
    display: none;
  }
`;var Xi=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class ui extends k{constructor(){super(...arguments),this.requiredIcon=!1,this.guid="",this.text=""}render(){return _`
      ${this._getTextTemplate()}
      <span
        class="kuc-base-mobile-label-1-23-1__required-icon"
        ?hidden="${!this.requiredIcon}"
        >*</span
      >
    `}_getTextTemplate(){return this.guid&&this.guid!==""?_`
          <span class="kuc-base-mobile-label-1-23-1__text" .id="${this.guid}-group"
            >${this.text}</span
          >
        `:_` <span class="kuc-base-mobile-label-1-23-1__text">${this.text}</span> `}}Xi([l({type:Boolean})],ui.prototype,"requiredIcon",void 0),Xi([l({type:String})],ui.prototype,"guid",void 0),Xi([l({type:String})],ui.prototype,"text",void 0),window.customElements.get("kuc-base-mobile-label-1-23-1")||(x(qs),window.customElements.define("kuc-base-mobile-label-1-23-1",ui));const Ys=`
  kuc-mobile-checkbox-1-23-1,
  kuc-mobile-checkbox-1-23-1 * {
    font-size: 13px;
    color: #333333;
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
  }
  kuc-mobile-checkbox-1-23-1:lang(es),
  kuc-mobile-checkbox-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-mobile-checkbox-1-23-1:lang(zh),
  kuc-mobile-checkbox-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-mobile-checkbox-1-23-1:lang(zh-TW),
  kuc-mobile-checkbox-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  kuc-mobile-checkbox-1-23-1 {
    width: 100%;
    display: inline-block;
  }
  kuc-mobile-checkbox-1-23-1[hidden] {
    display: none;
  }
  .kuc-mobile-checkbox-1-23-1__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .kuc-mobile-checkbox-1-23-1__group__label {
    display: inline-block;
    font-size: 86%;
    font-weight: bold;
    line-height: 1.5;
    padding: 0px;
    margin: 0 0 4px 0;
    white-space: nowrap;
  }
  .kuc-mobile-checkbox-1-23-1__group__label[hidden] {
    display: none;
  }
  .kuc-mobile-checkbox-1-23-1__group__label__text {
    text-shadow: 0 1px 0 #ffffff;
    color: #888888;
    white-space: normal;
    font-size: inherit;
  }
  .kuc-mobile-checkbox-1-23-1__group__label__required-icon {
    position: relative;
    left: 3px;
    color: #d01212;
  }
  .kuc-mobile-checkbox-1-23-1__group__label__required-icon[hidden] {
    display: none;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu[bordervisible] {
    border-color: #b3b3b3;
    border-width: 1px;
    border-style: solid;
    border-radius: 8px;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu[disabled],
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item--disabled {
    background-color: #d5d7d9;
    color: #999999;
    -webkit-text-fill-color: #999999;
    background-color: #d5d7d9;
    opacity: 1;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu--required[bordervisible] {
    border-color: #cf4a38;
    border-width: 1px;
    border-style: solid;
    border-radius: 8px;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item[bordervisible] {
    padding: 4px;
    border: 1px solid transparent;
    position: relative;
    white-space: normal;
    word-wrap: normal;
    height: 30px;
    display: block;
    border-bottom: 1px solid #b3b3b3;
    padding: 8px;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item {
    padding: 4px;
    border: 1px solid transparent;
    position: relative;
    white-space: normal;
    word-wrap: normal;
    height: 30px;
    display: block;
    padding: 8px;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item:last-child {
    border-bottom: 0px;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu[bordervisible]
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item:first-child {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu[bordervisible]
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item:last-child {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item__input {
    position: absolute;
    opacity: 0;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item__input[disabled]
    + .kuc-mobile-checkbox-1-23-1__group__select-menu__item__label {
    background-color: #d5d7d9;
    color: #999999;
    -webkit-text-fill-color: #999999;
    background-color: #d5d7d9;
    opacity: 1;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item__label {
    position: relative;
    margin: -7px 0px 0px 34px;
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
    padding: 11px 13px 13px 0px;
    font-size: 14.04px;
  }
  .kuc-mobile-checkbox-1-23-1__group__select-menu__item__label__icon {
    position: absolute;
    top: 50%;
    left: -30px;
    margin-top: -13px;
    box-sizing: border-box;
    width: 22px;
    height: 22px;
    background-size: 22px 17px;
    content: "";
  }
  .kuc-mobile-checkbox-1-23-1__group__error {
    line-height: 1.5;
    border: 1px solid #e5db68;
    background-color: #fdffc9;
    margin-top: 0.3em;
    margin-left: 0.5em;
    padding: 0.4em 1em;
    border-radius: 0.4em;
    color: #000000;
  }
  .kuc-mobile-checkbox-1-23-1__group__error[hidden] {
    display: none;
  }
`;var ne=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let Qi;(()=>{if(Qi=window.customElements.get("kuc-mobile-checkbox-1-23-1"),Qi)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.borderVisible=!0,this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this.selectedIndex=[],this.value=[],this._valueMapping={},this._GUID=D();const i=S(e);this._setInitialValue(i),Object.assign(this,i)}_setInitialValue(e){const i="value"in e,o="selectedIndex"in e,n=e.selectedIndex||[];if(!i&&o){if(!T(n))return;const s=this._getValueMapping(e);this.value=this._getValidValue(s,n)}}_getNewValueMapping(e,i){const o=parseInt(i,10),n=Object.keys(this._valueMapping),s={...this._valueMapping};return n.indexOf(i)>-1?(delete s[o],s):(s[o]=e,s)}_handleChangeInput(e){e.stopPropagation();const i=e.target,o=i.dataset.index||"0",n=i.value,s=this.value?[...this.value]:this.value,r=this._getNewValueMapping(n,o),u=this.items.map(p=>p.value),c=Object.values(r).filter(p=>u.indexOf(p)>-1);if(c===s)return;const d=Object.keys(r).map(p=>parseInt(p,10));this.value=c,this.selectedIndex=d,f(this,"change",{oldValue:s,value:c})}_getCheckboxIconSvgTemplate(e){return C`
       <svg
         class="kuc-mobile-checkbox-1-23-1__group__select-menu__item__label__icon"
         xmlns="http://www.w3.org/2000/svg"
         x="0px"
         y="0px"
         width="44px"
         height="34px"
         viewBox="0 0 44 34"
         enable-background="new 0 0 44 34"
         xml:space="preserve">
         <image width="44" height="34" x="0" y="0" href="${this._getSVGStrokeValue(e)}"/>
      </svg>
       `}_getSVGStrokeValue(e){return e?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAiCAQAAACOh/P6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN RQfkCQcFITUNIbrXAAADHklEQVRIx63US2sTURQH8P9kmsykQtoMSbStreZRkRBxY3BR7EJwEyuo WQiCmy4EBXHhyi8g4qYfQCjYpRgQBK0GEoUmohYUsURjKz4WrTTNNDYzmUcz42Lymkfz0nN298z9 zeXcM0OgJeLoJxLkhTn14+P5uJJoWR3oy9Kx5xcCl6s4RybuQ2muk60PhXtmWc/xh8GL+0GBnvGu 599D/S9wwetOH51yg4UEt4H+B7jgZVKTkX0oQYUKEcNwttB9wwUvkwpFHOCg1lLEMOgZX43uE9ZY OwTdqgh3g7b12NYGG4yQ4KEYkoUD9nsnfX2NW8HLpAIRG3iLGge2/G32AweiZ1hjCUuWB8vlr6+8 gWRqBetRFljPXmiC4CaZlD+iWjRBAQeWy19bSaMACWiFCW5yKB24MpQueK3ZWHRwORRRLFke23VW hAoQTTYWpZMBFwkRPz4VT3s2zSydDLkEwyTUm8Dp2CZMxKJ0MuiqoAInSPw00Inaa/+gasEK2FnL Xi3km2wdJmJROul3lWrbnLDr6IShrg8R5bXXs5t5sJCa/wpbnT3sYiE3rkHEeIRJab1OmOqtKWjs Z2zFxSYLDGjsIVdRdxoOCsYjxGrlzNPl2AlzvR4yeI1l47K+QsJxbGnMV8Ru45vXUoKKEap8KVCi H0y4tkx1FSpkVHRsTgdTeEdOgSEstvHwU9TZUWrDkt2FaDitHkaBK2ZHThEMTFsV7MCHX5ZsFZKp CXpYhcRzxczoNMFYbWdRtWBVyBa9NZwY1TptY1R0k4CQeXtj84vxyowwoGj02LSNUTqyBCrPn93k vmPbOAlmuAeaRGVx8RbWUYrvGofPCm7QB6dtTHVPdgCCxv6JW4y1NdwFbYfYht0bRlzJSTzHLh04 Yp8wj5gDUlu2DRxGWMlJXPnrK3+ACulbSHdk28JAWMlJkFYz/qAjJDdOS0PuyHaAa7S8mg0EHSEJ KkjQEB69uN2J7QgDYTUnazQVUkCBvftyDuvYac92AbfSzhB7JzOPDZQ7sV3BDXrJkV1+gt/g4kon Vg8TbZ8kMQg7BAjogtXHX2EwhA6/OKOlAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA5LTA3VDA1 OjMzOjUzKzAwOjAwOdR5sgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wOS0wN1QwNTozMzo1Mysw MDowMEiJwQ4AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAiCAQAAACOh/P6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN RQfkCQcFIRBGJW6QAAACvklEQVRIx6XWQZKbRhSA4Z8GBhACenwC5wZUypXKMlRlmUVcXrtKHMEn meQEUmWfmnHZe65ATpDcIA3MMGKEhBdgGRAaWZqnjarp94H6PTWtNWg0tPEX54fARNzwT72qed8b Ny6weqFzhbO0Fg1rHlf9Ky+CdSw5X3q/O+x4WAro0S+ADSw5T4LQw6LBRFt+5rc9LV7CeokMA1xs bOYE+MvPixfCBpb0ExkGzDDR0bFG9EVwywahzwwDAWiIPf1pcSHcZ/U90NIuHrObv+UF8DTb0hoG utKjd+qgKzSA/R9mirWlN8lCw5Yn9RT9kh4shc6VtJdXUp9ENQzs18fZmkrdR2/Sr4/QC+e1dWuG m3AdVaqeYJ3QS3zp4xxhi+jHdD//215xF84TV17xRJEWI7pl/SSQ8wl2x5a1uu+xvaW4C/3kWl4T IJGhn1jSGLCz0E+k9HC6Bhuyj2nxg0r7o92cj13aDBsXn6BHt6yXSOlhY3QFHrJ59L/KOIA/9tJ0 dGYdbUsD0WOtSbZMs0ipnMcxfDtKE+jMCJBh8K8b2rgn2DzKVM6aYbkNcG496Q7SBOAAQhpJ/cG8 8eT8BFsx7iIBRmSmBmKQJtBx8HklXy2vL2BBwK//raNNumM3umBg4xFwrGTPsV3xflZ5VKbbEa2h Y2Jhoh+w9Ql2324/HaEFYrRIsGNDedd2wjEWxNctZ5o+jB0bylX2VqniGXawCX0PvWPDwyqLFcVB gx2FITtBt2weKwoqts/+sgGcd3Q9SX9j70+yI7giR6ksKu82B/SQPVWJEVxTUaBU9rZcDelz2YNX U03TfuIGd2F29z2fnTgJbaloaCAGd2Gitewf+YfsDHbyiLWlar/EMFvobCjjfJXxcAZ75Oy26+gm 3mIuqrhYZTyexR49FLZ0wyY2/qzSkpKns1jQmrOmf398ARuVc7WA4gOtAAAAJXRFWHRkYXRlOmNy ZWF0ZQAyMDIwLTA5LTA3VDA1OjMzOjE2KzAwOjAw76ZY7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAy MC0wOS0wN1QwNTozMzoxNiswMDowMJ774FMAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVh ZHlxyWU8AAAAAElFTkSuQmCC"}_isCheckedItem(e,i){const o=Object.values(this._valueMapping),n=Object.keys(this._valueMapping);return o.filter((r,u)=>r===e.value&&i===parseInt(n[u],10)).length>0}_getItemTemplate(e,i){const o=this._isCheckedItem(e,i);return _`
        <label
          for="${this._GUID}-item-${i}"
          class="kuc-mobile-checkbox-1-23-1__group__select-menu__item${e.disabled?" kuc-mobile-checkbox-1-23-1__group__select-menu__item--disabled":""}"
          ?borderVisible="${this.borderVisible}"
        >
          <input
            type="checkbox"
            id="${this._GUID}-item-${i}"
            class="kuc-mobile-checkbox-1-23-1__group__select-menu__item__input"
            name="${this._GUID}-group"
            data-index="${i}"
            value="${e.value!==void 0?e.value:""}"
            aria-describedby="${this._GUID}-error}"
            aria-required="${this.requiredIcon}"
            aria-invalid="${this.error!==""}"
            ?disabled="${e.disabled||this.disabled}"
            @change="${this._handleChangeInput}"
          />
          <div class="kuc-mobile-checkbox-1-23-1__group__select-menu__item__label">
            ${this._getCheckboxIconSvgTemplate(o)}${e.label===void 0?e.value:e.label}
          </div>
        </label>
      `}shouldUpdate(e){return e.has("items")&&!T(this.items)?(this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1):e.has("value")&&!T(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_ARRAY),!1):e.has("selectedIndex")&&!T(this.selectedIndex)?(this.throwErrorAfterUpdateComplete(y.SELECTED_INDEX.IS_NOT_ARRAY),!1):!0}willUpdate(e){if(e.has("value")){if(this.value.length>0)return;this.selectedIndex=[]}}update(e){(e.has("items")||e.has("value")||e.has("selectedIndex"))&&(this._valueMapping=this._getValueMapping({items:this.items,value:this.value,selectedIndex:this.selectedIndex}),this._setValueAndSelectedIndex()),super.update(e)}render(){return _`
        <fieldset class="kuc-mobile-checkbox-1-23-1__group">
          <legend
            class="kuc-mobile-checkbox-1-23-1__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-mobile-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-mobile-label-1-23-1>
          </legend>
          <div
            class="kuc-mobile-checkbox-1-23-1__group__select-menu ${this.requiredIcon?"kuc-mobile-checkbox-1-23-1__group__select-menu--required":""}"
            ?borderVisible="${this.borderVisible}"
            ?disabled="${this.disabled}"
          >
            ${this.items.map((e,i)=>this._getItemTemplate(e,i))}
          </div>
          <kuc-base-mobile-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ariaLive="assertive"
          >
          </kuc-base-mobile-error-1-23-1>
        </fieldset>
      `}updated(){this._inputEls.forEach(e=>{e.checked=this.value.indexOf(e.value)>-1})}_setValueAndSelectedIndex(){this.value=Object.values(this._valueMapping),this.selectedIndex=Object.keys(this._valueMapping).map(e=>parseInt(e,10))}_getValueMapping(e){const i=e.items||[],o=e.value||[],n=e.selectedIndex||[],s=i.map(d=>d.value||""),r=Object.assign({},s),u={};if(o.length===0){const d=this._getValidValue(r,n);return n.forEach((h,p)=>u[h]=d[p]),u}return this._getValidSelectedIndex(r).forEach((d,h)=>u[d]=o[h]),u}_getValidValue(e,i){return i.filter(o=>e[o]).map(o=>e[o])}_getValidSelectedIndex(e){const i=[];for(let o=0;o<this.value.length;o++){const n=this.selectedIndex[o];if(e[n]===this.value[o]){i.push(n);continue}const s=this.items.findIndex(r=>r.value===this.value[o]);i.push(s)}return i}}ne([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),ne([l({type:String})],a.prototype,"error",void 0),ne([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),ne([l({type:String})],a.prototype,"label",void 0),ne([l({type:Boolean})],a.prototype,"borderVisible",void 0),ne([l({type:Boolean})],a.prototype,"disabled",void 0),ne([l({type:Boolean})],a.prototype,"requiredIcon",void 0),ne([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),ne([l({type:Array})],a.prototype,"items",void 0),ne([l({type:Array})],a.prototype,"selectedIndex",void 0),ne([l({type:Array})],a.prototype,"value",void 0),ne([z(".kuc-mobile-checkbox-1-23-1__group__select-menu__item__input")],a.prototype,"_inputEls",void 0),ne([v()],a.prototype,"_valueMapping",void 0),window.customElements.define("kuc-mobile-checkbox-1-23-1",a),x(Ys),Qi=a})();const Zs=`
  kuc-mobile-dropdown-1-23-1,
  kuc-mobile-dropdown-1-23-1 * {
    font-size: 13px;
    color: #333333;
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
  }
  kuc-mobile-dropdown-1-23-1:lang(es),
  kuc-mobile-dropdown-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-mobile-dropdown-1-23-1:lang(zh),
  kuc-mobile-dropdown-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-mobile-dropdown-1-23-1:lang(zh-TW),
  kuc-mobile-dropdown-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  kuc-mobile-dropdown-1-23-1 {
    display: inline-block;
    width: 100%;
  }

  kuc-mobile-dropdown-1-23-1[hidden] {
    display: none;
  }

  .kuc-mobile-dropdown-1-23-1__label {
    display: inline-block;
    font-size: 86%;
    font-weight: bold;
    line-height: 1.5;
    padding: 0px;
    margin: 0 0 4px 0;
    white-space: nowrap;
  }

  .kuc-mobile-dropdown-1-23-1__label[hidden] {
    display: none;
  }

  .kuc-mobile-dropdown-1-23-1__input-form {
    word-wrap: break-word;
    min-height: 1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  .kuc-mobile-dropdown-1-23-1__input-form__select {
    display: inline-block;
    border-radius: 0.4em;
    max-width: 100%;
  }

  .kuc-mobile-dropdown-1-23-1__input-form__select.kuc--required {
    border: 1px solid #cf4a38;
  }

  .kuc-mobile-dropdown-1-23-1__input-form__select__input {
    min-width: 100px;
    max-width: 100%;
  }

  .kuc-mobile-dropdown-1-23-1__input-form__select__input:disabled {
    color: #999999;
    -webkit-text-fill-color: #999999;
    background-color: #d5d7d9;
    opacity: 1;
  }
`;var ve=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let eo;(()=>{if(eo=window.customElements.get("kuc-mobile-dropdown-1-23-1"),eo)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.value="",this.selectedIndex=-1,this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this._hasValueInItems=!1,this._GUID=D();const i=S(e);this._setInitialValue(i),Object.assign(this,i)}_setInitialValue(e){const i="value"in e,o="selectedIndex"in e;!i&&o&&(this.value=this._getValue(e)||"")}_handleChangeInput(e){e.stopPropagation();const i=e.target,o=i.value;if(this.value===o&&this.selectedIndex===i.selectedIndex)return;const n={oldValue:this.value,value:o};this.value=o,this.selectedIndex=i.selectedIndex,f(this,"change",n)}shouldUpdate(e){return e.has("items")&&!T(this.items)?(this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1):e.has("value")&&!bt(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_STRING),!1):e.has("selectedIndex")&&!nt(this.selectedIndex)?(this.throwErrorAfterUpdateComplete(y.SELECTED_INDEX.IS_NOT_NUMBER),!1):!0}willUpdate(e){if((e.has("items")||e.has("value"))&&(this._hasValueInItems=this.items.some(i=>i.value===this.value)),e.has("value")){if(this.value!==""||this._hasValueInItems)return;this.selectedIndex=-1}}update(e){(e.has("items")||e.has("value")||e.has("selectedIndex"))&&(this.selectedIndex=this._getSelectedIndex(),this.value=this._getValue({items:this.items,selectedIndex:this.selectedIndex})||""),super.update(e)}_getSelectedIndex(){if(!this.value&&!this._hasValueInItems)return this.items[this.selectedIndex]?this.selectedIndex:-1;const e=this.items.findIndex(o=>o.value===this.value);if(e===-1)return-1;const i=this.items.findIndex((o,n)=>o.value===this.value&&n===this.selectedIndex);return i>-1?i:e}_getValue(e){const i=e.items||[],o=e.selectedIndex===0||e.selectedIndex?e.selectedIndex:-1,n=i[o];return n?n.value:""}_isCheckedItem(e,i){return this.value?e.value===this.value&&this.selectedIndex===i:this.selectedIndex===i}_getItemTemplate(e,i){const o=this._isCheckedItem(e,i);return _`
        <option
          value="${e.value||""}"
          ?selected="${o}"
          ?disabled="${e.disabled}"
        >
          ${e.label===void 0?e.value:e.label}
        </option>
      `}render(){return _`
        <label
          class="kuc-mobile-dropdown-1-23-1__label"
          for="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <kuc-base-mobile-label-1-23-1
            .text="${this.label}"
            .requiredIcon="${this.requiredIcon}"
          ></kuc-base-mobile-label-1-23-1>
        </label>
        <div class="kuc-mobile-dropdown-1-23-1__input-form">
          <div
            class="kuc-mobile-dropdown-1-23-1__input-form__select
            ${this.requiredIcon?"kuc--required":""}"
          >
            <select
              class="kuc-mobile-dropdown-1-23-1__input-form__select__input"
              id="${this._GUID}-label"
              aria-describedby="${this._GUID}-error"
              aria-required="${this.requiredIcon}"
              aria-invalid="${this.error!==""}"
              ?disabled="${this.disabled}"
              @change="${this._handleChangeInput}"
            >
              ${this.items.map((e,i)=>this._getItemTemplate(e,i))}
            </select>
          </div>
        </div>
        <kuc-base-mobile-error-1-23-1
          .text="${this.error}"
          .guid="${this._GUID}"
          ariaLive="assertive"
        >
        </kuc-base-mobile-error-1-23-1>
      `}updated(e){e.has("selectedIndex")&&(this._selectEl.selectedIndex=this.selectedIndex),super.update(e)}}ve([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),ve([l({type:String})],a.prototype,"error",void 0),ve([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),ve([l({type:String})],a.prototype,"label",void 0),ve([l({type:String})],a.prototype,"value",void 0),ve([l({type:Number})],a.prototype,"selectedIndex",void 0),ve([l({type:Boolean})],a.prototype,"disabled",void 0),ve([l({type:Boolean})],a.prototype,"requiredIcon",void 0),ve([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),ve([l({type:Array})],a.prototype,"items",void 0),ve([g(".kuc-mobile-dropdown-1-23-1__input-form__select__input")],a.prototype,"_selectEl",void 0),window.customElements.define("kuc-mobile-dropdown-1-23-1",a),x(Zs),eo=a})();const Js=`
  kuc-mobile-multi-choice-1-23-1,
  kuc-mobile-multi-choice-1-23-1 * {
    font-size: 13px;
    color: #333333;
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
  }
  kuc-mobile-multi-choice-1-23-1:lang(es),
  kuc-mobile-multi-choice-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-mobile-multi-choice-1-23-1:lang(zh),
  kuc-mobile-multi-choice-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-mobile-multi-choice-1-23-1:lang(zh-TW),
  kuc-mobile-multi-choice-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  kuc-mobile-multi-choice-1-23-1 {
    display: inline-block;
    width: 100%;
  }

  kuc-mobile-multi-choice-1-23-1[hidden] {
    display: none;
  }

  .kuc-mobile-multi-choice-1-23-1__label {
    display: inline-block;
    font-size: 86%;
    font-weight: bold;
    line-height: 1.5;
    padding: 0px;
    margin: 0 0 4px 0;
    white-space: nowrap;
  }

  .kuc-mobile-multi-choice-1-23-1__label[hidden] {
    display: none;
  }

  .kuc-mobile-multi-choice-1-23-1__input-form {
    word-wrap: break-word;
    min-height: 1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  .kuc-mobile-multi-choice-1-23-1__input-form__select {
    display: inline-block;
    border-radius: 0.4em;
    max-width: 100%;
  }

  .kuc-mobile-multi-choice-1-23-1__input-form__select.kuc--required {
    border: 1px solid #cf4a38;
  }

  .kuc-mobile-multi-choice-1-23-1__input-form__select__input {
    min-width: 100px;
    max-width: 100%;
  }

  .kuc-mobile-multi-choice-1-23-1__input-form__select__input:disabled {
    color: #999999;
    -webkit-text-fill-color: #999999;
    background-color: #d5d7d9;
    opacity: 1;
  }

  .kuc-mobile-multi-choice-1-23-1__input-form__select__input option:disabled {
    color: #999999;
    -webkit-text-fill-color: #999999;
    background-color: #d5d7d9;
    opacity: 1;
  }

  .kuc-mobile-multi-choice-1-23-1__input-form__select__input option:disabled[selected] {
    background-color: #cecece; /* Chrome */
    background-color: -moz-cellhighlight; /* Firefox */
    opacity: 1;
  }

  .kuc-mobile-multi-choice-1-23-1__input-form__select__input:disabled option {
    color: #999999;
    -webkit-text-fill-color: #999999;
  }
`;var ke=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let to;(()=>{if(to=window.customElements.get("kuc-mobile-multi-choice-1-23-1"),to)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this.selectedIndex=[],this.value=[],this._valueMapping={},this._GUID=D();const i=S(e);this._setInitialValue(i),Object.assign(this,i)}_setInitialValue(e){const i="value"in e,o="selectedIndex"in e,n=e.selectedIndex||[];if(!i&&o){if(!T(n))return;const s=this._getValueMapping(e);this.value=this._getValidValue(s,n)}}_handleChangeInput(e){e.stopPropagation();const i=e.target,o=this.value?[...this.value]:this.value,n=Array.from(i.selectedOptions,u=>u.value),s=Array.from(i.selectedOptions,u=>u.dataset.index),r={value:n,oldValue:o};this.value=n,this.selectedIndex=s.map(u=>u?parseInt(u,10):0),f(this,"change",r)}shouldUpdate(e){return e.has("items")&&!T(this.items)?(this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1):e.has("value")&&!T(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_ARRAY),!1):e.has("selectedIndex")&&!T(this.selectedIndex)?(this.throwErrorAfterUpdateComplete(y.SELECTED_INDEX.IS_NOT_ARRAY),!1):!0}willUpdate(e){if(e.has("value")){if(this.value.length>0)return;this.selectedIndex=[]}}update(e){(e.has("items")||e.has("value")||e.has("selectedIndex"))&&(this._valueMapping=this._getValueMapping({items:this.items,value:this.value,selectedIndex:this.selectedIndex}),this._setValueAndSelectedIndex()),super.update(e)}_getValueMapping(e){const i=e.items||[],o=e.value||[],n=e.selectedIndex||[],s=i.map(d=>d.value||""),r=Object.assign({},s),u={};if(o.length===0){const d=this._getValidValue(r,n);return n.forEach((h,p)=>u[h]=d[p]),u}return this._getValidSelectedIndex(r).forEach((d,h)=>u[d]=o[h]),u}_getValidValue(e,i){return i.filter(o=>e[o]).map(o=>e[o])}_getValidSelectedIndex(e){const i=[];for(let o=0;o<this.value.length;o++){const n=this.selectedIndex[o];if(e[n]===this.value[o]){i.push(n);continue}const s=this.items.findIndex(r=>r.value===this.value[o]);i.push(s)}return i}_setValueAndSelectedIndex(){this.value=Object.values(this._valueMapping),this.selectedIndex=Object.keys(this._valueMapping).map(e=>parseInt(e,10))}_isCheckedItem(e,i){const o=Object.values(this._valueMapping),n=Object.keys(this._valueMapping);return o.filter((r,u)=>r===e.value&&i===parseInt(n[u],10)).length>0}_getItemTemplate(e,i){const o=this._isCheckedItem(e,i);return _`
        <option
          value="${e.value||""}"
          data-index="${i}"
          ?selected="${e.value!==void 0?o:!1}"
          ?disabled="${e.disabled}"
        >
          ${e.label===void 0?e.value:e.label}
        </option>
      `}render(){return _`
        <label
          class="kuc-mobile-multi-choice-1-23-1__label"
          for="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <kuc-base-mobile-label-1-23-1
            .text="${this.label}"
            .requiredIcon="${this.requiredIcon}"
          ></kuc-base-mobile-label-1-23-1>
        </label>
        <div class="kuc-mobile-multi-choice-1-23-1__input-form">
          <div
            class="kuc-mobile-multi-choice-1-23-1__input-form__select
            ${this.requiredIcon?"kuc--required":""}"
          >
            <select
              class="kuc-mobile-multi-choice-1-23-1__input-form__select__input"
              id="${this._GUID}-label"
              aria-describedby="${this._GUID}-error"
              aria-required="${this.requiredIcon}"
              aria-invalid="${this.error!==""}"
              ?disabled="${this.disabled}"
              multiple
              @change="${this._handleChangeInput}"
            >
              ${this.items.map((e,i)=>this._getItemTemplate(e,i))}
            </select>
          </div>
        </div>
        <kuc-base-mobile-error-1-23-1
          .text="${this.error}"
          .guid="${this._GUID}"
          ariaLive="assertive"
        >
        </kuc-base-mobile-error-1-23-1>
      `}}ke([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),ke([l({type:String})],a.prototype,"error",void 0),ke([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),ke([l({type:String})],a.prototype,"label",void 0),ke([l({type:Boolean})],a.prototype,"disabled",void 0),ke([l({type:Boolean})],a.prototype,"requiredIcon",void 0),ke([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),ke([l({type:Array})],a.prototype,"items",void 0),ke([l({type:Array})],a.prototype,"selectedIndex",void 0),ke([l({type:Array})],a.prototype,"value",void 0),ke([v()],a.prototype,"_valueMapping",void 0),window.customElements.define("kuc-mobile-multi-choice-1-23-1",a),x(Js),to=a})();const Xs=`
  kuc-mobile-radio-button-1-23-1,
  kuc-mobile-radio-button-1-23-1 * {
    font-size: 13px;
    color: #333333;
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
  }
  kuc-mobile-radio-button-1-23-1:lang(es),
  kuc-mobile-radio-button-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-mobile-radio-button-1-23-1:lang(zh) ,
  kuc-mobile-radio-button-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-mobile-radio-button-1-23-1:lang(zh-TW),
  kuc-mobile-radio-button-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  kuc-mobile-radio-button-1-23-1 {
    width: 100%;
    display: inline-block;
  }

  kuc-mobile-radio-button-1-23-1[hidden] {
    display: none;
  }

  .kuc-mobile-radio-button-1-23-1__group {
    border: none;
    height: auto;
    display: inline-block;
    width: 100%;
    vertical-align: top;
  }

  .kuc-mobile-radio-button-1-23-1__group__label {
    display: inline-block;
    font-size: 86%;
    font-weight: bold;
    line-height: 1.5;
    padding: 0px;
    margin: 0 0 4px 0;
    white-space: nowrap;
  }

  .kuc-mobile-radio-button-1-23-1__group__label[hidden] {
    display: none;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu {
    margin-right: 0.5em;
    margin-left: 0.5em;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu[bordervisible] {
    border-color: #b3b3b3;
    border-width: 1px;
    border-style: solid;
    border-radius: 0.4em;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu__item {
    border: 1px solid transparent;
    position: relative;
    white-space: normal;
    word-wrap: normal;
    height: 45px;
    display: block;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu[bordervisible]
    .kuc-mobile-radio-button-1-23-1__group__select-menu__item {
    border-bottom: 1px solid #b3b3b3;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu[bordervisible]
    .kuc-mobile-radio-button-1-23-1__group__select-menu__item:last-child {
    border-bottom: 0px;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu__item__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu__item__label__icon {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    margin-top: -11px;
    width: 21px;
    height: 21px;
    box-shadow: 1px 1px 3px #f5f5f5 inset, -1px -1px 3px #f5f5f5 inset;
    content: "";
    border-radius: 9px;
    left: 8px;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu__item__label__value {
    height: 45px;
    line-height: 45px;
    padding-left: 35px;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu[disabled], 
  .kuc-mobile-radio-button-1-23-1__group__select-menu__item--disabled {
    background-color: #d5d7d9;
    color: #999999;
    -webkit-text-fill-color: #999999;
    background-color: #d5d7d9;
    opacity: 1;
  }
  .kuc-mobile-radio-button-1-23-1__group__select-menu[bordervisible]
  .kuc-mobile-radio-button-1-23-1__group__select-menu__item--disabled:last-child {
    border-bottom-left-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
  }
  .kuc-mobile-radio-button-1-23-1__group__select-menu[bordervisible]
  .kuc-mobile-radio-button-1-23-1__group__select-menu__item--disabled:first-child {
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
  }

  .kuc-mobile-radio-button-1-23-1__group__select-menu__item__label {
    position: absolute;
    white-space: nowrap;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    padding: 0px;
  }
`;var _e=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let io;(()=>{if(io=window.customElements.get("kuc-mobile-radio-button-1-23-1"),io)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.value="",this.selectedIndex=-1,this.borderVisible=!0,this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this.items=[],this._GUID=D();const i=S(e);this._setInitialValue(i),Object.assign(this,i)}_setInitialValue(e){const i="value"in e,o="selectedIndex"in e;!i&&o&&(this.value=this._getValue(e)||"")}willUpdate(e){if(e.has("value")){if(this.value!=="")return;this.selectedIndex=-1}}_handleChangeInput(e){e.stopPropagation();const i=e.target,o=i.value,n=i.dataset.index||"0",s=parseInt(n,10);if(this.value===o&&this.selectedIndex===s)return;const r={oldValue:this.value,value:o};this.value=o,this.selectedIndex=s,f(this,"change",r)}_getRadioIconSvgTemplate(e,i){return C`
      <svg
        class="kuc-mobile-radio-button-1-23-1__group__select-menu__item__label__icon"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <defs>
        <radialGradient id="${this._GUID}-shadow">
          <stop offset="0%" style="stop-color:#5b5b5b;stop-opacity:0" />
          <stop offset="30%" style="stop-color:#5b5b5b;stop-opacity:0" />
          <stop offset="80%" style="stop-color:#5b5b5b;stop-opacity:0.1" />
          <stop offset="90%" style="stop-color:#5b5b5b;stop-opacity:0.15" />
          <stop offset="100%" style="stop-color:#5b5b5b;stop-opacity:0.2" />
        </radialGradient>
      </defs>
        <circle
          fill="url(#shadow)"
          cx="10.5"
          cy="10.5"
          r="10.15"
          stroke="#bbbbbb" stroke-width="1"/>
        ${i?C`<circle cx="10.5" cy="10.5" r="6.5" fill="${"#5b5b5b"}"/>`:""}
      </svg>
    `}_isCheckedItem(e,i){return this.value?e.value===this.value&&this.selectedIndex===i:this.selectedIndex===i}_getItemTemplate(e,i){const o=this._isCheckedItem(e,i);return _`
        <div
          class="kuc-mobile-radio-button-1-23-1__group__select-menu__item${e.disabled?" kuc-mobile-radio-button-1-23-1__group__select-menu__item--disabled":""}"
        >
          <input
            type="radio"
            aria-describedby="${this._GUID}-error"
            id="${this._GUID}-item-${i}"
            data-index="${i}"
            class="kuc-mobile-radio-button-1-23-1__group__select-menu__item__input"
            name="${this._GUID}-group"
            value="${e.value!==void 0?e.value:""}"
            aria-invalid="${this.error!==""}"
            aria-required="${this.requiredIcon}"
            ?disabled="${this.disabled||e.disabled}"
            @change="${this._handleChangeInput}"
          />
          <label
            class="kuc-mobile-radio-button-1-23-1__group__select-menu__item__label"
            for="${this._GUID}-item-${i}"
            >${this._getRadioIconSvgTemplate(this.disabled,o)}
            <div
              class="kuc-mobile-radio-button-1-23-1__group__select-menu__item__label__value"
            >
              ${e.label===void 0?e.value:e.label}
            </div>
          </label>
        </div>
      `}shouldUpdate(e){return e.has("items")&&!T(this.items)?(this.throwErrorAfterUpdateComplete(y.ITEMS.IS_NOT_ARRAY),!1):e.has("value")&&!bt(this.value)?(this.throwErrorAfterUpdateComplete(y.VALUE.IS_NOT_STRING),!1):e.has("selectedIndex")&&!nt(this.selectedIndex)?(this.throwErrorAfterUpdateComplete(y.SELECTED_INDEX.IS_NOT_NUMBER),!1):!0}update(e){(e.has("items")||e.has("value")||e.has("selectedIndex"))&&(this.selectedIndex=this._getSelectedIndex(),this.value=this._getValue({items:this.items,selectedIndex:this.selectedIndex})||""),super.update(e)}render(){return _`
        <div class="kuc-mobile-radio-button-1-23-1__group">
          <div
            class="kuc-mobile-radio-button-1-23-1__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-mobile-label-1-23-1
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-mobile-label-1-23-1>
          </div>
          <div
            class="kuc-mobile-radio-button-1-23-1__group__select-menu"
            ?borderVisible="${this.borderVisible}"
            ?disabled="${this.disabled}"
          >
            ${this.items.map((e,i)=>this._getItemTemplate(e,i))}
          </div>
          <kuc-base-mobile-error-1-23-1
            .text="${this.error}"
            .guid="${this._GUID}"
            ariaLive="assertive"
          >
          </kuc-base-mobile-error-1-23-1>
        </div>
      `}updated(){this._inputEls.forEach((e,i)=>{e.checked=this.value===e.value&&i===this.selectedIndex})}_getSelectedIndex(){if(!this.value)return this.items[this.selectedIndex]?this.selectedIndex:-1;const e=this.items.findIndex(o=>o.value===this.value);if(e===-1)return-1;const i=this.items.findIndex((o,n)=>o.value===this.value&&n===this.selectedIndex);return i>-1?i:e}_getValue(e){const i=e.items||[],o=e.selectedIndex===0||e.selectedIndex?e.selectedIndex:-1,n=i[o];return n?n.value:""}}_e([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),_e([l({type:String})],a.prototype,"error",void 0),_e([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),_e([l({type:String})],a.prototype,"label",void 0),_e([l({type:String})],a.prototype,"value",void 0),_e([l({type:Number})],a.prototype,"selectedIndex",void 0),_e([l({type:Boolean})],a.prototype,"borderVisible",void 0),_e([l({type:Boolean})],a.prototype,"disabled",void 0),_e([l({type:Boolean})],a.prototype,"requiredIcon",void 0),_e([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),_e([l({type:Array})],a.prototype,"items",void 0),_e([z(".kuc-mobile-radio-button-1-23-1__group__select-menu__item__input")],a.prototype,"_inputEls",void 0),window.customElements.define("kuc-mobile-radio-button-1-23-1",a),x(Xs),io=a})();const Qs=`
  kuc-mobile-text-1-23-1,
  kuc-mobile-text-1-23-1 * {
    font-size: 13px;
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
  }
  kuc-mobile-text-1-23-1:lang(es),
  kuc-mobile-text-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-mobile-text-1-23-1:lang(zh),
  kuc-mobile-text-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-mobile-text-1-23-1:lang(zh-TW),
  kuc-mobile-text-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  kuc-mobile-text-1-23-1 {
    display: block;
  }
  kuc-mobile-text-1-23-1[hidden] {
    display: none;
  }
  .kuc-mobile-text-1-23-1__label {
    display: inline-block;
    font-weight: bold;
    line-height: 1.5;
    padding: 0;
    margin: 0 0 4px 0;
    white-space: nowrap;
  }
  .kuc-mobile-text-1-23-1__label[hidden] {
    display: none;
  }
  .kuc-mobile-text-1-23-1__input-form {
    padding-left: 0.5em;
    padding-right: 0.5em;
    display: flex;
    align-items: center;
  }
  .kuc-mobile-text-1-23-1__input-form__prefix {
    margin-right: 4px;
    color: #888888;
  }
  .kuc-mobile-text-1-23-1__input-form__prefix[hidden] {
    display: none;
  }
  .kuc-mobile-text-1-23-1__input-form__input {
    width: 100%;
    min-width: 20px;
    padding: 0.4em;
    border: 1px solid #b3b3b3;
    outline: 0;
    box-shadow: 0 1px 0 #ffffff, inset 0 2px 3px #dadada;
    border-radius: 0.4em;
    box-sizing: border-box;
    text-align: left;
  }
  .kuc-mobile-text-1-23-1__input-form__input[aria-required="true"] {
    border: 1px solid #cf4a38;
  }
  .kuc-mobile-text-1-23-1__input-form__input[textAlign="right"] {
    text-align: right;
  }
  .kuc-mobile-text-1-23-1__input-form__input:disabled {
    color: #999999;
    background-color: #d5d7d9;
    -webkit-text-fill-color: #999999;
    opacity: 1;
    -webkit-opacity: 1;
  }
  .kuc-mobile-text-1-23-1__input-form__suffix {
    margin-left: 4px;
    color: #888888;
  }
  .kuc-mobile-text-1-23-1__input-form__suffix[hidden] {
    display: none;
  }
`;var pe=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let oo;(()=>{if(oo=window.customElements.get("kuc-mobile-text-1-23-1"),oo)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.placeholder="",this.prefix="",this.suffix="",this.textAlign="left",this.value="",this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this._GUID=D();const i=S(e);Object.assign(this,i)}_handleFocusInput(e){const i={value:this.value};f(this,"focus",i)}_handleChangeInput(e){e.stopPropagation();const i=e.target,o={value:"",oldValue:this.value};this.value=i.value,o.value=this.value,f(this,"change",o)}_handleInputText(e){e.stopPropagation();const o={value:e.target.value,data:e.data};f(this,"input",o)}render(){return _`
        <label
          class="kuc-mobile-text-1-23-1__label"
          for="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <kuc-base-mobile-label-1-23-1
            .requiredIcon="${this.requiredIcon}"
            .text="${this.label}"
          ></kuc-base-mobile-label-1-23-1>
        </label>
        <div class="kuc-mobile-text-1-23-1__input-form">
          <span
            class="kuc-mobile-text-1-23-1__input-form__prefix"
            ?hidden="${!this.prefix}"
            >${this.prefix}</span
          >
          <input
            class="kuc-mobile-text-1-23-1__input-form__input"
            id="${this._GUID}-label"
            placeholder="${this.placeholder}"
            textAlign="${this.textAlign}"
            type="text"
            .value="${this.value}"
            ?disabled="${this.disabled}"
            aria-invalid="${this.error!==""}"
            aria-describedby="${this._GUID}-error"
            aria-required="${this.requiredIcon}"
            @focus="${this._handleFocusInput}"
            @change="${this._handleChangeInput}"
            @input="${this._handleInputText}"
          />
          <span
            class="kuc-mobile-text-1-23-1__input-form__suffix"
            ?hidden="${!this.suffix}"
            >${this.suffix}</span
          >
        </div>
        <kuc-base-mobile-error-1-23-1 .guid="${this._GUID}" .text="${this.error}">
        </kuc-base-mobile-error-1-23-1>
      `}}pe([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),pe([l({type:String})],a.prototype,"error",void 0),pe([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),pe([l({type:String})],a.prototype,"label",void 0),pe([l({type:String})],a.prototype,"placeholder",void 0),pe([l({type:String})],a.prototype,"prefix",void 0),pe([l({type:String})],a.prototype,"suffix",void 0),pe([l({type:String})],a.prototype,"textAlign",void 0),pe([l({type:String})],a.prototype,"value",void 0),pe([l({type:Boolean})],a.prototype,"disabled",void 0),pe([l({type:Boolean})],a.prototype,"requiredIcon",void 0),pe([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),window.customElements.define("kuc-mobile-text-1-23-1",a),x(Qs),oo=a})();const er=`
  kuc-mobile-textarea-1-23-1,
  kuc-mobile-textarea-1-23-1 * {
    font-size: 13px;
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
  }
  kuc-mobile-textarea-1-23-1:lang(es),
  kuc-mobile-textarea-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-mobile-textarea-1-23-1:lang(zh),
  kuc-mobile-textarea-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-mobile-textarea-1-23-1:lang(zh-TW),
  kuc-mobile-textarea-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  kuc-mobile-textarea-1-23-1 {
    display: block;
  }
  kuc-mobile-textarea-1-23-1[hidden] {
    display: none;
  }
  .kuc-mobile-textarea-1-23-1__label {
    padding: 0;
    margin: 0 0 4px 0;
    display: inline-block;
    font-weight: bold;
    line-height: 1.5;
    white-space: nowrap;
  }
  .kuc-mobile-textarea-1-23-1__label[hidden] {
    display: none;
  }
  .kuc-mobile-textarea-1-23-1__form {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
  .kuc-mobile-textarea-1-23-1__form__textarea {
    width: 100%;
    height: 120px;
    padding: 0.4em;
    border: 1px solid #b3b3b3;
    outline: 0;
    box-shadow: 0 1px 0 #ffffff, inset 0 2px 3px #dadada;
    border-radius: 0.4em;
    box-sizing: border-box;
    vertical-align: top;
  }
  .kuc-mobile-textarea-1-23-1__form__textarea[aria-required="true"] {
    border: 1px solid #cf4a38;
  }
  .kuc-mobile-textarea-1-23-1__form__textarea:disabled {
    color: #999999;
    background-color: #d5d7d9;
    opacity: 1;
  }
`;var Ue=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let ao;(()=>{if(ao=window.customElements.get("kuc-mobile-textarea-1-23-1"),ao)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.placeholder="",this.value="",this.disabled=!1,this.requiredIcon=!1,this.visible=!0,this._GUID=D();const i=S(e);Object.assign(this,i)}_handleFocusInput(e){const i={value:this.value};f(this,"focus",i)}_handleChangeInput(e){e.stopPropagation();const i=e.target,o={value:"",oldValue:this.value};this.value=i.value,o.value=this.value,f(this,"change",o)}_handleInputTextArea(e){e.stopPropagation();const o={value:e.target.value,data:e.data};f(this,"input",o)}render(){return _`
        <label
          class="kuc-mobile-textarea-1-23-1__label"
          for="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <kuc-base-mobile-label-1-23-1
            .requiredIcon="${this.requiredIcon}"
            .text="${this.label}"
          ></kuc-base-mobile-label-1-23-1>
        </label>
        <div class="kuc-mobile-textarea-1-23-1__form">
          <textarea
            class="kuc-mobile-textarea-1-23-1__form__textarea"
            id="${this._GUID}-label"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            .value="${this.value}"
            aria-invalid="${this.error!==""}"
            aria-describedby="${this._GUID}-error"
            aria-required="${this.requiredIcon}"
            @focus="${this._handleFocusInput}"
            @change="${this._handleChangeInput}"
            @input="${this._handleInputTextArea}"
          /></textarea>
        </div>
        <kuc-base-mobile-error-1-23-1 .guid="${this._GUID}" .text="${this.error}">
        </kuc-base-mobile-error-1-23-1>
      `}}Ue([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),Ue([l({type:String})],a.prototype,"error",void 0),Ue([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),Ue([l({type:String})],a.prototype,"label",void 0),Ue([l({type:String})],a.prototype,"placeholder",void 0),Ue([l({type:String})],a.prototype,"value",void 0),Ue([l({type:Boolean})],a.prototype,"disabled",void 0),Ue([l({type:Boolean})],a.prototype,"requiredIcon",void 0),Ue([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),window.customElements.define("kuc-mobile-textarea-1-23-1",a),x(er),ao=a})();const tr=`
  kuc-mobile-notification-1-23-1 {
    display: block;
    font-size: 13px;
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
      "Lucida Sans Unicode", Arial, Verdana, sans-serif;
    visibility: hidden;
    animation-fill-mode: forwards;
    position: relative;
    top: -100px;
    left: 0;
  }
  kuc-mobile-notification-1-23-1:lang(es),
  kuc-mobile-notification-1-23-1:lang(es) * {
    font-family: sans-serif;
  }
  kuc-mobile-notification-1-23-1:lang(zh),
  kuc-mobile-notification-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
      Verdana, sans-serif;
  }
  kuc-mobile-notification-1-23-1:lang(zh-TW),
  kuc-mobile-notification-1-23-1:lang(zh-TW) * {
      font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
      Verdana,sans-serif
  }
  .kuc-mobile-notification-fadein-1-23-1 {
    animation-name: kuc-mobile-notification-fade-in-1-23-1;
    animation-duration: 250ms;
    animation-timing-function: ease-out;
    width: 100%;
    position: fixed;
    visibility: visible;
  }

  .kuc-mobile-notification-fadeout-1-23-1 {
    animation-name: kuc-mobile-notification-fade-out-1-23-1;
    animation-duration: 250ms;
    animation-timing-function: ease-out;
    width: 100%;
    position: fixed;
  }

  .kuc-mobile-notification-1-23-1__notification {
    background-color: #ffffcf;
    background: linear-gradient(#ffda4a, #ffc32c);
    width: 100%;
    min-height: 48px;
    z-index: 20;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    text-shadow: rgba(255, 255, 255, 0.5) 0 1px 0;
    color: #333333;
    text-align: center;
    vertical-align: top;
  }

  .kuc-mobile-notification-1-23-1__notification__title {
    display: inline-block;
    vertical-align: middle;
    padding: 17px 44px 11px 44px;
    margin: 0 0 0 -20px;
    text-align: left;
    font-weight: inherit;
    font-family: inherit;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .kuc-mobile-notification-1-23-1__notification__title--html {
    white-space: normal;
  }

  .kuc-mobile-notification-1-23-1__notification__close-button {
    position: absolute;
    right: 0;
    top: 0;
    width: 44px;
    height: 48px;
    padding: 0;
    background-color: transparent;
    border: none;
    vertical-align: middle;
    pointer-events: auto;
    outline: none;
  }
  @keyframes kuc-mobile-notification-fade-in-1-23-1 {
    0% {
      top: -100px;
      left: 0;
    }
    50% {
      top: -50px;
      left: 0;
    }
    100% {
      top: 0;
      left: 0;
    }
  }
  @keyframes kuc-mobile-notification-fade-out-1-23-1 {
    0% {
      visibility: visible;
      top: 0;
      left: 0;
    }
    50% {
      visibility: visible;
      top: -50px;
      left: 0;
    }
    100% {
      top: -100px;
      left: 0;
    }
  }
`;var ut=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let no;(()=>{if(no=window.customElements.get("kuc-mobile-notification-1-23-1"),no)return;class a extends k{constructor(e){super(),this.className="",this.id="",this.text="",this.duration=-1,this.container=document.body,this.content="",this._isOpened=!1,this._content="";const i=S(e);Object.assign(this,i)}_handleClickCloseButton(e){this.close()}_getCloseButtonSvgTemplate(){return C`
      <svg
        height="12"
        width="12"
        viewBox="0 0 512.001 512.001"
        xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="m512.001 84.853-84.853-84.853-171.147 171.147-171.148-171.147-84.853 84.853 171.148 171.147-171.148 171.148 84.853 84.853 171.148-171.147 171.147 171.147 84.853-84.853-171.148-171.148z"/>
          </g>
        </svg>
      `}_setAutoCloseTimer(){this._clearAutoCloseTimer(),!(!Number.isFinite(this.duration)||this.duration<0)&&(this._timeoutID=window.setTimeout(()=>{this.close()},this.duration))}_clearAutoCloseTimer(){this._timeoutID&&window.clearTimeout(this._timeoutID)}open(){if(!this._isValidContainerElement()){document.body.appendChild(this),requestAnimationFrame(()=>{document.body.removeChild(this)}),this.performUpdate();return}this.container.appendChild(this),this.performUpdate(),this.classList.remove("kuc-mobile-notification-fadeout-1-23-1"),this.classList.add("kuc-mobile-notification-fadein-1-23-1"),this._isOpened=!0,this._setAutoCloseTimer()}close(){this._close(),f(this,"close")}_close(){this._isOpened=!1,this.classList.remove("kuc-mobile-notification-fadein-1-23-1"),this.classList.add("kuc-mobile-notification-fadeout-1-23-1"),this._clearAutoCloseTimer()}shouldUpdate(e){if(e.has("container")){if(this.container===null||this.container===void 0)return this._isOpened&&this._close(),!1;const i=this._isValidContainerElement(),o=!i||!document.contains(this.container);if(this._isOpened&&o&&this._close(),!i)return this.throwErrorAfterUpdateComplete(y.CONTAINER.INVALID),!1}return!0}willUpdate(e){(e.has("content")||e.has("text"))&&(this.content!==null&&this.content!==void 0&&this.content!==""?K(this.content)?this._content=_`<div
              class="kuc-mobile-notification-1-23-1__notification__title--html"
            >
              ${Q(this.content)}
            </div>`:this._content=this.content:this._content=this.text)}_isValidContainerElement(){return this.container instanceof HTMLElement}render(){return _`
        <div class="kuc-mobile-notification-1-23-1__notification">
          <pre
            class="kuc-mobile-notification-1-23-1__notification__title"
            aria-live="assertive"
            role="${this._isOpened?"alert":""}"
          ><!---->${this._content}</pre>
          <button
            class="kuc-mobile-notification-1-23-1__notification__close-button"
            type="button"
            aria-label="close"
            @click="${this._handleClickCloseButton}"
          >
            ${this._getCloseButtonSvgTemplate()}
          </button>
        </div>
      `}}ut([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),ut([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),ut([l({type:String})],a.prototype,"text",void 0),ut([l({type:Number})],a.prototype,"duration",void 0),ut([l()],a.prototype,"container",void 0),ut([l()],a.prototype,"content",void 0),ut([v()],a.prototype,"_isOpened",void 0),window.customElements.define("kuc-mobile-notification-1-23-1",a),x(tr),no=a})();const ir=a=>{const t=document.createElement("div");return t.style.cssText=`
  height: 0px;
  overflow: hidden;
  display: inline-block;
  font-size: 14px;
  font-family: ${window.getComputedStyle(a).fontFamily};
  `,t},or=a=>{const t=ir(a),e=a.cloneNode(!0);if(e.hasAttribute("hidden"))return 0;t.appendChild(e),document.body.appendChild(t);const i=t.getBoundingClientRect().width;return document.body.removeChild(t),i},ar=`
kuc-base-mobile-datetime-calendar-header-1-23-1,
kuc-base-mobile-datetime-calendar-header-1-23-1 * {
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
    "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
    "Lucida Sans Unicode", Arial, Verdana, sans-serif;
}
kuc-base-mobile-datetime-calendar-header-1-23-1:lang(zh),
kuc-base-mobile-datetime-calendar-header-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
    Verdana, sans-serif;
}
kuc-base-mobile-datetime-calendar-header-1-23-1:lang(zh-TW),
kuc-base-mobile-datetime-calendar-header-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
    Verdana,sans-serif
}
kuc-base-mobile-datetime-calendar-header-1-23-1:lang(es),
kuc-base-mobile-datetime-calendar-header-1-23-1:lang(es) * {
    font-family: sans-serif;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #e3e7e8;
    padding: 0;
    white-space: nowrap;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    border: 0;
    margin: 0;
    padding: 0;
    min-width: 40px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    text-indent: 100%;
    white-space: nowrap;
    word-wrap: normal;
    cursor: pointer;
    -webkit-appearance: button;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__button-icon {
    vertical-align: middle;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__button:focus {
    outline: none;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__center {
    text-align: center;
    display: flex;
    flex: 1;
    justify-content: center;
    min-width: 186px;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__center
    > :first-child {
    padding-left: 13px;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__month,
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__year {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__month__select,
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__year__select {
    font-size: 14px;
    font-weight: 700;
    padding: 0 22.4px 0 0;
    line-height: 40px;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url("data:image/svg+xml,%3Csvg%0A%20%20%20%20width%3D%2211%22%0A%20%20%20%20height%3D%226%22%0A%20%20%20%20viewBox%3D%220%200%2011%206%22%0A%20%20%20%20fill%3D%22none%22%0A%20%20%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20fill-rule%3D%22evenodd%22%0A%20%20%20%20%20%20clip-rule%3D%22evenodd%22%0A%20%20%20%20%20%20d%3D%22M5.5061%206L0%200L11%200L5.5061%206Z%22%0A%20%20%20%20%20%20fill%3D%22%234b4b4b%22%0A%20%20%20%20%2F%3E%0A%20%20%3C%2Fsvg%3E")
    no-repeat center right 0.6em #ffffff;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__month__select:focus,
.kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__year__select:focus {
    outline: none;
}
.kuc-base-mobile-datetime-calendar-header-1-23-1__month {
    margin: 0 4px 0 4px;
}
`;var ct=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};function nr(a){return a>0&&a<13}function sr(a){return a>=0&&a<1e4}class Ye extends k{constructor(){super(...arguments),this.language="en",this.month=1,this.year=new Date().getFullYear(),this._locale=O("en")}update(t){t.has("language")&&(this._locale=O(this.language)),this._monthOptions=this._generateMonthOptions(),this._yearOptions=this._generateYearOptions(),super.update(t)}render(){return _`
      <div class="kuc-base-mobile-datetime-calendar-header-1-23-1__group">
        <button
          aria-label="previous month"
          type="button"
          class="kuc-base-mobile-datetime-calendar-header-1-23-1__group__button kuc-base-mobile-datetime-calendar-header-1-23-1__group__button--previous-month"
          @click="${this._handleClickCalendarPrevMonthBtn}"
        >
          ${this._getLeftArrowIconSvgTemplate()}
        </button>
        <div class="kuc-base-mobile-datetime-calendar-header-1-23-1__group__center">
          ${this._getYearMonthTemplate()}
        </div>
        <button
          aria-label="next month"
          type="button"
          class="kuc-base-mobile-datetime-calendar-header-1-23-1__group__button kuc-base-mobile-datetime-calendar-header-1-23-1__group__button--next-month"
          @click="${this._handleClickCalendarNextMonthBtn}"
        >
          ${this._getRightArrowIconSvgTemplate()}
        </button>
      </div>
    `}updated(t){t.has("month")&&this._setSelectMonthWidth(this.month),t.has("year")&&this._setYearSelectedIndex(),super.update(t)}_setSelectMonthWidth(t){const e=this._monthOptions[t-1].label;if(!e)return;const i=document.createElement("span");i.innerText=e;const o=or(i);this._selectMonthEl.selectedIndex=this.month-1,this._selectMonthEl.style.width=o+35+"px"}_setYearSelectedIndex(){if(this.year<100){this._selectYearEl.selectedIndex=this.year;return}this._selectYearEl.selectedIndex=100}_generateMonthOptions(){return this._locale.MONTH_SELECT.map((t,e)=>({value:`${e+1}`,label:`${t}`}))}_generateYearOptions(){return this._getYearOptions().map(t=>({value:`${t}`,label:`${t}${this._locale.YEAR_SELECT_POSTFIX}`}))}_getYearOptions(){const t=[];Number.isInteger(this.year)||(this.year=new Date().getFullYear());let e=this.year<100?0:this.year-100;const i=this.year>=9899?9999:this.year+100;for(e>=i&&(e=i-100),e;e<=i;e++)t.push(e);return t}_getYearMonthTemplate(){return this.language==="zh"||this.language==="ja"||this.language==="zh-TW"?_` ${this._getYearTemplate()}${this._getMonthTemplate()} `:_` ${this._getMonthTemplate()}${this._getYearTemplate()} `}_handleChangeMonthDropdown(t){t.stopPropagation(),t.preventDefault();const e=t.target;this.month=parseInt(e.value,10),this._dispatchCalendarHeaderChangeEvent()}_handleChangeYearDropdown(t){t.stopPropagation(),t.preventDefault();const e=t.target;this.year=parseInt(e.value,10),this._dispatchCalendarHeaderChangeEvent()}_handleClickCalendarPrevMonthBtn(t){t.stopPropagation(),this.month===1?(this.month=12,this.year--):this.month-=1,this._dispatchCalendarHeaderChangeEvent()}_handleClickCalendarNextMonthBtn(t){t.stopPropagation(),this.month===12?(this.month=1,this.year++):this.month+=1,this._dispatchCalendarHeaderChangeEvent()}_dispatchCalendarHeaderChangeEvent(){const t=this.year,e=this.month,i={value:`${t}-${e}`};f(this,"kuc:mobile-calendar-header-change",i)}_getOptionsMonthTemplate(){return this._monthOptions.map(t=>_`
        <option
          ?selected="${parseInt(t.value,10)===this.month}"
          value="${t.value}"
        >
          ${t.label}
        </option>
      `)}_getOptionsYearTemplate(){return this._yearOptions.map(t=>_`
        <option
          ?selected="${parseInt(t.value,10)===this.year}"
          value="${t.value}"
        >
          ${t.label}
        </option>
      `)}_getMonthTemplate(){return _`
      <div
        class="kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__month"
      >
        <select
          class="kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__month__select"
          @change="${this._handleChangeMonthDropdown}"
        >
          ${this._getOptionsMonthTemplate()}
        </select>
      </div>
    `}_getYearTemplate(){return _`
      <div
        class="kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__year"
      >
        <select
          class="kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__year__select"
          @change="${this._handleChangeYearDropdown}"
        >
          ${this._getOptionsYearTemplate()}
        </select>
      </div>
    `}_getLeftArrowIconSvgTemplate(){return C`
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.70788 11.9567C9.0984 12.3472 9.0984 12.9804 8.70788 13.3709C8.31735 13.7614 7.68419 13.7614 7.29366 13.3709L2.34392 8.42118L0.929703 7.00696L2.34392 5.59275L7.29366 0.643003C7.68419 0.25248 8.31735 0.25248 8.70788 0.643003C9.0984 1.03353 9.0984 1.66669 8.70788 2.05722L4.68709 6.07801L14.0718 6.07801C14.6241 6.07801 15.0718 6.52572 15.0718 7.07801C15.0718 7.63029 14.6241 8.07801 14.0718 8.07801L4.82917 8.07801L8.70788 11.9567Z"
        fill="#206694"
      />
    </svg>`}_getRightArrowIconSvgTemplate(){return C`
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.29396 2.0572C6.90344 1.66668 6.90344 1.03351 7.29396 0.642991C7.68449 0.252466 8.31765 0.252467 8.70817 0.642991L13.6579 5.59274L15.0721 7.00695L13.6579 8.42117L8.70817 13.3709C8.31765 13.7614 7.68448 13.7614 7.29396 13.3709C6.90344 12.9804 6.90344 12.3472 7.29396 11.9567L11.3148 7.93591L1.93 7.93591C1.37772 7.93591 0.93 7.48819 0.93 6.93591C0.93 6.38362 1.37772 5.93591 1.93 5.93591L11.1727 5.93591L7.29396 2.0572Z"
        fill="#206694"
      />
    </svg>`}}ct([l({type:String,attribute:"lang",reflect:!0})],Ye.prototype,"language",void 0),ct([l({type:Number,hasChanged(a){return nr(a)}})],Ye.prototype,"month",void 0),ct([l({type:Number,hasChanged(a){return sr(a)}})],Ye.prototype,"year",void 0),ct([v()],Ye.prototype,"_monthOptions",void 0),ct([v()],Ye.prototype,"_yearOptions",void 0),ct([g(".kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__month__select")],Ye.prototype,"_selectMonthEl",void 0),ct([g(".kuc-base-mobile-datetime-calendar-header-1-23-1__group__center__year__select")],Ye.prototype,"_selectYearEl",void 0),window.customElements.get("kuc-base-mobile-datetime-calendar-header-1-23-1")||(x(ar),window.customElements.define("kuc-base-mobile-datetime-calendar-header-1-23-1",Ye));const rr=`
kuc-base-mobile-datetime-calendar-body-1-23-1,
kuc-base-mobile-datetime-calendar-body-1-23-1 * {
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
    "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
    "Lucida Sans Unicode", Arial, Verdana, sans-serif;
}

kuc-base-mobile-datetime-calendar-body-1-23-1:lang(zh),
kuc-base-mobile-datetime-calendar-body-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
    Verdana, sans-serif;
}

kuc-base-mobile-datetime-calendar-body-1-23-1:lang(zh-TW),
kuc-base-mobile-datetime-calendar-body-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
    Verdana,sans-serif
}

kuc-base-mobile-datetime-calendar-body-1-23-1:lang(es),
kuc-base-mobile-datetime-calendar-body-1-23-1:lang(es) * {
    font-family: sans-serif;
}

.kuc-base-mobile-datetime-calendar-body-1-23-1__table,
.kuc-base-mobile-datetime-calendar-body-1-23-1__table tr {
    border-collapse: separate;
    border-spacing: 0;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--selected {
    border-spacing: 1px;
    padding: 0px;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date {
    max-width: 40px;
    border-spacing: 1px;
    cursor: pointer;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border: 1px solid #ffffff;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    color: #333333;
    font-size: 14px;
    font-weight: 400;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date
    .kuc-base-mobile-datetime-calendar-body-1-23-1__table__date__button {
    border-spacing: 1px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
    color: #333333;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date,
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--selected,
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__header {
    box-sizing: border-box;
    height: 40px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: 400;
    font-size: 12px;
    color: #333333;
    padding: 0;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date {
    font-size: 14px;
}
th.kuc-base-mobile-datetime-calendar-body-1-23-1__table__header {
    font-weight: 700;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--selected
    .kuc-base-mobile-datetime-calendar-body-1-23-1__table__date__button,
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date
    .kuc-base-mobile-datetime-calendar-body-1-23-1__table__date__button,
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__header {
    box-sizing: border-box;
    border: 1px solid #ffffff;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--selected
    .kuc-base-mobile-datetime-calendar-body-1-23-1__table__date__button,
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date
    .kuc-base-mobile-datetime-calendar-body-1-23-1__table__date__button {
    background: none;
    cursor: pointer;
    max-width: 40px;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--selected {
    border: 1px solid #206694;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--selected
    .kuc-base-mobile-datetime-calendar-body-1-23-1__table__date__button {
    outline: none;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date
    .kuc-base-mobile-datetime-calendar-body-1-23-1__table__date__button:focus-visible {
    outline: none;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--today {
    color: #333333;
    background: #d8d8d8;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--other-month {
    color: #a5a5a5;
}
.kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--selected:focus {
    outline: none;
}
`;var mt=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class dt extends k{constructor(){super(),this.month=1,this.year=2021,this.language="en",this.value="",this._month=1,this._year=2021,this._locale=O("en"),this._handleClickDocument=this._handleClickDocument.bind(this)}connectedCallback(){super.connectedCallback(),setTimeout(()=>{document.addEventListener("click",this._handleClickDocument)},1)}disconnectedCallback(){document.removeEventListener("click",this._handleClickDocument),super.disconnectedCallback()}update(t){if(t.forEach((e,i)=>{i==="language"&&(this._locale=O(this.language))}),t.has("month")&&(this._month=this.month),t.has("year")&&(this._year=this.year),t.has("value")){const{month:e,year:i}=this._separateDateValue();this._month=parseInt(e,10),this._year=parseInt(i,10)}super.update(t)}render(){return _`
      <table class="kuc-base-mobile-datetime-calendar-body-1-23-1__table" role="grid">
        ${this._getHeaderItemsTemplate()}<!--
        -->${this._getDateItemsTemplate()}
      </table>
    `}_handleClickDocument(){f(this,"kuc:mobile-calendar-body-blur",{})}_handleClickDate(t){t.preventDefault(),t.stopPropagation();const e=t.target;e.setAttribute("aria-selected","true");const i=e.getAttribute("data-date");this._dispatchClickEvent(i)}_dispatchClickEvent(t){const e={oldValue:this.value,value:t};f(this,"kuc:mobile-calendar-body-click-date",e),this.value=t}_isToday(t){const e=new Date;return parseInt(t[0],10)===e.getFullYear()&&parseInt(t[1],10)===e.getMonth()+1&&parseInt(t[2],10)===e.getDate()}_separateDateValue(t=this.value){const e=t.split("-");return{day:e[2],month:e[1],year:e[0]}}_getDateClass(t,e){return e?this._isToday(t)?" kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--today":"":" kuc-base-mobile-datetime-calendar-body-1-23-1__table__date--other-month"}_isSameDayOfMoment(t){const e=parseInt(t[1],10),i=parseInt(t[2],10),o=parseInt(t[0],10);let n=new Date().getDate();if(!this.value.split("-")[2])return!1;if(this.value&&(n=new Date(`${this.value}T00:00:00`).getDate()),n===i&&e===this._month)return!0;const r=new Date(o,this._month,0).getDate();return n>r&&r===i&&e===this._month}_getHeaderItemsTemplate(){return _`
      <thead>
        <tr>
          ${this._locale.WEEK_DAYS.map(t=>_`
              <th
                class="kuc-base-mobile-datetime-calendar-body-1-23-1__table__header"
                role="columnheader"
                abbr="${t.abbr}"
              >
                ${t.text}
              </th>
            `)}
        </tr>
      </thead>
    `}_getDateItemsTemplate(){const t=oa(this._year,this._month-1),e=this._locale.MONTH_SELECT[this._month-1];return _`
      <tbody>
        ${t.map(i=>_`
            <tr>
              ${i.map(o=>{const n=o.text.split("-"),s=this._isSameDayOfMoment(n),r=parseInt(n[1],10)===this._month,u=(this.value===o.attr||s)&&r;return _`
                  <td
                    role="gridcell"
                    tabindex="${u?0:-1}"
                    aria-selected="${this.value===o.attr}"
                    aria-current="${this._isToday(n)?"date":!1}"
                    class="kuc-base-mobile-datetime-calendar-body-1-23-1__table__date${u?"--selected":""}${this._getDateClass(n,r)}"
                    data-date="${o.attr}"
                    aria-label="${n[2]} ${e}"
                    @click="${this._handleClickDate}"
                  >
                    ${n[2]||""}
                  </td>
                `})}
            </tr>
          `)}
      </tbody>
    `}}mt([l({type:Number})],dt.prototype,"month",void 0),mt([l({type:Number})],dt.prototype,"year",void 0),mt([l({type:String,attribute:"lang",reflect:!0})],dt.prototype,"language",void 0),mt([l({type:String,reflect:!0})],dt.prototype,"value",void 0),mt([v()],dt.prototype,"_month",void 0),mt([v()],dt.prototype,"_year",void 0),window.customElements.get("kuc-base-mobile-datetime-calendar-body-1-23-1")||(x(rr),window.customElements.define("kuc-base-mobile-datetime-calendar-body-1-23-1",dt));const lr=`
kuc-base-mobile-datetime-calendar-footer-1-23-1,
kuc-base-mobile-datetime-calendar-footer-1-23-1 * {
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
    "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
    "Lucida Sans Unicode", Arial, Verdana, sans-serif;
}

kuc-base-mobile-datetime-calendar-footer-1-23-1:lang(zh),
kuc-base-mobile-datetime-calendar-footer-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
    Verdana, sans-serif;
}
kuc-base-mobile-datetime-calendar-footer-1-23-1:lang(zh-TW),
kuc-base-mobile-datetime-calendar-footer-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
    Verdana,sans-serif
}
kuc-base-mobile-datetime-calendar-footer-1-23-1:lang(es),
kuc-base-mobile-datetime-calendar-footer-1-23-1:lang(es) * {
    font-family: sans-serif;
}
.kuc-base-mobile-datetime-calendar-footer-1-23-1__group {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0;
    white-space: nowrap;
}
.kuc-base-mobile-datetime-calendar-footer-1-23-1__group__button {
    background: transparent;
    border: 1px solid transparent;
    color: #206694;
    height: 40px;
    cursor: pointer;
    font-size: 14px;
    outline: none;
    padding: 0;
    margin: 0;
    font-weight: 700;
}
.kuc-base-mobile-datetime-calendar-footer-1-23-1__group__center {
    width: 100%;
}
`;var va=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class so extends k{constructor(){super(...arguments),this.language="en",this._locale=O("en")}update(t){t.has("language")&&(this._locale=O(this.language)),super.update(t)}_handleClickCalendarFooterButtonClose(t){t.stopPropagation(),f(this,"kuc:mobile-calendar-footer-click-close")}_handleClickCalendarFooterButtonNone(t){t.stopPropagation(),f(this,"kuc:mobile-calendar-footer-click-none")}_handleClickCalendarFooterButtonToday(t){t.stopPropagation(),f(this,"kuc:mobile-calendar-footer-click-today")}render(){return _`
      <div class="kuc-base-mobile-datetime-calendar-footer-1-23-1__group">
        <button
          type="button"
          class="kuc-base-mobile-datetime-calendar-footer-1-23-1__group__button kuc-base-mobile-datetime-calendar-footer-1-23-1__group__button--today"
          @click="${this._handleClickCalendarFooterButtonToday}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.today}
        </button>
        <button
          type="button"
          class="kuc-base-mobile-datetime-calendar-footer-1-23-1__group__button kuc-base-mobile-datetime-calendar-footer-1-23-1__group__button--none"
          @click="${this._handleClickCalendarFooterButtonNone}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.none}
        </button>
        <button
          type="button"
          class="kuc-base-mobile-datetime-calendar-footer-1-23-1__group__button kuc-base-mobile-datetime-calendar-footer-1-23-1__group__button--close"
          @click="${this._handleClickCalendarFooterButtonClose}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.close}
        </button>
      </div>
    `}}va([l({type:String,attribute:"lang",reflect:!0})],so.prototype,"language",void 0),va([v()],so.prototype,"_locale",void 0),window.customElements.get("kuc-base-mobile-datetime-calendar-footer-1-23-1")||(x(lr),window.customElements.define("kuc-base-mobile-datetime-calendar-footer-1-23-1",so));const ur=`
.kuc-base-mobile-datetime-calendar-1-23-1__group {
    display: inline-block;
    box-sizing: border-box;
    width: 290px;
    padding: 0 10px;
    background: #ffffff;
    text-align: center;
    font-size: 13px;
    border: 1px solid #d8d8d8;
}
`;var ci=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class Ot extends k{constructor(){super(...arguments),this.language="en",this.value="",this._month=1,this._year=new Date().getFullYear()}update(t){t.has("value")&&this._updateValue(),super.update(t)}render(){return _`
      <div
        class="kuc-base-mobile-datetime-calendar-1-23-1__group"
        role="dialog"
        aria-modal="true"
        aria-label="Calender"
        @click="${this._handleClickCalendarGroup}"
      >
        <kuc-base-mobile-datetime-calendar-header-1-23-1
          .year="${this._year}"
          .month="${this._month}"
          .language="${this.language}"
          @kuc:mobile-calendar-header-change="${this._handleCalendarHeaderChange}"
        ></kuc-base-mobile-datetime-calendar-header-1-23-1>
        <kuc-base-mobile-datetime-calendar-body-1-23-1
          .year="${this._year}"
          .month="${this._month}"
          .value="${this.value}"
          .language="${this.language}"
        ></kuc-base-mobile-datetime-calendar-body-1-23-1>
        <kuc-base-mobile-datetime-calendar-footer-1-23-1
          .language="${this.language}"
        ></kuc-base-mobile-datetime-calendar-footer-1-23-1>
      </div>
    `}updated(t){super.updated(t)}_handleClickCalendarGroup(t){t.stopPropagation()}_handleCalendarHeaderChange(t){const{year:e,month:i}=this._separateValue(t.detail.value);this._year=e,this._month=i}_updateValue(){this.value===""&&(this.value=Ge().slice(0,7)+"-01");const{year:t,month:e}=this._separateValue(this.value);this._year=t,this._month=e}_separateValue(t){const e=t.split("-");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}}ci([l({type:String,attribute:"lang",reflect:!0})],Ot.prototype,"language",void 0),ci([l({type:String,reflect:!0})],Ot.prototype,"value",void 0),ci([v()],Ot.prototype,"_month",void 0),ci([v()],Ot.prototype,"_year",void 0),window.customElements.get("kuc-base-mobile-datetime-calendar-1-23-1")||(x(ur),window.customElements.define("kuc-base-mobile-datetime-calendar-1-23-1",Ot));const cr=`
kuc-mobile-base-date-1-23-1,
kuc-mobile-base-date-1-23-1 * {
    font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
    "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
    "Lucida Sans Unicode", Arial, Verdana, sans-serif;
}
kuc-mobile-base-date-1-23-1:lang(zh),
kuc-mobile-base-date-1-23-1:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
    Verdana, sans-serif;
}
kuc-mobile-base-date-1-23-1:lang(zh-TW),
kuc-mobile-base-date-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
    Verdana,sans-serif
}
kuc-mobile-base-date-1-23-1:lang(es),
kuc-mobile-base-date-1-23-1:lang(es) * {
    font-family: sans-serif;
}
.kuc-mobile-base-date-1-23-1__group {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 5.148px;
    background-color: #ffffff;
}
.kuc-mobile-base-date-1-23-1__group__input[aria-required="true"] {
    border-color: #cf4a38;
}
input.kuc-mobile-base-date-1-23-1__group__input {
    color: #000000;
    width: 100%;
    height: 31.28px;
    font-size: 99%;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    padding: 5.148px;
    border-radius: 5.148px;
    box-shadow: 0px 1px 0px #ffffff, inset 0px 2px 3px #dadada;
    border: 1px solid #b3b3b3;
    font-weight: 400;
    -webkit-appearance: none;
    appearance: none;
    outline: 0;
    background: transparent;
    box-sizing: border-box;
}
.kuc-mobile-base-date-1-23-1__group--disabled {
    background-color: #d5d7d9;
    opacity: 1;
}
.kuc-mobile-base-date-1-23-1__group--disabled input {
    color: #999999;
    -webkit-text-fill-color: #999999;
}
.kuc-base-mobile-date-1-23-1__calendar {
    position: absolute;
    left: 0;
    top: 39px;
    z-index: 1000;
}
.kuc-mobile-base-date-1-23-1__group__button {
    position: absolute;
    display: flex;
    right: 10px;
    background-color: transparent;
    border: 0;
    padding: 0;
    height: 100%;
    align-items: center;
}
`;var $e=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class xe extends k{constructor(){super(...arguments),this.inputId="",this.language="en",this.value="",this.disabled=!1,this.inputAriaInvalid=!1,this.required=!1,this._dateTimeCalendarVisible=!1,this._calendarValue="",this._inputValue=""}update(t){t.has("inputId")&&(this._GUID=this.inputId),(t.has("value")||t.has("language"))&&this._updateValueProp(),super.update(t)}render(){return _`
      <div class="kuc-mobile-base-date-1-23-1__group${this._getGroupClass()}">
        <input
          class="kuc-mobile-base-date-1-23-1__group__input"
          type="text"
          id="${this._GUID}-label"
          readonly="readonly"
          .value="${this._inputValue}"
          aria-label="Date"
          aria-describedby="${this._GUID}-error"
          aria-invalid="${this.inputAriaInvalid}"
          aria-required="${this.required}"
          ?disabled="${this.disabled}"
          @click="${this._handleClickOpenCalendar}"
        />
        <button
          type="button"
          class="kuc-mobile-base-date-1-23-1__group__button"
          aria-label="calendar"
          @click="${this._handleClickOpenCalendar}"
          ?disabled="${this.disabled}"
        >
          ${this._getCalendarIconTemplate()}
        </button>
        ${this._getCalendarTemplate()}
      </div>
    `}updated(t){this._dateTimeCalendarVisible&&this._setCalendarPosition(),super.updated(t)}_setCalendarPosition(){const{inputToBottom:e,inputToTop:i}=Vt(this),o=this._inputEl.getBoundingClientRect().height;e>=i||(this._calendarEl.style.bottom=o+2+"px",this._calendarEl.style.top="auto")}_getGroupClass(){let t="";return this.disabled&&(t+=" kuc-mobile-base-date-1-23-1__group--disabled"),this.required&&(t+=" kuc-mobile-base-date-1-23-1__group--required"),t}_handleClickOpenCalendar(t){if(this._dateTimeCalendarVisible){t.preventDefault(),t.stopPropagation();return}this._calendarValue=this._getNewCalendarValue(this._inputValue||""),this._openCalendar()}_updateValueProp(){if(this.value){this._inputValue=sa(this.language,this.value),this._calendarValue=this.value;return}const t=Ge();this._inputValue="",this._calendarValue=this._calendarValue?this._calendarValue.slice(0,7)+"-01":t.slice(0,7)}_getNewCalendarValue(t){if(ra(this.language,t))return Ci(this.language,t);let e=this._calendarValue.slice(0,7);return t===""&&(e=this._calendarValue.slice(0,7)+"-01"),e}_closeCalendar(){this._dateTimeCalendarVisible=!1}_openCalendar(){this._dateTimeCalendarVisible=!0}_handleClickCalendarClickDate(t){this._closeCalendar(),t.detail.oldValue=this.value,t.detail.oldValue!==t.detail.value&&(this.value=t.detail.value,f(this,"kuc:mobile-base-date-change",t.detail),this._btnToggleEl.focus())}_handleClickCalendarFooterButtonNone(){this._closeCalendar(),this._inputValue="";let t=this.value?this.value.slice(0,7)+"-01":"";t||(t=this._calendarValue.slice(0,7)+"-01"),this._calendarValue=t,this._dispathDateChangeCustomEvent("")}_handleClickCalendarFooterButtonToday(){this._closeCalendar();const t=Ge();this._dispathDateChangeCustomEvent(t)}_handleClickCalendarFooterButtonClose(){this._closeCalendar(),this._btnToggleEl.focus()}_handleCalendarBlurBody(t){t.preventDefault(),this._dateTimeCalendarVisible=!1}_dispathDateChangeCustomEvent(t){const e={value:t,oldValue:this.value};this.value=t,f(this,"kuc:mobile-base-date-change",e),this._btnToggleEl.focus()}_getCalendarTemplate(){return this._dateTimeCalendarVisible?_`
          <kuc-base-mobile-datetime-calendar-1-23-1
            class="kuc-base-mobile-date-1-23-1__calendar"
            .language="${this.language}"
            .value="${this._calendarValue}"
            ?hidden="${!this._dateTimeCalendarVisible}"
            @kuc:mobile-calendar-body-click-date="${this._handleClickCalendarClickDate}"
            @kuc:mobile-calendar-footer-click-none="${this._handleClickCalendarFooterButtonNone}"
            @kuc:mobile-calendar-footer-click-today="${this._handleClickCalendarFooterButtonToday}"
            @kuc:mobile-calendar-footer-click-close="${this._handleClickCalendarFooterButtonClose}"
            @kuc:mobile-calendar-body-blur="${this._handleCalendarBlurBody}"
          >
          </kuc-base-mobile-datetime-calendar-1-23-1>
        `:""}_getCalendarIconTemplate(){return _`
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 4C9.44772 4 9 4.44772 9 5V6H6C4.89543 6 4 6.89543 4 8V21C4 22.1046 4.89543 23 6 23H22C23.1046 23 24 22.1046 24 21V8C24 6.89543 23.1046 6 22 6H19V5C19 4.44772 18.5523 4 18 4C17.4477 4 17 4.44772 17 5V6H11V5C11 4.44772 10.5523 4 10 4ZM9 8V9C9 9.55228 9.44772 10 10 10C10.5523 10 11 9.55228 11 9V8H17V9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9V8H22V11H6V8H9ZM6 13V21H22V13H6Z"
          fill="#4b4b4b"
        />
      </svg>
    `}}$e([l({type:String})],xe.prototype,"inputId",void 0),$e([l({type:String,attribute:"lang",reflect:!0})],xe.prototype,"language",void 0),$e([l({type:String,reflect:!0})],xe.prototype,"value",void 0),$e([l({type:Boolean})],xe.prototype,"disabled",void 0),$e([l({type:Boolean})],xe.prototype,"inputAriaInvalid",void 0),$e([l({type:Boolean})],xe.prototype,"required",void 0),$e([g(".kuc-mobile-base-date-1-23-1__group__button")],xe.prototype,"_btnToggleEl",void 0),$e([g(".kuc-mobile-base-date-1-23-1__group__input")],xe.prototype,"_inputEl",void 0),$e([g(".kuc-base-mobile-date-1-23-1__calendar")],xe.prototype,"_calendarEl",void 0),$e([v()],xe.prototype,"_dateTimeCalendarVisible",void 0),window.customElements.get("kuc-mobile-base-date-1-23-1")||(x(cr),window.customElements.define("kuc-mobile-base-date-1-23-1",xe));const dr=`
kuc-mobile-date-picker-1-23-1,
kuc-mobile-date-picker-1-23-1 * {
  color: #333333;
  font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
    "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
    "Lucida Sans Unicode", Arial, Verdana, sans-serif;
}
kuc-mobile-date-picker-1-23-1:lang(zh),
kuc-mobile-date-picker-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
    Verdana, sans-serif;
}
kuc-mobile-date-picker-1-23-1:lang(zh-TW),
kuc-mobile-date-picker-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
    Verdana,sans-serif
}
kuc-mobile-date-picker-1-23-1:lang(es),
kuc-mobile-date-picker-1-23-1:lang(es) * {
    font-family: sans-serif;
}
kuc-mobile-date-picker-1-23-1 {
  font-size: 13px;
  color: #333333;
  display: inline-table;
  vertical-align: top;
  width: 100%;
}
kuc-mobile-date-picker-1-23-1[hidden] {
  display: none;
}
.kuc-mobile-date-picker-1-23-1__group {
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0px;
  height: auto;
  margin: 0px;
}
.kuc-mobile-date-picker-1-23-1__group__label {
  display: inline-block;
  font-weight: bold;
  line-height: 1.5;
  padding: 0px;
  white-space: nowrap;
  margin: 0 0 4px 0;
}
.kuc-mobile-date-picker-1-23-1__group__base__date {
  width: 130px;
  margin-right: 0.5em;
  margin-left: 0.5em;
}
.kuc-mobile-date-picker-1-23-1__group__label[hidden] {
  display: none;
}
.kuc-mobile-date-picker-1-23-1__group input.kuc-base-date-1-23-1__input {
  width: 100px;
  height: 40px;
  padding: 0px;
  text-align: center;
  border: 1px solid #e3e7e8;
  box-sizing: border-box;
  font-size: 14px;
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
}

.kuc-mobile-date-picker-1-23-1__group input.kuc-base-date-1-23-1__input:focus {
  outline: none;
  border: 1px solid #3498db;
}
.kuc-mobile-date-picker-1-23-1__group input.kuc-base-date-1-23-1__input--focus {
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
  border: 1px solid #3498db;
  background-color: #ffffff;
  color: #333333;
}
.kuc-mobile-date-picker-1-23-1__group input.kuc-base-date-1-23-1__input:disabled {
  color: #888888;
  background-color: #d4d7d7;
  box-shadow: none;
  cursor: not-allowed;
}
`;var Le=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let ro;(()=>{if(ro=window.customElements.get("kuc-mobile-date-picker-1-23-1"),ro)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.disabled=!1,this.requiredIcon=!1,this.language="auto",this.value="",this.visible=!0,this._dateConverted="",this._inputValue="",this._GUID=D();const i=S(e);Object.assign(this,i)}shouldUpdate(e){return this.value===void 0||this.value===""?!0:da(this.value)?(this._dateConverted=Jt(this.value),this._dateConverted!==""&&!Oe(this._dateConverted)?(this.throwErrorAfterUpdateComplete(G.VALUE),!1):!0):(this.throwErrorAfterUpdateComplete(G.VALUE),!1)}willUpdate(e){e.has("value")&&this.value!==void 0&&this.value!==""&&(this.value=this._dateConverted)}update(e){e.has("value")&&this._updateInputValue(),super.update(e)}render(){return _`
        <div class="kuc-mobile-date-picker-1-23-1__group">
          <label
            class="kuc-mobile-date-picker-1-23-1__group__label"
            for="${this._GUID}-label"
            @click="${this._handleClickLabel}"
            ?hidden="${!this.label}"
          >
            <kuc-base-mobile-label-1-23-1
              .requiredIcon="${this.requiredIcon}"
              .text="${this.label}"
            ></kuc-base-mobile-label-1-23-1>
          </label>
          <kuc-mobile-base-date-1-23-1
            class="kuc-mobile-date-picker-1-23-1__group__base__date"
            .disabled="${this.disabled}"
            .value="${this._inputValue}"
            .inputId="${this._GUID}"
            .inputAriaInvalid="${this.error!==""}"
            .required="${this.requiredIcon}"
            .language="${this._getLanguage()}"
            @kuc:mobile-base-date-change="${this._handleDateChange}"
          >
          </kuc-mobile-base-date-1-23-1>
          <kuc-base-mobile-error-1-23-1 .guid="${this._GUID}" .text="${this.error}">
          </kuc-base-mobile-error-1-23-1>
        </div>
      `}_updateInputValue(){if(this.value===void 0||this.value===""){this._inputValue="";return}this._inputValue=this.value}_getLanguage(){const e=["en","ja","zh","zh-TW","es"];return e.indexOf(this.language)!==-1?this.language:e.indexOf(document.documentElement.lang)!==-1?document.documentElement.lang:"en"}_handleClickLabel(e){e.preventDefault()}_handleDateChange(e){e.stopPropagation(),e.preventDefault();const i={oldValue:this.value,value:""};this.value=e.detail.value,i.value=this.value,this._dispatchChangeEvent(i)}_dispatchChangeEvent(e){f(this,"change",e)}}Le([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),Le([l({type:String})],a.prototype,"error",void 0),Le([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),Le([l({type:String})],a.prototype,"label",void 0),Le([l({type:Boolean})],a.prototype,"disabled",void 0),Le([l({type:Boolean})],a.prototype,"requiredIcon",void 0),Le([l({type:String,attribute:"lang",reflect:!0,converter:ot})],a.prototype,"language",void 0),Le([l({type:String})],a.prototype,"value",void 0),Le([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),Le([v()],a.prototype,"_inputValue",void 0),window.customElements.define("kuc-mobile-date-picker-1-23-1",a),x(dr),ro=a})();const hr=`
kuc-mobile-time-picker-1-23-1,
kuc-mobile-time-picker-1-23-1 * {
  font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
  "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
  "Lucida Sans Unicode", Arial, Verdana, sans-serif;
}
kuc-mobile-time-picker-1-23-1:lang(zh),
kuc-mobile-time-picker-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
  Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
  Verdana, sans-serif;
}
kuc-mobile-time-picker-1-23-1:lang(zh-TW),
kuc-mobile-time-picker-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黒體", "Microsoft JhengHei", "新宋体", NSimSun, STHeiti,
  Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
  Verdana, sans-serif
}
kuc-mobile-time-picker-1-23-1:lang(es),
kuc-mobile-time-picker-1-23-1:lang(es) * {
  font-family: sans-serif;
}
kuc-mobile-time-picker-1-23-1 {
  font-size: 13px;
  display: inline-block;
  vertical-align: top;
  width: 100%;
}
kuc-mobile-time-picker-1-23-1[hidden] {
  display: none;
}
.kuc-mobile-time-picker-1-23-1__group__label {
  display: inline-block;
  font-weight: bold;
  line-height: 1.5;
  padding: 0px;
  margin: 0 0 4px 0;
  white-space: nowrap;
}
.kuc-mobile-time-picker-1-23-1__group__label[hidden] {
  display: none;
}
.kuc-base-mobile-time-1-23-1__group__wrapper {
  padding-left: 0.5em;
  max-width: 10px;
}
`,_r=`
kuc-base-mobile-time-1-23-1,
kuc-base-mobile-time-1-23-1 * {
  font-size: 13px;
  font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
  "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
  "Lucida Sans Unicode", Arial, Verdana, sans-serif;
}

kuc-base-mobile-time-1-23-1:lang(zh),
kuc-base-mobile-time-1-23-1:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
  Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
  Verdana, sans-serif;
}

kuc-base-mobile-time-1-23-1:lang(zh-TW),
kuc-base-mobile-time-1-23-1:lang(zh-TW) * {
  font-family: "微軟正黒體", "Microsoft JhengHei", "新宋体", NSimSun, STHeiti,
  Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
  Verdana, sans-serif
}

kuc-base-mobile-time-1-23-1:lang(es),
kuc-base-mobile-time-1-23-1:lang(es) * {
  font-family: sans-serif;
}

kuc-base-mobile-time-1-23-1 {
  width: 100%;
  display: inline-block;
  vertical-align: top;
}

kuc-base-mobile-time-1-23-1[hidden] {
  display: none;
}

.kuc-base-mobile-time-1-23-1__group {
  padding: 0;
  margin: 0;
  height: 31.28px;
  border: 1px solid #b3b3b3;
  border-radius: 5.2px;
  box-sizing: border-box;
  background-color: #ffffff;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  box-shadow: 0px 1px 0px #ffffff, inset 0px 2px 3px #dadada;
}

.kuc-base-mobile-time-1-23-1__group--required {
  border-color: #cf4a38;
}

.kuc-base-mobile-time-1-23-1__group__hours {
  padding: 5.148px 7.722px;
}

.kuc-base-mobile-time-1-23-1__group__minutes {
  padding: 5.148px 7.722px;
  -webkit-flex-grow: 1;
  flex-grow: 1;
}

.kuc-base-mobile-time-1-23-1__group__hours,
.kuc-base-mobile-time-1-23-1__group__minutes {
  font-size: 99%;
  height: 100%;
  color: #000000;
  border: none;
  border-radius: 5.148px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
}

.kuc-base-mobile-time-1-23-1__group__colon {
  color: #000000;
}

.kuc-base-mobile-time-1-23-1__group__hours:disabled
+ .kuc-base-mobile-time-1-23-1__group__colon {
  color: #999999;
  -webkit-text-fill-color: #999999;
  opacity: 1;
}

.kuc-base-mobile-time-1-23-1__group--disabled {
  color: #999999;
  -webkit-text-fill-color: #999999;
  background-color: #d5d7d9;
  opacity: 1;
}

.kuc-base-mobile-time-1-23-1__group__hours:disabled,
.kuc-base-mobile-time-1-23-1__group__minutes:disabled {
  color: #999999;
  -webkit-text-fill-color: #999999;
  opacity: 1;
}

.kuc-base-mobile-time-1-23-1__group__hours:focus {
  outline: none;
}

.kuc-base-mobile-time-1-23-1__group__minutes:focus {
  outline: none;
}
`;var J=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};class q extends k{constructor(t){super(),this.guid="",this.language="en",this.value="",this.disabled=!1,this.hour12=!1,this.required=!1,this._timeStep=1,this._hours="",this._minutes="",this._suffix="",this._locale=O("en");const e=S(t);Object.assign(this,e)}update(t){t.has("language")&&(this._locale=O(this.language)),t.has("hour12")&&(this._hourOptions=jn(this.hour12)),t.has("_timeStep")&&(this._minuteOptions=zn(this._timeStep)),super.update(t)}render(){return _`
      <fieldset
        class="kuc-base-mobile-time-1-23-1__group${this.disabled?" kuc-base-mobile-time-1-23-1__group--disabled":""}${this.required?" kuc-base-mobile-time-1-23-1__group--required":""}"
        aria-label="label-text"
      >
        <select
          class="kuc-base-mobile-time-1-23-1__group__hours"
          aria-label="Hour"
          aria-describedby="${this.guid}-error"
          ?disabled="${this.disabled}"
          @change="${this._handleChangeHours}"
        >
          <option value selected></option>
          ${this._getOptionsHourTemplate()}
        </select>
        <span class="kuc-base-mobile-time-1-23-1__group__colon">:</span>
        <select
          class="kuc-base-mobile-time-1-23-1__group__minutes"
          aria-label="Minute"
          aria-describedby="${this.guid}-error"
          ?disabled="${this.disabled}"
          @change="${this._handleChangeMinutes}"
        >
          <option value selected></option>
          ${this._getOptionsMinuteTemplate()}
        </select>
      </fieldset>
    `}updated(t){t.has("value")&&this._updateInputValue(),super.update(t)}_updateInputValue(){const t=Hn(this.value,this.hour12);this._hours=t.hours,this._minutes=t.minutes,this._suffix=t.suffix||"",this._setValueToInput(t)}_setValueToInput(t){if(this._minutesEl.value=t.minutes,t.suffix){this._hoursEl.value=t.suffix+" "+t.hours;return}this._hoursEl.value=t.hours}_handleChangeMinutes(t){t.preventDefault(),t.stopPropagation();const e=this._getTimeValueString(),o=t.target.value;this._minutes=o;const n=this._getTimeValueString();this.value=n,this._dispatchEventTimeChange(n,e)}_handleChangeHours(t){t.preventDefault(),t.stopPropagation();const e=this._getTimeValueString(),o=t.target.value.split(" ");o.length===2?(this._hours=o[1],this._suffix=o[0]):(this._hours=o[0],this._suffix="");const n=this._getTimeValueString();this.value=n,this._dispatchEventTimeChange(n,e)}_getTimeValueString(){const t=`${this._hours}:${this._minutes}`;return this._suffix?Dt(`${t} ${this._suffix}`):Dt(t)}_dispatchEventTimeChange(t,e){const i=t===":"?"":t,n={value:i,oldValue:e===":"?"":e};n.error=at(i)?"":this._locale.INVALID_TIME_FORMAT,f(this,"kuc:base-mobile-time-change",n)}_getOptionsMinuteTemplate(){return this._minuteOptions.map(t=>_` <option value="${t.value}">${t.label}</option> `)}_getOptionsHourTemplate(){return this._hourOptions.map(t=>_` <option value="${t.value}">${t.label}</option> `)}}J([l({type:String})],q.prototype,"guid",void 0),J([l({type:String,attribute:"lang",reflect:!0})],q.prototype,"language",void 0),J([l({type:String})],q.prototype,"value",void 0),J([l({type:Boolean})],q.prototype,"disabled",void 0),J([l({type:Boolean})],q.prototype,"hour12",void 0),J([l({type:Boolean})],q.prototype,"required",void 0),J([v()],q.prototype,"_timeStep",void 0),J([v()],q.prototype,"_hours",void 0),J([v()],q.prototype,"_minutes",void 0),J([v()],q.prototype,"_suffix",void 0),J([v()],q.prototype,"_hourOptions",void 0),J([v()],q.prototype,"_minuteOptions",void 0),J([g(".kuc-base-mobile-time-1-23-1__group__hours")],q.prototype,"_hoursEl",void 0),J([g(".kuc-base-mobile-time-1-23-1__group__minutes")],q.prototype,"_minutesEl",void 0),window.customElements.get("kuc-base-mobile-time-1-23-1")||(x(_r),window.customElements.define("kuc-base-mobile-time-1-23-1",q));var ge=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let lo;(()=>{if(lo=window.customElements.get("kuc-mobile-time-picker-1-23-1"),lo)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.language="auto",this.value="",this.disabled=!1,this.hour12=!1,this.requiredIcon=!1,this.visible=!0,this._inputValue="",this._errorFormat="",this._isSelectError=!1,this._GUID=D();const i=S(e);Object.assign(this,i)}shouldUpdate(e){return this.value===void 0||this.value===""||at(this.value)?!0:(this.throwErrorAfterUpdateComplete(G.VALUE),!1)}willUpdate(){this.value===void 0||this.value===""||(this.value=Be(this.value))}update(e){e.has("value")&&!this._isSelectError&&(this.value===void 0?this._inputValue="":this._inputValue=this.value||"",this._errorFormat=""),super.update(e)}render(){return _`
        <div class="kuc-mobile-time-picker-1-23-1__group">
          <label
            class="kuc-mobile-time-picker-1-23-1__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-mobile-label-1-23-1
              .guid="${this._GUID}"
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-mobile-label-1-23-1>
          </label>
          <div class="kuc-base-mobile-time-1-23-1__group__wrapper">
            <kuc-base-mobile-time-1-23-1
              .value="${this._inputValue}"
              .disabled="${this.disabled}"
              .hour12="${this.hour12}"
              .guid="${this._GUID}"
              .language="${this._getLanguage()}"
              .required="${this.requiredIcon}"
              @kuc:base-mobile-time-change="${this._handleTimeChange}"
            ></kuc-base-mobile-time-1-23-1>
          </div>
          <kuc-base-mobile-error-1-23-1
            .guid="${this._GUID}"
            .text="${this._errorFormat||this.error}"
            ariaLive="assertive"
          ></kuc-base-mobile-error-1-23-1>
        </div>
      `}updated(){this._isSelectError=!1}_handleTimeChange(e){e.preventDefault(),e.stopPropagation();const i={value:e.detail.value,oldValue:this.value};if(this._inputValue=e.detail.value,e.detail.error){this._isSelectError=!0,this._errorFormat=e.detail.error,this.value=void 0,i.value=void 0,this.error="",f(this,"change",i);return}this._isSelectError=!1,this._errorFormat="",this.value=e.detail.value,f(this,"change",i)}_getLanguage(){const e=["en","ja","zh","zh-TW","es"];return e.indexOf(this.language)!==-1?this.language:e.indexOf(document.documentElement.lang)!==-1?document.documentElement.lang:"en"}}ge([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),ge([l({type:String})],a.prototype,"error",void 0),ge([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),ge([l({type:String})],a.prototype,"label",void 0),ge([l({type:String,attribute:"lang",reflect:!0,converter:ot})],a.prototype,"language",void 0),ge([l({type:String,hasChanged(t,e){return(t===""||t===void 0)&&t===e?!0:t!==e}})],a.prototype,"value",void 0),ge([l({type:Boolean})],a.prototype,"disabled",void 0),ge([l({type:Boolean})],a.prototype,"hour12",void 0),ge([l({type:Boolean})],a.prototype,"requiredIcon",void 0),ge([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),ge([v()],a.prototype,"_inputValue",void 0),ge([v()],a.prototype,"_errorFormat",void 0),window.customElements.define("kuc-mobile-time-picker-1-23-1",a),x(hr),lo=a})();const pr=`
kuc-mobile-datetime-picker-1-23-1,
kuc-mobile-datetime-picker-1-23-1 * {
color: #333333;
font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
    "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
    "Lucida Sans Unicode", Arial, Verdana, sans-serif;
}
kuc-mobile-datetime-picker-1-23-1:lang(zh),
kuc-mobile-datetime-picker-1-23-1:lang(zh) * {
font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
    Verdana, sans-serif;
}
kuc-mobile-datetime-picker-1-23-1:lang(zh-TW),
kuc-mobile-datetime-picker-1-23-1:lang(zh-TW) * {
    font-family: "微軟正黒體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC","Lucida Grande","Lucida Sans Unicode",Arial,
    Verdana,sans-serif
}
kuc-mobile-datetime-picker-1-23-1:lang(es),
kuc-mobile-datetime-picker-1-23-1:lang(es) * {
    font-family: sans-serif;
}
kuc-mobile-datetime-picker-1-23-1 {
font-size: 13px;
color: #333333;
display: inline-table;
vertical-align: top;
width: 100%;
}
kuc-mobile-datetime-picker-1-23-1[hidden] {
display: none;
}
.kuc-mobile-datetime-picker-1-23-1__group {
border: 0;
padding: 0;
}
.kuc-mobile-datetime-picker-1-23-1__group__label {
display: inline-block;
font-weight: bold;
line-height: 1.5;
padding: 0px;
white-space: nowrap;
margin: 0 0 4px 0;
}
.kuc-mobile-datetime-picker-1-23-1__group__label[hidden] {
display: none;
}
.kuc-mobile-datetime-picker-1-23-1__group__input {
display: flex;
align-items: center;
margin-right: 0.5em;
margin-left: 0.5em;
}
.kuc-mobile-datetime-picker-1-23-1__group__input--date {
width: 130px;
margin-right: 10px;
}
.kuc-mobile-datetime-picker-1-23-1__group__input--time {
max-width: 10px;
}
`;var X=function(a,t,e,i){var o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,e,i);else for(var r=a.length-1;r>=0;r--)(s=a[r])&&(n=(o<3?s(n):o>3?s(t,e,n):s(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};let uo;(()=>{if(uo=window.customElements.get("kuc-mobile-datetime-picker-1-23-1"),uo)return;class a extends k{constructor(e){super(),this.className="",this.error="",this.id="",this.label="",this.language="auto",this.value="",this.disabled=!1,this.hour12=!1,this.requiredIcon=!1,this.visible=!0,this._dateConverted="",this._changeDateByUI=!1,this._changeTimeByUI=!1,this._previousTimeValue="",this._previousDateValue="",this._dateValue="",this._timeValue="",this._errorFormat="",this._errorText="",this._GUID=D();const i=S(e);Object.assign(this,i)}shouldUpdate(e){return this.value===void 0||this.value===""?!0:typeof this.value!="string"?(this.throwErrorAfterUpdateComplete(G.VALUE),!1):(this._dateAndTime=this._getDateTimeValue(this.value),this._dateConverted=Jt(this._dateAndTime.date),_a(this._dateAndTime.date,this._dateAndTime.time)&&Oe(this._dateConverted)?!0:(this.throwErrorAfterUpdateComplete(G.VALUE),!1))}willUpdate(e){if(this._changeDateByUI||this._changeTimeByUI){this._updateValueAndErrorWhenUIChange();return}this._errorFormat="",this._updateErrorText(),this._updateValueWhenSetter()}update(e){e.has("value")&&(this.value===void 0&&this._setUndefinedValue(),this.value===""&&this._setEmptyValue()),super.update(e)}_updateValueWhenSetter(){if(this._errorFormat="",this.value===""||this.value===void 0){this._previousTimeValue="";return}this._setDateTimeValueSeparate(this._dateAndTime,this._dateConverted),this.value=this._getDateTimeString()}_setDateTimeValueSeparate(e,i){this._dateValue=i,this._timeValue=this._dateValue&&Oe(i)?Be(e.time.slice(0,5)):this._previousTimeValue}_updateValueAndErrorWhenUIChange(){const e=this._checkDateTimeFormat();this.value=e?this.value:void 0,this._updateErrorText()}_checkDateTimeFormat(){const e=!!this._timeValue&&!this._dateValue,i=!!this._dateValue&&!this._timeValue;return!this._errorFormat&&!e&&!i}_setUndefinedValue(){if(!this._changeTimeByUI){if(this._errorFormat){if(this._changeDateByUI)return;this._dateValue="",this._timeValue="";return}this._dateValue=this._previousDateValue,this._timeValue=this._previousTimeValue}}_setEmptyValue(){this._dateValue="",this._timeValue="",this._previousTimeValue="",this._previousDateValue=""}_getDateTimeValue(e){if(e===""||e===void 0)return{date:"",time:""};const i=e.split("T"),o=i[0],n=i[1];if(e.indexOf("T")===e.length-1||i.length>2)return{date:o,time:""};if(!n)return{date:o,time:"00:00"};const[s,r,u]=n.split(":"),c=`${s}:${r||"00"}`;return u?{date:o,time:`${c}:${u}`}:{date:o,time:c}}render(){return _`
        <fieldset
          class="kuc-mobile-datetime-picker-1-23-1__group"
          aria-describedby="${this._GUID}-error"
        >
          <legend
            class="kuc-mobile-datetime-picker-1-23-1__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-mobile-label-1-23-1
              .requiredIcon="${this.requiredIcon}"
              .text="${this.label}"
            ></kuc-base-mobile-label-1-23-1>
          </legend>
          <div class="kuc-mobile-datetime-picker-1-23-1__group__input">
            <kuc-mobile-base-date-1-23-1
              class="kuc-mobile-datetime-picker-1-23-1__group__input--date"
              .disabled="${this.disabled}"
              .value="${this._dateValue}"
              .inputId="${this._GUID}"
              .inputAriaInvalid="${this.error!==""}"
              .required="${this.requiredIcon}"
              .language="${this._getLanguage()}"
              @kuc:mobile-base-date-change="${this._handleDateChange}"
            >
            </kuc-mobile-base-date-1-23-1>
            <kuc-base-mobile-time-1-23-1
              class="kuc-mobile-datetime-picker-1-23-1__group__input--time"
              .value="${this._timeValue}"
              .disabled="${this.disabled}"
              .hour12="${this.hour12}"
              .guid="${this._GUID}"
              .language="${this._getLanguage()}"
              .required="${this.requiredIcon}"
              @kuc:base-mobile-time-change="${this._handleTimeChange}"
            ></kuc-base-mobile-time-1-23-1>
          </div>
          <kuc-base-mobile-error-1-23-1
            .guid="${this._GUID}"
            .text="${this._errorText}"
          >
          </kuc-base-mobile-error-1-23-1>
        </fieldset>
      `}updated(){this._resetState()}_resetState(){this._previousTimeValue="",this._previousDateValue="",this._changeDateByUI=!1,this._changeTimeByUI=!1}_updateErrorText(){this._errorText=this._errorFormat||this.error}_getLanguage(){const e=["en","ja","zh","zh-TW","es"];return e.indexOf(this.language)!==-1?this.language:e.indexOf(document.documentElement.lang)!==-1?document.documentElement.lang:"en"}_handleDateChange(e){if(e.stopPropagation(),e.preventDefault(),e.detail.value===this._dateValue)return;this._changeDateByUI=!0;let i=this._dateValue;e.detail.error?(this._errorFormat=e.detail.error,this.error=""):i=e.detail.value,this._updateDateTimeValue(i,"date")}_handleTimeChange(e){e.preventDefault(),e.stopPropagation(),this._changeTimeByUI=!0;let i=this._timeValue;e.detail.error?(this._errorFormat=e.detail.error,this.error=""):this._errorFormat="",i=e.detail.value,this._updateDateTimeValue(i,"time")}_updateDateTimeValue(e,i){const o=this.value;i==="date"?this._dateValue=e||"":this._timeValue=e,this._previousTimeValue=this._timeValue,this._previousDateValue=this._dateValue;const n=this._errorFormat?void 0:this._getDateTimeString(),s=this._errorFormat?void 0:n;this.value=s;const r=this._errorFormat?void 0:n;this.value=r,f(this,"change",{value:s,oldValue:o,changedPart:i})}_getDateTimeString(){if(this._dateValue===""&&this._timeValue==="")return"";if(!this._dateValue||!this._timeValue)return;if(!this.value)return`${this._dateValue}T${this._timeValue}:00`;const e=this.value.split(":");return e.length===3?`${this._dateValue}T${this._timeValue}:${e[2]}`:`${this._dateValue}T${this._timeValue}:00`}}X([l({type:String,reflect:!0,attribute:"class"})],a.prototype,"className",void 0),X([l({type:String})],a.prototype,"error",void 0),X([l({type:String,reflect:!0,attribute:"id"})],a.prototype,"id",void 0),X([l({type:String})],a.prototype,"label",void 0),X([l({type:String,attribute:"lang",reflect:!0,converter:ot})],a.prototype,"language",void 0),X([l({type:String,hasChanged(t,e){return(t===""||t===void 0)&&t===e?!0:t!==e}})],a.prototype,"value",void 0),X([l({type:Boolean})],a.prototype,"disabled",void 0),X([l({type:Boolean})],a.prototype,"hour12",void 0),X([l({type:Boolean})],a.prototype,"requiredIcon",void 0),X([l({type:Boolean,attribute:"hidden",reflect:!0,converter:L})],a.prototype,"visible",void 0),X([v()],a.prototype,"_dateValue",void 0),X([v()],a.prototype,"_timeValue",void 0),X([v()],a.prototype,"_errorFormat",void 0),X([v()],a.prototype,"_errorText",void 0),window.customElements.define("kuc-mobile-datetime-picker-1-23-1",a),x(pr),uo=a})();var co={d:(a,t)=>{for(var e in t)co.o(t,e)&&!co.o(a,e)&&Object.defineProperty(a,e,{enumerable:!0,get:t[e]})},o:(a,t)=>Object.prototype.hasOwnProperty.call(a,t)},ka={};co.d(ka,{r:()=>gr});const gr="1.23.1";ka.r;var ho={d:(a,t)=>{for(var e in t)ho.o(t,e)&&!ho.o(a,e)&&Object.defineProperty(a,e,{enumerable:!0,get:t[e]})},o:(a,t)=>Object.prototype.hasOwnProperty.call(a,t)},xa={};ho.d(xa,{$:()=>fr});const fr=void 0;xa.$;function br(a){const t={valid:!1,error:null,data:null,warnings:[]};let e;try{e=JSON.parse(a)}catch(c){return t.error=$.t("validation.invalidJson",{message:c.message}),t}let i,o=!1;if(e.record?(i=e.record,o=!0):i=e,typeof i!="object"||i===null||Array.isArray(i))return t.error=$.t("validation.recordMustBeObject"),t;const n=Object.keys(i);if(n.length===0)return t.error=$.t("validation.recordMustHaveFields"),t;const s=["SINGLE_LINE_TEXT","MULTI_LINE_TEXT","RICH_TEXT","NUMBER","CALC","CHECK_BOX","RADIO_BUTTON","MULTI_SELECT","DROP_DOWN","USER_SELECT","ORGANIZATION_SELECT","GROUP_SELECT","DATE","TIME","DATETIME","LINK","FILE","SUBTABLE","REFERENCE_TABLE","CATEGORY","STATUS","STATUS_ASSIGNEE","RECORD_NUMBER","__ID__","__REVISION__","CREATOR","CREATED_TIME","MODIFIER","UPDATED_TIME","LABEL","SPACER","HR","GROUP"],r={CALC:"CALC",REFERENCE_TABLE:"REFERENCE_TABLE",LABEL:"LABEL",SPACER:"SPACER",HR:"HR",GROUP:"GROUP"},u=["RECORD_NUMBER","__ID__","__REVISION__","CREATOR","CREATED_TIME","MODIFIER","UPDATED_TIME","CATEGORY","STATUS","STATUS_ASSIGNEE"];for(const c of n){const d=i[c];if(typeof d!="object"||d===null)return t.error=$.t("validation.fieldMustBeObject",{fieldCode:c}),t;if(!("value"in d))return t.error=$.t("validation.fieldMustHaveValue",{fieldCode:c}),t;if(d.type&&!s.includes(d.type))return t.error=$.t("validation.unknownFieldType",{fieldCode:c,type:d.type}),t;if(d.type&&r[d.type]){const h=$.t(`validation.fieldTypes.${d.type}`);t.warnings.push($.t("validation.warningNonCreatable",{fieldType:h,fieldCode:c}))}if(d.type&&u.includes(d.type)&&t.warnings.push($.t("validation.warningSystemField",{fieldCode:c})),d.type==="SUBTABLE"){if(!Array.isArray(d.value))return t.error=$.t("validation.subtableNotArray",{fieldCode:c}),t;for(let h=0;h<d.value.length;h++){const p=d.value[h];if(!p.value||typeof p.value!="object")return t.error=$.t("validation.subtableRowInvalid",{fieldCode:c,index:h}),t}}}return t.valid=!0,t.data=o?e:{record:i},t}function mr(a){const t={},e=a.record,i=["$id","$revision","Record_number","レコード番号","Created_by","作成者","Created_datetime","作成日時","Updated_by","更新者","Updated_datetime","更新日時"],o=["RECORD_NUMBER","__ID__","__REVISION__","CREATOR","CREATED_TIME","MODIFIER","UPDATED_TIME","CATEGORY","STATUS","STATUS_ASSIGNEE"],n=["LABEL","SPACER","HR","GROUP","REFERENCE_TABLE","CALC"];for(const[s,r]of Object.entries(e)){if(i.includes(s)||r.type&&o.includes(r.type)||r.type&&n.includes(r.type))continue;const u=ya(s,r);u&&(t[s]=u)}return t}function ya(a,t){const e=t.type,i=t.value,o={type:e,code:a,label:a,noLabel:!1,required:!1};switch(e){case"SINGLE_LINE_TEXT":return{...o,minLength:"",maxLength:"",expression:"",hideExpression:!1,unique:!1,defaultValue:""};case"MULTI_LINE_TEXT":return{...o,defaultValue:""};case"RICH_TEXT":return{...o,defaultValue:""};case"NUMBER":return{...o,minValue:"",maxValue:"",digit:!1,unique:!1,defaultValue:"",displayScale:"",unit:"",unitPosition:"BEFORE"};case"CHECK_BOX":return{...o,options:Ht(i),defaultValue:[],align:"HORIZONTAL"};case"RADIO_BUTTON":return{...o,options:Ht(i),defaultValue:typeof i=="string"?i:"",align:"HORIZONTAL"};case"MULTI_SELECT":return{...o,options:Ht(i),defaultValue:[]};case"DROP_DOWN":return{...o,options:Ht(i),defaultValue:""};case"USER_SELECT":return{...o,entities:[],defaultValue:[]};case"ORGANIZATION_SELECT":return{...o,entities:[],defaultValue:[]};case"GROUP_SELECT":return{...o,entities:[],defaultValue:[]};case"DATE":return{...o,unique:!1,defaultValue:"",defaultNowValue:!1};case"TIME":return{...o,defaultValue:"",defaultNowValue:!1};case"DATETIME":return{...o,unique:!1,defaultValue:"",defaultNowValue:!1};case"LINK":return{...o,protocol:"WEB",minLength:"",maxLength:"",unique:!1,defaultValue:""};case"FILE":return{...o,thumbnailSize:"150"};case"SUBTABLE":return{...o,fields:wa(i)};default:return vr(a,i)}}function Ht(a){const t={};let e=[];return Array.isArray(a)?e=a:typeof a=="string"&&a&&(e=[a]),e.forEach((i,o)=>{const n=String(i);t[n]={label:n,index:String(o)}}),t}function wa(a){const t={};if(!Array.isArray(a)||a.length===0)return t;const e=a[0];if(!e.value)return t;for(const[i,o]of Object.entries(e.value)){const n=ya(i,o);n&&(t[i]=n)}return t}function vr(a,t){const e={code:a,label:a,noLabel:!1,required:!1};return typeof t=="string"?/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(t)?{...e,type:"DATETIME",unique:!1,defaultValue:"",defaultNowValue:!1}:/^\d{4}-\d{2}-\d{2}$/.test(t)?{...e,type:"DATE",unique:!1,defaultValue:"",defaultNowValue:!1}:/^\d{2}:\d{2}$/.test(t)?{...e,type:"TIME",defaultValue:"",defaultNowValue:!1}:/^https?:\/\//.test(t)?{...e,type:"LINK",protocol:"WEB",minLength:"",maxLength:"",unique:!1,defaultValue:""}:t.includes(`
`)?{...e,type:"MULTI_LINE_TEXT",defaultValue:""}:!isNaN(t)&&t.trim()!==""?{...e,type:"NUMBER",minValue:"",maxValue:"",digit:!1,unique:!1,defaultValue:"",displayScale:"",unit:"",unitPosition:"BEFORE"}:{...e,type:"SINGLE_LINE_TEXT",minLength:"",maxLength:"",expression:"",hideExpression:!1,unique:!1,defaultValue:""}:Array.isArray(t)?t.length>0&&typeof t[0]=="object"&&t[0].code?{...e,type:"USER_SELECT",entities:[],defaultValue:[]}:t.length>0&&typeof t[0]=="object"&&t[0].value?{...e,type:"SUBTABLE",fields:wa(t)}:t.length>0&&typeof t[0]=="object"&&t[0].fileKey?{...e,type:"FILE",thumbnailSize:"150"}:{...e,type:"CHECK_BOX",options:Ht(t),defaultValue:[],align:"HORIZONTAL"}:{...e,type:"SINGLE_LINE_TEXT",minLength:"",maxLength:"",expression:"",hideExpression:!1,unique:!1,defaultValue:""}}async function kr(a){const t={name:a};return await kintone.api(kintone.api.url("/k/v1/preview/app.json"),"POST",t)}async function xr(a,t,e){const i={app:a,properties:t,revision:e};return await kintone.api(kintone.api.url("/k/v1/preview/app/form/fields.json",!0),"POST",i)}async function yr(a,t){const e={apps:[{app:a,revision:t}],revert:!1};return await kintone.api(kintone.api.url("/k/v1/preview/app/deploy.json",!0),"POST",e)}function wr(){const a=$.t.bind($),t=document.createElement("div");t.style.color="red",t.style.marginBottom="8px",t.style.fontSize="14px",t.style.display="none";const e=document.createElement("div");e.style.color="#d97706",e.style.marginBottom="8px",e.style.fontSize="14px",e.style.display="none",e.style.whiteSpace="pre-line";const i=document.createElement("label");i.textContent=a("dialog.appNameLabel"),i.style.display="block",i.style.marginBottom="4px",i.style.fontWeight="bold";const o=new Us({placeholder:a("dialog.appNamePlaceholder"),value:""}),n=document.createElement("div");n.style.marginBottom="16px",n.appendChild(i),n.appendChild(o);const s=document.createElement("label");s.textContent=a("dialog.jsonLabel"),s.style.display="block",s.style.marginBottom="4px",s.style.fontWeight="bold";const r=document.createElement("div"),u=new zs({placeholder:a("dialog.jsonPlaceholder"),value:""});r.appendChild(n),r.appendChild(s),r.appendChild(t),r.appendChild(e),r.appendChild(u);const c=document.createElement("div");c.style.display="flex",c.style.justifyContent="flex-end",c.style.gap="8px";const d=new pa({text:a("dialog.cancelButton"),type:"normal"}),h=new pa({text:a("dialog.createButton"),type:"submit",disabled:!0});c.appendChild(d),c.appendChild(h);const p=new xs({header:a("dialog.title"),content:r,footer:c});let b=null;function m(E){if(!E||E.trim()===""){t.style.display="none",t.textContent="",e.style.display="none",e.textContent="",h.disabled=!0,b=null;return}const A=br(E);if(A.valid){t.style.display="none",t.textContent="",A.warnings&&A.warnings.length>0?(e.style.display="block",e.textContent=A.warnings.join(`
`)):(e.style.display="none",e.textContent=""),b=A.data;const P=o.value;h.disabled=!P||P.trim()===""}else t.style.display="block",t.textContent=A.error,e.style.display="none",e.textContent="",h.disabled=!0,b=null}return u.addEventListener("input",E=>{m(E.detail.value)}),o.addEventListener("change",E=>{const A=E.detail.value;A&&A.trim()!==""&&b?h.disabled=!1:h.disabled=!0}),d.addEventListener("click",()=>{p.close()}),h.addEventListener("click",async()=>{try{h.disabled=!0,h.text=a("dialog.creatingButton");const E=o.value,A=await kr(E),P=A.app;let N=A.revision;const Pe=mr(b);N=(await xr(P,Pe,N)).revision,await yr(P,N),alert(`${a("dialog.successMessage")} ${P}`),p.close(),window.location.href=`/k/${P}/`}catch(E){t.style.display="block",t.textContent=`${a("dialog.errorPrefix")}: ${E.message||E}`,h.disabled=!1,h.text=a("dialog.createButton")}}),p}function Cr(){const a=document.createElement("li"),t=document.createElement("div");t.className="sc-gohMHu kBwwCz";const e=document.createElement("div");e.className="sc-eDHQDy kEZbHh";const i=document.createElement("div");i.className="sc-eDHQDy kEZbHh__button";const o=document.createElement("div");o.className="sc-fwzISk kqVddx__container";const n=document.createElement("button");n.innerHTML="📝",n.className="sc-fwzISk kqVddx sc-fwzISk kqVddx__undefined",n.title="paste-create",n.type="button";const s=wr();return n.addEventListener("click",()=>{s.open();const r=document.querySelector(".kuc-dialog-1-23-1__mask");r&&r.addEventListener("click",()=>s.close())}),o.appendChild(n),i.appendChild(o),e.appendChild(i),t.appendChild(e),a.appendChild(t),a}(function(){kintone.events.on("portal.show",function(){const a=document.querySelector(".sc-cOHKVu.kBQnIh__right ul.sc-cOHKVu.kBQnIh__menu-list");if(a&&!a.querySelector('button[title="paste-create"]')){const t=Cr();a.insertBefore(t,a.firstChild)}})})()})();
