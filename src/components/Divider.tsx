import { Divider } from 'antd';
import { theme } from 'antd';

interface DesignDividerProps {
  color?: string;
  borderInlineStartWidth?: string | number;
}
const DesignDivider: React.FC<DesignDividerProps> = ({
  color,
  borderInlineStartWidth = '1px',
}) => {
  const { token } = theme.useToken();

  return (
    <Divider
      type="vertical"
      style={{
        borderColor: color ?? token.colorBorder,
        height: '100%',
        borderInlineStartWidth,
        margin: '0 calc(var(--spacing) * 4)',
      }}
      dashed
      className="h-full"
    />
  );
};

export default DesignDivider;
