const API_URL = 'http://localhost:5000/api/auth';


export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Server Error (404/500)" }));
      return { success: false, message: errorData.message };
    }

    return await response.json();
  } catch (error) {
    return { success: false, message: "Network Error: Check if Server is running" };
  }
};


export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Invalid Credentials or Server Error" }));
      return { success: false, message: errorData.message };
    }

    return await response.json();
  } catch (error) {
    return { success: false, message: "Network Error: Check if Server is running" };
  }
};