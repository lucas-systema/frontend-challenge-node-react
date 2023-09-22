import axios from 'axios'

export const getUsers = async () => {
    return await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick')
        .then(response => response.data)
        .catch(error => {
            // handle error
            console.log(error);
        })
};