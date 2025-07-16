## Hopper Icon Overview

# Introduction

Icons are an essential part of building intuitive and engaging user interfaces. Hopper offers a versatile and comprehensive icon system tailored to meet diverse project needs, whether you're building with React or using static assets in other frameworks.

## [Using Hopper Icons](https://hopper.workleap.design/icons/overview/introduction\#using-hopper-icons)

Hopper provides two main packages, React components or pure SVG, giving you the flexibility to choose how to integrate icons into your project.

### [React Applications](https://hopper.workleap.design/icons/overview/introduction\#using-hopper-icons-react-applications)

Designed specifically for React applications, this package offers all icons as React components.

[**Standard Icons** \\
\\
Monochromatic and simple. Best suited for functional UI elements like buttons, menus, or actions.](https://hopper.workleap.design/icons/react-icons/icon-library) [**Rich Icons** \\
\\
Vibrant and colorful. Perfect for decorative purposes or drawing attention to specific elements.](https://hopper.workleap.design/icons/react-icons/rich-icon-library)

### [Other Frameworks](https://hopper.workleap.design/icons/overview/introduction\#using-hopper-icons-other-frameworks)

Ideal for non-React setups, this package provides raw SVG files.

[**Standard Icons** \\
\\
Monochromatic and simple. Best suited for functional UI elements like buttons, menus, or actions.](https://hopper.workleap.design/icons/SVG-icons/icon-library) [**Rich Icons** \\
\\
Vibrant and colorful. Perfect for decorative purposes or drawing attention to specific elements.](https://hopper.workleap.design/icons/SVG-icons/rich-icon-library)

## [Start Designing Icons](https://hopper.workleap.design/icons/overview/introduction\#start-designing-icons)

No matter the platform or design requirements, Hopper icons empower developers and designers to create polished, visually aligned interfaces.

- [Designing an Icon](https://hopper.workleap.design/icons/overview/designing-an-icon)

To maintain visual consistency across the Workleap platform, icon creators should follow these guidelines when contributing to the Workleap icon library.
**All designers are encouraged to create their own icons.** Use the design language and specifications outlined in this guide to ensure alignment across all Workleap products.

## [Before You Begin](https://hopper.workleap.design/icons/overview/designing-an-icon\#before-you-begin)

**1\. Review Existing Icons:**
Before proposing a new icon, explore the current icon set to determine if an existing design fits your needs. Avoid duplicating concepts and ensure your proposal adds unique value.

**2\. Understand the Design Language:**
The Workleap icon library follows a specific and consistent design language. Adhering to this language is crucial for maintaining a shared understanding across all verticals and ensuring new additions feel cohesive within Workleap's visual system.

## [Anatomy of an Icon](https://hopper.workleap.design/icons/overview/designing-an-icon\#anatomy-of-an-icon)

Icons in the Workleap library have several defined characteristics. Understanding these attributes is essential for creating high-quality contributions.

### [Definitions](https://hopper.workleap.design/icons/overview/designing-an-icon\#anatomy-of-an-icon-definitions)

- Frame Size - The dimensions of the artboard in which the icon is designed.
- Stroke Alignment - The stroke's position relative to the shape. Use **center** alignment unless the shape is closed; in that case, use **inside**.
- Corner Radius - Follow the standard radius values from the design specification table. Deviations are allowed only to improve legibility.
- Terminal - The end style of a stroke, which can be round, square, or flat.
- Inner spacing - The space between a shape and its stroke.
- Fill - The shape's color. Icons using a fill are also known as solid icons. Any shapes on a filled icon should follow the stroke guidelines.
- Keylines - Lines that define an icon's shape and stroke alignment. In Figma, toggle them using `⌘G`(Mac) or `Ctrl+G`(PC).

### [Values](https://hopper.workleap.design/icons/overview/designing-an-icon\#anatomy-of-an-icon-values)

Use the following specifications when designing your icon:

| Anatomy | Small | Medium | Large |
| --- | --- | --- | --- |
| Frame Size | 16X16 | 24X24 | 32X32 |
| Stroke Weight | 1.5px | 1.5px | 2px |
| Stroke Alignment | Center/Inside | Center/Inside | Center/Inside |
| Corner Radius | 1px | 1.5px | 2px |
| Terminal | Round | Round | Round |
| Inner Spacing | >= 1px | >= 2px | >= 2px |

## React Icons Library

# Icon Library

All icons in the Workleap icon library are available in three predefined sizes. To ensure consistency and clarity, always use the icons at one of these sizes. Avoid resizing icons to dimensions other than the provided options.

To integrate an icon into your project, simply import it from `@hopper-ui/icons`.

```hd-code

import { AddCalendarIcon } from "@hopper-ui/icons"

```

You can preview icons in your preferred size. Simply click on an icon to instantly copy its name!

Small16x16px

Medium24x24px

Large32x32px

Add

AddCalendar

AddUser

Alignment

Ambassadorship

AngleDown

AngleLeft

AngleRight

AngleUp

Applause

Archive

ArrowDown

ArrowLeft

ArrowRight

ArrowUp

ArrowsOutVertical

Assistant

AssistantTo

Attachment

Bars

Basketball

Bento

Birthday

Bold

Bolt

Book

Bookmark

Branches

Briefcase

Build

Bullet

Bullseye

Calendar

Camera

Car

CaretDown

CaretDownSolid

CaretUp

CaretUpSolid

Cat

ChartBar

ChartLine

ChartPie

Checkmark

Cherries

CircleAngleLeft

CircleAngleRight

Clock

CollapseLeft

CollapseRight

Comment

CommentCheck

Connections

Copy

Count

Csv

DecreaseIndent

Delete

Department

DirectReports

Dismiss

Dollar

DottedLines

Download

Duplicate

Edit

Enter

Event

EverythingReport

Exit

EyeHidden

EyeVisible

Feedback

FileCheck

Filter

Five

Flag

Focus

Folder

Football

Four

Gauge

Gift

GraduationHat

Graph

Grid

Grip

Groups

Growth

Happiness

Hierarchy

Home

Hourglass

Image

IncreaseIndent

Info

Invoice

Italic

Kebab

Key

KeyResult

Language

LearningPath

LearningPathStep

Lightbulb

Link

Location

Lock

LockedCalendar

LockedNote

Mail

Maximize

Media

Microphone

MicrophoneDisabled

Minus

Mobile

Move

NewComment

NewFilter

NewGift

NewNote

NewNotification

NewSticky

NewTab

NewTemplate

NewTip

NextCalendar

Note

Notebook

Notification

One

OneOnOne

OpenRole

OpenSmile

OrderedList

OrgChart

Organization

Pause

Pdf

Peace

Percent

Phone

Pin

PinSolid

Play

PlaySolid

Plus

Print

Profile

Progress

Pronunciation

Question

QuizLesson

Reaction

Recurring

Refresh

RelationWithManager

RelationshipWithPeers

Reminder

Remove

RemoveCalendar

RemoveUser

Reply

Report

ReportsTo

Requalification

Review

Rewind

Rocket

Satisfaction

ScreenShare

Search

Section

Segment

Send

Settings

SettingsNotification

SettingsWarning

Share

Shared

Shield

Slider

Sort

Sparkles

Sprout

Star

StarSolid

StartOver

Sticky

Strikethrough

Substract

Success

Sync

Tag

Team

Template

TextLesson

Three

ThumbsDown

ThumbsUp

Tip

Translation

Two

Unarchive

Underline

UnorderedList

Upload

Upsell

User

Video

VideoCamera

VideoCameraDisabled

Warning

WebinarLesson

Wellness

WhosWhoFace

WhosWhoGame

## Rich Icons Library

# Rich Icons Library

All rich icons in the Workleap icon library are available in three predefined sizes. To ensure consistency and clarity, always use the icons at one of these sizes. Avoid resizing icons to dimensions other than the provided options.

To integrate a rich icon into your project, simply import it from `@hopper-ui/icons`.

```hd-code

import { ActionListRichIcon } from "@hopper-ui/icons"

```

The color of the rich icons can be changed by using the `variant` prop. The following [decorative colors](https://hopper.workleap.design/tokens/semantic/color#decorative) are available as variants: `option1` to `option8`.
The following status colors are available as well: `success`, `warning`, `danger`, `information` and `upsell`.

```hd-code

<ActionListRichIcon variant="option3" />

```

You can preview rich icons in your preferred size. Simply click on an icon to instantly copy its name!

Medium24x24px

Large32x32px

Extra Large40x40px

ActionList

Anniversary

Anonymous

Applause

Birthday

BrokenImage

Caution

Conversation

Custom

DecreasingScore

DeletedUser

Department

Directory

Discount

Email

Feedback

GoalIndividual

GoalTeam

Group

Growth

Idea

Info

LikertScale

Location

MultipleChoice

OneOnOne

OpenRole

OpinionScale

Organization

People

Profile

Question

Reminder

Review

RisingScore

Rocket

Script

Settings

Sparkles

Star

Status

Success

Support

Template

TextAnswer

Upsell

WhosWho

## SVG Icon Library

# Icon Library

All icons in the Workleap icon library are available in three predefined sizes. To ensure consistency and clarity, always use the icons at one of these sizes. Avoid resizing icons to dimensions other than the provided options.

To integrate an icon into your project, simply import it from `@hopper-ui/svg-icons` in a JavaScript file:

```hd-code

import AlertIcon from "@hopper-ui/svg-icons/icons/alert-24.svg";

```

or in a CSS file:

```hd-code

.my-component {
    background-image: url("@hopper-ui/svg-icons/icons/alert-24.svg");
}

```

## [Inline SVG](https://hopper.workleap.design/icons/SVG-icons/icon-library\#inline-svg)

Hopper's SVG icons are designed to be used as inline SVGs. This allows you to easily customize the icon's color, size, and other properties using CSS.

```hd-code

// a specific size
import { AlertIcon32 } from "@hopper-ui/svg-icons/icons/inline";
// or an object containing all the sizes
import { AlertIcon }  from "@hopper-ui/svg-icons/icons/inline";

```

You can preview icons in your preferred size. Simply click on an icon to instantly copy it's `.svg` name!

Small16x16px

Medium24x24px

Large32x32px

Add

AddCalendar

AddUser

Alignment

Ambassadorship

AngleDown

AngleLeft

AngleRight

AngleUp

Applause

Archive

ArrowDown

ArrowLeft

ArrowRight

ArrowUp

ArrowsOutVertical

Assistant

AssistantTo

Attachment

Bars

Basketball

Bento

Birthday

Bold

Bolt

Book

Bookmark

Branches

Briefcase

Build

Bullet

Bullseye

Calendar

Camera

Car

CaretDown

CaretDownSolid

CaretUp

CaretUpSolid

Cat

ChartBar

ChartLine

ChartPie

Checkmark

Cherries

CircleAngleLeft

CircleAngleRight

Clock

CollapseLeft

CollapseRight

Comment

CommentCheck

Connections

Copy

Count

Csv

DecreaseIndent

Delete

Department

DirectReports

Dismiss

Dollar

DottedLines

Download

Duplicate

Edit

Enter

Event

EverythingReport

Exit

EyeHidden

EyeVisible

Feedback

FileCheck

Filter

Five

Flag

Focus

Folder

Football

Four

Gauge

Gift

GraduationHat

Graph

Grid

Grip

Groups

Growth

Happiness

Hierarchy

Home

Hourglass

Image

IncreaseIndent

Info

Invoice

Italic

Kebab

Key

KeyResult

Language

LearningPath

LearningPathStep

Lightbulb

Link

Location

Lock

LockedCalendar

LockedNote

Mail

Maximize

Media

Microphone

MicrophoneDisabled

Minus

Mobile

Move

NewComment

NewFilter

NewGift

NewNote

NewNotification

NewSticky

NewTab

NewTemplate

NewTip

NextCalendar

Note

Notebook

Notification

One

OneOnOne

OpenRole

OpenSmile

OrderedList

OrgChart

Organization

Pause

Pdf

Peace

Percent

Phone

Pin

PinSolid

Play

PlaySolid

Plus

Print

Profile

Progress

Pronunciation

Question

QuizLesson

Reaction

Recurring

Refresh

RelationWithManager

RelationshipWithPeers

Reminder

Remove

RemoveCalendar

RemoveUser

Reply

Report

ReportsTo

Requalification

Review

Rewind

Rocket

Satisfaction

ScreenShare

Search

Section

Segment

Send

Settings

SettingsNotification

SettingsWarning

Share

Shared

Shield

Slider

Sort

Sparkles

Sprout

Star

StarSolid

StartOver

Sticky

Strikethrough

Substract

Success

Sync

Tag

Team

Template

TextLesson

Three

ThumbsDown

ThumbsUp

Tip

Translation

Two

Unarchive

Underline

UnorderedList

Upload

Upsell

User

Video

VideoCamera

VideoCameraDisabled

Warning

WebinarLesson

Wellness

WhosWhoFace

WhosWhoGame

## Rich Icon Library

# Rich Icon Library

All rich icons in the Workleap icon library are available in three predefined sizes. To ensure consistency and clarity, always use the icons at one of these sizes. Avoid resizing icons to dimensions other than the provided options.

To integrate a rich icon into your project, simply import it from `@hopper-ui/svg-icons` in a JavaScript file:

```hd-code

import ActionListRichIcon from "@hopper-ui/svg-icons/rich-icons/action-list-32.svg";

```

or in a CSS file:

```hd-code

.my-component {
    background-image: url("@hopper-ui/svg-icons/rich-icons/action-list-32.svg");
}

```

The color of the rich icons can be changed by using the right CSS Variables.
The following variables are available for your styling needs: `--hop-RichIcon-placeholder-fill`, `--hop-RichIcon-placeholder-background` and `--hop-RichIcon-placeholder-shadow`. You should use the appropriate [decorative semantic tokens](https://hopper.workleap.design/tokens/semantic/color#decorative) or status semantic tokens. The available options for Rich Icons are `option1` to `option8`, `success`, `warning`, `danger`, `information` and `upsell`.

```hd-code

.actionListRichIcon {
    --hop-RichIcon-placeholder-background: var(--hop-color-decorative-option1);
}

```

You can preview rich icons in your preferred size. Simply click on an icon to instantly copy its name!

Medium24x24px

Large32x32px

Extra Large40x40px

ActionList

Anniversary

Anonymous

Applause

Birthday

BrokenImage

Caution

Conversation

Custom

DecreasingScore

DeletedUser

Department

Directory

Discount

Email

Feedback

GoalIndividual

GoalTeam

Group

Growth

Idea

Info

LikertScale

Location

MultipleChoice

OneOnOne

OpenRole

OpinionScale

Organization

People

Profile

Question

Reminder

Review

RisingScore

Rocket

Script

Settings

Sparkles

Star

Status

Success

Support

Template

TextAnswer

Upsell

WhosWho
