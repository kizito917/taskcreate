<template>
    <div class="main-body">
        <div class="first-bg-section">
            <div class="second-bg-section">
                <h5>Hi User, Welcome Back</h5>
                <p>your account awaits you</p>
                <div class="form-area">
                    <form action="">
                        <div class="form-group">
                            <input type="text" name="" id="" class="form-control" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <input type="password" name="" id="" class="form-control" placeholder="Password">
                        </div>
                        <div>
                            <button class="login-btn">Login Account</button>
                        </div>
                        <p class="forgot-pass">forgot password, <router-link to="">Click here</router-link></p>
                        <p class="register-route">i am a first time user!!!, <router-link to="/register">Click here to register</router-link></p>
                    </form>
                </div>
                <p class="copy"><b>&copy; {{ getCopyRightContent }}</b></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            getCopyRightContent: this.$store.state.copyRightInfo
        }
    }
}
</script>

<style scoped>
    .first-bg-section {
        position: absolute;
        background-color: #4CAF50;
        border-radius: 15px;
        width: 70%;
        margin-left: 15%;
        margin-right: 15%;
        height: 410px;
        margin-top: 50px;
    }
    .second-bg-section {
        position: absolute;
        width: 98%;
        background-color: #ffffff;
        margin-left: 1%;
        margin-right: 1%;
        height: 397px;
        margin-top: 10px;
        padding-bottom: 10px;
        border-radius: 10px;
    }

    .second-bg-section> h5 {
        font-family: Schadow BT;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #000000;
        mix-blend-mode: darken;
        margin-top: 20px;
    }

    .second-bg-section> p {
        font-family: Schadow BT;
        font-style: normal;
        font-weight: normal;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: #000000;
    }

    input {
        border: 1px solid #4CAF50;
        border-left: 0px;
        border-right: 0px;
        border-top: 0px;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        font-size: 12px;
    }

    .login-btn {
        background-color: #4CAF50;
        color: #fff;
        border-color: #4CAF50;
        height: 40px;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 20px;
    }

    .forgot-pass, .register-route {
        font-family: Schadow BT;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 13px;
        text-align: center;
        margin-top: 30px;
    }

    .copy {
        color: #4CAF50;
    }

@media screen and (max-device-width: 480px) and (orientation: portrait){
  .first-bg-section {
        position: absolute;
        background-color: #4CAF50;
        border-radius: 15px;
        width: 290px;
        height: 410px;
    }

    .second-bg-section {
        position: absolute;
        background-color: #ffffff;
        width: 279px;
        height: 397px;
        border-radius: 10px;
    }

    .forgot-pass, .register-route {
        font-family: Schadow BT;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 13px;
        text-align: center;
        margin-top: 30px;
    }
}

</style>