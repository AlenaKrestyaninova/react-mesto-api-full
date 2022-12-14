export const BASE_URL = 'https://api.alenadomain.students.nomoredomains.club';

const request = ({
    url,
    method = 'POST',
    token,
    data,
}) => {
    return fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...!!token && { 'Authorization': `Bearer ${token}` }
        },
        ...!!data && { body: JSON.stringify(data) },
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(res.status);
        });
}

export const register = (email, password) => {
    return request({
        url: '/signup',
        data: {email, password},
    })
};

export const authorize = (email, password) => {
    return request({
        url: '/signin',
        data: {email, password},
    })
};

export const getContent = (token) => {
    return request({
        url: '/users/me',
        method: 'GET',
        token,
    });
};


// Запросы, переписанные без шаблона
// export const register = (email, password) => {
//     return fetch(`${BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         data: {email, password},
//         })
//         .then((res) => {
//             if (res.ok){
//                 return res.json();
//             }
//             return Promise.reject(res.status);
//         });
// };

// export const authorize = (email, password) => {
//     return fetch(`${BASE_URL}/signin`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         data: {email, password},
//         })
//         .then((res) => {
//             if (res.ok){
//                 return res.json();
//             }
//             return Promise.reject(res.status);
//         });
// };

// export const getContent = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         })
//         .then((res) => {
//             if (res.ok){
//                 return res.json();
//             }
//             return Promise.reject(res.status);
//         });
// };
