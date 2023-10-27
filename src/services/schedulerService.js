import axios from 'axios';

const SCHEDULER_API_BASE_URL = "http://localhost:8080/api/v1/scheduler";

class schedulerService {

    getAllEvents(){
        return axios.get(SCHEDULER_API_BASE_URL);
    }

    createEvent(event){
        return axios.post(SCHEDULER_API_BASE_URL, event)
    }

    getEventById(eventId){
        return axios.get(SCHEDULER_API_BASE_URL + '/' + eventId)
    }

    updateEvent(event,eventId){
        return axios.put(SCHEDULER_API_BASE_URL + '/' + eventId, event)
    }

    deleteEvent(eventId){
        return axios.delete(SCHEDULER_API_BASE_URL + '/' + eventId)
    }

}

export default new schedulerService()