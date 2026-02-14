import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cards';


export const createCard = async (cardData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(API_URL, cardData, config);
  return response.data;
};


export const getCards = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};


export const updateCard = async (cardId, updatedData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.put(`${API_URL}/${cardId}`, updatedData, config);
  return response.data;
};

export const deleteCard = async (cardId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.delete(`${API_URL}/${cardId}`, config);
  return response.data;
};