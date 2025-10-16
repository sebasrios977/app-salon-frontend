import api from "@/lib/axios";


export default {
    register(data) {
        return api.post("/auth/register", data);
    },
    confirmAccount(token) {
        return api.get(`/auth/verify/${token}`);
    },
    login(data) {
        return api.post("/auth/login", data);
    }
}