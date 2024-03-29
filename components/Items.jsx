import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Random from "./Helper/Random";
import StartButton from "@/components/Buttons/StartButton";
import CloseButton from "@/components/Buttons/CloseButton";
import AgainButton from "@/components/Buttons/AgainButton";

export default function Items() {
  const [products, setProducts] = useState([]);
  const [isVisibleProducts, setIsVisibleProducts] = useState([]);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [point, setPoint] = useState(0);

  const [animatePing, setAnimatePing] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const [time, setTime] = useState(100);
  const [loseGame, setLoseGame] = useState(false);
  const [startTime, setStartTime] = useState(false);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setTime((prev) => {
          if (prev === 0) {
            setLoseGame(true);

            return prev;
          }

          return prev - 1;
        });
      }, 200);

      return () => clearInterval(timer);
    }
  }, [startTime]);

  useEffect(() => {
    if (point === 60) {
      setStartTime(false);
    }
  }, [point]);

  async function startHandler(e) {
    e.preventDefault();

    const response = await fetch("/item-data.json");
    const data = await response.json();

    setProducts(Random(data));
    setMatchedProducts([]);
    setPoint(0);

    setShowCloseButton(true);

    setLoseGame(false);
    setTime(100);
    setStartTime(true);
  }

  useEffect(() => {
    setIsVisibleProducts(products.filter((item) => item.isVisible === true));
  }, [products]);

  function handlerShowSelected(id) {
    const selectedProduct = products.find((product) => product.id === id);

    if (!selectedProduct.isVisible && !loseGame) {
      selectedProduct.isVisible = true;

      setIsVisibleProducts(products.filter((item) => item.isVisible === true));

      const isVisiblesName = isVisibleProducts.map((item) => item.name);

      if (isVisiblesName.includes(selectedProduct.name)) {
        setMatchedProducts((prev) => [...prev, selectedProduct.name]);
        setPoint((prev) => prev + 10);
        
        setTime((prev)=> prev + 10);

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
        <div className="flex flex-col w-full space-y-5 justify-around items-center">
          {showCloseButton && (
            <div className="w-3/5 h-4 bg-white  rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-l to-red-500 from-green-500 transition-all ease-out `}
                style={{ width: `${time}%` }}
              />
            </div>
          )}

          {showCloseButton && (
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
          )}
        </div>

        {loseGame && showCloseButton && (
          <div className="flex flex-col justify-center items-center ">
            <h2 className="text-3xl py-2 font-mono text-transparent bg-clip-text  bg-gradient-to-r from-red-600 via-red-300 to-red-600 animate-bounce ">
              Time is up!!!
            </h2>
            <AgainButton onStartHandler={startHandler} />
          </div>
        )}

        {point === 60 && (
          <div className="flex flex-col justify-center items-center ">
            <h2 className="text-3xl py-2 font-mono text-transparent bg-clip-text  bg-gradient-to-r from-indigo-600 via-red-300 to-purple-400 animate-bounce ">
              Congratulations!
            </h2>
            <AgainButton onStartHandler={startHandler} />
          </div>
        )}

        <div className="flex w-full justify-around  ">
          {showCloseButton ? (
            <CloseButton onCloseHandler={closeHandler} />
          ) : (
            <StartButton onStartHandler={startHandler} />
          )}
        </div>
      </div>
    </>
  );
}
