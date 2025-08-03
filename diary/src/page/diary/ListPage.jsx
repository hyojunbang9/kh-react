import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import Header from "../../include/Header";
import CalendarComponent from "../../component/common/Calendar";
import moment from "moment";
import { getList as getDiaryList } from "../../api/diaryApi";
import { getList as getMomentList } from "../../api/momentApi";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [marks, setMarks] = useState([]);
  const [allDiaries, setAllDiaries] = useState([]); // Store all diaries
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const diaryResponse = await getDiaryList({ page: 1, size: 1000 });
      const momentResponse = await getMomentList({ page: 1, size: 1000 });

      const fetchedDiaries = diaryResponse.dtoList || [];
      const fetchedMoments = momentResponse.dtoList || [];

      setAllDiaries(fetchedDiaries);

      const diaryDates = fetchedDiaries.map((d) => d.ddate);
      const momentDates = fetchedMoments.map((m) => m.mdate);
      setMarks([...new Set([...diaryDates, ...momentDates])]);
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredDiaries = allDiaries.filter((d) =>
    moment(d.ddate).isSame(selectedDate, "day")
  );

  return (
    <Container>
      <Header />
      <Row className="mt-5">
        <Col md={12}>
          <CalendarComponent marks={marks} onDateChange={handleDateChange} />
        </Col>
        <Col md={12}>
          <h2 className="h2-margin">
            {moment(selectedDate).format("YYYY-MM-DD")}
          </h2>
          <h5>Diary ({filteredDiaries.length})</h5>
          <ListGroup>
            {filteredDiaries.length === 0 ? (
              <ListGroup.Item>작성 된 일기 없음.</ListGroup.Item>
            ) : (
              filteredDiaries.map((diary) => (
                <ListGroup.Item
                  key={diary.dno}
                  onClick={() => navigate(`/diary/read/${diary.dno}`)}
                  action
                  className="clickable-item"
                >
                  {diary.dtitle}
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ListPage;
