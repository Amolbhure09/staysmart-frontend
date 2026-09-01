import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  //  Login Function
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user || null);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //  Signup Function
  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post("/user/signup", {
        name,
        email,
        password,
      });

      navigate("/");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //  Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  // Auto check token
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const { data } = await api.get("/user/profile", {
          headers: {
            Authorization: token,
          },
        });

        setUser(data.user);
      } catch (error) {
        console.log(error);
        logout();
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};