import { useEffect, useState } from "react";

export default function ItemCard(props) {
  
  const [cardShadow, setCardShadow] = useState("");

  const matched = props.matched;
  const isVisible = props.isVisible;
  const point = props.point;
  const name = props.name;
 
 

  const cardOpacity = matched.includes(name) ? "opacity-60" : "";

  const questionMarkPicture =
    "https://img.lovepik.com/free-png/20220109/lovepik-gray-question-mark-png-image_401351792_wh860.png";
  const img = props.isVisible ? props.img : questionMarkPicture;

  useEffect(() => {

    if (matched.includes(name)) {
      setCardShadow("shadow-[5px_5px_10px_0_#65f44f]");
    } else if (isVisible) {
      setCardShadow("shadow-[0_0_10px_0_yellow]");
    } else {
      setCardShadow("");
    }

  }, [isVisible, matched]);

  return (
    <div
      className={`flex m-auto bg-black rounded-2xl 
      ${point === 60 && "animate-wiggle"} ${!isVisible ? "animate-spin-fast-one" : ''} `}
    >
      <button onClick={props.onHandlerShowSelected.bind(null, props.id)}>

        <img
          className={` w-40 h-36 transition-all duration-500 rounded-2xl 
          ${ point !== 60 && cardOpacity}  ${cardShadow}  ${isVisible &&  "scale-105"}`}

          src={img}
          alt="img"
        />
      </button>
    </div>
  );
}
