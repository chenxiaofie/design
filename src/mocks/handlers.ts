import { http, HttpResponse } from 'msw';

// 标签数据
const tags = [
  {
    id: '1',
    code: 'casual',
    name: '休闲',
    nameEn: 'Casual',
    type: 'style',
    sort: 1,
  },
  {
    id: '2',
    code: 'summer',
    name: '夏季',
    nameEn: 'Summer',
    type: 'season',
    sort: 2,
  },
  {
    id: '3',
    code: 'winter',
    name: '冬季',
    nameEn: 'Winter',
    type: 'season',
    sort: 3,
  },
  {
    id: '4',
    code: 'dress',
    name: '连衣裙',
    nameEn: 'Dress',
    type: 'style',
    sort: 4,
  },
];

// 商品数据
const products = [
  {
    id: '1',
    name: 'Basic T-Shirt',
    nameZh: '基础款T恤',
    category: 'clothing',
    tags: ['casual', 'summer'],
    thumbnail: 'https://www.mszxdz.com/image/catalog/主图/F-128-1-1-1-1-1-560x630.png?v=1725074135',
    price: 29.99,
  },
  {
    id: '2',
    name: 'Denim Jacket',
    nameZh: '牛仔夹克',
    category: 'clothing',
    tags: ['casual', 'winter'],
    thumbnail: 'https://www.mszxdz.com/image/catalog/主图/F-128-1-1-1-1-1-560x630.png?v=1725074135',
    price: 89.99,
  },
  {
    id: '3',
    name: 'Summer Dress',
    nameZh: '夏季连衣裙',
    category: 'clothing',
    tags: ['casual', 'summer', 'dress'],
    thumbnail: 'https://www.mszxdz.com/image/catalog/主图/F-128-1-1-1-1-1-560x630.png?v=1725074135',
    price: 59.99,
  },
];

// 分类数据
const categories = [
  { value: 'all', name: '所有分类', nameEn: 'All Categories' },
  { value: 'clothing', name: '服装', nameEn: 'Clothing' },
  { value: 'accessories', name: '配饰', nameEn: 'Accessories' },
  { value: 'shoes', name: '鞋类', nameEn: 'Shoes' },
];

export const handlers = [
  // 获取标签列表
  http.get('/api/tags', () => {
    return HttpResponse.json({
      code: 0,
      data: tags,
    });
  }),

  // 获取分类列表
  http.get('/api/categories', () => {
    return HttpResponse.json({
      code: 0,
      data: categories,
    });
  }),

  // 获取商品列表
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || 'all';
    const tagList = url.searchParams.get('tags')?.split(',') || [];

    // 筛选商品
    const filteredProducts = products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.nameZh.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      const matchesTags = tagList.length === 0 || 
        tagList.every(tag => product.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });

    // 模拟网络延迟
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          HttpResponse.json({
            code: 0,
            data: filteredProducts,
          })
        );
      }, 500);
    });
  }),
]; 