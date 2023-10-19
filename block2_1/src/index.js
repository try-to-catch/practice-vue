import {createApp, onMounted, reactive, ref} from 'vue'
import axios from "axios";

createApp({
    setup() {

        const search = ref('')

        const students = ref([])
        onMounted(() => {
            axios.get('http://34.82.81.113:3000/students').then(res => students.value = res.data)
        })

        function removeCompositionItem(id) {
            students.value = students.value.filter((item) => id !== item.id)
        }

        const newStudent = reactive({
            name: '',
            group: '',
            isDonePr: false
        })

        function addStudent() {
            students.value.push({
                id: students.value.slice().pop().id++,
                ...newStudent
            })

            newStudent.name = ''
            newStudent.group = ''
            newStudent.isDonePr = false
        }

        return {search, students, newStudent, addStudent, removeCompositionItem}
    }
}).mount('#app');