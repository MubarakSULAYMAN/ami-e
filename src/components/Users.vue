<template>
    <div>
        <div class="result-card flex flex-row w-full max-h-48 mt-4 bg-whiteb rounded-xl">
            <div class="w-32 flex justify-center items-center">
                <img
                    :src="user.picture.medium"
                    :alt="`${user.name.last} ${user.name.first}`"
                    class="user-image h-20 w-20 rounded-full"
                />
            </div>
            <div class="flex flex-col user-details py-3">
                <div class="user-name mt-1">
                    {{ user.name.last }}
                    {{ user.name.first }}
                    <!-- | replaceEmpty('name') -->
                </div>
                <div class="user-address mt-1">
                    {{ user.location.street.number }}
                    {{ user.location.street.name }}, {{ user.location.city }},
                    {{ user.location.state }}
                    <!-- | replaceEmpty('address') -->
                </div>
                <div class="user-country mt-1" v-if="show_country">
                    {{ user.location.country | replaceEmpty('country') }}
                </div>
                <div class="user-contact flex flex-row mt-1">
                    <font-awesome-icon :icon="['far', 'envelope']" class="contact-icon" />
                    <div class="user-email">{{ user.email | truncateEmail }}</div>
                    <font-awesome-icon :icon="['fas', 'phone-volume']" class="contact-icon phone-icon ml-3" />
                    <div class="user-phone">{{ user.phone | replaceEmpty('phone') }}</div>
                </div>
            </div>
            <div class="nav w-16 md:w-20 flex justify-center items-center">
                <button
                    class="full-details flex justify-center items-center w-8 h-8 rounded-lg bg-teal3"
                    @click="getUserDetails(user)"
                >
                    <font-awesome-icon :icon="['fas', 'arrow-right']" class="next-icon text-white" />
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
                return `No ${title} Provided.`
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

        truncateBio(value) {
            if (!value) {
                return 'No Bio Provided'
            }

            value = value.toString()

            if (value.length > 37) {
                value = value.slice(0, 34) + '...'
                return value
            } else return value
        }

        // formatNum(num) {
        //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // },
    },

    props: {
        user: {
            type: Object,
            required: true
        },
        show_country: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            window_type: 'UserDetails'
        }
    },

    methods: {
        getUserDetails(selected_user) {
            // console.log(selected_user)
            // this.window_type = 'UserDetails'
            // this.section_name = 'User Details'
            this.userInfo = selected_user
            this.$emit('userN', this.userInfo)
            // this.$emit('userN')
            // console.log('Hello')
        }
    }
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
