import "./ListItem.css";
import { memo, useContext } from "react";
import { ListDispatchContext } from "../App";

const ListItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(ListDispatchContext);
  const onChangeCheckBox = () => {
    onUpdate(id);
  };
  const onClickBtn = () => {
    onDelete(id);
  };
  return (
    <div className="ListItem">
      <input type="checkbox" checked={isDone} onChange={onChangeCheckBox} />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickBtn}>삭제</button>
    </div>
  );
};
/*
export default memo(ListItem, (prevProps, nextProps) => {
  //HOC Higher order component
  if (prevProps.id !== nextProps.id) return false;
  if (prevProps.isDone !== nextProps.isDone) return false;
  if (prevProps.content !== nextProps.content) return false;
  if (prevProps.date !== nextProps.date) return false;
  return true;
});
*/
export default memo(ListItem);
