import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null
    }),
    actions: {
        success(message) {
            this.alert = { message, type: 'alert-success' };
            alert(this.alert.message)
        },
        error(message) {
            this.alert = { message, type: 'alert-danger' };
            alert(this.alert.message)
        },
        clear() {
            this.alert = null;
        }
    }
});