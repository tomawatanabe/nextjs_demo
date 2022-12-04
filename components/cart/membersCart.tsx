
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import { useCookie } from "../useCookie";
import CartItem from "./cartItem";
import CartTotal from "./cartTotal";
import Router from "next/router";
import type { Stock } from "../../types";
import cart from "../../pages/api/cart";
import Link from "next/link";

const fetcher = (resource: string): Promise<any> =>
    fetch(resource).then((res) => res.json());


const Members = () => {
    const userID = useCookie();

    // ローカルストレージ内のデータがあるか確認
    const [localData, setLocalData] = useState<any[]>([]);

    useEffect(() => {
        setLocalData(JSON.parse(localStorage.getItem('shoppingCart') || '{}'));
    }, []);

    // サーバ上のデータを取得
    let { data, error } = useSWR(
        `http://localhost:8000/shoppingCart?id=${userID}`,
        fetcher
    );

    useEffect(() => {
        mutate(`http://localhost:8000/shoppingCart?id=${userID}`);
    }, [])

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    // カート内商品削除
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
                mutate(`http://localhost:8000/shoppingCart?id=${userID}`);
                Router.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    // ログイン前のカート内商品をログイン後のカートに移動
    const handleCombine = (cart: any) => {
        const stock = cart.stock;
        for (const localItem of localData[0]?.stock) {
            if (stock.some((serverItem: any) =>
                serverItem.id === localItem.id
            )) {

                continue;
            }
            stock.push(localItem);
        }

        fetch(`http://localhost:8000/shoppingCart/${userID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "stock": stock
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                localStorage.clear();
                Router.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // ログイン前のカート内商品をログイン後のカートに移動したくない場合
    const rejectCombine = () => {
        localStorage.clear();
        Router.reload();
    }

    return (
        <>
            <div style={{ display: localData[0]?.stock.length ? "block" : "none", backgroundColor: "#CEDCFF" }}>
                <p>
                    ログイン前のカートに商品があります。現在のアカウントのカートにその商品を移動しますか？
                </p>
                <ul>
                    {localData[0]?.stock.map((cartItem: Stock) => {
                        <li>
                            {cartItem?.item.name}
                        </li>
                    })}
                </ul>
                <button onClick={() => handleCombine(data[0])}>はい</button>
                <button onClick={() => rejectCombine()}>いいえ</button>
            </div>
            <CartItem
                data={data}
                handleDelete={handleDelete}
                handleCombine={handleCombine}
                localData={localData}
            />
            <CartTotal data={data} />
            <div style={{ display: data[0]?.stock.length ? "block" : "none" }}>
                <Link href="#" legacyBehavior>
                    購入手続きへ進む
                </Link>
            </div>

        </>
    );
}

export default Members;
