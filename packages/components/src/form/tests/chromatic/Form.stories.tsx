import {
    Button,
    ButtonGroup,
    Checkbox,
    ComboBox,
    ComboBoxItem,
    Inline,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Stack,
    Tag,
    TagGroup,
    TextArea,
    TextField
} from "@hopper-ui/components";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { Form } from "../../src/Form.tsx";

const meta = {
    title: "Components/Forms/Form",
    component: Form
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        children: (
            <>
                <Inline>
                    <TextField type="email" placeholder="billings@acme.com" isRequired label="Email address" description="Invoices will be sent to this email address." />
                </Inline>
                <RadioGroup label="I identify my gender as">
                    <Radio value="man">Man</Radio>
                    <Radio value="women">Women</Radio>
                    <Radio value="non-binary">Non-Binary</Radio>
                </RadioGroup>
                <Inline>
                    <TextField placeholder="John" label="First name" />
                    <TextField placeholder="Doe" label="Last name" />
                </Inline>
                <TextField placeholder="Looney Tunes Inc." label="Organization name" />
                <Inline>
                    <TextField placeholder="24 Sussex Drive" label="Address" />
                    <TextField placeholder="Apt or suite" label="Apt/Suite" />
                </Inline>
                <TextField placeholder="Old El Paso" label="City" />
                <TextArea placeholder="Leave a comment" label="Comments" />
                <Checkbox>
                Agree to terms and conditions
                </Checkbox>
                <Select isRequired label="Choose an animal">
                    <SelectItem id="designer">Designer</SelectItem>
                    <SelectItem id="developer">Developer</SelectItem>
                    <SelectItem id="manager">Manager</SelectItem>
                </Select>
                <ComboBox label="Choose an animal">
                    <ComboBoxItem id="dog">Dog</ComboBoxItem>
                    <ComboBoxItem id="cat">Cat</ComboBoxItem>
                    <ComboBoxItem id="frog">Frog</ComboBoxItem>
                </ComboBox>
                <TagGroup selectionMode="single" label="Choose a place">
                    <Tag id="1">Canada</Tag>
                    <Tag id="2">US</Tag>
                </TagGroup>
                <Button>Submit</Button>
            </>
        )
    }
} satisfies Story;

export const Small = {
    args: {
        ...Default.args,
        size: "sm"
    }
};

export const Disabled = {
    args: {
        ...Default.args,
        isDisabled: true
    }
} satisfies Story;

export const Fluid = {
    args: {
        ...Default.args,
        isFluid: true
    }
} satisfies Story;

export const LabelNecessityIndicator = {
    args: {
        ...Default.args,
        necessityIndicator: "label"
    }
} satisfies Story;

export const AsteriskNecessityIndicator = {
    args: {
        ...Default.args,
        necessityIndicator: "asterisk"
    }
} satisfies Story;

export const Validation = {
    args:{
        validationErrors: { username: "Sorry, this username is taken." },
        children: (
            <TextField defaultValue="john_doe" name="username" label="Username" />
        )
    }
} satisfies Story;

export const ValidationBehaviorAria = {
    args: {
        validationBehavior: "aria",
        children: (
            <>
                <TextField
                    name="username"
                    defaultValue="admin"
                    isRequired
                    validate={value => value === "admin" ? "Nice try." : null}
                    label="Username"
                />
                <Button type="submit">Submit</Button>
            </>
        )
    }
} satisfies Story;

export const ValidationBehaviorNative = {
    args:{
        validationBehavior: "native",
        children: (
            <>
                <TextField
                    name="email"
                    type="email"
                    isRequired
                    label="Email"
                    errorMessage="This field is required"
                />
                <ButtonGroup>
                    <Button type="submit">Submit</Button>
                    <Button type="reset">Reset</Button>
                </ButtonGroup>
            </>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const [submitButton] = canvas.getAllByRole("button");

        await userEvent.click(submitButton);

        const errorRender = await canvas.findByText("This field is required");
        await expect(errorRender).toBeVisible();
    }
} satisfies Story;

export const Styling = {
    render: () => {
        return (
            <Stack gap="core_320">
                <Form UNSAFE_border="1px solid red">
                    <TextField
                        name="email"
                        type="email"
                        label="Email"
                    />
                    <Button type="submit">Submit</Button>
                </Form>

                <Form className="bg-red">
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                    />
                    <Button type="submit">Submit</Button>
                </Form>

                <Form style={{ backgroundColor: "red" }}>
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                    />
                    <Button type="submit">Submit</Button>
                </Form>
            </Stack>
        );
    }
} satisfies Story;
