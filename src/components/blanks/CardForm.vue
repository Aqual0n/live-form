<template lang="pug">
form.card-form(
    @submit.prevent="handleSubmit"
)
    .card-form__head
        p Traffic Runners, LLC
        span Softwear company
    tabs.card-form__tabs(
        :list="tabs.list"
        :activeTab="tabs.activeTab.value"
        @changeActiveTab="tabs.changeActiveTab"
    )
    .card-form__input
        label(
            for="urlInput"
        ) Link to the button
        input#urlInput(
            v-model="input.value"
            type="text"
        )
        .card-form__error(
            v-show="input.error && input.errorText"
        ) {{ input.errorText }}
    .card-form__advice You can use any link, but it’s length should not exceed 200 characters
    button.card-form__submit(
        type="submit"
    ) Continue
</template>

<script>
import { computed, reactive, watch } from 'vue';

import Tabs from '@/components/blanks/Tabs';

import useTabs from '@/decomposed/blanks/useTabs';

export default {
    components: {
        Tabs,
    },
    setup(props, { emit }) {
        const required = (val) => {
            return {
                error: !val.trim(),
                errorText: 'This field is required',
            };
        };

        const input = reactive({
            value: '',
            validators: { required },
            error: false,
            errorText: '',
        });

        const formData = computed(() => {
            return {
                input: input.value,
                selectedTab: tabs.activeTab.value,
            };
        });

        const validate = () => {
            let valid = true;

            for (const [, validator] of Object.entries(input.validators)) {
                const errorObject = validator(input.value);

                if (errorObject.error) {
                    input.error = true;
                    input.errorText = errorObject.errorText;
                    valid = false;
                }
            }

            return valid;
        };

        const handleSubmit = () => {
            if (validate()) {
                emit('submitForm', formData);
            }
        };

        watch(
            () => input.value,
            () => {
                input.error = false;
            },
        );

        const tabs = useTabs([
            {
                text: 'Standard',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="22" viewBox="0 0 17 22"><path fill="#FFF" d="M14.875 0C16.048 0 17 .924 17 2.063v17.875C17 21.075 16.048 22 14.875 22H2.125C.952 22 0 21.076 0 19.937V2.063C0 .925.952 0 2.125 0h12.75zm-4.423 17.27H3.4l-.114.007c-.447.054-.793.424-.793.873 0 .486.406.88.907.88h7.052l.114-.007c.447-.054.793-.424.793-.873 0-.486-.406-.88-.907-.88zm3.022-3.3H3.4l-.114.007c-.447.054-.793.424-.793.873 0 .486.406.88.907.88h10.074l.114-.007c.447-.054.793-.424.793-.873 0-.486-.406-.88-.907-.88zm-2.015-3.3H3.4l-.114.007c-.447.054-.793.424-.793.873 0 .486.406.88.907.88h8.06l.113-.007c.447-.054.793-.424.793-.873 0-.486-.406-.88-.907-.88zM7.933 2.42H3.4l-.114.007c-.447.054-.793.424-.793.873 0 .486.406.88.907.88h4.533l.114-.007c.447-.054.793-.424.793-.873 0-.486-.406-.88-.907-.88z"/></svg>',
            },
            {
                text: 'Event',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22"><path fill="#77838F" d="M6.277 12.375H4.58c-.28 0-.509-.232-.509-.516v-1.718c0-.284.23-.516.51-.516h1.696c.28 0 .509.232.509.516v1.718c0 .284-.23.516-.51.516zm4.58-.516v-1.718c0-.284-.229-.516-.509-.516H8.652c-.28 0-.51.232-.51.516v1.718c0 .284.23.516.51.516h1.696c.28 0 .51-.232.51-.516zm4.072 0v-1.718c0-.284-.23-.516-.51-.516h-1.696c-.28 0-.509.232-.509.516v1.718c0 .284.23.516.51.516h1.696c.28 0 .509-.232.509-.516zm-4.072 4.125v-1.718c0-.284-.229-.516-.509-.516H8.652c-.28 0-.51.232-.51.516v1.718c0 .284.23.516.51.516h1.696c.28 0 .51-.232.51-.516zm-4.071 0v-1.718c0-.284-.23-.516-.51-.516H4.58c-.28 0-.509.232-.509.516v1.718c0 .284.23.516.51.516h1.696c.28 0 .509-.232.509-.516zm8.143 0v-1.718c0-.284-.23-.516-.51-.516h-1.696c-.28 0-.509.232-.509.516v1.718c0 .284.23.516.51.516h1.696c.28 0 .509-.232.509-.516zM19 4.813v15.125C19 21.075 18.088 22 16.964 22H2.036C.912 22 0 21.076 0 19.937V4.813C0 3.675.912 2.75 2.036 2.75H4.07V.516c0-.284.23-.516.51-.516h1.696c.28 0 .509.232.509.516V2.75h5.428V.516c0-.284.23-.516.51-.516h1.696c.28 0 .509.232.509.516V2.75h2.035c1.124 0 2.036.924 2.036 2.063zM16.964 19.68V6.875H2.036V19.68c0 .141.114.258.254.258h14.42c.14 0 .254-.117.254-.258z"/></svg>\n',
            },
            {
                text: 'Alert',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" viewBox="0 0 28 22"><path fill="#77838F" d="M4.9 8.25c0-.57-.47-1.031-1.05-1.031h-2.8C.47 7.219 0 7.68 0 8.25c0 .57.47 1.031 1.05 1.031h2.8c.58 0 1.05-.461 1.05-1.031zM2.26 2.784l2.425 1.375c.325.192.73.197 1.06.012.33-.184.534-.53.531-.902-.002-.373-.209-.716-.541-.896L3.31.998C2.985.805 2.58.8 2.25.985c-.33.184-.534.53-.531.902.002.373.209.716.541.897zm20.531 1.513c.185 0 .366-.048.525-.138l2.425-1.375c.49-.29.654-.913.367-1.4-.286-.487-.916-.658-1.417-.386l-2.425 1.375c-.411.233-.612.709-.489 1.16.123.45.539.764 1.014.764zM14 22c1.546 0 2.8-1.231 2.8-2.75h-5.6c0 1.519 1.254 2.75 2.8 2.75zM26.95 7.219h-2.8c-.58 0-1.05.461-1.05 1.031 0 .57.47 1.031 1.05 1.031h2.8c.58 0 1.05-.461 1.05-1.031 0-.57-.47-1.031-1.05-1.031zm-5.953 1.718c0-3.338-2.384-6.011-5.598-6.667v-.895C15.4.615 14.772 0 14 0c-.773 0-1.4.616-1.4 1.375v.895c-3.212.656-5.596 3.33-5.596 6.668 0 4.396-1.58 5.737-2.426 6.629-.244.251-.379.586-.377.933.005.705.569 1.375 1.404 1.375h16.792c.836 0 1.4-.67 1.404-1.375.002-.347-.133-.682-.377-.933-.845-.892-2.426-2.233-2.426-6.63z"/></svg>\n',
                disabled: true,
            },
        ]);

        return { handleSubmit, tabs, input };
    },
};
</script>

