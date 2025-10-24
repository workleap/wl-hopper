import { Div, type DivProps, fitContent, Grid } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid
                templateColumns={[fitContent("core_800"), fitContent("core_800"), "1fr"]}
                gap="stack-sm"
                alignItems="center"
            >
                <Square padding="inset-sm" backgroundColor="decorative-option1" />
                <Square padding="inset-sm" backgroundColor="decorative-option2" />
                <Square padding="inset-sm" backgroundColor="decorative-option3" />
            </Grid>
        </Div>
    );
}
