import { computed } from "vue";
import { useRoute } from "vue-router";
import { useFordStore } from "@/stores/fordStore.js";

export function useBanner() {
    const route = useRoute();
    const store = useFordStore();

    const fallbackSlides = [
        {
            image: "/ford_f150.png",
            alt: "Ford F-150 on display",
        },
        {
            image: "/ford_bronco.jpeg",
            alt: "Ford Bronco in adventure setting",
        },
        {
            image: "/ford_escape.jpeg",
            alt: "Ford Escape next gateway car",
        }
    ];

    const slides = computed(() => {
        if (store.banners.length > 0) {
            return store.banners
                .filter(b => b.is_active)
                .map(b => ({
                    image: b.url,
                    alt: `Ford ${b.type}`,
                    title: b.type.toUpperCase()
                }));
        }

        return fallbackSlides;
    });

    const getModelImage = (modelName) => {
        const normalizedModel = modelName?.toLowerCase().replace(/\s+/g, '-');

        // Default mapping for hardcoded/fallback local images
        const defaultImages = {
            'f-150': '/ford_f150.png',
            'bronco-sport': '/ford_bronco.jpeg',
            'escape': '/ford_escape.jpeg'
        };

        const banner = store.getBannerByType(normalizedModel);
        return banner ? banner.url : defaultImages[normalizedModel];
    };

    return {
        slides,
        getModelImage,
        fetchData: store.fetchAllData
    };
}
