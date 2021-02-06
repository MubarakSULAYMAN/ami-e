<template>
    <div>
        <div
            class="result-card flex flex-row w-full max-h-48 mt-4 py-2 bg-whiteb rounded-xl"
        >
            <div class="w-32 flex justify-center items-center">
                <img
                    :src="user.picture.medium"
                    :alt="`${user.name.last} ${user.name.first}`"
                    class="user-image h-20 w-20 rounded-full"
                />
            </div>
            <div class="flex flex-col user-details py-3">
                <div class="user-name mt-1">
                    {{ userFullName | replaceEmpty('name') }}
                </div>
                <div class="user-address mt-1">
                    {{ userAddress | truncateAddress }}
                </div>
                <div class="user-country mt-1" v-if="show_country">
                    {{ user.location.country | replaceEmpty('country') }}
                </div>
                <div class="user-contact flex flex-row mt-1">
                    <font-awesome-icon
                        :icon="['far', 'envelope']"
                        class="contact-icon"
                    />
                    <div class="user-email">
                        {{ user.email | truncateEmail }}
                    </div>
                    <font-awesome-icon
                        :icon="['fas', 'phone-volume']"
                        class="contact-icon phone-icon ml-3"
                    />
                    <div class="user-phone">
                        {{ formattedNum | replaceEmpty('num') }}
                    </div>
                </div>
            </div>
            <div class="nav w-16 md:w-20 flex justify-center items-center">
                <button
                    class="full-details flex justify-center items-center w-8 h-8 rounded-lg bg-teal3"
                    @click="getUserDetails(user)"
                >
                    <font-awesome-icon
                        :icon="['fas', 'arrow-right']"
                        class="next-icon text-white"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    filters: {
        replaceEmpty(value, title) {
            if (!value) {
                return `No ${title} provided.`
            } else return value
        },

        truncateName(value) {
            if (!value) {
                return 'No name provided.'
            }

            value = value.toString()

            if (value.length > 25) {
                value = value.slice(0, 23) + '...'
                return value
            } else return value
        },

        truncateAddress(value) {
            if (!value) {
                return 'No address provided.'
            }

            value = value.toString()

            if (value.length > 42) {
                value = value.slice(0, 40) + '...'
                return value
            } else return value
        },

        truncateEmail(value) {
            if (!value) {
                return 'No email provided.'
            }

            value = value.toString()

            if (value.length > 19) {
                value = value.slice(0, 21) + '...'
                return value
            } else return value
        },

        truncateBio(value) {
            if (!value) {
                return 'No bio provided.'
            }

            value = value.toString()

            if (value.length > 37) {
                value = value.slice(0, 34) + '...'
                return value
            } else return value
        },

        formatNum(num) {
            if (!num) {
                return 'No number provided.'
            }

            num = String(num)

            num.replace(/[- )(]/g, '')
            return num
            //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },

    props: {
        user: {
            type: Object,
            required: true,
        },
        show_country: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            // window_type: 'UserDetails',
        }
    },

    methods: {
        getUserDetails(selected_user) {
            this.userInfo = selected_user
            this.$emit('userN', this.userInfo)
        },
    },

    computed: {
        userFullName() {
            return `${this.user.name.first} ${this.user.name.last}`
        },

        userAddress() {
            let names = `${this.user.location.street.number} ${this.user.location.street.name}, ${this.user.location.city}, ${this.user.location.state}`
            return names
        },

        formattedNum() {
            let num = this.user.phone.toString()
            return num.replace(/[- )(]/g, '')
        },
    },
}
</script>

<style lang="scss" scoped>
$teal2: #75d6d1;
// $teal3: #30bbb5;
// $blackl: #262a41;
// $gray7: #babdd1;
// $gray9: #3c3f54;

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.result_card {
    cursor: default;
}

.user {
    &-image {
        object-fit: contain;
        border: 5px solid $teal2;
    }
    &-details {
        width: 19rem;
    }
    &-name {
        font-size: 16px;
        font-weight: 600;
    }
    &-address,
    &-country {
        // margin: 5px 0;
        font-size: 12px;
        font-weight: 400;
        font-style: italic;
    }
    &-contact {
        font-size: 12px;
        font-weight: 300;
    }
    &email {
    }
    &phone {
    }
}

.contact-icon {
    width: 20px;
    height: 15px;
}

.phone-icon {
    transform: rotate(-45deg);
}

.full-details {
    box-shadow: 2px 5px 10px #30bbb574;
    transition: 0.25s all;
}

.full-details:hover,
.full-details:hover .next-icon,
.full-details:focus .next-icon,
.full-details:focus {
    border: none;
    outline: none;
    color: $teal2;
    background-color: #ffffff;
    z-index: 1.1;
    cursor: default;
    transform: scale(1.1);
}
</style>
