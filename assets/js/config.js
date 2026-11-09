/**
 * Zentrale Konfiguration – HIER zuerst anpassen.
 * Alle Platzhalter in [ECKIGEN KLAMMERN] müssen vor dem Livegang ersetzt werden.
 */
window.SITE_CONFIG = {
  siteName: "Kaffee Dream",
  siteUrl: "https://www.example.de", // [DEINE DOMAIN]

  // Zeigt oben einen Hinweis, dass Beispieldaten verwendet werden.
  // Erst auf false setzen, wenn alle Produktdaten geprüft sind!
  demoMode: true,

  // Datum der letzten Prüfung der Preise/Daten (wird überall angezeigt)
  dataLastChecked: "2026-11-09",

  // Affiliate-Partnerprogramme. {query} = Suchbegriff, {asin} = Amazon-ASIN
  affiliate: {
    amazon: {
      enabled: true,
      tag: "DEINTAG-21", // [DEINE AMAZON PARTNER-ID]
      // Wenn ein Produkt eine ASIN hat, wird der Direktlink genutzt, sonst die Suche.
      productUrl: "https://www.amazon.de/dp/{asin}?tag={tag}",
      searchUrl: "https://www.amazon.de/s?k={query}&tag={tag}",
      label: "Bei Amazon ansehen"
    },
    // Weitere Netzwerke (AWIN, Tradedoubler, …) können pro Produkt über "links" ergänzt werden.
  },

  // Hinweis: Impressum & Datenschutz enthalten die Anbieterangaben direkt im HTML
  // (damit sie auch ohne JavaScript sichtbar sind). Siehe impressum.html / datenschutz.html.

  // Optionale Webanalyse – wird NUR nach Einwilligung geladen.
  // Leer lassen, wenn keine Statistik genutzt wird.
  analytics: {
    provider: "", // z. B. "Matomo (selbst gehostet)"
    scriptUrl: "", // z. B. "https://stats.example.de/matomo.js"
  }
};
