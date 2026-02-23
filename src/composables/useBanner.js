import { computed } from "vue";
import { useRoute } from "vue-router";
import { useFordStore } from "@/stores/fordStore.js";

export function useBanner() {
    const route = useRoute();
    const store = useFordStore();



    const slides = computed(() => {
        const activeBanners = store.banners.filter(b => b.is_active);

        if (activeBanners.length > 0) {
            return activeBanners.map(b => ({
                image: b.url,
                alt: `Ford ${b.type}`,
                title: b.type.toUpperCase()
            }));
        }


    });

    const getModelImage = (modelName) => {
        const normalizedModel = modelName?.toLowerCase().replace(/\s+/g, '-');

        const banner = store.getBannerByType(normalizedModel);
        return banner?.url;
    };

    return {
        slides,
        getModelImage,
        fetchData: store.fetchAllData
    };
}
