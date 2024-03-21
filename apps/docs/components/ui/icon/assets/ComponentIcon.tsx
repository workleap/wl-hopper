import { forwardRef, type Ref, type SVGProps } from "react";

const ComponentIcon = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={24}
    height={24}
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
>
    <path fillRule="evenodd"
        clipRule="evenodd"
        d="M18.1111 8.99188L15.1031 11.9999L18.1111 15.0079L21.1192 11.9999L18.1111 8.99188ZM12 15.103L8.99196 18.1111L12 21.1191L15.008 18.1111L12 15.103ZM12 2.88069L8.99196 5.88872L12 8.89676L15.008 5.88872L12 2.88069ZM5.88885 8.99188L2.88081 11.9999L5.88885 15.0079L8.89688 11.9999L5.88885 8.99188ZM11.2929 1.70689C11.6834 1.31637 12.3166 1.31637 12.7071 1.70689L16.1818 5.18162C16.5723 5.57214 16.5723 6.20531 16.1818 6.59583L12.7071 10.0706C12.3166 10.4611 11.6834 10.4611 11.2929 10.0706L7.81817 6.59583C7.42764 6.20531 7.42764 5.57214 7.81817 5.18162L11.2929 1.70689ZM18.8183 7.81808C18.4277 7.42755 17.7946 7.42755 17.404 7.81808L13.9293 11.2928C13.5388 11.6833 13.5388 12.3165 13.9293 12.707L17.404 16.1817C17.7946 16.5723 18.4277 16.5723 18.8183 16.1817L22.293 12.707C22.6835 12.3165 22.6835 11.6833 22.293 11.2928L18.8183 7.81808ZM12.7071 13.9292C12.3166 13.5387 11.6834 13.5387 11.2929 13.9292L7.81817 17.404C7.42764 17.7945 7.42764 18.4276 7.81817 18.8182L11.2929 22.2929C11.6834 22.6834 12.3166 22.6834 12.7071 22.2929L16.1818 18.8182C16.5723 18.4276 16.5723 17.7945 16.1818 17.404L12.7071 13.9292ZM6.59595 7.81808C6.20543 7.42755 5.57226 7.42755 5.18174 7.81808L1.70702 11.2928C1.31649 11.6833 1.31649 12.3165 1.70702 12.707L5.18174 16.1817C5.57226 16.5723 6.20543 16.5723 6.59595 16.1817L10.0707 12.707C10.4612 12.3165 10.4612 11.6833 10.0707 11.2928L6.59595 7.81808Z"
        fill="currentColor"
    />
</svg>);

export default ComponentIcon;
