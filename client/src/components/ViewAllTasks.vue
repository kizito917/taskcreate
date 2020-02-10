<template>
    <div class="main-body">
        <topNav />
        <div class="mainContent">
            <div class="nav-tabs">
                <router-link to="" id="routerLink">Today's Tasks</router-link>
                <router-link to="" id="routerLink">All Tasks</router-link>
                <router-link to="" id="routerLink">Filter Tasks</router-link>
            </div>
            <div class="fetched-tasks">
                <div class="task-info">
                    <h5>Create Some Projects to Aid Hearing</h5>
                    <p>Due date: 22/02/2020</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topNav from './navbar/TopNav'
export default {
    components: {
        topNav
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
    .mainContent {
        /* width: 90%;
        margin-left: 10%; */
        padding-top: 70px;
    }

    .nav-tabs{
        background-color: #EBEDEB;
        height: 27px;
    }

    .nav-tabs> #routerLink {
        margin-left: 200px;
        margin-right: 150px;
        font-family: Schadow BT;
        font-style: normal;
        font-weight: normal;
        font-size: 17px;
        line-height: 13px;
        text-align: center;
        color: #4CAF50;
        text-decoration: none;
    }

    .nav-tabs> #routerLink:hover {
        margin-left: 200px;
        margin-right: 150px;
        font-family: Schadow BT;
        font-style: normal;
        font-weight: normal;
        font-size: 17px;
        line-height: 13px;
        text-align: center;
        background-color: #4CAF50;
        color: #ffffff;
        text-decoration: none;
    }

    .task-info {
        background-color: #F3F1F1;
        border-radius: 5px;
        height: 42px;
        margin-top: 20px;
        /* position: absolute; */
    }

    .task-info> h5 {
        position: absolute;
        width: 248px;
        height: 23px;
        font-family: Segoe Print;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 23px;
    }

    .task-info> p {
        font-family: Schadow BT;
        font-style: normal;
        font-weight: normal;
        font-size: 9px;

    }

@media screen and (max-device-width: 480px) and (orientation: portrait){
  .nav-tabs> #routerLink {
        margin-left: 25px;
        margin-right: 20px;
        font-family: Schadow BT;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 13px;
        text-align: center;
        color: #4CAF50;
        text-decoration: none;
    }
}
</style>