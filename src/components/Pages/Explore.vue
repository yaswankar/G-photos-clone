<template>
    <main-layout>
        <div slot="mainContent" class="main-content">
            <div class="data-container">
                <img src="../../assets/sampleImages/clipart.png" alt="">
                <div class="activity">
                    <h2>Your Activity</h2>
                    <ul class="options">
                        <li @click="getFiles('favourite')">
                            <span>
                                <i class="fas fa-star"></i>
                            </span>
                            <span>Favourites</span>
                        </li>
                        <li @click="getFiles('recent')">
                            <span>
                                <i class="fas fa-clock"></i>
                            </span>
                            <span>Recently Added</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="images-section">
                <div class="gallery">
                    <div class="gallery-panel"
                        v-for="(photo, index) in images"
                        :key="photo._id">
                        <img :src="photo.location" @click="openPreview(index)">
                    </div>
                </div>
            </div>
            <light-box v-if="showPreview" :showCaption="true" :startAt="startIndex" :media="getMedia" @onClosed="showPreview=false"></light-box>
        </div>
    </main-layout>
</template>

<script>
import { mapActions } from 'vuex';
import MainLayout from '../Layouts/MainLayout.vue';
import LightBox from 'vue-image-lightbox'

export default {
    name: "HomePage",
    data() {
        return {
            images: [],
            showPreview: false,
            startIndex: 0
        };
    },
    components: {
        MainLayout,
        LightBox
    },
    computed: {
        // Dynamically compute preview dataset
        getMedia() {
            return this.images.map(item =>  {
                return {
                    thumb:  item.location,
                    src: item.location,
                    caption: item.description
                }
            })
        }
    },
    methods: {
        ...mapActions(['getFavouritePhotos', 'getRecentPhotos']),
        // Get Files based on the selected nav options ['Favourites', 'Recent']
        async getFiles(key) {
           this.images = key === 'favourite' ? await this.getFavouritePhotos() : await this.getRecentPhotos();   
        },
        // To open the photo previewer
        openPreview(index) {
            this.startIndex = index;
            this.showPreview = true;
        },
    }
}
</script>

<style lang="scss" scoped>
.main-content {
    position: relative;
    .data-container {
        position: fixed;
        width: 80%;
        display: flex;
        height: 300px;
        margin: 0px auto 0 auto;
        padding-top: 50px;
        justify-content: space-evenly;
        background-color: #ffffff;
        z-index: 1;
        img {
            max-width: 300px;
            height: 100%;
        }
        .activity {
            margin-left: 20%;
            h2 {
                padding: 0 10px;
            }
            ul {
                padding: 0;
                list-style: none;
                li {
                    line-height: 30px;
                    padding: 10px;
                    box-sizing: border-box;
                    font-weight: 600;
                    .fa-star {
                        color: rgb(236, 187, 51);
                    }
                    .fa-clock {
                        color: rgb(16, 139, 82);
                    }
                    span:nth-child(2) {
                        margin-left: 10px;
                    }
                    &:hover {
                        background-color: #eee;
                        color: #1A73E8;
                        font-weight: 600;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .images-section {
        position: absolute;
        width: 100%;
        top: 375px;
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
            grid-gap: 1rem;
            max-width: 100%;
            margin: 0 auto 25px auto;
            padding: 0 5rem;
          .gallery-panel {
            position: relative;
            border: 1px solid #eee;
            border-radius: 5px;
            img {
                width: 100%;
                height: 22vw;
                object-fit: contain;
                border-radius: 0.75rem;
            }
          }
        }
    }
    
}
</style>