import { ref } from 'vue';

export default function useTabs(list) {
    const activeTab = ref(0);

    const changeActiveTab = (newActiveTab) => {
        activeTab.value = newActiveTab;
    };

    return {
        activeTab,
        list,
        changeActiveTab,
    };
}
