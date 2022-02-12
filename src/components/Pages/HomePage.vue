<template>
    <main-layout>
        <div slot="mainContent" class="main-content">
            <div class="action-buttons" v-show="checkSelected">
                <button title="Add as Favourite" @click="addAsFavourite">
                    <i class="fas fa-star"></i>
                </button>
                <button title="Download" @click="downloadImage">
                    <i class="fas fa-download"></i>
                </button>
                <button title="Info" @click="toggleModal">
                    <i class="fas fa-info-circle"></i>
                </button>
                <button title="Delete" @click="deleteImage">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="gallery">
                <div class="gallery-panel"
                    v-for="(photo, index) in images"
                    :key="photo._id">
                    <img :src="photo.location" @click="openPreview(index)">
                    <input class="selector" type="checkbox" v-model="photo.checked">
                </div>
            </div>
            <DescriptionModal v-show="openDescModal" @save-info="saveDescription" @close="toggleModal" />
            <light-box v-if="showPreview" :showCaption="true" :startAt="startIndex" :media="getMedia" @onClosed="showPreview=false"></light-box>
        </div>
    </main-layout>
</template>

<script>
import MainLayout from '../Layouts/MainLayout.vue';
import DescriptionModal from '../Modals/DescriptionModal.vue';
import LightBox from 'vue-image-lightbox'
import { mapGetters, mapActions} from 'vuex';

export default {
    name: "HomePage",
    data() {
        return {
            images: [],
            openDescModal: false,
            showPreview: false,
            startIndex: 0
        };
    },
    components: {
        MainLayout,
        DescriptionModal,
        LightBox
    },
    watch: {
        getAllPhotos: {
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
    computed: {
        ...mapGetters(['getAllPhotos']),
        // Check if only one item is selected
        checkSelected() {
            let count=0;
            for(let i=0; i<this.images.length; i++) {
                count = this.images[i].checked ? count+1 : count;
            }
            return count == 1;
        },
        // Computes the images list
        getMedia() {
            return this.getAllPhotos.map(item =>  {
                return {
                    thumb:  item.location,
                    src: item.location,
                    caption: item.description
                }
            })
        }
    },
    async mounted() {
        this.getPhotos();
    },
    methods: {
        ...mapActions(['getPhotos', 'updateThePhoto']),
        // helper function to get selected data item
        getImageData() {
            const dataObj = this.images.filter(item => item.checked)[0];
            delete dataObj.checked;
            return dataObj;
        },
        // Set the item as favourite
        async addAsFavourite() {
            const dataObj = this.getImageData();
            dataObj.favourite = !dataObj.favourite;
            await this.updateThePhoto({data: dataObj, method: 'update'});
        },
        toggleModal() {
            this.openDescModal = !this.openDescModal;
        },
        // Save Item description
        async saveDescription(desc) {
            const dataObj = this.getImageData();
            dataObj.description = desc;
            await this.updateThePhoto({data: dataObj, method: 'update'});
        },
        // Deleting an image - Moving to trash
        async deleteImage() {
            const dataObj = this.getImageData();
            dataObj.trashed = true;
            await this.updateThePhoto({data: dataObj, method: 'remove'});
        },
        openPreview(index) {
            this.startIndex = index;
            this.showPreview = true;
        },
        // Handler to download an image
        async downloadImage() {
            const src = this.getImageData().location;
            const a = document.createElement("a");
            a.href = src;
            a.download = "";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
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
}
</style>