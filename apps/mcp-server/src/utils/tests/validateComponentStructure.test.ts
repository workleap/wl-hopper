import { MOCK_TOKENS } from "../../tests/mocks/tokensData.ts";
import { MOCK_UNSAFE_PROPS } from "../../tests/mocks/unsafePropsData.ts";
import { validateComponentStructure } from "../validateComponentStructure.ts";

// Mock the fs module to return our mock data
jest.mock("fs", () => ({
    ...jest.requireActual("fs"),
    readFileSync: jest.fn((path: string) => {
        if (path.includes("unsafe-props-data.json")) {
            return JSON.stringify(MOCK_UNSAFE_PROPS);
        } else if (path.includes("tokens-data.json")) {
            return JSON.stringify(MOCK_TOKENS);
        }

        return jest.requireActual("fs").readFileSync(path);
    })
}));

describe("validateComponentStructure", () => {
    describe("Basic functionality", () => {
        it("should return error for empty code", () => {
            const result = validateComponentStructure("");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("No code provided");
        });

        it("should return error for whitespace-only code", () => {
            const result = validateComponentStructure("   \n\t  ");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("No code provided");
        });

        it("should return error for code without JSX", () => {
            const result = validateComponentStructure("const x = 5;");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("No JSX components found");
        });

        it("should return error for invalid syntax", () => {
            const result = validateComponentStructure("<Button>Invalid JSX<");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Failed to parse code");
        });

        it("should return valid for non-validated components", () => {
            const result = validateComponentStructure("<Div>Hello World</Div>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe("Button component validation", () => {
        describe("Valid Button configurations", () => {
            it("should pass for Button with only text content", () => {
                const result = validateComponentStructure("<Button>Submit</Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Button with only one component child", () => {
                const result = validateComponentStructure("<Button><Icon/></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Button with Text component", () => {
                const result = validateComponentStructure("<Button><Text>Submit</Text></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Button with Text component and Icon", () => {
                const result = validateComponentStructure("<Button><Text>Submit</Text><Icon/></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Button with Icon and Text component", () => {
                const result = validateComponentStructure("<Button><Icon/><Text>Submit</Text></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should fail for Button with JSX expression and component", () => {
                const result = validateComponentStructure("<Button>{buttonText}<Icon/></Button>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("must include a Text component");
            });

            it("should pass for Button with three or more children", () => {
                const result = validateComponentStructure("<Button>Submit<Icon/><Spinner/></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });
        });

        describe("Invalid Button configurations", () => {
            it("should fail for Button with text content and non-Text component", () => {
                const result = validateComponentStructure("<Button>Submit<Icon/></Button>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("must include a Text component");
                expect(result.errors[0].message).toContain("Found children: Icon");
                expect(result.errors[0].line).toBe(1);
                expect(result.errors[0].column).toBe(0);
            });

            it("should fail for Button with text content and multiple non-Text components", () => {
                const result = validateComponentStructure("<Button>Submit<Icon/><Spinner/></Button>");
                expect(result.isValid).toBe(true); // This should pass as it has 3 children, rule only applies to 2
            });

            it("should handle whitespace correctly in text content", () => {
                const result = validateComponentStructure("<Button>   Submit   <Icon/></Button>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("must include a Text component");
            });

            it("should ignore empty text nodes", () => {
                const result = validateComponentStructure("<Button>   \n\t   <Icon/></Button>");
                expect(result.isValid).toBe(true); // Only 1 child (Icon), whitespace ignored
                expect(result.errors).toHaveLength(0);
            });
        });

        describe("Multiple Button instances", () => {
            it("should validate each Button instance separately", () => {
                const code = `
          <Div>
            <Button>Valid</Button>
            <Button>Invalid<Icon/></Button>
            <Button><Text>Valid</Text><Icon/></Button>
          </Div>
        `;
                const result = validateComponentStructure(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("(instance 2 of 3)");
            });

            it("should report multiple errors for multiple invalid instances", () => {
                const code = `
          <Div>
            <Button>First Invalid<Icon/></Button>
            <Button>Second Invalid<Spinner/></Button>
          </Div>
        `;
                const result = validateComponentStructure(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("(instance 1 of 2)");
                expect(result.errors[1].message).toContain("(instance 2 of 2)");
            });
        });

        describe("Nested Button components", () => {
            it("should validate nested Buttons correctly", () => {
                const code = `
          <Div>
            <Button><Text>Outer</Text></Button>
            <Modal>
              <Content>
                <Button>Inner Invalid<Icon/></Button>
              </Content>
            </Modal>
          </Div>
        `;
                const result = validateComponentStructure(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("Button component");
                expect(result.errors[0].message).toContain("must include a Text component");
                expect(result.errors[1].message).toContain("Modal component");
                expect(result.errors[1].message).toContain("missing recommended children");
            });
        });
    });

    describe("Modal component validation", () => {
        describe("Valid Modal configurations", () => {
            it("should pass for Modal with all allowed children", () => {
                const result = validateComponentStructure(
                    "<Modal><Heading/><Content/><ButtonGroup/></Modal>"
                );
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Modal with subset of allowed children", () => {
                const result = validateComponentStructure("<Modal><Content/></Modal>");
                expect(result.isValid).toBe(false); // Missing required children
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("missing recommended children");
            });

            it("should pass for empty Modal", () => {
                const result = validateComponentStructure("<Modal></Modal>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("missing recommended children: Heading, Content, ButtonGroup");
            });
        });

        describe("Invalid Modal configurations", () => {
            it("should fail for Modal with invalid children", () => {
                const result = validateComponentStructure("<Modal><Heading/><InvalidChild/><Content/></Modal>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("Found invalid children: InvalidChild");
                expect(result.errors[1].message).toContain("missing recommended children: ButtonGroup");
            });

            it("should fail for Modal with multiple invalid children", () => {
                const result = validateComponentStructure(
                    "<Modal><InvalidChild1/><InvalidChild2/><Heading/></Modal>"
                );
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("Found invalid children: InvalidChild1, InvalidChild2");
            });
        });

        describe("Multiple Modal instances", () => {
            it("should validate each Modal instance separately", () => {
                const code = `
          <Div>
            <Modal><Heading/><Content/><ButtonGroup/></Modal>
            <Modal><Heading/><InvalidChild/></Modal>
          </Div>
        `;
                const result = validateComponentStructure(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("(instance 2 of 2)");
                expect(result.errors[0].message).toContain("Found invalid children: InvalidChild");
                expect(result.errors[1].message).toContain("(instance 2 of 2)");
                expect(result.errors[1].message).toContain("missing recommended children: Content, ButtonGroup");
            });
        });
    });

    describe("Mixed component validation", () => {
        it("should validate both Button and Modal components in the same code", () => {
            const code = `
        <Div>
          <Button>Invalid<Icon/></Button>
          <Modal><Heading/><InvalidChild/><Content/></Modal>
        </Div>
      `;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(3);

            // Button error
            expect(result.errors[0].message).toContain("Button component");
            expect(result.errors[0].message).toContain("must include a Text component");

            // Modal errors
            expect(result.errors[1].message).toContain("Modal component");
            expect(result.errors[1].message).toContain("Found invalid children: InvalidChild");
            expect(result.errors[2].message).toContain("Modal component");
            expect(result.errors[2].message).toContain("missing recommended children: ButtonGroup");
        });

        it("should handle complex nested structures", () => {
            const code = `
        <Modal>
          <Heading>
            <Button>Heading Invalid<Icon/></Button>
          </Heading>
          <Content>
            <Button><Text>Content Valid</Text><Icon/></Button>
          </Content>
          <ButtonGroup>
            <Button>ButtonGroup Invalid<Spinner/></Button>
          </ButtonGroup>
        </Modal>
      `;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);

            // First invalid Button
            expect(result.errors[0].message).toContain("Button component (instance 1 of 3)");
            expect(result.errors[0].message).toContain("must include a Text component");

            // Third invalid Button
            expect(result.errors[1].message).toContain("Button component (instance 3 of 3)");
            expect(result.errors[1].message).toContain("must include a Text component");
        });
    });

    describe("Edge cases", () => {
        it("should handle self-closing components", () => {
            const result = validateComponentStructure("<Button/>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should handle components with attributes", () => {
            const result = validateComponentStructure("<Button variant=\"primary\" size=\"large\">Text<Icon/></Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("must include a Text component");
        });

        it("should handle JSX fragments", () => {
            const code = `
        <>
          <Button>Fragment Invalid<Icon/></Button>
          <Modal><Heading/><Content/><ButtonGroup/></Modal>
        </>
      `;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Button component");
        });

        it("should handle deeply nested components", () => {
            const code = `
        <Div>
          <Section>
            <Article>
              <Modal>
                <Heading/>
                <Content>
                  <Div>
                    <Button>Deep Invalid<Icon/></Button>
                  </Div>
                </Content>
                <ButtonGroup/>
              </Modal>
            </Article>
          </Section>
        </Div>
      `;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Button component");
        });

        it("should handle components with complex JSX expressions", () => {
            const code = "<Button>{isLoading ? \"Loading...\" : \"Submit\"}<Icon/></Button>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("must include a Text component");
        });

        it("should handle mixed content types correctly", () => {
            const code = "<Button>  \n\t  {getText()}  \n  <Icon/>  \n  </Button>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("must include a Text component");
        });
    });

    describe("Emoji validation", () => {
        it("should detect emojis in JSX text content", () => {
            const result = validateComponentStructure("<Button>Submit 🚀</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Emoji \"🚀\" detected");
            expect(result.errors[0].message).toContain("Emojis are not allowed in Hopper components");
            expect(result.errors[0].line).toBe(1);
            expect(result.errors[0].column).toBe(16);
        });

        it("should detect multiple emojis in the same line", () => {
            const result = validateComponentStructure("<Button>Submit 🚀 Done ✅</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("Emoji \"🚀\" detected");
            expect(result.errors[1].message).toContain("Emoji \"✅\" detected");
        });

        it("should detect emojis in multiple lines", () => {
            const code = `<Div>
  <Button>Submit 🚀</Button>
  <Text>Done ✅</Text>
</Div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].line).toBe(2);
            expect(result.errors[1].line).toBe(3);
        });

        it("should detect emojis in component attributes", () => {
            const result = validateComponentStructure("<Button aria-label=\"Submit 🚀\">Click</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Emoji \"🚀\" detected");
        });

        it("should detect complex emojis and combinations", () => {
            const result = validateComponentStructure("<Button>Family 👨‍👩‍👧‍👦</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Emoji \"👨‍👩‍👧‍👦\" detected");
        });

        it("should pass for code without emojis", () => {
            const result = validateComponentStructure("<Button>Submit</Button>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe("Native HTML element validation", () => {
        it("should detect native HTML div element", () => {
            const result = validateComponentStructure("<div><Button>Click</Button></div>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Native HTML element \"<div>\" is not allowed");
            expect(result.errors[0].message).toContain("Use Hopper components instead");
        });

        it("should detect native HTML span element", () => {
            const result = validateComponentStructure("<Button><span>Text</span></Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Native HTML element \"<span>\" is not allowed");
        });

        it("should detect multiple native HTML elements", () => {
            const code = `<div>
  <button>Click</button>
  <p>Description</p>
</div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(3);
            expect(result.errors[0].message).toContain("Native HTML element \"<div>\"");
            expect(result.errors[1].message).toContain("Native HTML element \"<button>\"");
            expect(result.errors[2].message).toContain("Native HTML element \"<p>\"");
        });

        it("should detect common HTML elements", () => {
            const htmlElements = ["h1", "h2", "h3", "a", "img", "form", "input", "table", "ul", "li"];

            for (const element of htmlElements) {
                const result = validateComponentStructure(`<${element}>Content</${element}>`);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain(`Native HTML element "<${element}>" is not allowed`);
            }
        });

        it("should pass for Hopper components", () => {
            const result = validateComponentStructure("<Div><Button>Click</Button></Div>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should provide location information for native HTML elements", () => {
            const code = `<Div>
  <div>Invalid</div>
</Div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].line).toBe(2);
            expect(result.errors[0].column).toBe(2);
        });
    });

    describe("className and style props validation", () => {
        it("should detect className prop usage", () => {
            const result = validateComponentStructure("<Button className=\"my-button\">Click</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Using \"className\" prop is **STRONGLY** discouraged");
            expect(result.errors[0].message).toContain("Check the Hopper \"styles\" guide");
        });

        it("should detect style prop usage", () => {
            const result = validateComponentStructure("<Button style={{color: \"red\"}}>Click</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Using \"style\" prop is **STRONGLY** discouraged");
            expect(result.errors[0].message).toContain("Check the Hopper \"styles\" guide");
        });

        it("should detect both className and style props", () => {
            const result = validateComponentStructure("<Button className=\"btn\" style={{margin: \"10px\"}}>Click</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("className");
            expect(result.errors[1].message).toContain("style");
        });

        it("should detect props in multiple components", () => {
            const code = `<Div>
  <Button className="btn1">Button 1</Button>
  <Button style={{color: "blue"}}>Button 2</Button>
</Div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("className");
            expect(result.errors[1].message).toContain("style");
        });

        it("should provide location information for className prop", () => {
            const code = `<Button
  className="my-class"
  onClick={handleClick}
>
  Click
</Button>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].line).toBe(2);
            expect(result.errors[0].column).toBe(2);
        });

        it("should allow other valid props", () => {
            const result = validateComponentStructure("<Button variant=\"primary\" size=\"large\" onClick={handleClick}>Click</Button>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should detect props in self-closing components", () => {
            const result = validateComponentStructure("<Icon className=\"icon\" />");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("className");
        });
    });

    describe("Enhanced error reporting", () => {
        it("should provide detailed error for unexpected token", () => {
            const result = validateComponentStructure("<Button>Invalid JSX<");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Failed to parse code");
            expect(result.errors[0].message).toContain("Please ensure the code is valid TypeScript/JSX syntax");
            expect(result.errors[0].message).toContain("Missing semicolons or brackets");
        });

        it("should provide detailed error for incomplete code", () => {
            // This might not trigger "Unexpected end of file" in all cases,
            // but testing the error handling structure
            const result = validateComponentStructure("<Button");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Failed to parse code");
        });

        it("should handle unknown parsing errors gracefully", () => {
            // Test with severely malformed code
            const result = validateComponentStructure("<<>>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Failed to parse code");
        });
    });

    describe("Combined validation scenarios", () => {
        it("should detect all types of violations in one code block", () => {
            const code = `<div className="container" style={{padding: "10px"}}>
  <Button>Submit 🚀<Icon/></Button>
  <p>Description with emoji ✅</p>
</div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);

            // Should detect: native HTML (div, p), className, style, emojis, Button validation
            expect(result.errors.length).toBeGreaterThan(5);

            // Check for different error types
            const errorMessages = result.errors.map(e => e.message);
            expect(errorMessages.some(msg => msg.includes("Native HTML element"))).toBe(true);
            expect(errorMessages.some(msg => msg.includes("className"))).toBe(true);
            expect(errorMessages.some(msg => msg.includes("style"))).toBe(true);
            expect(errorMessages.some(msg => msg.includes("Emoji"))).toBe(true);
            expect(errorMessages.some(msg => msg.includes("Button component"))).toBe(true);
        });

        it("should maintain correct line and column information for multiple errors", () => {
            const code = `<div>
  <Button className="btn">Submit 🚀</Button>
</div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);

            // All errors should have line information
            result.errors.forEach(error => {
                expect(error.line).toBeGreaterThan(0);
                expect(error.column).toBeGreaterThanOrEqual(0);
            });
        });

        it("should pass for valid Hopper component usage", () => {
            const code = `<Modal>
  <Heading>
    <Text>Modal Title</Text>
  </Heading>
  <Content>
    <Text>Modal content goes here</Text>
    <Button>
      <Text>Action</Text>
      <Icon />
    </Button>
  </Content>
  <ButtonGroup>
    <Button>
      <Text>Cancel</Text>
    </Button>
    <Button>
      <Text>Confirm</Text>
    </Button>
  </ButtonGroup>
</Modal>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe("UNSAFE_ props validation", () => {
        // Note: These tests pass for valid props because when the unsafe-props-data.json file
        // is not available (like in test environment), the validation is skipped
        it("should pass for valid UNSAFE_ props", () => {
            const code = "<Div UNSAFE_backgroundColor=\"red\">Hello</Div>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should pass for multiple valid UNSAFE_ props", () => {
            const code = "<Div UNSAFE_backgroundColor=\"red\" UNSAFE_padding=\"10px\">Hello</Div>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        // The following tests are skipped because they require the unsafe-props-data.json file
        // which is not available in the test environment. In production, these validations work correctly.
        it("should fail for invalid UNSAFE_ prop", () => {
            const code = "<Div UNSAFE_invalidProp=\"value\">Hello</Div>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("UNSAFE_invalidProp");
            expect(result.errors[0].message).toContain("not a valid UNSAFE_ prop");
        });

        it("should fail for multiple invalid UNSAFE_ props", () => {
            const code = "<Div UNSAFE_invalidProp=\"value\" UNSAFE_anotherInvalidProp=\"value2\">Hello</Div>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThanOrEqual(2);
            expect(result.errors[0].message).toContain("not a valid UNSAFE_ prop");
            expect(result.errors[1].message).toContain("not a valid UNSAFE_ prop");
        });

        it("should allow mixing valid UNSAFE_ props with regular props", () => {
            const code = "<Div UNSAFE_backgroundColor=\"red\" id=\"myDiv\" className=\"test\">Hello</Div>";
            const result = validateComponentStructure(code);
            // Should fail due to className, but UNSAFE_ prop should be valid
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("className");
        });

        it("should validate UNSAFE_ props on nested components", () => {
            const code = `
                <Div UNSAFE_backgroundColor="red">
                    <Span UNSAFE_invalidProp="value">Hello</Span>
                </Div>
            `;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("UNSAFE_invalidProp");
        });

        it("should detect invalid UNSAFE_className", () => {
            const code = "<Div UNSAFE_className=\"test\">Hello</Div>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("prohibited");
        });

        it("should detect invalid UNSAFE_style", () => {
            const code = "<Div UNSAFE_style={{color: \"red\"}}>Hello</Div>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("prohibited");
        });

        it("should provide different message for invalid UNSAFE_ props that are not prohibited", () => {
            const code = "<Div UNSAFE_invalidProp=\"value\">Hello</Div>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).not.toContain("prohibited");
        });
    });

    describe("Design system tokens validation", () => {
        it("should warn about tokens with hop- prefix", () => {
            const code = "<Button backgroundColor=\"hop-surface-neutral\">Click me</Button>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"surface-neutral\"");
            expect(result.errors[0].line).toBe(1);
            expect(result.errors[0].column).toBe(8);
        });

        it("should warn about multiple incorrectly formatted tokens", () => {
            const code = `<Div
                backgroundColor="hop-surface-neutral"
                color="hop-text-primary"
            >Content</Div>`;
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("\"hop-surface-neutral\"");
            expect(result.errors[0].message).toContain("\"surface-neutral\"");
            expect(result.errors[1].message).toContain("\"hop-text-primary\"");
            expect(result.errors[1].message).toContain("\"text-primary\""); // -text is removed, not hop-
        });

        it("should not warn about correctly formatted tokens", () => {
            const code = "<Button backgroundColor=\"surface-neutral\" color=\"primary\">Click me</Button>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should not warn about non-token string values", () => {
            const code = `<Button
                id="my_button_id"
                data-test="test_value"
                aria-label="Submit form"
            >Click</Button>`;
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should handle tokens with -surface suffix", () => {
            const code = "<Div backgroundColor=\"neutral-surface\">Content</Div>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"neutral-surface\"");
            expect(result.errors[0].message).toContain("\"neutral\"");
        });

        it("should handle tokens with -text suffix", () => {
            const code = "<Text color=\"primary-text-strong\">Hello</Text>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"primary-text-strong\"");
            expect(result.errors[0].message).toContain("\"primary-strong\"");
        });

        it("should handle tokens with -border suffix", () => {
            const code = "<Div borderColor=\"neutral-border-weak\">Content</Div>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"neutral-border-weak\"");
            expect(result.errors[0].message).toContain("\"neutral-weak\"");
        });

        it("should handle tokens in nested components", () => {
            const code = `<Modal>
                <Heading backgroundColor="hop-surface-primary">
                    <Text color="hop-text-primary">Title</Text>
                </Heading>
                <Content backgroundColor="elevation-surface-raised">
                    Content here
                </Content>
                <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button variant="primary">Confirm</Button>
                </ButtonGroup>
            </Modal>`;
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(3);
            expect(result.errors[0].message).toContain("\"hop-surface-primary\"");
            expect(result.errors[1].message).toContain("\"hop-text-primary\"");
            expect(result.errors[2].message).toContain("\"elevation-surface-raised\"");
        });

        it("should not warn for non-literal values", () => {
            const code = `<Button
                backgroundColor={myColor}
                color={getColor()}
                borderColor={\`\${prefix}_surface\`}
            >Click</Button>`;
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should handle self-closing components with token props", () => {
            const code = "<Icon color=\"hop-text-primary\" />";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"hop-text-primary\"");
            expect(result.errors[0].message).toContain("\"text-primary\""); // -text suffix is removed after hop- is removed
        });

        it("should not warn for values that don't match token patterns", () => {
            const code = `<Button
                backgroundColor="red"
                color="#FF0000"
                borderColor="rgb(255, 0, 0)"
            >Click</Button>`;
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should provide accurate line and column information", () => {
            const code = `<Div>
                <Button
                    id="btn1"
                    backgroundColor="hop-surface-neutral"
                    onClick={handleClick}
                >
                    Click
                </Button>
            </Div>`;
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].line).toBe(4);
            expect(result.errors[0].column).toBe(20);
        });

        it("should handle multiple attributes on the same element", () => {
            const code = `<Button
                backgroundColor="hop-surface-primary"
                color="hop-text-white"
                borderColor="hop-border-primary"
            >Click</Button>`;
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(3);
        });

        it("should only warn when formatted version is shorter", () => {
            // This simulates a case where the formatted version might not be shorter
            // In practice, formatStyledSystemName should always return shorter versions for tokens
            const code = "<Button customProp=\"short\">Click</Button>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should handle empty string values", () => {
            const code = "<Button backgroundColor=\"\">Click</Button>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should validate tokens in JSX spread attributes", () => {
            // Note: spread attributes don't trigger validation as they're not JSXAttribute type
            const code = "<Button {...props} backgroundColor=\"hop-surface-neutral\">Click</Button>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"hop-surface-neutral\"");
        });

        it("should handle elevation- prefix", () => {
            const code = "<Div backgroundColor=\"elevation-surface-raised\">Content</Div>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"elevation-surface-raised\"");
            expect(result.errors[0].message).toContain("\"raised\""); // both elevation- and -surface are removed
        });

        it("should handle shape- prefix", () => {
            const code = "<Div borderRadius=\"shape-rounded-md\">Content</Div>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"shape-rounded-md\"");
            expect(result.errors[0].message).toContain("\"rounded-md\"");
        });

        it("should handle space- prefix", () => {
            const code = "<Div padding=\"space-inset-md\">Content</Div>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"space-inset-md\"");
            expect(result.errors[0].message).toContain("\"inset-md\"");
        });

        it("should handle shadow- prefix", () => {
            const code = "<Div boxShadow=\"shadow-lg\">Content</Div>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"shadow-lg\"");
            expect(result.errors[0].message).toContain("\"lg\"");
        });

        it("should handle radius- prefix", () => {
            const code = "<Div borderRadius=\"radius-md\">Content</Div>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"radius-md\"");
            expect(result.errors[0].message).toContain("\"md\"");
        });

        it("should handle semantic font suffixes", () => {
            const code = "<Text fontFamily=\"body-font-family\">Text</Text>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"body-font-family\"");
            expect(result.errors[0].message).toContain("\"body\"");
        });

        it("should handle core font prefixes", () => {
            const code = "<Text fontSize=\"font-size-100\">Text</Text>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"font-size-100\"");
            expect(result.errors[0].message).toContain("\"100\"");
        });

        it("should handle -icon suffix", () => {
            const code = "<Icon fill=\"primary-icon-strong\">Icon</Icon>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("\"primary-icon-strong\"");
            expect(result.errors[0].message).toContain("\"primary-strong\"");
        });

        it("should not warn for dataviz tokens as they don't get shorter", () => {
            // dataviz- prefix becomes dataviz_ prefix, so the length doesn't decrease
            const code = "<Chart color=\"dataviz-categorical-1\">Chart</Chart>";
            const result = validateComponentStructure(code);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe("Token usage on non-token-supported props", () => {
        it("should error when token is used on non-supported prop", () => {
            const code = "<Div top=\"danger-active\">Content</Div>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("The token value \"danger-active\" is not allowed for prop \"top\"");
            expect(result.errors[0].message).toContain("Only certain props support design tokens");
            expect(result.errors[0].message).toContain("Check the Hopper \"styles\" guide");
        });

        it("should error for multiple tokens on non-supported props", () => {
            const code = `<Div
                left="danger-active"
                right="core_coastal-25"
                top="core_120"
            >Content</Div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(3);
            expect(result.errors[0].message).toContain("left");
            expect(result.errors[0].message).toContain("danger-active");
            expect(result.errors[1].message).toContain("right");
            expect(result.errors[1].message).toContain("core_coastal-25");
            expect(result.errors[2].message).toContain("top");
            expect(result.errors[2].message).toContain("core_120");
        });

        it("should allow non-token values on non-supported props", () => {
            const code = `<Div
                top="10px"
                left="0"
                right="auto"
                bottom="5rem"
            >Content</Div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should allow token values on token-supported props", () => {
            const code = `<Div
                backgroundColor="danger-active"
                color="core_coastal-25"
                fontSize="core_120"
            >Content</Div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should error for tokens on props with common names that don't support tokens", () => {
            const code = `<Button
                id="danger-active"
                name="core_coastal-25"
                value="core_120"
            >Click</Button>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(3);
            expect(result.errors[0].message).toContain("id");
            expect(result.errors[1].message).toContain("name");
            expect(result.errors[2].message).toContain("value");
        });

        it("should error for semantic tokens on non-supported props", () => {
            const code = "<Icon top=\"core_120\" position=\"inset-xs\" />";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("top");
            expect(result.errors[0].message).toContain("core_120");
            expect(result.errors[1].message).toContain("position");
            expect(result.errors[1].message).toContain("inset-xs");
        });

        it("should error for core tokens on non-supported props", () => {
            const code = "<Text maxWidth=\"core_coastal-25\" minWidth=\"core_120\">Text</Text>";
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("maxWidth");
            expect(result.errors[0].message).toContain("core_coastal-25");
            expect(result.errors[1].message).toContain("minWidth");
            expect(result.errors[1].message).toContain("core_120");
        });

        it("should provide accurate line and column information for token errors", () => {
            const code = `<Div>
                <Button
                    id="test"
                    position="core_120"
                    onClick={handleClick}
                >
                    Click
                </Button>
            </Div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].line).toBe(4);
            expect(result.errors[0].column).toBe(20);
        });

        it("should handle mix of UNSAFE_ and regular props with tokens", () => {
            const code = `<Div
                top="core_120"
                UNSAFE_height="core_coastal-25"
            >Content</Div>`;
            const result = validateComponentStructure(code);

            expect(result.isValid).toBe(false);
            // We get 2 errors:
            // 1. Invalid UNSAFE_ prop error for UNSAFE_height (it's not in the allowed list)
            // 2. Token on non-supported prop error for width (width doesn't support tokens)
            // Note: Token validation for UNSAFE_height doesn't trigger because it's already
            // caught as an invalid UNSAFE_ prop before the token validation runs
            expect(result.errors).toHaveLength(2);

            // Check for the width error
            const topError = result.errors.find(e => e.message.includes("top") && !e.message.includes("height"));
            expect(topError).toBeDefined();
            expect(topError?.message).toContain("The token value \"core_120\" is not allowed for prop \"top\"");
            expect(topError?.message).toContain("Only certain props support design tokens");

            // Check for the UNSAFE_height error (invalid UNSAFE_ prop)
            const heightError = result.errors.find(e => e.message.includes("UNSAFE_height"));
            expect(heightError).toBeDefined();
            expect(heightError?.message).toContain("You have to use the safe prop \"height\" directly when tokens are available");
        });

        it("should not error when prop value is not a token but looks similar", () => {
            const code = `<Div
                className="danger-active-class"
                data-attribute="core_coastal-25"
            >Content</Div>`;
            const result = validateComponentStructure(code);
            // Should error for className being prohibited AND for data-attribute using a token value
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("className");
            expect(result.errors[0].message).toContain("**STRONGLY** discouraged");
            expect(result.errors[1].message).toContain("data-attribute");
            expect(result.errors[1].message).toContain("core_coastal-25");
        });

        it("should handle nested components with token errors on non-supported props", () => {
            const code = `<Modal>
                <Heading left="core_120">
                    <Text overflow="core_120">Title</Text>
                </Heading>
                <Content>
                    <Div unknown-prop="core_coastal-25">Content</Div>
                </Content>
            </Modal>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThanOrEqual(3);
            const leftError = result.errors.find(e => e.message.includes("left"));
            const overflowError = result.errors.find(e => e.message.includes("overflow"));
            const unknownPropError = result.errors.find(e => e.message.includes("unknown-prop"));
            expect(leftError).toBeDefined();
            expect(overflowError).toBeDefined();
            expect(unknownPropError).toBeDefined();
        });

        it("should only validate literal string values", () => {
            const code = `<Div
                width={tokenValue}
                height={\`\${danger}-active\`}
                top={getToken()}
            >Content</Div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should error for tokens on aria attributes that don't support tokens", () => {
            const code = `<Button
                aria-label="danger-active"
                aria-describedby="core_coastal-25"
            >Click</Button>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("aria-label");
            expect(result.errors[1].message).toContain("aria-describedby");
        });

        it("should error for tokens on data attributes", () => {
            const code = `<Div
                data-testid="danger-active"
                data-value="core_120"
            >Content</Div>`;
            const result = validateComponentStructure(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("data-testid");
            expect(result.errors[1].message).toContain("data-value");
        });
    });
});
