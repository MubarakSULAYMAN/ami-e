<template>
    <div class="result-card text-blackl">
        <div class="title">
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="mx-2 text-teal3" />
            <span class="uppercase">Results</span>
        </div>
        <div class="user-card flex flex-row w-full h-72 mt-4 rounded-xl">
            <div class="w-44 flex justify-center md:justify-start items-center md:items-start">
                <img src="../assets/images/github4O4.png" alt="" class="image h-40 w-40 rounded-full" />
            </div>
            <div class="details">
                <div class="basic mt-2 p-1">
                    <span class="name">Mrs. Shalom Chioma</span><span class="age ml-2">25</span>
                </div>
                <div class="address mt-2 p-1">9278 new road, kilcoole, waterford</div>
                <div class="email mt-2 px-3 py-1 rounded-2xl bg-gray4">
                    <font-awesome-icon :icon="['far', 'envelope']" class="mr-2" />
                    <span class="mail">brad.gibson@example.com</span>
                </div>
                <div class="date mt-2 px-3 py-1 rounded-2xl bg-pinkl">JOINED: 2002-05-21</div>
                <div class="mobile mt-2 p-1">
                    <font-awesome-icon :icon="['fas', 'phone-volume']" class="mobile-icon mr-2" />
                    <span class="number">011-962-7516</span>
                </div>
                <div class="office mt-2 p-1">
                    <font-awesome-icon :icon="['fas', 'mobile-alt']" class="mr-2" />
                    <span class="number">011-962-7516</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$teal2: #75d6d1;

.title {
    font-size: 14px;
    font-weight: 400;
}

.image {
    object-fit: contain;
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
    // margin-left: 20px;
    font-weight: 200;
}

.address {
    font-size: 14px;
}

.mobile-icon {
    transform: rotate(-45deg);
}

.email,
.date {
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
