<script setup>
import {onMounted, ref} from "vue";
import {useStudent} from "/src/composables/student.js";

const {studentId} = defineProps({studentId: String})

const {getStudentById} = useStudent()

const student = ref(null)
onMounted(() => {
   getStudentById(studentId).then((value) => student.value = value )
})
</script>

<template>
  <div>
    <router-link :to="{name: 'students.index'}">На головну</router-link>
    <table>
      <tr v-if="student">
        <td><img :src="student.photo" alt="photo" style="height: 100px"></td>
        <td>{{ student.name }}</td>
        <td>{{ student.group }}</td>
        <td><input :checked="student.isDonePr" disabled type="checkbox"></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
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