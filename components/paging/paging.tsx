
const PagingList = ({dataTotal, handlePage, limit}: {dataTotal: number; handlePage: any; limit: number}) => {
    
    // ページ番号の生成
    const range = (start: number, end: number) => {
        return [...Array(end - start + 1)].map((_, i) => start + i);
    }
    
    return (
        <ul>
            {range(1, Math.ceil(dataTotal / limit)).map((num: number, index: number) =>(
                <li key={index}>
                    <button onClick={() => handlePage(num)}>{num}</button>
                </li>
            ))
            }
        </ul>
    )
}

export default PagingList;
