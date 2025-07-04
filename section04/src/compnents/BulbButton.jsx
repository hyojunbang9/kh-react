function BulbButton({ lightClickBtn, light }) {
  return (
    <>
      <div>
        <button
          onClick={() => {
            lightClickBtn();
          }}
        >
          {light === "ON" ? "끄기" : "켜기"}
        </button>
      </div>
    </>
  );
}
export default BulbButton;
