import { Item } from "../../types";
import { Stock } from "../../types";

export default async function Stocks(){
    const item = await fetch('http://localhost:8000/items');
        const itemsdata = await item.json()    
    const stock = await fetch("http://localhost:8000/stock");
        const stocksdata = await stock.json()

    stocksdata.map((stock: Stock) =>{
        //IDが一致するもののみの配列を作成
        const items = itemsdata.filter((item: Item) => stock.itemID === item.id)
        stock.item=items[0];
        console.log(stocksdata);
        return stocksdata;
    })
    };
