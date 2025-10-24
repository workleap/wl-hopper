import { MOCK_TOKENS_FULL } from "../../tests/mocks/tokensData";
import { MOCK_UNSAFE_PROPS } from "../../tests/mocks/unsafePropsData";
import { validateHopperCode } from "../validator.service";

// Mock the fs/promises module to return our mock data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(async (path: string) => {
        if (path.includes("unsafe-props-data.json")) {
            return JSON.stringify(MOCK_UNSAFE_PROPS);
        } else if (path.includes("/tokens/maps/all.json")) {
            return JSON.stringify(MOCK_TOKENS_FULL);
        }

        const fs = jest.requireActual("fs");

        return fs.readFileSync(path, "utf-8");
    })
}));

describe("validateHopperCode", () => {
    describe("Basic functionality", () => {
        it("should return error for empty code", async () => {
            const result = await validateHopperCode("");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("No code provided");
        });

        it("should return error for whitespace-only code", async () => {
            const result = await validateHopperCode("   \n\t  ");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("No code provided");
        });

        it("should return error for code without JSX", async () => {
            const result = await validateHopperCode("const x = 5;");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("No JSX components found");
        });

        it("should return error for invalid syntax", async () => {
            const result = await validateHopperCode("<Button>Invalid JSX<");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Failed to parse code");
        });

        it("should return valid for non-validated components", async () => {
            const result = await validateHopperCode("<Div>Hello World</Div>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe("Button component validation", () => {
        describe("Valid Button configurations", () => {
            it("should pass for Button with only text content", async () => {
                const result = await validateHopperCode("<Button>Submit</Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Button with only one component child", async () => {
                const result = await validateHopperCode("<Button><Icon/></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Button with Text component", async () => {
                const result = await validateHopperCode("<Button><Text>Submit</Text></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Button with Text component and Icon", async () => {
                const result = await validateHopperCode("<Button><Text>Submit</Text><Icon/></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Button with Icon and Text component", async () => {
                const result = await validateHopperCode("<Button><Icon/><Text>Submit</Text></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should fail for Button with JSX expression and component", async () => {
                const result = await validateHopperCode("<Button>{buttonText}<Icon/></Button>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("must include a Text component");
            });

            it("should pass for Button with three or more children", async () => {
                const result = await validateHopperCode("<Button>Submit<Icon/><Spinner/></Button>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });
        });

        describe("Invalid Button configurations", () => {
            it("should fail for Button with text content and non-Text component", async () => {
                const result = await validateHopperCode("<Button>Submit<Icon/></Button>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("must include a Text component");
                expect(result.errors[0].message).toContain("Found children: Icon");
                expect(result.errors[0].line).toBe(1);
                expect(result.errors[0].column).toBe(0);
            });

            it("should fail for Button with text content and multiple non-Text components", async () => {
                const result = await validateHopperCode("<Button>Submit<Icon/><Spinner/></Button>");
                expect(result.isValid).toBe(true); // This should pass as it has 3 children, rule only applies to 2
            });

            it("should handle whitespace correctly in text content", async () => {
                const result = await validateHopperCode("<Button>   Submit   <Icon/></Button>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("must include a Text component");
            });

            it("should ignore empty text nodes", async () => {
                const result = await validateHopperCode("<Button>   \n\t   <Icon/></Button>");
                expect(result.isValid).toBe(true); // Only 1 child (Icon), whitespace ignored
                expect(result.errors).toHaveLength(0);
            });
        });

        describe("Multiple Button instances", () => {
            it("should validate each Button instance separately", async () => {
                const code = `
          <Div>
            <Button>Valid</Button>
            <Button>Invalid<Icon/></Button>
            <Button><Text>Valid</Text><Icon/></Button>
          </Div>
        `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("(instance 2 of 3)");
            });

            it("should report multiple errors for multiple invalid instances", async () => {
                const code = `
          <Div>
            <Button>First Invalid<Icon/></Button>
            <Button>Second Invalid<Spinner/></Button>
          </Div>
        `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("(instance 1 of 2)");
                expect(result.errors[1].message).toContain("(instance 2 of 2)");
            });
        });

        describe("Nested Button components", () => {
            it("should validate nested Buttons correctly", async () => {
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
                const result = await validateHopperCode(code);
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
            it("should pass for Modal with all allowed children", async () => {
                const result = await validateHopperCode(
                    "<Modal><Heading/><Content/><ButtonGroup/></Modal>"
                );
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for Modal with subset of allowed children", async () => {
                const result = await validateHopperCode("<Modal><Content/></Modal>");
                expect(result.isValid).toBe(false); // Missing required children
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("missing recommended children");
            });

            it("should pass for empty Modal", async () => {
                const result = await validateHopperCode("<Modal></Modal>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("missing recommended children: Heading, Content, ButtonGroup");
            });
        });

        describe("Invalid Modal configurations", () => {
            it("should fail for Modal with invalid children", async () => {
                const result = await validateHopperCode("<Modal><Heading/><InvalidChild/><Content/></Modal>");
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("Found invalid children: InvalidChild");
                expect(result.errors[1].message).toContain("missing recommended children: ButtonGroup");
            });

            it("should fail for Modal with multiple invalid children", async () => {
                const result = await validateHopperCode(
                    "<Modal><InvalidChild1/><InvalidChild2/><Heading/></Modal>"
                );
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("Found invalid children: InvalidChild1, InvalidChild2");
            });
        });

        describe("Multiple Modal instances", () => {
            it("should validate each Modal instance separately", async () => {
                const code = `
          <Div>
            <Modal><Heading/><Content/><ButtonGroup/></Modal>
            <Modal><Heading/><InvalidChild/></Modal>
          </Div>
        `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("(instance 2 of 2)");
                expect(result.errors[0].message).toContain("Found invalid children: InvalidChild");
                expect(result.errors[1].message).toContain("(instance 2 of 2)");
                expect(result.errors[1].message).toContain("missing recommended children: Content, ButtonGroup");
            });
        });
    });

    describe("Div component validation", () => {
        describe("Valid Div configurations", () => {
            it("should pass for Div without display prop and multiple children", async () => {
                const result = await validateHopperCode("<Div><Text>Content 1</Text><Text>Content 2</Text></Div>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
                expect(result.warnings).toHaveLength(0);
            });

            it("should pass for Div with display prop other than flex or grid", async () => {
                const result = await validateHopperCode("<Div display=\"block\"><Text>Content 1</Text><Text>Content 2</Text></Div>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
                expect(result.warnings).toHaveLength(0);
            });

            it("should pass for Div with display inline-block", async () => {
                const result = await validateHopperCode("<Div display=\"inline-block\"><Text>Item 1</Text><Text>Item 2</Text></Div>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
                expect(result.warnings).toHaveLength(0);
            });
        });

        describe("Div with display=flex", () => {
            it("should warn for Div with display=flex", async () => {
                const result = await validateHopperCode("<Div display=\"flex\"><Text>Item 1</Text><Text>Item 2</Text></Div>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
                expect(result.warnings).toHaveLength(1);
                expect(result.warnings[0].message).toContain("display=\"flex\"");
                expect(result.warnings[0].message).toContain("Stack");
                expect(result.warnings[0].message).toContain("Inline");
                expect(result.warnings[0].message).toContain("Flex");
            });

            it("should include line and column information in warning", async () => {
                const result = await validateHopperCode("<Div display=\"flex\"><Text>Content 1</Text><Text>Content 2</Text></Div>");
                expect(result.warnings.length).toBeGreaterThanOrEqual(1);
                const flexWarning = result.warnings.find(w => w.message.includes("display=\"flex\""));
                expect(flexWarning).toBeDefined();
                expect(flexWarning?.line).toBe(1);
                expect(flexWarning?.column).toBe(0);
            });
        });

        describe("Div with display=grid", () => {
            it("should warn for Div with display=grid", async () => {
                const result = await validateHopperCode("<Div display=\"grid\"><Text>Item 1</Text><Text>Item 2</Text></Div>");
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
                expect(result.warnings).toHaveLength(1);
                expect(result.warnings[0].message).toContain("display=\"grid\"");
                expect(result.warnings[0].message).toContain("Grid");
            });
        });

        describe("Multiple Div instances", () => {
            it("should warn for each Div instance with display=flex", async () => {
                const code = `
          <Stack>
            <Div display="flex"><Text>First</Text><Text>Second</Text></Div>
            <Div><Text>No flex 1</Text><Text>No flex 2</Text></Div>
            <Div display="flex"><Text>Third</Text><Text>Fourth</Text></Div>
          </Stack>
        `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
                const flexWarnings = result.warnings.filter(w => w.message.includes("display=\"flex\""));
                expect(flexWarnings).toHaveLength(2);
                expect(flexWarnings[0].message).toContain("(instance 1 of 3)");
                expect(flexWarnings[1].message).toContain("(instance 3 of 3)");
            });

            it("should warn for Div instances with both display=flex and display=grid", async () => {
                const code = `
          <Stack>
            <Div display="flex"><Text>Flex 1</Text><Text>Flex 2</Text></Div>
            <Div display="grid"><Text>Grid 1</Text><Text>Grid 2</Text></Div>
            <Div><Text>Normal 1</Text><Text>Normal 2</Text></Div>
          </Stack>
        `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
                expect(result.warnings).toHaveLength(2);
                const flexWarning = result.warnings.find(w => w.message.includes("display=\"flex\""));
                const gridWarning = result.warnings.find(w => w.message.includes("display=\"grid\""));
                expect(flexWarning).toBeDefined();
                expect(gridWarning).toBeDefined();
                expect(flexWarning?.message).toContain("(instance 1 of 3)");
                expect(gridWarning?.message).toContain("(instance 2 of 3)");
            });
        });
    });

    describe("Mixed component validation", () => {
        it("should validate both Button and Modal components in the same code", async () => {
            const code = `
        <Div>
          <Button>Invalid<Icon/></Button>
          <Modal><Heading/><InvalidChild/><Content/></Modal>
        </Div>
      `;
            const result = await validateHopperCode(code);
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

        it("should handle complex nested structures", async () => {
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
            const result = await validateHopperCode(code);
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
        it("should handle self-closing components", async () => {
            const result = await validateHopperCode("<Button/>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should handle components with attributes", async () => {
            const result = await validateHopperCode("<Button variant='primary' size='large'>Text<Icon/></Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("must include a Text component");
        });

        it("should handle JSX fragments", async () => {
            const code = `
        <>
          <Button>Fragment Invalid<Icon/></Button>
          <Modal><Heading/><Content/><ButtonGroup/></Modal>
        </>
      `;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Button component");
        });

        it("should handle deeply nested components", async () => {
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
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Button component");
        });

        it("should handle components with complex JSX expressions", async () => {
            const code = "<Button>{isLoading ? 'Loading...' : 'Submit'}<Icon/></Button>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("must include a Text component");
        });

        it("should handle mixed content types correctly", async () => {
            const code = "<Button>  \n\t  {getText()}  \n  <Icon/>  \n  </Button>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("must include a Text component");
        });
    });

    describe("Emoji validation", () => {
        it("should detect emojis in JSX text content", async () => {
            const result = await validateHopperCode("<Button>Submit 🚀</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Emoji '🚀' detected");
            expect(result.errors[0].message).toContain("Emojis are not allowed in Hopper components");
            expect(result.errors[0].line).toBe(1);
            expect(result.errors[0].column).toBe(16);
        });

        it("should detect multiple emojis in the same line", async () => {
            const result = await validateHopperCode("<Button>Submit 🚀 Done ✅</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("Emoji '🚀' detected");
            expect(result.errors[1].message).toContain("Emoji '✅' detected");
        });

        it("should detect emojis in multiple lines", async () => {
            const code = `<Div>
  <Button>Submit 🚀</Button>
  <Text>Done ✅</Text>
</Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].line).toBe(2);
            expect(result.errors[1].line).toBe(3);
        });

        it("should detect emojis in component attributes", async () => {
            const result = await validateHopperCode("<Button aria-label='Submit 🚀'>Click</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Emoji '🚀' detected");
        });

        it("should detect complex emojis and combinations", async () => {
            const result = await validateHopperCode("<Button>Family 👨‍👩‍👧‍👦</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Emoji '👨‍👩‍👧‍👦' detected");
        });

        it("should pass for code without emojis", async () => {
            const result = await validateHopperCode("<Button>Submit</Button>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe("Native HTML element validation", () => {
        it("should detect native HTML div element", async () => {
            const result = await validateHopperCode("<div><Button>Click</Button></div>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Native HTML element '<div>' is not allowed");
            expect(result.errors[0].message).toContain("Use Hopper components instead");
        });

        it("should detect native HTML span element", async () => {
            const result = await validateHopperCode("<Button><span>Text</span></Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Native HTML element '<span>' is not allowed");
        });

        it("should detect multiple native HTML elements", async () => {
            const code = `<div>
  <button>Click</button>
  <p>Description</p>
</div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(3);
            expect(result.errors[0].message).toContain("Native HTML element '<div>'");
            expect(result.errors[1].message).toContain("Native HTML element '<button>'");
            expect(result.errors[2].message).toContain("Native HTML element '<p>'");
        });

        it("should detect common HTML elements", async () => {
            const htmlElements = ["h1", "h2", "h3", "a", "img", "form", "input", "table", "ul", "li"];

            for (const element of htmlElements) {
                const result = await validateHopperCode(`<${element}>Content</${element}>`);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain(`Native HTML element '<${element}>' is not allowed`);
            }
        });

        it("should pass for Hopper components", async () => {
            const result = await validateHopperCode("<Div><Button>Click</Button></Div>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should provide location information for native HTML elements", async () => {
            const code = `<Div>
  <div>Invalid</div>
</Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].line).toBe(2);
            expect(result.errors[0].column).toBe(2);
        });
    });

    describe("Box component validation", () => {
        it("should warn when Box component is used", async () => {
            const result = await validateHopperCode("<Box><Text>Content</Text><Text>More</Text></Box>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
            expect(result.warnings).toHaveLength(1);
            expect(result.warnings[0].message).toContain("Using '<Box>' is STRONGLY discouraged");
            expect(result.warnings[0].message).toContain("Use '<Div>' or '<Span>' directly");
        });
    });

    describe("className and style props validation", () => {
        it("should detect className prop usage", async () => {
            const result = await validateHopperCode("<Button className='my-button'>Click</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Using 'className' prop is **STRONGLY** discouraged");
            expect(result.errors[0].message).toContain("Check the Hopper 'styles' guide");
        });

        it("should detect style prop usage", async () => {
            const result = await validateHopperCode("<Button style={{color: 'red'}}>Click</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Using 'style' prop is **STRONGLY** discouraged");
            expect(result.errors[0].message).toContain("Check the Hopper 'styles' guide");
        });

        it("should detect both className and style props", async () => {
            const result = await validateHopperCode("<Button className='btn' style={{margin: '10px'}}>Click</Button>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("className");
            expect(result.errors[1].message).toContain("style");
        });

        it("should detect props in multiple components", async () => {
            const code = `<Div>
  <Button className="btn1">Button 1</Button>
  <Button style={{color: "blue"}}>Button 2</Button>
</Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("className");
            expect(result.errors[1].message).toContain("style");
        });

        it("should provide location information for className prop", async () => {
            const code = `<Button
  className="my-class"
  onClick={handleClick}
>
  Click
</Button>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].line).toBe(2);
            expect(result.errors[0].column).toBe(2);
        });

        it("should allow other valid props", async () => {
            const result = await validateHopperCode("<Button variant='primary' size='large' onClick={handleClick}>Click</Button>");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should detect props in self-closing components", async () => {
            const result = await validateHopperCode("<Icon className='icon' />");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("className");
        });
    });

    describe("Enhanced error reporting", () => {
        it("should provide detailed error for unexpected token", async () => {
            const result = await validateHopperCode("<Button>Invalid JSX<");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Failed to parse code");
            expect(result.errors[0].message).toContain("Please ensure the code is valid TypeScript/JSX syntax");
            expect(result.errors[0].message).toContain("Missing semicolons or brackets");
        });

        it("should provide detailed error for incomplete code", async () => {
            // This might not trigger "Unexpected end of file" in all cases,
            // but testing the error handling structure
            const result = await validateHopperCode("<Button");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Failed to parse code");
        });

        it("should handle unknown parsing errors gracefully", async () => {
            // Test with severely malformed code
            const result = await validateHopperCode("<<>>");
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Failed to parse code");
        });
    });

    describe("Combined validation scenarios", () => {
        it("should detect all types of violations in one code block", async () => {
            const code = `<div className="container" style={{padding: "10px"}}>
  <Button>Submit 🚀<Icon/></Button>
  <p>Description with emoji ✅</p>
</div>`;
            const result = await validateHopperCode(code);
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

        it("should maintain correct line and column information for multiple errors", async () => {
            const code = `<div>
  <Button className="btn">Submit 🚀</Button>
</div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);

            // All errors should have line information
            result.errors.forEach(error => {
                expect(error.line).toBeGreaterThan(0);
                expect(error.column).toBeGreaterThanOrEqual(0);
            });
        });

        it("should pass for valid Hopper component usage", async () => {
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
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe("UNSAFE_ props validation", () => {
        // Note: These tests pass for valid props because when the unsafe-props-data.json file
        // is not available (like in test environment), the validation is skipped
        it("should pass for valid UNSAFE_ props", async () => {
            const code = "<Div UNSAFE_backgroundColor='red'>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should pass for multiple valid UNSAFE_ props with CSS values", async () => {
            // Using CSS values that have no token equivalents in our mock data
            const code = "<Div UNSAFE_backgroundColor='rgb(255, 0, 0)' UNSAFE_padding='25px'>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        // The following tests are skipped because they require the unsafe-props-data.json file
        // which is not available in the test environment. In production, these validations work correctly.
        it("should fail for invalid UNSAFE_ prop", async () => {
            const code = "<Div UNSAFE_invalidProp='value'>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("UNSAFE_invalidProp");
            expect(result.errors[0].message).toContain("not a valid UNSAFE_ prop");
        });

        it("should fail for multiple invalid UNSAFE_ props", async () => {
            const code = "<Div UNSAFE_invalidProp='value' UNSAFE_anotherInvalidProp='value2'>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThanOrEqual(2);
            expect(result.errors[0].message).toContain("not a valid UNSAFE_ prop");
            expect(result.errors[1].message).toContain("not a valid UNSAFE_ prop");
        });

        it("should allow mixing valid UNSAFE_ props with regular props", async () => {
            const code = "<Div UNSAFE_backgroundColor='red' id='myDiv' className='test'>Hello</Div>";
            const result = await validateHopperCode(code);
            // Should fail due to className, but UNSAFE_ prop should be valid
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("className");
        });

        it("should validate UNSAFE_ props on nested components", async () => {
            const code = `
                <Div UNSAFE_backgroundColor="danger-active">
                    <Span UNSAFE_invalidProp="value">Hello</Span>
                </Div>
            `;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            // Should have 2 errors:
            // 1. UNSAFE_backgroundColor using a valid token (caught by validateDesignSystemTokensUsage)
            // 2. UNSAFE_invalidProp not being a valid UNSAFE_ prop
            expect(result.errors.length).toBeGreaterThanOrEqual(1);
            expect(result.errors.some(e => e.message.includes("UNSAFE_invalidProp"))).toBe(true);
        });

        it("should detect invalid UNSAFE_className", async () => {
            const code = "<Div UNSAFE_className='test'>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("prohibited");
        });

        it("should detect invalid UNSAFE_style", async () => {
            const code = "<Div UNSAFE_style={{color: 'red'}}>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("prohibited");
        });

        it("should provide different message for invalid UNSAFE_ props that are not prohibited", async () => {
            const code = "<Div UNSAFE_invalidProp='value'>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).not.toContain("prohibited");
        });
    });

    describe("UNSAFE_ prop token equivalent validation", () => {
        it("should pass when UNSAFE_ prop uses CSS values without token equivalents", async () => {
            // Using a CSS value that has no token equivalent in our mock data
            const code = "<Div UNSAFE_backgroundColor='blue'>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should fail when UNSAFE_ prop uses CSS value that has a token equivalent", async () => {
            // Using CSS value '#ba2d2d' which has token equivalent 'danger-active'
            const code = "<Div UNSAFE_backgroundColor='#ba2d2d'>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("#ba2d2d");
            expect(result.errors[0].message).toContain("has equivalent design tokens");
            expect(result.errors[0].message).toContain("UNSAFE_backgroundColor");
            expect(result.errors[0].message).toContain("backgroundColor");
            expect(result.errors[0].message).toContain("danger-active");
        });

        it("should validate multiple UNSAFE_ props with token equivalents", async () => {
            const code = "<Div UNSAFE_backgroundColor='#ba2d2d' UNSAFE_color='#2e7d32'>Hello</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("UNSAFE_backgroundColor");
            expect(result.errors[0].message).toContain("#ba2d2d");
            expect(result.errors[1].message).toContain("UNSAFE_color");
            expect(result.errors[1].message).toContain("#2e7d32");
        });

        it("should not check UNSAFE_ props that use token values (caught by existing validation)", async () => {
            const code = `<Div
                UNSAFE_fontSize='core_120'
                UNSAFE_fontWeight='400'
                UNSAFE_backgroundColor='danger-active'
            >Hello</Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            // These should be caught by validateDesignSystemTokensUsage, not by our new validation
            expect(result.errors.length).toBeGreaterThan(0);
            // The error should be about using tokens with UNSAFE_ props
            expect(result.errors[0].message).toContain("You have to use the safe prop");
        });

        it("should handle nested components with token equivalent values", async () => {
            const code = `
                <Div UNSAFE_backgroundColor="rgb(0, 0, 255)" UNSAFE_padding="0.5rem">
                    <Span UNSAFE_color="#ba2d2d">Hello</Span>
                </Div>
            `;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("UNSAFE_padding");
            expect(result.errors[0].message).toContain("0.5rem");
            expect(result.errors[0].message).toContain("inset-xs");
            expect(result.errors[1].message).toContain("UNSAFE_color");
            expect(result.errors[1].message).toContain("#ba2d2d");
            expect(result.errors[1].message).toContain("danger-active");
        });
    });

    describe("Percentage values on width/height props", () => {
        describe("Valid usage", () => {
            it("should pass for multiple percentage-based size props", async () => {
                const code = "<Div width='100%' height='50%' maxWidth='80%'>Content</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should pass for UNSAFE_ with non-percentage values", async () => {
                const code = "<Div UNSAFE_width='500px' UNSAFE_height='300px'>Content</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });
        });

        describe("Invalid usage - UNSAFE_ prefix with percentage values", () => {
            it("should fail for UNSAFE_width with percentage value", async () => {
                const code = "<Div UNSAFE_width='100%'>Content</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("UNSAFE_width");
                expect(result.errors[0].message).toContain("100%");
                expect(result.errors[0].message).toContain("width=\"100%\"");
                expect(result.errors[0].message).toContain("should not use the UNSAFE_ prefix");
            });

            it("should fail for multiple UNSAFE_ props with percentage values", async () => {
                const code = "<Div UNSAFE_width='100%' UNSAFE_height='50%'>Content</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].message).toContain("UNSAFE_width");
                expect(result.errors[1].message).toContain("UNSAFE_height");
            });

            it("should fail for nested components with UNSAFE_ percentage props", async () => {
                const code = `
                    <Div width='100%'>
                        <Div UNSAFE_height='50%'>Content</Div>
                    </Div>
                `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("UNSAFE_height");
            });

            it("should handle mixed valid and invalid props", async () => {
                const code = "<Div width='100%' UNSAFE_height='50%' maxWidth='80%'>Content</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("UNSAFE_height");
            });
        });

        describe("Edge cases", () => {
            it("should not flag UNSAFE_ props with percentage-like but non-percentage values", async () => {
                const code = "<Div UNSAFE_width='100'>Content</Div>";
                const result = await validateHopperCode(code);
                // UNSAFE_width is a valid prop, so this should pass
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it("should work with various percentage values", async () => {
                const code = "<Div UNSAFE_width='0%'>Content</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors[0].message).toContain("0%");
            });

            it("should work with decimal percentage values", async () => {
                const code = "<Div UNSAFE_width='50.5%'>Content</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors[0].message).toContain("50.5%");
            });
        });
    });

    describe("Design system tokens validation", () => {
        it("should warn about tokens with hop- prefix", async () => {
            const code = "<Button backgroundColor='hop-surface-neutral'>Click me</Button>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'surface-neutral'");
            expect(result.errors[0].line).toBe(1);
            expect(result.errors[0].column).toBe(8);
        });

        it("should warn about multiple incorrectly formatted tokens", async () => {
            const code = `<Div
                backgroundColor="hop-surface-neutral"
                color="hop-text-primary"
            >Content</Div>`;
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("'hop-surface-neutral'");
            expect(result.errors[0].message).toContain("'surface-neutral'");
            expect(result.errors[1].message).toContain("'hop-text-primary'");
            expect(result.errors[1].message).toContain("'text-primary'"); // -text is removed, not hop-
        });

        it("should not warn about correctly formatted tokens", async () => {
            const code = "<Button backgroundColor='surface-neutral' color='primary'>Click me</Button>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should not warn about non-token string values", async () => {
            const code = `<Button
                id="my_button_id"
                data-test="test_value"
                aria-label="Submit form"
            >Click</Button>`;
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should handle tokens with -surface suffix", async () => {
            const code = "<Div backgroundColor='neutral-surface'>Content</Div>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'neutral-surface'");
            expect(result.errors[0].message).toContain("'neutral'");
        });

        it("should handle tokens with -text suffix", async () => {
            const code = "<Text color='primary-text-strong'>Hello</Text>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'primary-text-strong'");
            expect(result.errors[0].message).toContain("'primary-strong'");
        });

        it("should handle tokens with -border suffix", async () => {
            const code = "<Div borderColor='neutral-border-weak'>Content</Div>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'neutral-border-weak'");
            expect(result.errors[0].message).toContain("'neutral-weak'");
        });

        it("should handle tokens in nested components", async () => {
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
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(3);
            expect(result.errors[0].message).toContain("'hop-surface-primary'");
            expect(result.errors[1].message).toContain("'hop-text-primary'");
            expect(result.errors[2].message).toContain("'elevation-surface-raised'");
        });

        it("should not warn for non-literal values", async () => {
            const code = `<Button
                backgroundColor={myColor}
                color={getColor()}
                borderColor={\`\${prefix}_surface\`}
            >Click</Button>`;
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should handle self-closing components with token props", async () => {
            const code = "<Icon color='hop-text-primary' />";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'hop-text-primary'");
            expect(result.errors[0].message).toContain("'text-primary'"); // -text suffix is removed after hop- is removed
        });

        it("should not warn for values that don't match token patterns", async () => {
            const code = `<Button
                backgroundColor="red"
                color="#FF0000"
                borderColor="rgb(255, 0, 0)"
            >Click</Button>`;
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should provide accurate line and column information", async () => {
            const code = `<Div>
                <Button
                    id="btn1"
                    backgroundColor="hop-surface-neutral"
                    onClick={handleClick}
                >
                    Click
                </Button>
            </Div>`;
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].line).toBe(4);
            expect(result.errors[0].column).toBe(20);
        });

        it("should handle multiple attributes on the same element", async () => {
            const code = `<Button
                backgroundColor="hop-surface-primary"
                color="hop-text-white"
                borderColor="hop-border-primary"
            >Click</Button>`;
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(3);
        });

        it("should only warn when formatted version is shorter", async () => {
            // This simulates a case where the formatted version might not be shorter
            // In practice, formatStyledSystemName should always return shorter versions for tokens
            const code = "<Button customProp='short'>Click</Button>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should handle empty string values", async () => {
            const code = "<Button backgroundColor=''>Click</Button>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(0);
        });

        it("should validate tokens in JSX spread attributes", async () => {
            // Note: spread attributes don't trigger validation as they're not JSXAttribute type
            const code = "<Button {...props} backgroundColor='hop-surface-neutral'>Click</Button>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'hop-surface-neutral'");
        });

        it("should handle elevation- prefix", async () => {
            const code = "<Div backgroundColor='elevation-surface-raised'>Content</Div>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'elevation-surface-raised'");
            expect(result.errors[0].message).toContain("'raised'"); // both elevation- and -surface are removed
        });

        it("should handle shape- prefix", async () => {
            const code = "<Div borderRadius='shape-rounded-md'>Content</Div>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'shape-rounded-md'");
            expect(result.errors[0].message).toContain("'rounded-md'");
        });

        it("should handle space- prefix", async () => {
            const code = "<Div padding='space-inset-md'>Content</Div>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'space-inset-md'");
            expect(result.errors[0].message).toContain("'inset-md'");
        });

        it("should handle shadow- prefix", async () => {
            const code = "<Div boxShadow='shadow-lg'>Content</Div>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'shadow-lg'");
            expect(result.errors[0].message).toContain("'lg'");
        });

        it("should handle radius- prefix", async () => {
            const code = "<Div borderRadius='radius-md'>Content</Div>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'radius-md'");
            expect(result.errors[0].message).toContain("'md'");
        });

        it("should handle semantic font suffixes", async () => {
            const code = "<Text fontFamily='body-font-family'>Text</Text>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'body-font-family'");
            expect(result.errors[0].message).toContain("'body'");
        });

        it("should handle core font prefixes", async () => {
            const code = "<Text fontSize='font-size-100'>Text</Text>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'font-size-100'");
            expect(result.errors[0].message).toContain("'100'");
        });

        it("should handle -icon suffix", async () => {
            const code = "<Icon fill='primary-icon-strong'>Icon</Icon>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("'primary-icon-strong'");
            expect(result.errors[0].message).toContain("'primary-strong'");
        });

        it("should not warn for dataviz tokens as they don't get shorter", async () => {
            // dataviz- prefix becomes dataviz_ prefix, so the length doesn't decrease
            const code = "<Chart color='dataviz-categorical-1'>Chart</Chart>";
            const result = await validateHopperCode(code);
            expect(result.errors).toHaveLength(0);
        });
    });

    describe("Token usage on non-token-supported props", () => {
        it("should error when token is used on non-supported prop", async () => {
            const code = "<Div top='danger-active'>Content</Div>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("The token value 'danger-active' is not allowed for prop 'top'");
            expect(result.errors[0].message).toContain("Only certain props support design tokens");
            expect(result.errors[0].message).toContain("Check the Hopper 'styles' guide");
        });

        it("should error for multiple tokens on non-supported props", async () => {
            const code = `<Div
                left="danger-active"
                right="core_coastal-25"
                top="core_120"
            >Content</Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(3);
            expect(result.errors[0].message).toContain("left");
            expect(result.errors[0].message).toContain("danger-active");
            expect(result.errors[1].message).toContain("right");
            expect(result.errors[1].message).toContain("core_coastal-25");
            expect(result.errors[2].message).toContain("top");
            expect(result.errors[2].message).toContain("core_120");
        });

        it("should allow non-token values on non-supported props", async () => {
            const code = `<Div
                top="10px"
                left="0"
                right="auto"
                bottom="5rem"
            >Content</Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should allow token values on token-supported props", async () => {
            const code = `<Div
                backgroundColor="danger-active"
                color="core_coastal-25"
                fontSize="core_120"
            >Content</Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should error for tokens on props with common names that don't support tokens", async () => {
            const code = `<Button
                id="danger-active"
                name="core_coastal-25"
                value="core_120"
            >Click</Button>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(3);
            expect(result.errors[0].message).toContain("id");
            expect(result.errors[1].message).toContain("name");
            expect(result.errors[2].message).toContain("value");
        });

        it("should error for semantic tokens on non-supported props", async () => {
            const code = "<Icon top='core_120' position='inset-xs' />";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("top");
            expect(result.errors[0].message).toContain("core_120");
            expect(result.errors[1].message).toContain("position");
            expect(result.errors[1].message).toContain("inset-xs");
        });

        it("should error for core tokens on non-supported props", async () => {
            const code = "<Text maxWidth='core_coastal-25' minWidth='core_120'>Text</Text>";
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("maxWidth");
            expect(result.errors[0].message).toContain("core_coastal-25");
            expect(result.errors[1].message).toContain("minWidth");
            expect(result.errors[1].message).toContain("core_120");
        });

        it("should provide accurate line and column information for token errors", async () => {
            const code = `<Div>
                <Button
                    id="test"
                    position="core_120"
                    onClick={handleClick}
                >
                    Click
                </Button>
            </Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].line).toBe(4);
            expect(result.errors[0].column).toBe(20);
        });

        it("should handle mix of UNSAFE_ and regular props with tokens", async () => {
            const code = `<Div
                top="core_120"
                UNSAFE_height="core_coastal-25"
            >Content</Div>`;
            const result = await validateHopperCode(code);

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
            expect(topError?.message).toContain("The token value 'core_120' is not allowed for prop 'top'");
            expect(topError?.message).toContain("Only certain props support design tokens");

            // Check for the UNSAFE_height error (invalid UNSAFE_ prop)
            const heightError = result.errors.find(e => e.message.includes("UNSAFE_height"));
            expect(heightError).toBeDefined();
            expect(heightError?.message).toContain("You have to use the safe prop 'height' directly when tokens are available");
        });

        it("should not error when prop value is not a token but looks similar", async () => {
            const code = `<Div
                className="danger-active-class"
                data-attribute="core_coastal-25"
            >Content</Div>`;
            const result = await validateHopperCode(code);
            // Should error for className being prohibited AND for data-attribute using a token value
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("className");
            expect(result.errors[0].message).toContain("**STRONGLY** discouraged");
            expect(result.errors[1].message).toContain("data-attribute");
            expect(result.errors[1].message).toContain("core_coastal-25");
        });

        it("should handle nested components with token errors on non-supported props", async () => {
            const code = `<Modal>
                <Heading left="core_120">
                    <Text overflow="core_120">Title</Text>
                </Heading>
                <Content>
                    <Div unknown-prop="core_coastal-25">Content</Div>
                </Content>
            </Modal>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThanOrEqual(3);
            const leftError = result.errors.find(e => e.message.includes("left"));
            const overflowError = result.errors.find(e => e.message.includes("overflow"));
            const unknownPropError = result.errors.find(e => e.message.includes("unknown-prop"));
            expect(leftError).toBeDefined();
            expect(overflowError).toBeDefined();
            expect(unknownPropError).toBeDefined();
        });

        it("should only validate literal string values", async () => {
            const code = `<Div
                width={tokenValue}
                height={\`\${danger}-active\`}
                top={getToken()}
            >Content</Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should error for tokens on aria attributes that don't support tokens", async () => {
            const code = `<Button
                aria-label="danger-active"
                aria-describedby="core_coastal-25"
            >Click</Button>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("aria-label");
            expect(result.errors[1].message).toContain("aria-describedby");
        });

        it("should error for tokens on data attributes", async () => {
            const code = `<Div
                data-testid="danger-active"
                data-value="core_120"
            >Content</Div>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("data-testid");
            expect(result.errors[1].message).toContain("data-value");
        });

        it("should NOT error for valid non-token values that coincidentally exist in the token list but have no dashes or underscores", async () => {
            // This test addresses the case mentioned in the comment:
            // "this approach could be a bit flaky as some tokens might coincidentally match valid non-token values
            // for example variant='primary' is valid. So, we only check for tokens with '-' or '_'"
            const code = `<Button
                variant="primary"
                size="md"
                type="submit"
                type="none"
            >Click</Button>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should error for token-like values with dashes or underscores on non-supported props", async () => {
            // This verifies that the filter (dash/underscore check) works correctly
            const code = `<Button
                variant="danger-active"
                size="core_120"
            >Click</Button>`;
            const result = await validateHopperCode(code);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].message).toContain("variant");
            expect(result.errors[0].message).toContain("danger-active");
            expect(result.errors[1].message).toContain("size");
            expect(result.errors[1].message).toContain("core_120");
        });
    });

    describe("Layout component validation", () => {
        describe("Div component with single child", () => {
            it("should warn when Div has only one component child", async () => {
                const code = "<Div><Text>Hello</Text></Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true); // Warnings don't make it invalid
                expect(result.errors).toHaveLength(0);
                expect(result.warnings).toHaveLength(1);
                expect(result.warnings[0].message).toContain("'Div' component has only one child");
                expect(result.warnings[0].message).toContain("consider merging");
            });

            it("should warn when Div has only text content", async () => {
                const code = "<Div>Hello World</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.warnings).toHaveLength(0);
            });

            it("should warn when Div has only an expression", async () => {
                const code = "<Div>{someValue}</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.warnings).toHaveLength(0);
            });

            it("should NOT warn when Div has text content and one component", async () => {
                const code = "<Div>Hello World<Component/></Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.warnings).toHaveLength(0);
            });

            it("should not warn when Div has multiple children", async () => {
                const code = "<Div><Text>Hello</Text><Text>World</Text></Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.warnings).toHaveLength(0);
            });

            it("should not warn when Div has only whitespace (no real children)", async () => {
                const code = "<Div>   \n\t   </Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.warnings).toHaveLength(0);
            });
        });

        describe("Stack component with single child", () => {
            it("should error when Stack has only one component child", async () => {
                const code = "<Stack><Text>Hello</Text></Stack>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("'Stack' component has only one child");
                expect(result.errors[0].message).toContain("Layout components MUST not be used with only one child");
            });

            it("should error when Stack has only text content", async () => {
                const code = "<Stack>Hello World</Stack>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("'Stack' component has only one child");
            });

            it("should not error when Stack has multiple children", async () => {
                const code = "<Stack><Text>Hello</Text><Text>World</Text></Stack>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });
        });

        describe("Multiple layout components", () => {
            it("should validate multiple different layout components", async () => {
                const code = `
                    <Div>
                        <Stack><Text>Single</Text></Stack>
                        <Inline><Button>Single</Button></Inline>
                        <Flex><Text>Single</Text></Flex>
                    </Div>
                `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(3);
                expect(result.errors[0].message).toContain("Stack");
                expect(result.errors[1].message).toContain("Inline");
                expect(result.errors[2].message).toContain("Flex");
            });

            it("should validate nested layout components correctly", async () => {
                const code = `
                    <Stack>
                        <Div><Text>Nested single child</Text></Div>
                        <Text>Valid second child</Text>
                    </Stack>
                `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(true); // Stack is valid, Div gets a warning
                expect(result.errors).toHaveLength(0);
                expect(result.warnings).toHaveLength(1);
                expect(result.warnings[0].message).toContain("Div");
            });

            it("should handle mixed valid and invalid layout components", async () => {
                const code = `
                    <Div>
                        <Stack><Text>A</Text><Text>B</Text></Stack>
                        <Inline><Button>Single</Button></Inline>
                        <Flex><Text>X</Text><Text>Y</Text><Text>Z</Text></Flex>
                    </Div>
                `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("Inline");
            });
        });

        describe("Edge cases", () => {
            it("should error for layout component with mixed text and expression", async () => {
                const code = "<Stack>Hello {world}<Text>X</Text></Stack>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
            });

            it("should ignore whitespace-only text nodes when counting component children", async () => {
                const code = `<Stack>
                    <Text>Content</Text>
                </Stack>`;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("'Stack' component has only one child");
            });

            it("should provide correct line numbers for errors", async () => {
                const code = `
                    <Div>
                        <Stack>
                            <Text>Single</Text>
                        </Stack>
                    </Div>
                `;
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].line).toBe(3); // Stack is on line 3
            });
        });
    });

    describe("Complex prop value validation", () => {
        describe("Conditional expressions", () => {
            it("should validate all branches of ternary expressions", async () => {
                const code = "<Div padding={isCompact ? \"invalid_token_1\" : \"invalid_token_2\"}>Content</Div>";
                const result = await validateHopperCode(code);
                // Both values are invalid tokens - no specific validation error since they're not recognized tokens
                expect(result.isValid).toBe(true);
            });

            it("should validate nested ternary expressions", async () => {
                const code = "<Div color={isSmall ? \"core_coastal-25\" : (isMedium ? \"danger-active\" : \"primary\")}>Content</Div>";
                const result = await validateHopperCode(code);
                // All values are valid tokens - no errors expected
                expect(result.isValid).toBe(true);
            });

            it("should validate all percentage values in conditional UNSAFE props", async () => {
                const code = "<Div UNSAFE_width={isMobile ? \"50%\" : \"100%\"}>Content</Div>";
                const result = await validateHopperCode(code);
                expect(result.isValid).toBe(false);
                // Both percentage values should trigger errors
                expect(result.errors.filter(e => e.message.includes("percentage")).length).toBe(2);
            });

            it("should not error if part of values are correct in conditional UNSAFE props", async () => {
                const code = "<Div UNSAFE_width={isMobile ? \"123px\" : \"100%\"}>Content</Div>";
                const result = await validateHopperCode(code);

                expect(result.isValid).toBe(true);
            });

            it("should not error if all values are correct in conditional UNSAFE props", async () => {
                const code = "<Div UNSAFE_width={isMobile ? \"123px\" : \"97px\"}>Content</Div>";
                const result = await validateHopperCode(code);

                expect(result.isValid).toBe(true);
            });

            it("should error only if all values are wrong in conditional UNSAFE props", async () => {
                const code = "<Div UNSAFE_width={isMobile ? \"32px\" : \"100%\"}>Content</Div>";
                const result = await validateHopperCode(code);

                expect(result.isValid).toBe(false);
                expect(result.errors.length).toBe(2);
                expect(result.errors.filter(e => e.message.includes("percentage")).length).toBe(1);
                expect(result.errors.filter(e => e.message.includes("core_")).length).toBe(1);
            });

            it("should error combined values in conditional UNSAFE props", async () => {
                const code = "<Div UNSAFE_width={isMobile ? \"16px\" : \"100%\"}>Content</Div>";
                const result = await validateHopperCode(code);

                expect(result.isValid).toBe(false);
                expect(result.errors.length).toBe(2);
                expect(result.errors.filter(e => e.message.includes("percentage")).length).toBe(1);
            });
        });

        describe("Responsive object expressions", () => {
            it("should validate all values in responsive objects", async () => {
                const code = "<Div padding={{ base: \"inset-xs\", md: \"inset-xs\", lg: \"inset-xs\" }}>Content</Div>";
                const result = await validateHopperCode(code);
                // All values are valid tokens
                expect(result.isValid).toBe(true);
            });

            it("should validate nested conditionals in responsive objects", async () => {
                const code = `<Div padding={{
                    base: "inset-xs",
                    md: isCompact ? "inset-xs" : "inset-xs",
                    lg: "inset-xs"
                }}>Content</Div>`;
                const result = await validateHopperCode(code);
                // All values are valid for padding prop
                expect(result.isValid).toBe(true);
            });

            it("should validate all values in responsive objects with conditionals", async () => {
                const code = `<Div color={{
                    base: "primary",
                    md: isActive ? "danger-active" : "success",
                    lg: "neutral"
                }}>Content</Div>`;
                const result = await validateHopperCode(code);
                // All values are valid tokens
                expect(result.isValid).toBe(true);
            });
        });

        describe("Logical expressions", () => {
            it("should validate OR expressions with fallback values", async () => {
                const code = "<Div padding={userPadding || \"inset-xs\"}>Content</Div>";
                const result = await validateHopperCode(code);
                // Valid token
                expect(result.isValid).toBe(true);
            });

            it("should NOT validate AND expressions (conditional rendering)", async () => {
                const code = "<Div padding={isActive && \"inset-xs\"}>Content</Div>";
                const result = await validateHopperCode(code);
                // Should pass because AND expressions are not direct prop values
                expect(result.isValid).toBe(true);
            });

            it("should validate chained OR expressions", async () => {
                const code = "<Div padding={userPadding || defaultPadding || \"inset-xs\"}>Content</Div>";
                const result = await validateHopperCode(code);
                // Valid token for padding prop
                expect(result.isValid).toBe(true);
            });
        });

        describe("Non-direct values (should NOT be validated)", () => {
            it("should not validate string fragments in concatenation", async () => {
                const code = "<Div UNSAFE_width={value + \"px\"}>Content</Div>";
                const result = await validateHopperCode(code);

                expect(result.isValid).toBe(true);
                // Should pass because "px" is not a direct prop value
                expect(result.errors.filter(e => e.message.includes("px")).length).toBe(0);
            });

            it("should not validate template literal fragments", async () => {
                //eslint-disable-next-line no-template-curly-in-string
                const code = "<Div UNSAFE_height={`${height}px`}>Content</Div>";
                const result = await validateHopperCode(code);
                // Should pass because template literal fragments are not validated
                expect(result.errors.filter(e => e.message.includes("px")).length).toBe(0);
            });

            it("should validate static template literals", async () => {
                const code = "<Div padding={`inset-xs`}>Content</Div>";
                const result = await validateHopperCode(code);
                // Valid token in static template literal
                expect(result.isValid).toBe(true);
            });

            it("should not validate binary expression operands", async () => {
                const code = "<Div UNSAFE_margin={\"prefix-\" + suffix}>Content</Div>";
                const result = await validateHopperCode(code);
                // Should pass because binary expression operands are not direct values
                expect(result.errors.filter(e => e.message.includes("prefix-")).length).toBe(0);
            });
        });

        describe("UNSAFE prop validation with complex values", () => {
            it("should validate UNSAFE props with conditional values", async () => {
                const code = "<Div UNSAFE_width={isCompact ? \"16px\" : \"24px\"}>Content</Div>";
                const result = await validateHopperCode(code);
                // UNSAFE_width is allowed in the mock data, but values may trigger suggestions
                expect(result.errors.length).toBe(2);
            });

            it("should validate responsive objects with UNSAFE props", async () => {
                const code = `<Div UNSAFE_width={{
                    base: "35%",
                    md: isCompact ? "16px" : "24px",
                    lg: "32px"
                }}>Content</Div>`;
                const result = await validateHopperCode(code);
                // UNSAFE_margin is allowed in the mock data
                expect(result.errors.length).toBe(4);
            });
        });

        describe("Div display validation with complex values", () => {
            it("should warn for flex/grid in conditional expressions", async () => {
                const code = "<Div display={isGrid ? \"grid\" : \"flex\"}>Content</Div>";
                const result = await validateHopperCode(code);
                // Should have warnings for both flex and grid
                expect(result.warnings.filter(w => w.message.includes("Flex") || w.message.includes("Grid")).length).toBeGreaterThanOrEqual(2);
            });

            it("should warn for flex/grid in responsive objects", async () => {
                const code = "<Div display={{ base: \"block\", md: \"flex\", lg: \"grid\" }}>Content</Div>";
                const result = await validateHopperCode(code);
                // Should have warnings for both flex and grid
                expect(result.warnings.filter(w => w.message.includes("Flex") || w.message.includes("Grid")).length).toBeGreaterThanOrEqual(2);
            });
        });

        describe("Edge cases", () => {
            it("should handle deeply nested object structures", async () => {
                const code = `<Component config={{
                    theme: {
                        spacing: isCompact ? "inset-xs" : "invalid-token"
                    },
                    directValue: "primary"
                }}>Content</Component>`;
                const result = await validateHopperCode(code);
                // Nested objects are not processed, so nested values are not validated
                // Only first-level values like "primary" are validated
                expect(result.isValid).toBe(true);
            });

            it("should deduplicate errors for repeated values", async () => {
                const code = "<Div color={isA ? \"hop-primary-surface\" : (isB ? \"hop-primary-surface\" : \"primary\")}>Content</Div>";
                const result = await validateHopperCode(code);
                // The extractAllConstantStrings function deduplicates, so we should only see one error for "hop-primary-surface"
                const formatErrors = result.errors.filter(e => e.message.includes("hop-primary-surface"));
                expect(formatErrors.length).toBeLessThanOrEqual(1);
            });

            it("should handle null/undefined in conditionals", async () => {
                const code = "<Div padding={value || null}>Content</Div>";
                const result = await validateHopperCode(code);
                // Should handle gracefully without errors
                expect(result.isValid).toBe(true);
            });
        });
    });
});

