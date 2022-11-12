import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './column-component.less';
import { Task } from '../task/task';
export const ColumnComponent = () => {
  return (
    <Card
      className="column"
      title="Column title"
      bordered={false}
      extra={[<EditOutlined key="ed" />]}
      style={{ width: 250 }}
    >
      <Task description={'task1'} />
      <Task description={'task2'} />
    </Card>
  );
};
