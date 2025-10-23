import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const HASHTAG_TOP_MEDIA_URL = `${BASE_URL}/instagram/hashtag`;

const getTopPostsByHashtag = async (hashtagName: string) => {
  try {
    const response = await axios.get(`${HASHTAG_TOP_MEDIA_URL}/${hashtagName}`);
    console.log(response)
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

export default getTopPostsByHashtag;



