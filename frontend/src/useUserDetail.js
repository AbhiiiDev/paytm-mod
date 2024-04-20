import { useEffect, useState } from "react";
import axios from "axios";

const useUserDetail = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/user/profile',
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        );
        setUserName(response.data.firstName);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetail();
  }, []);

  return userName;
};

export default useUserDetail;
