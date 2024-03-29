import{aY as L,aZ as C,b2 as B,b3 as U,b4 as P,b5 as j,b6 as K,b7 as V,b8 as w,b9 as z,a$ as v,ba as N,r as y,aQ as W}from"./index-fa80df68.js";class ce extends L{constructor(e,t){super(),this.client=e,this.options=t,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(t)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(this.currentQuery.addObserver(this),D(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return E(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return E(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,t){const s=this.options,u=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),C(s,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=s.queryKey),this.updateQuery();const n=this.hasListeners();n&&k(this.currentQuery,u,this.options,s)&&this.executeFetch(),this.updateResult(t),n&&(this.currentQuery!==u||this.options.enabled!==s.enabled||this.options.staleTime!==s.staleTime)&&this.updateStaleTimeout();const i=this.computeRefetchInterval();n&&(this.currentQuery!==u||this.options.enabled!==s.enabled||i!==this.currentRefetchInterval)&&this.updateRefetchInterval(i)}getOptimisticResult(e){const t=this.client.getQueryCache().build(this.client,e),s=this.createResult(t,e);return H(this,s,e)&&(this.currentResult=s,this.currentResultOptions=this.options,this.currentResultState=this.currentQuery.state),s}getCurrentResult(){return this.currentResult}trackResult(e){const t={};return Object.keys(e).forEach(s=>{Object.defineProperty(t,s,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(s),e[s])})}),t}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...t}={}){return this.fetch({...t,meta:{refetchPage:e}})}fetchOptimistic(e){const t=this.client.defaultQueryOptions(e),s=this.client.getQueryCache().build(this.client,t);return s.isFetchingOptimistic=!0,s.fetch().then(()=>this.createResult(s,t))}fetch(e){var t;return this.executeFetch({...e,cancelRefetch:(t=e.cancelRefetch)!=null?t:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let t=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(t=t.catch(B)),t}updateStaleTimeout(){if(this.clearStaleTimeout(),U||this.currentResult.isStale||!P(this.options.staleTime))return;const t=j(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},t)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!=null?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!(U||this.options.enabled===!1||!P(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||K.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,t){const s=this.currentQuery,u=this.options,n=this.currentResult,i=this.currentResultState,a=this.currentResultOptions,d=e!==s,p=d?e.state:this.currentQueryInitialState,o=d?this.currentResult:this.previousQueryResult,{state:c}=e;let{dataUpdatedAt:b,error:O,errorUpdatedAt:T,fetchStatus:R,status:f}=c,F=!1,x=!1,h;if(t._optimisticResults){const l=this.hasListeners(),g=!l&&D(e,t),A=l&&k(e,s,t,u);(g||A)&&(R=V(e.options.networkMode)?"fetching":"paused",b||(f="loading")),t._optimisticResults==="isRestoring"&&(R="idle")}if(t.keepPreviousData&&!c.dataUpdatedAt&&o!=null&&o.isSuccess&&f!=="error")h=o.data,b=o.dataUpdatedAt,f=o.status,F=!0;else if(t.select&&typeof c.data<"u")if(n&&c.data===(i==null?void 0:i.data)&&t.select===this.selectFn)h=this.selectResult;else try{this.selectFn=t.select,h=t.select(c.data),h=w(n==null?void 0:n.data,h,t),this.selectResult=h,this.selectError=null}catch(l){this.selectError=l}else h=c.data;if(typeof t.placeholderData<"u"&&typeof h>"u"&&f==="loading"){let l;if(n!=null&&n.isPlaceholderData&&t.placeholderData===(a==null?void 0:a.placeholderData))l=n.data;else if(l=typeof t.placeholderData=="function"?t.placeholderData():t.placeholderData,t.select&&typeof l<"u")try{l=t.select(l),this.selectError=null}catch(g){this.selectError=g}typeof l<"u"&&(f="success",h=w(n==null?void 0:n.data,l,t),x=!0)}this.selectError&&(O=this.selectError,h=this.selectResult,T=Date.now(),f="error");const m=R==="fetching",Q=f==="loading",S=f==="error";return{status:f,fetchStatus:R,isLoading:Q,isSuccess:f==="success",isError:S,isInitialLoading:Q&&m,data:h,dataUpdatedAt:b,error:O,errorUpdatedAt:T,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>p.dataUpdateCount||c.errorUpdateCount>p.errorUpdateCount,isFetching:m,isRefetching:m&&!Q,isLoadingError:S&&c.dataUpdatedAt===0,isPaused:R==="paused",isPlaceholderData:x,isPreviousData:F,isRefetchError:S&&c.dataUpdatedAt!==0,isStale:I(e,t),refetch:this.refetch,remove:this.remove}}updateResult(e){const t=this.currentResult,s=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,C(s,t))return;this.currentResult=s;const u={cache:!0},n=()=>{if(!t)return!0;const{notifyOnChangeProps:i}=this.options,a=typeof i=="function"?i():i;if(a==="all"||!a&&!this.trackedProps.size)return!0;const d=new Set(a??this.trackedProps);return this.options.useErrorBoundary&&d.add("error"),Object.keys(this.currentResult).some(p=>{const o=p;return this.currentResult[o]!==t[o]&&d.has(o)})};(e==null?void 0:e.listeners)!==!1&&n()&&(u.listeners=!0),this.notify({...u,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const t=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(t==null||t.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const t={};e.type==="success"?t.onSuccess=!e.manual:e.type==="error"&&!z(e.error)&&(t.onError=!0),this.updateResult(t),this.hasListeners()&&this.updateTimers()}notify(e){v.batch(()=>{if(e.onSuccess){var t,s,u,n;(t=(s=this.options).onSuccess)==null||t.call(s,this.currentResult.data),(u=(n=this.options).onSettled)==null||u.call(n,this.currentResult.data,null)}else if(e.onError){var i,a,d,p;(i=(a=this.options).onError)==null||i.call(a,this.currentResult.error),(d=(p=this.options).onSettled)==null||d.call(p,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach(({listener:o})=>{o(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function q(r,e){return e.enabled!==!1&&!r.state.dataUpdatedAt&&!(r.state.status==="error"&&e.retryOnMount===!1)}function D(r,e){return q(r,e)||r.state.dataUpdatedAt>0&&E(r,e,e.refetchOnMount)}function E(r,e,t){if(e.enabled!==!1){const s=typeof t=="function"?t(r):t;return s==="always"||s!==!1&&I(r,e)}return!1}function k(r,e,t,s){return t.enabled!==!1&&(r!==e||s.enabled===!1)&&(!t.suspense||r.state.status!=="error")&&I(r,t)}function I(r,e){return r.isStaleByTime(e.staleTime)}function H(r,e,t){return t.keepPreviousData?!1:t.placeholderData!==void 0?e.isPlaceholderData:!C(r.getCurrentResult(),e)}const Y=N.useSyncExternalStore,M=y.createContext(!1),Z=()=>y.useContext(M);M.Provider;function G(){let r=!1;return{clearReset:()=>{r=!1},reset:()=>{r=!0},isReset:()=>r}}const J=y.createContext(G()),X=()=>y.useContext(J);function _(r,e){return typeof r=="function"?r(...e):!!r}const $=(r,e)=>{(r.suspense||r.useErrorBoundary)&&(e.isReset()||(r.retryOnMount=!1))},ee=r=>{y.useEffect(()=>{r.clearReset()},[r])},te=({result:r,errorResetBoundary:e,useErrorBoundary:t,query:s})=>r.isError&&!e.isReset()&&!r.isFetching&&_(t,[r.error,s]),re=r=>{r.suspense&&typeof r.staleTime!="number"&&(r.staleTime=1e3)},se=(r,e)=>r.isLoading&&r.isFetching&&!e,ne=(r,e,t)=>(r==null?void 0:r.suspense)&&se(e,t),ie=(r,e,t)=>e.fetchOptimistic(r).then(({data:s})=>{r.onSuccess==null||r.onSuccess(s),r.onSettled==null||r.onSettled(s,null)}).catch(s=>{t.clearReset(),r.onError==null||r.onError(s),r.onSettled==null||r.onSettled(void 0,s)});function le(r,e){const t=W({context:r.context}),s=Z(),u=X(),n=t.defaultQueryOptions(r);n._optimisticResults=s?"isRestoring":"optimistic",n.onError&&(n.onError=v.batchCalls(n.onError)),n.onSuccess&&(n.onSuccess=v.batchCalls(n.onSuccess)),n.onSettled&&(n.onSettled=v.batchCalls(n.onSettled)),re(n),$(n,u),ee(u);const[i]=y.useState(()=>new e(t,n)),a=i.getOptimisticResult(n);if(Y(y.useCallback(d=>{const p=s?()=>{}:i.subscribe(v.batchCalls(d));return i.updateResult(),p},[i,s]),()=>i.getCurrentResult(),()=>i.getCurrentResult()),y.useEffect(()=>{i.setOptions(n,{listeners:!1})},[n,i]),ne(n,a,s))throw ie(n,i,u);if(te({result:a,errorResetBoundary:u,useErrorBoundary:n.useErrorBoundary,query:i.getCurrentQuery()}))throw a.error;return n.notifyOnChangeProps?a:i.trackResult(a)}export{ce as Q,Y as a,_ as s,le as u};