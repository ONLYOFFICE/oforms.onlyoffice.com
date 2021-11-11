import React from "react";
import Carousel from "./";

export default {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: "Carousel is used to display images.",
      },
    },
  },
};

const Template = ({ ...args }) => {
  return (
    <div style={{ width: "100%" }}>
      <Carousel {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};