<script lang="ts">
    import {
        defineComponent,
        onBeforeUpdate,
        onMounted,
        reactive,
        ref,
        watch,
    } from 'vue'
    import Object1 from '@/lib/resources/obj1.png'
    import {Calendar, Months} from '../model'
    import type {Step} from '../model'

    export const StorageKey = 'CalAv-V1'

    export default defineComponent({
        setup(props, context) {
            const state = reactive(createDefaultState())
            const stepsRef = ref<Array<HTMLDivElement>>([])

            onMounted(() => {
                try {
                    const savedSerializedState = localStorage.getItem(StorageKey)
                    if (! savedSerializedState) {
                        return
                    }
                    const savedState = JSON.parse(savedSerializedState)
                    if (! savedState) {
                        return
                    }
                    state.viewedSteps = savedState
                }
                catch (error) {
                    console.error(error)
                }
            })

            onBeforeUpdate(() => {
                stepsRef.value = []
            })

            watch(() => state.viewedSteps, () => {
                try {
                    localStorage.setItem(StorageKey, JSON.stringify(state.viewedSteps))
                }
                catch (error) {
                    console.error(error)
                }
            })

            function onStepClick(step: Step, idx: number) {
                const stepState = stepStateFor(step)
                const stepElement = stepsRef.value[idx]

                if (! stepElement) {
                    return
                }

                switch (stepState) {
                    case 'visible': {
                        animateVisibleStep(stepElement)
                    } break
                    case 'hidden': {
                        const stepKey = stepKeyFor(step)
                        state.viewedSteps = [...state.viewedSteps, stepKey]
                    } break
                    case 'locked': {
                        animateLockedStep(stepElement)
                    } break
                }
            }

            function stepStateFor(step: Step) {
                const now = Date.now()
                const stepKey = stepKeyFor(step)
                const isVisible = state.viewedSteps.includes(stepKey)
                const isLocked = now < step.date.getTime()

                if (isVisible) {
                    return 'visible'
                }
                if (isLocked) {
                    return 'locked'
                }
                return 'hidden'
            }

            return {
                Calendar,
                Months,
                Object1,
                onStepClick,
                state,
                stepsRef,
                stepStateFor,
            }
        },
    })

    export function createDefaultState(): State {
        return {
            viewedSteps: [],
        }
    }

    export function stepKeyFor(item: Step) {
        return [
            item.date.getFullYear(),
            item.date.getMonth() + 1,
            item.date.getDate(),
        ].join('.')
    }

    export function animateVisibleStep(el: HTMLElement) {
        const options: KeyframeAnimationOptions = {
            duration: 1000,
            easing: 'ease',
        }

        try {
            el.animate([
                {transform: 'scale(1) rotate(0deg)'},
                {transform: 'scale(1.2) rotate(-2deg)'},
                {transform: 'scale(1.2) rotate(2deg)'},
                {transform: 'scale(1) rotate(0deg)'},
            ], options)
        }
        catch (error) {
            console.error(error)
        }
    }

    export function animateLockedStep(el: HTMLElement) {
        const options: KeyframeAnimationOptions = {
            duration: 1000,
            easing: 'ease',
        }

        try {
            el.animate([
                {transform: 'translateX(0%)'},
                {transform: 'translateX(-2%)'},
                {transform: 'translateX(2%)'},
                {transform: 'translateX(-2%)'},
                {transform: 'translateX(2%)'},
                {transform: 'translateX(0%)'},
            ], options)
        }
        catch (error) {
            console.error(error)
        }
    }

    // Types ///////////////////////////////////////////////////////////////////

    export interface State {
        viewedSteps: Array<string>
    }
</script>

<template>
    <div class="CalendarView-c7e0 std-flex column align-center">
        <p class="intro-dd0e std-text-h5 std-weight-light">
            Aspettando l'amato Leone 🦁,
            allietiamoci l'attesa scoprendo cosa si nasconde
            sotto la finestrella del giorno.
        </p>

        <i class="std-space-v l"/>

        <p class="today-6f90 std-uppercase">
            Oggi è il
            <b>
                {{ new Date().getDate() }}
                {{ Months[(new Date().getMonth())] }}
            </b>
        </p>

        <i class="std-space-v xxl"/>

        <div class="grid-a66e std-flex center wrap">
            <div
                v-for="(item, idx) of Calendar"
                :ref="el => stepsRef[idx] = el"
                :key="idx"
                :class="['item-134f', stepStateFor(item)]"
            >
                <h6 class="month-5566 std-uppercase">
                    {{ Months[item.date.getMonth()] }}
                </h6>

                <div
                    class="content-9eaf std-flex column end"
                    v-on:click="onStepClick(item, idx)"
                >
                    <img
                        class="picture-eb69 std-layer std-cover std-media-cover"
                        :src="item.picture"
                    />

                    <p class="caption-0c01 std-weight-regular">
                        {{ item.description }}
                    </p>

                    <img
                        class="cover-1508 std-layer std-cover std-media-cover"
                        :src="Object1"
                    />
                </div>

                <h6 class="day-3b33">
                    {{ item.date.getDate() }}
                </h6>
            </div>
        </div>
    </div>
</template>

<style>
    .CalendarView-c7e0 {
        height: 100vh;
        max-height: 100vh;
        padding: var(--view-gutter);
        background-image: url('@/lib/resources/bg1.webp');
        background-position: center;
        background-size: cover;
        overflow: auto;
        isolation: isolate;
        transition: all 2s;
    }
    .CalendarView-c7e0.v-enter-from {
        opacity: 0;
    }

    .CalendarView-c7e0::before {
        content: '';
        position: fixed;
        z-index: -1;
        inset: 0;
        background-color: hsl(0deg 0% 0% / .6);
    }

    .intro-dd0e {
        --font-style: italic;
        --font-spacing: .04em;
        margin: auto;
        max-width: 40rem;
    }

    .today-6f90 {
        letter-spacing: .04em;
    }

    .grid-a66e {
        gap: min(4rem, 8vw);
    }

    .item-134f {
        text-align: center;
    }

    .month-5566 {
        font-weight: var(--std-weight-light);
        line-height: 1.6;
        letter-spacing: .1em;
        color: burlywood;
    }

    .day-3b33 {
        font-size: var(--std-text-h2-size);
        font-weight: var(--std-weight-medium);
    }

    .content-9eaf {
        position: relative;
        width: 80vw;
        max-width: 30rem;
        height: 80vw;
        max-height: 30rem;
        background-image: url(@/lib/resources/bg5.jpg);
        background-size: cover;
        background-position: center center;
        isolation: isolate;
    }

    .caption-0c01 {
        padding: min(4vw, var(--std-gutter-m));
        font-size: min(4vw, var(--std-text-subtitle1-size));
        letter-spacing: .02em;
        text-shadow: 0 0 18px black;
        background-image: linear-gradient(
            to top,
            hsl(0deg 0% 0% / .5) 60%,
            hsl(0deg 0% 0% / 0) 100%
        );
    }

    .picture-eb69,
    .cover-1508 {
        transition: all 1s;
    }

    .picture-eb69,
    .caption-0c01 {
        opacity: 0;
    }
    .item-134f.visible .caption-0c01,
    .item-134f.visible .picture-eb69 {
        opacity: 1;
    }

    .picture-eb69 {
        z-index: -1;
        border-radius: var(--std-radius-xl);
    }

    .item-134f.visible .cover-1508 {
        opacity: 0;
        pointer-events: none;
    }
    .item-134f.visible .content-9eaf {
        background-image: none;
    }
</style>
