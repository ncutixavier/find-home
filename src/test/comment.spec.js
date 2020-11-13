// import chaiHttp from 'chai-http'
// import chai from 'chai'
// import server from '../app'
// // import mocks from './mocks/mocks'
// import assert from 'assert'

// chai.use(chaiHttp)
// const commentId = 1

// describe('Get all comments suite', () => {
//     it(' should return all comments', () => {
//         return chai.request(server)
//             .get('/api/v1/comments')
//             .then(res => {
//                 assert.strictEqual(res.status, 200, 'Unexpected status code was returned')
//                 assert(typeof (res.body) == 'object', 'Data returned is not in object format.')
//             })

//     })

//     it(' should return comment by id', () => {
//         return chai.request(server)
//             .get('/api/v1/comments/' + commentId)
//             .then(res => {
//                 assert.strictEqual(res.status, 200, 'Unexpected status code')
//                 assert(typeof (res.body) == 'object', 'Data returned is not in object format.')
//             })
//     })
// })
