import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const initialStudents = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    course: 'React',
    mobile: '+1234567890',
    address: '123 Main St, City, Country',
    dateOfBirth: '1995-05-15',
    emergencyContact: '+1987654321'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    course: 'Node.js',
    mobile: '+1234567891',
    address: '456 Oak St, City, Country',
    dateOfBirth: '1997-08-22',
    emergencyContact: '+1987654322'
  },
  { 
    id: 3, 
    name: 'Bob Wilson', 
    email: 'bob@example.com', 
    course: 'Python',
    mobile: '+1234567892',
    address: '789 Pine St, City, Country',
    dateOfBirth: '1994-03-10',
    emergencyContact: '+1987654323'
  }
];

mock.onGet('/api/students').reply(200, initialStudents);

mock.onPost('/api/students').reply((config) => {
  const student = JSON.parse(config.data);
  const newStudent = {
    id: initialStudents.length + 1,
    ...student,
  };
  initialStudents.push(newStudent);
  return [200, newStudent];
});

export const getStudents = () => axios.get('/api/students');
export const addStudent = (student) => axios.post('/api/students', student);