import { UserManager, WebStorageStateStore, User, UserManagerEvents } from "oidc-client-ts";
// import store from "@/store";

export default class AuthService {

private userManager: UserManager;

constructor(configuration: any) {

const IDP_URL: string = configuration.IDP_URL;
const REDIRECT_URI: string = configuration.REDIRECT_URI;
const AUTH_TOKEN_URI: string = configuration.AUTH_TOKEN_URI;
const CLIENT_ID: string = configuration.CLIENT_ID;
const SILENT_RENEW_REDIRECT_URI: string = configuration.SILENT_RENEW_REDIRECT_URI;
const POPUP_REDIRECT_URI: string = configuration.POPUP_REDIRECT_URI;

const settings: any = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: IDP_URL,
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  popup_redirect_uri: POPUP_REDIRECT_URI,
  response_type: "code",
  automaticSilentRenew: true,
  silent_redirect_uri: SILENT_RENEW_REDIRECT_URI,
  scope: "openid profile ContactCenterApi.READ_WRITE",
  post_logout_redirect_uri: AUTH_TOKEN_URI,
  loadUserInfo: true
};

this.userManager = new UserManager(settings);

this.userManager.events.addUserLoaded(_args => {
  console.log("USER LOADED EVENT");
  debugger;
  this.userManager.getUser().then(usr => {
    store.dispatch("getProducts", usr?.profile.sub) // load the users products
  });
});

this.userManager.events.addUserSignedIn(() => {
  console.log("USER SIGNED IN EVENT");
  debugger;
  this.userManager.getUser().then(usr => {
    store.dispatch("getProducts", usr?.profile.sub) // load the users products
  });
});
}

public getUser(): Promise<User|null> {
  return this.userManager.getUser();
}

public async login(): Promise<void> {
  return this.userManager.signinRedirect();
}

public logout(): Promise<void> {
  return this.userManager.signoutRedirect();
}