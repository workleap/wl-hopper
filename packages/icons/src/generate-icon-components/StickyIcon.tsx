/* eslint-disable max-len */ import { createIcon } from "../create-icon.tsx";import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const StickyIcon16 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={16} height={16} fill="none" viewBox="0 0 16 16" focusable="false" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M12.5 7.9V3.5h-9v9h4.35V9.15c0-.69.56-1.25 1.25-1.25zm-.307 1.5H9.35v2.843zM3 2h10a1 1 0 0 1 1 1v6.3a1 1 0 0 1-.293.707l-3.7 3.7A1 1 0 0 1 9.3 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1" /></svg>);const StickyIcon24 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={24} height={24} fill="none" viewBox="0 0 24 24" focusable="false" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M18.5 5.5h-13v13h7v-4.499a1.5 1.5 0 0 1 1.5-1.5h4.5zm-.337 8.501H14v4.163l4.163-4.163ZM5.5 4h13A1.5 1.5 0 0 1 20 5.5v8.164a1.5 1.5 0 0 1-.44 1.061l-4.835 4.836a1.5 1.5 0 0 1-1.06.439H5.5A1.5 1.5 0 0 1 4 18.5v-13A1.5 1.5 0 0 1 5.5 4" /></svg>);const StickyIcon32 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={32} height={32} fill="none" viewBox="0 0 32 32" focusable="false" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M23.996 8H8v15.996h8V18a2 2 0 0 1 2-2h5.996V8Zm2 8V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v15.996a2 2 0 0 0 2 2h10.026a2 2 0 0 0 1.414-.586l5.97-5.97a2 2 0 0 0 .586-1.414V18H26v-2zm-2 2H18v5.996h.026l5.97-5.97z" /></svg>);export const StickyIcon = createIcon(StickyIcon16, StickyIcon24, StickyIcon32, "StickyIcon");