import { useDesignStore } from '@/stores/designStore';
import { theme } from 'antd';
const Preview = () => {
  const { token } = theme.useToken();
  const userMenuWidth = useDesignStore((state) => state.userMenuWidth);
  return (
    <div
      style={{
        width: userMenuWidth + 33 + 'px',
        borderLeft: `1px solid ${token.colorBorder}`,
      }}
    >
      <div>Preview</div>
    </div>
  );
};

export default Preview;
