
export default async function AddObj(){


    const item = await fetch('http://localhost:8000/items');
        const itemsdata:[items:{id:number}] = await item.json()    
    const stock = await fetch("http://localhost:8000/stock");
        const stocksdata:[stock:{id:number}]= await stock.json()

    //.filterでIDが一致するもののみの配列を作成
    const addObj = itemsdata.filter((stocksdata,itemsdata) => 
        stocksdata.id === itemsdata);

    console.log(addObj);

 };
