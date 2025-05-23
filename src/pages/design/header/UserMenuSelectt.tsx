import { UserOutlined } from '@ant-design/icons';
import { theme, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useRef, useEffect } from 'react';
import { useDesignStore } from '@/stores/designStore';

const UserMenuSelectt: React.FC = () => {
  const { token } = theme.useToken();
  const setUserMenuWidth = useDesignStore((state) => state.setUserMenuWidth);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      console.log('updateWidth', menuRef.current?.offsetWidth);
      if (menuRef.current) {
        setUserMenuWidth(menuRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [setUserMenuWidth]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '个人信息',
    },
    {
      key: '2',
      label: '退出登录',
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <div
        ref={menuRef}
        className="flex min-w-[120px] mr-4 my-1 rounded-md items-center justify-center cursor-pointer hover:bg-[var(--hover-color)]  hover:text-[var(--text-color)] transition-colors duration-200"
        style={
          {
            '--hover-color': token.colorPrimary,
            '--text-color': token.colorBgContainer,
            fontSize: '18px',
          } as React.CSSProperties
        }
      >
        <UserOutlined className="w-6 h-6 rounded-full flex items-center justify-center" />
        <span className="text-sm font-medium">用户用户名</span>
      </div>
    </Dropdown>
  );
};

export default UserMenuSelectt;
