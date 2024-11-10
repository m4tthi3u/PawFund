import { memo, useEffect, useState } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { format } from "date-fns";
import Loading from "component/Loading";
import { eventService } from "services/eventServices";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const result = await eventService.getAll();
            setEvents(result.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <>
            {loading && <Loading />}
            <Breadcrumb name="Sự Kiện" />
            <div className="container">
                <div className="events__content">
                    <div className="section-title">
                        <h2>Sự Kiện Sắp Diễn Ra</h2>
                    </div>
                    <div className="row">
                        {events.map((event) => (
                            <div key={event.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <div className="event-card">
                                    <div className="event-card__body">
                                        <h3 className="event-card__title">{event.title}</h3>
                                        <div className="event-card__info">
                                            <p className="event-card__date">
                                                <i className="bi bi-calendar"></i>
                                                {format(new Date(event.date), 'dd/MM/yyyy HH:mm')}
                                            </p>
                                            <p className="event-card__location">
                                                <i className="bi bi-geo-alt"></i>
                                                {event.location}
                                            </p>
                                        </div>
                                        <p className="event-card__description">{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(EventPage);