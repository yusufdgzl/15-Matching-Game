import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Random from "./helper/Random";

export default function Items() {
  const [products, setProducts] = useState([]);
  const [isVisibleProducts, setIsVisibleProducts] = useState([]);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [point, setPoint] = useState(0);

  const [animatePing, setAnimatePing] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  async function startHandler() {

    const response = await fetch("/item-data.json");
    const data = await response.json();

    setProducts(Random(data));
    setMatchedProducts([]);
    setPoint(0);

    setShowCloseButton(true);
  }

  useEffect(() => {
    setIsVisibleProducts(products.filter((item) => item.isVisible === true));
  }, [products]);

  function handlerShowSelected(id) {
    const selectedProduct = products.find((product) => product.id === id);

    if (!selectedProduct.isVisible) {
      selectedProduct.isVisible = true;

      setIsVisibleProducts(products.filter((item) => item.isVisible === true));

      const isVisiblesName = isVisibleProducts.map((item) => item.name);

      if (isVisiblesName.includes(selectedProduct.name)) {
        setMatchedProducts((prev) => [...prev, selectedProduct.name]);
        setPoint((prev) => prev + 10);

        setAnimatePing(true);

        setTimeout(() => {
          setAnimatePing(false);
        }, 1000);
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
  }

  function closeHandler() {
    setProducts([]);
    setIsVisibleProducts([]);
    setMatchedProducts([]);
    setPoint(0);

    setShowCloseButton(false);
  }

  return (
    <>
      <div className="w-3/5 h-full my-auto grid grid-cols-4 gap-2 mx-10 py-6  ">
        {products.map((item, index) => (
          <ItemCard
            key={index}
            {...item}
            onHandlerShowSelected={handlerShowSelected}
            matched={matchedProducts}
            point={point}
          />
        ))}
      </div>

      <div className="flex flex-col justify-between items-center w-[30%] my-20">
        <div className="w-3/5 border-2 border-dashed border-[#a62b9460] text-2xl px-6 py-2 text-center text-white rounded-full ">
          <h2 className="flex justify-around items-center relative  ">
            Total point :
            <p className="bg-[#a62b9460] relative flex justify-center items-center w-10 h-10 rounded-full">
              {point}
            </p>
            {animatePing && (
              <span className="bg-yellow-300 border-2 w-6 h-6 absolute right-2 rounded-full animate-ping"></span>
            )}
          </h2>
        </div>

        <div className="flex w-full justify-around  ">
          {showCloseButton ? (
            <button
              onClick={closeHandler}
              className=" border-red-500 border-2 transition-all text-red-500 p-4 rounded-lg text-xl font-semibold hover:bg-red-500 hover:text-white"
            >
              Close To Game
            </button>
          ) : (
            <button
              onClick={startHandler}
              className=" border-sky-500 border-2 b transition-all text-sky-500 p-4 rounded-lg text-xl font-semibold hover:bg-sky-500 hover:text-white"
            >
              Start To Game
            </button>
          )}
        </div>
      </div>
    </>
  );
}
