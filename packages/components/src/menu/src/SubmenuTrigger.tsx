import type { ReactNode } from "react";
import { SubmenuTrigger as RACSubmenuTrigger, type SubmenuTriggerProps as RACSubmenuTriggerProps } from "react-aria-components";

export interface SubmenuTriggerProps extends Omit<RACSubmenuTriggerProps, "delay"> {}

export const SubmenuTrigger = RACSubmenuTrigger as (props: SubmenuTriggerProps) => ReactNode | null;
