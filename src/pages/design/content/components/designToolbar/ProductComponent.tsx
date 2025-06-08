import { useState, useEffect } from 'react';
import { Input, Select, Card, Empty, Spin, theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDesignStore } from '@/stores/designStore';

interface Tag {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  type: string;
  sort: number;
}

interface Category {
  value: string;
  name: string;
  nameEn: string;
}

interface Product {
  id: string;
  name: string;
  nameZh: string;
  category: string;
  tags: string[];
  thumbnail: string;
  price: number;
}

const ProductComponent = () => {
  const { token } = theme.useToken();
  const { t, i18n } = useTranslation('design/content/components/designToolbar/ProductComponent');
  const setSelectedProduct = useDesignStore((state) => state.setSelectedProduct);
  const selectedProduct = useDesignStore((state) => state.selectedProduct);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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

  // 获取分类数据
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const { data } = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // 获取商品数据
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchText) params.append('search', searchText);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));

      const response = await fetch(`/api/products?${params.toString()}`);
      const { data } = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  // 监听筛选条件变化
  useEffect(() => {
    fetchProducts();
  }, [searchText, selectedCategory, selectedTags]);

  // 根据当前语言获取标签名称
  const getTagName = (tag: Tag) => {
    return i18n.language === 'en' ? tag.nameEn : tag.name;
  };

  // 根据当前语言获取分类名称
  const getCategoryName = (category: Category) => {
    return i18n.language === 'en' ? category.nameEn : category.name;
  };

  // 根据当前语言获取商品名称
  const getProductName = (product: Product) => {
    return i18n.language === 'en' ? product.name : product.nameZh;
  };

  const tagOptions = tags.map(tag => ({
    value: tag.code,
    label: getTagName(tag)
  }));

  const categoryOptions = categories.map(category => ({
    value: category.value,
    label: getCategoryName(category)
  }));

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* 搜索和筛选区域 */}
      <div className="p-4 space-y-4">
        <Input
          placeholder={t('Search products...')}
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
        <div className="flex gap-2">
          <Select
            className="flex-1"
            placeholder={t('Select category')}
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categoryOptions}
          />
          <Select
            className="flex-1"
            mode="multiple"
            placeholder={t('Select tags')}
            value={selectedTags}
            onChange={setSelectedTags}
            options={tagOptions}
            maxTagCount={2}
          />
        </div>
      </div>

      {/* 商品列表区域 */}
      <div className="flex-1 overflow-auto p-2">
        <Spin spinning={loading}>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  hoverable
                  onClick={() => handleProductClick(product)}
                  className="cursor-pointer"
                  style={{
                    border: selectedProduct?.id === product.id ? `2px solid ${token.colorPrimary}` : undefined,
                  }}
                  cover={
                    <img
                      alt={getProductName(product)}
                      src={product.thumbnail}
                      className="h-32 object-cover"
                    />
                  }
                  styles={{
                    body: {
                      padding: '12px'
                    }
                  }}
                >
                  <Card.Meta
                    title={getProductName(product)}
                  />
                </Card>
              ))}
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={t('No products found')}
            />
          )}
        </Spin>
      </div>
    </div>
  );
};

export default ProductComponent;
