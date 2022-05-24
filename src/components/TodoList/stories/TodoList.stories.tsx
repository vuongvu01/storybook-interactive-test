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

  await expect(canvas.getByText("3 total / 0 done")).toBeInTheDocument();
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

  await expect(canvas.getByText("3 total / 2 done")).toBeInTheDocument();
};

export const DeleteTodos = Template.bind({});
DeleteTodos.args = {
  data: defaultTodos,
};

DeleteTodos.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const deleteButtons = await canvas.findAllByRole("button", { name: "" });

  // Delete 2/3 tasks
  for (let i = 0; i < deleteButtons.length - 1; i++) {
    await userEvent.click(deleteButtons[i]);
  }

  await expect(canvas.getByText("1 total / 0 done")).toBeInTheDocument();
};
