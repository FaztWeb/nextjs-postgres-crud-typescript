import { NextPage } from "next";
import { Layout } from "src/components/Layout";
import { Card, Form, Grid, Button, Icon, Confirm } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function NewPage(): NextPage {
  const inititalState = {
    title: "",
    description: "",
  };
  const [task, setTask] = useState(inititalState);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  const createTask = async (task: Task) => {
    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newTask = await res.json();
  };

  const updateTask = async (id: string, task: Task) => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newTask = await res.json();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    try {
      if (router.query.id) {
        updateTask(router.query.id, task);
      } else {
        createTask(task);
      }
      setTask(inititalState);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
    setTask({ ...task, [name]: value });

  const loadTask = async (id: string) => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await res.json();
    setTask({ title: task.title, description: task.description });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/");
      const task = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      loadTask(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout>
      <Grid
        centered
        columns={3}
        verticalAlign="middle"
        style={{ height: "70%" }}
      >
        <Grid.Column>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    placeholder="Write a title"
                    name="title"
                    onChange={handleChange}
                    value={task.title}
                    autoFocus
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    name="description"
                    id="description"
                    rows="2"
                    placeholder="Write a Description"
                    onChange={handleChange}
                    value={task.description}
                  ></textarea>
                </Form.Field>
                {router.query.id ? (
                  <Button color="teal" loading={loading}>
                    <Icon name="save" />
                    Update
                  </Button>
                ) : (
                  <Button primary loading={loading}>
                    <Icon name="save" />
                    Save
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>

          {router.query.id && (
            <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
              <Icon name="trash" />
              Delete
            </Button>
          )}
        </Grid.Column>
      </Grid>

      <Confirm
        header="Delete a Task"
        content={`Are you sure you want to delete task ${router.query.id}`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => handleDelete(router.query.id)}
      />
    </Layout>
  );
}
