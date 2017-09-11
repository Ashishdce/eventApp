import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map'
import { HTTP } from '../common';
import { environment } from '../../environment';
import { store } from '../store/index';
import { UPDATE_USER_INFO, SAVE_PAGE_DATA, SAVE_TOKEN, SAVE_EVENTS_DATA, UPDATE_MYSCHEDULE } from '../store/mutations';

export const pageDataResolver = () => {
    const postObject = JSON.stringify({
        'token': store.getters.getUserToken ? store.getters.getUserToken : JSON.parse(localStorage.getItem('token'))
    });
    if (!store.getters.getUserToken) {
        store.dispatch({ type: SAVE_TOKEN, payload: JSON.parse(localStorage.getItem('token')) });
    }
    return Observable.forkJoin(
        HTTP.get(environment.pagedata).then(res => {
            store.dispatch({ type: SAVE_PAGE_DATA, payload: res.data });
            return true;
        }, err => {
            console.log('Error while fetching page data');
        }),
        HTTP.post(environment.getUserInfo, postObject).then(res => {
            store.dispatch({ type: UPDATE_USER_INFO, payload: res.data });
            return true;
        }, err => {
            console.log('Error while fetching user info');
        }),
        HTTP.get(environment.getEvents).then(res => {
            store.dispatch({ type: SAVE_EVENTS_DATA, payload: res.data });

            const myScheduleData = {};
            res.data.events.forEach((eventDay, index) => {
                eventDay.events.forEach(event => {
                    if (event.added) {
                        if (myScheduleData[index]) {
                            myScheduleData[index].push(event);
                        } else {
                            myScheduleData[index] = [event];
                        }
                    }
                });
            });
            store.dispatch({ type: UPDATE_MYSCHEDULE, payload: myScheduleData });
            return true;
        }, err => {
            console.log('Error while fetching user info');
        })
    ).map(res => {
        if (res[0] && res[1] && res[2]) {
            return true;
        } else {
            return false;
        }
    });
}