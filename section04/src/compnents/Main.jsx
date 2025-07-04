import "./Main.css";
import Button from "./Button";

export default function Main() {
  const buttonProps = {
    text: "mail",
    color: "red",
  };

  return (
    <>
      <main>
        <Button {...buttonProps} />
        <Button text={"카페"} color={"yellow"} />
        <Button text={"주문"} color={"orange"}>
          <h2>자식요소</h2>
        </Button>
      </main>
    </>
  );
}
