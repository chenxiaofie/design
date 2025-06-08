import {
  FolderOutlined,
  UndoOutlined,
  RedoOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { theme, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import IconFont from '@/components/IconFont';
import { useTranslation } from 'react-i18next';

const OperationBar: React.FC = () => {
  const [activeButtons, setActiveButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const { t, i18n } = useTranslation('design/header/OperationBar');

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languageItems: MenuProps['items'] = [
    {
      key: 'zh-CN',
      label: '中文',
      onClick: () => handleLanguageChange('zh-CN'),
    },
    {
      key: 'en',
      label: 'English',
      onClick: () => handleLanguageChange('en'),
    },
  ];

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
    {
      key: 'language',
      icon: <GlobalOutlined />,
      dropdown: true,
      dropdownItems: languageItems,
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
        {buttons.map((button) => {
          if (button.dropdown) {
            return (
              <Dropdown
                key={button.key}
                menu={{ items: button.dropdownItems }}
                placement="bottomRight"
              >
                <Button
                  type={activeButtons[button.key] ? 'primary' : 'default'}
                  icon={button.icon}
                  className="hover:bg-primary hover:text-white"
                />
              </Dropdown>
            );
          }
          return (
            <Button
              key={button.key}
              type={activeButtons[button.key] ? 'primary' : 'default'}
              icon={button.icon}
              className="hover:bg-primary hover:text-white"
              onClick={() => handleButtonClick(button.key)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OperationBar;
