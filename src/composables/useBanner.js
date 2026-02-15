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
        const currentLocation = route.params.location;
        if (!currentLocation) return fallbackSlides;

        const categoryBanner = store.getBannersByCategory(currentLocation);

        if (categoryBanner && categoryBanner.banner_url) {
            const urls = categoryBanner.banner_url;
            return [
                {
                    image: urls["f-150"] || "/ford_f150.png",
                    alt: "Ford F-150 on display",
                },
                {
                    image: urls["bronco-sport"] || "/ford_bronco.jpeg",
                    alt: "Ford Bronco in adventure setting",
                },
                {
                    image: urls["escape"] || "/ford_escape.jpeg",
                    alt: "Ford Escape next gateway car",
                }
            ];
        }

        return fallbackSlides;
    });

    const getModelImage = (modelName) => {
        const currentLocation = route.params.location;
        const normalizedModel = modelName?.toLowerCase().replace(/\s+/g, '-');

        // Default mapping for hardcoded/fallback local images
        const defaultImages = {
            'f-150': '/ford_f150.png',
            'bronco-sport': '/ford_bronco.jpeg',
            'escape': '/ford_escape.jpeg'
        };

        if (!currentLocation) return defaultImages[normalizedModel];

        const categoryBanner = store.getBannersByCategory(currentLocation);

        if (categoryBanner && categoryBanner.banner_url) {
            return categoryBanner.banner_url[normalizedModel] || defaultImages[normalizedModel];
        }

        return defaultImages[normalizedModel];
    };

    return {
        slides,
        getModelImage,
        fetchData: store.fetchAllData
    };
}
