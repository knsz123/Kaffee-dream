/**
 * Produktdatenbank.
 *
 * WICHTIG: Alle Preise, technischen Daten und Bewertungen sind BEISPIELDATEN
 * und müssen vor Veröffentlichung geprüft/aktualisiert werden.
 * Bewertungen ("score") sind redaktionelle Einschätzungen nach den Kriterien
 * auf testverfahren.html – keine Kundenbewertungen.
 *
 * Felder:
 *  id, category, brand, name, score (0–10), priceFrom (EUR, ca.), priceTier (1–4),
 *  asin (optional, Amazon), query (Suchbegriff für Affiliate-Suche),
 *  badge (optional), bestFor, specs {Label: Wert}, pros[], cons[],
 *  links (optional): [{ label, url }] – weitere Affiliate-Partner
 */
window.CATEGORIES = [
  { id: "vollautomat", name: "Kaffeevollautomaten", icon: "☕", intro: "Bohne rein, Knopf drücken: Vollautomaten mahlen, brühen und schäumen Milch auf Knopfdruck." },
  { id: "siebtraeger", name: "Siebträgermaschinen", icon: "🔧", intro: "Für Espresso-Fans, die selbst Hand anlegen wollen – mehr Kontrolle, mehr Geschmack, mehr Lernkurve." },
  { id: "filter", name: "Filterkaffeemaschinen", icon: "🫖", intro: "Klassiker für mehrere Tassen auf einmal – moderne Modelle brühen mit idealer Temperatur." },
  { id: "muehle", name: "Kaffeemühlen", icon: "⚙️", intro: "Frisch gemahlen schmeckt besser: elektrische und manuelle Mühlen mit Kegel- oder Scheibenmahlwerk." },
  { id: "handbrew", name: "Handfilter & Co.", icon: "💧", intro: "Pour-Over, French Press, AeroPress und Mokkakanne – günstig, kompakt und geschmacksstark." },
  { id: "milch", name: "Milchaufschäumer", icon: "🥛", intro: "Cremiger Milchschaum für Cappuccino & Latte – auch ohne Dampflanze." },
  { id: "bohnen", name: "Kaffeebohnen", icon: "🫘", intro: "Ganze Bohnen für Vollautomat, Siebträger oder Filter – von mild bis kräftig." },
  { id: "zubehoer", name: "Zubehör", icon: "⚖️", intro: "Waagen, Wasserkocher und Tamper – kleine Helfer mit großer Wirkung." }
];

