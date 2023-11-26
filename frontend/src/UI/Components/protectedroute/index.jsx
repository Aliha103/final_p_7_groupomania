import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("userId");
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return children;
};

export default ProtectedRoute;
