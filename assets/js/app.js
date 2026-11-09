/* Vergleichslogik: Kategorien, Filter, Sortierung, Vergleich bis zu 4 Produkten */
(function () {
  var cfg = window.SITE_CONFIG;
  var CATS = window.CATEGORIES;
  var PRODUCTS = window.PRODUCTS;
  var MAX_COMPARE = 4;
  var COMPARE_KEY = "kd_compare";

  var state = {
    cat: CATS[0].id,
    q: "",
    maxPrice: "",
    sort: "score",
    compare: loadCompare()
  };

  function loadCompare() {
    try { return JSON.parse(localStorage.getItem(COMPARE_KEY)) || []; } catch (e) { return []; }
  }
  function saveCompare() {
    try { localStorage.setItem(COMPARE_KEY, JSON.stringify(state.compare)); } catch (e) {}
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var fmtPrice = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  var fmtScore = function (n) { return n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }); };
  var fmtDate = function (iso) {
    var d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("de-DE");
  };

  function affiliateUrl(p) {
    var a = cfg.affiliate.amazon;
    if (p.asin) return a.productUrl.replace("{asin}", encodeURIComponent(p.asin)).replace("{tag}", encodeURIComponent(a.tag));
    return a.searchUrl.replace("{query}", encodeURIComponent(p.query || p.brand + " " + p.name)).replace("{tag}", encodeURIComponent(a.tag));
  }

  // Affiliate-Link: rel="sponsored" (Google-Vorgabe), Kennzeichnung mit * und "Anzeige"
  function affiliateButtons(p) {
    var html = "";
    if (cfg.affiliate.amazon.enabled) {
      html += '<a class="btn btn-primary" href="' + esc(affiliateUrl(p)) + '" target="_blank" rel="sponsored nofollow noopener" ' +
        'aria-label="' + esc(cfg.affiliate.amazon.label + ": " + p.brand + " " + p.name + " (Werbelink, öffnet neues Fenster)") + '">' +
        esc(cfg.affiliate.amazon.label) + " *</a>";
    }
    (p.links || []).forEach(function (l) {
      html += '<a class="btn btn-secondary" href="' + esc(l.url) + '" target="_blank" rel="sponsored nofollow noopener">' + esc(l.label) + " *</a>";
    });
    return html;
  }

  function tierLabel(t) { return "€€€€".slice(0, t) + '<span style="opacity:.3">' + "€€€€".slice(t) + "</span>"; }

  function filtered() {
    var q = state.q.trim().toLowerCase();
    var list = PRODUCTS.filter(function (p) {
      if (p.category !== state.cat) return false;
      if (state.maxPrice && p.priceFrom > Number(state.maxPrice)) return false;
      if (q) {
        var hay = (p.brand + " " + p.name + " " + p.bestFor + " " + Object.values(p.specs).join(" ")).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    var sorters = {
      score: function (a, b) { return (b.score - a.score) || (a.priceFrom - b.priceFrom); },
      priceAsc: function (a, b) { return a.priceFrom - b.priceFrom; },
      priceDesc: function (a, b) { return b.priceFrom - a.priceFrom; },
      name: function (a, b) { return (a.brand + a.name).localeCompare(b.brand + b.name, "de"); }
    };
    return list.sort(sorters[state.sort]);
  }

  function renderTabs() {
    var el = document.getElementById("tabs");
    el.innerHTML = CATS.map(function (c) {
      var n = PRODUCTS.filter(function (p) { return p.category === c.id; }).length;
      return '<button class="tab" role="tab" id="tab-' + c.id + '" aria-controls="results" aria-selected="' + (c.id === state.cat) + '" data-cat="' + c.id + '">' +
        c.icon + " " + esc(c.name) + ' <span class="sr-only">(' + n + " Produkte)</span></button>";
    }).join("");
  }

  function renderCard(p, i) {
    var inCompare = state.compare.indexOf(p.id) !== -1;
    var specs = Object.keys(p.specs).map(function (k) {
      return "<tr><th scope=\"row\">" + esc(k) + "</th><td>" + esc(p.specs[k]) + "</td></tr>";
    }).join("");
    return '<article class="card" id="p-' + esc(p.id) + '">' +
      (state.sort === "score" ? '<div class="rank" aria-label="Platz ' + (i + 1) + '">' + (i + 1) + "</div>" : "") +
      (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") +
      '<div><div class="brand">' + esc(p.brand) + "</div><h3>" + esc(p.name) + "</h3></div>" +
      '<div class="score"><span class="score-num">' + fmtScore(p.score) + '</span><div style="flex:1">' +
      '<div class="score-bar" aria-hidden="true"><span style="width:' + p.score * 10 + '%"></span></div>' +
      '<div class="score-label">Redaktionswertung von 10 · <a href="testverfahren.html">Wie wir bewerten</a></div></div></div>' +
      '<div class="bestfor"><strong>Ideal für:</strong> ' + esc(p.bestFor) + "</div>" +
      '<table class="specs"><caption class="sr-only">Technische Daten</caption>' + specs + "</table>" +
      '<div class="proscons"><div><strong>Vorteile</strong><ul class="pros">' + p.pros.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
      '<div><strong>Nachteile</strong><ul class="cons">' + p.cons.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div>" +
      '<div class="price">Preis ab ca. <strong>' + fmtPrice.format(p.priceFrom) + '</strong> <span aria-label="Preisklasse ' + p.priceTier + ' von 4">' + tierLabel(p.priceTier) + "</span>" +
      "<small>Unverbindliche Orientierung, Stand " + fmtDate(cfg.dataLastChecked) + ", inkl. MwSt., ggf. zzgl. Versand. Aktueller Preis beim Händler.</small></div>" +
      '<div class="card-actions">' + affiliateButtons(p) +
      '<label class="compare-toggle"><input type="checkbox" data-compare="' + esc(p.id) + '"' + (inCompare ? " checked" : "") + "> Vergleichen</label></div>" +
      '<div class="ad-note">* Werbelink – <a href="affiliate-hinweis.html">mehr erfahren</a></div>' +
      "</article>";
  }

  function render() {
    var cat = CATS.find(function (c) { return c.id === state.cat; });
    document.getElementById("cat-title").textContent = cat.name + " im Vergleich";
    document.getElementById("cat-intro").textContent = cat.intro;
    var list = filtered();
    document.getElementById("result-count").textContent = list.length + (list.length === 1 ? " Produkt" : " Produkte") + " gefunden";
    var res = document.getElementById("results");
    res.setAttribute("aria-labelledby", "tab-" + state.cat);
    res.innerHTML = list.length
      ? list.map(renderCard).join("")
      : '<p class="empty">Keine Produkte passen zu Ihren Filtern. Versuchen Sie einen höheren Maximalpreis oder einen anderen Suchbegriff.</p>';
    renderCompareBar();
    renderSchema(list, cat);
  }

  function renderCompareBar() {
    var bar = document.getElementById("compare-bar");
    var n = state.compare.length;
    bar.classList.toggle("visible", n > 0);
    document.getElementById("compare-count").textContent = n + " von " + MAX_COMPARE + " Produkten ausgewählt";
    document.getElementById("compare-open").disabled = n < 2;
  }

  function renderCompareTable() {
    var items = state.compare.map(function (id) { return PRODUCTS.find(function (p) { return p.id === id; }); }).filter(Boolean);
    var keys = [];
    items.forEach(function (p) { Object.keys(p.specs).forEach(function (k) { if (keys.indexOf(k) === -1) keys.push(k); }); });
    var bestScore = Math.max.apply(null, items.map(function (p) { return p.score; }));
    var bestPrice = Math.min.apply(null, items.map(function (p) { return p.priceFrom; }));
    var cell = function (fn) { return items.map(function (p) { return "<td>" + fn(p) + "</td>"; }).join(""); };
    var html = '<table class="compare-table"><thead><tr><th scope="col">Merkmal</th>' +
      items.map(function (p) { return '<th scope="col">' + esc(p.brand) + "<br>" + esc(p.name) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      '<tr><th scope="row">Kategorie</th>' + cell(function (p) { return esc(CATS.find(function (c) { return c.id === p.category; }).name); }) + "</tr>" +
      '<tr><th scope="row">Redaktionswertung</th>' + cell(function (p) { return '<span class="' + (p.score === bestScore ? "best" : "") + '">' + fmtScore(p.score) + " / 10</span>"; }) + "</tr>" +
      '<tr><th scope="row">Preis ab ca.</th>' + cell(function (p) { return '<span class="' + (p.priceFrom === bestPrice ? "best" : "") + '">' + fmtPrice.format(p.priceFrom) + "</span>"; }) + "</tr>" +
      '<tr><th scope="row">Ideal für</th>' + cell(function (p) { return esc(p.bestFor); }) + "</tr>" +
      keys.map(function (k) { return '<tr><th scope="row">' + esc(k) + "</th>" + cell(function (p) { return p.specs[k] != null ? esc(p.specs[k]) : "–"; }) + "</tr>"; }).join("") +
      '<tr><th scope="row">Vorteile</th>' + cell(function (p) { return p.pros.map(esc).join("<br>"); }) + "</tr>" +
      '<tr><th scope="row">Nachteile</th>' + cell(function (p) { return p.cons.map(esc).join("<br>"); }) + "</tr>" +
      '<tr><th scope="row">Angebot</th>' + cell(function (p) { return affiliateButtons(p); }) + "</tr>" +
      "</tbody></table>" +
      '<p class="ad-note">* Werbelinks. Preise: unverbindliche Orientierung, Stand ' + fmtDate(cfg.dataLastChecked) + ". Grün = bester Wert in dieser Auswahl.</p>";
    document.getElementById("compare-content").innerHTML = html;
  }

  // Strukturierte Daten: nur ItemList (keine selbst vergebenen Sternebewertungen als Rich Snippet)
  function renderSchema(list, cat) {
    var node = document.getElementById("schema-itemlist");
    if (!node) return;
    node.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: cat.name + " im Vergleich",
      itemListElement: list.map(function (p, i) {
        return { "@type": "ListItem", position: i + 1, name: p.brand + " " + p.name };
      })
    });
  }

  function bind() {
    document.getElementById("tabs").addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]");
      if (!b) return;
      state.cat = b.getAttribute("data-cat");
      history.replaceState(null, "", "#" + state.cat);
      renderTabs(); render();
    });
    document.getElementById("tabs").addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var idx = CATS.findIndex(function (c) { return c.id === state.cat; });
      idx = (idx + (e.key === "ArrowRight" ? 1 : -1) + CATS.length) % CATS.length;
      state.cat = CATS[idx].id;
      renderTabs(); render();
      document.getElementById("tab-" + state.cat).focus();
    });
    document.getElementById("search").addEventListener("input", function (e) { state.q = e.target.value; render(); });
    document.getElementById("maxprice").addEventListener("change", function (e) { state.maxPrice = e.target.value; render(); });
    document.getElementById("sort").addEventListener("change", function (e) { state.sort = e.target.value; render(); });

    document.getElementById("results").addEventListener("change", function (e) {
      var id = e.target.getAttribute("data-compare");
      if (!id) return;
      if (e.target.checked) {
        if (state.compare.length >= MAX_COMPARE) {
          e.target.checked = false;
          alert("Sie können maximal " + MAX_COMPARE + " Produkte vergleichen.");
          return;
        }
        state.compare.push(id);
      } else {
        state.compare = state.compare.filter(function (x) { return x !== id; });
      }
      saveCompare(); renderCompareBar();
    });

    var dlg = document.getElementById("compare-dialog");
    document.getElementById("compare-open").addEventListener("click", function () { renderCompareTable(); dlg.showModal(); });
    document.getElementById("compare-close").addEventListener("click", function () { dlg.close(); });
    document.getElementById("compare-clear").addEventListener("click", function () { state.compare = []; saveCompare(); render(); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var hash = location.hash.slice(1);
    if (CATS.some(function (c) { return c.id === hash; })) state.cat = hash;
    // veraltete IDs aus Vergleichsliste entfernen
    state.compare = state.compare.filter(function (id) { return PRODUCTS.some(function (p) { return p.id === id; }); });
    renderTabs(); bind(); render();
  });
})();
