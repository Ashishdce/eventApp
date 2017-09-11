<template>
    <div class="clearfix">
        <div class="col-xs-12">
            <div class="wrapper clearfix">
                <div class="col-xs-12">
                    <div class="heading">
                        <p>All the events for this day are listed below.</p>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="header-table clearfix">
                        <div class="col-xs-2 offset-xs-1">
                            Time
                        </div>
                        <div class="col-xs-6">
                            Event Name
                        </div>
                        <div class="col-xs-3">
                            Status
                        </div>  
                    </div>
                    <div v-for="event in events" :key="event.title" class="event-wrapper clearfix">
                        <div class="col-xs-2 offset-xs-1">
                            {{event.time}}
                        </div>
                        <div class="col-xs-6">
                            {{event.title}}
                        </div>
                        <div class="col-xs-3">
                            <button class="btn btn-secondary add-button" :class="{'btn-info' :event.added}" @click="updateMyschedule(event)">{{ event.added ? 'Remove from Schedule' : 'Add to Schedule'}}</button>
                        </div>   
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
import { UPDATE_MYSCHEDULE } from '../store/mutations';

    export default {
        name: 'events-component',
        data() {
            return {
               
            }
        },
        computed: {
            events() {
                if (this.$store.getters.getEventsData) {
                    return this.$store.getters.getEventsData.events[this.$route.params.id - 1].events
                }
            }
        },
        methods: {
            updateMyschedule(event) {
                let currentSchedule = this.$store.getters.getMySchedule;
                const id = this.$route.params.id;
                if (event.added) {
                    // need to remove from myschedule
                    const index = currentSchedule[id - 1].indexOf(event);
                    currentSchedule[id - 1].splice(index, 1);
                } else {
                    //need to add to the myschedule
                    if (currentSchedule[id - 1]) {
                        currentSchedule[id - 1].push(event);
                    } else {
                        currentSchedule[id - 1] = [event];
                    }
                }
                event.added = !event.added;
                this.$store.dispatch({type: UPDATE_MYSCHEDULE, payload: currentSchedule});
            }
        }
    };
</script>

<style lang="scss" scoped>
    .wrapper {
        padding: 15px 0;
        font-size: 16px;
        color: #858585;
        .heading{
            font-size: 20px;
            padding-left: 15px;
        }
        .header-table {
            height: 30px;
            font-weight: 600;
            background: rgb(41, 171, 225);
            color: #fff;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            padding-top: 3px;
        }
        .event-wrapper {
            font-weight: 600;
            height: 55px;
            border-bottom: 2px solid #fff;
            background: rgba(255, 255, 255, 0.32);
            & > div {
                padding-top: 15px;
            }
            & > div:last-of-type {
                padding-top: 9px;
            }
            .btn-info {
                background-color: #29abe1;
                border-color: #29abe1;
                &:hover {
                    background-color: #5bc0de;
                    border-color: #5bc0de;
                }
            }
        }
    }
</style> 