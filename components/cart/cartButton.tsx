import { useState, useEffect } from "react";
import Router from "next/router";
import type { Stock } from "../../types";
import { useCookie } from "../useCookie";
import useSWR from "swr";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

const CartButton = ({ stock }: { stock: Stock }) => {
  const userID = useCookie();

  const {data, mutate} = useSWR(`http://localhost:8000/shoppingCart/${userID}`, fetcher);
  const [localData, setLocalData] = useState<any[]>([])

  console.log(stock);

  const dataType = {
    stock: [stock],
  };

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
  }, []);

  const addCartItem = async () => {
        if (!userID === true) {
          // ログアウト状態でカートに商品追加
            if(localStorage.getItem("shoppingCart")){
              const target = stock;

              if(localData[0].stock.some((item: any) => 
                  item.id === target.id 
              )){
                alert("既にカートに追加済みです");
                return;
              }else{
                localData[0].stock.push(stock);
                localStorage.setItem('shoppingCart', JSON.stringify(localData));
                setLocalData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
              }
              
            }else{
              localStorage.setItem('shoppingCart', JSON.stringify([dataType]));
              setLocalData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
            }
        } else { 
          // ログイン状態でカート商品追加
          const res = await fetch(`http://localhost:8000/shoppingCart/${userID}`);
          const user = await res.json();
          const target = stock;
  
          if(user?.stock.some((item: any) => 
            item.id === target.id 
          )){
            alert("既にカートに追加済みです");
            return;
          }else{
            fetch("/api/cart", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ stockID: stock.id }),
            });
            mutate(`http://localhost:8000/shoppingCart/${userID}`);
            Router.reload();
          }
      }
  };

    return (
        <div>
          {data?.stock?.some((item: any) => 
                item.id === stock.id) 
          ||
          localData[0]?.stock.some((item: any) => 
          item.id === stock.id 
          )
          ?
            (<button onClick={addCartItem} disabled>カートに追加済みです</button>)
            :
            (<button onClick={addCartItem} className="idbutton">カートへ追加</button>)
          }
        </div>
    );
};

export default CartButton;
