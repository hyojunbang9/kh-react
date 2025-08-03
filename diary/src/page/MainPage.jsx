import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Header from "../include/Header";
import CalendarComponent from "../component/common/Calendar";
import moment from "moment";
import { getList as getDiaryList } from "../api/diaryApi";
import { getList as getMomentList } from "../api/momentApi";
import { getList as getTodoList } from "../api/todoApi";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import { API_SERVER_HOST } from "../api/diaryApi";

const host = API_SERVER_HOST;

const MainPage = () => {
  const [diary, setDiary] = useState([]);
  const [moments, setMoments] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [marks, setMarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const diaryResponse = await getDiaryList({ page: 1, size: 1000 });
      const momentResponse = await getMomentList({ page: 1, size: 1000 });
      const todoResponse = await getTodoList({ page: 1, size: 1000 });

      const fetchedDiary = diaryResponse.dtoList || [];
      const fetchedMoments = momentResponse.dtoList || [];
      const fetchedTodos = todoResponse.dtoList || [];

      setDiary(fetchedDiary);
      setMoments(fetchedMoments);
      setTodos(fetchedTodos);

      const diaryDates = fetchedDiary.map((d) => d.ddate);
      const momentDates = fetchedMoments.map((m) => m.mdate);
      const todoDates = fetchedTodos.map((t) => t.dueDate);
      setMarks([...new Set([...diaryDates, ...momentDates, ...todoDates])]);
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredDiary = diary.filter((d) =>
    moment(d.ddate).isSame(selectedDate, "day")
  );

  const filteredMoments = moments.filter((m) =>
    moment(m.mdate).isSame(selectedDate, "day")
  );

  const filteredTodos = todos.filter((t) =>
    moment(t.dueDate).isSame(selectedDate, "day")
  );

  return (
    <Container>
      <Header />
      <Row className="dateForCategory">
        <Col>
          <CalendarComponent marks={marks} onDateChange={handleDateChange} />
        </Col>
        <Col>
          <h2 className="h2-margin">
            {moment(selectedDate).format("YYYY-MM-DD")}
          </h2>
          <h5>📅 Diary ({filteredDiary.length})</h5>
          <ListGroup>
            {filteredDiary.map((diary) => (
              <ListGroup.Item
                key={diary.dno}
                onClick={() => navigate(`/diary/read/${diary.dno}`)}
                action
                className="clickable-item"
              >
                {diary.dtitle}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h5 className="mt-3">📸 Moment ({filteredMoments.length})</h5>
          <div className="moment-list-container">
            {filteredMoments.map((moment) => (
              <div
                key={moment.mno}
                className="moment-item-card"
                onClick={() => navigate(`/moment/read/${moment.mno}`)}
              >
                <p>{moment.mtitle}</p>
                <img
                  src={`${host}/api/moment/view/s_${moment.uploadFileNames[0]}`}
                  alt={moment.mtitle}
                />
              </div>
            ))}
          </div>
          <h5 className="mt-3">🫠 Todo ({filteredTodos.length})</h5>
          <ListGroup className="main-page-todo-list-group">
            {filteredTodos.map((todo) => (
              <ListGroup.Item
                key={todo.tno}
                className="d-flex align-items-center clickable-item"
                onClick={() => navigate(`/todo/read/${todo.tno}`)}
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  readOnly
                  className="me-2"
                />
                <span>{todo.ttitle}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
