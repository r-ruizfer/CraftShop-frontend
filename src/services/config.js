import axios from "axios"

const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`
})

// añade el token a todas las llamadas que se hagan con este servicio de axios
service.interceptors.request.use((config) => {

  const storedToken = localStorage.getItem("authToken")
  const token = localStorage.getItem('token');

  if (storedToken) {
    config.headers.authorization = `Bearer ${storedToken}`
  } else if (token){
    config.headers.authorization =`Bearer ${token}`
  }

  return config

})

export default service