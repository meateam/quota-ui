"use strict";

import Vue from "vue";
import axios from "axios";
import store from "@/store";
import { baseURL } from "@/config";

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = baseURL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const _axios = axios.create();

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

Plugin.install = function(Vue) {
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
