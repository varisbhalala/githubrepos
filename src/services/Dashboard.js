import axios from 'axios'

const baseURL = 'https://api.stackexchange.com/2.2/search/advanced'


export const fireApiService = async (page, pageSize, tag) => {

    try {
        const res = await axios.get(`${baseURL}?page=${page}&pagesize=${pageSize}&tagged=${tag}&site=stackoverflow`)
        return res
    } catch (e) {
        console.log('[Error] in fireApiService', e)
        return []
    }
}