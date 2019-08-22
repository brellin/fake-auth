import axios from 'axios'

export const axize = _ => {

    const token = localStorage.getItem('token') || ''

    return axios.create({
        headers: {
            "Content-Type": 'application/json',
            authorization: token
        }
    })
}
