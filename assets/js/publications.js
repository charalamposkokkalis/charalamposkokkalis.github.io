/* Publications page: expand/collapse inline BibTeX and copy it.
   Progressive enhancement — with JS off the pills still work, the bibtex
   panel simply stays hidden. */
(function () {
  "use strict";

  document.addEventListener("click", function (event) {
    var toggle = event.target.closest("[data-bibtex-toggle]");
    if (toggle) {
      var panel = document.getElementById(toggle.getAttribute("aria-controls"));
      if (!panel) return;
      var open = panel.hasAttribute("hidden");
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      return;
    }

    var copy = event.target.closest("[data-bibtex-copy]");
    if (!copy) return;

    var code = copy.parentNode.querySelector("code");
    if (!code) return;

    var done = function () {
      var original = copy.textContent;
      copy.textContent = "Copied";
      setTimeout(function () { copy.textContent = original; }, 1500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code.textContent).then(done, function () {});
      return;
    }

    // Fallback for browsers without the async clipboard API.
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    try { document.execCommand("copy"); done(); } catch (e) { /* no-op */ }
    selection.removeAllRanges();
  });
})();
