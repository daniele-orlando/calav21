<script lang="ts">
    import {
        defineComponent,
    } from 'vue'

    export default defineComponent({
        emits: [
            'continue',
        ],

        setup(props, context) {
            const {emit} = context

            function onEnterClick() {
                emit('continue')
            }

            return {
                onEnterClick,
            }
        },
    })
</script>

<template>
    <div class="WelcomeView-66b9 std-extend-v std-stack v">
        <div class="card-65c7 std-flex column align-center">
            <p class="title-f9fb std-uppercase">
                Ohooooh,
                benvenutiii
            </p>

            <i class="std-space-v m"/>

            <h1 class="subtitle-0307 std-uppercase">
                Calendario Dell'Avvento 2021
            </h1>

            <i class="std-space-v m"/>

            <div class="button-wrap-8e94">
                <button
                    class="button-f8d5 std-button dye std-text-subtitle1"
                    v-on:click="onEnterClick"
                >
                    Entra
                </button>
            </div>
        </div>
    </div>
</template>

<style>
    .WelcomeView-66b9 {
        padding: var(--view-gutter);
        transition: all 2s;
    }
    .WelcomeView-66b9.v-enter-from,
    .WelcomeView-66b9.v-leave-to {
        opacity: 0;
    }

    .card-65c7 {
        position: relative;
        border-radius: var(--std-radius-maxi);
        padding: var(--view-gutter);
        text-align: center;
        background-image: url('@/lib/resources/bg5.jpg');
        background-position: 0% 0%;
        background-size: cover;
        background-repeat: no-repeat;
        isolation: isolate;
        transition: all 1.5s cubic-bezier(0, 1.6, 0.9, 1.1);
    }
    .WelcomeView-66b9.v-enter-from .card-65c7 {
        transform: scale(1.4);
    }
    .card-65c7::after {
        content: '';
        position: absolute;
        z-index: -1;
        inset: 0;
        border-radius: var(--std-radius-maxi);
        background-color: hsl(0deg 0% 0% / .4);
    }

    .title-f9fb {
        font-size: clamp(1rem, 8vw, 4rem);
        font-weight: var(--std-weight-light);
        line-height: 1;
    }
    .subtitle-0307 {
        font-size: clamp(1rem, 4vw, 2rem);
        font-weight: var(--std-weight-medium);
    }

    .button-wrap-8e94 {
        transition: all 1s cubic-bezier(0, 1.6, 0.9, 1.1) 1.5s;
    }
    .WelcomeView-66b9.v-enter-from .button-wrap-8e94 {
        opacity: 0;
        transform: translateY(-2rem);
    }
</style>
