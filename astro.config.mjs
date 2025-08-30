import { defineConfig } from 'astro/config';

import firebase from "astro-firebase";

// https://astro.build/config
export default defineConfig({
  integrations: [firebase()]
});

// Trigger new deployment