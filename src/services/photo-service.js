import axios from 'axios';

// Get Active Images 
export const getImages = async() => {
    const resp = await axios.get('http://localHost:3000/images', {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }) 
    .then((response) => {
        return response;
    })
    .catch(error => {
        console.log(error);
    });
    return resp;
}

// Get Trash Images 
export const getTrashedImages = async() => {
    const resp = await axios.get('http://localHost:3000/images/trashed', {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }) 
    .then((response) => {
        return response;
    })
    .catch(error => {
        console.log(error);
    });
    return resp;
}

// Upload Images 
export const uploadPhoto = async (imageObj) => {
    const resp = await axios({
        method: 'post',
        url: 'http://localHost:3000/images',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        data: {
            description: imageObj.description ? imageObj.description : "",
            location: imageObj.location,
            createdAt: Date.now(),
            favourite: imageObj.favourite,
            trashed: imageObj.trashed,
            size: imageObj.size
        }
    }) .then((response) => {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });
    return resp;
}

// Upload Image
export const updatePhoto = async (imageObj) => {
    const resp = await axios({
        method: 'patch',
        url: `http://localHost:3000/images?id=${imageObj._id}`,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        data: {
            description: imageObj.description ? imageObj.description : "",
            location: imageObj.location,
            createdAt: Date.now(),
            favourite: imageObj.favourite,
            trashed: imageObj.trashed,
            size: imageObj.size
        }
    }) .then((response) => {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });
    return resp;
}

// Delete an image 
export const deletePhoto = async (id) => {
    const resp = await axios({
        method: 'delete',
        url: `http://localHost:3000/images/trashed?id=${id}`,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }) .then((response) => {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });
    return resp;
}

// To Fetch the favourite images
export const getFavourites = async () => {
    const resp = await axios.get('http://localHost:3000/images?desc=favourite', {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }) 
    .then((response) => {
        return response;
    })
    .catch(error => {
        console.log(error);
    });
    return resp;
}

// To fetch the recently added images ( 15mins ago)
export const getRecents = async () => {
    const resp = await axios.get('http://localHost:3000/images?desc=recent', {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }) 
    .then((response) => {
        return response;
    })
    .catch(error => {
        console.log(error);
    });
    return resp;
}