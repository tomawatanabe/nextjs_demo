import {useState, useEffect} from "react";

const CartTotal = (props: any) => {
    const [cart, setCart] = useState(props.data[0]);

    const initial: number = cart?.stock.map((stock: any) => stock.price).reduce((prev: number, curr: number) => prev + curr, 0);
    console.log(initial);
    const [total, setTotal] = useState(initial);

    useEffect(() => {
      setCart(props.data[0]);
    }, [props.data]);

    useEffect(() => {
      setTotal(initial);
    }, [cart]);
    
    return (
      <>
        <table>
            <tbody>
            <tr>
                <th>小計{'('}税込{')'}:</th> 
                <td>￥{total}</td>
            </tr>
            <tr>
                <th>送料{'('}一律{')'}:</th> 
                <td>￥{cart?.stock.length? 500 : 0}</td>
            </tr>
            </tbody>
        </table>
        <p>合計：￥{cart?.stock.length? total + 500 : 0}</p>
      </>
    )
}

export default CartTotal;
