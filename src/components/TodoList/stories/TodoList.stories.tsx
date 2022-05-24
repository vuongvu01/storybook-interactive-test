import { ComponentMeta } from "@storybook/react";

import TodoList from "..";

export default {
  title: "Example/TodoList",
  component: TodoList,
} as ComponentMeta<typeof TodoList>;

export const Basic = () => <TodoList />;
