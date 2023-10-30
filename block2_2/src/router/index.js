import {createRouter, createWebHistory} from "vue-router";
import {useAuth} from "/src/composables/auth.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            redirect: {name: 'students.index'},
        },
        {
            path: "/students",
            name: "students.index",
            component: () => import("/src/pages/students/StudentsIndex.vue")
        },
        {
            path: "/students/:studentId",
            name: "students.show",
            component: () => import("/src/pages/students/StudentsShow.vue"),
            props: true,
            meta: {requiresAuth: true}
        },
        {
            path: "/login",
            name: "login",
            component: () => import("/src/pages/Login.vue"),
        },
    ],
})


const {user} = useAuth()
router.beforeEach((to, from) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (user.value === null) {
            return ({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
})


export default router;