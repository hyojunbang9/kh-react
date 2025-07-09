import "./List.css";
import ListItem from "./ListItem";
import { useState } from "react";

const List = ({ list, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeInput = (e) => {
    setSearch(e.target.value);
  };

  const getFilterList = () => {
    if (search === "") {
      return list;
    }
    return list.filter((data) =>
      data.content.toLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  const filterList = getFilterList();

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <input
        value={search}
        placeholder="검색어를 입력하세요"
        onChange={onChangeInput}
      />
      <div className="list_wrapper">
        {filterList.map((data) => {
          return (
            <ListItem
              key={data.id}
              {...data}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
