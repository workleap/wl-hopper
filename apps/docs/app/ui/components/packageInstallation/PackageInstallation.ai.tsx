import { Mdx } from "@/components/mdx/Mdx.ai";

export interface PackageInstallationProps {
    library: string;
    mode: "dev" | "prod";
}

const methods = ["pnpm", "yarn", "npm"] as const;

const formatCode = (method: string, library: string, mode: string) => {
    const code = `${method} ${method === "npm" ? "install" : "add"} ${mode === "dev" ? "-D" : ""} @hopper-ui/${library}`;

    return (
        <Mdx>
            ```bash
            ${code.replace(/\s{2,}/g, " ")}
            ```
        </Mdx>
    );
};

const PackageInstallation = ({ library, mode = "prod" }: PackageInstallationProps) => {
    const tabsContent = methods.map(method => {
        const code = formatCode(method, library, mode);

        return (
            <div key={method}>
                <h4>{method}</h4>
                {code}
            </div>
        );
    });

    return tabsContent;
};

export default PackageInstallation;
