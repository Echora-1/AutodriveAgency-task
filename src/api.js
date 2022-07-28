import axios from "axios";
axios.defaults.baseURL = "http://hh.autodrive-agency.ru/";
axios.defaults.headers.post["Content-Type"] = "application/javascript";

export async function sendFormRequestCall(form) {
  try {
    const { data, status } = await axios.post("test-tasks/front/task-7/", form);
    return { data, status };
  } catch (err) {
    if (err.response.status === 400) {
      const { data, status } = err.response;
      return { data, status };
    }
  }
}
