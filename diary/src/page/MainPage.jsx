import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Header from "../include/Header";
import CalendarComponent from "../component/common/Calendar";
import moment from "moment";
import { getList as getDiaryList } from "../api/diaryApi";
import { getList as getMomentList } from "../api/momentApi";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const [diary, setDiary] = useState([]);
  const [moments, setMoments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [marks, setMarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const diaryResponse = await getDiaryList({ page: 1, size: 1000 });
      const momentResponse = await getMomentList({ page: 1, size: 1000 });

      const fetchedDiary = diaryResponse.dtoList || [];
      const fetchedMoments = momentResponse.dtoList || [];

      setDiary(fetchedDiary);
      setMoments(fetchedMoments);

      const diaryDates = fetchedDiary.map((d) => d.ddate);
      const momentDates = fetchedMoments.map((m) => m.mdate);
      setMarks([...new Set([...diaryDates, ...momentDates])]);
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
          <ListGroup>
            {filteredMoments.map((moment) => (
              <ListGroup.Item
                key={moment.mno}
                onClick={() => navigate(`/moment/read/${moment.mno}`)}
                action
                className="clickable-item"
              >
                {moment.mtitle}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
