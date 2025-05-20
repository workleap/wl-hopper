import { Badge, Div, FloatingBadge } from "@hopper-ui/components";

export default function Example() {
    return (
        <FloatingBadge>
            <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
            <Badge>NEW</Badge>
        </FloatingBadge>
    );
}
