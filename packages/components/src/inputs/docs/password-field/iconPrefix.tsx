import { PasswordField } from "@hopper-ui/components";
import { SearchIcon } from "@hopper-ui/icons";

export default function Example() {
    return <PasswordField placeholder="Enter password" prefix={<SearchIcon />} label="Password" />;
}
