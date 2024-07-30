import { TagGroup, Tag, TagList, type Selection } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup 
            aria-label="Jobs"
            onRemove={(ids: Selection) => {
                alert(`Remove: ${[...ids]}`);
            }}
        >
            <TagList>
                <Tag id="dentist">Dentist</Tag>
                <Tag id="developer">Developer</Tag>
                <Tag id="doctor">Doctor</Tag>
            </TagList>
        </TagGroup>
    );
}
