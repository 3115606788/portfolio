/* =========================================================
个人作品集 - 全站共用脚本
========================================================= */
(function () {
"use strict";
// ---------- 四角星 SVG 公共组件（如果 HTML 里忘了写，可以动态补） ----------
window.STAR_SVG =
'<svg class="icon-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true">' +
'<path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" fill-opacity="0.18"/>' +
'<path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"/>' +
"</svg>";
window.STAR_SVG_SM =
'<svg class="icon-star sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">' +
'<path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" fill-opacity="0.2"/>' +
"</svg>";
// ====== 紧急兜底：任何未捕获错误立刻关灯箱 + 解锁滚动 ======
(function installFailsafe() {
  function emergencyOff() {
    try { document.documentElement.classList.remove('lb-open-on'); } catch(e){}
    try { document.body.classList.remove('lb-open-on'); } catch(e){}
    try { 
      const lb = document.querySelector('.lightbox');
      if (lb) { lb.classList.remove('open','is-tall-image'); 
        const st = lb.querySelector('.lb-stage'); if(st) st.innerHTML = ''; }
    } catch(e){}
    // 清任何脏 overflow 内联残留
    try { document.body.style.overflow = ''; } catch(e){}
    try { document.documentElement.style.overflow = ''; } catch(e){}
  }
  window.addEventListener('error', function(e){ emergencyOff(); }, true);
  window.addEventListener('unhandledrejection', function(){ emergencyOff(); }, true);
  // 页面加载第一帧：清历史脏状态（上次点卡死残留的 overflow:hidden / class）
  if (document.readyState && document.readyState !== 'loading') {
    emergencyOff();
  } else {
    document.addEventListener('DOMContentLoaded', emergencyOff, { once: true });
  }
  // 暴露供外部调用
  window.__lbEmergencyOff = emergencyOff;
})();

window.STAR_SVG_LG =
'<svg class="icon-star lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true">' +
'<path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" fill-opacity="0.15"/>' +
"</svg>";
// ---------- i18n 中英双语字典 ----------
// 规则：元素上带 data-i18n="key"，或者 data-i18n-attr="key" + data-attr="placeholder/title"
const DICT = {
zh: {
"nav.home":  "首页",
"nav.about": "关于我",
"nav.works": "作品集",
"nav.awards":"荣誉",
"nav.contact":"联系我",
"nav.en": "中文",
"lang.zh": "中",
"lang.en": "EN",
"hero.tagline1": "数字媒体创作者",
"hero.tagline2": "×",
"hero.tagline3": "AI 视觉实验者",
"hero.sub": "东方质感 × 赛博语言 × 跨媒介表达",
"hero.scroll": "向下滚动 探索作品",
"hero.cta1": "查看作品集",
"hero.cta2": "关于我",
"home.featured.eyebrow": "Selected Works",
"home.featured.title": "精选代表作",
"home.featured.desc": "从六个创作类别中挑选的 7 件代表作，点击卡片进入聚合详情页。",
"home.skills.eyebrow": "Creative Stack",
"home.skills.title": "技能矩阵",
"home.skills.desc": "把传统设计的控制力、AI 工作流的迭代速度，以及前端交互的落地能力组合在一起。",
"home.quick.eyebrow": "Quick Nav",
"home.quick.title": "快速导航",
"home.quick.desc": "三次点击内，到达你想看的任何一个角落。",
"works.eyebrow": "Portfolio",
"works.title": "全部作品",
"works.desc": "按类别筛选，也可以直接进入任意大类的聚合详情页查看完整作品与创作流程。",
"works.filter.all": "全部",
"works.filter.c1": "动态视觉与影像",
"works.filter.c2": "AI 创作与技术",
"works.filter.c3": "信息可视化",
"works.filter.c4": "角色与 IP 设计",
"works.filter.c5": "网页与交互",
"works.viewDetail": "查看详情",
"works.video": "视频",
"works.audio": "音频",
"works.image": "图片",
"about.eyebrow": "About",
"about.title": "关于我",
"about.sub": "Profile & Skills",
"awards.eyebrow": "Awards",
"awards.title": "荣誉证书",
"awards.desc": "按等级排列，点击卡片可放大查看。",
"awards.pending": "证书待下发",
"contact.eyebrow": "Contact",
"contact.title": "联系我",
"contact.desc": "合作、约稿、内推、留学作品集交流，随时欢迎。",
"contact.email": "邮箱",
"contact.phone": "电话",
"contact.copy": "点击复制",
"contact.copied": "已复制",
"detail.back": "← 返回作品集",
"detail.overview": "项目概述",
"detail.process": "创作流程",
"detail.tools": "使用工具",
"detail.cert": "关联证书",
"detail.wf.title": "ComfyUI 工作流详解",
"detail.wf.type": "工作流类型",
"detail.wf.lora": "LoRA 模型与运用思路",
"detail.wf.nodes": "关键节点说明",
"detail.wf.io": "输入输出对比",
"detail.wf.ai": "AI 辅助环节",
"footer.copy": "© 2026 · Crafted with care",
"footer.tag": "Digital Media · AI Vision · Interactive",
"mobile.menu": "菜单",
"lightbox.prev": "上一张",
"lightbox.next": "下一张",
"lightbox.close": "关闭",
},
en: {
"nav.home":  "Home",
"nav.about": "About",
"nav.works": "Works",
"nav.awards":"Awards",
"nav.contact":"Contact",
"nav.en": "EN",
"lang.zh": "中",
"lang.en": "EN",
"hero.tagline1": "Digital Media Creator",
"hero.tagline2": "×",
"hero.tagline3": "AI Vision Experimenter",
"hero.sub": "Oriental texture × Cyber language × Cross-media",
"hero.scroll": "Scroll to explore",
"hero.cta1": "View Works",
"hero.cta2": "About Me",
"home.featured.eyebrow": "Selected Works",
"home.featured.title": "Featured Pieces",
"home.featured.desc": "7 representative works across 6 categories. Click any card to enter its category detail page.",
"home.skills.eyebrow": "Creative Stack",
"home.skills.title": "Skill Matrix",
"home.skills.desc": "A mix of traditional design craftsmanship, AI workflow iteration speed, and front-end interactivity.",
"home.quick.eyebrow": "Quick Nav",
"home.quick.title": "Quick Navigation",
"home.quick.desc": "Reach any corner of the site within 3 clicks.",
"works.eyebrow": "Portfolio",
"works.title": "All Works",
"works.desc": "Filter by category, or jump into a category detail page for the full workflow and media.",
"works.filter.all": "All",
"works.filter.c1": "Motion & Film",
"works.filter.c2": "AI Creation",
"works.filter.c3": "Data Visualization",
"works.filter.c4": "Character & IP",
"works.filter.c5": "Web & Interaction",
"works.viewDetail": "View detail",
"works.video": "Video",
"works.audio": "Audio",
"works.image": "Image",
"about.eyebrow": "About",
"about.title": "About Me",
"about.sub": "Profile & Skills",
"awards.eyebrow": "Awards",
"awards.title": "Certificates",
"awards.desc": "Sorted by rank. Click any card to zoom in.",
"awards.pending": "Certificate pending",
"contact.eyebrow": "Contact",
"contact.title": "Get in Touch",
"contact.desc": "For commission, collaboration, internship, or portfolio review.",
"contact.email": "Email",
"contact.phone": "Phone",
"contact.copy": "Click to copy",
"contact.copied": "Copied",
"detail.back": "← Back to Works",
"detail.overview": "Overview",
"detail.process": "Process",
"detail.tools": "Tools",
"detail.cert": "Related Awards",
"detail.wf.title": "ComfyUI Workflow Deep Dive",
"detail.wf.type": "Workflow Type",
"detail.wf.lora": "LoRA Models & Strategy",
"detail.wf.nodes": "Key Nodes & Parameters",
"detail.wf.io": "Input vs Output",
"detail.wf.ai": "AI-assisted Stages",
"footer.copy": "© 2026 · Crafted with care",
"footer.tag": "Digital Media · AI Vision · Interactive",
"mobile.menu": "Menu",
"lightbox.prev": "Prev",
"lightbox.next": "Next",
"lightbox.close": "Close",
}
};
function getLang() {
try {
return localStorage.getItem("site_lang") || "zh";
} catch (e) { return "zh"; }
}
function setLang(lang) {
try { localStorage.setItem("site_lang", lang); } catch (e) {}
applyLang(lang);
}
function applyLang(lang) { /* 不再使用 i18n JS 替换，文本直接写在 HTML */ }
// ---------- 导航栏：滚动样式 + 激活项 + 汉堡菜单 ----------
function initNav() {
const nav = document.querySelector(".navbar");
const backTop = document.querySelector(".back-top");
const onScroll = () => {
const y = window.scrollY || window.pageYOffset;
if (nav) nav.classList.toggle("scrolled", y > 30);
if (backTop) backTop.classList.toggle("show", y > 600);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
// 激活项
const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
document.querySelectorAll(".nav-menu a").forEach(a => {
const href = (a.getAttribute("href") || "").toLowerCase();
if (!href) return;
if ((here === "" && href === "index.html") || href === here) {
a.classList.add("active");
}
});
// 汉堡
const ham = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-menu");
if (ham && menu) {
ham.addEventListener("click", () => menu.classList.toggle("open"));
menu.addEventListener("click", e => {
if (e.target.closest("a")) menu.classList.remove("open");
});
}
// 返回顶部
if (backTop) {
backTop.addEventListener("click", () => {
window.scrollTo({ top: 0, behavior: "smooth" });
});
}
}
// ---------- 中英文切换按钮 ----------
function initLang() {
applyLang(getLang());
document.querySelectorAll(".lang-toggle").forEach(tg => {
tg.querySelectorAll("button[data-lang]").forEach(btn => {
btn.addEventListener("click", () => setLang(btn.dataset.lang));
});
});
}
// ---------- 滚动入场 reveal ----------
function initReveal() {
const els = document.querySelectorAll(".reveal");
if (!("IntersectionObserver" in window)) {
els.forEach(el => el.classList.add("is-visible"));
return;
}
const io = new IntersectionObserver(entries => {
entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add("is-visible");
io.unobserve(e.target);
}
});
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
els.forEach(el => io.observe(el));
// 技能进度条：到视口从 0 动画到 data-val
const bars = document.querySelectorAll(".skill-item .fill[data-val]");
const bio = new IntersectionObserver(entries => {
entries.forEach(e => {
if (e.isIntersecting) {
const v = e.target.getAttribute("data-val");
e.target.style.width = (v || "0") + "%";
bio.unobserve(e.target);
}
});
}, { threshold: 0.3 });
bars.forEach(b => bio.observe(b));
}
// ---------- 作品集筛选 ----------
function initFilter() {
const bar = document.querySelector(".filter-bar");
if (!bar) return;
const btns = bar.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".work-card[data-cat]");
btns.forEach(b => {
b.addEventListener("click", () => {
btns.forEach(x => x.classList.remove("active"));
b.classList.add("active");
const cat = b.dataset.filter;
cards.forEach(c => {
const show = cat === "all" || c.dataset.cat === cat;
c.style.display = show ? "" : "none";
});
});
});
}
// ---------- 图片灯箱（支持画廊切换） ----------
// ---------- 图片灯箱（支持画廊切换） ----------
// ---------- 图片灯箱（支持画廊切换 / 长图在灯箱内滚动 / 点击空白遮罩退出） ----------
// ---------- 图片灯箱（运行时自动绑定所有作品图；点空白退出；严格防锁滚动死锁） ----------
// ---------- 图片灯箱（class 锁滚动 + 滚动事件拦截 + 图片自动绑定） ----------
function initLightbox() {
  const box = document.querySelector(".lightbox");
  if (!box) return;
  // 保证挂到 body 直接子节点，fixed 绝对按视口居中（不被祖先 transform 降级）
  if (box.parentElement !== document.body) { try { document.body.appendChild(box); } catch(e){} }
  box.style.position = "fixed";
  box.style.inset = "0 0 0 0";
  box.style.width = "100vw"; box.style.height = "100vh";
  box.style.left = "0"; box.style.top = "0";
  box.style.margin = "0"; box.style.transform = "none";
  box.style.zIndex = "2147483000";
  box.classList.remove("open", "is-tall-image");

  const stage   = box.querySelector(".lb-stage");
  const counter = box.querySelector(".counter");
  const btnClose = box.querySelector(".close");
  const btnPrev  = box.querySelector(".nav.prev");
  const btnNext  = box.querySelector(".nav.next");
  if (!box.querySelector(".lb-back")) {
    const back = document.createElement("button");
    back.className = "lb-back";
    back.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>返回</span>';
    box.appendChild(back);
    back.addEventListener("click", (e) => { e.stopPropagation(); closeLB(); });
  }

  const galleries = {};

  // ====== 绑定一个 DOM 元素（img/video） 到灯箱 ======
  function bindOne(el, overrides) {
    if (!el || el.__lbBound) return;
    const src = (overrides && overrides.src) || el.dataset.src || el.currentSrc || el.src || el.getAttribute("src") || "";
    if (!src) return;
    const type = (overrides && overrides.type) || el.dataset.type || (el.tagName === "VIDEO" ? "video" : "image");
    let g = (overrides && overrides.group) || el.dataset.lbGroup || "";
    // 自动分组：优先 work-card.data-cat → section / article.id → 页面名
    if (!g) {
      const card = el.closest(".work-card, figure, .media-card, [data-cat], .award-card, .cert-card");
      if (card) {
        g = (card.dataset && card.dataset.cat) || (card.closest("[data-cat]") && card.closest("[data-cat]").dataset.cat) || null;
        if (!g) {
          const sec = card.closest("section[id], article[id], .page-content[id]");
          g = sec && sec.id;
        }
      }
      if (!g) {
        const sec = el.closest("section, article, main");
        g = sec && sec.id ? sec.id : (location.pathname.split("/").pop().replace(/.html.*/,"") || "page");
      }
    }
    g = g || "gallery";
    if (!galleries[g]) galleries[g] = [];
    const rec = { src, type, trigger: el };
    galleries[g].push(rec);
    el.__lbBound = { g: g, i: galleries[g].length - 1 };
    el.style.cursor = "zoom-in";
    el.addEventListener("click", (ev) => {
      const b = el.__lbBound;
      if (!b) return;
      // 不拦截：ctrl/meta/shift/alt click、_blank 链接、父元素已经是跳转时用户明显想跳转
      if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
      const anchor = el.closest("a[href]");
      if (anchor && anchor.target === "_blank") return;
      // 只有点元素本身（不是文字/按钮叠加）才放大。这里 img/video 点中就是元素自身。
      ev.preventDefault();
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      openLB(b.g, b.i);
    });
  }

  // ===== 用户要求：全站取消「点击放大」交互（2026-08） =====
  // 不再绑定任何 img/video 的 zoom-in 点击；下面的逻辑一律跳过。
  // （保留 lightbox DOM + openLB/closeLB 本身，避免其他代码误调用时报错。）
  return;
  function scanAndBind() {
    const rootBlocks = EXCLUDE_ROOT.map(sel => document.querySelectorAll(sel));
    document.querySelectorAll("img, video").forEach(el => {
      if (el.__lbBound) return;
      // 排除：无 src、在排除容器内、或本身带排除属性
      const tag = (el.tagName || "").toLowerCase();
      let src = (tag === "img" ? (el.src || el.getAttribute("data-src") || "") : (el.src || el.getAttribute("data-src") || ""));
      // <video><source src="..."></video>：video.src 为空时回退 source[0].src
      if (!src && tag === "video") {
        const sourceEl = el.querySelector("source[src]");
        if (sourceEl) src = sourceEl.getAttribute("src") || sourceEl.src || "";
      }
      if (!src) return;
      if (el.hasAttribute("data-no-lightbox") || el.hasAttribute("data-lb-skip") || el.hasAttribute("data-icon")) return;
      const inBlocked = rootBlocks.some(nodeList => Array.from(nodeList).some(root => root && root.contains(el)));
      if (inBlocked) return;
      // logo / nav 里的头像图：宽高都 < 48 就跳过
      const w = el.clientWidth || el.naturalWidth || el.width || 0;
      const h = el.clientHeight || el.naturalHeight || el.height || 0;
      if (w && h && Math.max(w, h) <= 48) return;
      bindOne(el, { type: tag === "video" ? "video" : "image" });
    });
  }
  scanAndBind();
  // 多轮兜底：等 HTML 解析 / 图片加载 / 异步 DOM 渲染后再补绑
  setTimeout(scanAndBind, 0);
  setTimeout(scanAndBind, 300);
  setTimeout(scanAndBind, 1200);
  setTimeout(scanAndBind, 3000);
  window.addEventListener("load", function(){ try { scanAndBind(); } catch(e){} }, { once: true });
  // MutationObserver：任何动态插入的图片都会自动绑定（详情页常见）
  if (typeof MutationObserver !== "undefined") {
    try {
      const mo = new MutationObserver(function(muts){
        let need = false;
        for (let i=0;i<muts.length;i++) {
          const m = muts[i]; if (!m || !m.addedNodes || !m.addedNodes.length) continue;
          for (let j=0;j<m.addedNodes.length;j++) { const n = m.addedNodes[j]; if(!n) continue; if(n.nodeType===1 && (n.tagName==="IMG" || n.tagName==="VIDEO" || n.querySelectorAll)) { need = true; break; } }
          if (need) break;
        }
        if (need) { try { scanAndBind(); } catch(e){} }
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
    } catch(e) {}
  }

  let currentGroup = null, currentIdx = 0;
  let _savedScrollY = 0;
  function detectTall(imgEl) {
    try {
      const w = imgEl.naturalWidth || imgEl.width || 1;
      const h = imgEl.naturalHeight || imgEl.height || 1;
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      const scaledH = ((window.innerWidth - 96) / w) * h;
      box.classList.toggle("is-tall-image", h/w > 1.6 || scaledH > vh * 0.95);
    } catch(e) { box.classList.remove("is-tall-image"); }
    try { stage.scrollTop = 0; stage.scrollLeft = 0; } catch(err) {}
  }

  function render(i) {
    const list = galleries[currentGroup];
    if (!list || !list.length) throw new Error("galleries empty for: " + currentGroup);
    box.classList.remove("is-tall-image");
    currentIdx = (i + list.length) % list.length;
    const it = list[currentIdx];
    stage.innerHTML = "";
    let media;
    if (it.type === "video") {
      media = document.createElement("video");
      media.src = it.src;
      media.controls = true;
      media.setAttribute("playsinline",""); media.setAttribute("webkit-playsinline","");
    } else {
      media = document.createElement("img");
      media.src = it.src;
      media.alt = "";
      media.draggable = false;
      media.addEventListener("load", () => { stage.classList.add("has-image"); detectTall(media); }, { once: true });
      media.addEventListener("error", () => { stage.classList.add("has-image"); box.classList.remove("is-tall-image"); }, { once: true });
    }
    media.style.cssText = "max-width:calc(100vw - 96px)!important;max-height:calc(100vh - 140px)!important;width:auto;height:auto;object-fit:contain!important;object-position:top center!important;display:block;margin:0 auto;flex-shrink:0;";
    stage.appendChild(media);
    if (counter) counter.textContent = (currentIdx + 1) + " / " + list.length;
    if (it.type !== "video") {
      const retry = () => detectTall(media);
      setTimeout(retry, 80); setTimeout(retry, 300); setTimeout(retry, 900); setTimeout(retry, 2000); setTimeout(retry, 5000);
    }
  }

  // ===== 打开灯箱：只用 class 锁滚动（不改 style.overflow） =====
  function openLB(g, i) {
    currentGroup = g;
    render(i); // render 抛错 → 由外层 onerror 兜底 unlock，不需要单独 try
    box.classList.add("open");
    // 下一帧：确认真的 display != none 才锁滚动
    requestAnimationFrame(() => {
      const visible = box.classList.contains("open") && (getComputedStyle(box).display || "") !== "none";
      if (!visible) { closeLB(); return; }
      // 保存当前滚动位置 + 加 class 锁（CSS 里是 html.lb-open-on { overflow:hidden })
      _savedScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      try { document.documentElement.classList.add("lb-open-on"); } catch(e){}
      try { document.body.classList.add("lb-open-on"); } catch(e){}
      // 事件层双保险：灯箱打开期间，捕获阶段拦截滚轮 / 触摸滚动（防止穿透到背景页面）
      installBlockers(true);
    });
  }

  // ===== 关闭灯箱：去 class + 恢复滚动位置 =====
  function closeLB() {
    try { box.classList.remove("open", "is-tall-image"); } catch(e){}
    try { stage.innerHTML = ""; } catch(e){}
    try { stage.scrollTop = 0; stage.scrollLeft = 0; } catch(e){}
    try { document.documentElement.classList.remove("lb-open-on"); } catch(e){}
    try { document.body.classList.remove("lb-open-on"); } catch(e){}
    installBlockers(false);
    // 恢复滚动位置（在解锁后下一帧，避免抖动）
    const y = _savedScrollY || 0;
    requestAnimationFrame(() => { try { window.scrollTo(0, y); } catch(e){} });
    _savedScrollY = 0;
  }

  // ===== 事件层的滚动穿透拦截（不依赖 overflow:hidden） =====
  let blockersInstalled = false;
  function wheelOrTouchHandler(e) {
    if (!box.classList.contains("open")) return;
    // 如果滚动发生在 stage 内部（长图），让它自己滚；否则拦截
    const target = e.target;
    const inStage = stage && (stage.contains(target) || target === stage);
    if (!inStage) { e.preventDefault(); e.stopPropagation(); return; }
    // 在 stage 内：若滚到边界，也拦截避免穿到底层
    if (e.type === "wheel") {
      const dy = (e.deltaY || 0);
      const atTop = stage.scrollTop <= 0;
      const atBottom = (stage.scrollTop + stage.clientHeight) >= stage.scrollHeight - 1;
      if ((dy < 0 && atTop) || (dy > 0 && atBottom)) { e.preventDefault(); e.stopPropagation(); }
    }
  }
  function installBlockers(on) {
    if (!!on === !!blockersInstalled) return;
    blockersInstalled = !!on;
    const opts = { capture: true, passive: false };
    if (on) {
      window.addEventListener("wheel", wheelOrTouchHandler, opts);
      window.addEventListener("touchmove", wheelOrTouchHandler, opts);
      window.addEventListener("touchstart", wheelOrTouchHandler, opts);
    } else {
      window.removeEventListener("wheel", wheelOrTouchHandler, true);
      window.removeEventListener("touchmove", wheelOrTouchHandler, true);
      window.removeEventListener("touchstart", wheelOrTouchHandler, true);
    }
  }

  // 三连 ESC 紧急出口
  let escSeq = 0, escTimer = 0;
  document.addEventListener("keydown", function(ev){
    if (ev.key === "Escape") {
      if (box.classList.contains("open")) return; // 正常由下面的 listener 走 closeLB
      escSeq++; clearTimeout(escTimer);
      escTimer = setTimeout(() => escSeq = 0, 1600);
      if (escSeq >= 3) { closeLB(); escSeq = 0; if (typeof window.__lbEmergencyOff === "function") window.__lbEmergencyOff(); }
    }
  }, true);

  // 右上角 / 返回按钮 / 左右切图
  btnClose && btnClose.addEventListener("click", (e) => { e.stopPropagation(); closeLB(); });
  btnPrev  && btnPrev.addEventListener("click", (e) => { e.stopPropagation(); try { render(currentIdx - 1); } catch(err){ closeLB(); }});
  btnNext  && btnNext.addEventListener("click", (e) => { e.stopPropagation(); try { render(currentIdx + 1); } catch(err){ closeLB(); }});

  // 点击空白遮罩（box 自身 / stage padding 区）退出
  box.addEventListener("click", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.target === box) { e.preventDefault(); e.stopImmediatePropagation(); closeLB(); }
  }, true);
  if (stage) {
    stage.addEventListener("click", (e) => {
      if (!box.classList.contains("open")) return;
      if (e.target === stage) { e.preventDefault(); e.stopImmediatePropagation(); closeLB(); }
    }, true);
  }

  // 键盘：左右切图；ESC 关；其他滚动键在打开期间屏蔽（防止滚动穿透）
  const BLOCK = ["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "];
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    else if (e.key === "ArrowLeft")  { try { render(currentIdx - 1); } catch(err){ closeLB(); }}
    else if (e.key === "ArrowRight") { try { render(currentIdx + 1); } catch(err){ closeLB(); }}
    else if (BLOCK.includes(e.key)) { e.preventDefault(); e.stopPropagation(); }
  }, true);
}

