import axiosInstance from "./axiosInstance";

const adminApi = {

    logIn :async ({email,password}) => {
        return axiosInstance.post('/admin/login',{email,password});
    },
    logOut :async () =>  {
        return axiosInstance.post('/admin/logout',{});
    },
    getCompanies : async () => {
        return axiosInstance.get('/company')
    },
    addCompany :async (form) => {
        console.log(form);
        return axiosInstance.post('/company/create',form);
    },
    updateCompany :async (id,form) => {
        return axiosInstance.put(`/company/${id}`,form);
    },
    deleteCompany :async (id) => {
        return axiosInstance.delete(`/company/${id}`);
    },
    getCompanyDetails : async (id) =>{
        return axiosInstance.get(`/company/${id}`);
    },
    fetchCompanyJobs : async (id,pg) => {
        return axiosInstance.get(`/company/${id}/jobs?page=${pg}`)
    },
    postJobOfCompany : async (companyId,form) => {
        return axiosInstance.post(`/jobs/${companyId}/newJob`,form);
    },
    editJobOfCompany : async (companyId,jobId,form) => {
        return axiosInstance.put(`/jobs/${companyId}/${jobId}`,form);
    },
    deleteJob : async (id,jobId) => {
        return axiosInstance.delete(`/jobs/${jobId}/company/${id}`);
    }
}

export default adminApi;