import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Header from "../../include/Header";
import CalendarComponent from "../../component/common/Calendar";
import moment from "moment";
import { getList as getDiaryList } from "../../api/diaryApi"; // For marking dates
import { getList as getMomentList } from "../../api/momentApi";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [marks, setMarks] = useState([]);
  const [allMoments, setAllMoments] = useState([]); // Store all moments
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const diaryResponse = await getDiaryList({ page: 1, size: 1000 });
      const momentResponse = await getMomentList({ page: 1, size: 1000 });

      const fetchedDiaries = diaryResponse.dtoList || [];
      const fetchedMoments = momentResponse.dtoList || [];

      setAllMoments(fetchedMoments);

      const diaryDates = fetchedDiaries.map((d) => d.ddate);
      const momentDates = fetchedMoments.map((m) => m.mdate);
      setMarks([...new Set([...diaryDates, ...momentDates])]);
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredMoments = allMoments.filter((m) =>
    moment(m.mdate).isSame(selectedDate, "day")
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
          <h5>Moment ({filteredMoments.length})</h5>
          <ListGroup>
            {filteredMoments.length === 0 ? (
              <ListGroup.Item>No moment entries for this date.</ListGroup.Item>
            ) : (
              filteredMoments.map((moment) => (
                <ListGroup.Item
                  key={moment.mno}
                  onClick={() => navigate(`/moment/read/${moment.mno}`)}
                  action
                  className="clickable-item"
                >
                  {moment.mtitle}
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
