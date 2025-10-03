import { Div, Grid } from "@hopper-ui/components";

export function Example() {
    return (
        <Grid
            areas={[
                "header header",
                "sidebar content",
                "footer footer"
            ]}
            templateColumns={["core_1280", "1fr"]}
            templateRows={["core_640", "auto", "core_640"]}
            gap="core_160"
        >
            <Div backgroundColor="decorative-option1" gridArea="header" padding="inset-md" />
            <Div backgroundColor="decorative-option2" gridArea="sidebar" padding="inset-md" />
            <Div backgroundColor="decorative-option3" gridArea="content" padding="inset-md" />
            <Div backgroundColor="decorative-option4" gridArea="footer" padding="inset-md" />
        </Grid>
    );
}
