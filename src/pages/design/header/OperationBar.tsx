import {
  FolderOutlined,
  UndoOutlined,
  RedoOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { theme, Button } from 'antd';
import { useState } from 'react';
import IconFont from '@/components/IconFont';
import { useTranslation } from 'react-i18next';
const OperationBar: React.FC = () => {
  const [activeButtons, setActiveButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const { t } = useTranslation('design/header/OperationBar');

  const list = [
    { name: t('design'), icon: <FolderOutlined /> },
    { name: t('undo'), icon: <UndoOutlined /> },
    { name: t('redo'), icon: <RedoOutlined /> },
    { name: t('help'), icon: <QuestionCircleOutlined /> },
  ];
  const buttons = [
    {
      key: 'Toolbar',
      icon: (
        <IconFont
          type="icon-gongjulan-gongjuxiang"
          style={{ fontSize: '16px' }}
        />
      ),
    },
    {
      key: 'design',
      icon: <IconFont type="icon-050-edition" style={{ fontSize: '16px' }} />,
    },
    {
      key: 'preview',
      icon: <IconFont type="icon-yulan1" style={{ fontSize: '16px' }} />,
    },
  ];
  const { token } = theme.useToken();

  const handleButtonClick = (key: string) => {
    setActiveButtons((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex-1 flex items-center justify-between">
      <div className="flex items-center space-x-2 ">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg  items-center cursor-pointer p-1 px-3 overflow-hidden hover:bg-[var(--hover-color)] hover:text-white transition-colors duration-200"
            style={
              { '--hover-color': token.colorPrimary } as React.CSSProperties
            }
          >
            <span className="mb-1">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        {buttons.map((button) => (
          <Button
            key={button.key}
            type={activeButtons[button.key] ? 'primary' : 'default'}
            icon={button.icon}
            className="hover:bg-primary hover:text-white"
            onClick={() => handleButtonClick(button.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default OperationBar;
