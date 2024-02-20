function StartButton(props) {
  return (
    <button
      onClick={props.onStartHandler}
      className=" border-sky-500 border-2 b transition-all text-sky-500 px-4 py-2 rounded-lg text-xl font-semibold hover:bg-sky-500 hover:text-white"
    >
      Start To Game
    </button>
  );
}

export default StartButton;
