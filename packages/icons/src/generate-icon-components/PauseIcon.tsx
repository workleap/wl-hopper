/* eslint-disable max-len */ import { createIcon } from "../create-icon.tsx";import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const PauseIcon16 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={16} height={16} fill="none" viewBox="0 0 16 16" focusable="false" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M3.5 13.5v-11h1.8v11zM2 2a1 1 0 0 1 1-1h2.8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm8.7 11.5v-11h1.8v11zM9.2 2a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2.8a1 1 0 0 1-1-1z" /></svg>);const PauseIcon24 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={24} height={24} fill="none" viewBox="0 0 24 24" focusable="false" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M6.5 4.5h3v15h-3zM5 4.5A1.5 1.5 0 0 1 6.5 3h3A1.5 1.5 0 0 1 11 4.5v15A1.5 1.5 0 0 1 9.5 21h-3A1.5 1.5 0 0 1 5 19.5zm9.5 0h3v15h-3zm-1.5 0A1.5 1.5 0 0 1 14.5 3h3A1.5 1.5 0 0 1 19 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5z" /></svg>);const PauseIcon32 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={32} height={32} fill="none" viewBox="0 0 32 32" focusable="false" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M8 6h4v20H8zM6 6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm14 0h4v20h-4zm-2 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" /></svg>);export const PauseIcon = createIcon(PauseIcon16, PauseIcon24, PauseIcon32, "PauseIcon");