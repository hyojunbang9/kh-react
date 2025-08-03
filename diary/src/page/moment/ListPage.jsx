import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Header from "../../include/Header";
import CalendarComponent from "../../component/common/Calendar";
import moment from "moment";
import { getList as getMomentList } from "../../api/momentApi";
import { useNavigate } from "react-router-dom";
import "./ListPage.css";
import { API_SERVER_HOST } from "../../api/diaryApi";

const host = API_SERVER_HOST;

const ListPage = () => {
  const [moments, setMoments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [marks, setMarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const momentResponse = await getMomentList({ page: 1, size: 1000 });
      const fetchedMoments = momentResponse.dtoList || [];
      setMoments(fetchedMoments);
      const momentDates = fetchedMoments.map((m) => m.mdate);
      setMarks([...new Set(momentDates)]);
    };
    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredMoments = moments.filter((m) =>
    moment(m.mdate).isSame(selectedDate, "day")
  );

  return (
    <>
      <Container className="list-page-container">
        <div className="Header-margin">
          <Header />
        </div>
        <div className="calendar-container">
          <CalendarComponent marks={marks} onDateChange={handleDateChange} />
        </div>
        <div className="content-container">
          <h2 className="selected-date-header">
            {moment(selectedDate).format("YYYY-MM-DD")}
          </h2>
          <div className="moment-items-container">
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
        </div>
      </Container>
    </>
  );
};

export default ListPage;
