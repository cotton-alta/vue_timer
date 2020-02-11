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

    },

    methods: {

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