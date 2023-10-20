import axios from "axios";
import {onMounted, ref} from "vue";

const URL = "http://34.82.81.113:3000"

const students = ref([])

export function useStudent() {
    function getStudents() {
        axios.get(`${URL}/students`).then(res => students.value = res.data)
    }

    onMounted(getStudents)

    function addStudent(student) {
        axios.post(`${URL}/students`, student)
            .then(data => {
                console.log(data);
                getStudents()
            })
    }

    function updateStudent(student) {
        axios.put(`${URL}/students/${student._id}`, student)
            .then(data => {
                console.log(data);
                getStudents()
            })
    }

    function deleteStudent(studentId) {
        axios.delete(`${URL}/students/${studentId}`)
            .then(data => {
                console.log(data);
                getStudents()
            })

    }

    return {students, addStudent, updateStudent, deleteStudent}
}