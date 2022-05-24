import { useState } from "react";
import {
  Button,
  Typography,
  Flex,
  FlexItem,
  TextInput,
  Checkbox,
  Stack,
  StackItem,
} from "@deliveryhero/armor";
import { generateId } from "@deliveryhero/armor-system";
import { CancelIcon } from "@deliveryhero/armor-icons";
import "./index.css";

type TodoType = {
  id: string;
  name: string;
  isDone: boolean;
};

function TodoList() {
  const [inputText, setInputText] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addNewTodo = (name: string) => {
    setTodos((todoList) => [
      ...todoList,
      {
        id: generateId(),
        name,
        isDone: false,
      },
    ]);
    setInputText("");
  };

  const toggleTodo = (id: string) => {
    setTodos((todoList) =>
      todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((todoList) => todoList.filter((todo) => todo.id !== id));
  };

  const numTask = todos.length;
  const doneTask = todos.filter(({ isDone }) => isDone).length;

  return (
    <div className="container">
      <Typography sectionTitle>My To Do List</Typography>
      <Flex className="section__add">
        <FlexItem flexGrow={1} marginRight={4}>
          <TextInput
            wide
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="What do you want to do today?"
          />
        </FlexItem>
        <FlexItem>
          <Button small onClick={() => addNewTodo(inputText)}>
            Add
          </Button>
        </FlexItem>
      </Flex>
      <Stack marginTop={1}>
        {todos.map(({ id, name, isDone }) => (
          <StackItem key={id} className={`section__row ${isDone && "done"}`}>
            <Checkbox onChange={() => toggleTodo(id)} label={name} />
            <CancelIcon
              onClick={() => deleteTodo(id)}
              className="section__row__delete"
            />
          </StackItem>
        ))}
      </Stack>
      <Typography marginTop={2}>
        {todos.length
          ? `${numTask} tasks / ${doneTask} done`
          : "You have no tasks to display"}
      </Typography>
    </div>
  );
}

export default TodoList;
