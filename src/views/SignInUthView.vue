<template>
  <el-row>
    <el-col>
      <el-button @click="SignInHandler()"> Uth Sign In </el-button>
    </el-col>
  </el-row>
</template>

<script setup="ts">
import { UserManager, WebStorageStateStore, User } from 'oidc-client-ts';
//import { STSAUTH, CLIENTID, SCOPE, RESPONSETYPE, CLIENTROOT } from '../../config.ts';

const CLIENTROOT = import.meta.env.BASE_URL;
const STSAUTH = 'https://cas.uth.gr/login';
const CLIENTID = 'code_flow_client_id';
const SCOPE = 'openid profile email';
const RESPONSETYPE = 'code';
const REDIRECT_URI = 'https://cas.uth.gr/login';

const settings = {
  //userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: STSAUTH,
  client_id: CLIENTID,
  redirect_uri: REDIRECT_URI,
  popup_redirect_uri: 'https://cas.uth.gr/login',
  response_type: RESPONSETYPE,
  //automaticSilentRenew: true,
  //silent_redirect_uri: SILENT_RENEW_REDIRECT_URI,
  scope: SCOPE,
  //post_logout_redirect_uri: AUTH_TOKEN_URI,
  //loadUserInfo: true
};

const userManager = new UserManager(settings);
function SignInHandler() {
  //   userManager.signinPopup().then((value) => {
  //     console.log(value);
  //   });
  const OidcMetadata = userManager.metadataService;
  console.log(OidcMetadata);
  //   userManager.signinCallback('https://cas.uth.gr/login').then((user) => {
  //     //   const history = useHistory();
  //     console.log(user);
  //   });
  userManager.signinRedirect();
}
</script>