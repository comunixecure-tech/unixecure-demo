# uniXecure 產品 Demo

階段性展示站，靜態檔，放 GitHub Pages。畫面資料皆為展示用假資料。

- `index.html` 產品入口頁
- `raven/` RAVEN 原型的 build 結果（來源：raven-prototype，2026-11-09 版本，3D 頁由前端持續調整）
- `kit/` uniXecure UI Kit 的 tokens.css 與 examples（含 VulnEye），複製自 unixecure-ui-kit
- HEIS 建置中

## 更新 RAVEN

在 raven-prototype 目錄執行，不會動到原專案檔案：

```bash
npx vite build --base=./ --outDir ~/Projects/unixecure-demo/raven --emptyOutDir
rm -rf ~/Projects/unixecure-demo/raven/comps ~/Projects/unixecure-demo/raven/icon-demo.html ~/Projects/unixecure-demo/raven/webgl-test.html
```

`comps/` 是設計稿疊圖用的 PNG，不公開，所以 build 完要移掉（設計稿疊圖功能在線上版不可用）。
