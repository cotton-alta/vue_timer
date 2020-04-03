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
    charaURL: 'chara.jpg',
    errorMsg: ''
  },
  mounted() {
    if(localStorage.dialogueBefore) {
      this.dialogueBefore = localStorage.dialogueBefore
    }
    if(localStorage.dialogueCounting) {
      this.dialogueCounting = localStorage.dialogueCounting
    }
    if(localStorage.dialogueEnd) {
      this.dialogueEnd = localStorage.dialogueEnd
    }
    if(localStorage.charaImg) {
      this.charaURL = localStorage.charaImg
    }
    this.dialogue = localStorage.dialogueBefore
    localStorage.errorMsg = ''
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
      if(self.timeObj !== null) {
        self.dialogue = self.dialogueCounting
      } else if(self.defineMin !== true) {
        self.dialogue = self.dialogueEnd
      } else {
        self.dialogue = self.dialogueBefore
      }
      if(localStorage.charaImg) {
        this.charaURL = localStorage.charaImg
      }
      self.homeContent = true
      self.errorMsg = ''
      localStorage.errorMsg = ''
    },
    toggleImg: function() {
      let self = this
      if(self.timeObj !== null) {
        self.dialogue = self.dialogueCounting
      } else if(self.defineMin !== true) {
        self.dialogue = self.dialogueEnd
      } else {
        self.dialogue = self.dialogueBefore
      }
      if(localStorage.errorMsg === '') {
        if(localStorage.charaImg) {
          this.charaURL = localStorage.charaImg
        }
        self.homeContent = true
        self.errorMsg = ''
      } else {
        self.errorMsg = localStorage.errorMsg
        self.homeContent = false;
        console.log('localStorage.errorMsg: ' + localStorage.errorMsg)
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
    readFile: function() {
      localStorage.errorMsg = ''
      this.errorMsg
      let inputTag = document.getElementById('characterImg')
      let reader = new FileReader()
      reader.onload = function() {
        let img = new Image()
        img.onload = function() {
          let canvas = document.createElement('canvas')
          let context = canvas.getContext('2d')
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0)
          try{
            localStorage.setItem("charaImg", canvas.toDataURL())
          } catch(e) {
            localStorage.setItem("errorMsg", '画像が大きすぎます')
          }
        }
        img.src=reader.result
      }
      reader.readAsDataURL(inputTag.files[0])
    }
  },
  watch: {
    dialogueBefore: function(serif) {
      localStorage.dialogueBefore = serif
    },
    dialogueCounting: function(serif) {
      localStorage.dialogueCounting = serif
    },
    dialogueEnd: function(serif) {
      localStorage.dialogueEnd = serif
    }
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
    },
  }
})