import useSWR, { mutate } from "swr";
import { useEffect } from "react";
import { useCookie } from "../useCookie";
import CartItem from "./cartItem";
import CartTotal from "./cartTotal";
import Router from "next/router";
import type { Stock } from "../../types";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

const Members = () => {
    const userID = useCookie();

    let { data, error } = useSWR(
        `http://localhost:8000/shoppingCart?id=${userID}`,
        fetcher
      );
    
    useEffect(() => {
      console.log('mutateしました');
      mutate(`http://localhost:8000/shoppingCart?id=${userID}`);
    }, [])

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    const handleDelete = (cart: any, id: any) => {
        const stock = cart.stock;
        const deleted = stock.filter((item: Stock) => item.id !== id);
        console.log(deleted);
  
        fetch(`http://localhost:8000/shoppingCart/${userID}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  "stock": deleted
                  }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
                Router.reload();
              })
              .catch((error) => {
                console.error('Error:', error);
              });
  
    }

    return (
        <>
          <CartItem data={data} handleDelete={handleDelete} />
          <CartTotal data={data} />
        </>
    );
}

export default Members;
