import apiClient from './apiClient';

class BaseService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getMany(parmas?: any): Promise<any> {
    try {
      const respone = await apiClient.get<any>(this.endpoint, { params: parmas });
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string | number): Promise<any> {
    try {
      const respone = await apiClient.get<any>(`${this.endpoint}/${id}`);
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  async create(data: any): Promise<any> {
    try {
      const respone = await apiClient.post<any>(this.endpoint, data);
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string | number, data: any): Promise<any> {
    try {
      const respone = await apiClient.put<any>(`${this.endpoint}/${id}`, data);
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string | number): Promise<any> {
    try {
      const respone = await apiClient.delete<any>(`${this.endpoint}/${id}`);
      return respone.data;
    } catch (error) {
      throw error;
    }
  }
}
export default BaseService;
