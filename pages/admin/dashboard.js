import axios from 'axios';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import React, { useEffect, useReducer } from 'react';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      state;
  }
};

function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/admin/summary');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(162,222,208,1)',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="grid  md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="font-bold">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">Заказы</Link>
            </li>
            <li>
              <Link href="/admin/products">Товары</Link>
            </li>
            <li>
              <Link href="/admin/users">Пользователи</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h1 className="mb-4 text-xl">Панель администратора</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 xl:grid-cols-4">
                <div className="card m-5 p-3">
                  <p className="text-sm">{summary.ordersPrice} руб.</p>
                  <p>Продажи</p>
                  <Link href="/admin/orders" className="text-sm italic">
                    Просмотр
                  </Link>
                </div>
                <div className="card m-5 p-3">
                  <p className="text-sm">{summary.ordersCount} </p>
                  <p>Заказы</p>
                  <Link href="/admin/orders" className="text-sm italic">
                    Просмотр
                  </Link>
                </div>
                <div className="card m-5 p-3">
                  <p className="text-sm">{summary.productsCount} </p>
                  <p>Продукты</p>
                  <Link href="/admin/products" className="text-sm italic">
                    Просмотр
                  </Link>
                </div>
                <div className="card m-5 p-3">
                  <p className="text-sm">{summary.usersCount} </p>
                  <p>Пользователи</p>
                  <Link href="/admin/users" className="text-sm italic">
                    Просмотр
                  </Link>
                </div>
              </div>
              <h2 className="text-xl">Отчет о продажах</h2>
              <Bar
                options={{
                  legend: { display: true, position: 'right' },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
