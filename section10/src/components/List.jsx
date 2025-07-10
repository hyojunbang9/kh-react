import "./List.css";
import ListItem from "./ListItem";
import { useState, useMemo } from "react";

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

  //랜더링 발생 시 마다 list 전체 갯수, list isDone = true가 완료 된 갯수, list isDone = false 완료 되지 않은 갯수
  //useMemo한다 => 최적화 한다 => useMemo(()=>{}와 []) useEffect(()=>{},[])는 많이 닮았음
  //useEffect()는 4가지!
  //useEffect(()=>{},[]) 컴포넌트가 마운트(생성)할 때 한 번만 일어남
  //useEffect(()=>{},[@@]) @@상태가 바뀔 때마다 발생
  //useEffect(()=>{},[]) 컴포넌트가 마운트할 때, 모든 State가 바뀔 떄마다 일어남
  //useEffect(()=>{return ()=>{}},[]) 마운트 발생, 언마운트 발생(컴포넌트가 사라질 때 발생)

  // const getAnalyzeData = () => {
  //   const totalCount = list.length;
  //   const doneCount = list.filter((data) => {
  //     return data.isDone === true;
  //   }).length;
  //   const notDoneCount = totalCount - doneCount;
  //   return { totalCount, doneCount, notDoneCount };
  // };

  //구조 분해 할당
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = list.length;
    const doneCount = list.filter((data) => {
      return data.isDone === true;
    }).length;
    const notDoneCount = totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount };
  }, [list]);

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <p>totalCount : {totalCount}</p>
        <p>doneCount : {doneCount}</p>
        <p>notDoneCount : {notDoneCount}</p>
      </div>
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
