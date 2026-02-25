import axiosInstance from "./axiosInstance";

const adminApi = {

    logIn :async ({email,password}) => {
        return axiosInstance.post('/admin/login',{email,password});
    },
    logOut :async () =>  {
        return axiosInstance.post('/admin/logout',{});
    },
    getOrganizations : async () => {
        return axiosInstance.get('/organization')
    },
    addOrganization :async (form) => {
        console.log(form);
        return axiosInstance.post('/organization/create',form);
    },
    updateOrganization :async (id,form) => {
        return axiosInstance.put(`/organization/${id}`,form);
    },
    deleteOrganization :async (id) => {
        return axiosInstance.delete(`/organization/${id}`);
    },
    getOrganizationDetails : async (id) =>{
        return axiosInstance.get(`/organization/${id}`);
    },
    fetchOrganizationJobs : async (id,pg) => {
        return axiosInstance.get(`/organization/${id}/jobs?page=${pg}`)
    },
    postJobOfOrganization : async (organizationId,form) => {
        console.log(organizationId,form);
        return axiosInstance.post(`/jobs/${organizationId}/newJob`,form);
    },
    editJobOfOrganization : async (organizationId,jobId,form) => {
        return axiosInstance.put(`/jobs/${organizationId}/${jobId}`,form);
    },
    deleteJob : async (id,jobId) => {
        return axiosInstance.delete(`/jobs/${jobId}/organization/${id}`);
    },
    getJobs: async (params = {}) => {
        return axiosInstance.get("/jobs", { params });
    },
    sendURLtoAi : async (websiteUrl) => {
        return axiosInstance.post(`/organization/autofill`,{websiteUrl});
    }
}

export default adminApi;