
import useAuthStore from "../store/auth-store";

const useAuth = () => {
  const { isAuthenticated, user, token } = useAuthStore();
  return { isAuthenticated, user, token };
};

export default useAuth;
