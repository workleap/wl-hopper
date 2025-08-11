import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import { rehypePluginOptions } from "./app/lib/rehypeConfig.ts";

export const Page = defineDocumentType(() => ({
    name: "Page",
    filePathPattern: "pages/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: doc => `${doc._raw.flattenedPath}`
        }
    }
}));

export const Tokens = defineDocumentType(() => ({
    name: "Tokens",
    filePathPattern: "tokens/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        order: {
            type: "number"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileName.replace(/\.mdx$/, "");
            }
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("tokens/", "");
            }
        }
    }
}));

export const Guides = defineDocumentType(() => ({
    name: "Guides",
    filePathPattern: "guides/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        order: {
            type: "number"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("guides/", "");
            }
        }
    }
}));

export const Icons = defineDocumentType(() => ({
    name: "Icons",
    filePathPattern: "icons/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        order: {
            type: "number"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("icons/", "");
            }
        }
    }
}));


export const StyledSystem = defineDocumentType(() => ({
    name: "StyledSystem",
    filePathPattern: "styled-system/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        order: {
            type: "number"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("styled-system/", "");
            }
        }
    }
}));

export const GettingStarted = defineDocumentType(() => ({
    name: "GettingStarted",
    filePathPattern: "getting-started/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        order: {
            type: "number"
        },
        status: {
            type: "string"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("getting-started/", "");
            }
        }
    }
}));

const Links = defineNestedType(() => ({
    name: "Links",
    fields: {
        source: { type: "string", required: true }
    }
}));

export const Components = defineDocumentType(() => ({
    name: "Components",
    filePathPattern: "components/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        alpha: {
            type: "string"
        },
        status: {
            type: "string"
        },
        category: {
            type: "string"
        },
        order: {
            type: "number"
        },
        links: {
            type: "nested",
            of: Links
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("components/", "");
            }
        }
    }
}));

export default makeSource({
    contentDirPath: "./content",
    contentDirExclude: ["ai-templates"],
    documentTypes: [Page, Tokens, Components, Icons, Guides, GettingStarted, StyledSystem],
    mdx: {
        remarkPlugins: [],
        rehypePlugins: rehypePluginOptions
    }
});
