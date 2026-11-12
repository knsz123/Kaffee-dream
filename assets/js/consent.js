/**
 * Einwilligungsverwaltung nach § 25 TDDDG / Art. 6 Abs. 1 lit. a DSGVO.
 * - Standardmäßig wird NICHTS Einwilligungspflichtiges geladen.
 * - "Ablehnen" ist gleichwertig zu "Akzeptieren" gestaltet.
 * - Die Einwilligung kann jederzeit über "Cookie-Einstellungen" im Footer widerrufen werden.
 * - Gespeichert wird nur die Entscheidung selbst (technisch notwendig, § 25 Abs. 2 Nr. 2 TDDDG).
 */
(function () {
  var KEY = "kd_consent_v1";
  var cfg = window.SITE_CONFIG || {};
  var hasAnalytics = !!(cfg.analytics && cfg.analytics.scriptUrl);

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function write(state) {
    state.date = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignorieren */ }
    apply(state);
  }
  function apply(state) {
    if (state && state.statistics && hasAnalytics && !document.getElementById("kd-analytics")) {
      var s = document.createElement("script");
      s.id = "kd-analytics";
      s.async = true;
      s.src = cfg.analytics.scriptUrl;
      document.head.appendChild(s);
    }
  }

  function buildBanner() {
    var el = document.createElement("section");
    el.className = "consent";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "false");
    el.setAttribute("aria-labelledby", "consent-title");
    el.innerHTML =
      '<h2 id="consent-title">Datenschutz-Einstellungen</h2>' +
      "<p>Wir verwenden technisch notwendige Speicherungen, damit die Seite funktioniert. " +
      (hasAnalytics
        ? "Mit Ihrer Einwilligung nutzen wir zusätzlich eine Reichweitenmessung, um die Seite zu verbessern. "
        : "Derzeit setzen wir <strong>keine</strong> Tracking- oder Marketing-Cookies ein. ") +
      'Beim Klick auf einen Partnerlink verlassen Sie unsere Seite; dort gelten die Datenschutzbestimmungen des Händlers. ' +
      'Mehr in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>' +
      '<div class="consent-options">' +
      '<label><input type="checkbox" checked disabled> <span><strong>Notwendig</strong><br>Speichert Ihre Datenschutz-Auswahl und Ihre Vergleichsliste lokal im Browser. Immer aktiv.</span></label>' +
      '<label><input type="checkbox" id="consent-stats"' + (hasAnalytics ? "" : " disabled") + "> <span><strong>Statistik</strong><br>" +
      (hasAnalytics ? "Anonymisierte Reichweitenmessung (" + (cfg.analytics.provider || "Webanalyse") + ")." : "Derzeit nicht im Einsatz.") +
      "</span></label>" +
      "</div>" +
      '<div class="consent-actions">' +
      '<button type="button" class="btn btn-reject" data-act="reject">Nur notwendige</button>' +
      '<button type="button" class="btn btn-accept" data-act="accept">Alle akzeptieren</button>' +
      '<button type="button" class="btn btn-ghost" data-act="options">Einstellungen</button>' +
      "</div>";
    document.body.appendChild(el);

    el.addEventListener("click", function (e) {
      var act = e.target && e.target.getAttribute("data-act");
      if (!act) return;
      if (act === "accept") { write({ necessary: true, statistics: hasAnalytics }); el.hidden = true; }
      if (act === "reject") { write({ necessary: true, statistics: false }); el.hidden = true; }
      if (act === "options") {
        if (el.classList.contains("show-options")) {
          var stats = document.getElementById("consent-stats");
          write({ necessary: true, statistics: !!(stats && stats.checked) });
          el.hidden = true;
        } else {
          el.classList.add("show-options");
          e.target.textContent = "Auswahl speichern";
        }
      }
    });
    return el;
  }

  function open() {
    var existing = document.querySelector(".consent");
    if (existing) existing.remove();
    var el = buildBanner();
    var state = read();
    var stats = document.getElementById("consent-stats");
    if (state && stats) stats.checked = !!state.statistics;
    el.querySelector("button").focus();
  }

  window.KDConsent = {
    open: open,
    get: read,
    revoke: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      location.reload();
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    var state = read();
    if (state) apply(state); else buildBanner();
    document.querySelectorAll("[data-open-consent]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); open(); });
    });
    // Demo-Hinweis
    if (cfg.demoMode) {
      var bar = document.createElement("div");
      bar.className = "demo-bar";
      bar.textContent = "Demo-Modus: Produktdaten, Preise und Bewertungen sind Beispieldaten und noch nicht geprüft.";
      document.body.insertBefore(bar, document.body.firstChild);
    }
    // Datum der letzten Datenprüfung
    if (cfg.dataLastChecked) {
      var d = new Date(cfg.dataLastChecked + "T00:00:00");
      document.querySelectorAll("[data-last-checked]").forEach(function (n) {
        n.textContent = isNaN(d) ? cfg.dataLastChecked : d.toLocaleDateString("de-DE");
      });
    }
    // Jahr im Footer
    document.querySelectorAll("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
  });
})();
