import { useDesignStore } from '@/stores/designStore';
import { theme } from 'antd';
import { Card, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  nameZh: string;
  category: string;
  tags: string[];
  thumbnail: string;
  price: number;
}

interface Tag {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  type: string;
  sort: number;
}

const Preview = () => {
  const { token } = theme.useToken();
  const { t, i18n } = useTranslation('design/content/components/designToolbar/ProductComponent');
  const userMenuWidth = useDesignStore((state) => state.userMenuWidth);
  const selectedProduct = useDesignStore((state) => state.selectedProduct);
  const [tags, setTags] = useState<Tag[]>([]);

  // 获取标签数据
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        const { data } = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, []);

  // 根据当前语言获取标签名称
  const getTagName = (tag: Tag) => {
    return i18n.language === 'en' ? tag.nameEn : tag.name;
  };

  // 根据当前语言获取商品名称
  const getProductName = (product: NonNullable<typeof selectedProduct>) => {
    return i18n.language === 'en' ? product.name : product.nameZh;
  };

  return (
    <div
      style={{
        width: userMenuWidth + 33 + 'px',
        borderLeft: `1px solid ${token.colorBorder}`,
      }}
      className="flex flex-col h-full"
    >
      <div className="p-4">
        {selectedProduct ? (
          <Card
            cover={
              <img
                alt={getProductName(selectedProduct)}
                src={selectedProduct.thumbnail}
                className="w-full object-cover"
              />
            }
          >
            <Card.Meta
              title={getProductName(selectedProduct)}
              description={
                <div className="space-y-4 mt-4">
                  <div className="text-xl font-semibold text-primary">
                    ${selectedProduct.price}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.tags.map((tagCode) => {
                      const tag = tags.find(t => t.code === tagCode);
                      if (!tag) return null;
                      return (
                        <Tag key={tag.id} color="blue">
                          {getTagName(tag)}
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              }
            />
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            {t('Select a product to preview')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
