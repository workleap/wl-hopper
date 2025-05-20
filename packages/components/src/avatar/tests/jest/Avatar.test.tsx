import { act, mocks, render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Avatar } from "../../src/Avatar.tsx";
import { AvatarContext } from "../../src/AvatarContext.ts";

describe("Avatar", () => {
    it("should render with default class", () => {
        render(<Avatar name="John Doe" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveClass("hop-Avatar");
    });

    it("should support custom class", () => {
        render(<Avatar name="John Doe" className="test" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveClass("hop-Avatar");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Avatar name="John Doe" marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Avatar name="John Doe" data-foo="bar" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <AvatarContext.Provider value={{ slots: { test: { "aria-label": "test", "name": "test" } } }}>
                <Avatar name="John Doe" slot="test" />
            </AvatarContext.Provider>
        );

        const element = screen.getByRole("img", { name: "test" });
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should apply default displayName", () => {
        expect(Avatar.displayName).toBe("Avatar");
    });

    it("should have the provided aria-label if provided", async () => {
        render(
            <Avatar name="Elon Musk" aria-label="Maye Musk" />
        );

        expect(await screen.findByLabelText("Maye Musk")).not.toBeNull();
    });

    it("should have the name as the aria-label if no aria-label is provided", async () => {
        render(
            <Avatar name="Elon Musk" />
        );

        expect(await screen.findByLabelText("Elon Musk")).not.toBeNull();
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Avatar name="John Doe" ref={ref} />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(ref.current).toBe(element);
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
        expect(ref.current?.tagName.toUpperCase()).toBe("DIV");
    });


    it("should render the correct initials when no src is set", () => {
        const initials = "JD";
        render(<Avatar name="John Doe" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveTextContent(initials);
    });

    it("should render only one initial when the Avatar size is xs", () => {
        const initials = "J";
        render(<Avatar name="John Doe" size="xs" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveTextContent(initials);
    });

    it("should support disabled state", () => {
        render(<Avatar
            name="John Doe"
            isDisabled
            className={({ isDisabled }) => (isDisabled ? "disabled" : "")}
        />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveAttribute("data-disabled");
        expect(element).toHaveClass("disabled");
    });
});

describe("Avatar - fallback + loading strategy", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        mocks.image().restore();
    });

    it("should load broken image when src fails and it should support refs", () => {
        const mock = mocks.image();
        mock.simulate(["error"]);
        const ref = createRef<HTMLDivElement>();

        const src = "https://example.com/image.jpg";
        const name = "John Doe";
        const onErrorFn = jest.fn();
        render(<Avatar name={name} src={src} ref={ref} imageProps={{ onError: onErrorFn }} />);
        act(() => {
            jest.runAllTimers();
        });
        const brokenImage = screen.getByRole("img", { name: "John Doe" });

        expect(onErrorFn).toHaveBeenCalledTimes(1);
        expect(ref.current).toBe(brokenImage);
        expect(ref.current).toHaveClass("hop-Avatar--broken-image");
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
        expect(ref.current?.tagName.toUpperCase()).toBe("DIV");
    });

    it("should render fallback image", () => {
        const mock = mocks.image();
        mock.simulate(["error"]);
        const src = "https://example.com/image.jpg";
        const fallbackSrc = "https://i.pravatar.cc/96?img=2";
        const onErrorFn = jest.fn();
        render(<Avatar name="John Doe" src={src} fallbackSrc={fallbackSrc} imageProps={{ onError: onErrorFn }} />);
        act(() => {
            jest.runAllTimers();
        });
        const imageElem = screen.getByAltText("");

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(onErrorFn).toHaveBeenCalledTimes(1);
        expect(element).toHaveClass("hop-Avatar--image");
        expect(imageElem).toHaveAttribute("src", fallbackSrc);
    });

    it("should render broken image if src and fallback src fail", () => {
        const mock = mocks.image();

        // Call error event twice to signify that the fallback also failed
        mock.simulate(["error", "error"]);

        const src = "https://example.com/image.jpg";
        const fallbackSrc = "https://example.com/image2.jpg";
        const onErrorFn = jest.fn();
        render(<Avatar name="John Doe" src={src} fallbackSrc={fallbackSrc} imageProps={{ onError: onErrorFn }} />);
        act(() => {
            jest.runAllTimers();
        });

        const element = screen.getByRole("img", { name: "John Doe" });
        const imageElem = element.querySelector("img");

        expect(onErrorFn).toHaveBeenCalledTimes(2);
        expect(imageElem).not.toBeInTheDocument();
        expect(element).toHaveClass("hop-Avatar--broken-image");
    });

    it("should render initials when the image fails to load and the fallback is set to null", () => {
        const mock = mocks.image();
        mock.simulate(["error"]);
        const initials = "JD";
        const onErrorFn = jest.fn();
        render(<Avatar name="John Doe" src="https://example.com/image.jpg" fallbackSrc={null} imageProps={{ onError: onErrorFn }} />);
        act(() => {
            jest.runAllTimers();
        });
        const element = screen.getByRole("img", { name: "John Doe" });

        expect(onErrorFn).toHaveBeenCalledTimes(1);
        expect(element).toHaveTextContent(initials);
    });
});
