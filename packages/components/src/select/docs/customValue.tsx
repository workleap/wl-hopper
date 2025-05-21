import { Avatar, Select, SelectItem, Text, type ValueRenderProps } from "@hopper-ui/components";

import { users, type User } from "./data.ts";

const renderValue = ({ defaultChildren, selectedItem }: ValueRenderProps<User>) => {
    if (selectedItem) {
        const { name, avatar } = selectedItem;

        return (
            <>
                <Avatar name={name} src={avatar} />
                <Text>{name}</Text>
            </>
        );
    }

    return defaultChildren;
};

export default function Example() {
    const [firstUser] = users;

    return (
        <Select
            renderValue={renderValue}
            defaultSelectedKey={firstUser.id}
            items={users}
            label="Users"
        >
            {({ id, name, avatar, role }) => {
                return (
                    <SelectItem id={id} textValue={name}>
                        <Avatar name={name} src={avatar} />
                        <Text>{name}</Text>
                        <Text slot="description">{role}</Text>
                    </SelectItem>
                );
            }}
        </Select>
    );
}
