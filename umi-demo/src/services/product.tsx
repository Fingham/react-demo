const queryProductListData = [{name:'Bob', age: 18 }, {name:'ami', age: 21 }, {name:'Anis', age: 18 }]

const msg={
    data:queryProductListData,
    run: echoIt(),
    loading:''
}

function echoIt(){
    console.log("echoIt");
}

function queryProductList(param:object){
    return msg;
}

function removeProducts(id: string){
    return msg;
}


export {queryProductList, removeProducts};