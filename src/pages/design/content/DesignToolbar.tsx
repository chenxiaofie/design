import { theme } from 'antd';
import { PicCenterOutlined } from '@ant-design/icons';
import { useState } from 'react';
import RippleTabButton from '@/components/RippleTabButton';
import ProductComponent from '@/pages/design/content/components/designToolbar/ProductComponent';
import styles from '@/pages/design/content/DesignToolbar.module.scss';
const Toolbar = () => {
  const { token } = theme.useToken();
  const [activeTab, setActiveTab] = useState('1');
  const [activeSubTab, setActiveSubTab] = useState('2-1');
  const tabs = [
    {
      key: '1',
      name: '商品',
      component: ProductComponent, // 添加商品组件
    },
    {
      key: '2',
      name: '设计',
      tabs: [
        { key: '2-1', label: '图片' },
        { key: '2-2', label: '文字' },
        { key: '2-3', label: '颜色' },
        { key: '2-4', label: '上传' },
      ],
    },
  ];

  return (
    <div
      className="w-[337px] flex flex-col "
      style={{ borderRight: `1px solid ${token.colorBorder}` }}
    >
      <div className="flex">
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
      <div className="flex-1 bg-white border-t border-gray-300">
        {tabs.map((item) => {
          if (item.key === activeTab) {
            // 如果有子标签，可以在这里处理子标签的逻辑
            if (item.tabs) {
              return (
                <div
                  className="w-[80px] border-r h-full"
                  style={{ borderColor: token.colorBorder }}
                  key={item.key}
                >
                  {item.tabs.map((tab) => (
                    <div
                      key={tab.key}
                      className={`${activeSubTab === tab.key ? styles.noBg : ''} ${
                        activeSubTab === tab.key ? styles.animateColor : ''
                      }`}
                      style={{
                        ['--icons-color' as string]: 'red',
                        ['--label-color' as string]: 'transparent',
                      }}
                    >
                      <RippleTabButton
                        label={tab.label}
                        active={activeSubTab === tab.key}
                        vertical={true}
                        onClick={() => setActiveSubTab(tab.key)}
                        height="80px"
                        className={`${activeSubTab === tab.key ? styles.noBg : ''}`}
                        icon={<PicCenterOutlined />}
                      />
                    </div>
                  ))}
                </div>
              );
            }
            if (item.component) {
              return <item.component key={item.key} />;
            }
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Toolbar;
