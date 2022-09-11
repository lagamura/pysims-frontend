import { ref } from 'vue'
export const resetdashboard = ref({
    reset: false,
    set_reset(value) {
        this.reset = value;
    }
})