function Button({ text, color = "beige", children }) {
  //이벤트 처리 핸들러 함수 (3)(선언, 표현(익명, 화살표)
  //e(이벤트 객체 참조 변수) : 버튼에서 이벤트를 클릭 하면, 클릭 당시 정보가 다 들어있다.
  const onClickButon = (e) => {
    console.log(e);
    alert(`text=${text} color=${color} chilldren=${children}`);
  };

  return (
    <>
      <button
        name="bhj"
        type="button"
        style={{ color: color }}
        onClick={onClickButon}
      >
        {text} - {text.toUpperCase()}
        {children}
      </button>
    </>
  );
}

export default Button;
