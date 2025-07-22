import { Mdx } from "@/scripts/utils/Mdx";


export interface PackageInstallationProps {
    library: string;
    mode: "dev" | "prod";
}


const methods = ["pnpm", "yarn", "npm"] as const;


const installMethods = methods.map(method => ({
    id: method,
    title: method
}));

const formatCode = async (method: string, library: string, mode: string) => {
    const code = `${method} ${method === "npm" ? "install" : "add"} ${mode === "dev" ? "-D" : ""} @hopper-ui/${library}`;

    return <Mdx>
```bash
${code.replace(/\s{2,}/g, " ")}
```
    </Mdx>;
};

const PackageInstallation = async ({ library, mode = "prod" }: PackageInstallationProps) => {
    const tabsContent = await Promise.all(methods.map(async method => {
        const code = await formatCode(method, library, mode);

        return (
            <div key={method}>
                <h4>{method}</h4>
                {code}
            </div>
        );
    }));

    return tabsContent;
};


export default PackageInstallation;
