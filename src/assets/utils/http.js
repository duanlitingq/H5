import axios from 'axios';
import router from '../../router.js';
import Qs from 'qs'
axios.defaults.timeout = 200000;
// axios.defaults.baseURL ='';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        var str= config.url;
        if(str.substring(str.length-5) != 'login'){
            let token = localStorage.getItem('token');
            if(token != null){
                config.params.token = token
            }
        }
        config.headers = {
           'Content-Type': 'application/x-www-form-urlencoded;'
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);
//http response 拦截器
axios.interceptors.response.use(
    response => {
        //没有token
        if(response.data ==2){
            router.push({
                path:"/shop"
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        console.log(params)
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,Qs.stringify(data))
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}


export function del(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.delete(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}