function initPageTransition() {
const body = document.body;
body.classList.add("page-transition-in");
document.querySelectorAll('a[href]').forEach(a => {
const href = a.getAttribute("href") || "";
if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
if (a.target === "_blank") return;
if (!/\.html($|\?|#)/i.test(href)) return;
a.addEventListener("click", e => {
// 允许新打开标签页等组合键
if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
e.preventDefault();
body.classList.remove("page-transition-in");
body.classList.add("page-transition-out");
setTimeout(() => { location.href = href; }, 300);
});
});
}
// ---------- 联系页：复制 ----------
function initCopy() {
document.querySelectorAll("[data-copy]").forEach(el => {
el.addEventListener("click", async () => {
const v = el.getAttribute("data-copy");
try {
await navigator.clipboard.writeText(v);
const tip = el.querySelector(".copy-tip");
if (tip) {
const origin = tip.textContent;
tip.textContent = DICT[getLang()]["contact.copied"] || "Copied";
setTimeout(() => { tip.textContent = origin; }, 1600);
}
} catch (e) { /* noop */ }
});
});
}
// ---------- 懒加载（兜底） ----------
function initLazy() {
if (!("IntersectionObserver" in window)) {
document.querySelectorAll("img[data-src], video[data-src]").forEach(el => {
el.src = el.dataset.src;
});
return;
}
const io = new IntersectionObserver(entries => {
entries.forEach(e => {
if (e.isIntersecting) {
const el = e.target;
if (el.dataset.src) { el.src = el.dataset.src; el.removeAttribute("data-src"); }
if (el.dataset.poster) { el.poster = el.dataset.poster; el.removeAttribute("data-poster"); }
io.unobserve(el);
}
});
}, { rootMargin: "200px" });
document.querySelectorAll("img[data-src], video[data-src]").forEach(el => io.observe(el));
}
// ---------- audio 播放器波形（简单 canvas 柱状动画） ----------
function initAudioWave() {
document.querySelectorAll("audio.wave-audio").forEach(audio => {
const canvas = audio.parentElement.querySelector("canvas.wave-canvas");
if (!canvas) return;
const ctx = canvas.getContext("2d");
function resize() {
const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
window.addEventListener("resize", resize);
const bars = 48;
const h = canvas.clientHeight;
const w = canvas.clientWidth;
const bw = w / bars;
let raf = 0;
function draw() {
ctx.clearRect(0, 0, w, h);
const playing = !audio.paused;
for (let i = 0; i < bars; i++) {
let v;
if (playing) {
const seed = (i * 11 + performance.now() / 180) % 6.28;
v = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(seed)) * (0.6 + 0.4 * Math.sin(i / 3));
} else {
v = 0.18 + 0.06 * Math.sin(i * 0.7);
}
const bh = Math.max(2, v * h);
const x = i * bw + 1;
const y = (h - bh) / 2;
const grd = ctx.createLinearGradient(0, y, 0, y + bh);
grd.addColorStop(0, "rgba(176,165,196,0.85)");
grd.addColorStop(1, "rgba(138,163,196,0.35)");
ctx.fillStyle = grd;
const r = Math.min(2, (bw - 2) / 2);
roundRect(ctx, x, y, bw - 2, bh, r);
ctx.fill();
}
raf = requestAnimationFrame(draw);
}
cancelAnimationFrame(raf);
draw();
});
}
function roundRect(ctx, x, y, w, h, r) {
ctx.beginPath();
ctx.moveTo(x + r, y);
ctx.arcTo(x + w, y,     x + w, y + h, r);
ctx.arcTo(x + w, y + h, x,     y + h, r);
ctx.arcTo(x,     y + h, x,     y,     r);
ctx.arcTo(x,     y,     x + w, y,     r);
ctx.closePath();
}
// ---------- 视频卡片：mouseenter 静音播放预览（可选） ----------
// ---------- 视频卡片：mouseenter 静音播放预览（可选） ----------
function initVideoPreview() {
document.querySelectorAll(".work-card .cover video.preview").forEach(v => {
v.muted = true; v.playsInline = true; v.loop = true;
v.setAttribute("playsinline", "");
v.setAttribute("webkit-playsinline", "");
const card = v.closest(".work-card");
if (!card) return;
card.addEventListener("mouseenter", () => { try { v.play(); } catch(e){} });
card.addEventListener("mouseleave", () => { try { v.pause(); v.currentTime = 0; } catch(e){} });
});
// 视频卡片中央播放按钮：点击 → 跳卡片对应详情页（卡片本身就是 <a>）
document.querySelectorAll(".work-card .cover .play-pulse").forEach(btn => {
btn.style.cursor = "pointer";
btn.addEventListener("click", e => {
const a = btn.closest("a[href]");
if (!a) return;
e.preventDefault();
e.stopPropagation();
window.location.href = a.getAttribute("href");
});
});
}
// ---------- 详情页视频：保证 controls 全屏按钮可用 + 双击全屏兜底 ----------
function initDetailVideoFullscreen() {
const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
const S_PLAY='<path d="M8 5v14l11-7z" fill="currentColor"/>';const S_PAUSE='<path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/>';
const S_SON='   <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>   <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>   <path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';const S_SOFF='   <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>   <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>   <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
const S_PIP='   <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>   <rect x="12" y="11" width="7" height="6" rx="1" fill="currentColor" opacity="0.92" stroke="none"/>';
document.querySelectorAll('video[controls], video.force-pip').forEach((v) => {
// 桌面端：取消原生 controls（防止原生全屏按钮继续存在/点击没反应），挂自定义控制条
// 移动端：保留原生 controls，不做 PiP
v.setAttribute('webkit-playsinline','');v.setAttribute('playsinline','');
v.style.objectFit='contain';v.style.objectPosition='center center';
v.style.width='100%';v.style.height='100%';v.style.display='block';v.style.background='#000';
let p=v.parentElement;let guard=0;
while (p && guard<6 && p!==document.body) {
const cs=window.getComputedStyle?window.getComputedStyle(p):null;
if(cs){if(cs.overflow!=='visible')p.style.setProperty('overflow','visible','important');
if(cs.transform!=='none')p.style.setProperty('transform','none','important');
const bf=(window.getComputedStyle(p).backdropFilter||'none');
if(bf!=='none'){p.style.setProperty('-webkit-backdrop-filter','none','important');p.style.setProperty('backdrop-filter','none','important');}
if(cs.clipPath&&cs.clipPath!=='none')p.style.setProperty('clip-path','none','important');}
p=p.parentElement;guard++;
}
const host=v.parentElement;if(!host)return;
const cs=window.getComputedStyle(host);
if(cs.position==='static')host.style.position='relative';
if(isTouch){v.setAttribute('controls','');return;}
// 移除原生 controls（Shadow DOM 里的全屏按钮是无法从外部 JS 拦截它的默认行为的）
v.removeAttribute('controls');
// ========== 组装自定义控制条 ==========
const bar=document.createElement('div');
bar.className='video-controls';
bar.innerHTML = 
'<button class="vc-btn vc-play" title="播放/暂停 (空格)">' +
'<svg class="vc-play-icon" width="16" height="16" viewBox="0 0 24 24">'+S_PLAY+'</svg>' +
'<svg class="vc-pause-icon" width="16" height="16" viewBox="0 0 24 24">'+S_PAUSE+'</svg>' +
'</button>' +
'<span class="vc-time vc-cur">00:00</span>' +
'<div class="vc-progress" title="拖动或点击跳转进度">' +
'<div class="vc-progress-buffered"></div>' +
'<div class="vc-progress-played"></div>' +
'<div class="vc-progress-thumb"></div>' +
'</div>' +
'<span class="vc-time vc-dur">00:00</span>' +
'<button class="vc-btn vc-mute" title="静音/取消静音 (M)">' +
'<svg class="vc-sound-on" width="16" height="16" viewBox="0 0 24 24">'+S_SON+'</svg>' +
'<svg class="vc-sound-off" width="16" height="16" viewBox="0 0 24 24">'+S_SOFF+'</svg>' +
'</button>' +
'<button class="vc-btn vc-pip" title="画中画 (P) — 视频画中画播放">' +
'<svg width="16" height="16" viewBox="0 0 24 24">'+S_PIP+'</svg>' +
'<span class="vc-pip-label">画中画</span>' +
'</button>';
host.appendChild(bar);
const playBtn=bar.querySelector('.vc-play'), muteBtn=bar.querySelector('.vc-mute'), pipBtn=bar.querySelector('.vc-pip');
const curEl=bar.querySelector('.vc-cur'), durEl=bar.querySelector('.vc-dur');
const prog=bar.querySelector('.vc-progress'), played=bar.querySelector('.vc-progress-played');
const buff=bar.querySelector('.vc-progress-buffered'), thumb=bar.querySelector('.vc-progress-thumb');
const fmt=(s)=>{if(!isFinite(s)||s<0)s=0;const m=Math.floor(s/60),sec=Math.floor(s%60);return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');};
const upd=()=>{
const d=v.duration||0,c=v.currentTime||0;
durEl.textContent=fmt(d);curEl.textContent=fmt(c);
const pct=d?(c/d*100):0;played.style.width=pct+'%';thumb.style.left=pct+'%';
try{if(v.buffered&&v.buffered.length&&d){buff.style.width=(v.buffered.end(v.buffered.length-1)/d*100)+'%';}}catch(e){}
playBtn.classList.toggle('is-playing',!v.paused&&!v.ended);
muteBtn.classList.toggle('is-muted',!!v.muted||v.volume===0);
};
['loadedmetadata','loadeddata','timeupdate','durationchange','progress','play','pause','ended','volumechange'].forEach(e=>v.addEventListener(e,upd));
upd();
// 按钮事件
playBtn.addEventListener('click',e=>{e.stopPropagation();v.paused?v.play():v.pause();});
v.addEventListener('click',e=>{e.stopPropagation();v.paused?v.play():v.pause();});
muteBtn.addEventListener('click',e=>{e.stopPropagation();v.muted=!v.muted;upd();});
// 进度条点击 + 拖动
const seek=(ev)=>{if(!v.duration)return;const r=prog.getBoundingClientRect();const x=Math.max(0,Math.min(r.width,((ev.touches?ev.touches[0].clientX:ev.clientX)||r.left)-r.left));v.currentTime=(x/r.width)*v.duration;};
let dragging=false;
prog.addEventListener('mousedown',e=>{dragging=true;seek(e);});
window.addEventListener('mousemove',e=>{if(dragging)seek(e);});
window.addEventListener('mouseup',()=>{dragging=false;});
prog.addEventListener('touchstart',e=>{dragging=true;seek(e);},{passive:true});
prog.addEventListener('touchmove',e=>{seek(e);},{passive:true});
prog.addEventListener('touchend',()=>{dragging=false;});
// === 画中画按钮（就是用户口中"原来的全屏按钮"，现在直接做 PIP ） ===
const togglePip=async ()=>{
try{
if(document.pictureInPictureElement){await document.exitPictureInPicture();return;}
if(document.pictureInPictureEnabled && !v.disablePictureInPicture){
if(v.paused){try{v.muted=true;const p=v.play();if(p&&p.catch)p.catch(()=>{});}catch(e){}}
try{await v.requestPictureInPicture();return;}catch(err){/* fallthrough */}
}
// 兜底：浏览器不支持 PiP 时，退化为新标签页打开视频悬浮
alert('当前浏览器不支持画中画，已改为新窗口打开视频');
window.open(v.currentSrc||v.src,'_blank','noopener');
}catch(e){};
};
pipBtn.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();togglePip();});
// 键盘快捷键（空格播放/暂停 M 静音 P 画中画）
v.tabIndex=0;
const onKey=(e)=>{
const t=e.target;
const barContains=bar.contains(t)||t===v||t===document.body;
if(!barContains)return;
const k=(e.key||'').toLowerCase();
if(k===' '||k==='spacebar'){e.preventDefault();v.paused?v.play():v.pause();}
else if(k==='m'){v.muted=!v.muted;}
else if(k==='p'){togglePip();}
else if(k==='arrowright'){v.currentTime=Math.min((v.duration||0),v.currentTime+5);}
else if(k==='arrowleft'){v.currentTime=Math.max(0,v.currentTime-5);}
};
document.addEventListener('keydown',onKey);
// 自动淡出控制条（播放中不操作一会儿就淡走，像 Netflix 风格）
let hideTimer=null;
const show=()=>{bar.style.opacity='1';bar.style.transform='translateY(0)';clearTimeout(hideTimer);};
const hide=()=>{clearTimeout(hideTimer);hideTimer=setTimeout(()=>{if(!v.paused){bar.style.opacity='0';bar.style.transform='translateY(8px)';}},1800);};
bar.style.transition='opacity .25s ease, transform .25s ease';
host.addEventListener('mousemove',show);
host.addEventListener('mouseenter',()=>{show();hide();});
host.addEventListener('mouseleave',hide);
v.addEventListener('pause',show);
v.addEventListener('play',hide);
});
}
// ---------- 启动 ----------
document.addEventListener("DOMContentLoaded", () => {
initNav();
initReveal();
initFilter();
initLightbox();
initPageTransition();
initCopy();
initLazy();
initAudioWave();
initVideoPreview();
initDetailVideoFullscreen();
});
})();