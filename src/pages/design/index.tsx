import React, { useRef, useEffect, useState } from 'react';
import { Layout } from 'antd';
import DesignHeader from '@/pages/design/header';
import Toolbar from '@/pages/design/content/DesignToolbar';
import DesignContent from '@/pages/design/content/DesignContent';
import Preview from '@/pages/design/content/DesignPreview';

const { Content } = Layout;

const Design: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    if (!headerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeaderHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(headerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Layout>
      <DesignHeader ref={headerRef} height={headerHeight} />
      <Content
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
        }}
        className="flex"
      >
        <Toolbar />
        <DesignContent />
        <Preview />
      </Content>
    </Layout>
  );
};

export default Design;
