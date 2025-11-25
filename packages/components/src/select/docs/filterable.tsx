import { Select, SelectItem, Text } from "@hopper-ui/components";

const ANIMALS = [
    { id: "aardvark", name: "Aardvark", description: "A nocturnal mammal that feeds on ants and termites" },
    { id: "albatross", name: "Albatross", description: "A large seabird with long narrow wings" },
    { id: "alligator", name: "Alligator", description: "A large reptile with a powerful tail and strong jaws" },
    { id: "bear", name: "Bear", description: "A large mammal with thick fur and a strong build" },
    { id: "cat", name: "Cat", description: "A small domesticated carnivorous mammal" },
    { id: "dog", name: "Dog", description: "A domesticated carnivorous mammal and loyal companion" },
    { id: "elephant", name: "Elephant", description: "The largest land mammal with a long trunk" },
    { id: "fox", name: "Fox", description: "A small omnivorous mammal known for its cunning" },
    { id: "giraffe", name: "Giraffe", description: "The tallest land animal with a very long neck" },
    { id: "horse", name: "Horse", description: "A large domesticated mammal used for riding and transport" },
    { id: "iguana", name: "Iguana", description: "A large tropical lizard with a spiny back" },
    { id: "jaguar", name: "Jaguar", description: "A large spotted cat native to the Americas" },
    { id: "kangaroo", name: "Kangaroo", description: "A marsupial that hops on powerful hind legs" },
    { id: "lion", name: "Lion", description: "A large tawny-colored cat known as the king of the jungle" },
    { id: "monkey", name: "Monkey", description: "A primate with a long tail and high intelligence" }
];

export default function Example() {
    return (
        <Select
            label="Select an animal"
            items={ANIMALS}
            isFilterable
        >
            {(item: typeof ANIMALS[0]) => (
                <SelectItem id={item.id} textValue={item.name}>
                    <Text>{item.name}</Text>
                    <Text slot="description">{item.description}</Text>
                </SelectItem>
            )}
        </Select>
    );
}
