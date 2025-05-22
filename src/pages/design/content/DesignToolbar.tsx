import { theme } from 'antd';
const Toolbar = () => {
  const { token } = theme.useToken();
  return (
    <div
      className="w-[337px]"
      style={{ borderRight: `1px solid ${token.colorBorder}` }}
    >
      工具栏
    </div>
  );
};

export default Toolbar;
