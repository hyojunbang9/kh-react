import useMyInput from "./useMyInput";
function MyHook() {
  const [input, onChangeInput] = useMyInput();
  const [input2, onChangeInput2] = useMyInput();
  return (
    <div>
      <input
        value={input}
        name={"phone"}
        onChange={onChangeInput}
        placeholder={"번호 입력해주세요.."}
      />
      <input
        value={input2}
        name={"name"}
        onChange={onChangeInput2}
        placeholder={"이름 입력해주세요.."}
      />
    </div>
  );
}
export default MyHook;
