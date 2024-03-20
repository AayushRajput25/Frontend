import axios from 'axios'

export async function GetAllCourses() {
  try {
    const response = await axios.get(`http://localhost:8080/teacher/course/7`)
    return response.data
  } catch (ex) {
    console.log("error")
  }
}

export default GetAllCourses
