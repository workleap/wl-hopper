import { H1, Select, SelectItem, Stack, Text } from "@hopper-ui/components";

export function StorePage() {
    return (
        <Stack>
            <H1>Store</H1>
            <Text>This is the store page. What is do you want to buy?</Text>
            <Select label="Movies">
                <SelectItem id="venom">Venom</SelectItem>
                <SelectItem id="spider-man">Spider-man</SelectItem>
                <SelectItem id="deadpool">Deadpool</SelectItem>
            </Select>
        </Stack>
    );
}
