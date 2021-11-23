<script lang="ts">
    import {
        defineComponent,
        onMounted,
        onUnmounted,
        reactive,
        ref,
        Transition,
        watchPostEffect,
    } from 'vue'
    import Audio1 from '@/lib/resources/audio1.mp3'
    import {startSnowFlakes} from '@/lib/snowflakes'
    import CalendarView from './HomePage/CalendarView.vue'
    import WelcomeView from './HomePage/WelcomeView.vue'

    const Views = {
        Calendar: CalendarView,
        Welcome: WelcomeView,
    }

    export default defineComponent({
        components: {
            Transition,
        },

        setup(props, context) {
            const state = reactive(createDefaultState())
            const canvasRef = ref<HTMLCanvasElement>()
            const audioRef = ref<HTMLAudioElement>()

            // state.lifecycle = 'Calendar' // FIXME: remove it!

            function onInteraction() {
                if (! audioRef.value) {
                    return
                }

                audioRef.value.play() // FIXME: enable it!
            }

            onMounted(() => {
                document.body.addEventListener('click', onInteraction, false)
            })
            onUnmounted(() => {
                document.body.removeEventListener('click', onInteraction, false)
            })

            watchPostEffect(() => {
                if (! canvasRef.value) {
                    return
                }

                startSnowFlakes(canvasRef.value)
            })

            return {
                Audio1,
                audioRef,
                canvasRef,
                state,
                Views,
            }
        },
    })

    export function createDefaultState(): State {
        return {
            lifecycle: 'Welcome',
        }
    }

    // Types ///////////////////////////////////////////////////////////////////

    export interface State {
        lifecycle: 'Welcome' | 'Calendar'
    }
</script>

<template>
    <main :class="['HomePage-32e2 std std-extend-v std-theme-dark', state.lifecycle]">
        <audio
            ref="audioRef"
            class="soundtrack-bae8"
            loop
            :src="Audio1"
        ></audio>

        <Transition
            mode="out-in"
            appear
        >
            <Component
                :is="Views[state.lifecycle]"
                v-on:continue="state.lifecycle = 'Calendar'"
            />
        </Transition>

        <canvas
            ref="canvasRef"
            class="snowflakes-d773 std-layer std-cover"
        />
    </main>
</template>

<style>
    .HomePage-32e2 {
        background-color: hsl(277deg 42% 8%);
    }
    .soundtrack-bae8 {
        display: none;
    }

    .snowflakes-d773 {
        pointer-events: none;
        transition: all 10s;
    }
    .HomePage-32e2.Calendar .snowflakes-d773 {
        opacity: .4;
    }
</style>
