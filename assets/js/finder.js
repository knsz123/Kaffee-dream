/* Kaffee-Finder: 4 Fragen → passende Kategorie + Top-Produkte aus der Datenbank */
(function () {
  var QUESTIONS = [
    { key: "drink", q: "Wie trinken Sie Ihren Kaffee am liebsten?", opts: [
      { v: "espresso", i: "☕", t: "Espresso pur", d: "Kurz, intensiv, mit Crema" },
      { v: "milk", i: "🥛", t: "Mit Milch", d: "Cappuccino, Latte, Flat White" },
      { v: "filter", i: "🫖", t: "Große Tasse", d: "Filterkaffee, Café Crème" },
      { v: "explore", i: "🧭", t: "Mal so, mal so", d: "Ich probiere gern aus" }
    ]},
    { key: "effort", q: "Wie viel Handarbeit darf es sein?", opts: [
      { v: "button", i: "👆", t: "Knopfdruck", d: "Schnell und bequem" },
      { v: "some", i: "✋", t: "Ein paar Handgriffe", d: "Ritual ja, Wissenschaft nein" },
      { v: "craft", i: "🎯", t: "Ich will es meistern", d: "Mahlgrad, Tamper, Timing" }
    ]},
    { key: "cups", q: "Wie viele Tassen am Tag – im ganzen Haushalt?", opts: [
      { v: 1, i: "①", t: "1–2 Tassen", d: "Für mich allein" },
      { v: 2, i: "②", t: "3–5 Tassen", d: "Zu zweit oder Homeoffice" },
      { v: 3, i: "③", t: "6 und mehr", d: "Familie, WG oder Büro" }
    ]},
    { key: "budget", q: "Welches Budget haben Sie im Kopf?", opts: [
      { v: 100, i: "€", t: "bis 100 €", d: "Einstieg" },
      { v: 300, i: "€€", t: "bis 300 €", d: "Solide Mitte" },
      { v: 700, i: "€€€", t: "bis 700 €", d: "Langfristige Anschaffung" },
      { v: 0, i: "€€€€", t: "Offen", d: "Qualität zählt" }
    ]}
  ];

  var COMPANION = { siebtraeger: "muehle", handbrew: "muehle", vollautomat: "bohnen", filter: "bohnen", milch: "handbrew" };
  var COMP_WHY = {
    muehle: "Ohne gute Mühle kein guter Kaffee – die Mühle ist die wichtigste Ergänzung.",
    bohnen: "Die Bohne entscheidet über den Geschmack – probieren Sie mehrere Sorten aus.",
    handbrew: "Für den Kaffee darunter: z. B. eine Mokkakanne oder AeroPress."
  };

  function decide(a) {
    var cat, why;
    if (a.drink === "filter") {
      if (a.effort === "button" || a.cups === 3) { cat = "filter"; why = "Für größere Mengen ohne Aufwand ist eine gute Filtermaschine mit korrekter Brühtemperatur unschlagbar."; }
      else { cat = "handbrew"; why = "Handfilter wie V60 oder Chemex holen das meiste Aroma aus der Bohne – mit wenigen Handgriffen."; }
    } else if (a.drink === "explore") {
      if (a.effort === "button") { cat = "vollautomat"; why = "Ein Vollautomat liefert Espresso, Café Crème und Milchgetränke per Knopfdruck – ideal zum Ausprobieren."; }
      else { cat = "handbrew"; why = "AeroPress, French Press und Co. sind günstig und vielseitig – perfekt, um Ihren Geschmack zu entdecken."; }
    } else { // espresso oder milk
      if (a.effort === "craft") { cat = "siebtraeger"; why = "Mit einem Siebträger haben Sie volle Kontrolle über jeden Shot – und lernen, was guten Espresso ausmacht."; }
      else if (a.effort === "some" && a.cups === 1) { cat = "siebtraeger"; why = "Kompakte Siebträger mit Automatikfunktionen sind ein guter Kompromiss aus Ritual und Komfort."; }
      else { cat = "vollautomat"; why = "Sie möchten " + (a.drink === "milk" ? "Milchgetränke" : "Espresso") + " ohne Aufwand – genau dafür sind Vollautomaten gebaut."; }
    }
    // Budget-Realität prüfen
    var min = Math.min.apply(null, window.PRODUCTS.filter(function (p) { return p.category === cat; }).map(function (p) { return p.priceFrom; }));
    if (a.budget && min > a.budget) {
      var orig = window.KD.catById(cat).name;
      if (a.drink === "milk") { cat = "milch"; why = orig + " beginnen erst bei ca. " + window.KD.fmtPrice.format(min) + ". Für Ihr Budget: ein Milchaufschäumer plus Mokkakanne oder AeroPress – überraschend nah am Café-Erlebnis."; }
      else { cat = "handbrew"; why = orig + " beginnen erst bei ca. " + window.KD.fmtPrice.format(min) + ". Mit Ihrem Budget holen Sie aus AeroPress, Mokkakanne oder Handfilter mehr Geschmack heraus."; }
    }
    return { cat: cat, why: why };
  }

  var answers = {}, step = 0, root;

  function stepsNav() {
    var lis = root.querySelectorAll(".steps li");
    lis.forEach(function (li, i) {
      li.className = i < step ? "done" : i === step ? "active" : "";
      if (i === step) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
    });
  }

  function renderQuestion(initial) {
    var Q = QUESTIONS[step];
    var main = root.querySelector(".finder-main");
    main.innerHTML =
      '<div class="progress" aria-hidden="true"><span style="width:' + (step / QUESTIONS.length * 100) + '%"></span></div>' +
      '<p class="eyebrow">Frage ' + (step + 1) + " von " + QUESTIONS.length + "</p>" +
      '<h3 class="finder-q" tabindex="-1">' + Q.q + "</h3>" +
      '<div class="options" role="group" aria-label="' + Q.q + '">' +
      Q.opts.map(function (o, i) {
        return '<button type="button" class="option" data-i="' + i + '" aria-pressed="' + (answers[Q.key] === o.v) + '"><span class="o-icon" aria-hidden="true">' + o.i + "</span><strong>" + o.t + "</strong><span>" + o.d + "</span></button>";
      }).join("") + "</div>" +
      '<div class="finder-nav">' + (step > 0 ? '<button type="button" class="btn btn-ghost" data-back>← Zurück</button>' : "<span></span>") + "</div>";
    stepsNav();
    if (!initial) main.querySelector(".finder-q").focus({ preventScroll: true });
  }

  function renderResult() {
    var KD = window.KD, r = decide(answers);
    var cat = KD.catById(r.cat);
    var pool = window.PRODUCTS.filter(function (p) { return p.category === r.cat; });
    var inBudget = pool.filter(function (p) { return !answers.budget || p.priceFrom <= answers.budget; });
    var top = KD.sortList((inBudget.length ? inBudget : pool).slice(), inBudget.length ? "score" : "priceAsc").slice(0, 3);
    var compCat = COMPANION[r.cat];
    var comp = compCat ? KD.sortList(window.PRODUCTS.filter(function (p) { return p.category === compCat; }).slice(), "score")
      .filter(function (p) { return !answers.budget || p.priceFrom <= Math.max(answers.budget * 0.6, 60); })[0] : null;

    var mini = function (p) {
      return '<div class="mini"><span class="m-score">' + KD.fmtScore(p.score) + '</span><span class="m-name">' + KD.esc(p.brand + " " + p.name) +
        "<small>ab ca. " + KD.fmtPrice.format(p.priceFrom) + " · " + KD.esc(p.bestFor) + "</small></span>" + KD.affiliateButtons(p, true) + "</div>";
    };
    var main = root.querySelector(".finder-main");
    main.innerHTML =
      '<div class="progress" aria-hidden="true"><span style="width:100%"></span></div>' +
      '<p class="eyebrow">Unsere Empfehlung für Sie</p>' +
      '<div class="result-head">' + window.ICON(r.cat) + '<h3 tabindex="-1">' + KD.esc(cat.name) + "</h3></div>" +
      '<p class="result-why">' + KD.esc(r.why) + "</p>" +
      '<div class="mini-list">' + top.map(mini).join("") + "</div>" +
      (comp ? '<p class="eyebrow">Dazu passt</p><p class="result-why" style="margin-bottom:10px">' + COMP_WHY[compCat] + '</p><div class="mini-list">' + mini(comp) + "</div>" : "") +
      '<p class="ad-note">* Werbelinks. Die Empfehlung basiert nur auf Ihren Antworten und unserer Redaktionswertung – nicht auf Provisionen.</p>' +
      '<div class="finder-nav"><button type="button" class="btn btn-ghost" data-restart>↺ Neu starten</button>' +
      '<button type="button" class="btn btn-dark" data-show="' + r.cat + '">Alle ' + KD.esc(cat.name) + " vergleichen →</button></div>";
    step = QUESTIONS.length;
    stepsNav();
    main.querySelector("h3").focus({ preventScroll: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    root = document.getElementById("finder");
    if (!root) return;
    root.querySelector(".steps").innerHTML = QUESTIONS.map(function (q) { return "<li>" + q.q.replace(/\?.*/, "?") + "</li>"; }).join("") + "<li>Ihre Empfehlung</li>";
    root.addEventListener("click", function (e) {
      var opt = e.target.closest(".option");
      if (opt) {
        var Q = QUESTIONS[step];
        answers[Q.key] = Q.opts[+opt.getAttribute("data-i")].v;
        step++;
        if (step < QUESTIONS.length) renderQuestion(); else renderResult();
        return;
      }
      if (e.target.closest("[data-back]")) { step--; renderQuestion(); }
      if (e.target.closest("[data-restart]")) { answers = {}; step = 0; renderQuestion(); }
      var show = e.target.closest("[data-show]");
      if (show) window.KD.showCategory(show.getAttribute("data-show"), answers.budget >= 100 ? (answers.budget === 700 ? 1000 : answers.budget === 100 ? 150 : answers.budget) : "");
    });
    renderQuestion(true);
  });
})();