window.PRODUCTS = [
  // ───────────── Kaffeevollautomaten ─────────────
  {
    id: "delonghi-magnifica-s", category: "vollautomat", brand: "De'Longhi", name: "Magnifica S ECAM 22.110.B",
    score: 7.6, priceFrom: 299, priceTier: 1, query: "DeLonghi Magnifica S ECAM 22.110.B", badge: "Preis-Leistungs-Tipp",
    bestFor: "Einsteiger mit kleinem Budget",
    specs: { "Milchsystem": "Manuelle Dampfdüse", "Bohnenbehälter": "250 g", "Wassertank": "1,8 l", "Display": "Tasten", "Pumpendruck": "15 bar" },
    pros: ["Sehr günstig", "Robust und langlebig", "Einfache Bedienung"],
    cons: ["Milchschaum nur manuell", "Kein Display"]
  },
  {
    id: "philips-3200-lattego", category: "vollautomat", brand: "Philips", name: "Serie 3200 LatteGo EP3246/70",
    score: 8.1, priceFrom: 399, priceTier: 2, query: "Philips 3200 LatteGo EP3246", badge: "Beliebt",
    bestFor: "Milchkaffee-Trinker, die wenig putzen wollen",
    specs: { "Milchsystem": "LatteGo (automatisch)", "Bohnenbehälter": "275 g", "Wassertank": "1,8 l", "Display": "Touch-Tasten", "Pumpendruck": "15 bar" },
    pros: ["Milchsystem in Sekunden gereinigt", "5 Kaffeespezialitäten", "Leise"],
    cons: ["Kunststoffanmutung", "Kein Milchschlauch für Tetrapak"]
  },
  {
    id: "siemens-eq6-s300", category: "vollautomat", brand: "Siemens", name: "EQ.6 plus s300",
    score: 8.3, priceFrom: 649, priceTier: 3, query: "Siemens EQ.6 plus s300",
    bestFor: "Familien mit vielen Getränkewünschen",
    specs: { "Milchsystem": "Milchschlauch (automatisch)", "Bohnenbehälter": "300 g", "Wassertank": "1,7 l", "Display": "Farb-Display", "Pumpendruck": "19 bar" },
    pros: ["Große Getränkeauswahl", "Zwei Tassen gleichzeitig", "Gute Espresso-Qualität"],
    cons: ["Recht groß", "Milchsystem braucht regelmäßige Reinigung"]
  },
  {
    id: "melitta-barista-ts-smart", category: "vollautomat", brand: "Melitta", name: "Barista TS Smart F850-101",
    score: 8.4, priceFrom: 799, priceTier: 3, query: "Melitta Barista TS Smart",
    bestFor: "Technikfans mit App-Steuerung",
    specs: { "Milchsystem": "Milchschlauch (automatisch)", "Bohnenbehälter": "2 × 135 g", "Wassertank": "1,8 l", "Display": "Farb-Display + App", "Pumpendruck": "15 bar" },
    pros: ["Zwei Bohnenfächer", "21 Rezepte + App", "Benutzerprofile"],
    cons: ["Hoher Preis", "App teils umständlich"]
  },
  {
    id: "jura-e8", category: "vollautomat", brand: "JURA", name: "E8 (EC)",
    score: 8.8, priceFrom: 1099, priceTier: 4, query: "Jura E8 Kaffeevollautomat", badge: "Redaktionsfavorit",
    bestFor: "Anspruchsvolle mit Premium-Budget",
    specs: { "Milchsystem": "Feinschaumtechnologie", "Bohnenbehälter": "280 g", "Wassertank": "1,9 l", "Display": "Farb-Display", "Pumpendruck": "15 bar" },
    pros: ["Sehr gute Kaffeequalität", "Hochwertige Verarbeitung", "Puls-Extraktion"],
    cons: ["Teuer", "Proprietäre Filter/Reinigungstabletten"]
  },

  // ───────────── Siebträger ─────────────
  {
    id: "sage-bambino-plus", category: "siebtraeger", brand: "Sage", name: "the Bambino Plus SES500",
    score: 8.2, priceFrom: 399, priceTier: 2, query: "Sage Bambino Plus", badge: "Einsteiger-Tipp",
    bestFor: "Siebträger-Einsteiger mit wenig Platz",
    specs: { "Heizsystem": "ThermoJet (3 s Aufheizzeit)", "Milch": "Automatische Dampflanze", "Siebträger": "54 mm", "Wassertank": "1,9 l", "Mühle integriert": "Nein" },
    pros: ["Extrem schnell betriebsbereit", "Automatisches Milchschäumen", "Kompakt"],
    cons: ["54-mm-Siebträger (weniger Zubehör)", "Mühle separat nötig"]
  },
  {
    id: "sage-barista-express", category: "siebtraeger", brand: "Sage", name: "the Barista Express SES875",
    score: 8.0, priceFrom: 579, priceTier: 3, query: "Sage Barista Express SES875",
    bestFor: "Alles-in-einem mit integrierter Mühle",
    specs: { "Heizsystem": "Thermocoil", "Milch": "Dampflanze", "Siebträger": "54 mm", "Wassertank": "2 l", "Mühle integriert": "Ja, Kegelmahlwerk" },
    pros: ["Integrierte Mühle", "Manometer", "Viel Zubehör inklusive"],
    cons: ["Mühle begrenzt einstellbar", "Viel Kunststoff im Inneren"]
  },
  {
    id: "gaggia-classic-evo-pro", category: "siebtraeger", brand: "Gaggia", name: "Classic Evo Pro",
    score: 7.9, priceFrom: 449, priceTier: 2, query: "Gaggia Classic Evo Pro",
    bestFor: "Bastler und Puristen",
    specs: { "Heizsystem": "Einkreiser (Boiler)", "Milch": "Profi-Dampflanze", "Siebträger": "58 mm", "Wassertank": "2,1 l", "Mühle integriert": "Nein" },
    pros: ["58-mm-Standard", "Sehr reparaturfreundlich", "Große Community"],
    cons: ["Temperatur schwankt ohne PID", "Wartezeit zwischen Espresso und Dampf"]
  },
  {
    id: "lelit-anna-pl41tem", category: "siebtraeger", brand: "Lelit", name: "Anna PL41TEM",
    score: 8.3, priceFrom: 459, priceTier: 2, query: "Lelit Anna PL41TEM",
    bestFor: "Präzise Temperatur zum fairen Preis",
    specs: { "Heizsystem": "Einkreiser mit PID", "Milch": "Dampflanze", "Siebträger": "57 mm", "Wassertank": "2,7 l", "Mühle integriert": "Nein" },
    pros: ["PID-Temperaturregelung", "Edelstahlgehäuse", "Manometer"],
    cons: ["57 mm statt 58 mm", "Dampfleistung mittel"]
  },
  {
    id: "rancilio-silvia-v6", category: "siebtraeger", brand: "Rancilio", name: "Silvia V6 E",
    score: 8.5, priceFrom: 899, priceTier: 4, query: "Rancilio Silvia V6", badge: "Langlebig",
    bestFor: "Wer eine Maschine fürs Leben sucht",
    specs: { "Heizsystem": "Einkreiser (Messingboiler)", "Milch": "Profi-Dampflanze", "Siebträger": "58 mm (Gastro)", "Wassertank": "2 l", "Mühle integriert": "Nein" },
    pros: ["Gastro-Komponenten", "Extrem langlebig", "Starker Dampf"],
    cons: ["Ohne PID anspruchsvoll", "Hoher Preis für Einkreiser"]
  },

  // ───────────── Filterkaffee ─────────────
  {
    id: "moccamaster-kbg-select", category: "filter", brand: "Moccamaster", name: "KBG Select",
    score: 8.9, priceFrom: 259, priceTier: 3, query: "Moccamaster KBG Select", badge: "Redaktionsfavorit",
    bestFor: "Filterkaffee-Liebhaber",
    specs: { "Kapazität": "1,25 l (10 Tassen)", "Brühtemperatur": "92–96 °C", "Kanne": "Glas + Warmhalteplatte", "Brühzeit": "ca. 6 min", "Garantie": "5 Jahre" },
    pros: ["Ideale Brühtemperatur", "Handgefertigt, langlebig", "SCA-zertifiziert"],
    cons: ["Teuer", "Keine Timer-Funktion"]
  },
  {
    id: "melitta-aromafresh", category: "filter", brand: "Melitta", name: "AromaFresh 1021-01",
    score: 7.7, priceFrom: 139, priceTier: 2, query: "Melitta AromaFresh Mahlwerk",
    bestFor: "Filterkaffee mit integriertem Mahlwerk",
    specs: { "Kapazität": "1,25 l (10 Tassen)", "Brühtemperatur": "k. A.", "Kanne": "Glas", "Mahlwerk": "Kegelmahlwerk", "Timer": "Ja" },
    pros: ["Frisch gemahlen", "Timer", "Aromastärke einstellbar"],
    cons: ["Mahlwerk laut", "Reinigung aufwendiger"]
  },
  {
    id: "melitta-look-therm", category: "filter", brand: "Melitta", name: "Look V Therm Timer",
    score: 7.1, priceFrom: 69, priceTier: 1, query: "Melitta Look Therm Timer", badge: "Budget-Tipp",
    bestFor: "Günstiger Alltagskaffee",
    specs: { "Kapazität": "1,25 l (10 Tassen)", "Brühtemperatur": "k. A.", "Kanne": "Thermokanne", "Brühzeit": "ca. 10 min", "Timer": "Ja" },
    pros: ["Thermokanne hält warm", "Günstig", "Timer"],
    cons: ["Brühtemperatur nicht optimal", "Kunststoffgehäuse"]
  },

  // ───────────── Mühlen ─────────────
  {
    id: "graef-cm800", category: "muehle", brand: "Graef", name: "CM 800",
    score: 7.5, priceFrom: 119, priceTier: 1, query: "Graef CM 800 Kaffeemühle",
    bestFor: "Allrounder für Filter und Vollautomat-Bohnen",
    specs: { "Typ": "Elektrisch", "Mahlwerk": "Kegel, Edelstahl", "Mahlgradstufen": "40", "Espressotauglich": "Eingeschränkt", "Bohnenbehälter": "350 g" },
    pros: ["Günstig", "Siebträgerhalter", "Viele Stufen"],
    cons: ["Für Espresso nur bedingt fein genug", "Totraum"]
  },
  {
    id: "baratza-encore-esp", category: "muehle", brand: "Baratza", name: "Encore ESP",
    score: 8.1, priceFrom: 179, priceTier: 2, query: "Baratza Encore ESP", badge: "Allrounder",
    bestFor: "Espresso und Filter in einer Mühle",
    specs: { "Typ": "Elektrisch", "Mahlwerk": "Kegel 40 mm", "Mahlgradstufen": "40 (Dual-Range)", "Espressotauglich": "Ja", "Bohnenbehälter": "300 g" },
    pros: ["Fein für Espresso UND grob für Filter", "Ersatzteile erhältlich", "Einfach"],
    cons: ["Etwas laut", "Kein Timer"]
  },
  {
    id: "eureka-mignon-specialita", category: "muehle", brand: "Eureka", name: "Mignon Specialità",
    score: 8.7, priceFrom: 429, priceTier: 3, query: "Eureka Mignon Specialita", badge: "Espresso-Tipp",
    bestFor: "Espresso-Enthusiasten",
    specs: { "Typ": "Elektrisch", "Mahlwerk": "Scheibe 55 mm", "Mahlgradstufen": "Stufenlos", "Espressotauglich": "Ja", "Bohnenbehälter": "300 g" },
    pros: ["Sehr leise", "Stufenlos, präzise", "Touch-Display mit Timer"],
    cons: ["Für Filter weniger ideal", "Preis"]
  },
  {
    id: "comandante-c40", category: "muehle", brand: "Comandante", name: "C40 MK4 Nitro Blade",
    score: 9.0, priceFrom: 279, priceTier: 3, query: "Comandante C40 MK4",
    bestFor: "Handmühlen-Perfektionisten",
    specs: { "Typ": "Manuell", "Mahlwerk": "Kegel, Nitro-Blade-Stahl", "Mahlgradstufen": "Klickrad", "Espressotauglich": "Ja (mit Red Clix)", "Bohnenbehälter": "ca. 40 g" },
    pros: ["Herausragende Mahlqualität", "Reisetauglich", "Leise"],
    cons: ["Teuer für Handmühle", "Kraftaufwand bei Espresso"]
  },
  {
    id: "timemore-c3", category: "muehle", brand: "Timemore", name: "Chestnut C3",
    score: 7.8, priceFrom: 79, priceTier: 1, query: "Timemore C3 Handmühle", badge: "Budget-Tipp",
    bestFor: "Günstiger Einstieg in frisch gemahlenen Kaffee",
    specs: { "Typ": "Manuell", "Mahlwerk": "Kegel, Edelstahl", "Mahlgradstufen": "Klickrad", "Espressotauglich": "Eingeschränkt", "Bohnenbehälter": "ca. 25 g" },
    pros: ["Top Preis-Leistung", "Metallgehäuse", "Gut für Filter"],
    cons: ["Kleine Füllmenge", "Für Espresso grenzwertig"]
  },

  // ───────────── Handbrew ─────────────
  {
    id: "hario-v60", category: "handbrew", brand: "Hario", name: "V60 Dripper 02 Keramik",
    score: 8.6, priceFrom: 22, priceTier: 1, query: "Hario V60 02 Keramik",
    bestFor: "Klare, aromatische Pour-Over-Tassen",
    specs: { "Methode": "Pour-Over", "Material": "Keramik", "Tassen": "1–4", "Filter": "Papier V60 02", "Schwierigkeit": "Mittel" },
    pros: ["Günstig", "Sehr klarer Geschmack", "Kultstatus"],
    cons: ["Technik erfordert Übung", "Schwanenhals-Kessel empfohlen"]
  },
  {
    id: "chemex-6", category: "handbrew", brand: "Chemex", name: "Classic 6 Tassen",
    score: 8.2, priceFrom: 49, priceTier: 1, query: "Chemex 6 Tassen",
    bestFor: "Kaffee für Gäste mit Stil",
    specs: { "Methode": "Pour-Over", "Material": "Borosilikatglas", "Tassen": "bis 6", "Filter": "Chemex-Papierfilter", "Schwierigkeit": "Mittel" },
    pros: ["Designklassiker", "Sehr sauberer Geschmack", "Große Menge"],
    cons: ["Spezielle teure Filter", "Zerbrechlich"]
  },
  {
    id: "aeropress-original", category: "handbrew", brand: "AeroPress", name: "Original",
    score: 8.5, priceFrom: 39, priceTier: 1, query: "AeroPress Original", badge: "Reise-Tipp",
    bestFor: "Unterwegs, Büro und Experimentierfreudige",
    specs: { "Methode": "Druck/Immersion", "Material": "Tritan-Kunststoff", "Tassen": "1", "Filter": "Papier oder Metall", "Schwierigkeit": "Leicht" },
    pros: ["Fast unzerbrechlich", "Schnell gereinigt", "Vielseitig"],
    cons: ["Nur 1 Tasse", "Kunststoff"]
  },
  {
    id: "bodum-chambord", category: "handbrew", brand: "Bodum", name: "Chambord French Press 1 l",
    score: 7.6, priceFrom: 35, priceTier: 1, query: "Bodum Chambord 1 Liter",
    bestFor: "Vollmundiger Kaffee ohne Papierfilter",
    specs: { "Methode": "Immersion", "Material": "Glas/Edelstahl", "Tassen": "bis 8", "Filter": "Metallsieb", "Schwierigkeit": "Leicht" },
    pros: ["Simpel", "Kein Papierfilter nötig", "Zeitloses Design"],
    cons: ["Etwas Bodensatz", "Glas zerbrechlich"]
  },
  {
    id: "bialetti-moka-express", category: "handbrew", brand: "Bialetti", name: "Moka Express 6 Tassen",
    score: 7.4, priceFrom: 32, priceTier: 1, query: "Bialetti Moka Express 6 Tassen",
    bestFor: "Italienischer Herdkaffee",
    specs: { "Methode": "Herd/Druck", "Material": "Aluminium", "Tassen": "6 (Espressotassen)", "Filter": "Metall", "Schwierigkeit": "Leicht" },
    pros: ["Kultobjekt", "Kräftiger Kaffee", "Kein Strom nötig"],
    cons: ["Nicht induktionsgeeignet", "Kein echter Espresso"]
  },

  // ───────────── Milch ─────────────
  {
    id: "severin-sm3587", category: "milch", brand: "Severin", name: "SM 3587 Milchaufschäumer",
    score: 7.3, priceFrom: 49, priceTier: 1, query: "Severin SM 3587 Milchaufschäumer", badge: "Budget-Tipp",
    bestFor: "Gelegentlicher Cappuccino",
    specs: { "Kapazität (Schaum)": "ca. 125 ml", "Kalt-Schaum": "Ja", "Induktion": "Ja", "Spülmaschinenfest": "Nein", "Leistung": "500 W" },
    pros: ["Günstig", "Warm & kalt", "Kompakt"],
    cons: ["Kleine Menge", "Nicht spülmaschinenfest"]
  },
  {
    id: "nespresso-aeroccino4", category: "milch", brand: "Nespresso", name: "Aeroccino 4",
    score: 8.2, priceFrom: 99, priceTier: 2, query: "Nespresso Aeroccino 4",
    bestFor: "Cremiger Schaum ohne Aufwand",
    specs: { "Kapazität (Schaum)": "ca. 120 ml", "Kalt-Schaum": "Ja", "Induktion": "Ja", "Spülmaschinenfest": "Ja", "Leistung": "500 W" },
    pros: ["Spülmaschinenfest", "4 Programme", "Sehr feiner Schaum"],
    cons: ["Teurer", "Kleine Menge"]
  },
  {
    id: "sage-milk-cafe", category: "milch", brand: "Sage", name: "the Milk Café SMF600",
    score: 8.4, priceFrom: 129, priceTier: 2, query: "Sage Milk Cafe SMF600", badge: "Für Familien",
    bestFor: "Große Mengen und heiße Schokolade",
    specs: { "Kapazität (Schaum)": "bis 1 l", "Kalt-Schaum": "Ja", "Induktion": "Ja", "Spülmaschinenfest": "Ja (Kanne)", "Leistung": "1000 W" },
    pros: ["Große Kapazität", "Temperatur einstellbar", "Auch für Kakao"],
    cons: ["Groß", "Preis"]
  },

  // ───────────── Bohnen ─────────────
  {
    id: "lavazza-super-crema", category: "bohnen", brand: "Lavazza", name: "Super Crema 1 kg",
    score: 7.6, priceFrom: 17, priceTier: 1, query: "Lavazza Super Crema 1kg Bohnen", badge: "Bestseller",
    bestFor: "Vollautomat & Siebträger, mild",
    specs: { "Röstgrad": "Mittel", "Sorte": "Arabica/Robusta", "Intensität": "4/5", "Geschmack": "Haselnuss, Honig", "Bio/Fairtrade": "Nein" },
    pros: ["Schöne Crema", "Günstig je kg", "Überall erhältlich"],
    cons: ["Kein Röstdatum, nur MHD", "Industrieröstung"]
  },
  {
    id: "dallmayr-crema-doro", category: "bohnen", brand: "Dallmayr", name: "Crema d'Oro 1 kg",
    score: 7.3, priceFrom: 16, priceTier: 1, query: "Dallmayr Crema d'Oro 1kg Bohnen",
    bestFor: "Milde Café Crème",
    specs: { "Röstgrad": "Mittel", "Sorte": "Arabica/Robusta", "Intensität": "3/5", "Geschmack": "Mild, nussig", "Bio/Fairtrade": "Nein" },
    pros: ["Sehr mild", "Gut für Café Crème", "Bekömmlich"],
    cons: ["Für Espresso zu flach", "Industrieröstung"]
  },
  {
    id: "tchibo-barista-espresso", category: "bohnen", brand: "Tchibo", name: "Barista Espresso 1 kg",
    score: 7.0, priceFrom: 15, priceTier: 1, query: "Tchibo Barista Espresso 1kg",
    bestFor: "Kräftiger Espresso fürs Budget",
    specs: { "Röstgrad": "Dunkel", "Sorte": "Arabica/Robusta", "Intensität": "5/5", "Geschmack": "Schokolade, kräftig", "Bio/Fairtrade": "Nein" },
    pros: ["Günstig", "Kräftig", "Häufig im Angebot"],
    cons: ["Teils bitter", "Wenig Komplexität"]
  },
  {
    id: "mount-hagen-bio-espresso", category: "bohnen", brand: "Mount Hagen", name: "Bio Fairtrade Espresso 1 kg",
    score: 7.8, priceFrom: 24, priceTier: 2, query: "Mount Hagen Bio Espresso Bohnen 1kg", badge: "Bio & Fair",
    bestFor: "Nachhaltig genießen",
    specs: { "Röstgrad": "Mittel-dunkel", "Sorte": "100 % Arabica", "Intensität": "4/5", "Geschmack": "Kakao, Karamell", "Bio/Fairtrade": "Ja / Ja" },
    pros: ["Bio + Fairtrade", "100 % Arabica", "Ausgewogen"],
    cons: ["Teurer", "Nicht überall erhältlich"]
  },

  // ───────────── Zubehör ─────────────
  {
    id: "timemore-black-mirror", category: "zubehoer", brand: "Timemore", name: "Black Mirror Basic 2 Waage",
    score: 8.3, priceFrom: 55, priceTier: 1, query: "Timemore Black Mirror Basic 2",
    bestFor: "Präzises Dosieren für Espresso & Filter",
    specs: { "Typ": "Kaffeewaage", "Genauigkeit": "0,1 g", "Timer": "Ja", "Akku": "USB-C", "Max. Last": "2 kg" },
    pros: ["Auto-Timer", "Schnelle Reaktion", "Flach – passt unter Siebträger"],
    cons: ["Nicht wasserdicht", "Kratzempfindlich"]
  },
  {
    id: "fellow-stagg-ekg", category: "zubehoer", brand: "Fellow", name: "Stagg EKG Wasserkocher",
    score: 8.6, priceFrom: 169, priceTier: 3, query: "Fellow Stagg EKG", badge: "Design-Tipp",
    bestFor: "Pour-Over-Perfektionisten",
    specs: { "Typ": "Schwanenhals-Wasserkocher", "Volumen": "0,9 l", "Temperaturwahl": "40–100 °C", "Warmhalten": "60 min", "Leistung": "1200 W" },
    pros: ["Gradgenaue Temperatur", "Präziser Ausguss", "Wunderschön"],
    cons: ["Teuer", "Kleines Volumen"]
  },
  {
    id: "motta-tamper-58", category: "zubehoer", brand: "Motta", name: "Tamper 58 mm Edelstahl",
    score: 7.5, priceFrom: 25, priceTier: 1, query: "Motta Tamper 58mm",
    bestFor: "Siebträger-Grundausstattung",
    specs: { "Typ": "Tamper", "Durchmesser": "58 mm", "Material": "Edelstahl/Holz", "Gewicht": "ca. 400 g", "Spülmaschinenfest": "Nein" },
    pros: ["Solide", "Gutes Gewicht", "Günstig"],
    cons: ["Nur für 58 mm", "Kein kalibrierter Druck"]
  }
];
