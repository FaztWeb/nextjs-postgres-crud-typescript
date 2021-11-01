import { useRouter } from "next/router";
import { Card } from "semantic-ui-react";
import { Task } from "src/interfaces/Tasks";

interface Props {
  tasks: Task[];
}

export const TaskList = ({ tasks = [] }: Props) => {

  const router = useRouter();

  console.log(tasks) 

  return (
    <Card.Group itemsPerRow={4}>
      {tasks.map((task) => (
        <Card onClick={() => router.push(`/tasks/edit/${task.id}`)}>
          <Card.Content>
            <Card.Header>{task.title}</Card.Header>
            <Card.Meta>
              {new Date(task.created_on).toLocaleDateString()}
            </Card.Meta>
            <Card.Description>{task.description}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};
