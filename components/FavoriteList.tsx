import useSWR from 'swr'
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { FavoriteItem, FavoriteItem2, Stock } from '../types';
import Image from 'next/image';
import { useCookie } from './useCookie';



const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) => fetch(resource, init).then((res) => res.json());
function FavoriteList() {

    const cookieName = useCookie();

    const { data, error } = useSWR(`http://localhost:8000/favoriteItems?deleted=false&cookieName=${cookieName}`, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const deletedB = (favoriteItem: FavoriteItem2) => {

        fetch(`http://localhost:8000/favoriteItems/${favoriteItem.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "deleted": true
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data),
                    router.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    return (
        <div>
            <h1>お気に入り商品</h1>
            <table>
                <thead>
                    <tr>
                        <th>商品名</th>
                        <th>価格</th>
                        <th>サイズ</th>
                        <th>画像</th>
                        <th>コンディション</th>
                        <th>お気に入りから削除</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((favoriteItem: FavoriteItem2) => {
                        return (
                            <tr key={favoriteItem.itemId}>
                                <td>{favoriteItem.name}</td>
                                <td>¥{favoriteItem.price}</td>
                                <td>{favoriteItem.size}</td>
                                <td><Image src={`/${favoriteItem.imagePath}`} height={200} width={200} alt={favoriteItem.name} priority /><br /></td>
                                <td>{favoriteItem.condition}</td>
                                <td><button onClick={() => deletedB(favoriteItem)}>[削除]</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default FavoriteList;
