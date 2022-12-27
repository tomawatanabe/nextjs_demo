import styles from "../../styles/itemList.module.css";

const PagingList = ({dataTotal, handlePage, limit, page}: {dataTotal: number; handlePage: any; limit: number; page: number}) => {
    
    // ページ番号の生成
    const range = (start: number, end: number) => {
        return [...Array(end - start + 1)].map((_, i) => start + i);
    }
    
    return (
        <ul className={styles.list_flex}>
            {range(1, Math.ceil(dataTotal / limit)).map((num: number, index: number) =>(
                <li key={index}>
                    <button 
                      onClick={() => handlePage(num)}
                      className={`${styles.pagingListBtn}`}
                      disabled={page === num}
                    >
                    {num}
                    </button>
                </li>
            ))
            }
        </ul>
    )
}

export default PagingList;
