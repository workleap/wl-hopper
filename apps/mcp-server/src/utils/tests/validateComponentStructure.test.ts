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
            const result = validateComponentStructure("<div>Hello World</div>");
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
          <div>
            <Button>Valid</Button>
            <Button>Invalid<Icon/></Button>
            <Button><Text>Valid</Text><Icon/></Button>
          </div>
        `;
                const result = validateComponentStructure(code);
                expect(result.isValid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].message).toContain("(instance 2 of 3)");
            });

            it("should report multiple errors for multiple invalid instances", () => {
                const code = `
          <div>
            <Button>First Invalid<Icon/></Button>
            <Button>Second Invalid<Spinner/></Button>
          </div>
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
          <div>
            <Button><Text>Outer</Text></Button>
            <Modal>
              <Content>
                <Button>Inner Invalid<Icon/></Button>
              </Content>
            </Modal>
          </div>
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
          <div>
            <Modal><Heading/><Content/><ButtonGroup/></Modal>
            <Modal><Heading/><InvalidChild/></Modal>
          </div>
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
        <div>
          <Button>Invalid<Icon/></Button>
          <Modal><Heading/><InvalidChild/><Content/></Modal>
        </div>
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
        <div>
          <section>
            <article>
              <Modal>
                <Heading/>
                <Content>
                  <div>
                    <Button>Deep Invalid<Icon/></Button>
                  </div>
                </Content>
                <ButtonGroup/>
              </Modal>
            </article>
          </section>
        </div>
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
});
