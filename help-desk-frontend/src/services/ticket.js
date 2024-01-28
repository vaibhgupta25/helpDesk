import axios from "axios"

export const create = async ({ title, description, category, token }) => {
    try {
        const { data } = await axios.post('/api/ticket/create',
            {
                title, description, categoryId: category
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return data

    }
    catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message)
            throw new Error(error.message)
        }
    }
}

export const fetchTicket = async ({ token }) => {
    try {
        const { data } = await axios.get('/api/ticket',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        return data

    }
    catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message)
            throw new Error(error.message)
        }
    }
}
