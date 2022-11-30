import { Card } from 'antd';
import { ITask } from '../../api-services/types/types';

export const TaskComponent = (props: { props: ITask }) => {
  const description = props.props.description;
  return (
    <Card style={{ width: 230, marginBottom: 10 }}>
      <p className="task">{description}</p>
    </Card>
  );
};
