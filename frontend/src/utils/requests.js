import axios from 'axios'


export const SignUp = async (payload) => {
    try {
      const response = await axios.post('http://localhost:3000/api/user/signup', payload, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 500) return null;
      return response;
    } catch (err) {
      console.log(err);
      return [];
    }
  };