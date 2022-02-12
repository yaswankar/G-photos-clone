import Vue from 'vue'
import Vuex from 'vuex'
import { getImages, getTrashedImages, updatePhoto, uploadPhoto, deletePhoto, getFavourites, getRecents } from '../services/photo-service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePhotos: [],
    trashedPhotos: []
  },
  getters: {
    getAllPhotos: state => state.activePhotos,
    getTrashed: state => state.trashedPhotos,
    getTotalSpace: state => {
      let totalSpace = 0;
      if(Array.isArray(state.activePhotos)) {
        state.activePhotos.forEach(element => {
            totalSpace+=element.size;
        });
      }
      if(Array.isArray(state.trashedPhotos)) {
          state.trashedPhotos.forEach(element => {
              totalSpace+=element.size;
          });
      }
      totalSpace = parseFloat(totalSpace.toString()).toFixed(2);
      return totalSpace;
    }
  },
  mutations: {
    updatePhotos(state, payload) {
      state[payload.type] = payload.data;
    },
    updatePhoto(state, payload) {
      let oldPhotos = [...state.activePhotos];
      let pos;
      for(let i=0 ; i<state.activePhotos.length; i++) {
        if(state.activePhotos[i]._id === payload.data._id) {
          pos = i;
          break;
        }
      }
      if(payload.method === 'update') oldPhotos[pos] = {...payload.data};
      else oldPhotos.splice(pos, 1);
      state.activePhotos = oldPhotos;
    }
  },
  actions: {
    async getPhotos({commit}) {
      let photos;
      try {
        photos = await getImages();
        if(photos) commit('updatePhotos', {data: photos.data, type: 'activePhotos'});
      } catch (error) {
        console.log(error);
      }
    },
    async uploadThePhoto({commit}, payload) {
      `${commit}`
      try {
        await uploadPhoto(payload);
      } catch (error) {
        console.log(error);
      }
    },
    async updateThePhoto({commit}, payload) {
      let photo;
      try {
        photo = await updatePhoto(payload.data);
        if(photo) commit('updatePhoto', {data: photo.data, type: 'activePhotos', method: payload.method});
      } catch (error) {
        console.log(error);
      }
    },
    async getTrashedPhotos({commit}) {
      let photos;
      try {
        photos = await getTrashedImages();
        if(photos) commit('updatePhotos', {data: photos.data, type: 'trashedPhotos'});
      } catch (error) {
        console.log(error);
      }
    },
    async deleteThePhoto({commit}, payload) {
      try {
        const updatedTrashList = await deletePhoto(payload);
        commit('updatePhotos', {data: updatedTrashList.data, type: 'trashedPhotos'})
      } catch (error) {
        console.log(error);
      }
    },
    async getFavouritePhotos({commit}) {
      `${commit}`
      try {
        const getFavourite = await getFavourites();
        return getFavourite.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getRecentPhotos({commit}) {
      `${commit}`
      try {
        const recentFiles = await getRecents();
        return recentFiles.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
