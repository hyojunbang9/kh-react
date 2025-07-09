import "./App.css";
import { useState } from "react";
import Table from "./components/Table";
import Register from "./components/Register";

function App() {
  const [userList, setUserList] = useState([
    { id: 1, name: "이해연", age: 24, gender: "남자", phone: "010-9973-2757" },
    { id: 2, name: "강지현", age: 27, gender: "여자", phone: "010-7216-0429" },
    { id: 3, name: "김동진", age: 30, gender: "남자", phone: "010-2971-4007" },
  ]);
  const [editingId, setEditingId] = useState(null);

  // 등록
  const onInsert = (user) => {
    const newUser = {
      ...user,
      id: Date.now(), // 고유 ID 부여
    };
    setUserList([...userList, newUser]);
  };

  // 수정
  const onUpdate = (updatedUser) => {
    setUserList(
      userList.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingId(null); // 수정 종료
  };

  // 삭제
  const onDelete = (id) => {
    setUserList(userList.filter((user) => user.id !== id));
  };

  return (
    <div className="App">
      <Table userList={userList} onDelete={onDelete} onEdit={setEditingId} />
      <Register
        onInsert={onInsert}
        onUpdate={onUpdate}
        editingUser={userList.find((user) => user.id === editingId)}
      />
    </div>
  );
}

export default App;
