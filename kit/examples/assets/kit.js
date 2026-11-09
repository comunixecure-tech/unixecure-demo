/* =============================================================
   uniXecure UI Kit — 共用互動
   四頁共用。全部走事件委派 / 逐元件初始化，缺哪個元件都不會壞。
   放在 shell.js 之後載入。
   慣例：
     開跳窗 / 抽屜  <button data-open="#myOverlay">
     關閉          任一 [data-close] 或點遮罩本身
   ============================================================= */
(function () {
  var root = document.documentElement;

  /* ---------- 深淺主題切換 ---------- */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#themeToggle')) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
    var i = document.querySelector('#themeToggle i, #themeToggle svg');
    if (i) i.setAttribute('class', dark ? 'fa-solid fa-moon' : 'fa-solid fa-sun');
  });

  /* ---------- Modal / Drawer ---------- */
  function openOverlay(ov) {
    ov.classList.add('open');
    var dr = ov.querySelector('.drawer');
    if (dr) requestAnimationFrame(function () { dr.classList.add('open'); });
  }
  function closeOverlay(ov) {
    var dr = ov.querySelector('.drawer');
    if (dr) { dr.classList.remove('open'); setTimeout(function () { ov.classList.remove('open'); }, 200); }
    else ov.classList.remove('open');
  }
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-open]');
    if (opener) {
      var ov = document.querySelector(opener.getAttribute('data-open'));
      if (ov) openOverlay(ov);
      return;
    }
    if (e.target.closest('[data-close]')) {
      var o = e.target.closest('.overlay');
      if (o) closeOverlay(o);
      return;
    }
    if (e.target.classList.contains('overlay')) closeOverlay(e.target);
  });

  /* ---------- Selector 下拉 ---------- */
  document.addEventListener('click', function (e) {
    var sel = e.target.closest('.selector');
    document.querySelectorAll('.selector.open').forEach(function (s) { if (s !== sel) s.classList.remove('open'); });
    if (!sel) return;
    var opt = e.target.closest('.dropdown-option');
    if (opt) {
      sel.querySelectorAll('.dropdown-option').forEach(function (o) { o.classList.remove('current'); });
      opt.classList.add('current');
      var span = sel.querySelector('span');
      if (span) span.innerHTML = opt.innerHTML.trim();   /* 用 innerHTML：選項內有 tag 時才不會被洗成純文字 */
      sel.classList.remove('open');
      return;
    }
    if (e.target.closest('.dropdown')) return;
    sel.classList.toggle('open');
  });

  /* ---------- 分頁 tab（頁面級 .page-tab / 卡片級 .card-tab / 純文字 .stat-toggle-item） ---------- */
  /* tab 帶 data-panel="id" 時，切換顯示同範圍的 .tab-panel（id 對 data-panel-id）。
     三種視覺不同（底線分頁 vs 純文字底線切換），但「點了切換 active + 對應面板」邏輯共用 */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.page-tab, .card-tab, .stat-toggle-item');
    if (!tab) return;
    var cls = tab.classList.contains('stat-toggle-item') ? '.stat-toggle-item'
      : tab.classList.contains('page-tab') ? '.page-tab' : '.card-tab';
    tab.parentElement.querySelectorAll(cls).forEach(function (x) { x.classList.remove('active'); });
    tab.classList.add('active');
    var name = tab.dataset.panel;
    if (!name) return;
    var scope = tab.closest('.sheet, .card, .chart-card') || document;
    /* 同頁有多組 tab／巢狀 tab 時：tab 所在容器帶 data-tab-group="x"，面板也帶同名 data-tab-group，只動同群組。
       沒寫 data-tab-group 的舊寫法照舊（scope 內全部面板一起切） */
    var grp = tab.closest('[data-tab-group]');
    var gid = grp ? grp.dataset.tabGroup : null;
    scope.querySelectorAll('.tab-panel').forEach(function (p) {
      if ((p.dataset.tabGroup || null) !== gid) return;   /* 別的群組不動 */
      /* 沒寫群組的 tab（例如頁面級 page-tab）不要動到 scope 裡「另一張卡片內部」的面板——
         卡片內的 stat-toggle／card-tab 面板自己有自己的切換，頁面分頁切換時不該被誤藏 */
      if (gid === null) {
        var inner = p.parentElement && p.parentElement.closest('.chart-card, .card');
        if (inner && inner !== scope && scope.contains(inner)) return;
      }
      p.hidden = p.dataset.panelId !== name;
    });
  });

  /* ---------- View toggle（二選一連體按鈕，對齊 RAVEN 16513-90213） ---------- */
  /* 點了的按鈕變 btn-primary（選中）、另一顆變 btn-secondary；對應 [data-view-panel] 面板 */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.view-toggle [data-view]');
    if (!btn) return;
    var group = btn.closest('.view-toggle');
    group.querySelectorAll('[data-view]').forEach(function (b) {
      var active = b === btn;
      b.classList.toggle('btn-primary', active);
      b.classList.toggle('btn-secondary', !active);
    });
    var v = btn.dataset.view;
    var scope = group.closest('.sheet, .card, .chart-card') || document;
    /* 同 tab：.view-toggle 帶 data-view-group="x"，面板也帶同名 data-view-group，同頁多組互不干擾 */
    var vgid = group.dataset.viewGroup || null;
    scope.querySelectorAll('[data-view-panel]').forEach(function (p) {
      if ((p.dataset.viewGroup || null) !== vgid) return;
      p.hidden = p.dataset.viewPanel !== v;
    });
  });

  /* ---------- View toggle 修飾類別①：deselectable（可取消選取） ---------- */
  /* 用在只有兩個互斥選項、沒有「全部」按鈕的篩選組：選一個排他（跟一般 .view-toggle 一樣），
     但選中的按鈕再點一次會取消選取，回到沒有按鈕選中＝全部。用 capture 階段搶在上面
     .view-toggle 的單選監聽之前：點的按鈕已經選中就直接取消、蓋掉，不讓單選監聽重新選中它；
     還沒選中則不攔截，照舊讓單選監聽選中它。 */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.view-toggle.deselectable [data-view]');
    if (!btn || !btn.classList.contains('btn-primary')) return;
    btn.closest('.view-toggle').querySelectorAll('[data-view]').forEach(function (b) {
      b.classList.remove('btn-primary'); b.classList.add('btn-secondary');
    });
    e.stopPropagation();
  }, true);

  /* ---------- View toggle 修飾類別②：multi-select（真正多選） ---------- */
  /* 用在三個以上選項、彼此可以組合看的篩選組（例如同時選「高」跟「緊急」）：每顆按鈕只切換
     自己的選中狀態，不影響旁邊的按鈕，全部不選＝全部。完全接管這組按鈕的點擊（capture 階段
     stopPropagation），不讓上面 .view-toggle 的單選監聽跑——那個監聽選一顆會把其他都設回
     未選中，跟多選衝突。 */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.view-toggle.multi-select [data-view]');
    if (!btn) return;
    var active = btn.classList.contains('btn-primary');
    btn.classList.toggle('btn-primary', !active);
    btn.classList.toggle('btn-secondary', active);
    e.stopPropagation();
  }, true);

  /* ---------- Filter chip（基本篩選） ---------- */
  document.querySelectorAll('.filter-chips').forEach(function (box) {
    /* 關鍵字型：chip-menu 內是 input[type=text]，Enter / blur 後在尾端 append 藍色 applied chip */
    function applyKeyword(input) {
      var v = input.value.trim();
      var chip = input.closest('.chip');
      if (v) {
        var field = chip.dataset.field || '關鍵字';
        var applied = document.createElement('span');
        applied.className = 'chip applied';
        applied.innerHTML = field + '「' + v + '」 <i class="fa-solid fa-xmark"></i>';
        box.appendChild(applied);
        input.value = '';
      }
      chip.classList.remove('open');
    }
    box.addEventListener('keydown', function (e) {
      var input = e.target.closest('.chip-menu input[type="text"]');
      if (input && e.key === 'Enter') { e.preventDefault(); applyKeyword(input); }
    });
    box.addEventListener('focusout', function (e) {
      var input = e.target.closest('.chip-menu input[type="text"]');
      if (input && input.value.trim()) applyKeyword(input);
    });
    /* 多選型：chip-menu 裡是一排 checkbox，勾選變動時彙總成「已選項、已選項」，都沒勾就只顯示名稱（沒勾＝不篩選，選單裡不放「全部」） */
    box.addEventListener('change', function (e) {
      var cb = e.target.closest('.chip-menu input[type="checkbox"]');
      if (!cb) return;
      var chip = cb.closest('.chip');
      var boxes = [].slice.call(chip.querySelectorAll('.chip-menu input[type="checkbox"]'));
      var checked = boxes.filter(function (b) { return b.checked; });
      chip.childNodes[0].textContent = checked.length
        ? chip.dataset.field + '：' + checked.map(function (b) { return b.closest('label').textContent.trim(); }).join('、') + ' '
        : chip.dataset.field + ' ';
    });

    box.addEventListener('click', function (e) {
      var opt = e.target.closest('.chip-menu div');
      if (opt) {
        var chip = opt.closest('.chip');
        var cur = chip.querySelector('.chip-menu .current');
        if (cur) cur.classList.remove('current');
        opt.classList.add('current');
        chip.childNodes[0].textContent = chip.dataset.field + '：' + opt.textContent + ' ';
        chip.classList.remove('open');
        return;
      }
      if (e.target.closest('.chip-menu')) return;   /* 點選單內部（含 input）不收合 */
      var c = e.target.closest('.chip');
      if (!c) return;
      if (c.classList.contains('applied')) { c.remove(); return; }
      var wasOpen = c.classList.contains('open');
      box.querySelectorAll('.chip.open').forEach(function (x) { x.classList.remove('open'); });
      if (!wasOpen) {
        c.classList.add('open');
        var kw = c.querySelector('.chip-menu input[type="text"]');
        if (kw) kw.focus();
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.filter-chips')) {
      document.querySelectorAll('.filter-chips .chip.open').forEach(function (c) { c.classList.remove('open'); });
    }
  });

  /* ---------- 展開 / 收合一個區塊（編輯頁「執行結果預估」等） ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-reveal]');
    if (!t) return;
    var target = document.querySelector(t.getAttribute('data-reveal'));
    if (target) target.hidden = !target.hidden;
  });

  /* ---------- multi-select tag 欄位：點 tag 上的叉叉移除 ---------- */
  document.addEventListener('click', function (e) {
    var tag = e.target.closest('.tag-field .tag');
    if (!tag) return;
    if (e.target.tagName === 'I' || e.target.tagName === 'svg' || e.target.closest('svg')) tag.remove();
  });

  /* ---------- 表格（每個 .table 各自初始化） ---------- */
  function closeAllColMenus() {
    document.querySelectorAll('.table th.menu-open, .col-config.menu-open').forEach(function (el) { el.classList.remove('menu-open'); });
  }

  document.querySelectorAll('.table').forEach(function (tbl) {
    var thead = tbl.querySelector('thead');
    var selectAll = tbl.querySelector('thead .cb-cell input');

    if (thead) {
      /* 有排序 / 篩選 icon 的表頭：文字包進 .th-label、整組包進 .th-in，
         讓標題在欄位太窄時截斷成 …，icon 永遠留在 padding 內不擠出去 */
      thead.querySelectorAll('th').forEach(function (th) {
        if (th.classList.contains('cb-cell') || th.querySelector('.th-in')) return;
        if (!th.querySelector('.fa-sort, .fa-filter, svg')) return;
        var wrap = document.createElement('span');
        wrap.className = 'th-in';
        var label = document.createElement('span');
        label.className = 'th-label';
        [].slice.call(th.childNodes).forEach(function (n) {
          if (n.nodeType === 1 && n.classList.contains('col-menu')) return;
          if (n.nodeType === 3) label.appendChild(n);
          else wrap.appendChild(n);
        });
        if (label.textContent.trim()) wrap.insertBefore(label, wrap.firstChild);
        th.insertBefore(wrap, th.firstChild);
      });

      thead.addEventListener('click', function (e) {
        var sortIcon = e.target.closest('.fa-sort');
        if (sortIcon) {
          var th = sortIcon.closest('th');
          var was = th.classList.contains('sorted');
          tbl.querySelectorAll('th').forEach(function (t) { t.classList.remove('sorted'); });
          if (!was) th.classList.add('sorted');
          return;
        }
        var filterIcon = e.target.closest('.fa-filter');
        if (filterIcon) {
          var th2 = filterIcon.closest('th');
          if (!th2.querySelector('.col-menu')) return;
          var wasOpen = th2.classList.contains('menu-open');
          closeAllColMenus();
          if (!wasOpen) {
            th2.classList.add('menu-open');
            var kw = th2.querySelector('.col-menu .kw');
            if (kw) kw.focus();
          }
          e.stopPropagation();
          return;
        }
        var cb = e.target.closest('.col-menu label input');
        if (cb) {
          var th3 = cb.closest('th');
          var boxes = [].slice.call(th3.querySelectorAll('.col-menu label input'));
          th3.classList.toggle('filtered', boxes.some(function (b) { return !b.checked; }));
          e.stopPropagation();
        }
      });
      thead.addEventListener('input', function (e) {
        var kw = e.target.closest('.col-menu .kw');
        if (kw) kw.closest('th').classList.toggle('filtered', kw.value.trim() !== '');
      });
    }

    /* 展開 / 收合子列 */
    var tbody = tbl.querySelector('tbody');
    if (tbody) {
      tbody.addEventListener('click', function (e) {
        var exp = e.target.closest('.expander');
        if (!exp) {
          /* 整個第一欄儲存格、或帶 .row-toggle 的元素（例如「弱點數」連結）也能展開；點到 a/button/input/label 不觸發 */
          var trg = e.target.closest('tr[data-group] > td:first-child, tr[data-group] .row-toggle');
          if (!trg || e.target.closest('a, button, input, label')) return;
          exp = trg.closest('tr').querySelector('.expander');
        }
        if (!exp || exp.classList.contains('leaf')) return;
        var g = exp.dataset.toggle;
        var open = exp.classList.toggle('open');
        tbl.querySelectorAll('tr[data-child="' + g + '"]').forEach(function (r) { r.classList.toggle('collapsed', !open); });
      });
    }

    /* 列選取（母列 checkbox 只反映子列） */
    function setSel(cb) { cb.closest('tr').classList.toggle('selected', cb.checked && !cb.indeterminate); }
    function syncParent(g) {
      var p = tbl.querySelector('tr[data-group="' + g + '"] .row-cb');
      if (!p) return;
      var kids = [].slice.call(tbl.querySelectorAll('tr[data-child="' + g + '"]:not(.subheader) .row-cb'));
      var n = kids.filter(function (c) { return c.checked; }).length;
      p.checked = n === kids.length && kids.length > 0;
      p.indeterminate = n > 0 && n !== kids.length;
      setSel(p);
    }
    function syncHeader() {
      if (!selectAll) return;
      var leaves = [].slice.call(tbl.querySelectorAll('tbody .row-cb')).filter(function (c) { return !c.closest('tr').dataset.group; });
      var n = leaves.filter(function (c) { return c.checked; }).length;
      selectAll.checked = n === leaves.length && leaves.length > 0;
      selectAll.indeterminate = n > 0 && n < leaves.length;
    }

    tbl.querySelectorAll('tbody .row-cb').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var tr = cb.closest('tr');
        var g = tr.dataset.group;
        if (g) {
          var target = cb.checked;
          tbl.querySelectorAll('tr[data-child="' + g + '"]:not(.subheader) .row-cb').forEach(function (c) { c.checked = target; setSel(c); });
          syncParent(g);
        } else {
          setSel(cb);
          var sub = cb.closest('.subrow');
          var childOf = tr.dataset.child || (sub && sub.dataset.child);
          if (childOf) syncParent(childOf);
        }
        syncHeader();
      });
    });

    if (selectAll) {
      selectAll.addEventListener('change', function () {
        var target = selectAll.checked;
        tbl.querySelectorAll('tbody .row-cb').forEach(function (c) {
          if (c.closest('tr').dataset.group) return;
          c.checked = target; setSel(c);
        });
        tbl.querySelectorAll('tr[data-group]').forEach(function (r) { syncParent(r.dataset.group); });
        selectAll.indeterminate = false;
      });
    }

    tbl.querySelectorAll('tr[data-group]').forEach(function (r) { syncParent(r.dataset.group); });
  });

  /* ---------- 「編輯顯示欄位」按鈕（toolbar，控制同一個 sheet 內的表格） ---------- */
  document.querySelectorAll('.col-config').forEach(function (colConfig) {
    var btn = colConfig.querySelector('.col-config-btn');
    var tbl = (colConfig.closest('.sheet') || document).querySelector('.table');
    if (btn) {
      btn.addEventListener('click', function (e) {
        var wasOpen = colConfig.classList.contains('menu-open');
        closeAllColMenus();
        if (!wasOpen) colConfig.classList.add('menu-open');
        e.stopPropagation();
      });
    }
    var menu = colConfig.querySelector('.col-menu');
    if (menu && tbl) {
      menu.addEventListener('click', function (e) {
        var cb = e.target.closest('label input[data-col]');
        if (!cb) return;
        var n = cb.dataset.col;
        var hide = !cb.checked;
        var th = tbl.querySelector('th[data-col="' + n + '"]');
        if (th) th.classList.toggle('hidden-col', hide);
        tbl.querySelectorAll('tbody tr').forEach(function (tr) {
          var cell = tr.cells[+n];
          if (cell) cell.classList.toggle('hidden-col', hide);
        });
        e.stopPropagation();
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.col-config, .table th')) closeAllColMenus();
  });

  /* ---------- DatePicker（月曆格由 data-* 生成，純呈現） ---------- */
  var DP_DOW = ['日', '一', '二', '三', '四', '五', '六'];
  var DP_MON = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  function dpISO(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function dpBaseMonth(str) {
    var p = (str || '').split('-');
    var d = p.length === 2 ? new Date(+p[0], +p[1] - 1, 1) : new Date();
    d.setDate(1);
    return d;
  }
  function dpBuildCal(base, side) {
    var y = base.getFullYear(), m = base.getMonth();
    var prevGhost = side === 'right' ? ' ghost' : '';
    var nextGhost = side === 'left' ? ' ghost' : '';
    var cal = document.createElement('div');
    cal.className = 'dp-cal';
    var head = document.createElement('div');
    head.className = 'dp-head';
    head.innerHTML =
      '<button class="dp-nav' + prevGhost + '" data-dp-nav="-1"><i class="fa-solid fa-angle-left"></i></button>' +
      '<span class="dp-title">' + y + ' 年 ' + DP_MON[m] + '</span>' +
      '<button class="dp-nav' + nextGhost + '" data-dp-nav="1"><i class="fa-solid fa-angle-right"></i></button>';
    cal.appendChild(head);
    var grid = document.createElement('div');
    grid.className = 'dp-grid';
    DP_DOW.forEach(function (d) {
      var c = document.createElement('div');
      c.className = 'dp-dow';
      c.textContent = d;
      grid.appendChild(c);
    });
    var lead = new Date(y, m, 1).getDay();
    var days = new Date(y, m + 1, 0).getDate();
    var today = dpISO(new Date());
    for (var i = 0; i < lead; i++) {
      var e = document.createElement('div');
      e.className = 'dp-day empty';
      grid.appendChild(e);
    }
    for (var dd = 1; dd <= days; dd++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dp-day';
      b.dataset.date = dpISO(new Date(y, m, dd));
      b.textContent = dd;
      if (b.dataset.date === today) b.classList.add('today');
      grid.appendChild(b);
    }
    cal.appendChild(grid);
    return cal;
  }
  function dpApplySel(dp) {
    var s = dp.dataset.start, en = dp.dataset.end, sel = dp.dataset.selected;
    dp.querySelectorAll('.dp-day[data-date]').forEach(function (d) {
      var v = d.dataset.date;
      d.classList.remove('sel', 'in-range', 'range-start', 'range-end');
      if (sel && v === sel) d.classList.add('sel');
      if (s && v === s) d.classList.add('range-start');
      if (en && v === en) d.classList.add('range-end');
      if (s && en && v > s && v < en) d.classList.add('in-range');
    });
  }
  function dpSyncField(dp) {
    if (!dp.id) return;
    var tf = document.querySelector('.date-field[data-toggle="#' + dp.id + '"]');
    if (!tf) return;
    var input = tf.querySelector('input');
    if (!input) return;
    if ('range' in dp.dataset) {
      input.value = '開始：' + (dp.dataset.start || '請選擇') + ' ｜ 結束：' + (dp.dataset.end || '請選擇');
    } else if (dp.dataset.selected) {
      input.value = dp.dataset.selected;
      dp.hidden = true;
    }
  }
  function dpRender(dp) {
    var months = +dp.dataset.months || 1;
    if (!dp._base) dp._base = dpBaseMonth(dp.dataset.month);
    dp.innerHTML = '';
    var cals = document.createElement('div');
    cals.className = 'dp-cals';
    for (var i = 0; i < months; i++) {
      var b = new Date(dp._base.getFullYear(), dp._base.getMonth() + i, 1);
      var side = months > 1 ? (i === 0 ? 'left' : (i === months - 1 ? 'right' : 'mid')) : null;
      cals.appendChild(dpBuildCal(b, side));
    }
    dp.appendChild(cals);
    dpApplySel(dp);
    if ('time' in dp.dataset) {
      var isRange = 'range' in dp.dataset;
      var grp =
        '<div class="dp-time-group">' +
        '<span class="dp-time-input">時 <i class="fa-solid fa-angle-down"></i></span>' +
        '<span class="dp-time-input">分 <i class="fa-solid fa-angle-down"></i></span></div>';
      var t = document.createElement('div');
      t.className = 'dp-time';
      t.innerHTML =
        '<hr>' +
        (isRange ? '<div class="dp-time-labels"><span>開始時間</span><span>結束時間</span></div>' : '') +
        '<div class="dp-time-row">' + grp + (isRange ? grp : '') + '</div>';
      dp.appendChild(t);
    }
  }

  document.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-dp-nav]');
    if (nav) {
      var dpN = nav.closest('.datepicker');
      dpN._base.setMonth(dpN._base.getMonth() + (+nav.dataset.dpNav));
      dpRender(dpN);
      return;
    }
    var day = e.target.closest('.dp-day[data-date]');
    if (day) {
      var dp = day.closest('.datepicker');
      var v = day.dataset.date;
      if ('range' in dp.dataset) {
        if (!dp.dataset.start || dp.dataset.end) { dp.dataset.start = v; delete dp.dataset.end; }
        else if (v < dp.dataset.start) { dp.dataset.end = dp.dataset.start; dp.dataset.start = v; }
        else dp.dataset.end = v;
      } else {
        dp.dataset.selected = v;
      }
      dpApplySel(dp);
      dpSyncField(dp);
      return;
    }
    var tf = e.target.closest('.date-field[data-toggle]');
    if (tf) {
      var pop = document.querySelector(tf.getAttribute('data-toggle'));
      if (pop) {
        pop.classList.add('pop');
        if (pop.previousElementSibling !== tf) tf.after(pop);
        pop.hidden = !pop.hidden;
        if (!pop.hidden) {   /* 固定定位：依輸入框算位置，下方放不下就往上開，左右不超出視窗 */
          var r = tf.getBoundingClientRect();
          pop.style.visibility = 'hidden';
          pop.style.top = (r.bottom + 4) + 'px';
          pop.style.left = r.left + 'px';
          var pw = pop.offsetWidth, ph = pop.offsetHeight;
          var top = r.bottom + 4;
          if (top + ph > window.innerHeight && r.top - 4 - ph > 0) top = r.top - 4 - ph;
          pop.style.top = top + 'px';
          pop.style.left = Math.max(8, Math.min(r.left, window.innerWidth - pw - 8)) + 'px';
          pop.style.visibility = '';
        }
      }
      return;
    }
    if (!e.target.closest('.datepicker')) {
      document.querySelectorAll('.datepicker.pop:not([hidden])').forEach(function (p) { p.hidden = true; });
    }
  });

  /* 固定定位的日期選擇器不會跟著捲動，捲動時直接收起 */
  document.addEventListener('scroll', function (e) {
    if (e.target.closest && e.target.closest('.datepicker')) return;
    document.querySelectorAll('.datepicker.pop:not([hidden])').forEach(function (p) { p.hidden = true; });
  }, true);

  document.querySelectorAll('.datepicker').forEach(dpRender);

  /* ---------- Token 插入（.token-list 裡的 .token 點一下 → 插進目前輸入框游標處） ---------- */
  var lastField = null;
  document.addEventListener('focusin', function (e) {
    var f = e.target.closest('textarea, input[type="text"], input[type="search"], input:not([type])');
    if (f) lastField = f;
  });
  /* 按住 token 時不要讓輸入框失焦，游標位置才留得住 */
  document.addEventListener('mousedown', function (e) {
    if (e.target.closest('.token-list .token')) e.preventDefault();
  });
  document.addEventListener('click', function (e) {
    var token = e.target.closest('.token-list .token');
    if (!token) return;
    var list = token.closest('.token-list');
    var target = (list.dataset.target && document.querySelector(list.dataset.target)) || lastField;
    if (!target) return;
    var val = token.dataset.value != null ? token.dataset.value : token.textContent.trim();
    var s = target.selectionStart, en = target.selectionEnd;
    if (typeof s === 'number') {
      target.value = target.value.slice(0, s) + val + target.value.slice(en);
      target.focus();
      var pos = s + val.length;
      target.setSelectionRange(pos, pos);
    } else {
      target.value += val;
      target.focus();
    }
    target.dispatchEvent(new Event('input', { bubbles: true }));
  });

  /* ---------- 表格左右凍結欄位陰影（.table.scroll-x，對齊元件庫 1676-11207） ---------- */
  /* 捲到最左 / 最右時對應那側的 .sticky-l / .sticky-r 不顯示陰影，其餘時候顯示 */
  document.querySelectorAll('.table.scroll-x').forEach(function (wrap) {
    function update() {
      var atL = wrap.scrollLeft <= 0;
      var atR = Math.ceil(wrap.scrollLeft + wrap.clientWidth) >= wrap.scrollWidth;
      wrap.classList.toggle('at-l', atL);
      wrap.classList.toggle('at-r', atR);
      wrap.style.setProperty('--table-view-w', wrap.clientWidth + 'px');   /* 展開列子內容的可視寬度 */
    }
    wrap.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    update();
  });

  /* ---------- def-list 2 欄中間分隔線（.def-list.cols-2） ---------- */
  /* 不能用逐列 border-left（row-gap 把線切斷、看起來像虛線）。
     改成量測第二欄 dt 的實際 x 座標，畫一條跨滿整個清單高度的絕對定位線。
     窄畫面塌回 1 欄時（dt[0]/dt[1] 不同列了）就把線藏起來 */
  document.querySelectorAll('.def-list.cols-2').forEach(function (dl) {
    var dts = dl.querySelectorAll(':scope > dt');
    if (dts.length < 2) return;
    var line = document.createElement('div');
    line.className = 'cols-2-divider';
    dl.appendChild(line);
    function update() {
      var dlRect = dl.getBoundingClientRect();
      if (!dlRect.width) return;
      var dt0Rect = dts[0].getBoundingClientRect();
      var dtRect = dts[1].getBoundingClientRect();
      line.hidden = Math.abs(dtRect.top - dt0Rect.top) > 4;   // 窄螢幕收成單欄時不畫
      line.style.left = Math.round(dtRect.left - dlRect.left) + 'px';
    }
    new ResizeObserver(update).observe(dl);
    update();
  });

  /* ---------- .toolbar-sep 自動隱藏 ---------- */
  /* 工具列換行時，細分隔線可能掉在行尾或行首。前後兩個「實際有渲染的」兄弟跟它不在同一行就隱藏
     （用 visibility，版面不變，避免隱藏後又影響換行判斷而來回閃）。同一行 ＝ 垂直中心點差不到 8px */
  (function () {
    var seps = [].slice.call(document.querySelectorAll('.toolbar-sep'));
    if (!seps.length) return;
    function rendered(el, dir) {
      while (el) {
        var d = getComputedStyle(el).display;
        if (d === 'none') { el = dir === 'next' ? el.nextElementSibling : el.previousElementSibling; continue; }
        if (d === 'contents') { el = dir === 'next' ? el.firstElementChild : el.lastElementChild; continue; }
        return el;
      }
      return null;
    }
    function midY(el) { var r = el.getBoundingClientRect(); return r.top + r.height / 2; }
    function update() {
      seps.forEach(function (sep) {
        var p = rendered(sep.previousElementSibling, 'prev'), n = rendered(sep.nextElementSibling, 'next');
        var ok = !!p && !!n && Math.abs(midY(p) - midY(sep)) < 8 && Math.abs(midY(n) - midY(sep)) < 8;
        sep.style.visibility = ok ? '' : 'hidden';
      });
    }
    if (window.ResizeObserver) seps.forEach(function (s) { new ResizeObserver(update).observe(s.parentElement); });
    window.addEventListener('resize', update);
    document.addEventListener('click', function () { setTimeout(update, 0); });   // 切換面板後內容會換
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);   // 字體載入後寬度會變，換行位置跟著變
    update();
  })();

  /* ---------- Bulk bar（勾選列後的批次操作，design-system-gaps B3） ---------- */
  /* 用法：window.kbBulkSetup('.table 的 selector', '.bulk-bar 的 id')，一個可勾選表格呼叫一次。
     算「leaves」（排除母列，只算真正的資料列）的勾選數，更新 .bulk-count 文字，
     動作按鈕（[data-bulk-action]、.bulk-mark-toggle）跟著鎖/解鎖。母子連動不用另外寫：
     勾母列（data-group）時 kit.js 既有的 .cb-cell/.row-cb 同步機制自己會往下找到巢狀
     的 .row-cb 一起打勾，即使子列是包在 .subrow/.subtable 裡的獨立 <table> 也找得到，
     只要 .row-cb 都在同一個 .table 容器的 DOM 子樹裡。
     每個 .bulk-mark-toggle 的開關邏輯都綁在自己所屬的 .bulk-bar 上（用 bar 的 click 監聽，
     不是全域監聽）——一頁若有多組 .bulk-bar/.bulk-mark（VulnEye 依主機／依弱點各一組），
     這樣各組互不干擾；「點選單外的地方收起」才需要一個全域監聽，見下面。
     [data-bulk-action] 的實際動作（誤報／忽略／列入…）由呼叫端自己接手處理，這裡只負責
     選取計數/鎖解鎖跟選單開關，不內建任何業務邏輯。 */
  window.kbBulkSetup = function (tableSel, barId) {
    var tbl = document.querySelector(tableSel);
    var bar = document.getElementById(barId);
    if (!tbl || !bar) return;
    var countEl = bar.querySelector('.bulk-count');
    var actionBtns = [].slice.call(bar.querySelectorAll('[data-bulk-action], .bulk-mark-toggle'));
    var markMenu = bar.querySelector('.bulk-mark');
    function update() {
      var leaves = [].slice.call(tbl.querySelectorAll('.row-cb')).filter(function (c) { return !c.closest('tr').dataset.group; });
      var n = leaves.filter(function (c) { return c.checked; }).length;
      if (countEl) countEl.textContent = n;
      actionBtns.forEach(function (b) { b.disabled = n === 0; });
      if (n === 0 && markMenu) markMenu.classList.remove('open');
    }
    tbl.addEventListener('change', function (e) {
      if (e.target.matches('.row-cb, thead .cb-cell input')) update();
    });
    bar.addEventListener('click', function (e) {
      /* 「標記 ▾」觸發鈕：開關下拉，不算一個動作（不會清空選取） */
      var toggle = e.target.closest('.bulk-mark-toggle');
      if (toggle) {
        if (toggle.disabled) return;
        var wasOpen = markMenu.classList.contains('open');
        document.querySelectorAll('.bulk-mark.open').forEach(function (m) { m.classList.remove('open'); });
        if (!wasOpen) markMenu.classList.add('open');
        return;
      }
      if (!e.target.closest('[data-bulk-action]')) return;
      /* 內建的預設行為：清空選取、按鈕跟著鎖回 disabled。呼叫端如果要做真的動作
         （寫回誤報/忽略/列入狀態等），在自己的 [data-bulk-action] 點擊處理裡接手，
         這條全域收尾（清空選取）仍會照跑 */
      tbl.querySelectorAll('.row-cb').forEach(function (c) {
        c.checked = false; c.indeterminate = false; c.closest('tr').classList.remove('selected');
      });
      update();
    });
    update();
  };
  /* 點「標記」下拉以外的地方要收起選單（跟 .selector 各自獨立一套，不共用監聽） */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.bulk-mark')) return;
    document.querySelectorAll('.bulk-mark.open').forEach(function (m) { m.classList.remove('open'); });
  });
})();
