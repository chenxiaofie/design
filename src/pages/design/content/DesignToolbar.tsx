import { theme } from 'antd';
import { useState } from 'react';
import RippleTabButton from '@/components/RippleTabButton';
const Toolbar = () => {
  const { token } = theme.useToken();
  const [activeTab, setActiveTab] = useState('1');
  const tabs = [
    {
      key: '1',
      name: '商品',
    },
    {
      key: '2',
      name: '设计',
    },
  ];
  return (
    <div
      className="w-[337px] flex"
      style={{ borderRight: `1px solid ${token.colorBorder}` }}
    >
      {tabs.map((item) => (
        <RippleTabButton
          key={item.key}
          label={item.name}
          active={activeTab === item.key}
          borderColor={token.colorBorder}
          onClick={() => setActiveTab(item.key)}
        />
      ))}
    </div>
  );
};

export default Toolbar;
