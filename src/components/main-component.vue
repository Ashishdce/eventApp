<template>
    <div>
        <header-component></header-component>
        <transition name="component-fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <footer-component></footer-component>
    </div>

</template>

<script>
import HeaderComponent from './header-component.vue';
import FooterComponent from './footer-component.vue';

    export default {
        name: 'main-component',
        data() {
            return {
                product: {}
            }
        },
        components: {
            'header-component': HeaderComponent,
            'footer-component': FooterComponent
        }
    };
</script>

<style scoped>
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to {
        opacity: 0;
    }
</style> 