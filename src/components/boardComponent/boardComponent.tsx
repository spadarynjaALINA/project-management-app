import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
export const BoardComponent = () => {
  return (
    <Card
      title="Board title"
      bordered={false}
      extra={[<DeleteOutlined key="del" />]}
      style={{ width: 250 }}
    >
      Board content
    </Card>
  );
};
