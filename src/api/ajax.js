import axios from 'axios'
export default function ajax(url, data = {}, type = "GET") {
  return new Promise(function (resolve, reject) {
    //执行异步ajax请求
    let promise;
    if (type.toUpperCase() === 'GET') {
      let dataStr = ""
      Object.keys(data).forEach(key => {
        let str = key + '=' + data[key] + '&'
        dataStr += str
      });
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }

    promise.then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}