import AgainIcon from "../Icons/AgainIcon";

function AgainButton(props) {
  return (
    <button
      onClick={props.onStartHandler}
      className="flex w-4/5 justify-around items-center  border-orange-500 border-2 transition-all text-orange-500 px-4 py-2 rounded-lg text-xl font-semibold hover:bg-orange-500 hover:text-white"
    >
      Play Again
      <span className=" border-orange-500 border animate-spin rounded-full">
        <AgainIcon />
      </span>
    </button>
  );
}

export default AgainButton;
