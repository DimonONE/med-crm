import{Q as v,u as p}from"./useBaseQuery-01eea3a2.js";import{aT as l,aU as m,aV as y,aW as M}from"./index-47557d54.js";class x extends v{constructor(e,t){super(e,t)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,t){super.setOptions({...e,behavior:l()},t)}getOptimisticResult(e){return e.behavior=l(),super.getOptimisticResult(e)}fetchNextPage({pageParam:e,...t}={}){return this.fetch({...t,meta:{fetchMore:{direction:"forward",pageParam:e}}})}fetchPreviousPage({pageParam:e,...t}={}){return this.fetch({...t,meta:{fetchMore:{direction:"backward",pageParam:e}}})}createResult(e,t){var s,n,c,u,f,a;const{state:r}=e,h=super.createResult(e,t),{isFetching:o,isRefetching:d}=h,g=o&&((s=r.fetchMeta)==null||(n=s.fetchMore)==null?void 0:n.direction)==="forward",P=o&&((c=r.fetchMeta)==null||(u=c.fetchMore)==null?void 0:u.direction)==="backward";return{...h,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:m(t,(f=r.data)==null?void 0:f.pages),hasPreviousPage:y(t,(a=r.data)==null?void 0:a.pages),isFetchingNextPage:g,isFetchingPreviousPage:P,isRefetching:d&&!g&&!P}}}function b(i,e,t){const s=M(i,e,t);return p(s,x)}function $({queryKey:i,fetchPage:e,initialQuery:t}){let s={offset:0,limit:10,sortBy:"ASC",...t};const{data:n,refetch:c,...u}=b({queryKey:i,queryFn:({pageParam:a})=>e({...s,...a}),getNextPageParam:(a,r)=>{const h=r.reduce((o,d)=>o+d.length,0)||0;if(a.length!==0)return{offset:h+1}}});return{data:n,refetch:c,updateQueryParameters:async a=>{s={...s,...a},c({queryKey:[i,s]})},...u}}export{$ as u};
