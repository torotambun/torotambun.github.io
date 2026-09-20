/* deck-viewer.js
 *
 * Opens a "Slides" badge inside an in-page overlay instead of a separate tab,
 * so the Back button returns to the exact place on the list (search text,
 * year filter and scroll position are untouched because the list never
 * unloads). The deck files themselves are not modified.
 *
 * Loaded by jakarta_post.html and articles.html:
 *   <script src="deck-viewer.js" data-list="columns" defer></script>
 *
 * Fallbacks: with JavaScript off, or when the badge is clicked with Cmd, Ctrl,
 * Shift or the middle button, the badge behaves as its normal new-tab link.
 */
(function () {
  'use strict';

  var tag = document.currentScript || document.querySelector('script[src$="deck-viewer.js"]');
  var listLabel = (tag && tag.getAttribute('data-list')) || 'list';
  var homeUrl = (tag && tag.getAttribute('data-home')) || 'index.html';

  var css =
    'html.dv-lock{overflow:hidden}' +
    '#dv-overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:10000;display:flex;flex-direction:column;background:#f8f5ef}' +
    '#dv-overlay[hidden]{display:none}' +
    '#dv-bar{flex:0 0 auto;display:flex;align-items:center;gap:10px;height:44px;padding:0 12px;background:#1c2340;color:#e2e8f0;font:13px/1 Arial,Helvetica,sans-serif}' +
    '#dv-bar button,#dv-bar a{font:inherit;color:#fff;text-decoration:none;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);border-radius:4px;padding:8px 12px;cursor:pointer;white-space:nowrap}' +
    '#dv-bar button:hover,#dv-bar a:hover,#dv-bar button:focus-visible,#dv-bar a:focus-visible{background:rgba(255,255,255,.26);outline:none}' +
    '#dv-title{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#aab6d0;font-size:12px}' +
    '#dv-frame{flex:1 1 auto;width:100%;border:0;background:#f8f5ef}' +
    '@media (max-width:600px){#dv-title,#dv-newtab{display:none}#dv-bar{justify-content:flex-start}}';

  var overlay, frame, titleEl, newTabEl, backBtn;
  var opened = false;
  var lastFocus = null;

  function build() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    overlay = document.createElement('div');
    overlay.id = 'dv-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Slide deck');

    var bar = document.createElement('div');
    bar.id = 'dv-bar';

    backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.id = 'dv-back';
    backBtn.textContent = '← Back to ' + listLabel;
    backBtn.addEventListener('click', close);

    var home = document.createElement('a');
    home.id = 'dv-home';
    home.href = homeUrl;
    home.textContent = 'Home';

    titleEl = document.createElement('span');
    titleEl.id = 'dv-title';

    newTabEl = document.createElement('a');
    newTabEl.id = 'dv-newtab';
    newTabEl.target = '_blank';
    newTabEl.rel = 'noopener';
    newTabEl.textContent = 'Open in new tab ↗';

    bar.appendChild(backBtn);
    bar.appendChild(home);
    bar.appendChild(titleEl);
    bar.appendChild(newTabEl);

    overlay.appendChild(bar);
    document.body.appendChild(overlay);
  }

  /* Same-origin only: make external links leave the frame (LinkedIn, DOI and
     the Jakarta Post refuse to be framed) and let Escape close the overlay
     even while the deck has focus. */
  function onFrameLoad() {
    if (!opened || !frame) return;
    try {
      var doc = frame.contentDocument;
      if (!doc) return;
      doc.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
      });
      var links = doc.querySelectorAll('a[href]');
      for (var i = 0; i < links.length; i++) {
        var a = links[i];
        if (!a.target && a.hostname && a.hostname !== location.hostname) {
          a.target = '_blank';
          a.rel = 'noopener';
        }
      }
      frame.contentWindow.focus();
    } catch (err) { /* cross-origin or file://: leave the deck as it is */ }
  }

  function open(url, title) {
    if (!overlay) build();
    if (opened) return;
    lastFocus = document.activeElement;
    titleEl.textContent = title || '';
    newTabEl.href = url;
    overlay.hidden = false;
    document.documentElement.classList.add('dv-lock');
    history.pushState({ deckViewer: true }, '');
    opened = true;
    /* A fresh iframe with its src set before insertion adds no session-history
       entry. Re-pointing an existing iframe would add one, and history.back()
       would then undo the iframe instead of closing the overlay. */
    frame = document.createElement('iframe');
    frame.id = 'dv-frame';
    frame.title = 'Slide deck';
    frame.addEventListener('load', onFrameLoad);
    frame.src = url;
    overlay.appendChild(frame);
    backBtn.focus();
  }

  function hide() {
    if (!opened) return;
    opened = false;
    overlay.hidden = true;
    if (frame) { frame.remove(); frame = null; }
    document.documentElement.classList.remove('dv-lock');
    if (lastFocus && lastFocus.focus) {
      try { lastFocus.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
    }
  }

  /* Closing through history keeps the browser Back button and the on-screen
     Back button consistent: both end in the popstate handler below. */
  function close() {
    if (!opened) return;
    if (history.state && history.state.deckViewer) history.back();
    else hide();
  }

  window.addEventListener('popstate', function () {
    if (opened) hide();
  });

  document.addEventListener('keydown', function (e) {
    if (opened && e.key === 'Escape') close();
  });

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var badge = e.target && e.target.closest ? e.target.closest('a.deck-badge') : null;
    if (!badge) return;
    e.preventDefault();
    var row = badge.closest('tr');
    var link = row ? row.querySelector('.title-col a:not(.deck-badge)') : null;
    open(badge.href, link ? link.textContent.trim() : '');
  });
})();
