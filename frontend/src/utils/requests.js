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
      return err.response.data;
    }
  };

  export const Login = async (payload) => {
      try {
          const response = await axios.post('http://localhost:3000/api/user/login', payload, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
  
          if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('token', token);
              return response.data;
          } else {
              throw new Error('Login failed');
          }
      } catch (error) {
          if (error.response && error.response.data) {
              return error.response.data;
          } else {
              console.log(error);
              return { ok: false, message: 'Something went wrong' };
          }
      }
  };
  