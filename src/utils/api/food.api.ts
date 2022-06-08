import axios from 'axios';
import { shippingDetails } from '../../../pages/cart';

const baseURL = 'https://dfoods-app.herokuapp.com';

const defaultConfig = {
  baseURL,
  timeout: 60000,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const api = axios.create({ ...defaultConfig });
api.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
    };

    return config;
  },
  (err) => Promise.reject(err),
);

class Food {
  async getProducts() {
    return api.get('/api/products');
  }

  async getSingleProduct(id: string) {
    return api.get(`/api/products/${id}`);
  }

  async addProducts(data: {
    img: string;
    title: string;
    desc: string;
    prices: number[];
  }) {
    return api.post('/api/products', data);
  }

  async deleteProduct(id: string) {
    return api.delete(`/api/products/${id}`);
  }

  async createOrder(data: shippingDetails) {
    return api.post(`/api/orders`, data);
  }

  async getOrder(id: string) {
    return api.get(`/api/orders/${id}`);
  }

  async updateOrderStatus(id: number, data: string) {
    return api.patch(`/api/orders/${id}`, { status: data });
  }

  async deleteOrder(id: number) {
    return api.delete(`/api/orders/${id}`);
  }

  async getOrders() {
    return api.get(`/api/orders`);
  }

  async login(data: { username: string; password: string }) {
    return api.post(`/api/admin`, data);
  }
}

const FoodApi = new Food();

export default FoodApi;
