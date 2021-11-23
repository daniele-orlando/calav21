export function startSnowFlakes(canvas: HTMLCanvasElement, particles = 100) {
    const ctx = canvas.getContext('2d')!

    const state = {width: 0, height: 0}
    const world: Array<Snowflake> = []

    for (let i = 0; i < particles; ++i) {
        world.push(new Snowflake())
    }

    function setup() {
        if (! canvas.parentElement) {
            return
        }

        const {clientWidth: width, clientHeight: height} = canvas.parentElement

        state.width = width
        state.height = height
        canvas.width = width
        canvas.height = height

        for (const it of world) {
            it.setup({width, height})
        }
    }

    function update() {
        ctx.clearRect(0, 0, state.width, state.height)
        ctx.fillStyle = '#fff'

        for (const it of world) {
            it.y += it.vy
            it.x += it.vx

            ctx.globalAlpha = it.o
            ctx.beginPath()
            ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2, false)
            ctx.closePath()
            ctx.fill()

            if (it.y > state.height) {
                it.setup(state)
            }
        }

        requestAnimationFrame(update)
    }

    function onResize() {
        setup()
    }

    window.addEventListener('resize', onResize, false)

    onResize()
    update()
}

class Snowflake {
    x = 0
    y = 0
    vy = 0
    vx = 0
    r = 0
    o = 1

    setup(spec: {width: number, height: number}) {
        const {width, height} = spec

        this.x = width * Math.random()
        this.y = -height * Math.random()
        this.vy = 1 + 1.5 * Math.random()
        this.vx = .5 - Math.random()
        this.r = 1 + 2 * Math.random()
        this.o = .5 + .5 * Math.random()
    }
}
