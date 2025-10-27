import type { SVGProps } from "react";

const SvgComponent = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <svg
        width={24}
        height={24}
        aria-hidden="true"
        className="hop-Icon Icon_hop-Icon__2QpIE"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M4.5 12a7.5 7.5 0 0 1 10.227-6.989.75.75 0 1 0 .546-1.397 9 9 0 1 0 5.113 5.113.75.75 0 1 0-1.397.546A7.5 7.5 0 1 1 4.5 12m3.25 0a4.25 4.25 0 0 1 5.1-4.165.75.75 0 0 0 .3-1.47 5.75 5.75 0 1 0 4.486 4.486.75.75 0 0 0-1.471.298q.084.413.085.851a4.25 4.25 0 0 1-8.5 0m6.467-1.156 3.094-3.094H18.6a.75.75 0 0 0 .488-.18l1.4-1.2A.75.75 0 0 0 20 5.05h-1.05V4a.75.75 0 0 0-1.32-.488l-1.2 1.4a.75.75 0 0 0-.18.488v1.29l-3.094 3.093a2.5 2.5 0 1 0 1.06 1.06M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
        />
    </svg>
);

export default SvgComponent;
