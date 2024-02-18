import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Random from "./helper/Random";

export default function Items() {
  const [products, setProducts] = useState([]);
  const [isVisibleProducts, setIsVisibleProducts] = useState([]);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [point, setPoint] = useState(0);

  async function startHandler() {
    const response = await fetch("/item-data.json");
    const data = await response.json();

    setProducts(Random(data));
  }

  useEffect(() => {
    setIsVisibleProducts(products.filter((item) => item.isVisible === true));
  }, [products]);

  const isVisiblesName = isVisibleProducts.map((item) => item.name);

  function handlerShowSelected(id) {
    const selectedProduct = products.find((product) => product.id === id);
    selectedProduct.isVisible = true;

    setIsVisibleProducts(products.filter((item) => item.isVisible === true));

    if (isVisiblesName.includes(selectedProduct.name)) {
      setMatchedProducts((prev) => [...prev, selectedProduct.name]);
      setPoint((prev) => prev + 10);
    }

    const updatedMatchedProducts = [...matchedProducts, selectedProduct.name];

    console.log(updatedMatchedProducts);

    setTimeout(() => {
      setProducts(
        products.map((item) =>
          !updatedMatchedProducts.includes(item.name)
            ? { ...item, isVisible: false }
            : item
        )
      );
    }, 100);
  }

  function closeHandler() {
    setProducts([]);
    setIsVisibleProducts([]);
    setMatchedProducts([]);
    setPoint(0);
  }

  return (
    <>
      <div className="w-3/5 h-full my-auto grid grid-cols-4 gap-2 mx-10 py-6  ">
        {products.map((item, index) => (
          <ItemCard
            key={index}
            {...item}
            onHandlerShowSelected={handlerShowSelected}
          />
        ))}
      </div>
      
      <div className="flex flex-col justify-between items-center w-[30%] my-20">
        <div className="text-2xl bg-amber-500 px-6 py-2 text-center text-white rounded-full">
          <h2>Total Point : {point}</h2>
        </div>

        <div className="flex w-full justify-around ">
          <button
            onClick={startHandler}
            className=" bg-sky-500 text-white p-4 rounded-lg text-xl hover:bg-sky-600"
          >
            Start to Game
          </button>

          <button
            onClick={closeHandler}
            className=" bg-red-500 text-white p-4 rounded-lg text-xl hover:bg-red-600"
          >
            Close to Game
          </button>
        </div>
      </div>
    </>
  );
}
