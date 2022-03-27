import axios from "axios";

export const baseURL = "http://localhost:3000";

export async function _fetchCourses() {
  var response = await axios.get(baseURL + "/rest/course");
  return response;
}

export async function fetchCourses(tag) {
  console.log(tag);
  var response = await axios.get(baseURL + "/rest/course");
  return response.data;
}
export async function getFeauturedTags() {
  return ["Популярное", "ЕГЭ", "ОГЭ", "IT"];
}

export async function fetchCourse(id) {
  var response = await axios.get(baseURL + "/rest/course", {
    params: { _id: id },
  });
  return response.data;
}

export async function fetchUserCourse(id) {
  var response = await axios.get(baseURL + "/rest/course", {
    params: { _id: id },
  });
  return response.data;
}

export async function fetchLesson(id) {
  console.log(id);
  return {
    pages: [
      [
        {
          type: "Heading",
          text: "Text",
        },
        {
          type: "Body",
          text: "Text",
        },
      ],
      [
        {
          type: "Heading",
          text: "Text",
        },
        {
          type: "Body",
          text: "Text",
        },
      ],
    ],
  };
}

export async function enrollCourse(id, login, token) {
  //id - course id
  const result = axios.post(baseURL + "/me/enrollCourse", { login, token, id });
  return result;
}
