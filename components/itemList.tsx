import Link from 'next/link';
import Stocks from '../pages/api/stocks';
import { Stock } from "../types";

const items = Stocks
export default function ItemList() {
items.map(()=>{
return(
    <div>
        <Link legacyBehavior href={`/`}>
         {items}
        </Link>
        <Link legacyBehavior href={`/`}>
         {Stocks.Item.name}
        </Link>
         <p>{Stocks.size}</p>
    </div>
  );
})
}
  