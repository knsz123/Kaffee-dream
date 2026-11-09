# Kaffee Dream – Kaffee-Vergleichsseite für Affiliate-Marketing

Statische, DSGVO-freundliche Vergleichsseite für Kaffee-Equipment: Vollautomaten, Siebträger, Filtermaschinen, Mühlen, Handfilter, Milchaufschäumer, Bohnen und Zubehör.

- **Kein Build-Schritt, keine Abhängigkeiten.** Einfach `index.html` öffnen oder den Ordner auf einen beliebigen Webspace / GitHub Pages / Netlify hochladen.
- **Keine externen Ressourcen** (keine Google Fonts, kein CDN). Das vermeidet Datenübermittlungen an Dritte schon beim Seitenaufruf.
- **Funktionen:** Kategorie-Tabs, Suche, Preisfilter, Sortierung, Vergleich von bis zu 4 Produkten nebeneinander, Ratgeber/FAQ, Dunkelmodus, mobil optimiert, per Tastatur bedienbar.

## Struktur

| Datei | Inhalt |
|---|---|
| `index.html` | Vergleichsseite inkl. Ratgeber & FAQ |
| `testverfahren.html` | Bewertungs- und Ranking-Kriterien (§ 5b Abs. 2 UWG) |
| `affiliate-hinweis.html` | Werbe-/Affiliate-Transparenz, Amazon-Pflichthinweis, Preis- und Bewertungshinweise |
| `impressum.html` | Impressum (§ 5 DDG, § 18 Abs. 2 MStV) |
| `datenschutz.html` | Datenschutzerklärung (DSGVO, TDDDG) |
| `barrierefreiheit.html` | Freiwillige Erklärung zur Barrierefreiheit |
| `assets/js/config.js` | **Zentrale Einstellungen** (Partner-ID, Demo-Modus, Datenstand, Analyse) |
| `data/products.js` | **Produktdatenbank** |
| `assets/js/app.js` | Vergleichslogik |
| `assets/js/consent.js` | Cookie-/Einwilligungsbanner |

## Vor dem Livegang – Checkliste

1. **`assets/js/config.js`**
   - `tag` auf die eigene Amazon-PartnerNet-ID setzen.
   - `siteUrl` setzen (und in `robots.txt` / `sitemap.xml` ersetzen).
   - `dataLastChecked` auf das Datum der letzten Prüfung setzen.
   - `demoMode: false` erst, wenn alle Produktdaten geprüft sind.
2. **`data/products.js`** – Alle Produkte, Preise, technischen Daten und Wertungen sind **Beispieldaten**. Jedes Produkt prüfen, Preise aktualisieren, möglichst `asin` eintragen (dann wird direkt aufs Produkt verlinkt statt auf die Suche).
3. **Rechtstexte:** Alle gelb markierten Platzhalter `[…]` in `impressum.html`, `datenschutz.html`, `affiliate-hinweis.html`, `testverfahren.html` und `barrierefreiheit.html` ersetzen und die Betreiber-Hinweisboxen entfernen.
4. **Ehrlichkeit bei Tests:** In `testverfahren.html` nur die Methoden stehen lassen, die wirklich angewendet werden. Nie „getestet" oder „Testsieger" schreiben, wenn nicht selbst getestet wurde (Irreführung, § 5 UWG).
5. **Rechtliche Prüfung:** Die Texte sind sorgfältig erstellte Vorlagen, ersetzen aber **keine Rechtsberatung**. Empfehlung: von einer Fachanwältin/einem Fachanwalt prüfen lassen oder einen Rechtstext-Dienst nutzen (z. B. mit Update-Service).

## Was rechtlich bereits umgesetzt ist

- **Werbekennzeichnung (§ 5a Abs. 4 UWG, § 6 DDG):** dauerhaft sichtbare Hinweisleiste, Hinweisbox über dem Vergleich, `*` an jedem Affiliate-Link plus „Werbelink"-Vermerk, eigene Transparenzseite.
- **Amazon-Pflichthinweis:** „Als Amazon-Partner verdienen wir an qualifizierten Verkäufen." im Footer und auf der Transparenzseite.
- **`rel="sponsored nofollow noopener"`** an allen Partnerlinks (Google-Richtlinie).
- **Ranking-Transparenz (§ 5b Abs. 2 UWG):** Hauptparameter und Gewichtung auf `testverfahren.html`; Standard-Sortierung nachvollziehbar, Nutzer können umsortieren.
- **Bewertungen (§ 5b Abs. 3 UWG):** klar als redaktionelle Einschätzung gekennzeichnet, keine Kundenbewertungen, keine selbst vergebenen Sterne als Rich Snippet (nur `ItemList`-Schema).
- **Preisangaben:** als unverbindliche Orientierung mit Datenstand, inkl. MwSt., ggf. zzgl. Versand; Verweis auf den Händlerpreis.
- **Cookie-Consent (§ 25 TDDDG):** standardmäßig kein Tracking; „Nur notwendige" gleichwertig zu „Alle akzeptieren"; jederzeit widerrufbar über „Cookie-Einstellungen" im Footer. Ein Analyse-Skript wird nur geladen, wenn es in `config.js` eingetragen **und** eingewilligt wurde.
- **Impressum** nach § 5 DDG (Nachfolger des TMG) und § 18 Abs. 2 MStV, Haftungs-, Link-, Marken- und VSBG-Hinweis. Kein Link zur EU-OS-Plattform (wurde im Juli 2025 eingestellt).
- **Datenschutzerklärung** für genau diesen Aufbau: Server-Logs, Local Storage, Amazon-Affiliate, optionale Analyse, E-Mail-Kontakt, Betroffenenrechte, Beschwerderecht.
- **Barrierefreiheit:** Skip-Link, Tastaturbedienung, ARIA-Tabs, beschriftete Tabellen/Formulare, Fokus-Stile.

## Wichtige Amazon-Regeln (PartnerNet-Teilnahmebedingungen)

- **Keine statischen Amazon-Preise** anzeigen, die älter als 24 h sind. Die Seite zeigt deshalb nur allgemeine „ab ca."-Orientierungspreise ohne Bezug zu Amazon. Für echte Amazon-Preise die Product Advertising API nutzen.
- **Keine Amazon-Produktbilder** herunterladen und selbst hosten – nur über API/SiteStripe einbinden (und dann Datenschutzerklärung anpassen, weil Bilder von Amazon-Servern geladen werden).
- Affiliate-Links **nicht** in E-Mails, PDFs oder Offline-Medien verwenden.
- Innerhalb von 180 Tagen nach Anmeldung mindestens 3 qualifizierte Verkäufe erzielen.

## Produkt hinzufügen

In `data/products.js` ein Objekt ergänzen:

```js
{
  id: "eindeutige-id", category: "muehle", brand: "Marke", name: "Modell",
  score: 8.0, priceFrom: 199, priceTier: 2,
  asin: "B0XXXXXXXX",            // optional, sonst wird "query" für die Amazon-Suche genutzt
  query: "Marke Modell",
  badge: "Preis-Leistungs-Tipp",  // optional
  bestFor: "Wofür das Produkt ideal ist",
  specs: { "Typ": "Elektrisch", "Mahlwerk": "Kegel" },
  pros: ["…"], cons: ["…"],
  links: [{ label: "Bei Händler X", url: "https://…" }] // optional, weitere Partner
}
```

Kategorien stehen oben in derselben Datei (`window.CATEGORIES`).
