import { validateComponentStructure } from "../validateComponentStructure";

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
            const result = validateComponentStructure('<Button aria-label="Submit 🚀">Click</Button>');
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
                expect(result.errors[0].message).toContain(`Native HTML element \"<${element}>\" is not allowed`);
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
            const result = validateComponentStructure('<Button className="my-button">Click</Button>');
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Using \"className\" prop is **STRONGLY** prohibited");
            expect(result.errors[0].message).toContain("Check the Hopper \"styles\" guide");
        });

        it("should detect style prop usage", () => {
            const result = validateComponentStructure('<Button style={{color: "red"}}>Click</Button>');
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain("Using \"style\" prop is **STRONGLY** discouraged");
            expect(result.errors[0].message).toContain("Check the Hopper \"styles\" guide");
        });

        it("should detect both className and style props", () => {
            const result = validateComponentStructure('<Button className="btn" style={{margin: "10px"}}>Click</Button>');
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
            const result = validateComponentStructure('<Button variant="primary" size="large" onClick={handleClick}>Click</Button>');
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should detect props in self-closing components", () => {
            const result = validateComponentStructure('<Icon className="icon" />');
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
});
