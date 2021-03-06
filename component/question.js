const storage=require("../js/storage")
module.exports=require("./question.html")({
  data(){
    return {
      questionNumber:0,
      questions:qList,
      answers:[]
    }
  },
  methods:{
    answer(ans){
      this.answers[this.questionNumber]=ans.value;
      if(ans.callback){
        ans.callback(function(flag){
          if(flag===true){
            this.questionNumber=ans.to;
          }
        })
        return
      }
      switch(ans.to){
        case -1://User seems to be a great Monacoiner.
        case -2://User declined.Go to key generation
          storage.set("settings",{
            includeUnconfirmedFunds:false,
            zaifPay:{
              enabled:!!this.answers[8],
              apiKey:"",
              secret:""
            },
            useEasyUnit:!!this.answers[7],
            absoluteTime:false,
            fiat:"jpy",
            paySound:false,
            monappy:{
              enabled:false,
              myUserId:""
            },
            monaparty:{
              enabled:true,
              bgClass:"sand"
            }
          })
          this.$emit("push",require("./generateKeyWarn.js"))
          break;
        case -3:
          //User has passphrase so start recover
          this.$emit("push",require("./restorePassphrase.js"))
          break;
        default:
          this.questionNumber=ans.to|0;
      }
    }
  }
})

const qList=[{//0
  text:"以前にこのアプリケーションを利用したことがありますか？",
  answers:[{
    label:"ないです",
    value:false,
    to:1
  },{
    label:"ありますあります",
    value:true,
    to:-3
  }]
},{//1
  text:"初期設定と、ユーザーの暗号通貨に対する知識を測るためにいくつかの質問に答えてください。",
  answers:[{
    label:"わかりました。",
    value:true,
    to:2
  },{
    label:"自分で設定するので答えません。",
    value:false,
    to:-2
  }]
},{//2
  text:"「モナコイン」といえば",
  answers:[{
    label:"今初めて聞いた",
    value:0,
    to:3
  },{
    label:"モナーから派生したやつ？",
    value:1,
    to:3
  },{
    label:"Twitterで変なひとがくれるやつ？",
    value:2,
    to:3
  },{
    label:"暴騰したと聞きました",
    value:3,
    to:3
  },{
    label:"どんどこわっしょーい",
    value:4,
    to:4
  },{
    label:"脇山珠美ちゃんかわいい！",
    value:5,
    to:5
  }]
},{//3
  text:"「暗号通貨」といえば",
  answers:[{
    label:"今初めて聞いた",
    value:0,
    to:6
  },{
    label:"電子マネー",
    value:1,
    to:6
  },{
    label:"ビットコイン",
    value:2,
    to:4
  },{
    label:"詐欺",
    value:3,
    to:6
  },{
    label:"仮想通貨のこと？",
    value:4,
    to:6
  },{
    label:"海外送金に便利",
    value:5,
    to:4
  },{
    label:"Blockchain",
    value:6,
    to:4
  }]
},{//4
  text:"好きな暗号通貨は?",
  answers:[{
    label:"この中にない",
    value:"none",
    to:7
  },{
    label:"モナコイン",
    value:"mona",
    to:7
  },{
    label:"ビットコイン",
    value:"btc",
    to:7
  },{
    label:"Ethereum",
    value:"eth",
    to:7
  },{
    label:"OmiseGo",
    value:"omg",
    to:7
  },{
    label:"Ripple",
    value:"xrp",
    to:7
  }]
},{//5
  text:"だいたい察した。大丈夫ですね。",
  answers:[{
    label:"次へ",
    value:1,
    to:-1
  }]
},{//6
  text:`暗号通貨とは、「暗号」のトリックを利用し、
改ざんができない
・安全
・国家の支配によらない
「通貨」すなわちお金です。
これは日本円、米ドルなどとは独立し、独自の価値をもちます。
このアプリはそのうちの「モナコイン」を送ったり、受け取ったりするアプリです。`,
  answers:[{
    label:"わかった",
    value:"understood",
    to:7
  },{
    label:"難しいなあ",
    value:"difficult",
    to:7
  }]
},{//7
  text:"表示する単位は何にしますか？\n(あとで変更できます。)",
  answers:[{
    label:"MONA,JPYなど通貨コード",
    value:0,
    to:8
  },{
    label:"もにゃ,円など親しみやすい形式",
    value:1,
    to:8
  }]
},{//8
  text:"利用目的はなんですか？",
  answers:[{
    label:"業務用",
    value:1,
    to:9
  },{
    label:"個人用途",
    value:0,
    to:9
  }]
},{//9
  text:"やってもいいことは何？",
  answers:[{
    label:"この中にやってもいいものはない",
    value:3,
    to:11
  },{
    label:"「秘密鍵」画面をスクリーンショット",
    value:0,
    to:10
  },{
    label:"このアプリの初期設定を友達などの他人にやってもらう",
    value:1,
    to:10
  },{
    label:"「秘密鍵」を付箋に書いてデスクに貼っておく",
    value:1,
    to:10
  },{
    label:"パスワードを「123456」を設定する",
    value:2,
    to:10
  }]
},{//10
  text:`それは行ってはいけません！！
「秘密鍵」というものは、文字通り、秘密にしなければいけない鍵です。
この「秘密鍵」は、お金を金庫から取り出す時のように、あなたが持つモナコインを利用するために使う鍵です。
紛失すると、モナコインを使えなくなり、
誰かに盗まれたら、その人にモナコインを悪用されます。
そのために、スクリーンショット、コピー＆貼り付けでデータを保存せず、
秘密鍵は、自力で紙に手書きして、その紙を、安全な場所に保管してください。
鍵を保護するためのパスワードも強固なものにしてください。
手書きと聞いて、面倒臭そうだと思った方もいらっしゃると思いますが、
簡単にできる工夫がされていますので、ご安心ください。`,
  answers:[{
    label:"戻る",
    value:1,
    to:9
  }]
},{//11
  text:`「秘密鍵」というものは、文字通り、秘密にしなければいけない鍵です。
スクリーンショット、コピー＆貼り付けでデータを保存せず、
秘密鍵は、自力で紙に手書きして、その紙を、安全な場所に保管してください。
これで質問は以上です。`,
  answers:[{
    label:"次へ",
    value:0,
    to:-1
  }]
}]
