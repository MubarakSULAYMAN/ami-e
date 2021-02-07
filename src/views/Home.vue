<template>
    <div
        class="home grid gap-0 grid-cols-1 md:grid-cols-2 bg-blackl w-full md:w-screen h-full md:h-screen"
    >
        <div class="welcome text-white">
            <div class="container p-12 md:p-24 flex flex-col">
                <p class="welcome-user">
                    Hello, <span class="username">Emerald</span>
                </p>

                <p class="welcome-msg mt-2 md:mt-4 mb-4 md:mb-8">
                    Welcome to your dashboard, kindly sort through the user base
                </p>

                <div class="search-user">
                    <font-awesome-icon
                        :icon="['fas', 'search']"
                        class="search-icon"
                        @click="queryUser"
                    />

                    <input
                        id="search-user"
                        v-model="queryTerm"
                        type="text"
                        name=""
                        autocorrect="off"
                        autocomplete="off"
                        autofocus
                        spellcheck="false"
                        placeholder="Find a user"
                        class="search-input bg-gray9 w-full p-2 md:p-4 pr-3 md:pr-6 focus:outline-none"
                        @click.prevent
                        @keyup.enter="queryUser"
                    />
                </div>

                <div class="title capitalize mt-8 md:mt-16 mb-5 md:mb-10">
                    show users
                </div>

                <div class="flex flex-row">
                    <div
                        v-for="(card, index) in cards"
                        :key="index"
                        :tabindex="index"
                        class="card-option mr-4 md:mr-8"
                        @click="getUserGroup(index, '')"
                    >
                        <!-- @click="getUserGroup(card.name)" -->
                        <div
                            class="card flex justify-center items-center rounded-lg md:rounded-2xl"
                            :class="[card.name, card.color]"
                        >
                            <font-awesome-icon
                                :icon="['fas', card.icon]"
                                size="2x"
                            />
                        </div>

                        <div
                            class="card-title text-center capitalize mt-2 md:mt-4"
                        >
                            {{ card.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="h-screen md:h-full p-2 md:p-4 overflow-hidden"
        >
            <div
                class="bg-gray1 h-full rounded-lg md:rounded-2xl px-7 md:px-14 py-6 md:py-12"
            >
                <div class="h-full rounded-lg md:rounded-2xl font-blackl">
                    <div class="window-title capitalize">
                        {{ section_name }}
                    </div>

                    <div class="filter-title capitalize">Filter By</div>

                    <div class="filters capitalize">
                        <div class="find-user">
                            <font-awesome-icon
                                :icon="['fas', 'search']"
                                class="find-icon"
                            />

                            <input
                                id="search-list"
                                type="text"
                                name=""
                                placeholder="Find in list"
                                class="find-input bg-gray4 p-1 pr-4 focus:outline-none"
                            />
                        </div>

                        <span class="inline-block mt-2 md:mt-0">
                            <select
                                class="countries bg-gray4 p-1 mx-0 md:mx-2 capitalize"
                                v-model="country_name"
                            >
                                <option class="" disabled value="">
                                    Countries
                                </option>
                                <option
                                    class=""
                                    v-for="(country, index) in countries"
                                    :key="index"
                                    :value="country.alpha2code"
                                >
                                    {{ country.name }}
                                </option>
                            </select>

                            <font-awesome-icon
                                :icon="['fas', 'sort-down']"
                                class="sort"
                        /></span>

                        <span>
                            <input
                                id="switch"
                                type="checkbox"
                                @click="show_country = !show_country"
                            /><label for="switch" class="switch">Toggle</label>

                            <span class="ml-1 show text-black"
                                >Show Country</span
                            >
                        </span>
                    </div>

                    <div
                        class="result-window w-full h-4/5 md:h-3/4 justify-center items-center rounded-xl mt-3 md:mt-6 overflow-y-auto"
                    >
                        <div
                            class="w-full h-full flex justify-center items-center"
                            v-if="searchStatus === 'searching'"
                        >
                            <font-awesome-icon
                                :icon="['fas', 'sync-alt']"
                                spin
                                size="10x"
                                :style="{ color: '#30bbb5' }"
                            />
                        </div>

                        <template v-if="window_type === 'Users'">
                            <users
                                v-for="(user, index) in userList"
                                :key="index"
                                :user="user"
                                :show_country="show_country"
                                @userN="updateVals($event)"
                            />
                        </template>

                        <template v-if="window_type === 'UserDetails'">
                            <user-details
                                :userInfo="userInfo"
                                @new-window-type="changeWindow()"
                            />
                        </template>
                    </div>

                    <div class="window-options flex flex-row mt-2 md:mt-4">
                        <div
                            tabindex="7"
                            class="download-results bg-purplel text-white rounded-xl md:rounded-3xl px-2 md:px-4 py-1 md:py-2"
                        >
                            <font-awesome-icon
                                :icon="['fas', 'cloud-download-alt']"
                            />
                            Download results
                        </div>

                        <div class="pagination ml-auto py-1 flex flex-row">
                            <input
                                v-model="per_page"
                                type="number"
                                class="paginate w-7 p-1 rounded md:rounded-lg"
                                @keyup.enter="changePerPage(per_page)"
                            />
                            <span class="ml-1 py-1">per page</span>
                        </div>

                        <div
                            class="navigation flex flex-row items-center ml-auto text-blackl"
                        >
                            <button
                                class="navigate w-8 h-8 rounded-lg bg-gray4"
                                @click="previousPage"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'angle-left']"
                                />
                            </button>

                            <button
                                class="navigate right-arrow w-8 h-8 rounded-lg bg-gray4 ml-2"
                                @click="nextPage"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'angle-right']"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <transition name="fly">
            <div class="warning" v-if="isWarning">
                <p>{{ message }}</p>
            </div>
        </transition>
    </div>
