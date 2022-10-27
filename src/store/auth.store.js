import { defineStore } from 'pinia';

import { fetchWrapper } from '@/composables';
import { router } from '@/router';
import { useAlertStore } from '@/store';

const baseUrl = '/api';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    user_details: JSON.parse(localStorage.getItem('user_details')),
    returnUrl: null
  }),
  actions: {
    async login(username, password) {
      const formData = new FormData()
      formData.append("username", username);
      formData.append("password", password);
      try {
        const user = await fetchWrapper.post(`${baseUrl}/token`, formData);

        // update pinia state
        this.user = user;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));

        const user_details = await fetchWrapper.get(`${baseUrl}/users/me`);

        // update pinia state
        this.user_details = user_details;
        console.log(this.user_details)

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user_details', JSON.stringify(user_details));
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        console.log('ERROR CATCH ON GET /TOKEN OR ON USERS/ME')
      }
      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/');

    },
    logout() {
      console.log("logout triggered")
      this.user = null;
      localStorage.removeItem('user');
      router.push('/account/login');
    },
    isAdmin() {
      if (this.user_details.access_level == 'admin_access')
        return (true)
      else {
        return(false)
      }
    }
  }
});
