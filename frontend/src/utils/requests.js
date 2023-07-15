import axios from 'axios'
import { useParams } from 'react-router-dom';


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
          const response = await axios.post('http://localhost:3000/api/user/login', payload , {
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

export const getAssignments = async() => {

    try {
      const response = await axios.get(`http://localhost:3000/api/user/getAssignments`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch(err){
      console.log(err);
    }
};

export const getAssignment = async(assignment_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/user/getAssignment/${assignment_id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch(err){
    console.log(err);
  }
};

export const createAssignment  = async(payload) => {

  try {

    const response = await axios.post('http://localhost:3000/api/teacher/createAssignment', payload, {
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

export const editAssignment = async (assignment_id, payload) => { 
  try {
    const { _id, createdBy, createdAt,status, __v, subsmissions,  ...updatedPayload } = payload;
    const response = await axios.put(`http://localhost:3000/api/teacher/editAssignment/${assignment_id}`, updatedPayload, {
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
        "Content-Type" : 'application/json'
      }
    });
    console.log(response)
    if (response.status === 500) return null;
    return response;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};


export const sendSubmission  = async(payload, assignment_id) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/student/submit/${assignment_id}`, payload, {
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



export const getSubmissions = async(assignment_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/teacher/getSubmissions/${assignment_id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch(err){
    console.log(err);
  }
};

export const getSubmission = async(submission_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/teacher/getSubmission/${submission_id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch(err){
    console.log(err);
  }
};

export const gradeSubmission = async(submission_id, payload) => {

  try {
    const response = await axios.put(`http://localhost:3000/api/teacher/gradeSubmission/${submission_id}`, payload , {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    });
    
    if(response.status === 200 ) return response.data;

   
  } catch(error){
    return error.response.data;
  }
}

export const getCourses = async() => {

  try {
    const response = await axios.get(`http://localhost:3000/api/user/getCourses` ,{
      headers: {
        "Authorization" :"Bearer " + localStorage.getItem("token"),
        "Content-Type" : 'application/json'
      }
    });

    return response.data;

  } catch(error) {
    return error.reponse.data;
  }
}

export const createCourse = async(payload) => {
  try {

    const response = await axios.post(`http://localhost:3000/api/teacher/createCourse`, payload, {
      headers : {
        "Authorization" :"Bearer " + localStorage.getItem("token"),
        "Content-Type" : 'application/json'
      }
    })
    if(response.status === 200 ) return response

  } catch(error) {
    return error.response.data;
  }
}

  