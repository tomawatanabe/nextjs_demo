import styles from "../styles/Search.module.css";

export default function Search(props: any) {
  return (
    <form className={styles.itemSearch}>
      <input
        type="text"
        name="filter"
        className={styles.search}
        placeholder="商品名検索"
        onChange={props.onChange}
      />
      <br />
      <input
        type="submit"
        value="検索"
        className={styles.searchBtn}
        onClick={props.onClick}
      />
    </form>
  );
}
