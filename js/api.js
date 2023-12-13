const fetchApi = {
    get: (url, params = {}) => {
        let search = '?' + new URLSearchParams(params)
        return new Promise((resolve, reject) => {
            fetch(url+search, { method: 'GET' })
                .then(response => response.json())
                .then(resolve)
                .catch(reject)
        })
    },

    post: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            fetch(url, { 
                method: 'POST', 
                body: JSON.stringify(params),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(resolve)
                .catch(reject)
        })
    }
}