</template>

<script>
// import axios from 'axios'
import apiRequest from '../utils/apiUtils'
import countries from '../utils/countriesUtils'
import Users from '@/components/Users'
import UserDetails from '@/components/UserDetails'

export default {
    name: 'Home',
    components: {
        Users,
        UserDetails,
    },

    data() {
        return {
            cards: [
                {
                    title: 'All Users',
                    name: 'group',
                    color: 'bg-pinkl',
                    icon: 'users',
                },
                {
                    title: 'Male Users',
                    name: 'male',
                    color: 'bg-teal3',
                    icon: 'male',
                },
                {
                    title: 'Female Users',
                    name: 'female',
                    color: 'bg-purplel',
                    icon: 'female',
                },
            ],

            queryTerm: '',
            gender: '',
            searchStatus: 'searching',
            isWarning: false,
            message: 'An error occured',
            section_name: 'No User Found',
            window_type: 'Users',
            userList: [],
            countries: countries,
            country_name: '',
            userInfo: null,
            show_country: false,
            page_number: 1,
            per_page: 10,
            size: 10,
        }
    },

    computed: {},

    created() {
        return this.getUserGroup(0, 'ami-e')
    },

    methods: {
        async queryUser() {
            // queryUser() {
            let seed = this.queryTerm
            let gender = this.gender
            let results = this.per_page
            let page = this.page_number

            await this.getUser(seed, gender, results, page)
        },

        async seeding(seed, gender, per_page, page) {
            try {
                let response = await apiRequest.get(
                    `/api/?seed=${seed}&gender=${gender}&results=${per_page}&page=${page}`,
                )

                if ([200, 201].includes(response.status)) {
                    let results = response.data.results
                    this.searchStatus = 'notSearching'

                    if (results.length === 0) {
                        this.showWarning(`Zero (0) results found for ${seed}.`)
                        return
                    }

                    this.window_type = 'Users'
                    this.userList = results
                    // return

                    this.$router
                        .push({
                            path: '/',
                            query: {
                                name: seed,
                                gender: gender,
                                per_page: per_page,
                                page: page,
                            },
                        })
                        .catch(() => {})
                }
            } catch (e) {
                // console.log(e)

                this.showWarning('Error fetching data. Please try again.')
            }
        },

        async getUser(seed, gender, per_page, page) {
            if (seed) {
                this.searchStatus = 'searching'

                await this.seeding(seed, gender, per_page, page)
                return
            }

            this.showWarning('Please enter a valid name to start a search.')
        },

        async getAllUsers(seed, gender, per_page, page) {
            this.searchStatus = 'searching'

            await this.seeding(seed, gender, per_page, page)
            return
        },

        async getUserGroup(userType, seed_value) {
            let seed = seed_value
            let gender = this.cards[userType].name
            let per_page = this.per_page
            let page = this.page_number
            this.section_name = this.cards[userType].title

            await this.getAllUsers(seed, gender, per_page, page)
        },

        updateVals(selectedUser) {
            this.window_type = 'UserDetails'
            this.section_name = 'User Details'
            this.userInfo = selectedUser
        },

        changeWindow() {
            this.window_type = 'Users'

            if (this.$route.query.gender === 'group') {
                this.section_name = 'All Users'
            }

            if (this.$route.query.gender === 'male') {
                this.section_name = 'Male Users'
            }

            if (this.$route.query.gender === 'female') {
                this.section_name = 'Female Users'
            }
        },

        showWarning(message) {
            this.message = message
            this.isWarning = true
            setTimeout(() => (this.isWarning = false), 5000)
        },

        async changePerPage(num) {
            let name = this.$route.query.name
            let gender = this.$route.query.gender
            this.$route.query.per_page = num
            let page_number = parseInt(this.$route.query.page)

            if (this.section_name !== 'User Details') {
                if (num >= 5 && num <= 25) {
                    if (name === '') {
                        await this.getAllUsers(name, gender, num, page_number)
                        return
                    }

                    await this.getUser(name, gender, num, page_number)
                    return
                }

                this.showWarning('Value can only be between 5 and 100')
                return
            }

            this.showWarning('Not available for User Details')
            return
        },

        async previousPage() {
            if (this.section_name !== 'User Details') {
                if (this.$route.query.page - 1 >= 1) {
                    let name = this.$route.query.name
                    let gender = this.$route.query.gender
                    let per_page = parseInt(this.$route.query.per_page)
                    let page_number = parseInt(this.$route.query.page) - 1

                    if (name === '') {
                        await this.getAllUsers(
                            name,
                            gender,
                            per_page,
                            page_number,
                        )
                        return
                    }

                    await this.getUser(name, gender, per_page, page_number)
                    return
                }

                this.showWarning('I cannot go beyond Page 1')
                return
            }

            this.showWarning('Not available for User Details')
            return
        },

        async nextPage() {
            if (this.section_name !== 'User Details') {
                // let total_results = 20
                // let per_page = parseInt(this.$route.query.per_page)

                // let total_pages = Math.round(total_results / per_page)
                // console.log(total_pages)

                if (this.$route.query.page + 1 <= 50) {
                    let name = this.$route.query.name
                    let gender = this.$route.query.gender
                    let per_page = parseInt(this.$route.query.per_page)
                    let page_number = parseInt(this.$route.query.page) + 1

                    if (name === '') {
                        await this.getAllUsers(
                            name,
                            gender,
                            per_page,
                            page_number,
                        )
                        return
                    }

                    await this.getUser(name, gender, per_page, page_number)
                    return
                }

                this.showWarning('I cannot go beyond Page 100')
                return
            }

            this.showWarning('Not available for User Details')
            return
        },
    },
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
    z-index: 1;
    transform: scale(1.1);
}

