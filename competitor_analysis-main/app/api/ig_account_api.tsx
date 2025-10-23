import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const HASHTAG_TOP_MEDIA_URL = `${BASE_URL}/instagram/profile`;

const get_ig_account_posts = async (ig_account_name: string) => {
  try {
    console.log(`${HASHTAG_TOP_MEDIA_URL}/${ig_account_name}`)
    const response = await axios.get(`${HASHTAG_TOP_MEDIA_URL}/${ig_account_name}`);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Request failed:", error.message);
    }
    throw error;
  }
};

export default get_ig_account_posts;



