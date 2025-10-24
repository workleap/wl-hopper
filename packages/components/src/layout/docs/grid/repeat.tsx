import { Div, type DivProps, Grid, repeat } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid
                templateColumns={repeat("auto-fit", "core_640")}
                autoRows="core_640"
                gap="stack-sm"
            >
                <Square backgroundColor="decorative-option1-weak" />
                <Square backgroundColor="decorative-option2-weak" />
                <Square backgroundColor="decorative-option3-weak" />
                <Square backgroundColor="decorative-option4-weak" />
                <Square backgroundColor="decorative-option5-weak" />
                <Square backgroundColor="decorative-option6-weak" />
                <Square backgroundColor="decorative-option7-weak" />
                <Square backgroundColor="decorative-option8-weak" />
                <Square backgroundColor="decorative-option9-weak" />
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
                <Square backgroundColor="decorative-option7" />
                <Square backgroundColor="decorative-option8" />
                <Square backgroundColor="decorative-option9" />
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
                <Square backgroundColor="decorative-option7-strong" />
                <Square backgroundColor="decorative-option8-strong" />
                <Square backgroundColor="decorative-option9-strong" />
            </Grid>
        </Div>
    );
}
