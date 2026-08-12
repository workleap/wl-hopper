import { Div, Grid } from "@hopper-ui/components";

export default function Example() {
    return (
        <Grid
            areas={["header header", "sidebar content", "footer footer"]}
            templateColumns={["1fr", "3fr"]}
            templateRows={["core_640", "auto", "core_640"]}
            UNSAFE_height="480px"
            UNSAFE_width="600px"
            gap="core_80"
        >
            <Div backgroundColor="decorative-option1" gridArea="header" />
            <Div backgroundColor="decorative-option2" gridArea="sidebar" />
            <Div backgroundColor="decorative-option3" gridArea="content" />
            <Div backgroundColor="decorative-option4" gridArea="footer" />
        </Grid>
    );
}
