import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            redirect: {name: 'cities.index'},
        },
        {
            path: "/cities",
            name: "cities.index",
            component: () => import("/src/pages/cities/CitiesIndex.vue")
        },
        {
            path: "/cities/:city",
            name: "cities.show",
            component: () => import("/src/pages/cities/CitiesShow.vue"),
            props: true
        },
    ],
});

export default router;
