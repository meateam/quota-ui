import Axios from "axios";
import { RequestStatus } from "@/utils/api.const";

const quotaApprovalRoute = "/api/quota/approval";

async function updateUserQuotaRequest(status, requestId) {
    return Axios.post(quotaApprovalRoute, {
        params: { status, id: requestId },
    });
}

export async function approveUserQuota(requestId) {
    return updateUserQuotaRequest(RequestStatus.APPROVED, requestId);
}

export async function rejectUserQuota(requestId) {
    return updateUserQuotaRequest(RequestStatus.DENIED, requestId);
}

export async function createApprovedQuota(size, info) {
    return Axios.post(`${quotaApprovalRoute}/${size}/${info}`);
}
