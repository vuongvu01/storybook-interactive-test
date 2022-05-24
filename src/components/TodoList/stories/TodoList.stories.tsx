import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import TodoList, { TodoType } from "..";

export default {
  title: "Example/TodoList",
  component: TodoList,
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => (
  // @ts-ignore
  <TodoList {...args} />
);

export const AddTodos = Template.bind({});

AddTodos.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const inputText = await canvas.findByPlaceholderText(
    "What do you want to do today?"
  );

  const todos = ["Wash dishes", "Clean my bed", "Take a walk"];
  const addButton = await canvas.findByRole("button", { name: "Add" });

  for (let i = 0; i < todos.length; i++) {
    await userEvent.type(inputText, todos[i]);
    await userEvent.click(addButton);
  }

  expect(canvas.getByText("3 tasks / 0 done")).toBeInTheDocument();
};

const defaultTodos: TodoType[] = [
  { id: "1", name: "Wash dishes", isDone: false },
  { id: "2", name: "Clean my bed", isDone: false },
  { id: "3", name: "Take a walk", isDone: false },
];

export const CompleteTodos = Template.bind({});
CompleteTodos.args = {
  data: defaultTodos,
};

CompleteTodos.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const doneTasks = ["Wash dishes", "Clean my bed"];

  for (let i = 0; i < doneTasks.length; i++) {
    const task = await canvas.findByLabelText(doneTasks[i]);
    await userEvent.click(task);
  }

  expect(canvas.getByText("3 tasks / 2 done")).toBeInTheDocument();
};
