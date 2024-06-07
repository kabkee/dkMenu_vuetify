/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import "../index.css";
import App from "./App.vue";
import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';

import "./registerServiceWorker";
// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

Amplify.configure(aws_exports);


const app = createApp(App);

registerPlugins(app);

app.mount("#app");
