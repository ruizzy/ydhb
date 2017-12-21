import Vue from 'vue'

const Service = {}
Service.cancelUser = params => {
  return Vue.http.post('/app/cancelUser', params)
}

export default Service
