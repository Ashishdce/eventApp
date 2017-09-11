<template>
    <div class="main-wrapper">
        <div class="col-xs-12 col-md-6">
            <div class="wrapper">
            <img src="../assets/event-logo.png" alt="Event app logo">
            </div>
        </div>
        <div class="horizontal-bar"></div>
        <div class="col-xs-12 col-md-6">
            <div class="wrapper">
                <div class="form-inner-wrapper">
                    <form>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" v-model="email" v-validate="'required|email'" @focus="showMessage = false" class="form-control" :class="{'error': errors.has('email')}" name="email" id="email" placeholder="Email">
                            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model="password" v-validate="'required|alpha_num'" @focus="showMessage = false" class="form-control" :class="{'error': errors.has('password')}" name="password" id="password" placeholder="Password">
                            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>                            
                        </div>
                        <div class="form-group checkbox-wrapper">
                            <input type="checkbox" name="remember" id="remember" class="custom-checkbox">
                            <label for="remember">Remember Me</label>
                        </div>
                        <button type="submit" class="form-group btn btn-primary" :disabled="email && password && errors.any()" @click.prevent="loginAttempt">Login</button>
                    </form>
                    <div v-if="showMessage" class="error-message">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        <p> {{errorMessage}} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { HTTP } from '../common';
import { SAVE_TOKEN } from '../store/mutations';
import { environment } from '../../environment';

    export default {
        name: 'login-component',
        data() {
            return {
                email: '',
                password: '',
                errorMessage: '',
                showMessage: false
            }
        },
        methods: {
            loginAttempt() {
                const postObj = JSON.stringify({
                    'email': this.email,
                    'password': this.password
                });
                HTTP.post(environment.login, postObj)
                    .then(res => {
                        if (!res.data.status || res.data.status === 'Success') {
                            this.$store.dispatch({type: SAVE_TOKEN, payload: res.data });
                            localStorage.setItem('token', JSON.stringify(res.data));
                            this.$router.push('main');
                        } else {
                            this.showMessage = true;
                            this.errorMessage = res.data.message;
                        }
                    }, err => {
                        this.showMessage = true;
                        this.errorMessage = 'Login attempt failed, please try again.';
                    });
            }
        }
    };
</script>

<style lang="scss" scoped>
    $primary-color: #29abe1;
    $error-color: #ff3860;
    .horizontal-bar {
        position: absolute;
        width: 0px;
        background: rgba(107, 107, 107, 0.43);
        left: 50%;
        height: 400px;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 3px 1px #666;
    }
    .wrapper {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .form-inner-wrapper {
            position: relative;
        }
        img {
            width: 400px;
            margin: 0 auto;
        }
        label {
            font-size: 17px;
            color: #fff;
        }
        .form-group {
            width: 60%;
            margin: 0 auto 15px;
        }
        button {
            display: block;
            background-color: $primary-color;
            border-color: $primary-color;
            font-size: 16px;
            font-weight: 600;
            &:hover {
                background-color: #fff;
                color: $primary-color;
                
            }
        }
        .is-danger {
            color: $error-color;
            display: inline-block;
            padding-top: 5px;
        }
        .error {
            border-color: $error-color
        }
        input:not([type="checkbox"]):focus {
            box-shadow: 0px 0px 3px 2px #848484;
        }
        .checkbox-wrapper {
            position: relative;
            input {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }
            label {
                position: absolute;
                left: 22px;
                cursor: pointer;
            }
        }
        .error-message {
            width: 60%;
            background: rgba(255, 56, 96, 0.5);
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 5px;
            padding: 15px;
            padding-left: 65px;
            font-size: 16px;
            color: white;
            i {
                font-size: 36px;
                position: absolute;
                top: 10px;
                left: 15px;
            }
            p {
                margin: 0;
            }
        }
    }
    @media screen and (max-width: 991px) {
        .horizontal-bar {
            display: none;
        }
        .main-wrapper {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .wrapper {
            height: inherit;
            img {
                width: 500px;
                margin-bottom: 80px;
            }
        }

    }
</style> 