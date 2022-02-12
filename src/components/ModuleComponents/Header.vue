<template>
  <div class="header">
    <div class="logo">
        <span class="txt-one">G</span>
        <span class="txt-rem">Photos</span>
    </div>
    <div class="search-bar">
        <input type="text" placeholder="Search your Photos" v-model="searchText"/>
    </div>
    <div class="upload-btn">
        <button @click="openWindow">
            <span>
                <i class="fas fa-upload"></i>
            </span>
            <span>Upload</span>
        </button>
        <input type="file" id="uploadImage" ref="file" @change="readUrl" style="display: none;">
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Header",
    data() {
        return {
            searchText: ""
        };
    },
    computed: {
        ...mapGetters(['getTotalSpace']),
    },
    methods: {
        ...mapActions(['getPhotos', 'uploadThePhoto']),
        openWindow() {
            // To check if total space has exceeded cloud memory
            if(this.getTotalSpace >= 100) {
                window.alert("There is no space on cloud")
                return;
            }
            this.$refs.file.click();
        },
        // File reader handler
        async readUrl(event) {
            const imageObj = {
                favourite: false,
                trashed: false
            }
            if (event.target.files && event.target.files[0]) {
                // To check if the selected file is less than or equal 1mb
                if(event.target.files[0].size / 1000 > 1024) {
                   window.alert("Please select a file thats less than or equal to 2mb");
                   return;
                } else {
                    imageObj.size = event.target.files[0].size / (1024*1024);
                    let reader = new FileReader();
                    let self = this;
                    reader.onload = async function (e) {
                        imageObj.location = e.target.result;
                        try {
                            await self.uploadThePhoto(imageObj)
                        } catch (error) {
                            window.alert(error.message);
                        }
                        self.getPhotos();
                    }
                    reader.readAsDataURL(event.target.files[0]);
                }
            }
        },
    }
}
</script>

<style lang="scss">
.header {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    .logo {
        width: 95px;
        .txt-one {
            color: #2962ff; 
            font-weight: bold;
        }
        .txt-rem {
            color: #ea4335; 
            font-weight: bold; 
            margin-left: 5px;
        }
    }
    .search-bar {
        min-width: 350px;
        max-width: 720px;
        margin-left: 15%;
        background: #f1f3f4;
        border-radius: 8px;
        display: flex;
        flex: 0 1 50vw;
        height: 48px;
        position: relative;
        transition: background-color .27s linear,box-shadow 0ms linear .27s;
        input {
            width: 100%;
            background: inherit;
            border: none;
            padding: 0 10px;
            &:focus {
                outline-color: #eee;
                box-shadow: 0 1px 3px 0 #b8bcc0, 0 4px 8px 3px #bbc2c7;
            }
        }
    }
    .upload-btn {
        width: 100px;
        height: 35px;
        margin-left: 10%;
        button {
            width: 100%;
            border: none;
            height: 100%;
            background-color: white;
            border-radius: 5px;
            font-weight: 500;
            .fas {
                color: gray;
            }
            span:nth-child(2) {
                margin-left: 5px;
            }
            &:hover {
                background-color: #eee;
                cursor: pointer;
            }
        }
    }
}
</style>