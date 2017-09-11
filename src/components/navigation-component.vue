<template>
    <div>
        <nav class="col-xs-12 clearfix">
            <div class="links"> 
                <div class="bottom-bar"></div>      
                <router-link v-for="(link, index) of links" :key="index" :to="`/main${link.route}`" class="link" activeClass="active">{{link.name}}</router-link>
            </div>
        </nav>

    </div>
</template>

<script>
    export default {
        name: 'navigation-component',
        data() {
            return {
                
            }
        },
        props: ['links']
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
    }
</style> 