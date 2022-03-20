import axios from "axios";

const baseURL = "http://localhost:3000";
console.log(baseURL);

export async function fetchCourses(tag) {
  console.log(tag);
  if (tag == "Популярное")
    return [
      {
        _id: 0,
        name: "Попул",
        description: "Course description",
        rating: 3.6,
        image:
          "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202009/e-learning_digital_education-1200x1080.jpg?XjMNHsb4gLoU_cC7110HB7jVghJQROOj",
        price: 1,
        time: 0,
        participants: 100,
      },
    ];
  else if (tag == "ЕГЭ")
    return [
      {
        _id: 1,
        name: "Russian",
        description: "Course description",
        rating: 3.6,
        image:
          "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202009/e-learning_digital_education-1200x1080.jpg?XjMNHsb4gLoU_cC7110HB7jVghJQROOj",
        price: 0,
        time: 0,
        participants: 100,
        tags: ["ЕГЭ"],
      },
    ];
  else return [];
}
export async function getFeauturedTags() {
  return ["Популярное", "ЕГЭ", "ОГЭ", "IT"];
}

export async function fetchCourse(id) {
  console.log(id);
  return {
    _id: 1,
    name: "Russian",
    description: "Course description",
    rating: 3.6,
    image:
      "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202009/e-learning_digital_education-1200x1080.jpg?XjMNHsb4gLoU_cC7110HB7jVghJQROOj",
    price: 0,
    time: 0,
    participants: 100,
    tags: ["ЕГЭ"],
    authors: ["DarkSayori", "elem"],
    content: [
      {
        label: "Basics",
        children: [
          { label: "Nouns", id: 0 },
          { label: "Verbs", id: 1 },
        ],
      },
      {
        label: "Continous",
        children: [
          { label: "Adverbs", id: 2 },
          { label: "Verbs 2", id: 3 },
        ],
      },
    ],
    enrolled: false,
  };
}

export async function fetchUserCourse(id) {
  console.log(id);
  return {
    _id: 1,
    name: "Russian",
    description: "Course description",
    rating: 3.6,
    image:
      "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202009/e-learning_digital_education-1200x1080.jpg?XjMNHsb4gLoU_cC7110HB7jVghJQROOj",
    price: 0,
    time: 0,
    participants: 100,
    tags: ["ЕГЭ"],
    authors: ["DarkSayori", "elem"],
    content: [
      {
        label: "Basics",
        children: [
          { label: "Nouns", id: 0, completed: false },
          { label: "Verbs", id: 1, completed: false },
        ],
      },
      {
        label: "Continous",
        children: [
          { label: "Adverbs", id: 2, completed: false },
          { label: "Verbs 2", id: 3, completed: false },
        ],
      },
    ],
    enrolled: false,
  };
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
  const result = axios.post(baseURL + "/me/enrollCourse", { login, token, id });
  return result;
}
