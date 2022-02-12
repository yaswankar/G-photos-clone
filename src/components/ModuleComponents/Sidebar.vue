<template>
  <div class="sidebar-div">
    <ul>
        <li class="row-item">
            <router-link to="/" active-class="selected" exact>
                    <span>
                        <i class="fas fa-image"></i>
                    </span>
                    <span>Photos</span>
            </router-link>
        </li>
        <li class="row-item">
            <router-link to="/explore" active-class="selected">
                <span>
                    <i class="fas fa-search"></i>
                </span>
                <span>Explore</span>
            </router-link>
        </li>
        <li class="row-item">
            <router-link to="/trash" active-class="selected">
                <span>
                    <i class="fas fa-trash"></i>
                </span>
                <span>Trash</span>
            </router-link>
        </li>
    </ul>
    <div class="storage-display">
        <i class="fas fa-cloud"></i>
        <div class="storage-info">
            <div>Storage</div>
            <div class="progress-bar">
                <div class="progress" :style="{width: `${computeProgress}%`}"></div>
            </div>
            <div class="status">{{computeProgress}} MB of 100MB used</div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    name: "Sidebar",
    data() {
        return {
            options: {
                photos: false,
                explore: false,
                bin: false
            }
        }
    },
    computed: {
        ...mapGetters(['getAllPhotos', 'getTrashed']),
        // Dynamically compute the used space 
        computeProgress() {
            let totalSpace = 0;
            if(Array.isArray(this.getAllPhotos)) {
                this.getAllPhotos.forEach(element => {
                    totalSpace+=element.size;
                });
            }
            if(Array.isArray(this.getTrashed)) {
                this.getTrashed.forEach(element => {
                    totalSpace+=element.size;
                });
            }
            totalSpace = parseFloat(totalSpace.toString()).toFixed(2)
            return totalSpace;
        },
    },
    created() {
        this.getPhotos();
        this.getTrashedPhotos();
    },
    methods: {
        ...mapActions(['getPhotos', 'getTrashedPhotos'])
    }
}
</script>

<style lang="scss" scoped>
.sidebar-div {
    height: 100% !important;
    display: flex;
    position: relative;
    flex-direction: column;
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0 30px 0 0;
        .row-item {
            height: 45px;
            display: flex;
            align-items: center;
            span:nth-child(2) {
                margin-left: 20px;
            }
            a {
                text-decoration: none;
                color: inherit;
                height: 45px;
                width: 100%;
                display: flex;
                align-items: center;
                padding-left: 20px;
                border-radius: 0 20px 20px 0;
                &:hover {
                    background-color: #eee;
                    cursor: pointer;
                }
            }
            .selected {
                background: #eee;
                color: #1A73E8;
                font-weight: 600;
            }
        }
    }
    .storage-display {
        position: absolute;
        bottom: 10%;
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: flex-start;
        color: #3C4043;
        box-sizing: border-box;
        padding: 0 20px;
        .storage-info {
            font-size: 14px;
            margin-left: 20px;
            .progress-bar {
                height: 5px;
                margin: 10px 0;
                background: #eee;
                .progress {
                    background: #4285f4;
                    height: 100%;
                }
            }
            .status {
                font-size: 12px;
            }
        }
    }
}
</style>