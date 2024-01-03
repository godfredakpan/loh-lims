
import request  from 'umi-request';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchAllSupplies = async () => {
  return request(`${API_BASE_URL}/laboratory-supplies`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
  });
};

export const createSupply = async (newSupply) => {
  console.log('return', typeof(newSupply.reorder_point))
  return request(`${API_BASE_URL}/laboratory-supplies`, {
    method: 'post',
    data: newSupply,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
  });
};

export const updateSupply = async (id, updatedSupply) => {
  return request(`${API_BASE_URL}/laboratory-supplies/${id}`, {
    method: 'put',
    data: updatedSupply,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
  });
};

export const deleteSupply = async (id) => {
  return request(`${API_BASE_URL}/laboratory-supplies/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
  });
};
