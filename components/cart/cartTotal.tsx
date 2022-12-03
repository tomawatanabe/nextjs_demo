import {useState} from "react";

const CartTotal = (props: any) => {
    const [cart, setCart] = useState(props.data[0]);

    const initial: number = cart?.stock.map((stock: any) => stock.price).reduce((prev: number, curr: number) => prev + curr, 0);
    console.log(initial);
    const [total, setTotal] = useState(initial);
    const [cartItems, setCartItems] = useState(cart?.stock);

    
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
                <td>￥{cartItems?.length? 500 : 0}</td>
            </tr>
            </tbody>
        </table>
<<<<<<< Updated upstream
        <p>合計：￥{cartItems?.length? total + 500 : 0}</p>
=======
        <p><b> 合計</b>：￥{cartItems.length? total + 500 : 0}</p>
>>>>>>> Stashed changes
      </>
    )
}

export default CartTotal;
