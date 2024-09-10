import { Badge, Div, FloatingBadge, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <FloatingBadge offset={[10, "-5%"]}>
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge>NEW</Badge>
            </FloatingBadge>
            <FloatingBadge offset={[10, "-5%"]}>
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge indeterminate></Badge>
            </FloatingBadge>
        </Inline>
    );
}
