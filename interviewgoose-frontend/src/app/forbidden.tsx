import { Button, Result } from "antd";

const Forbidden = () => {
  return (
    <Result
      status={403}
      title="403"
      subTitle="Sorry, you don't access to this page."
      extra={<Button type="primary" href="">Back Home</Button>}
    />
  );
};

export default Forbidden;