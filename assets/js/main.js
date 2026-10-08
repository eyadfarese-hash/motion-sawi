/* ==========================================================================
   SAWI — site behaviour (shared by every page)
   ========================================================================== */
(function () {
  "use strict";
  var D = window.SAWI || { projects: [] };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  document.documentElement.classList.add("js");

  /* ---------- Contact links ---------- */
  $$("[data-email]").forEach(function (el) { el.textContent = D.email; if (el.tagName === "A") el.href = "mailto:" + D.email; });
  $$("[data-link]").forEach(function (el) { var k = el.getAttribute("data-link"); if (D[k]) el.href = D[k]; });
  $$("[data-copy-email]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(D.email).then(done, function () {});
    });
  });
  var y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Cairo clock ---------- */
  var clock = $("[data-clock]");
  if (clock) {
    var tick = function () { try { clock.textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Cairo" }).format(new Date()); } catch (e) {} };
    tick(); setInterval(tick, 30000);
  }

  /* ---------- Mobile menu ---------- */
  var mb = $(".menu-btn"), mm = $(".mobile-menu");
  if (mb && mm) {
    var setMenu = function (open) { mm.classList.toggle("open", open); mb.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : ""; };
    mb.addEventListener("click", function () { setMenu(!mm.classList.contains("open")); });
    $$("a", mm).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- Videos: play only while visible ---------- */
  function watchVideos(root) {
    var vids = $$("video[data-autoplay]", root);
    if (!("IntersectionObserver" in window)) { vids.forEach(function (v) { v.play && v.play().catch(function () {}); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && !reduce) { var p = v.play(); if (p) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.15 });
    vids.forEach(function (v) { v.muted = true; io.observe(v); });
  }

  /* ---------- Reveal on scroll ---------- */
  function reveal(root) {
    var els = $$(".rv", root);
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Headline word reveal ---------- */
  $$("[data-split]").forEach(function (h) {
    var i = 0;
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            var o = document.createElement("span"); o.className = "h-word";
            var s = document.createElement("span"); s.textContent = w; s.style.animationDelay = (120 + i++ * 70) + "ms";
            o.appendChild(s); frag.appendChild(o);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(h);
  });

  var mediaTag = function (p, cls) {
    return '<video data-autoplay muted loop playsinline preload="metadata" poster="' + esc(p.poster) + '" src="' + esc(p.loop) + '" aria-label="' + esc(p.title) + ' film"' + (cls ? ' class="' + cls + '"' : "") + '></video>';
  };
  var playIcon = '<svg width="13" height="15" viewBox="0 0 14 16" aria-hidden="true"><path d="M1.5 1v14L13 8z" fill="#F4F2ED"/></svg>';

  /* ======================= HOME ======================= */
  var grid = $("#work-grid");
  if (grid) {
    var sizes = { wide: ["s12", "16 / 7"], large: ["s7", "4 / 3"], tall: ["s5", "4 / 5"], half: ["s6", "4 / 3"] };
    grid.innerHTML = D.projects.map(function (p, i) {
      var s = sizes[p.layout] || sizes.half;
      return '<a class="w-item rv ' + s[0] + (i === 0 ? " featured" : "") + '" href="project.html?p=' + encodeURIComponent(p.slug) + '" data-sector="' + esc(p.sector) + '">' +
        '<div class="w-media' + (p.layout === "tall" ? " tall" : "") + '" style="aspect-ratio:' + s[1] + '">' + mediaTag(p) +
        '<span class="w-chip l">' + String(i + 1).padStart(2, "0") + '</span><span class="w-chip r">' + esc(p.format + " · " + p.fps) + '</span>' +
        '<span class="w-cta"><i>' + playIcon + '</i>View case study</span></div>' +
        '<div class="w-meta"><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.sector + " · " + p.type) + '</p></div><span class="mono">' + esc(p.year || p.duration) + '</span></div></a>';
    }).join("");

    var sectors = [];
    D.projects.forEach(function (p) { if (sectors.indexOf(p.sector) < 0) sectors.push(p.sector); });
    var fl = $("#filters");
    fl.innerHTML = '<button type="button" class="filter" aria-pressed="true" data-f="All">All<span class="n">' + D.projects.length + '</span></button>' +
      sectors.map(function (s) { return '<button type="button" class="filter" aria-pressed="false" data-f="' + esc(s) + '">' + esc(s) + '</button>'; }).join("");
    fl.addEventListener("click", function (e) {
      var b = e.target.closest(".filter"); if (!b) return;
      var f = b.getAttribute("data-f");
      $$(".filter", fl).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      $$(".w-item", grid).forEach(function (it) {
        var show = f === "All" || it.getAttribute("data-sector") === f;
        it.hidden = !show;
        if (show) it.classList.add("in");
      });
      // a single visible project spans the full row
      var vis = $$(".w-item:not([hidden])", grid);
      vis.forEach(function (it) { it.style.gridColumn = vis.length === 1 ? "span 12" : ""; });
    });
  }

  /* ---------- Motion editor (hero) ---------- */
  var editor = $("#editor");
  if (editor) {
    var P = {
      confident: { name: "Confident", bez: [.22, 1, .36, 1], dur: 560, stagger: 2, over: "none", y: 32, label: "0.22, 1, 0.36, 1", total: 1.52 },
      overshoot: { name: "Playful", bez: [.34, 1.56, .64, 1], dur: 480, stagger: 3, over: "8%", y: 40, label: "0.34, 1.56, 0.64, 1", total: 1.36 },
      premium:   { name: "Premium", bez: [.65, 0, .35, 1], dur: 1200, stagger: 5, over: "none", y: 18, label: "0.65, 0, 0.35, 1", total: 2.6 },
      nostagger: { name: "Unified", bez: [.22, 1, .36, 1], dur: 560, stagger: 0, over: "none", y: 32, label: "0.22, 1, 0.36, 1", total: 1.2 },
      soft:      { name: "Soft", bez: [.4, 0, .2, 1], dur: 900, stagger: 3, over: "none", y: 12, label: "0.4, 0, 0.2, 1", total: 2.0 }
    };
    var letters = $$(".wordmark span", editor), line = $(".underline", editor), tag = $(".tagline", editor);
    var head = $(".playhead", editor), timeB = $(".tl-time b", editor), totalEl = $("[data-total]", editor);
    var persEl = $("[data-pers]", editor), curve = $("[data-curve]", editor), curveVal = $("[data-curve-val]", editor);
    var propDur = $("[data-p-dur]", editor), propStag = $("[data-p-stag]", editor), propOver = $("[data-p-over]", editor), propY = $("[data-p-y]", editor);
    var clips = { mark: $("[data-clip=mark]", editor), word: $("[data-clip=word]", editor), line: $("[data-clip=line]", editor), tag: $("[data-clip=tag]", editor) };
    var current = "confident", anims = [], raf = 0, t0 = 0, playing = false;

    var placeClip = function (el, a, b, total) {
      if (!el) return;
      var l = a / total * 100, w = (b - a) / total * 100;
      el.style.left = l + "%"; el.style.width = w + "%";
      var kfs = $$(".kf", el.parentNode);
      if (kfs[0]) kfs[0].style.left = l + "%";
      if (kfs[1]) kfs[1].style.left = (l + w) + "%";
    };

    var run = function (key) {
      var p = P[key]; current = key;
      var ease = "cubic-bezier(" + p.bez.join(",") + ")";
      var d = p.dur, st = p.stagger * 40; // 1 frame = 40ms at 25fps
      anims.forEach(function (a) { a.cancel(); }); anims = [];
      // timeline layout (seconds)
      var wordStart = 0.12, wordEnd = wordStart + (d + st * (letters.length - 1)) / 1000;
      var lineStart = wordEnd - 0.1, lineEnd = lineStart + d * 0.7 / 1000;
      var tagStart = lineStart + 0.1, tagEnd = Math.min(p.total, tagStart + d / 1000);
      var total = Math.max(p.total, tagEnd + 0.15);
      placeClip(clips.mark, 0, Math.min(total, d * 0.6 / 1000), total);
      placeClip(clips.word, wordStart, wordEnd, total);
      placeClip(clips.line, lineStart, lineEnd, total);
      placeClip(clips.tag, tagStart, tagEnd, total);
      // ruler matches this timeline's length
      var ruler = $(".ruler", editor);
      if (ruler) { var marks = ""; for (var k = 0; k <= 6; k++) marks += "<span>" + (total * k / 6).toFixed(1) + "</span>"; ruler.innerHTML = marks; }
      // readouts
      persEl.textContent = p.name;
      totalEl.textContent = total.toFixed(2);
      curveVal.textContent = p.label;
      var b = p.bez;
      curve.setAttribute("d", "M0 100 C" + (b[0] * 160) + " " + (100 - b[1] * 100) + ", " + (b[2] * 160) + " " + (100 - b[3] * 100) + ", 160 0");
      propDur.textContent = Math.round(d / 40) + "f";
      propStag.textContent = p.stagger + "f";
      propOver.textContent = p.over;
      propY.textContent = p.y + " → 0";
      if (reduce) { head.style.left = "100%"; timeB.textContent = total.toFixed(2); return; }
      // animate stage
      letters.forEach(function (el, i) {
        anims.push(el.animate([{ transform: "translateY(" + p.y + "px)", opacity: 0 }, { transform: "none", opacity: 1 }],
          { duration: d, delay: wordStart * 1000 + i * st, easing: ease, fill: "both" }));
      });
      anims.push(line.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: d * 0.7, delay: lineStart * 1000, easing: ease, fill: "both" }));
      anims.push(tag.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: d, delay: tagStart * 1000, easing: ease, fill: "both" }));
      // playhead
      cancelAnimationFrame(raf); t0 = performance.now(); playing = true;
      var step = function (now) {
        var t = Math.min(total, (now - t0) / 1000);
        head.style.left = (t / total * 100) + "%";
        timeB.textContent = t.toFixed(2);
        if (t < total) raf = requestAnimationFrame(step);
        else { playing = false; setTimeout(function () { if (!playing && document.visibilityState === "visible" && inView) run(current); }, 1800); }
      };
      raf = requestAnimationFrame(step);
    };

    $$(".chip", editor).forEach(function (c) {
      c.addEventListener("click", function () {
        $$(".chip", editor).forEach(function (x) { x.setAttribute("aria-pressed", x === c); });
        run(c.getAttribute("data-p"));
      });
    });
    $(".tl-play", editor).addEventListener("click", function () { run(current); });
    $(".ed-apply", editor).addEventListener("click", function () { run(current); });

    var inView = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { inView = es[0].isIntersecting; if (inView && !playing) run(current); }, { threshold: 0.3 }).observe(editor);
    }
    run("confident");
  }

  /* ======================= PROJECT PAGE ======================= */
  var pageRoot = $("#project");
  if (pageRoot) {
    var slug = new URLSearchParams(location.search).get("p") || (location.hash || "").slice(1);
    var idx = 0;
    D.projects.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    var p = D.projects[idx], n = D.projects[(idx + 1) % D.projects.length];
    document.title = p.title + " — SAWI";
    var md = $('meta[name="description"]'); if (md) md.setAttribute("content", p.intro);
    var credit = "Eyad Fares" + (D.company ? " at " + D.company : "");
    var g = p.gallery || [];
    pageRoot.innerHTML =
      '<div class="p-head"><div><span class="mono">' + esc(p.sector + " · " + p.type + (p.year ? " · " + p.year : "")) + '</span><h1>' + esc(p.title) + '</h1></div><p>' + esc(p.intro) + '</p></div>' +
      '<div class="p-film' + (p.vertical ? " vertical" : "") + '" style="aspect-ratio:' + (p.vertical ? "9 / 16" : "16 / 9") + '"><video src="' + esc(p.film) + '" poster="' + esc(p.poster) + '" controls playsinline preload="metadata" aria-label="' + esc(p.title) + ' film"></video></div>' +
      '<div class="p-cap"><span class="mono-plain">' + esc(p.title + " — " + p.type.toLowerCase()) + '</span><span class="mono-plain">' + esc(p.duration + " · " + p.res + " · " + p.fps) + '</span></div>' +
      '<div class="facts"><div><span class="mono">Client</span>' + esc(p.title) + '</div><div><span class="mono">Sector</span>' + esc(p.sector) + '</div><div><span class="mono">Role</span>' + esc(p.role) + '</div><div><span class="mono">Credit</span>' + esc(credit) + '</div></div>' +
      '<div class="seen"><span class="mono">In the film</span>' + (p.seen || []).map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") + '</div>' +
      '<section class="story">' +
        '<div class="story-row rv"><h2 class="mono">(01) The challenge</h2><p>' + esc(p.challenge) + '</p></div>' +
        '<div class="story-row dec rv"><h2 class="mono">(02) The motion decision</h2><p>' + esc(p.decision) + '</p></div>' +
      '</section>' +
      '<div class="gallery' + (p.vertical ? " vertical" : "") + '">' + ["a", "b", "c"].map(function (c, i) {
        return g[i] ? '<figure class="' + c + ' rv"><img src="' + esc(g[i].src) + '" alt="' + esc(p.title + ", " + g[i].caption) + '" loading="lazy"><figcaption>' + esc(g[i].caption) + '</figcaption></figure>' : "";
      }).join("") + '</div>' +
      '<section class="story" style="gap:0"><div class="story-row rv"><h2 class="mono">(03) The result</h2><p>' + esc(p.result) + '</p></div></section>' +
      '<div class="card spec rv"><div><span class="mono">Duration</span><b>' + esc(p.duration) + '</b></div><div><span class="mono">Format</span><b>' + esc(p.format + " · " + p.fps) + '</b></div><div><span class="mono">Motion device</span><b>' + esc(p.device) + '</b></div><div><span class="mono">Personality</span><b>' + esc(p.personality) + '</b></div></div>' +
      '<a class="next" href="project.html?p=' + encodeURIComponent(n.slug) + '"><div><span class="mono">Next project · ' + String((idx + 1) % D.projects.length + 1).padStart(2, "0") + '</span><div class="t">' + esc(n.title) + ' <span class="red">→</span></div></div><div class="thumb">' + mediaTag(n) + '</div></a>';
    var counter = $("[data-counter]"); if (counter) counter.textContent = String(idx + 1).padStart(2, "0") + " / " + String(D.projects.length).padStart(2, "0");
    scrollTo(0, 0);
  }

  watchVideos(document);
  reveal(document);
})();