<style lang="scss" scoped>
.card-form {
    text-align: left;
    box-sizing: border-box;
    width: 512px;
    padding: 36px 32px 80px 40px;
    margin: 0 auto;
    border-radius: 4px;
    box-shadow: 0 8px 8px 0 rgba(119, 131, 143, 0.16);

    &__head {
        margin-bottom: 26px;
        line-height: 1.5;

        p {
            color: #000;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 2px;
        }

        span {
            font-size: 18px;
            color: #828e9a;
            font-weight: 600;
        }
    }

    &__tabs {
        margin-bottom: 32px;
    }

    &__input {
        margin-bottom: 24px;

        label {
            font-size: 18px;
            font-weight: 600;
            color: #77838f;
            display: block;
            margin-bottom: 5px;
        }

        input {
            box-sizing: border-box;
            width: 100%;
            height: 48px;
            padding: 4px 12px;
            border-radius: 24px;
            border: solid 1px rgba(119, 131, 143, 0.56);
        }
    }

    &__error {
        color: red;
        margin-bottom: 8px;
    }

    &__advice {
        font-size: 16px;
        max-width: 383px;
        line-height: 1.5;
        color: #000;
        margin-bottom: 17px;
    }

    &__submit {
        border: none;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        line-height: 40px;
        border-radius: 27px;
        background-color: #377dff;
        padding: 0 28px;
    }
}
</style>
