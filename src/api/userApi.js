import axios from "axios";

// const BaseURL = 'http://localhost:5000/api';
const BaseURL = 'https://careerspage-backend.onrender.com/api';

const userApi = {
    getCompaniesForUser : async (page) => {
        return axios.get(`${BaseURL}/company/page/${page}`);
    },
    getCompanyJobs : async (companyId,page) => {
        return axios.get(`${BaseURL}/jobs/${companyId}?page=${page}`);
    },
    sendEmailToServer : async (email) => {
        return axios.post(`${BaseURL}/alert/send-otp`,email);
    },
    verifyOtp : async (data) => {
        console.log(data.email,data.otp);
        return axios.post(`${BaseURL}/alert/verify-otp`,{email:data.email,otp:data.otp});
    },
    submitJobAlert : async (data) => {
        console.log(data);
        return axios.post(`${BaseURL}/alert/submit-alert`,data);
    },
    getUserAlert : async (alertId) => {
        console.log(alertId);
        return axios.get(`${BaseURL}/alert/get-userAlert/${alertId}`);
    },
    submitContactForm : async (form) => {
        return axios.post(`${BaseURL}/alert/submit-contact-form`,form);
    },
    getInputData : async (mode) => {
        return axios.get(`${BaseURL}/jobs/${mode}/input-data`,);
    },
    searchJobs: async ({ query, mode, page = 1, limit = 10 }) => {
        return axios.get(`${BaseURL}/jobs/search`, {
          params: {
            [mode]: query,
            page,
            limit
          }
        });
      },      

}

export default userApi;