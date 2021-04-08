const slap = {
    config: {
        mouseMargin: 0.4,
        frameWidth: 730,
        frameCount: 20,
        framesEl: document.getElementById('frames')
    },
    currentFrame: 0,
    targetFrame: 28,
    init(){
        addEventListener('mousemove', e => {
            this.move(e.clientX)
        })

        addEventListener('touchmove', e => {
            let touch = e.targetTouches[e.targetTouches.length-1];
            this.move(touch.pageX)
        })

        setInterval(() => {
            this.tick()
        }, 20)
    },
    move(pos){
        let windowWidth = window.innerWidth;
        let margin = (windowWidth - this.config.framesEl.parentElement.clientWidth) / 2;

        let currentPos = pos - margin;
        let maxPos = window.innerWidth - margin * 2;

        let relativePos = Math.max(0, Math.min(1, currentPos / maxPos));

        this.targetFrame = Math.floor(this.scale(relativePos, 0, 1, this.config.frameCount-1, 0))
        this.draw();
    },
    tick(){
        let delta = this.delta();
        this.currentFrame = this.currentFrame + this.delta();

        if(delta !== 0){
            this.draw()
        }
    },
    delta(){
        if(this.targetFrame < this.currentFrame){
            return -1;
        }

        if(this.targetFrame > this.currentFrame){
            return +1;
        }

        return 0;
    },
    draw(){
        let offset = this.config.frameWidth * -1 * this.currentFrame;
        this.config.framesEl.style = 'left: '+offset+'px';
    },
    scale(num, in_min, in_max, out_min, out_max){
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}

slap.init();
