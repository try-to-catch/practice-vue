<script setup>
import {reactive, ref} from "vue";
import {useStudent} from "../composables/student.js";

const search = ref('')

const {students, addStudent: addStudent, updateStudent, deleteStudent} = useStudent()

const newStudent = reactive({
  name: '',
  group: '',
  isDonePr: false
})

function add() {
  addStudent({photo: "https://robohash.org/33", ...newStudent})

  newStudent.name = ''
  newStudent.group = ''
  newStudent.isDonePr = false
}

const editingStudentId = ref('')

function edit(student) {
  editingStudentId.value = student._id

  newStudent.name = student.name
  newStudent.photo = student.photo
  newStudent.group = student.group
  newStudent.isDonePr = student.isDonePr
}

function update() {
  updateStudent({
    _id: editingStudentId.value,
    ...newStudent
  })

  editingStudentId.value = ''

  newStudent.name = ''
  newStudent.photo = ''
  newStudent.group = ''
  newStudent.isDonePr = false
}
</script>

<template>
  <div class="">
    <input v-model="search" placeholder="Input smth" type="search">
    <table>
      <tr v-for="student in students" :class="{red: student.name.includes(search) && search !== ''}">
        <td><img :src="student.photo" alt="photo" style="height: 100px"></td>
        <td>{{ student.name }}</td>
        <td>{{ student.group }}</td>
        <td><input :checked="student.isDonePr" disabled type="checkbox"></td>
        <td class="link" role="button" @click="deleteStudent(student._id)">REMOVE</td>
        <td class="link" role="button" @click="edit(student)">Edit</td>
      </tr>
    </table>

    <div>
      <div>
        <label>
          photo
          <input v-model.trim="newStudent.photo" type="text">
        </label>
      </div>
      <div>
        <label>
          Username
          <input v-model.trim="newStudent.name" type="text">
        </label>
      </div>
      <div>
        <label>
          Group
          <select v-model="newStudent.group">
            <option value="RPZ-20-1/9">RPZ 20-1/9</option>
            <option value="RPZ-20-2/9">RPZ 20-2/9</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          complete task?
          <input v-model="newStudent.isDonePr" type="checkbox">
        </label>
      </div>
      <button v-if="editingStudentId !== ''" class="btn" role="button" @click="update">Update</button>
      <button v-else class="btn" role="button" @click="add">ADD</button>
    </div>
  </div>
</template>

<style scoped>
.btn {
  padding: 4px 20px;
}

.link {
  text-decoration: underline;
  color: cadetblue;
  cursor: pointer;
}

.red {
  color: red;
}

table {
  margin: 10px 0;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

td {
  padding: 4px 10px;
}
</style>