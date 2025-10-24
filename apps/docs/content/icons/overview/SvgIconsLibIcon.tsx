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
            d="M13.569 17a1.5 1.5 0 0 0-1.024.404L9 20.715V18.5A1.5 1.5 0 0 0 7.5 17a3 3 0 0 1-3-3V9.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3V14a3 3 0 0 1-3 3zm2.931 1.5h-2.931L9.74 22.076c-.827.772-2.241.225-2.241-.867V18.5A4.5 4.5 0 0 1 3 14V9.5A4.5 4.5 0 0 1 7.5 5h9A4.5 4.5 0 0 1 21 9.5V14a4.5 4.5 0 0 1-4.5 4.5m-.562-5.625a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25M10.93 11.75a1.125 1.125 0 1 0 2.25 0 1.125 1.125 0 0 0-2.25 0m-2.868 1.125a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25"
        />
    </svg>
);

export default SvgComponent;
