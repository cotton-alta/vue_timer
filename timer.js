let app = new Vue({
    el: '#app',

    data: {
        countMinute3: {
            min: 3,
            sec: 0
        },
        countMinute5: {
            min: 5,
            sec: 0
        },
        countMinute10: {
            min: 10,
            sec: 0
        },
        timeObj: null,
        timeData: {
            min: 0,
            sec: 0
        },
        defineMin: true
    },

    methods: {
        count: function() {
            if(this.timeData.sec <= 0 && this.timeData.min >= 1) {
                this.timeData.min--
                this.timeData.sec = 59
            } else if(this.timeData.sec <= 0 && this.timeData.min <= 0) {
                this.complete()
            } else {
                this.timeData.sec--
            }
        },
        start: function(time) {
            if(this.timeObj !== null) {
                return
            }
            this.defineMin = false
            let self = this
            switch(time) {
                case 3:
                    this.timeData = this.countMinute3
                    break
                case 5:
                    this.timeData = this.countMinute5
                    break
                case 10:
                    this.timeData = this.countMinute10
                    break
            }
            this.timeObj = setInterval(function() {
                self.count()
            }, 1000)
        },
        complete: function() {
            clearInterval(this.timeObj)
            this.timeData = {
                min: 0,
                sec: 0
            }
        }
    },
    computed: {
        countTime: () => {
            return (time) => {
                console.log(time)
                let timeStrings = [
                    time.min.toString(),
                    time.sec.toString(),
                ].map((str) => {
                    if(str.length < 2) {
                        return "0" + str
                    } else {
                        return str
                    }
                })
                return timeStrings[0] + ":" + timeStrings[1]
            }
        }
    }
})