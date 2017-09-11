<template>
    <div class="clearfix">
        <div class="col-xs-12">
            <div class="wrapper clearfix">
                <div v-for="(day, key) in mySchedule" :key="key" class="clearfix">
                    <div class="heading clearfix">
                        Events for Day {{parseInt(key) + 1}}
                    </div>
                    <div class="col-xs-12">
                        <div class="header-table clearfix" v-if="mySchedule[key].length">
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
                        <div v-for="event in day" :key="event.title" class="event-wrapper clearfix">
                            <div class="col-xs-2 offset-xs-1">
                                {{event.time}}
                            </div>
                            <div class="col-xs-6">
                                {{event.title}}
                            </div>
                            <div class="col-xs-3">
                                <button class="btn btn-info" @click="removeEvent(event, key)">Remove from Schedule</button>
                            </div>   
                        </div>
                        <button class="btn btn-secondary btn-lg" :disabled="mySchedule[key].length === events[key].events.length" @click="$router.push(`/main/day/${parseInt(key) + 1}`)">Add More Events for Day {{parseInt(key) + 1}}</button>
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
import { UPDATE_MYSCHEDULE } from '../store/mutations';
import {lodash} from '../common';

    export default {
        name: 'myschedule-component',
        data() {
            return {
                
            }
        },
        computed: {
            mySchedule() {
                return lodash(this.$store.getters, 'getMySchedule');
            },
            events() {
                return lodash(this.$store.getters.getEventsData, 'events', {});
            }
        },
        methods: {
            removeEvent(event, key) {
                const index = this.mySchedule[key].indexOf(event);
                this.mySchedule[key].splice(index, 1);
                this.$store.dispatch({type: UPDATE_MYSCHEDULE, payload: this.mySchedule});

                const position = this.events[key].events.indexOf(event);
                this.events[key].events[position].added = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .wrapper {
        padding: 15px 0;
        font-size: 16px;
        color: #858585;
        .heading {
            width: 100%;
            margin: 15px auto;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
        }
        .btn-lg {
            margin: 15px auto;
            color: #858585;
            display: block;
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