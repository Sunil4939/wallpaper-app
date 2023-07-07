import axios from "axios";
 const myAxiosGetRequest = async (search) => {
    const apikey ="LMKnwla2DyvxcquxVC5YFUA3cu4VjNbe8a8ga9znzPjxz1HmyRO3pjCd";
    const res = await axios.get(`https://api.pexels.com/v1/search?page=1&per_page=25&query=${search}`,{
        headers:{
            Authorization: apikey,  
        }
    })
    return res;
}

const myAxiosPostRequest = async (data) => {
    const res = await axios({
        method:'post',
        url:"https://jsonplaceholder.typicode.com/posts",
        data:data
    })
    return res;
}

export {
    myAxiosGetRequest,
    myAxiosPostRequest,
}