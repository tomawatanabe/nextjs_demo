
export default async function addObj(){

        const items = await fetch('http://localhost:8000/items');
        const stock = await fetch("http://localhost:8000/stock");
        
    };