.navigate:hover,
.navigate:focus,
.navigate:active {
    border: none;
    outline: none;
    color: #ffffff;
    background-color: $blackl;
}

.pagination {
    font-size: 14px;
}

.pagination input::-webkit-outer-spin-button,
.pagination input::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    margin: 0;
}

.pagination input[type='number'] {
    -moz-appearance: textfield;
}

.slide-enter {
    transform: translateY(10px);
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}

.slide-leave-to {
    transform: translateY(-10px);
}

.warning {
    position: fixed;
    bottom: 34px;
    left: 66px;
    display: inline-block;
    padding: 5px 10px;
    border: 2px solid red;
    border-radius: 5px;
    font-size: 20px;
    color: red;
    box-shadow: 4px 4px red;
    background-color: transparent;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
    transition: all 0.5s;
    z-index: 1111;
}
.fly-enter,
.fly-leave-to {
    transform: scaleY(0);
    position: fixed;
    bottom: -999px;
    left: -999px;
}
.warning:hover {
    transform: translate(4px, 4px);
    box-shadow: none;
}
/* .warning .active {
    position: fixed;
    top: 999px;
    right: -999px;
  } */
.warning p {
    margin: 0;
}
.warning p .active {
    position: fixed;
    bottom: -999px;
    left: 999px;
}

// .sync {
//     position: relative;
//     top: 30%;
//     left: 40%;
//     transform: translate(-50%, -50%);
//     z-index: 2222;
// }

@media screen and (max-width: 468px) {
    .search-icon {
        top: 10px;
    }

    .find-input {
        width: 100%;
    }

    .search-icon {
    // position: absolute;
    // top: 19px;
    left: 15px;
}

    .search-input {
    padding-left: 40px;
    // border-radius: 30px;
    // font-size: 14px;
}

    .sort {
        transform: translate(-25px, -2px);
    }
}
</style>
