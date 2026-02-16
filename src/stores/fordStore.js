import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useFordStore = defineStore("ford", () => {
    const banners = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const isLoaded = ref(false);

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    async function fetchAllData() {
        if (isLoaded.value || loading.value) return;

        loading.value = true;
        error.value = null;

        try {
            const [bannersRes] = await Promise.all([
                axios.get(`${baseURL}/banners/`),
            ]);

            banners.value = bannersRes.data;

            isLoaded.value = true;
        } catch (err) {
            console.error("Error fetching Ford data:", err);
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    const getBannerByType = (type) => {
        if (!type) return null;
        return banners.value.find(
            (b) => b.type.toLowerCase() === type.toLowerCase() && b.is_active
        );
    };

    return {
        banners,
        loading,
        error,
        isLoaded,
        fetchAllData,
        getBannerByType,
    };
});
