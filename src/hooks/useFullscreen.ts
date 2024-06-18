import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref, UnwrapRef } from 'vue';

type FullscreenState = {
    isFullscreen: Ref<UnwrapRef<boolean>>;
    toggleFullscreen: () => void;
};

const useFullscreen = (): FullscreenState => {
    const isFullscreen = ref(false);

    const toggleFullscreen = () => {
        if (!isFullscreen.value) {
            const element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    const fullscreenChangeHandler = () => {
        isFullscreen.value = !!document.fullscreenElement;
    };

    onMounted(() => {
        document.addEventListener(
            'fullscreenchange',
            fullscreenChangeHandler,
        );
    });

    onUnmounted(() => {
        document.removeEventListener(
            'fullscreenchange',
            fullscreenChangeHandler,
        );
    });

    return {
        isFullscreen,
        toggleFullscreen,
    };
};

export default useFullscreen;
