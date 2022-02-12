<template>
    <main-layout>
        <div slot="mainContent" class="main-content">
            <div class="action-buttons" v-show="checkSelected">
                <button title="Remove Permanently">
                    <i class="fas fa-trash" @click="deleteImage"></i>
                </button>
            </div>
            <div class="gallery">
                <div class="gallery-panel"
                    v-for="(photo, index) in images"
                    :key="photo._id">
                    <img :src="photo.location" alt="Unable to load image" @click="openPreview(index)">
                    <input class="selector" type="checkbox" v-model="photo.checked">
                </div>
            </div>
        <light-box v-if="showPreview" :showCaption="true" :startAt="startIndex" :media="getMedia" @onClosed="showPreview=false"></light-box>
        </div>
    </main-layout>
</template>

<script>
import MainLayout from '../Layouts/MainLayout.vue';
import LightBox from 'vue-image-lightbox'
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Trash",
    components: {
        MainLayout,
        LightBox
    },
    data() {
        return {
            images: [],
            showPreview: false,
            startIndex: 0
        };
    },
    computed: {
        ...mapGetters(['getTrashed']),
        // Check if only one item is saved
        checkSelected() {
            let count=0;
            for(let i=0; i<this.images.length; i++) {
                count = this.images[i].checked ? count+1 : count;
            }
            return count == 1;
        },
        // Dynamically compute preview dataset
        getMedia() {
            return this.getTrashed.map(item =>  {
                return {
                    thumb:  item.location,
                    src: item.location,
                    caption: item.description
                }
            })
        }
    },
    watch: {
        // To check and get the updated trash list
        getTrashed: {
            handler(newVal)  {
                if(Array.isArray(newVal)) {
                    this.images = newVal.map(item => {
                       return {...item, checked: false}
                   });
                }
            },
            deep: true
        }
    },
    async mounted() {
        this.getTrashedPhotos();
    },
    methods: {
        ...mapActions(['getTrashedPhotos', 'deleteThePhoto']),
        // helper function to get the item
        getImageData() {
            const dataObj = this.images.filter(item => item.checked)[0];
            delete dataObj.checked;
            return dataObj;
        },
        // Handler for deleting image from trash
        async deleteImage() {
            const id = this.getImageData()._id;
            await this.deleteThePhoto(id);
        },
        // open image preview
        openPreview(index) {
            this.startIndex = index;
            this.showPreview = true;
        }
    },
}
</script>

<style lang="scss" scoped>
.main-content {
    .action-buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 20px;
        button {
            border: #4285f4;
            background: #4285f4;
            height: 30px;
            min-width: 40px;
            margin: 0 10px;
            color: #ffffff;
            padding: 0 10px;
            box-sizing: border-box;
            border-radius: 5px;
        }
    }
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        grid-gap: 1rem;
        max-width: 100%;
        margin: 25px auto;
        padding: 0 5rem;
      }
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
        .selector {
            position: absolute;
            left: 10px;
            top: 10px;
        }
      }
}
</style>