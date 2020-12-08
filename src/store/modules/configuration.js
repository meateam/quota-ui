import { fetchConfig } from "@/api/configuration";

const state = {
    authUrl: "",
    quotaApprovalUrl: "",
};

const getters = {
    authUrl: (state) => state.authUrl,
    quotaApprovalUrl: (state) => state.quotaApprovalUrl,
};

const actions = {
    async fetchConfig({ commit, dispatch }) {
        try {
            const config = await fetchConfig();
            commit("setConfig", config);
        } catch (err) {
            dispatch("onError", err);
        }
    },
};

const mutations = {
    setConfig: (state, config) => {
        (state.authUrl = config.authUrl),
            (state.quotaApprovalUrl = config.quotaApprovalUrl);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
