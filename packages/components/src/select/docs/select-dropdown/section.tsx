import { Header, Select, SelectItem, SelectSection } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select aria-label="list of options">
            <SelectItem>Developer</SelectItem>
            <SelectItem>Manager</SelectItem>
            <SelectSection>
                <Header>Creative Department</Header>
                <SelectItem>Designer</SelectItem>
                <SelectItem>Copywriter</SelectItem>
                <SelectItem>UX Researcher</SelectItem>
            </SelectSection>
            <SelectSection>
                <Header>Operations</Header>
                <SelectItem>Project Coordinator</SelectItem>
                <SelectItem>QA Specialist</SelectItem>
            </SelectSection>
            <SelectItem>Product Owner</SelectItem>
        </Select>
    );
}
