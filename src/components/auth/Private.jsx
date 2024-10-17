import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

function Private(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    return props.children // adelante, bienvenido a está página privada
  } else {
    return <Navigate to={"/login"}/>
  }

}

export default Private