/* Allgemeine Interaktionen: Navigation, Scroll-Reveal, Brührechner mit Timer, Röstgrad-Explorer */
(function () {
  // ─── Mobile Navigation ───
  document.addEventListener("DOMContentLoaded", function () {
    var t = document.querySelector(".nav-toggle"), nav = document.getElementById("main-nav");
    if (t && nav) {
      t.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        t.setAttribute("aria-expanded", open);
      });
      nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { nav.classList.remove("open"); t.setAttribute("aria-expanded", "false"); } });
    }
  });

  // ─── Scroll-Reveal ───
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;
  window.KDReveal = function (scope) {
    (scope || document).querySelectorAll(".reveal:not(.in)").forEach(function (el, i) {
      if (!io) { el.classList.add("in"); return; }
      el.style.transitionDelay = Math.min(i, 6) * 60 + "ms";
      io.observe(el);
    });
  };
  document.addEventListener("DOMContentLoaded", function () { window.KDReveal(); });

  // ─── Brührechner ───
  var METHODS = {
    espresso:    { name: "Espresso",     ratio: 2,  unit: 18, unitLabel: "Shots",  max: 4, temp: "92–94 °C", grind: "Sehr fein", time: "25–30 s", fixedDose: true,
                   steps: [[0, "Bezug starten"], [8, "Erste Tropfen sollten kommen"], [25, "Gleich fertig – auf Zielgewicht achten"], [30, "Stopp!"]] },
    v60:         { name: "V60",          ratio: 16, unit: 250, unitLabel: "Tassen", max: 4, temp: "93–96 °C", grind: "Mittelfein", time: "2:30–3:00",
                   steps: [[0, "Blooming: doppelte Kaffeemenge an Wasser aufgießen"], [45, "Langsam kreisend bis 60 % aufgießen"], [75, "Rest aufgießen"], [120, "Durchlaufen lassen"], [180, "Fertig – genießen!"]] },
    frenchpress: { name: "French Press", ratio: 15, unit: 250, unitLabel: "Tassen", max: 4, temp: "94–96 °C", grind: "Grob", time: "4:00",
                   steps: [[0, "Gesamtes Wasser aufgießen"], [30, "Deckel aufsetzen, nicht drücken"], [240, "Kruste abschöpfen, langsam pressen"], [270, "Sofort umfüllen"]] },
    aeropress:   { name: "AeroPress",    ratio: 14, unit: 220, unitLabel: "Tassen", max: 1, temp: "85–90 °C", grind: "Mittelfein", time: "2:00",
                   steps: [[0, "Wasser aufgießen, 10 s rühren"], [10, "Stempel aufsetzen, ziehen lassen"], [90, "Langsam ca. 30 s pressen"], [120, "Fertig"]] },
    chemex:      { name: "Chemex",       ratio: 16, unit: 250, unitLabel: "Tassen", max: 6, temp: "93–96 °C", grind: "Mittelgrob", time: "4:00–4:30",
                   steps: [[0, "Blooming mit doppelter Kaffeemenge Wasser"], [45, "In Etappen bis zur Hälfte aufgießen"], [105, "Rest aufgießen"], [240, "Fertig – Filter entnehmen"]] },
    coldbrew:    { name: "Cold Brew",    ratio: 8,  unit: 250, unitLabel: "Tassen", max: 8, temp: "Kalt (4–20 °C)", grind: "Sehr grob", time: "12–18 h",
                   steps: null }
  };
  var STRENGTH = { 1: ["Mild", 1.12], 2: ["Ausgewogen", 1], 3: ["Kräftig", 0.88] };
  var brew = { m: "v60", cups: 2, str: 2 };
  var timer = { t: 0, id: null };

  function fmtTime(s) { return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }

  function renderBrew() {
    var M = METHODS[brew.m];
    var cupsEl = document.getElementById("brew-cups");
    cupsEl.max = M.max;
    if (brew.cups > M.max) brew.cups = M.max;
    cupsEl.value = brew.cups;
    cupsEl.disabled = M.max === 1;
    document.getElementById("brew-cups-label").textContent = M.unitLabel;
    document.getElementById("brew-cups-out").textContent = brew.cups;
    document.getElementById("brew-str-out").textContent = STRENGTH[brew.str][0];
    var ratio = M.ratio * STRENGTH[brew.str][1];
    var coffee, water;
    if (M.fixedDose) { coffee = M.unit * brew.cups; water = coffee * ratio; }
    else { water = M.unit * brew.cups; coffee = water / ratio; }
    document.getElementById("out-coffee").innerHTML = Math.round(coffee) + "<small> g</small>";
    document.getElementById("out-water").innerHTML = Math.round(water) + "<small> " + (M.fixedDose ? "g im Glas" : "ml") + "</small>";
    document.getElementById("out-ratio").textContent = "1 : " + ratio.toFixed(1).replace(".", ",");
    document.getElementById("out-temp").textContent = M.temp;
    document.getElementById("out-grind").textContent = M.grind;
    document.getElementById("out-time").textContent = M.time;
    document.querySelectorAll(".method").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-m") === brew.m); });
    resetTimer();
  }

  function stepFor(t) {
    var steps = METHODS[brew.m].steps, cur = steps[0][1];
    steps.forEach(function (s) { if (t >= s[0]) cur = s[1]; });
    return cur;
  }
  function resetTimer() {
    clearInterval(timer.id); timer.id = null; timer.t = 0;
    var M = METHODS[brew.m], btn = document.getElementById("timer-btn");
    document.getElementById("timer-time").textContent = M.steps ? "0:00" : "—";
    document.getElementById("timer-step").textContent = M.steps ? "Bereit? Timer starten und Schritt für Schritt brühen." : "Cold Brew zieht 12–18 Stunden im Kühlschrank – hier braucht es Geduld statt Timer.";
    btn.textContent = "Start"; btn.disabled = !M.steps;
  }
  function toggleTimer() {
    var btn = document.getElementById("timer-btn"), out = document.getElementById("timer-time"), st = document.getElementById("timer-step");
    if (timer.id) { clearInterval(timer.id); timer.id = null; btn.textContent = "Weiter"; return; }
    btn.textContent = "Pause";
    st.textContent = stepFor(timer.t);
    timer.id = setInterval(function () {
      timer.t++;
      out.textContent = fmtTime(timer.t);
      var s = stepFor(timer.t);
      if (st.textContent !== s) st.textContent = s;
      var last = METHODS[brew.m].steps.slice(-1)[0][0];
      if (timer.t >= last + 30) { clearInterval(timer.id); timer.id = null; btn.textContent = "Start"; timer.t = 0; }
    }, 1000);
  }

  // ─── Röstgrad-Explorer ───
  var ROASTS = [
    { n: "Hell", c: "#b07a4a", d: "Fruchtig, blumig, helle Säure. Zeigt die Herkunft der Bohne am deutlichsten.", f: "Handfilter, AeroPress, Filtermaschine" },
    { n: "Mittel", c: "#8a5630", d: "Ausgewogen zwischen Süße und Säure, Noten von Nuss, Karamell und Schokolade.", f: "Filter, Vollautomat, French Press" },
    { n: "Mittel-dunkel", c: "#653a1e", d: "Schokoladig und vollmundig, wenig Säure – der klassische Café-Crème-Geschmack.", f: "Vollautomat, Siebträger, Mokkakanne" },
    { n: "Dunkel", c: "#43240f", d: "Kräftig, röstig, bittersüß, kaum Säure. Setzt sich gut gegen Milch durch.", f: "Siebträger für Milchgetränke, Mokkakanne" },
    { n: "Sehr dunkel", c: "#24130a", d: "Rauchig und herb. Ölige Oberfläche – für Vollautomaten oft ungeeignet, da sie das Mahlwerk verkleben kann.", f: "Mokkakanne, Espresso mit viel Milch" }
  ];
  function renderRoast(i) {
    document.querySelectorAll(".roast button").forEach(function (b, j) { b.setAttribute("aria-pressed", i === j); });
    var r = ROASTS[i];
    document.getElementById("roast-info").innerHTML = "<h4>Röstgrad: " + r.n + "</h4><p>" + r.d + "</p><p><strong>Passt zu:</strong> " + r.f + "</p>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var methods = document.getElementById("methods");
    if (methods) {
      methods.innerHTML = Object.keys(METHODS).map(function (k) {
        return '<button type="button" class="method" data-m="' + k + '" aria-pressed="false">' + window.ICON(k) + METHODS[k].name + "</button>";
      }).join("");
      methods.addEventListener("click", function (e) { var b = e.target.closest(".method"); if (b) { brew.m = b.getAttribute("data-m"); if (brew.m === "espresso") brew.cups = Math.min(brew.cups, 2); renderBrew(); } });
      document.getElementById("brew-cups").addEventListener("input", function (e) { brew.cups = +e.target.value; renderBrew(); });
      document.getElementById("brew-str").addEventListener("input", function (e) { brew.str = +e.target.value; renderBrew(); });
      document.getElementById("timer-btn").addEventListener("click", toggleTimer);
      document.getElementById("timer-reset").addEventListener("click", resetTimer);
      renderBrew();
    }
    var roast = document.getElementById("roast");
    if (roast) {
      roast.innerHTML = ROASTS.map(function (r, i) { return '<button type="button" style="background:' + r.c + '" data-r="' + i + '" aria-pressed="false" aria-controls="roast-info">' + r.n + "</button>"; }).join("");
      roast.addEventListener("click", function (e) { var b = e.target.closest("[data-r]"); if (b) renderRoast(+b.getAttribute("data-r")); });
      renderRoast(1);
    }
  });
})();
