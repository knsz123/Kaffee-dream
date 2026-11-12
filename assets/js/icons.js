/* Eigene Line-Art-Illustrationen (frei verwendbar, keine Fremdbilder). viewBox 0 0 64 64, Farbe über currentColor. */
(function () {
  var S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var svg = function (inner, label) {
    return '<svg class="cat-art" viewBox="0 0 64 64" ' + S + (label ? ' role="img" aria-label="' + label + '"' : ' aria-hidden="true"') + ">" + inner + "</svg>";
  };
  var I = {
    vollautomat: '<rect x="14" y="8" width="36" height="48" rx="5"/><rect x="20" y="14" width="24" height="9" rx="2"/><circle cx="25" cy="18.5" r="1"/><circle cx="31" cy="18.5" r="1"/><path d="M24 30h16v4H24z"/><path d="M29 34v4M35 34v4"/><path d="M25 43h14l-1.5 8h-11z"/><path d="M14 51h36"/>',
    siebtraeger: '<path d="M10 14h44v10H10z"/><path d="M18 24v6h28v-6"/><path d="M22 30h20l-2 5H24z"/><path d="M42 32h14"/><path d="M28 35v4M36 35v4"/><path d="M24 44h16l-1.5 10h-13z"/><path d="M40 47h3a3 3 0 0 1 0 6h-4"/><path d="M8 56h48"/>',
    filter: '<rect x="12" y="8" width="16" height="48" rx="3"/><path d="M28 12h22v8H28"/><path d="M33 20l3 8h8l3-8"/><path d="M34 34h16v16a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z"/><path d="M50 38h3a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-3"/><path d="M34 42h16"/>',
    muehle: '<path d="M22 8h20l-3 12H25z"/><rect x="18" y="20" width="28" height="30" rx="4"/><circle cx="32" cy="32" r="5"/><path d="M32 27v-3M32 40v-3"/><path d="M22 50v6h20v-6"/><path d="M46 28h8v-4"/>',
    handbrew: '<path d="M14 14h36l-10 18H24z"/><path d="M20 14v-3h24v3"/><path d="M26 32h12v4H26z"/><path d="M20 36h24l-2 16a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4z"/><path d="M44 40h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-4"/><path d="M28 21l2 4M34 21l-1 4"/>',
    milch: '<path d="M18 22h22v26a8 8 0 0 1-8 8h-6a8 8 0 0 1-8-8z"/><path d="M40 28h4a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-4"/><path d="M18 30c4 2 8-2 11 0s7 2 11 0"/><path d="M24 14c0-3 3-3 3-6M31 14c0-3 3-3 3-6"/>',
    bohnen: '<ellipse cx="24" cy="26" rx="10" ry="14" transform="rotate(-25 24 26)"/><path d="M18 15c6 6 2 16 9 22"/><ellipse cx="42" cy="40" rx="10" ry="14" transform="rotate(30 42 40)"/><path d="M48 29c-7 5-3 15-11 21"/>',
    zubehoer: '<rect x="8" y="40" width="34" height="14" rx="3"/><rect x="14" y="44" width="12" height="6" rx="1"/><circle cx="35" cy="47" r="2"/><path d="M44 18h10v6H44z"/><path d="M49 24v8"/><rect x="42" y="32" width="14" height="5" rx="2"/><path d="M14 36c0-8 6-14 14-14"/><path d="M22 18l6 4-6 4"/>',
    // Brühmethoden
    espresso: '<path d="M18 26h24v12a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10z"/><path d="M42 30h3a4 4 0 0 1 0 8h-3"/><path d="M14 52h36"/><path d="M26 18c0-3 3-3 3-6M33 18c0-3 3-3 3-6"/>',
    v60: '<path d="M12 16h40L38 36H26z"/><path d="M26 36h12v4H26z"/><path d="M18 44h28v8H18z"/>',
    frenchpress: '<rect x="18" y="16" width="26" height="38" rx="3"/><path d="M31 16V6M25 6h12"/><path d="M18 26h26"/><path d="M44 22h6v24h-6"/>',
    aeropress: '<rect x="22" y="8" width="20" height="14" rx="2"/><rect x="20" y="22" width="24" height="24" rx="2"/><path d="M16 46h32v4H16z"/><path d="M24 54h16"/>',
    chemex: '<path d="M20 8h24L34 30l10 22a2 2 0 0 1-2 3H22a2 2 0 0 1-2-3l10-22z"/><path d="M28 28h8"/><path d="M27 32h10"/>',
    coldbrew: '<rect x="18" y="14" width="28" height="42" rx="4"/><path d="M18 22h28"/><path d="M26 30l4 4-4 4M36 32l3 3-3 3"/><path d="M24 46h16"/>',
    // UI
    check: '<path d="M10 33l14 14 30-30"/>',
    shield: '<path d="M32 6l20 8v16c0 14-9 22-20 28C21 52 12 44 12 30V14z"/><path d="M23 32l7 7 12-14"/>',
    scale: '<path d="M32 8v48M12 56h40M16 18h32"/><path d="M16 18l-8 16h16zM48 18l-8 16h16z"/>',
    calendar: '<rect x="10" y="14" width="44" height="40" rx="4"/><path d="M10 26h44M22 8v10M42 8v10"/>',
    info: '<circle cx="32" cy="32" r="24"/><path d="M32 28v16M32 20v1"/>'
  };
  window.ICON = function (name, label) { return svg(I[name] || I.info, label); };
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-icon]").forEach(function (n) { n.innerHTML = window.ICON(n.getAttribute("data-icon")); });
  });
})();
