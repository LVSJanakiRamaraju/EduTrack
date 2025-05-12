// src/api/mockApi.js
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 1000 });

let students = [
  { id: 1, name: "raja", email: "raja@gmail.com", course: "React" },
  { id: 2, name: "ram", email: "ram@gmail.com", course: "Node.js" },
];

mock.onGet("/students").reply(200, students);

mock.onPost("/students").reply((config) => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = students.length + 1;
  students.push(newStudent);
  return [201, newStudent];
});

export default axios;
