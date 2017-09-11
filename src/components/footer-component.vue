<template>
    <div class="row footer-wrapper clearfix">
        <div class="col-xs-12">
            <div class="copyright col-xs-12">
                <p><span>&copy;</span> {{footerData ? footerData.trademark : undefined}}</p>
            </div>
            <div class="col-xs-12 col-md-4" v-for="link in footerData ? footerData.links: undefined" :key=link.name>
                <p class="sub-headings">{{link.name}}</p>
                <div class="col-xs-12" v-for="(sublink, index) in link ? link.links : undefined" :key=index>
                    <a href="javascript:void(0)">{{sublink}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {lodash} from '../common';

    export default {
        name: 'footer-component',
        data() {
            return {
            
            }
        },
        computed: {
            footerData() {
                return lodash(this.$store.getters, 'getPageData.content.footer');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .footer-wrapper {
        padding-top: 15px;
        font-size: 16px;
        border-top: 4px solid rgba(98, 98, 98, 0.41);
        .span {
            font-weight: 600;
        }
        .copyright p{
            color: rgba(98, 98, 98, 0.41);
        }
        p{
            font-weight: 600;
            text-align: center;
        }
        a {
            text-decoration: none;
            display: inline-block;
            text-decoration: none;
            text-align: center;
            width: 40%;
            margin: 0 auto;
            display: block;
            height: 30px;
            color: #616161;
            &:hover {
                color: #fff;
            }
        }
    }
</style> 