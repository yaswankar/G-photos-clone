<template>
    <div id="myModal" class="modal" @click="closeOnClickOutside">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h1>Enter Image Description</h1>
            <input class="descInput" type="text" v-model="description">
            <button class="saveBtn" @click="saving">Save</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DescriptionModal',
    data() {
        return {
            description: ""
        };
    },
    methods: {
        // close modal function
        closeModal() {
            this.$emit('close');
        },
        // Detecting and closing modal on outside click
        closeOnClickOutside(evt) {
            if(evt.target.className === 'modal') {
                this.closeModal();
            }
        },
        // Saving functionality
        saving() {
            this.$emit('save-info', this.description);
            this.closeModal();
        }
    }
}
</script>

<style lang="scss" scoped>
/* The Modal (background) */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: calc(25% - 100px) auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 500px;
  height: 200px;
  .descInput {
    width: 100%;
    height: 40px;
    border: 2px solid gray;
    border-radius: 5px;
    padding-left: 10px;
    color: #4d4d4d;
    box-sizing: border-box;
    &:focus {
        outline-color: cornflowerblue;
    }
  }
  .saveBtn {
      height: 35px;
      margin: 25px calc(50% - 33px);
      width: 66px;
      background: #4285F4;
      color: #ffffff;
      border: none;
      font-weight: 600;
      border-radius: 5px;
  }
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>