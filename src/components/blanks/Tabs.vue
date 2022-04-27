<template lang="pug">
.tabs
    button.tabs__item(
        v-for="(tab, index) in list"
        type="button"
        :class="{ disabled: tab.disabled, active: index === activeTab }"
        :disabled="tab.disabled"
        @click="$emit('changeActiveTab', index)"
    )
        div(
            v-show="tab.icon"
            v-html="tab.icon"
        )
        span {{ tab.text }}
</template>

<script>
export default {
    emits: ['changeActiveTab'],
    props: {
        list: {
            required: true,
            type: Array,
        },
        activeTab: {
            required: true,
            type: Number,
        },
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss">
.tabs {
    display: flex;

    &__item {
        cursor: pointer;
        width: stretch;
        border: none;
        color: #77838f;
        background-color: #e7eaf3;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;

        transition: 0.3s ease;
        transition-property: background-color, color;

        span {
            padding-left: 8px;
        }

        svg {
            path {
                transition: 0.3s ease;
                transition-property: opacity;
                fill: #77838f;
            }
        }

        & + & {
            margin-left: 2px;
        }

        &.active {
            background-color: #377dff;
            color: #fff;

            svg {
                path {
                    fill: #fff;
                }
            }
        }

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
        }

        &:first-child {
            border-radius: 24px 0 0 24px;
        }

        &:last-child {
            border-radius: 0 24px 24px 0;
        }
    }
}
</style>
