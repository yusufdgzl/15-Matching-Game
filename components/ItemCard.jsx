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


  const whitePicture =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png";
  const img = props.isVisible ? props.img : whitePicture;

  return (
    <div className="flex m-auto bg-black rounded-2xl ">
      <button onClick={props.onHandlerShowSelected.bind(null, props.id)}>
        <img
          className={`${cardOpacity} w-48 h-40 opac rounded-2xl ${cardShadow} `}
          src={img}
          alt="img"
        />
      </button>
    </div>
  );
}
