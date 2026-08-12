import { Div, type DivProps, Grid } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid templateRows={["1fr", "1fr"]} gap="stack-sm">
                <Grid templateColumns={["core_800", "auto"]}>
                    <Square backgroundColor="decorative-option1" />
                    <Square backgroundColor="decorative-option3" />
                </Grid>
                <Grid templateColumns={["auto", "core_960"]}>
                    <Square backgroundColor="decorative-option1-strong" />
                    <Square backgroundColor="decorative-option3-strong" />
                </Grid>
            </Grid>
        </Div>
    );
}
