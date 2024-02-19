import { useEffect, useState } from "react";

export default function ItemCard(props) {

  const [cardShadow, setCardShadow] = useState("");

  const matched = props.matched;
  const isVisible = props.isVisible;
  const point = props.point;
  const cardOpacity = matched.includes(props.name) ? "opacity-60" : "";

  useEffect(() => {
    if (matched.includes(props.name)) {
      setCardShadow("shadow-[5px_5px_10px_0_#65f44f]");
    } else if (isVisible) {
      setCardShadow("shadow-[0_0_10px_0_yellow]");
    } else {
      setCardShadow("");
    }

  }, [isVisible, matched]);

  

  const questionMarkPicture =
    "https://img.lovepik.com/free-png/20220109/lovepik-gray-question-mark-png-image_401351792_wh860.png";
  const img = props.isVisible ? props.img : questionMarkPicture;

  return (
    <div className={`flex m-auto bg-black rounded-2xl ${point === 60 ? 'animate-wiggle': 'animate-spin-fast-one'}  `}>
      <button onClick={props.onHandlerShowSelected.bind(null, props.id)}>
        <img
          className={` w-40 h-36 transition-all duration-500 rounded-2xl ${cardOpacity}  ${cardShadow}  ${isVisible && 'scale-105'} `}
          src={img}
          alt="img"
        />
      </button>
    </div>
  );
}
