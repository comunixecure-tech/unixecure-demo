/* =============================================================
   VulnEye 掃描系統 — 共用外殼（側欄 + Nav + Footer）

   做法說明（CLAUDE.md 已認可「自帶 shell.js」與「window.uiShell」兩種擇一）：
   - VulnEye 當獨立產品，另開這支給 examples/scan/ 專用，完全不動 assets/。
     邏輯跟 assets/shell.js 幾乎一樣，差在多產品選單 + 多頁高亮（keys 陣列）。
   - 側欄 / footer 用 kit.css 的 .theme-base（淺色，深色模式固定不變，走 --base-sidebar-*）。
   - 麵包屑不顯示「未來銀行檢測專案」「我的專案」這兩層（Aimi 說太多層），
     只從「掃描作業」「知識庫」這種模組層開始。

   用法：<body data-page="scan-jobs"> 內放一個 <main class="content">…</main>，
        本檔放在 assets/kit.js 之前載入。
        頁面可用 <body data-crumb-last="…"> 覆寫麵包屑最後一層。
   ============================================================= */
(function () {
  document.body.classList.add('theme-base');
  var page = document.body.dataset.page || '';

  /* ---- 選單 ---- */
  var MENU = [
    { icon: 'fa-list-check', label: '我的待辦' },
    { icon: 'fa-folder', label: '我的專案' },
    { icon: 'fa-chart-simple', label: '專案儀表板' },
    { icon: 'fa-crosshairs', label: '掃描作業', keys: ['scan-jobs', 'scan-detail'], href: 'scan-jobs.html' },
    { icon: 'fa-book', label: '知識庫', keys: ['kb', 'kb-editor'], href: 'kb-list.html' },
    { icon: 'fa-chart-column', label: '度量分析' },
    { icon: 'fa-server', label: '資產列表' },
    { icon: 'fa-palette', label: '封面格式' },
    { icon: 'fa-file-lines', label: '報告樣板' }
  ];

  /* ---- 各頁麵包屑（不顯示「未來銀行檢測專案」「我的專案」前兩層，太多層） ---- */
  var PAGES = {
    'scan-jobs':   ['掃描作業'],
    'scan-detail': ['掃描作業', '主機弱掃 第 1 次'],
    'kb':          ['知識庫'],
    'kb-editor':   ['知識庫', '(Possible) Cross site scripting']
  };
  var crumbs = (PAGES[page] || ['VulnEye']).slice();
  if (document.body.dataset.crumbLast) crumbs[crumbs.length - 1] = document.body.dataset.crumbLast;

  /* 麵包屑非最後一層若有對應頁面就做成連結 */
  var CRUMB_HREF = { '掃描作業': 'scan-jobs.html', '知識庫': 'kb-list.html' };

  /* ---- 側欄 ---- */
  function itemHTML(m) {
    var active = (m.keys || []).indexOf(page) > -1;
    var cls = 'menu-item' + (active ? ' current' : '');
    var inner = '<i class="fa-solid ' + m.icon + '"></i><span class="label">' + m.label + '</span>';
    return m.href
      ? '<a class="' + cls + '" href="' + m.href + '">' + inner + '</a>'
      : '<button class="' + cls + '">' + inner + '</button>';
  }

  var sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML =
    '<div class="menu-base">' +
      '<span class="logo" style="color:var(--primary-700)"><i class="fa-solid fa-layer-group"></i></span>' +
      '<span class="brand">VulnEye</span>' +
      '<button class="collapse"><i class="fa-solid fa-bars"></i></button>' +
    '</div>' +
    '<nav class="menu-list">' + MENU.map(itemHTML).join('') + '</nav>';

  /* ---- Nav ---- */
  var crumbHTML = crumbs.map(function (c, i) {
    var last = i === crumbs.length - 1;
    var sep = i ? '<span class="sep">/</span>' : '';
    var href = !last && CRUMB_HREF[c];
    var node = href
      ? '<a class="crumb" href="' + href + '">' + c + '</a>'
      : '<span class="crumb' + (last ? ' last' : '') + '">' + c + '</span>';
    return sep + node;
  }).join('');

  var nav = document.createElement('header');
  nav.className = 'nav';
  nav.innerHTML =
    '<div class="breadcrumb">' + crumbHTML + '</div>' +
    '<div class="nav-right">' +
      '<button class="nav-btn">testor@unixecure.com.tw｜檢測人員</button>' +
      '<button class="nav-btn has-dot"><i class="fa-solid fa-bell"></i></button>' +
      '<button class="nav-btn" id="themeToggle"><i class="fa-solid fa-moon"></i></button>' +
      '<button class="nav-btn"><i class="fa-solid fa-globe"></i></button>' +
    '</div>';

  /* ---- Footer ---- */
  var footer = document.createElement('footer');
  footer.className = 'footer';
  var now = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Taipei' }).replace(/-/g, '/');
  footer.innerHTML =
    '<span>VulnEye ver. 2.0　智慧資安科技股份有限公司 © 2026</span>' +
    /* 資料時點、時區放頁尾右側（kit 第三批規範），資料時點示範用「現在」取到分鐘 */
    '<span>資料時點：' + now.slice(0, 16) + '　時區：UTC+8　標準時間：' + now + '</span>';

  /* ---- 組裝 ---- */
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
