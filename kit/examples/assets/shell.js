/* =============================================================
   uniXecure UI Kit — 共用外殼（側欄 + Nav + Footer）
   用法：頁面 <body data-page="list"> 裡放一個 <main class="content">…</main>，
        然後 <script src="assets/shell.js"></script>（放在 kit.js 之前）。
   shell.js 會把 content 包進標準 grid，並依 data-page 標記選單。

   換產品：在載入 shell.js 之前設 window.uiShell = { ... } 覆寫預設（RAVEN）。
     brand       側欄品牌字（字串）
     logo        FA icon 名（'fa-xxx'）或整段 HTML
     themeClass  外加到 <body> 的 class，例如 'theme-base'（淺色側欄）
     menu        選單陣列，每項 { icon, label, page, href, chevron:'up'|'down', child:true }
     pages       各 data-page 的麵包屑：{ list: { crumbs: [...] } }
                 crumb 可以是字串，或 { label, href }（非最後一層且有 href → 可點）
     footer      { left: '左側文字', showTime: true }
   不設 window.uiShell 時完全照舊（RAVEN 4 頁）。
   ============================================================= */
(function () {
  var cfg = window.uiShell || {};
  var page = document.body.dataset.page || '';

  if (cfg.themeClass) document.body.classList.add(cfg.themeClass);

  // ---- 選單（預設 RAVEN）----
  var DEFAULT_MENU = [
    { icon: 'fa-chart-line',  label: '資產狀態總覽', page: 'dashboard', href: 'dashboard.html' },
    { icon: 'fa-box-archive', label: '資訊資產管理', chevron: 'down' },
    { icon: 'fa-bell',        label: '資安通報' },
    { icon: 'fa-list',        label: '案件清單' },
    { icon: 'fa-desktop',     label: '設備總覽' },
    { icon: 'fa-file-lines',  label: '統計報表', chevron: 'down' },
    { icon: 'fa-gear',        label: '系統管理', chevron: 'up' },
    { child: true, label: '帳號權限' },
    { child: true, label: '告警設定',     page: 'list',   href: 'list.html' },
    { child: true, label: '告警規則詳情', page: 'detail', href: 'detail.html' },
    { child: true, label: '新增告警規則', page: 'edit',   href: 'edit.html' },
    { child: true, label: '稽核紀錄' }
  ];
  var MENU = cfg.menu || DEFAULT_MENU;

  // ---- 各頁的麵包屑（預設 RAVEN）----
  var DEFAULT_PAGES = {
    list:      { crumbs: ['系統管理', '告警設定'] },
    detail:    { crumbs: ['系統管理', { label: '告警設定', href: 'list.html' }, 'KEV 漏洞出現'] },
    edit:      { crumbs: ['系統管理', { label: '告警設定', href: 'list.html' }, '新增告警規則'] },
    dashboard: { crumbs: ['資產狀態總覽'] }
  };
  var PAGES = cfg.pages || DEFAULT_PAGES;
  var meta = PAGES[page] || { crumbs: ['—'] };

  var brand = cfg.brand || 'RAVEN';
  var logo = cfg.logo || 'fa-shield-halved';
  var logoHTML = /^fa-/.test(logo) ? '<i class="fa-solid ' + logo + '"></i>' : logo;
  var footerCfg = cfg.footer || { left: 'RAVEN 2.0 ver. 精誠集團　智慧資安科技股份有限公司 © 2026', showTime: true };

  // ---- 側欄 ----
  function menuItemHTML(m) {
    var cls = 'menu-item' + (m.child ? ' child' : '') + (m.page === page ? ' current' : '');
    var icon = m.child ? '' : '<i class="fa-solid ' + (m.icon || 'fa-circle') + '"></i>';
    var chev = m.chevron ? '<i class="fa-solid fa-angle-' + m.chevron + ' chevron"></i>' : '';
    var inner = icon + '<span class="label">' + m.label + '</span>' + chev;
    return m.href
      ? '<a class="' + cls + '" href="' + m.href + '">' + inner + '</a>'
      : '<button class="' + cls + '">' + inner + '</button>';
  }

  var sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML =
    '<div class="menu-base">' +
      '<span class="logo">' + logoHTML + '</span>' +
      '<span class="brand">' + brand + '</span>' +
      '<button class="collapse"><i class="fa-solid fa-bars"></i></button>' +
    '</div>' +
    '<nav class="menu-list">' + MENU.map(menuItemHTML).join('') + '</nav>';

  // ---- Nav：麵包屑（非最後一層且有 href → <a>，可點、hover 轉連結色）----
  var crumbHTML = meta.crumbs.map(function (c, i) {
    var last = i === meta.crumbs.length - 1;
    var label = typeof c === 'string' ? c : c.label;
    var href = typeof c === 'string' ? null : c.href;
    var sep = i ? '<span class="sep">/</span>' : '';
    var node = (href && !last)
      ? '<a class="crumb" href="' + href + '">' + label + '</a>'
      : '<span class="crumb' + (last ? ' last' : '') + '">' + label + '</span>';
    return sep + node;
  }).join('');

  var nav = document.createElement('header');
  nav.className = 'nav';
  nav.innerHTML =
    '<div class="breadcrumb">' + crumbHTML + '</div>' +
    '<div class="nav-right">' +
      '<button class="nav-btn">王小明 Peter｜系統管理員</button>' +
      '<span class="nav-notice"><button class="nav-btn has-dot" id="noticeBtn" aria-haspopup="true" aria-expanded="false" title="通知"><i class="fa-solid fa-bell"></i></button>' +
        '<div class="notice-panel" id="noticePanel" hidden></div><div class="notice-toast" id="noticeToast" hidden></div></span>' +
      '<button class="nav-btn" id="themeToggle"><i class="fa-solid fa-moon"></i></button>' +
      '<button class="nav-btn"><i class="fa-solid fa-globe"></i></button>' +
    '</div>';

  // ---- 導覽列通知（鈴鐺）：Talk 元件組成的面板。資料是示意 ----
  (function () {
    var items = [
      { n: '緊急通知', t: '2023/4/14 15:22', unread: true, b: '發現一筆 CVE 資訊 <a href="#">CVE202612121234</a>，請盡快處理。發現一筆 CVE 資訊 CVE202612121，請盡快處理。發現一筆 CVE 資訊請盡快處理。發現一筆 CVE 資訊 CVE202612121234，請盡快處理。' },
      { n: '緊急通知緊急通知緊急通知緊急通知緊急通知緊急通', t: '2023/4/14 15:22', b: '發現一筆 CVE 資訊 <a href="#">CVE202612121234</a>，請盡快處理。發現一筆 CVE 資訊請盡快處理。' },
      { n: '緊急通知', t: '2023/4/14 15:22', b: '發現一筆 CVE 資訊 <a href="#">CVE202612121234</a>，請盡快處理。' },
      { n: '緊急通知', t: '2023/4/14 15:22', b: '發現一筆 CVE 資訊 <a href="#">CVE202612121234</a>，請盡快處理。' }
    ];
    function talk(it) {
      return '<div class="talk' + (it.unread ? ' is-unread' : '') + '"><div class="talk-main"><div class="talk-head">' +
        '<span class="talk-name">' + it.n + '</span><span class="talk-time">' + it.t + '</span>' + actionBtn(it.unread) +
        '</div><p class="talk-body">' + it.b + '</p></div></div>';
    }
    function actionBtn(unread) {
      return '<button class="btn btn-sm btn-secondary talk-action" type="button"><i class="fa-solid ' +
        (unread ? 'fa-circle-check' : 'fa-envelope-dot') + '"></i>' + (unread ? '標為已讀' : '標為未讀') + '</button>';
    }
    var btn = nav.querySelector('#noticeBtn'), panel = nav.querySelector('#noticePanel'), toast = nav.querySelector('#noticeToast');
    panel.innerHTML = '<div class="notice-head"><button class="btn btn-sm btn-secondary talk-action" type="button" data-all><i class="fa-solid fa-circle-check"></i>全部標為已讀</button></div>' +
      items.map(talk).join('');
    function refreshDot() { btn.classList.toggle('has-dot', !!panel.querySelector('.talk.is-unread')); }
    function setOpen(o) { panel.hidden = !o; btn.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); if (o) toast.hidden = true; }
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(panel.hidden); });
    document.addEventListener('click', function (e) { if (!panel.hidden && !e.target.closest('.nav-notice')) setOpen(false); });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('[data-all]')) {
        panel.querySelectorAll('.talk.is-unread').forEach(function (t) { t.classList.remove('is-unread'); t.querySelector('.talk-action').outerHTML = actionBtn(false); });
        refreshDot(); return;
      }
      var b = e.target.closest('.talk .talk-action'); if (!b) return;
      var t = b.closest('.talk'), unread = !t.classList.contains('is-unread');
      t.classList.toggle('is-unread', unread); b.outerHTML = actionBtn(unread); refreshDot();
    });
    /* 「收到通知時」的彈出通知：鈴鐺下方 8px，單張 Talk 卡片。網址加 ?notify=1 可預覽，6 秒後收起 */
    window.ukitNoticeToast = function () {
      toast.innerHTML = talk(items[0]); toast.hidden = !panel.hidden ? true : false;
      setTimeout(function () { toast.hidden = true; }, 6000);
    };
    toast.addEventListener('click', function (e) {
      var b = e.target.closest('.talk-action'); if (!b) return;
      var t = panel.querySelector('.talk'); if (t && t.classList.contains('is-unread')) { t.classList.remove('is-unread'); t.querySelector('.talk-action').outerHTML = actionBtn(false); refreshDot(); }
      toast.hidden = true;
    });
    if (/[?&]notify=1/.test(location.search)) setTimeout(window.ukitNoticeToast, 600);
  })();

  // ---- Footer ----
  var footer = document.createElement('footer');
  footer.className = 'footer';
  var timeHTML = '';
  if (footerCfg.showTime !== false) {
    var now = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Taipei' }).replace(/-/g, '/');
    /* 資料時點、時區放頁尾右側（不擠在頂部導覽列）；資料時點可由 footerCfg.dataTime 覆寫 */
    timeHTML = '<span>資料時點：' + (footerCfg.dataTime || now.slice(0, 16)) + '　時區：UTC+8　標準時間：' + now + '</span>';
  }
  footer.innerHTML = '<span>' + (footerCfg.left || '') + '</span>' + timeHTML;

  // ---- 組裝：把頁面既有的 .content 夾進標準 grid ----
  var content = document.querySelector('main.content') || document.createElement('main');
  if (!content.classList.contains('content')) content.className = 'content';
  content.hidden = false;

  var app = document.createElement('div');
  app.className = 'app';
  var main = document.createElement('div');
  main.className = 'main';
  main.appendChild(nav);
  main.appendChild(content);
  main.appendChild(footer);
  app.appendChild(sidebar);
  app.appendChild(main);
  document.body.insertBefore(app, document.body.firstChild);
})();
