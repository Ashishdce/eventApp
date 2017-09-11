<template>
    <div class="clearfix">
        <div class="col-xs-12">
            <div class="card">
                <div class="image-wrapper">
                    <img class="card-img-top" src="../assets/leo.jpg" alt="Card image cap">
                </div>
                <div class="card-block">
                    <h4 class="card-title">MY PASS</h4>
                    <p class="card-text">{{userInfo ? `${userInfo.firstname} ${userInfo.lastname}` : undefined}}</p>
                    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
                    <button class="btn btn-primary" @click="print">Print</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import {lodash} from '../common';

    export default {
        name: 'mypass-component',
        data() {
            return {
                value: '',
                size: 200
            }
        },
        computed: {
            userInfo() {
                const userInfo = lodash(this.$store.getters, 'getUserInfo');
                this.value = userInfo ? `Name: ${userInfo.firstname} ${userInfo.lastname}  Company: ${userInfo.company}` : '';
                return userInfo;
            }
        },
        components: {
            QrcodeVue
        },
        methods: {
            print() {
                var prtContent = document.querySelector('.card').cloneNode(true);
                var WinPrint = window.open('', '', 'left=0,top=0,width=400,height=500,toolbar=0,scrollbars=0,status=0');
                WinPrint.document.querySelector('body').append(prtContent);
                WinPrint.document.close();
                WinPrint.focus();
                WinPrint.print();
                WinPrint.close();
            }
        }
    };
</script>

<style lang="scss" scoped>
   .card {
        width: 500px;
        margin: 15px auto 15px;
        background: rgba(255, 255, 255, 0.32);
        padding: 15px;
        border-radius: 5px;
        .image-wrapper {
            width: 200px;
            height: 200px;
            margin: 15px auto 0;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0px 0px 20px 1px #9d9d9d;
            img {
                width: 100%;
            }
        }
        .card-block {
            h4, p {
                text-align: center;
                color: #858585;
            }
            p {
                font-size: 30px;
            }
            div {
                margin: 0 auto;
                width: 200px;
            }
            button {
                display: block;
                width: 200px;
                margin: 15px auto 0;
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