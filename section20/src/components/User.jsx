const User = ({ item, onDelete, onEdit }) => {
  const handleEdit = () => {
    onEdit(item.id);
  };

  const handleDelete = () => {
    if (window.confirm(`${item.name}님 정보를 삭제하시겠습니까?`)) {
      onDelete(item.id);
    }
  };

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.age}</td>
      <td>{item.gender}</td>
      <td>{item.phone}</td>
      <td>
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </td>
    </tr>
  );
};

export default User;
