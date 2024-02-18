export default function ItemCard(props) {
  const whitePicture =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png";
  const img = props.isVisible ? props.img : whitePicture;

  return (
    <div className="flex m-auto ">
      <button onClick={props.onHandlerShowSelected.bind(null, props.id)}>
        <img className=" w-48 h-40 shadow-lg rounded-md" src={img} alt="img" />
      </button>
    </div>
  );
}
