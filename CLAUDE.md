# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Type-check + Vite production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

No test suite is configured.

## Architecture

React + Vite + TypeScript single-page app. The data flow is unidirectional:

**State → Calculation → DXF generation → UI**

### State

`src/context/AppContext.tsx` is the single source of truth. It holds four numeric dimensions — `rectLength`, `rectWidth`, `formatLength`, `formatWidth` — and exposes setters. All components read from `useAppContext()`.

### Calculation layer

`src/utils/calculateLayout.ts` is pure math (no side effects). It computes two orientations:

- **Lengthwise**: rectangle placed with its length along the format's length axis
- **Crosswise**: rectangle placed rotated 90°

Each orientation returns `ISingleLayout` (`cols`, `rows`, `total`, `adjustedTotal`, `remainder`). `adjustedTotal` adds rectangles that fit in the leftover strip if `remainder >= rectWidth`.

`src/hooks/useCalculatedLayout.ts` wraps the util in a `useEffect`/`useState` pair to make it reactive to context changes.

### DXF layer

`src/utils/drawDxf.ts` translates layout numbers into DXF line commands via the `dxf-writer` library. Two exported functions — `drawLengthwiseLayout` / `drawCrosswiseLayout` — handle the geometry including the optional extra-rectangle strip in the remainder area.

`src/hooks/useDxfContent.ts` composes `useCalculatedLayout` + `drawDxf`. It exposes:
- `getDxfContent(type?)` — returns DXF string; if `type` is omitted, picks the higher `adjustedTotal` orientation
- `getDxfBlob(type?)` — wraps the string in a `Blob`

### Components

- `InputForm` — controlled inputs that call the context setters
- `Results` — displays cols/rows/adjustedTotal/remainder for both orientations and the best-option verdict
- `DownloadDxfButton` — calls `getDxfContent()` (best layout) and triggers a file download via `src/utils/downloadBlob.ts`
- `PreviewDxfButtons` — renders the DXF inline using the `dxf-viewer` library; manages a `DxfViewer` instance in a ref, destroying and recreating it on each preview switch

### Analytics

`react-ga4` is wired into `DownloadDxfButton` and `PreviewDxfButtons`. GA4 initialization (`ReactGA.initialize`) is currently commented out in `src/main.tsx` and requires a `VITE_GTM_ID` env var to activate.

### Commented-out code

`StateChanger` component and the `main.tsx` GA4 init are intentionally disabled — do not remove them without understanding the intent.
