import axios from "axios";
import { base_url } from "../index";
import Cookies from "universal-cookie";
import { setLoading, showToast } from "../App";
export default class Api {
  cookies = new Cookies();
  get = async (url) => {
    setLoading(true);
    const token = this.cookies.get("token");
    try {
      const res = await axios.get(base_url + url, {
        headers: { authorization: token },
      });

      setLoading(false);
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        };
      }
    } catch (err) {
      setLoading(false);
      return err.response.data;
    }
  };
  post = async (url, body) => {
    const token = this.cookies.get("token");
    try {
      const res = await axios.post(base_url + url, body, {
        headers: { authorization: token },
      });
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        };
      }
    } catch (err) {
      return err.response.data;
    }
  };
}
