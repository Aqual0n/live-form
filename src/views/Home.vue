<template lang="pug">
div
    card-form(
        @submitForm="handleSubmitForm"
    )
</template>

<script>
import CardForm from '@/components/blanks/CardForm';

export default {
    components: {
        CardForm,
    },
    setup() {
        const handleSubmitForm = (data) => {
            console.log(data.value);
            // axios
        };
        return { handleSubmitForm };
    },
};
</script>
