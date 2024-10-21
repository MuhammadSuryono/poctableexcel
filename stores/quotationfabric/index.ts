import {acceptHMRUpdate, defineStore} from "pinia";
import {createState} from "~/stores/quotationfabric/state";
import getters from "~/stores/quotationfabric/getters";
import actions from "~/stores/quotationfabric/actions";

const useQuotationFabric = defineStore("quotationFabric", {
    state: createState,
    getters: getters,
    actions: {
        ...actions()
    }
})

// Ensure correct store definition for HMR
if ((import.meta as any).hot) {
    (import.meta as any).hot.accept(acceptHMRUpdate(useQuotationFabric, (import.meta as any).hot));
}

export default useQuotationFabric;