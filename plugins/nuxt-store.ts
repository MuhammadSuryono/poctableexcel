import { createPinia } from "pinia";
import useQuotationFabric from "~/stores/quotationfabric";

export default defineNuxtPlugin(nuxtApp => {
  // base config pinia
  const pinia = createPinia();
  // pinia.use(piniaPluginPersistedstate);
  // register pinia into the app
  nuxtApp.vueApp.use(pinia);

  return {
    provide: {
      store: {
        "quotationFabric": useQuotationFabric()
      }
    }
  };
});
