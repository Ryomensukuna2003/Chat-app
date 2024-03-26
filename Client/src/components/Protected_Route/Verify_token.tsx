import axios from "axios";

const verifyToken = async (token: string) => {
  try {
    const response = await axios.post("http://localhost:5000/api/verifyToken", {token});
    return response.data.isValid;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};

export default verifyToken;
