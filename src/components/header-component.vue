<template>
    <div class="row">                           
            <header class="header clearfix">
                <div class="logo">
                    <img src="../assets/event-logo.png" alt="header image">
                </div>
                <div class="nav-bar">
                    <div class="user-info">
                        <div class="user-image" @click="profileClick = true">
                            <img src="../assets/leo.jpg" alt="Profile picture">
                        </div>
                        <transition name="fade">
                        <div class="popup" v-show="show" v-clickoutside>
                            <div v-for="item in headerData ? headerData.profilePopup : {}" :key="item" class="items">
                                <a href="javascript:void(0)" @click="item === 'Logout' ? $router.push('/login') : ''">{{item}}</a>
                            </div>
                        </div>
                        </transition>
                        <p>Hi, {{userInfo ? userInfo.firstname : undefined}}</p>
                    </div>   
                    <navigation-component :links="headerData ? headerData.links : undefined"></navigation-component>
                </div>
            </header>
    </div>
</template>

<script>
import NaivagationComponent from './navigation-component.vue';
import Vue from 'vue';
import {lodash} from '../common';

    export default {
    name: 'header-component',
    data() {
        return {
           show: false,
           profileClick: false
        }
    },
    computed: {
        headerData() {
            return lodash(this.$store.getters, 'getPageData.content.header');
            
        },
        userInfo() {
            return lodash(this.$store.getters, 'getUserInfo');
        }
    },
    components: {
        'navigation-component': NaivagationComponent
    },
    methods: {
        togglePopUp() {
            this.show = !this.show;
        }
    },
    directives: {
        clickoutside: {
            bind (el, binding, vnode) {
                document.body.addEventListener('click', (e) => {
                    if (!el.contains(event.target)) {
                        if (vnode.context.profileClick) {
                            vnode.context.show = !vnode.context.show;
                            vnode.context.profileClick = false
                        } else {
                            vnode.context.show = false;
                        }
                    }
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    height: 166px;
    margin-top: 20px;
    border-bottom: 4px solid rgba(98, 98, 98, 0.41);
    .logo {
            width: 200px;
            height: 161px;
            float: left;
            margin-left: 20px;
        img {
            width: 100%;
        }
    }
    .nav-bar {
        width: calc(100% - 220px);
        float: right;
        .user-info {
                width: 100%;
                height: 112px;
                p{
                    float: right;
                    max-width: 200px;
                    margin-right: 35px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 30px;
                    padding-top: 45px;
                    color: rgba(10, 10, 10, 0.66);
                }
                .popup {
                    position: absolute;
                    width: 200px;
                    background: rgba(10, 10, 10, 0.79);
                    right: 16px;
                    top: 146px;
                    z-index: 50;
                    border-radius: 5px;
                    overflow: hidden;
                    .items {
                        width: 100%;
                        height: 40px;
                        a{
                            color: #fff;
                            text-decoration: none;
                            width: 100%;
                            display: inline-block;
                            text-align: center;
                            height: 100%;
                            padding-top: 8px;
                            font-size: 16px;
                            font-weight: 600;
                            &:hover {
                                color: #000;
                                background: #fff;
                            }
                        }
                    }
                }
            .user-image {
                    width: 100px;
                    float: right;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 51px;
                    margin-top: 7px;
                    cursor: pointer;
                    position: relative;
                img {
                    width: 100%;
                }
            }
        }
        navigation-component {
            width: 100%;
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>     

