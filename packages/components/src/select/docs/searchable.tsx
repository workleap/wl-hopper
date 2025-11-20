import { Select, SelectItem } from "@hopper-ui/components";

const ANIMALS = [
    { id: "aardvark", name: "Aardvark" },
    { id: "albatross", name: "Albatross" },
    { id: "alligator", name: "Alligator" },
    { id: "bear", name: "Bear" },
    { id: "cat", name: "Cat" },
    { id: "dog", name: "Dog" },
    { id: "elephant", name: "Elephant" },
    { id: "fox", name: "Fox" },
    { id: "giraffe", name: "Giraffe" },
    { id: "horse", name: "Horse" },
    { id: "iguana", name: "Iguana" },
    { id: "jaguar", name: "Jaguar" },
    { id: "kangaroo", name: "Kangaroo" },
    { id: "lion", name: "Lion" },
    { id: "monkey", name: "Monkey" }
];

export default function Example() {
    return (
        <Select
            label="Select an animal"
            items={ANIMALS}
            isSearchable
            searchPlaceholder="Search animals..."
            searchInputLabel="Search animals"
        >
            {(item: typeof ANIMALS[0]) => <SelectItem id={item.id}>{item.name}</SelectItem>}
        </Select>
    );
}
