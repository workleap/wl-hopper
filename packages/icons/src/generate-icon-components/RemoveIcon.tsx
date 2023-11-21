/* eslint-disable max-len */ import { createIcon } from "../create-icon.tsx";import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const RemoveIcon16 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={16} height={16} fill="none" viewBox="0 0 16 16" focusable="false" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m-2.593-4.407a.75.75 0 0 1 0-1.06L6.94 8 5.407 6.468a.75.75 0 0 1 1.06-1.06L8 6.938l1.532-1.532a.75.75 0 1 1 1.06 1.061L9.062 8l1.532 1.532a.75.75 0 1 1-1.06 1.06L8 9.062l-1.532 1.532a.75.75 0 0 1-1.06 0Z" /></svg>);const RemoveIcon24 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={24} height={24} fill="none" viewBox="0 0 24 24" focusable="false" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M12 19.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15m0 1.5a9 9 0 1 0 0-18 9 9 0 0 0 0 18m-3.536-5.464a.75.75 0 0 1 0-1.061L10.94 12 8.464 9.525a.75.75 0 0 1 1.061-1.06L12 10.938l2.475-2.474a.75.75 0 1 1 1.06 1.06L13.062 12l2.475 2.475a.75.75 0 0 1-1.061 1.06L12 13.062l-2.475 2.475a.75.75 0 0 1-1.06 0Z" /></svg>);const RemoveIcon32 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={32} height={32} fill="none" viewBox="0 0 32 32" focusable="false" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M16 26c5.523 0 10-4.477 10-10S21.523 6 16 6 6 10.477 6 16s4.477 10 10 10m0 2c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12m-4.95-7.05a1 1 0 0 1 0-1.415L14.586 16l-3.536-3.536a1 1 0 1 1 1.414-1.414L16 14.586l3.536-3.536a1 1 0 1 1 1.414 1.414L17.414 16l3.536 3.535a1 1 0 0 1-1.414 1.415L16 17.414l-3.536 3.536a1 1 0 0 1-1.414 0Z" /></svg>);export const RemoveIcon = createIcon(RemoveIcon16, RemoveIcon24, RemoveIcon32, "RemoveIcon");