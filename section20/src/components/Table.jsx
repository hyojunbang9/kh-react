import User from "./User";

const Table = ({ userList, onDelete, onEdit }) => {
  return (
    <div className="App">
      <h1>회원 정보 출력</h1>
      <hr />
      <table className="member_tbl">
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>성별</th>
            <th>전화번호</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <User
              key={user.id}
              item={user}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
