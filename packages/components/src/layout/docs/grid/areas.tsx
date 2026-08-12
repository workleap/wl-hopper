import { Div, type DivProps, Grid } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid areas={["a  a", "b c"]}>
                <Square gridArea="a" backgroundColor="decorative-option1" />
                <Square gridArea="b" backgroundColor="decorative-option3" />
                <Square gridArea="c" backgroundColor="decorative-option4" />
            </Grid>
        </Div>
    );
}
