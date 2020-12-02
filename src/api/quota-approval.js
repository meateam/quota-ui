import Axios from "axios";
import { baseURL } from "@/config";
import { RequestStatus } from "@/utils/api.const";

async function updateUserQuotaRequest(status, userId) {
  return Axios.post(`${baseURL}/api/quota-approval`, {
    params: { status, userId },
  });
}

export async function approveUserQuota(userId) {
  return updateUserQuotaRequest(RequestStatus.APPROVED, userId);
}

export async function rejectUserQuota(userId) {
  return updateUserQuotaRequest(RequestStatus.DENIED, userId);
}
