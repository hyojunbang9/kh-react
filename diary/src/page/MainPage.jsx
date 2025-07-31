import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Header from '../include/Header';
import CalendarComponent from '../component/common/Calendar';
import moment from 'moment';
import { getList as getDiaryList } from '../api/diaryApi';
import { getList as getMomentList } from '../api/momentApi';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [diaries, setDiaries] = useState([]);
  const [moments, setMoments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [marks, setMarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const diaryResponse = await getDiaryList({ page: 1, size: 1000 });
      const momentResponse = await getMomentList({ page: 1, size: 1000 });

      const fetchedDiaries = diaryResponse.dtoList || [];
      const fetchedMoments = momentResponse.dtoList || [];

      setDiaries(fetchedDiaries);
      setMoments(fetchedMoments);

      const diaryDates = fetchedDiaries.map((d) => d.ddate);
      const momentDates = fetchedMoments.map((m) => m.mdate);
      setMarks([...new Set([...diaryDates, ...momentDates])]);
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredDiaries = diaries.filter((d) =>
    moment(d.ddate).isSame(selectedDate, 'day')
  );

  const filteredMoments = moments.filter((m) =>
    moment(m.mdate).isSame(selectedDate, 'day')
  );

  return (
    <Container>
      <Header />
      <Row className="mt-5">
        <Col md={6}>
          <CalendarComponent marks={marks} onDateChange={handleDateChange} />
        </Col>
        <Col md={6}>
          <h4>{moment(selectedDate).format('YYYY-MM-DD')}</h4>
          <h5>Diaries ({filteredDiaries.length})</h5>
          <ListGroup>
            {filteredDiaries.map((diary) => (
              <ListGroup.Item
                key={diary.dno}
                onClick={() => navigate(`/diary/read/${diary.dno}`)}
                action
                style={{ cursor: 'pointer' }}
              >
                {diary.dtitle}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h5 className="mt-3">Moments ({filteredMoments.length})</h5>
          <ListGroup>
            {filteredMoments.map((moment) => (
              <ListGroup.Item
                key={moment.mno}
                onClick={() => navigate(`/moment/read/${moment.mno}`)}
                action
                style={{ cursor: 'pointer' }}
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