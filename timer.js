let app = new Vue({
    el: '#app',

    data: {
        countMinute3: {min: 3, sec: 0 },
        countMinute5: {min: 5, sec: 0 },
        countMinute10: {min: 10, sec: 0 },
        timeObj: null,
        timeData: {min: 0, sec: 0 },
        defineMin: true,
        timerOn: false,
        homeContent: true,
        dialogue: '',
        dialogueBefore: '',
        dialogueCounting: '',
        dialogueEnd: '',
    },

    mounted() {
        if(localStorage.dialogueBefore) {
            this.dialogueBefore = localStorage.dialogueBefore;
        }
        if(localStorage.dialogueCounting) {
            this.dialogueCounting = localStorage.dialogueCounting;
        }
        if(localStorage.dialogueEnd) {
            this.dialogueEnd = localStorage.dialogueEnd
        }
        this.dialogue = localStorage.dialogueBefore
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
        toggleHome: function() {
            let self = this
            self.homeContent = true
            if(self.timeObj !== null) {
                self.dialogue = self.dialogueCounting
            } else if(self.defineMin !== true) {
                self.dialogue = self.dialogueEnd
            } else {
                self.dialogue = self.dialogueBefore
            }
        },
        toggleSetting: function() {
            this.homeContent = false
        },
        start: function(time) {
            let self = this
            self.timerOn = true
            self.defineMin = false
            self.dialogue = localStorage.dialogueCounting
            if(self.timeObj === null) {
                switch(time) {
                    case 3:
                        self.timeData = Object.assign({}, self.countMinute3)
                        break
                    case 5:
                        self.timeData = Object.assign({}, self.countMinute5)
                        break
                    case 10:
                        self.timeData = Object.assign({}, self.countMinute10)
                        break
                }
            }
            self.timeObj = setInterval(function() {
                self.count()
            }, 1000)
        },
        stop: function() {
            let self = this
            self.timerOn = false
            clearInterval(self.timeObj)
        },
        complete: function() {
            let self = this
            clearInterval(self.timeObj)
            self.timeData = {
                min: 0,
                sec: 0
            }
            self.dialogue = self.dialogueEnd
        },
        reset: function() {
            let self = this
            self.defineMin = true
            self.dialogue = localStorage.dialogueBefore
            clearInterval(self.timeObj)
            self.timeObj = null
            self.timerOn = false
            self.timeData = {min: 0, sec: 0 }
        },
    },
    watch: {
        dialogueBefore: function(serif) {
            localStorage.dialogueBefore = serif;
        },
        dialogueCounting: function(serif) {
            localStorage.dialogueCounting = serif;
        },
        dialogueEnd: function(serif) {
            localStorage.dialogueEnd = serif;
        },
        characterImg: function(img) {
            localStorage.characterImg = img.toDataURL();
            console.log(localStorage.characterImg)
        },
    },
    computed: {
        countTime: () => {
            return (time) => {
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