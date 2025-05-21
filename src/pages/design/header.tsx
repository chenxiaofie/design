import UnderlineInput from '@/components/UnderlineInput';
import { Divider } from 'antd';
import { theme } from 'antd';
// const items = Array.from({ length: 3 }).map((_, index) => ({
//   key: String(index + 1),
//   label: `nav ${index + 1}`,
// }));
const DesignHeader: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <div className="bg-white flex align-center" style={{ height: '50px' }}>
      <div className="flex w-[320px] items-center overflow-hidden">
        <div className="flex items-center ml-2">
          <img
            src="https://tailornova.com/static/images/logo.svg"
            alt=""
            className="w-[120px]"
          />
          <UnderlineInput placeholder="无标题设计" />
          <div className="h-6 w-[1px] border-l border-dashed border-white/20" />
        </div>
      </div>

      <Divider
        type="vertical"
        style={{ borderColor: token.colorPrimary, height: '100%' }}
        dashed
        className="h-full"
      />
    </div>
  );
};

export default DesignHeader;
