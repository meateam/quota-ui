import Axios from "axios";

export async function getUserQuota(userId) {
    const res = await Axios.get(`/api/users/${userId}/quota`);
    return res.data;
}
