import { Div, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    // @ts-expect-error - This is a fake implementation
    const navigate = useNavigateFromYourRouter();

    return (
        <HopperProvider colorScheme="light" navigate={navigate}>
            <Div>{/* Your app here */}</Div>
        </HopperProvider>
    );
}
