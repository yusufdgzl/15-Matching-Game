import { useEffect, useState } from "react";

export default function ItemCard(props) {
  const [cardShadow, setCardShadow] = useState("");

  const matched = props.matched;
  const isVisible = props.isVisible;

  useEffect(() => {
    if (matched.includes(props.name)) {
      setCardShadow("shadow-[0_0_15px_0_#65f44f]");
    } else if (props.isVisible) {
      setCardShadow("shadow-[0_0_10px_0_yellow]");
    } else {
      setCardShadow("");
    }
  }, [isVisible, matched]);

  const cardOpacity = matched.includes(props.name) ? "opacity-70" : "";


  const questionMarkPicture =
    "https://img.lovepik.com/free-png/20220109/lovepik-gray-question-mark-png-image_401351792_wh860.png";
  const img = props.isVisible ? props.img : questionMarkPicture;

  return (
    <div className="flex m-auto bg-black rounded-2xl ">
      <button  onClick={ props.onHandlerShowSelected.bind(null, props.id)} >
        <img
          className={`${cardOpacity} w-48 h-40 transition-all duration-500 rounded-2xl ${cardShadow} `}
          src={img}
          alt="img"
        />
      </button>
    </div>
  );
}
