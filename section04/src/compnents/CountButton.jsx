function CountButton(props) {
  return (
    <>
      <div>
        <button
          style={{ border: "1px solid white" }}
          onClick={() => {
            props.countClickBtn();
          }}
        >
          +
        </button>
      </div>
    </>
  );
}
export default CountButton;
