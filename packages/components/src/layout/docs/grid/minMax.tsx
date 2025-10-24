import { Div, type DivProps, Grid, minmax } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid
                templateColumns={[minmax("core_800", "1fr"), "core_960", minmax("core_800", "1fr")]}
                gap="stack-sm"
            >
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
            </Grid>
        </Div>
    );
}
