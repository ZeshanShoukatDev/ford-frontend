import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// @ts-ignore
import App from "./App.vue";
// @ts-ignore
import router from "./router/index.js";
// @ts-ignore
import { useFordStore } from "./stores/fordStore.js";
import 'vue3-toastify/dist/index.css'

const app = createApp(App);

app.use(createPinia());
app.use(router);

const store = useFordStore();
store.fetchAllData();

app.mount("#app");