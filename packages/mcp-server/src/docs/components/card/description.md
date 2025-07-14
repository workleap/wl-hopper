---
title: Card
description: Cards are used to group similar concepts and tasks to make it easier for users to scan, read and get things done.
category: "content"
links:
    source: https://github.com/workleap/wl-hopper/blob/main/packages/components/src/card/src/Card.tsx
---

\*\*Example:\*\* card/docs/preview

```tsx
import { Card } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="inset-squish-lg" maxWidth="1/2">
            Software built for everyone to do their best work
        </Card>
    );
}

```

## Usage

### Variants

A card can use different variants. Second-level cards need to be used within a first-level card.

\*\*Example:\*\* card/docs/variant

```tsx
import { Card, H2, H3, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="inset-squish-lg" width="3/4" gap="stack-md">
            <H2>Roles</H2>
            <Card gap="stack-md" padding="inset-squish-lg" variant="second-level">
                <H3>Manager</H3>
                <Text>A manager leads team operations, aligns goals, and fosters a productive work environment to achieve results.</Text>
            </Card>
        </Card>
    );
}

```

### Sections

A card can use a header, content, and footer section.

\*\*Example:\*\* card/docs/sections

```tsx
import { Card, H3, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card gap="inline-lg" padding="inset-squish-lg" UNSAFE_maxWidth="30rem" width="100%">
            <H3>Developer</H3>
            <Text>
                A developer builds and maintains software, ensuring functionality, performance, and alignment with project goals.
            </Text>
            <Text>Start date : <em>September 13th</em></Text>
        </Card>
    );
}

```

## Props

**Props for Card:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant? | "main" \| "second-level" | "main" | The visual style of the card. |
| style? | CSSProperties | - | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. |
| children? | ReactNode | - | The children of the component. |
| className? | string | - | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| slot? | string \| null | - | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |

### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id? | string | - | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| aria-label? | string | - | Defines a string value that labels the current element. |
| aria-labelledby? | string | - | Identifies the element (or elements) that labels the current element. |
| aria-describedby? | string | - | Identifies the element (or elements) that describes the object. |
| aria-details? | string | - | Identifies the element (or elements) that provide a detailed, extended description for the object. |

## Migration Notes

\*\*Migration Guide:\*\* card/docs/migration-notes

### Layout Samples

To facilitate the migration process, we've provided layout samples as reference guides. These examples demonstrate how to recreate features previously supported in [Orbiter](https://wl-orbiter-website.netlify.app/?path=/docs/card--default-story).

#### Default

\*\*Example:\*\* card/docs/migration/default

```tsx
import { Card, H3, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%" gap="stack-md">
            <H3>NASA Headquarters</H3>
            <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
        </Card>
    );
}

```

#### Image

\*\*Example:\*\* card/docs/migration/image

```tsx
import { Card, H3, Image, Stack, Text } from "@hopper-ui/components";

import SpaceLandscape from "./assets/space-landscape.png";

export default function Example() {
    return (
        <Card UNSAFE_maxWidth="30rem" width="100%" overflow="hidden">
            <Image src={SpaceLandscape.src} alt="Space landscape" objectFit="cover" width="100%" UNSAFE_height="8rem" />
            <Stack padding="inset-lg">
                <H3>NASA Headquarters</H3>
                <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
            </Stack>
        </Card>
    );
}

```

#### Illustration

\*\*Example:\*\* card/docs/migration/illustration

```tsx
import { Card, Flex, H3, Image, Stack, Text } from "@hopper-ui/components";

import planet from "./assets/planet.png";

export default function Example() {
    return (
        <Card UNSAFE_maxWidth="30rem" width="100%" overflow="hidden">
            <Flex UNSAFE_height="8rem" backgroundColor="primary-weak" alignItems="center" justifyContent="center">
                <Image src={planet.src} alt="Planet" />
            </Flex>
            <Stack padding="inset-lg">
                <H3 marginBottom="inline-lg">NASA Headquarters</H3>
                <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
            </Stack>
        </Card>
    );
}

```

#### Size

\*\*Example:\*\* card/docs/migration/size

```tsx
import { Card, H3, Inline, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-sm" wrap="wrap">
            <Card padding="inset-lg" UNSAFE_maxWidth="16rem" width="100%" gap="stack-md">
                <H3>XS Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="20rem" width="100%" gap="stack-md">
                <H3>SM Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%" gap="stack-md">
                <H3>MD Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="35rem" width="100%" gap="stack-md">
                <H3>LG Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="40rem" width="100%" gap="stack-md">
                <H3>XL Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
        </Inline>
    );
}

```

#### Button

\*\*Example:\*\* card/docs/migration/button

```tsx
import { Button, Card, H3, Inline, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%" gap="stack-md">
            <Inline alignX="space-between" wrap gap="inline-md">
                <H3>NASA Headquarters</H3>
                <Text>No visitors allowed.</Text>
            </Inline>
            <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
            <Button variant="secondary">Plan a visit</Button>
        </Card>
    );
}

```

#### Button group

\*\*Example:\*\* card/docs/migration/buttongroup

```tsx
import { Button, ButtonGroup, Card, H3, Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card gap="stack-md" padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%">
            <H3>NASA Headquarters</H3>
            <Stack>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                    <br />
                </Text>
                <em>Any trespassers are going to be sent in space.</em>
            </Stack>
            <ButtonGroup>
                <Button>Plan a visit</Button>
                <Button variant="secondary">Cancel a booking</Button>
            </ButtonGroup>
        </Card>
    );
}

```

#### Orientation

\*\*Example:\*\* card/docs/migration/orientation

```tsx
import { Card, Flex, H3, Image, Stack, Text } from "@hopper-ui/components";

import planet from "./assets/planet.png";

export default function Example() {
    return (
        <Card UNSAFE_maxWidth="30rem" width="100%" display="grid" gridTemplateAreas={["image aside"]} gridTemplateColumns={["max-content", "auto"]} alignItems="start" overflow="hidden" >
            <Flex height="100%" backgroundColor="primary-weak" alignItems="center" justifyContent="center" padding="inset-md">
                <Image src={planet.src} alt="Planet" />
            </Flex>
            <Stack padding="inset-lg">
                <H3>NASA</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
                <em>Please note that we are moving from December 12th to December 23rd.</em>
            </Stack>
        </Card>
    );
}

```

#### Fluid

\*\*Example:\*\* card/docs/migration/fluid

```tsx
import { Card, Flex, H3, Image, Stack, Text } from "@hopper-ui/components";

import planet from "./assets/planet.png";

export default function Example() {
    return (
        <Card display="grid" gridTemplateAreas={["image aside"]} gridTemplateColumns={["max-content", "auto"]} width="100%" overflow="hidden" >
            <Flex backgroundColor="primary-weak" alignItems="center" justifyContent="center" padding="inset-md">
                <Image src={planet.src} alt="Planet" />
            </Flex>
            <Stack padding="inset-lg">
                <H3>NASA</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
                <em>Please note that we are moving from December 12th to December 23rd.</em>
            </Stack>
        </Card>
    );
}

```
