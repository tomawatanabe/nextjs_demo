import {useState} from "react";

const CartTotal = (props: any) => {
    const [cart, setCart] = useState(props.data[0]);

    const initial: number = cart.stock?.map((stock: any) => stock.price).reduce((prev: number, curr: number) => prev + curr, 0);
    console.log(initial);
    const [total, setTotal] = useState(initial);
    
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
                <td>￥500</td>
            </tr>
            </tbody>
        </table>
        <p>合計：￥{total + 500}</p>
      </>
    )
}

export default CartTotal;
