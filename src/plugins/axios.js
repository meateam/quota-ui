"use strict";

import Vue from "vue";
import axios from "axios";
import { baseURL } from "@/config";

const config = {
    baseURL,
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(request) {
        request.headers["Authorization"] = `Bearer ${store.state.auth.token}`;
        if (!store.state.auth.token) return Promise.reject();
        return request;
    },
    function(error) {
        if (error.status === 401) return store.dispatch("authenticate");
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue, _options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            },
        },
        $axios: {
            get() {
                return _axios;
            },
        },
    });
};

Vue.use(Plugin);

export default Plugin;
