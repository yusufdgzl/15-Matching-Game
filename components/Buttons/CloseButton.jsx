function CloseButton(props) {
    
  return (
    <button
      onClick={props.onCloseHandler}
      className=" border-2 transition-all text-white px-4 py-2 rounded-lg text-xl font-semibold hover:bg-gray-500 hover:text-white"
    >
      Close To Game
    </button>
  );
}

export default CloseButton;
