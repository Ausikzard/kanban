const Calendar = () => {
    return (
        <>
            <div className="calendarContainer">
                <div className="calendar">
                    <div className="calendarHeader">
                        <button className="lastYear" title="Last year">&lt;&lt;</button>
                        <button className="lastMonth" title="Last month">&lt;</button>
                        <div className="currentDate">2024-8-01</div>
                        <button className="nextMonth" title="Next month">&gt;</button>
                        <button className="nextYear" title="Next year">&gt;&gt;</button>
                    </div>
                    <div className="days">
                        <div className="day">Mon</div>
                        <div className="day">Tue</div>
                        <div className="day">Wed</div>
                        <div className="day">Thu</div>
                        <div className="day">Fri</div>
                        <div className="day">Sat</div>
                        <div className="day">Sun</div>
                    </div>
                    <div className="dates">
                        <button className="date">1</button>
                        <button className="date">2</button>
                        <button className="date">3</button>
                        <button className="date">4</button>
                        <button className="date">5</button>
                        <button className="date">6</button>
                        <button className="date">7</button>
                        <button className="date">8</button>
                        <button className="date">9</button>
                        <button className="date">10</button>
                        <button className="date">11</button>
                        <button className="date">12</button>
                        <button className="date">13</button>
                        <button className="date">14</button>
                        <button className="date">15</button>
                        <button className="date">16</button>
                        <button className="date">17</button>
                        <button className="date">18</button>
                        <button className="date">19</button>
                        <button className="date">20</button>
                        <button className="date">21</button>
                        <button className="date">22</button>
                        <button className="date">23</button>
                        <button className="date">24</button>
                        <button className="date">25</button>
                        <button className="date">26</button>
                        <button className="date">27</button>
                        <button className="date">28</button>
                        <button className="date">29</button>
                        <button className="date">30</button>
                        <button className="date">31</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calendar