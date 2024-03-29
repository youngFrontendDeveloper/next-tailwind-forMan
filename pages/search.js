import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { Store } from '@/utils/Store';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import Link from 'next/link';

// Количество выводимых на страницу товаров
const PAGE_SIZE = 4;

//Опции цен для фильтра по цене
const prices = [
  {
    name: 'от 1 до 50 руб.',
    value: '1-50',
  },
  {
    name: 'от 51 до 200 руб.',
    value: '51-200',
  },
  {
    name: 'от 201 до 1000 руб',
    value: '201-1000',
  },
  {
    name: 'от 1001 до 3000 руб',
    value: '1001-3000',
  },
];

// Значения для рейтинга
const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const router = useRouter();
  console.log(router);
  const {
    query = 'all', // первоначальное значение
    category = 'all', // первоначальное значение
    brand = 'all', // первоначальное значение
    price = 'all', // первоначальное значение
    rating = 'all', // первоначальное значение
    sort = 'featured', // первоначальное значение
    page = 1, // первоначальное значение
  } = router.query;

  console.log(router.query);

  const { products, countProducts, categories, brands, pages } = props;

  // Функция для фильтра
  const filterSearch = ({
    page: page,
    category: category,
    brand: brand,
    sort: sort,
    min: min,
    max: max,
    searchQuery: searchQuery,
    price: price,
    rating: rating,
  }) => {
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('Извините, продукт на складе закончился');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title="search">
      <Link href="/" className="text-sm italic">
        Перейти к покупкам
      </Link>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <div className="my-3">
            <h2>Категории</h2>
            <select
              className="w-full"
              value={category}
              onChange={categoryHandler}
            >
              <option value="all">Все</option>
              {categories &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <h2>Бранд</h2>
            <select className="w-full" value={brand} onChange={brandHandler}>
              <option value="all">Все</option>
              {brands &&
                brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <h2>Цена</h2>
            <select className="w-full" value={price} onChange={priceHandler}>
              <option value="all">Все</option>
              {prices &&
                prices.map((price) => (
                  <option key={price.value} value={price.value}>
                    {price.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <h2>Рейтинг</h2>
            <select className="w-full" value={rating} onChange={ratingHandler}>
              <option value="all">Все</option>
              {ratings &&
                ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} star{rating > 1 && 's'} & up
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={() => router.push(`/search?query=${query}`)}
            title="Сбросить фильтры"
            className="danger-button w-full padding "
          >
            Сбросить фильтры
          </button>
        </div>
        <div className="md:col-span-3">
          <div className="mb-2 flex items-center justify-between border-b-2 pb-2">
            <div className="flex items-center">
              {products.length === 0
                ? 'Ничего не найдено'
                : `Найдено: ${countProducts}`}{' '}
              {/* <br />
              {query !== 'all' && query !== '' && 'Товар: ' + query + ', '}
              {category !== 'all' && 'Категория: ' + category + ', '}
              {brand !== 'all' && 'Бренд: ' + brand + ', '}
              {price !== 'all' && ' Цена: ' + price + ', '}
              {rating !== 'all' && ' Рейтинг: ' + rating + ' & up'} */}
              {/* &nbsp; */}
              {/* {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              brand !== 'all' ||
              rating !== 'all' ||
              price !== 'all' ? (
                <button
                  onClick={() => router.push(`/search?query=${query}`)}
                  title="Сбросить фильтры"
                  className="ml-5"
                >
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                </button>
              ) : null} */}
            </div>
            <div>
              Сортировать по{' '}
              <select value={sort} onChange={sortHandler}>
                <option value="featured">Популярности</option>
                <option value="lowest">Цене: дешевые сверху</option>
                <option value="highest">Цене: дорогие сверху</option>
                <option value="toprated">Отзывам</option>
                <option value="newest">Новым поступлениям</option>
              </select>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3  ">
              {products.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
            <ul className="flex">
              {products.length > 0 &&
                [...Array(pages).keys()].map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`default-button m-2 ${
                        page === pageNumber + 1 ? 'font-bold' : ''
                      } `}
                      onClick={() => pageHandler(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          $or: [
            {
              name: {
                $regex: searchQuery,
                $options: 'i',
              },
            },
            {
              slug: {
                $regex: searchQuery,
                $options: 'i',
              },
            },
            {
              brand: {
                $regex: searchQuery,
                $options: 'i',
              },
            },
            {
              description: {
                $regex: searchQuery,
                $options: 'i',
              },
            },
          ],
        }
      : {};

  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};
  const order =
    sort === 'featured'
      ? { isFeatured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  await db.connect();
  const categories = await Product.find().distinct('category');
  const brands = await Product.find().distinct('brand');
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });

  await db.disconnect();
  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}
