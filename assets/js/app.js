/* Vergleich: Kategorien, Filter, Sortierung, Vergleich bis zu 4 Produkten */
(function () {
  var cfg = window.SITE_CONFIG;
  var CATS = window.CATEGORIES;
  var PRODUCTS = window.PRODUCTS;
  var MAX_COMPARE = 4;
  var COMPARE_KEY = "kd_compare";

  var state = { cat: CATS[0].id, q: "", maxPrice: "", sort: "score", compare: loadCompare() };

  function loadCompare() { try { return JSON.parse(localStorage.getItem(COMPARE_KEY)) || []; } catch (e) { return []; } }
  function saveCompare() { try { localStorage.setItem(COMPARE_KEY, JSON.stringify(state.compare)); } catch (e) {} }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  var fmtPrice = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  var fmtScore = function (n) { return n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }); };
  var fmtDate = function (iso) { var d = new Date(iso + "T00:00:00"); return isNaN(d) ? iso : d.toLocaleDateString("de-DE"); };
  var catById = function (id) { return CATS.find(function (c) { return c.id === id; }); };

  function affiliateUrl(p) {
    var a = cfg.affiliate.amazon;
    if (p.asin) return a.productUrl.replace("{asin}", encodeURIComponent(p.asin)).replace("{tag}", encodeURIComponent(a.tag));
    return a.searchUrl.replace("{query}", encodeURIComponent(p.query || p.brand + " " + p.name)).replace("{tag}", encodeURIComponent(a.tag));
  }

  // Affiliate-Link: rel="sponsored" + Kennzeichnung mit * (Werbung)
  function affiliateButtons(p, small) {
    var html = "";
    var size = small ? " btn-sm" : "";
    if (cfg.affiliate.amazon.enabled) {
      html += '<a class="btn btn-crema' + size + '" href="' + esc(affiliateUrl(p)) + '" target="_blank" rel="sponsored nofollow noopener" ' +
        'aria-label="' + esc(cfg.affiliate.amazon.label + ": " + p.brand + " " + p.name + " (Werbelink, öffnet neues Fenster)") + '">' +
        esc(cfg.affiliate.amazon.label) + " *</a>";
    }
    (p.links || []).forEach(function (l) {
      html += '<a class="btn btn-ghost' + size + '" href="' + esc(l.url) + '" target="_blank" rel="sponsored nofollow noopener">' + esc(l.label) + " *</a>";
    });
    return html;
  }

  function tier(t) { return '<span class="tier" aria-label="Preisklasse ' + t + ' von 4">' + "€€€€".slice(0, t) + "<i>" + "€€€€".slice(t) + "</i></span>"; }

  function sortList(list, sort) {
    var sorters = {
      score: function (a, b) { return (b.score - a.score) || (a.priceFrom - b.priceFrom); },
      priceAsc: function (a, b) { return a.priceFrom - b.priceFrom; },
      priceDesc: function (a, b) { return b.priceFrom - a.priceFrom; },
      name: function (a, b) { return (a.brand + a.name).localeCompare(b.brand + b.name, "de"); }
    };
    return list.sort(sorters[sort]);
  }

  function filtered() {
    var q = state.q.trim().toLowerCase();
    return sortList(PRODUCTS.filter(function (p) {
      if (p.category !== state.cat) return false;
      if (state.maxPrice && p.priceFrom > Number(state.maxPrice)) return false;
      if (q) {
        var hay = (p.brand + " " + p.name + " " + p.bestFor + " " + Object.values(p.specs).join(" ")).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    }), state.sort);
  }

  function renderTabs() {
    document.getElementById("tabs").innerHTML = CATS.map(function (c) {
      var n = PRODUCTS.filter(function (p) { return p.category === c.id; }).length;
      return '<button class="tab" role="tab" id="tab-' + c.id + '" aria-controls="results" aria-selected="' + (c.id === state.cat) + '" tabindex="' + (c.id === state.cat ? 0 : -1) + '" data-cat="' + c.id + '">' +
        window.ICON(c.id) + esc(c.name) + ' <span class="sr-only">(' + n + " Produkte)</span></button>";
    }).join("");
  }

  function renderCard(p, i) {
    var inCompare = state.compare.indexOf(p.id) !== -1;
    var specs = Object.keys(p.specs).map(function (k) { return '<tr><th scope="row">' + esc(k) + "</th><td>" + esc(p.specs[k]) + "</td></tr>"; }).join("");
    var li = function (x) { return "<li>" + esc(x) + "</li>"; };
    return '<article class="card reveal" id="p-' + esc(p.id) + '">' +
      '<div class="card-top">' + window.ICON(p.category) +
        (state.sort === "score" ? '<span class="rank" aria-label="Platz ' + (i + 1) + '">' + String(i + 1).padStart(2, "0") + "</span>" : "") +
        (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") +
      "</div>" +
      '<div class="card-body">' +
        '<div><div class="brand">' + esc(p.brand) + "</div><h3>" + esc(p.name) + "</h3></div>" +
        '<div class="score"><div class="ring" style="--v:' + p.score * 10 + '"><b>' + fmtScore(p.score) + "</b></div>" +
          '<div class="score-label">Redaktionswertung von 10<br><a href="testverfahren.html">So bewerten wir</a></div></div>' +
        '<div class="bestfor"><strong>Ideal für:</strong> ' + esc(p.bestFor) + "</div>" +
        '<div class="proscons"><div><h4>Stärken</h4><ul class="pros">' + p.pros.map(li).join("") + "</ul></div>" +
          "<div><h4>Schwächen</h4><ul class=\"cons\">" + p.cons.map(li).join("") + "</ul></div></div>" +
        '<details class="more"><summary>Technische Daten</summary><table class="specs"><caption class="sr-only">Technische Daten ' + esc(p.name) + "</caption>" + specs + "</table></details>" +
        '<div class="price-row"><div class="price"><small>ab ca. </small>' + fmtPrice.format(p.priceFrom) + "</div>" + tier(p.priceTier) + "</div>" +
        '<p class="price-note">Unverbindliche Orientierung, Stand ' + fmtDate(cfg.dataLastChecked) + ", inkl. MwSt., ggf. zzgl. Versand. Maßgeblich ist der Preis beim Händler.</p>" +
        '<div class="card-actions">' + affiliateButtons(p) +
          '<label class="compare-toggle"><input type="checkbox" data-compare="' + esc(p.id) + '"' + (inCompare ? " checked" : "") + "> Vergleichen</label></div>" +
        '<div class="ad-note">* Werbelink · <a href="affiliate-hinweis.html">Was heißt das?</a></div>' +
      "</div></article>";
  }

  function render() {
    var cat = catById(state.cat);
    document.getElementById("cat-title").textContent = cat.name;
    document.getElementById("cat-intro").textContent = cat.intro;
    var list = filtered();
    document.getElementById("result-count").textContent = list.length + (list.length === 1 ? " Produkt" : " Produkte") + " · sortiert nach " +
      { score: "Redaktionswertung", priceAsc: "Preis aufsteigend", priceDesc: "Preis absteigend", name: "Name" }[state.sort];
    var res = document.getElementById("results");
    res.setAttribute("aria-labelledby", "tab-" + state.cat);
    res.innerHTML = list.length ? list.map(renderCard).join("")
      : '<p class="empty">Keine Produkte passen zu Ihren Filtern. Versuchen Sie einen höheren Maximalpreis oder einen anderen Suchbegriff.</p>';
    if (window.KDReveal) window.KDReveal(res);
    renderCompareBar();
    renderSchema(list, cat);
  }

  function renderCompareBar() {
    var n = state.compare.length;
    document.getElementById("compare-bar").classList.toggle("visible", n > 0);
    document.getElementById("compare-count").textContent = n + " von " + MAX_COMPARE + " ausgewählt";
    document.getElementById("compare-open").disabled = n < 2;
  }

  function renderCompareTable() {
    var items = state.compare.map(function (id) { return PRODUCTS.find(function (p) { return p.id === id; }); }).filter(Boolean);
    var keys = [];
    items.forEach(function (p) { Object.keys(p.specs).forEach(function (k) { if (keys.indexOf(k) === -1) keys.push(k); }); });
    var bestScore = Math.max.apply(null, items.map(function (p) { return p.score; }));
    var bestPrice = Math.min.apply(null, items.map(function (p) { return p.priceFrom; }));
    var row = function (label, fn) { return '<tr><th scope="row">' + label + "</th>" + items.map(function (p) { return "<td>" + fn(p) + "</td>"; }).join("") + "</tr>"; };
    document.getElementById("compare-content").innerHTML =
      '<table class="compare-table"><thead><tr><th scope="col"><span class="sr-only">Merkmal</span></th>' +
      items.map(function (p) { return '<th scope="col"><small>' + esc(p.brand) + "</small>" + esc(p.name) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      row("Kategorie", function (p) { return esc(catById(p.category).name); }) +
      row("Redaktionswertung", function (p) { return '<span class="' + (p.score === bestScore ? "best" : "") + '">' + fmtScore(p.score) + " / 10</span>"; }) +
      row("Preis ab ca.", function (p) { return '<span class="' + (p.priceFrom === bestPrice ? "best" : "") + '">' + fmtPrice.format(p.priceFrom) + "</span>"; }) +
      row("Ideal für", function (p) { return esc(p.bestFor); }) +
      keys.map(function (k) { return row(esc(k), function (p) { return p.specs[k] != null ? esc(p.specs[k]) : "–"; }); }).join("") +
      row("Stärken", function (p) { return p.pros.map(esc).join("<br>"); }) +
      row("Schwächen", function (p) { return p.cons.map(esc).join("<br>"); }) +
      row("Angebot", function (p) { return affiliateButtons(p, true); }) +
      "</tbody></table>" +
      '<p class="ad-note">* Werbelinks. Preise: unverbindliche Orientierung, Stand ' + fmtDate(cfg.dataLastChecked) + ". ★ = bester Wert dieser Auswahl.</p>";
  }

  // Strukturierte Daten: nur ItemList – keine selbst vergebenen Sterne als Rich Snippet
  function renderSchema(list, cat) {
    var node = document.getElementById("schema-itemlist");
    if (!node) return;
    node.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "ItemList", name: cat.name + " im Vergleich",
      itemListElement: list.map(function (p, i) { return { "@type": "ListItem", position: i + 1, name: p.brand + " " + p.name }; })
    });
  }

  function selectCat(id, focus) {
    state.cat = id;
    history.replaceState(null, "", "#" + id);
    renderTabs(); render();
    if (focus) document.getElementById("tab-" + id).focus();
  }

  function bind() {
    var tabs = document.getElementById("tabs");
    tabs.addEventListener("click", function (e) { var b = e.target.closest("[data-cat]"); if (b) selectCat(b.getAttribute("data-cat")); });
    tabs.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      var idx = CATS.findIndex(function (c) { return c.id === state.cat; });
      idx = (idx + (e.key === "ArrowRight" ? 1 : -1) + CATS.length) % CATS.length;
      selectCat(CATS[idx].id, true);
    });
    document.getElementById("search").addEventListener("input", function (e) { state.q = e.target.value; render(); });
    document.getElementById("maxprice").addEventListener("change", function (e) { state.maxPrice = e.target.value; render(); });
    document.getElementById("sort").addEventListener("change", function (e) { state.sort = e.target.value; render(); });

    document.getElementById("results").addEventListener("change", function (e) {
      var id = e.target.getAttribute("data-compare");
      if (!id) return;
      if (e.target.checked) {
        if (state.compare.length >= MAX_COMPARE) { e.target.checked = false; alert("Sie können maximal " + MAX_COMPARE + " Produkte vergleichen."); return; }
        state.compare.push(id);
      } else {
        state.compare = state.compare.filter(function (x) { return x !== id; });
      }
      saveCompare(); renderCompareBar();
    });

    var dlg = document.getElementById("compare-dialog");
    document.getElementById("compare-open").addEventListener("click", function () { renderCompareTable(); dlg.showModal(); });
    document.getElementById("compare-close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    document.getElementById("compare-clear").addEventListener("click", function () { state.compare = []; saveCompare(); render(); });
  }

  // Öffentliche Helfer für Kaffee-Finder
  window.KD = {
    esc: esc, fmtPrice: fmtPrice, fmtScore: fmtScore, affiliateButtons: affiliateButtons, sortList: sortList, catById: catById,
    showCategory: function (id, maxPrice) {
      state.maxPrice = maxPrice ? String(maxPrice) : "";
      var sel = document.getElementById("maxprice");
      sel.value = [].some.call(sel.options, function (o) { return o.value === state.maxPrice; }) ? state.maxPrice : "";
      state.maxPrice = sel.value;
      selectCat(id);
      document.getElementById("vergleich").scrollIntoView({ behavior: "smooth" });
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    var hash = location.hash.slice(1);
    if (CATS.some(function (c) { return c.id === hash; })) state.cat = hash;
    state.compare = state.compare.filter(function (id) { return PRODUCTS.some(function (p) { return p.id === id; }); });
    document.querySelectorAll("[data-product-count]").forEach(function (n) { n.textContent = PRODUCTS.length; });
    renderTabs(); bind(); render();
    if (CATS.some(function (c) { return c.id === hash; })) document.getElementById("vergleich").scrollIntoView();
  });
})();
