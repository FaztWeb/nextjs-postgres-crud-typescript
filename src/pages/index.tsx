import { GetServerSideProps } from "next";
import { Button, Grid } from "semantic-ui-react";
import { Layout } from "src/components/Layout";
import { BiTaskX } from "react-icons/bi";
import { TaskList } from "src/components/tasks/TaskList";
import { useRouter } from "next/router";
import { Task } from "src/interfaces/Tasks";

interface Props {
  tasks: Task[];
}

const Home = ({ tasks }: Props) => {
  const { push } = useRouter();

  return (
    <Layout>
      {tasks.length === 0 ? (
        <Grid
          columns={3}
          centered
          verticalAlign="middle"
          style={{ height: "70%" }}
        >
          <Grid.Row>
            <Grid.Column>
              <div style={{ color: "#eee", textAlign: "center" }}>
                <BiTaskX size="15rem" />
                <h1>No tasks yet</h1>
                <Button onClick={() => push("/tasks/new")}>Create one</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: { tasks },
  };
};

export default Home;
