<template>
    <div>
        <nav class="col-xs-12 clearfix">
            <div class="links"> 
                <div class="bottom-bar"></div>      
                <router-link v-for="(link, index) of links" :key="index" :to="`/main${link.route}`" class="link" activeClass="active">{{link.name}}</router-link>
                <i :class="{'fa fa-filter': !filterOpen, 'fa fa-times': filterOpen, 'rotate': filterOpen}" aria-hidden="true" @click="iconClick = true"></i>
            </div>
            <transition name="fade">
                <div class="filters-panel" v-show="filterOpen" v-clickoutside></div>
            </transition>
        </nav>

    </div>
</template>

<script>
    export default {
        name: 'navigation-component',
        data() {
            return {
                filterOpen: false,
                iconClick: false
            }
        },
        props: ['links'],
        directives: {
            clickoutside: {
                bind (el, binding, vnode) {
                    document.body.addEventListener('click', (e) => {
                        if (!el.contains(event.target)) {
                            if (vnode.context.iconClick) {
                                vnode.context.filterOpen = !vnode.context.filterOpen;
                                vnode.context.iconClick = false
                            } else {
                                vnode.context.filterOpen = false;
                            }
                        }
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
$primary-color: #29abe1;
    .links {
        position: relative;
        height: 50px;
        .bottom-bar {
            position: absolute;
            height: 4px;
            width: 110px;
            top: 50px;
            background: red;
            transition: transform 0.15s ease-in-out;            
        }
        .link {
            color: $primary-color;
            text-decoration: none;
            display: inline-block;
            width: 110px;
            text-align: center;
            padding-top: 13px;
            font-weight: 600;
            font-size: 16px;
            height: 100%;
            transition: background 0.15s ease-in-out, color 0.15s ease-in-out;
            &:hover {
                color: #fff;
                background: $primary-color;
            }
        }
        .active {
            color: #fff;
            background: $primary-color;
        }
        .fa {
            position: absolute;
            font-size: 25px;
            color: #0a0a0a;
            top: 18px;
            right: 71px;
            cursor: pointer;
            transition: transform 0.4s ease-in-out;           
        }
        .rotate {
            transform: rotate(360deg);
        }
    }
.filters-panel {
    position: absolute;
    width: 100%;
    height: 200px;
    background: #fff;
    top: 55px;
    right: 44px;
    z-index: 46;
    border-radius: 5px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style> 