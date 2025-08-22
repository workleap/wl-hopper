import figma from "@figma/code-connect"
import React from "react"
import Heading from "./Heading"



figma.connect(
  Heading,
  "https://www.figma.com/design/zSpuR1wOAT99H6YfD29IRl/%F0%9F%90%B8-Hopper-Design-System?node-id=3846%3A1598",
  {
    props: {
      // No matching props could be found for these Figma properties:
      // "subtitleContent": figma.string('Subtitle content'),
      // "subtitle": figma.boolean('Subtitle'),
      // "modalTitle": figma.string('Modal title'),
      // "visibility": figma.boolean('Visibility'),
      // "pageTitle": figma.string('Page title'),
      // "action": figma.boolean('Action'),
      // "backButton": figma.boolean('Back button'),
      // "status": figma.boolean('Status'),
      // "layout": figma.enum('Layout', {
      //   "Default": "default",
      //   "Full-screen": "full-screen"
      // }),
      // "mobile": figma.boolean('Mobile')
      title: figma.string("Title"),
    },
    example: (props) => <Heading title={props.title}/>,
  },
)
