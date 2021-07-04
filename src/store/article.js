import {randomColor16} from '../utils'

//获取存储sessionStorage里面的文章数据（JSON格式）
let realarrArticle=[];
let affixPharseStore={} ;
try{
    let sessionStorage_arrArticle = sessionStorage.getItem("arrArticle");
    let sessionStorage_affixPharseStore = sessionStorage.getItem("affixPharseStore");
    realarrArticle = JSON.parse(sessionStorage_arrArticle) || [];
    affixPharseStore = JSON.parse(sessionStorage_affixPharseStore) || {affix:[],phrase:[]};

}catch(e){
   realarrArticle  = [];
   affixPharseStore = {affix:[],phrase:[]}
}


export default{
    state:{realarrArticle,affixPharseStore,wordInfo:{}},
    mutations:{
        //把文章转换成数组，并储存在sessionStorage
        getArticle(state,content){
            let jsonArticleContent = JSON.stringify(content);
            //去掉首尾的""
            let jsonArticleContent2 = jsonArticleContent.slice(1, -1);
            //根据段落，第一次切割
            let arrArticle1 = jsonArticleContent2.split("\\n");
            //内部进行二次切割
            let arrArticle = arrArticle1.map(item => {
                return item.split(" ")
            });
            //第三次处理 ===> 添加wordID（wordKey）
            let realarrArticle = arrArticle.map((arr,paragraphIdx)=>{
                let newItem =  arr.map((item,wordIdx)=>{
                    return {"word":item,"wordKey":"arr"+paragraphIdx+'_'+wordIdx}
                })
                return newItem
            })
            //存到全局状态和sessionStorage中
            state.realarrArticle = realarrArticle;
            sessionStorage.setItem('arrArticle',JSON.stringify(realarrArticle));
        },

        //把单词的释义插入到单词中
        setWordInfo(state,{info,wordID,cb}){            
            try{
                //通过wordID找到对应的单词
                let sign = wordID.indexOf("_");
                let firstArrIdx = wordID.substring(3,sign);
                let secondArrIdx = wordID.substr(sign+1);
                //插入信息和随机颜色
                state.realarrArticle[firstArrIdx][secondArrIdx]["wordInfo"] = info;
                state.realarrArticle[firstArrIdx][secondArrIdx]["color"] = randomColor16();
                sessionStorage.setItem("arrArticle", JSON.stringify(state.realarrArticle));
                //存储到短语词缀库
                this.commit("insertaffixPharseStore",info);
                setTimeout(()=>{                    
                    cb(true);
                },0);
            }catch(e){
                cb(false)
            }
        },
        /*把新添加的词缀和短语添加到短语词缀库*/
        insertaffixPharseStore(state,info){
            //对象生产函数
            function produceObj(arr){
                let newArr =[]
                for(let item in arr){
                    let obj = {};                    
                    obj[arr[item]] = arr[parseInt(item)+1];
                    if(item%2===0){
                        newArr.push(obj)
                    }
                }
                return newArr
            }
            let newaffixStore = produceObj([info["prefixName"],info["prefixValue"],info["rootName"],info["rootValue"],info["suffixName"],info["suffixValue"]]);
            //获取已有的词缀库存
            let stateaffixStore =state.affixPharseStore.affix;
            //合并
            let concat_stateaffixStore = stateaffixStore.concat(newaffixStore);
            //去重
            let new_stateaffixStore = concat_stateaffixStore.reduce((pre,item)=>{
                let perPropertyNames = pre.map(item=>{
                    return Object.keys(item).join("")
                })
                if(perPropertyNames.indexOf(Object.keys(item).join(""))===-1){
                    return pre.concat(item)
                }
                return pre
            },[])
            //存入全局状态
            state.affixPharseStore.affix = new_stateaffixStore;

            //处理phrase
            if(info["phrase"]){
                let phraseArr = produceObj([info["phrase"],info["phraseMeaning"]]);
                let new_phraseArr = state.affixPharseStore.phrase.concat(phraseArr);
                state.affixPharseStore.phrase = new_phraseArr;
            }
            
            //同样存储到sessionStorage
            sessionStorage.setItem('affixPharseStore',JSON.stringify(state.affixPharseStore));
        }
    }
}