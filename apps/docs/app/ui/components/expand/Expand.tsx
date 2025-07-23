"use client";

import { Icon, RightAngleIcon } from "@/components/icon";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Button, Disclosure, DisclosurePanel, Heading, composeRenderProps, type DisclosureProps } from "react-aria-components";

import "./expand.css";

export interface ExpandProps extends DisclosureProps {
    title: ReactNode;
}

const Expand = ({ title, className, children: childrenProp, ...rest }: ExpandProps) => {
    const children = composeRenderProps(childrenProp, prev => {
        return prev;
    });

    return (
        <Disclosure className={clsx("hd-expand", className)} {...rest}>
            {disclosureRenderProps => (
                <>
                    <Heading>
                        <Button className="hd-expand__trigger" slot="trigger">
                            <Icon className="hd-expand__trigger-icon" src={RightAngleIcon} />
                            <span>{title}</span>
                        </Button>
                    </Heading>
                    <DisclosurePanel className="hd-expand__panel">
                        <div className="hd-expand__content">{children(disclosureRenderProps)}</div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
};

export default Expand;
