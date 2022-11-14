import { Card } from 'antd';

export const Task = (props: { description: string }) => {
  const description = props;
  return (
    <Card style={{ width: 230, marginBottom: 10 }}>
      <p className="task">{description.description}</p>
    </Card>
  );
};
