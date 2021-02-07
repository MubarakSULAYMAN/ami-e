<template>
    <div class="result-card text-blackl">
        <div class="title" tabindex="99" @click="returnToUsers">
            <font-awesome-icon
                :icon="['fas', 'arrow-right']"
                class="back-arrow mx-2 text-teal3"
            />
            <span class="results uppercase">Results</span>
        </div>

        <div
            class="user-card flex flex-row flex-wrap md:flex-nowrap w-full h-full md:h-72 mt-4 rounded-xl"
        >
            <div class="w-44 mx-auto md:mx-0 flex justify-center items-center">
                <img
                    :src="userInfo.picture.large"
                    :alt="`${userInfo.name.last} ${userInfo.name.first}`"
                    class="image h-40 w-40 rounded-full"
                />
            </div>
            <div class="details w-full md:w-96 text-center md:text-left">
                <div class="basic mt-2 p-1">
                    <span class="name">
                        {{ userFullName | replaceEmpty('name') }}
                    </span>
                    <span class="age ml-2"
                        >{{ userInfo.dob.age | replaceEmptyAge }}
                    </span>
                </div>
                <div class="address mt-2 mx-auto md:mx-0 p-1">
                    {{ userAddress | replaceEmpty('address') }}
                </div>
                <div
                    class="email mt-2 mx-auto md:mx-0 px-3 py-1 rounded-2xl bg-gray4"
                >
                    <font-awesome-icon
                        :icon="['far', 'envelope']"
                        class="mr-2"
                    />
                    <span class="mail"
                        >{{ userInfo.email | replaceEmpty('email') }}
                    </span>
                </div>
                <div
                    class="date mt-2 mx-auto md:mx-0 px-3 py-1 rounded-2xl bg-pinkl"
                >
                    JOINED: {{ userInfo.registered.date | truncateDate }}
                </div>
                <div class="mobile mt-2 mx-auto md:mx-0 p-1">
                    <font-awesome-icon
                        :icon="['fas', 'phone-volume']"
                        class="mobile-icon mr-2"
                    />
                    <span class="number"
                        >{{ userInfo.phone | replaceEmpty('phone') }}
                    </span>
                </div>
                <div class="office mt-2 mx-auto md:mx-0 p-1">
                    <font-awesome-icon
                        :icon="['fas', 'mobile-alt']"
                        class="mr-2"
                    />
                    <span class="number"
                        >{{ userInfo.cell | replaceEmpty('number') }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    filters: {
        replaceEmpty(value, title) {
            if (!value) {
                return `No ${title} Provided.`
            } else return value
        },

        replaceEmptyAge(value) {
            if (!value) {
                return `##`
            } else return value
        },

        truncateEmail(value) {
            if (!value) {
                return 'No email Provided.'
            }

            value = value.toString()

            if (value.length > 19) {
                value = value.slice(0, 21) + '...'
                return value
            } else return value
        },

        truncateDate(value) {
            if (!value) {
                return 'Not Available.'
            }

            value = value.toString()

            if (value.length > 10) {
                value = value.slice(0, 10)
                return value
            } else return value
        },

        // formatNum(num) {
        //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // },
    },

    props: {
        userInfo: {
            type: Object,
            required: true,
        },
    },

    computed: {
        userFullName() {
            return `${this.userInfo.name.first} ${this.userInfo.name.last}`
        },

        userAddress() {
            let names = `${this.userInfo.location.street.number} ${this.userInfo.location.street.name}, ${this.userInfo.location.city}, ${this.userInfo.location.state}`
            return names
        },
    },

    methods: {
        returnToUsers() {
            this.$emit('new-window-type')
        },
    },
}
</script>

<style lang="scss" scoped>
$teal2: #75d6d1;

.result-card {
    cursor: default;
}

.title .back-arrow {
    transform: rotate(-180deg);
}

.title {
    width: fit-content;
    font-size: 14px;
    font-weight: 400;
}

.title:focus {
    border: none;
    outline: none;
}

.image {
    border: 5px solid $teal2;
}

.details {
    padding: 20px 10px;
    font-size: 12px;
    font-weight: 300;
    cursor: default;
}

.basic {
    font-size: 20px;
    font-weight: 700;
}

.age {
    font-weight: 200;
}

.address {
    font-size: 14px;
}

.mobile-icon {
    transform: rotate(-45deg);
}

.address,
.email,
.date,
.mobile,
.office {
    width: fit-content;
}

.date {
    font-weight: 500;
}

.name:hover,
.age:hover,
.address:hover,
.email:hover,
.date:hover,
.mobile:hover,
.office:hover {
    opacity: 0.5;
}
</style>
