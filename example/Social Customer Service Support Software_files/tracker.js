// v6.3.1712
(function(l,f,J,A,K,s,r,u,ba,ca,da,x,R,B,ea,v,fa,ga){function k(a,b,c,d){return function(){a.call(b,c,d)}}function y(a){return"object"==typeof a}function ta(){for(var a=32,b="";a--;)b+=(0|16*K.random()).toString(16);return b}function w(a,b,c,d){var e;(e=a.addEventListener)?e.call(a,b,c,0):a.attachEvent(d||"on"+b,c)}function ha(){return J&&"preview"==J.loadPurpose}function z(a,b){for(var c in a)a.hasOwnProperty(c)&&a[c]!==m&&b(a[c],c)}function L(a,b){var c=[];z(a,function(a,e){c.push(ba(e)+"="+ba(b?
(typeof a).charAt(0)+(y(a)&&a?L(a,b):a):a))});return c.join("&")}function M(a,b){if(!a)throw Error(b);}function ua(a){var b={};z(a,function(a,d){b[d]=a});return b}function va(a){N[ia]=a;return ia++}function ja(){var a=l.olark;a&&a("api.boot.onIdentityReady",function(a,c,d){C=a;S=c;T=d})}function O(a,b){function c(a){return"expires="+(new s(a)).toGMTString()+";"}var d="path=/;",e=a.g(6);e&&(d+="domain="+e+";");return{p:function(e,p){a.g(1,1)&&(f.cookie=e+"="+p+";"+c(+new s+(b?6E10:6E4))+d)},n:function(b){if(a.g(1,
1))return(f.cookie.match("(^|;)\\s*"+b+"=([^;]*)")||[])[2]||m},G:function(a){f.cookie=a+"=;"+c(0)+d}}}function D(a){function b(){var a=d[v];a&&(d[v]=a[x](":_GS_:")[0])}var c;if(D[a])return D[a];var d=l.top;D[a]=c=function(){b();d[v]=(d[v]||"")+":_GS_:"+[a,c.c,c.A]};try{var e=d[v]||"";if(-1!=e[ga](":_GS_:")){var g=e[x](":_GS_:")[1][x](",");g[0]==a&&(c.c=g[1]||"",c.A=g[2]||"")}b()}catch(p){d={}}return c}function U(a){function b(){g.p(d,p.c=[E,548*k.r+2019,379*k.o+4621,+new s].join(":"));a.s(11,E)}function c(){l&&
"-"!==l?g.p(e,l):g.G(e)}var d="gs_u_"+a.b,e="gs_v_"+a.b,g=O(a,1),p=D(a.b),h=(g.n(d)||p.c||"")[x](":"),ka=1,E=a.g(11,h[0])||(ka=0,ta()),wa=((h[1]||2019)-2019)/548,f=((h[2]||4621)-4621)/379,h=(h[3]||0)/1E3,l=a.g(13),k;k={c:E,P:l,r:wa,o:f,W:~~h,ba:ka,U:function(a,c){k.o+=+a;k.r+=+c;b()},ca:function(a){l=k.P=a;c()},ha:b,$:function(){var b=g.n("gs_p_"+a.b)||p.A;g.G("gs_p_"+a.b);return a.i!==m?a.i:b}};l&&c();return k}function xa(a){var b=f[fa]("head")[0],c=f[da]("script");c.src=(ya?"https":"http")+"://"+
V[W]+a;b.appendChild(c);return function(){c&&b.removeChild(c);c=null}}function P(a,b,c,d,e){var g=k,p=r(function(){g();W=(W+1)%V[B];c.et&&(c.et=0);c.rt=1;--e&&P(a,b,c,d,e)},1E4),h=U(a);c.cb=va(function(a){d(a);g();u(p)});c.a=a.b;c.au=a.g(14);c.id=h.c;c.cid=h.P;c.tv=ca;h=b+"?"+L(c);la?la.ga(h):g=xa(h)}function ma(a,b,c){var d=f[da]("a");d.href=b||l.location.href;b=d.href;a.g(7,1)||(b=b[R](/\?[^#]*/,""));a.g(8)||(b=b[R](/#.*$/,""));return{fa:b,da:c!==m?c:f.title,L:/^file:/.test(b)||/\/\/localhost[\/:]/.test(b+
"/"),K:/fb_xd_(bust|fragment)/.test(b)}}function na(a){var b;if(a.D){var c=ma(a);!a.g(9)&&c.L||c.K||ha()||(b=L(a.f,1))&&P(a,"prop",{cp:b},k,5)}else r(function(){na(a)},100)}function oa(a,b,c){var d=a.f=a.f||{};M(b||y(c),"Not an object");b?d[b]=c:d=a.f=c;!a.N&&a.D&&(a.N=r(function(){na(a);a.N=0},100))}function za(){var a=0,b=0,c;A&&(a=A.width,b=A.height);c=(c=l.orientation)&&(c+360)%180;return{C:c?b:a,B:c?a:b,R:A&&A.colorDepth||"-",V:J.language||J.browserLanguage||"-",S:f.characterSet||f.charSet||
"-",T:l.devicePixelRatio||1,X:(new s).getTimezoneOffset()}}function X(){function a(a){return l["inner"+a]||c&&c[e="client"+a]||d&&d[e]}function b(a){return K.max(d[e="scroll"+a]|0,c[e]|0,d[e="offset"+a]|0,c[e]|0,d[e="client"+a]|0,c[e]|0)}var c=f.documentElement,d=f.body||c,e;return{Q:a("Width"),O:a("Height"),I:b("Width"),H:b("Height"),k:l.pageXOffset||c&&c.scrollLeft||0,l:l.pageYOffset||c&&c.scrollTop||0}}function pa(a){a.h&&(a.h=0,a.m=new s-a.t+(a.m||0))}function Y(a){u(a.Y);a.Y=r(k(pa,0,a),15E3);
a.h||(a.h=1,a.t=new s)}function Aa(a){var b=a.m,c=new s;a.h&&(b+=c-a.t,a.t=c);a.m=0;return b}function Ba(a){Y(a);var b=X();b.l>a.w&&(a.w=b.l);b.k>a.u&&(a.u=b.k)}function Ca(a){var b=k(Y,0,a);w(f,"mousemove",b);w(f,"keydown",b);w(l,"scroll",k(Ba,0,a));w(f,"focus",b,"focusin");w(f,"blur",k(pa,0,a),"focusout")}function Da(a){a=a.g(10,f.referrer);var b;!a||/^(chrome|about|file):/.test(a)||/^\[.*\]$/.test(a)?a="-":b=a[R](/^.*?\/\//,"")[ga](location.host);return{J:+(0<=b&&8>=b),aa:a}}function Q(a,b,c,d){if(a.i!==
m){if(!c){var e=X();c={vw:e.Q,vh:e.O,dw:e.I,dh:e.H,st:e.l,sl:e.k,mst:a.w,msl:a.u}}c.i=a.i;c.e=b;c.et=Aa(a);q&&(c.bc=1);a.M&&C&&(a.M=0,c.o_si=C,c.o_vi=S,c.o_ci=T);P(a,"ping",c,function(){d&&d();u(a.j);a.j=r(k(Q,0,a),[7E3,12E3][a.Z++]||17500+5E3*K.random())},5)}else r(function(){Q(a,b,c,d)},5E3)}function Ea(a){if(a.i!==m){var b=O(a);a.g(1,1)?b.p("gs_p_"+a.b,a.i):(b=D(a.b),b.A=a.i,b())}}function Z(a,b,c){M(a,"Event name is required");b&&b.call&&(c=b,b=m);if(b===""+b||b===+b)b={caption:b};b=ua(b||{});
b.gs_evt_name=a;Q(this,"event",b,c)}function $(a,b,c){a&&a.call&&(c=a,a=m);b&&b.call&&(c=b,b=m);var d=this,e=ma(d,a,b),g=Da(d),p=d.i===m&&!g.J;b=d.D=U(d);var h=za(),f=X(),E=d.g(5);b.U(1,p);u(d.j);d.m=0;d.h=0;Y(d);!d.g(9)&&e.L||e.K||ha()||h.C&&h.B&&10>h.C&&10>h.B||(d.w=f.l,d.u=f.k,e={cs:h.S,cd:h.R,la:h.V,sw:h.C,sh:h.B,dp:h.T,pu:e.fa,pt:e.da||"-",ri:g.J,ru:g.aa,re:b.ba,vi:b.r,pv:b.o,lv:b.W,vw:f.Q,vh:f.O,dw:f.I,dh:f.H,st:f.l,sl:f.k,un:d.g(3),pp:b.$(),ec:E,aip:d.g(2)?1:m,tz:h.X},d.f&&(e.cp=L(d.f,1)),
q&&(d.uid=b.c,e.bc=1),C?(e.o_si=C,e.o_vi=S,e.o_ci=T):d.M=1,d.Z=0,P(d,"pv",e,function(a){a!==m&&(d.i=a,u(d.j),d.j=r(k(Q,0,d),5E3),c&&c())},5),d.i!==m?a!==m&&(d.i=m):(r(k(Ca,0,d),500),w(l,"beforeunload",k(Ea,0,d))))}function qa(a){var b="gs_v_"+a,c=this,d=[];d[12]=c.b=a;c.s=function(a,b,e){4==a&&(oa(c,e,b),b=c.f);13==a&&(oa(c,"id",b),b=b||"-",U(c).ca(b));d[a]=b};c.g=function(a,e){return a in d?d[a]:13==a?O(c,1).n(b)||e:e};var e;c.ea=function(){e=r(k($,c),200)};c.F=function(){u(c.j);u(e)}}function aa(a,
b,c){if(!a)for(a in n)return n[a];if(n[b||a])return n[b||a];a=n[b||a]=new qa(a);c&&a.ea();return a}function F(a,b,c,d,e){b?a.call(n[b],c,d,e):z(n,function(b){a.call(b,c,d,e)})}function Fa(a,b,c,d){function e(a,b){b=b||(y(a)?a:{});y(a)||(b[v]=a);M(b[v],"No Name");h.push(b);return k}function g(a){for(var b=0;b<a[B];)e(a[b++]);return k}function f(){F(function(){var a=O(this,1),d="gs_t_"+this.b,e=a.n(d)||0;a.p(d,+new s);Z.call(this,"_transaction",{d:JSON.stringify({id:b,pt:{ts:+e},i:h,d:c})})},a)}!c&&
y(b)&&(c=b,b=c.id);var h=[],k;d&&g(d);c&&c.track&&f();return k={id:b,addItem:e,addItems:g,track:f}}function Ga(a,b){!b&&y(a)&&(b=a,a=b.id,!a&&b.email&&(a="email:"+b.email));M(a,"ID or email required");this.s(13,a);b&&this.s(4,b)}function G(a,b,c,d){if(a&&a.call)a();else if(/^GSN-.*-.$/.test(a))b!==""+b&&(c=b,b=0),aa(a,b,c||c===m);else if(N[a])N[a](b,c),delete N[a];else{var e=function(a,b,c){g?n[g].s(a,b,c):z(n,function(d){d.s(a,b,c)})};a=a[x](".");var g;1<a[B]&&(g=a.shift());a=a[0];var f={usecookies:1,
anonymizeip:2,visitorname:3,username:3,statuscode:5,cookiedomain:6,trackparams:7,trackhash:8,tracklocal:9,referrer:10,visitorid:13,visitor:4,clientid:11,auth:14,props:4,properties:4};if(/transaction$/i.test(a))return Fa(g,b,c,d);if("get"==a)return c=f[(b+"")[ea]()]||b,g?d=n[g].g(c):z(n,function(a){d=a.g(c)}),d;"set"==a?(a=(b+"")[x]("."),b=a.shift(),e(f[b[ea]()]||b,c,a.join("."))):"track"==a?F($,g,b,c,d):"event"==a?F(Z,g,b,c,d):"cancel"==a?F(function(){this.F()},g):"noCookies"==a?e(1,0):"anonymizeIP"==
a?e(2,1):"tag"==a?e(3,b):"load"==a?b&&b():"auth"==a?e(14,b):"identify"==a?F(Ga,g,b,c,d):"alias"==a?e(13,b):"unidentify"==a?e(13):"props"!=a&&"properties"!=a||e(4,b)}}var m,H,I=l._gs||(H=1,function(){ra.push(arguments)}),ra=I.q=I.q||[];if(!I.v){var q=l.GoSquared,N={},ia=0,C,S,T,la,V=["data.gosquared.com/","data2.gosquared.com/"],W=0|K.random()*V[B],ya=/^https:/.test(location.href),n={};if(q){z(q,function(a,b){"acct"==b?(aa(a,"_default",1),I(function(){function c(a){d[a.shift()].apply(d,a)}var d=q.DefaultTracker=
n._default;if(b=q.q)for(;a=b.shift();)c(a);q.q={push:c};(b=q.load)&&b(d)})):"load"!=b&&"q"!=b&&I("set",b,a)});var t=qa.prototype;t.TrackView=$;t.TrackEvent=Z;t.Cancel=function(){this.F()};q.Tracker=aa;q.Cancel=k(G,0,"cancel")}l._gs=G;for(G.v=ca;t=ra.shift();)G.apply({},t);if(H){H=f[fa]("script");for(var t=H[B],sa;t--;)(sa=H[t].getAttribute("data-gs"))&&G(sa)}ja();w(l,"load",ja)}})(window,document,navigator||{},screen,Math,Date,setTimeout,clearTimeout,encodeURIComponent,"6.3.1712","createElement",
"split","replace","length","toLowerCase","name","getElementsByTagName","indexOf");
