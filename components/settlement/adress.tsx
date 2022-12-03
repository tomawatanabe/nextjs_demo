import React from "react";
import useSWR from "swr";
import { useCookie } from "../useCookie";


export default function Address() {

    const userId = useCookie();

    // 発送先を表示すため、ユーザー情報を取得するフェッチ
    const fetcher = (resource: string) =>
        fetch(resource).then((res) => res.json());

    const { data, error } = useSWR(
        `http://localhost:8000/users?id=${userId}`,
        fetcher
    );
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <div>
            <h1>購入手続き</h1>
            <h3>お届け先情報</h3>
            <p>氏名: {data[0]?.lastName} {data[0]?.firstName}</p>
            <p>郵便番号: {data[0]?.zipCode}</p>
            <p>住所: {data[0]?.address}</p>
            <p>メールアドレス: {data[0]?.email}</p>
            <p>電話番号: {data[0]?.telephone}</p><br />
        </div>
    );

};
