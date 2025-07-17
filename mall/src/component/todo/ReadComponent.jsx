import { useEffect, useState } from "react";
import { getOne } from "../../api/todoApi";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: null,
  complete: false,
};

const ReadComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initState);

  useEffect(() => {
    getOne(tno).then((data) => {
      setTodo(data);
    });
  }, [tno]);

  return (
    <>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          tno
        </label>
        <div class="col-sm-10">{todo.tno}</div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          writer
        </label>
        <div class="col-sm-10">{todo.writer}</div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          title
        </label>
        <div class="col-sm-10">{todo.title}</div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          Due Date
        </label>
        <div class="col-sm-10">{todo.dueDate}</div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          complete
        </label>
        <div class="col-sm-10">{todo.complete}</div>
      </div>
    </>
  );
};

export default ReadComponent;
