<template>
    <div>
        <div v-for="x in 10" :key="x" class="result-card flex flex-row w-full h-28 mt-4 bg-whiteb rounded-xl">
            <!-- <div class="result-card flex flex-row w-full h-28 mt-4 bg-whiteb rounded-xl"> -->
            <div class="w-32 flex justify-center items-center">
                <img src="../assets/images/github4O4.png" alt="" class="user-image h-20 w-20 rounded-full" />
            </div>
            <div class="flex flex-col user-details py-3">
                <div class="user-name">Shalom Chioma</div>
                <div class="user-address">9278 new road, kilcoole, waterford</div>
                <div class="user-contact flex flex-row">
                    <font-awesome-icon :icon="['far', 'envelope']" class="contact-icon" />
                    <div class="user-email">brad.gibson@example.com</div>
                    <font-awesome-icon :icon="['fas', 'phone-volume']" class="contact-icon phone-icon ml-3" />
                    <div class="user-phone">011-962-7516</div>
                </div>
            </div>
            <div class="nav flex justify-center items-end pb-5 pl-5">
                <button class="full-details flex justify-center items-center w-8 h-8 rounded-lg bg-teal3">
                    <font-awesome-icon :icon="['fas', 'arrow-right']" class="next-icon text-white" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
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
    &-address {
        margin: 10px 0;
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
}
</style>
