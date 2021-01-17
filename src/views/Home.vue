<template>
    <div class="home grid gap-0 grid-cols-1 md:grid-cols-2 bg-blackl w-full md:w-screen h-full md:h-screen">
        <div class="welcome text-white">
            <div class="container p-24 flex flex-col">
                <p class="welcome-user">Hello, <span class="username">Emerald</span></p>

                <p class="welcome-msg mt-4 mb-8">Welcome to your dashboard, kindly sort through the user base</p>

                <div class="search-user">
                    <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />

                    <input
                        id="search-user"
                        v-model="queryTerm"
                        type="text"
                        name=""
                        placeholder="Find a user"
                        class="search-input bg-gray9 w-full p-4 pr-6 focus:outline-none"
                        @keyup.enter="getUsers"
                    />
                </div>

                <div class="title capitalize mt-16 mb-10">show users</div>

                <div class="flex flex-row">
                    <div
                        v-for="(card, index) in cards"
                        :key="index"
                        :tabindex="index"
                        class="card-option mr-8"
                        @click="getUserGroup(index)"
                    >
                        <!-- @click="getUserGroup(card.name)" -->
                        <div class="card flex justify-center items-center rounded-2xl" :class="[card.name, card.color]">
                            <font-awesome-icon :icon="['fas', card.icon]" size="2x" />
                        </div>

                        <div class="card-title text-center capitalize mt-4">{{ card.title }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full h-full p-4 overflow-hidden">
            <div class="bg-gray1 w-full h-full rounded-2xl px-14 py-12">
                <div class="w-full h-full rounded-2xl font-blackl">
                    <div class="window-title capitalize">{{ section_name }}</div>

                    <div class="filter-title capitalize">Filter By</div>

                    <div class="filters capitalize">
                        <div class="find-user">
                            <font-awesome-icon :icon="['fas', 'search']" class="find-icon" />

                            <input
                                id="search-list"
                                type="text"
                                name=""
                                placeholder="Find a user"
                                class="find-input bg-gray4 p-1 pr-4 focus:outline-none"
                            />
                        </div>

                        <span class="inline-block">
                            <select class="countries bg-gray4 p-1 mx-2 capitalize">
                                <option>Country</option>

                                <option>Nigeria</option>
                            </select>

                            <font-awesome-icon :icon="['fas', 'sort-down']" class="sort"
                        /></span>

                        <span>
                            <input id="switch" type="checkbox" @click="show_country = !show_country" /><label
                                for="switch"
                                class="switch"
                                >Toggle</label
                            >

                            <span class="ml-1 show text-black">Show Country</span>
                        </span>
                    </div>

                    <div class="result-window w-full h-96 md:h-2/3 rounded-xl mt-6 overflow-y-auto">
                        <!-- <users v-if="window_type === 'Users'" :users="userList" :show_country="show_country" /> -->
                        <template v-if="window_type === 'Users'">
                            <users
                                v-for="(user, index) in userList"
                                :key="index"
                                :user="user"
                                :show_country="show_country"
                                @userN="something($event)"
                            />
                        </template>
                        <template v-if="window_type === 'UserDetails'">
                            <user-details :userInfo="userInfo" @new-window-type="changeWindow()" />
                        </template>
                    </div>

                    <div class="window-options flex flex-row mt-8">
                        <div tabindex="7" class="download-results bg-purplel text-white rounded-3xl px-4 py-2">
                            <font-awesome-icon :icon="['fas', 'cloud-download-alt']" /> Download results
                        </div>

                        <div class="navigation flex flex-row items-center ml-auto text-blackl">
                            <button class="navigate w-8 h-8 rounded-lg bg-gray4">
                                <font-awesome-icon :icon="['fas', 'angle-left']" />
                            </button>

                            <button class="navigate right-arrow w-8 h-8 rounded-lg bg-gray4 ml-2">
                                <font-awesome-icon :icon="['fas', 'angle-right']" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <font-awesome-icon :icon="['fas', 'angle-left']" />



        />



        -->
    </div>
</template>



<script>
// import axios from 'axios'
import apiRequest from '../utils/apiUtils'
import Users from '@/components/Users'
import UserDetails from '@/components/UserDetails'

export default {
    name: 'Home',
    components: {
        Users,
        UserDetails
    },

    data() {
        return {
            cards: [
                {
                    title: 'All Users',
                    name: 'group',
                    color: 'bg-pinkl',
                    icon: 'users'
                },
                {
                    title: 'Male Users',
                    name: 'male',
                    color: 'bg-teal3',
                    icon: 'male'
                },
                {
                    title: 'Female Users',
                    name: 'female',
                    color: 'bg-purplel',
                    icon: 'female'
                }
            ],

            queryTerm: '',
            section_name: 'No User Found',
            window_type: 'Users',
            userList: [],
            userInfo: null,
            show_country: false,
            page_number: 0,
            size: 10
        }
    },

    computed: {},

    created() {
        return this.getUserGroup(1)
    },

    methods: {
        async getUsers() {
            if (this.queryTerm !== '') {
                console.log('Searching...')

                try {
                    let response = await apiRequest.get(`/api/?results=10&seed=${this.queryTerm}`)

                    if ([200, 201].includes(response.status)) {
                        let results = response.data.results

                        if (results.length === 0) {
                            alert(`Zero (0) results found for ${this.queryTerm}.`)
                            return
                        }

                        console.log('Result found.')
                        this.userList = results
                        // return

                        // this.$router.push({
                        //     path: '/search',
                        //     query: {
                        //         name: this.queryTerm,
                        //         page: 1
                        //         // queried_on: `${this.modifiedToday}`,
                        //     }
                        // })
                    }
                } catch (e) {
                    console.log(e)

                    alert('Error fetching data. Please try again.')
                }
                return
            }

            alert('Please enter a valid name to start a search.')
        },

        async getUserGroup(userType) {
            console.log('Searching...')

            try {
                let response = await apiRequest.get(`/api/?results=10&gender=${this.cards[userType].name}`)
                console.log(this.cards[userType].title)
                if ([200, 201].includes(response.status)) {
                    let results = response.data.results

                    if (results.length === 0) {
                        alert(`Zero (0) results found for ${this.queryTerm}.`)
                        return
                    }

                    console.log('Result found.')
                    this.userList = results
                    this.section_name = this.cards[userType].title
                    return
                }
            } catch (e) {
                console.log(e)

                alert('Error fetching data. Please try again.')
            }
            return
        },

        something(qwert) {
            // console.log('Something active')
            this.window_type = 'UserDetails'
            this.section_name = 'User Details'
            // console.log(qwert)
            this.userInfo = qwert
        },

        changeWindow() {
            // alert('Hello')
            this.window_type = 'Users'
            // alert((this.window_type = 'Users'))
        }
    }
}
</script>



<style lang="scss" scoped>
$teal2: #75d6d1;

$teal3: #30bbb5;

$blackl: #262a41;

$gray7: #babdd1;

$gray9: #3c3f54;

*,
*::before,
*::after {
    margin: 0;

    padding: 0;

    box-sizing: border-box;
}

:root {
    --window-gap: 10px;
}

.welcome-user {
    font-weight: 200;

    font-size: 38px;

    // font-size: 49px;
}

.username {
    font-weight: 700;

    // font-size: 37px;
}

.welcome-msg {
    font-weight: 200;

    font-size: 12px;

    // margin: 10px 0 30px 0;
}

.search-user {
    position: relative;
}

.search-icon {
    position: absolute;

    top: 19px;

    left: 19px;
}

.search-input {
    padding-left: 50px;

    border-radius: 30px;

    font-size: 14px;
}

// .search-input:hover .search-icon,

// .search-input:focus .search-icon,

// .search-input:active .search-icon {

//     display: none;

// }

.search-input::placeholder {
    color: #ffffff;
}

.search-input::-moz-placeholder {
    color: #ffffff;
}

.title {
    font-weight: 300;

    font-size: 14px;
}

.card-option {
    z-index: 1;

    transition: all 0.5s;
}

.card-option:hover,
.card-option:focus {
    border: none;

    outline: none;

    transform: scale(1.1);
}

.card {
    width: 80px;

    height: 80px;
}

.card-title {
    font-size: 12px;

    font-weight: 400;
}

.window-title {
    font-size: 30px;

    font-weight: 700;
}

.filter-title {
    font-size: 12px;
}

.find-user {
    position: relative;

    display: inline-block;

    // margin-right: 10px;
}

.find-icon {
    position: absolute;

    top: 7px;

    left: 8px;

    color: $gray7;
}

.find-input {
    width: 260px;

    padding-left: 30px;

    border-radius: 15px;

    font-size: 14px;

    font-weight: 400;

    color: $blackl;
}

.find-input::placeholder {
    color: $gray9;
}

.find-input::-moz-placeholder {
    color: $gray9;
}

// cross-check

select.countries {
    -moz-appearance: none;

    -webkit-appearance: none;

    text-indent: 0.01px;

    text-overflow: '';
}

select.countries::-ms-expand {
    display: none;
}

.countries {
    width: 130px;

    padding-right: 20px;

    padding-left: 10px;

    border-radius: 15px;

    font-size: 14px;

    font-weight: 400;

    color: $blackl;
}

.countries:focus {
    border: none;

    outline: none;
}

.sort {
    position: relative;

    transform: translate(-22px, -2px);
}

// cross-check

input[type='checkbox'] {
    height: 0;

    width: 0;

    visibility: hidden;
}

label.switch {
    position: relative;

    width: 25px;

    height: 12.5px;

    display: inline-block;

    border-radius: 12.5px;

    background: grey;

    cursor: pointer;

    text-indent: -9999px;

    transform: translateY(6px);
}

label.switch::after {
    content: '';

    position: absolute;

    top: 0.56px;

    left: 0.56px;

    width: 11.25px;

    height: 11.25px;

    background: #fff;

    border-radius: 11.25px;

    transition: 0.3s;
}

input:checked + label.switch {
    background: $teal3;
}

input:checked + label.switch::after {
    left: calc(100% - 1.25px);

    transform: translateX(-100%);
}

label:active::after {
    width: 16.25px;
}

.show {
    font-size: 10px;

    font-weight: 500;

    // padding-bottom: 2px;
}

.result-window::-webkit-scrollbar {
    display: none;
}

.result-window {
    -ms-overflow-style: none;

    scrollbar-width: none;
}

.download-results {
    width: 180px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0px 3px 6px #00000029;
}

.download-results:hover,
.download-results:focus,
.download-results:active,
.navigate:hover {
    border: none;
    outline: none;
    opacity: 0.5;
    z-index: 1;
    transform: scale(1.1);
    cursor: default;
}

.download-results,
.navigate {
    transition: all 0.5s;
}

.navigate:hover,
.navigate:focus,
.navigate:active {
    border: none;
    outline: none;
    color: #ffffff;
    background-color: $blackl;
    z-index: 1;
    transform: scale(1.1);
}
</style>
