import React from "react";
import { storiesOf } from "@storybook/react";
import ReactMarkdown from "react-markdown";
import readme from "../README.md";
import BasicTree from "./BasicTree";
import Complcated from "./ComplicatedTree";

storiesOf("Readme", module).add("Readme.md", () => (
  <ReactMarkdown source={readme} />
));

storiesOf("Examples", module)
  .add("Basic Example", () => <BasicTree />)
  .add("Complicated Tree!", () => <Complcated />);
