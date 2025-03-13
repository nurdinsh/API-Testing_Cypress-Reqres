const chai = require('chai');
const expect = chai.expect;

describe('Reqres API Testing', () => {
  const baseURL= 'https://reqres.in/api';


//[GET] Menampilakn List User
  it('List User', () => {
    cy.request({
      method: 'GET',
      url:`${baseURL}/users?page=2`
    }).then((response)=>{
      expect(response.status).to.equal(200)
    })
  })

//[GET] Menampilakn User berdasarkan ID
  it('Single User', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/users/2`
    }).then((response)=>{
      expect(response.status).to.equal(200)
    })
  })
  
//[GET] Gagal Menampilakan User dengan ID yang tidak ada
  it('Singgel User Not Found',()=>{
    cy.request({
      method: 'GET',
      url: `${baseURL}/users/50`,
      failOnStatusCode: false
    }).then((response)=>{
      expect(response.status).to.equal(404)
    })
  })

//[POST] Membuat User baru
  it('Create User', () => {
    cy.request({
      method: 'POST',
      url: `${baseURL}/users`,
      body: {
            "name": "Mohammad",
            "job": "Quality Assurance"
      }
    }).then((response)=>{
      expect(response.status).to.equal(201)
      expect(response.body).has.property('name','Mohammad')
    })
  })

//[POST] Membuat user baru tanpa isi Job
  it('Create user without job',()=>{
    cy.request({
      method:'POST',
      url:`${baseURL}/users`,
      body:{
            "name": "Mohammad Nurdiansyah"
      },
      failOnStatusCode: false
    }).then((response)=>{
      expect(response.status).to.equal(201)
    })
  })

//[PUT] Update User dengan method PUT
  it('Update User with PUT', () => {
    cy.request({
      method: 'PUT',
      url: `${baseURL}/users/2`,
      body: {
            "name": "Nurdiansyah",
            "job": "QA Engineer"
      }
    }).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).has.property('name','Nurdiansyah')
    })
  })

//[PUT] Update User dengan method PATCH
  it('Update user with PATCH',()=>{
    cy.request({
      method:'PATCH',
      url:`${baseURL}/users/2`,
      body:{
          "job" : "SDET"
      }
    }).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).has.property('job','SDET')
    })
  })

//[DELETE] Menghapus user berdarakan ID
  it('Delete User', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseURL}/users/2`,
    }).then((response)=>{
      expect(response.status).to.equal(204)
    })
  })

//[POST] Registrasi berhasil
  it('Register Successful',()=>{
    cy.request({
      method:'POST',
      url:`${baseURL}/register`,
      body:{
            "email": "eve.holt@reqres.in",
            "password": "pistol"
      }
    }).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).has.property('token')
    })
  })

//[POST] Gagal Registrasi karna email kosong
  it('Register whitout email',()=>{
    cy.request({
      method:'POST',
      url:`${baseURL}/register`,
      body:{
        "password": "pistol"
      },
      failOnStatusCode: false
    }).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing email or username')
    })
  })

//[POST] Gagal Registrasi karna password kosong
  it('Register whitout password',()=>{
    cy.request({
      method:'POST',
      url:`${baseURL}/register`,
      body:{
        "email": "eve.holt@reqres.in"
      },
      failOnStatusCode: false
    }).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing password')
    })
  })
  
//[POST] Gagal Registrasi karna email dan password kosong
   it('Register whitout email and password',()=>{
    cy.request({
      method:'POST',
      url:`${baseURL}/register`,
      body:{
      },
      failOnStatusCode: false
    }).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing email or username')
    })
  })

//[POST] Gagal Registrasi karna format email salah
  it('Register with wrong email format',()=>{
    cy.request({
      method:'POST',
      url:`${baseURL}/register`,
      body:{
            "email": "eve.holt$reqres.in",
            "password": "pistol"
      },
      failOnStatusCode: false
    }).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Note: Only defined users succeed registration')
    })
  })

//[POST] Login berhasil
  it('Login Successful', ()=>{
    cy.request({
      method:'POST',
      url: `${baseURL}/login`,
      body: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
      }
    }).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).has.property('token')

    })
  })

//[POST] Gagal Login karna format email salah
it('Login Successful', ()=>{
  cy.request({
    method:'POST',
    url: `${baseURL}/login`,
    body: {
          "email": "eve.holt$reqres.in",
          "password": "cityslicka"
    },
    failOnStatusCode: false
  }).then((response)=>{
    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('user not found')

  })
})

//[POST] Gagal login karna password kosong 
  it('Login whitout password', ()=>{
    cy.request({
      method: 'POST',
      url: `${baseURL}/login`,
      body: {
            "email": "peter@klaven"
      },
      failOnStatusCode: false

    }).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing password')
    })
  })

//[POST] Gagal login karna email kosong 
  it('Login whitout email', ()=>{
    cy.request({
      method: 'POST',
      url: `${baseURL}/login`,
      body: {
            "password": "diadiadian"
      },
      failOnStatusCode: false

    }).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing email or username')
    })
  })

//[GET] Menampilkan lis resources 
  it('List Resources', ()=>{
    cy.request({
      method: 'GET',
      url: `${baseURL}/unknown`
    }).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body.data).to.be.an('array')
    })
  })

//[GET] Menampilkan resources berdasarakan ID 
  it('Single Resource',() =>{
    cy.request({
      method:'GET',
      url: `${baseURL}/unknown/2`
    }).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body.data.id).to.equal(2)
    })
  })

//[GET] Gagal Menampilakan resource dengan ID yang tidak ada
  it('SIngle resource not found',()=>{
    cy.request({
      method: 'GET',
      url:`${baseURL}/unknown/50`,
      failOnStatusCode: false
    }).then((response)=>{
      expect(response.status).to.equal(404)
    })
  })

//[GET] Menampilkan delay respon
  it('Delayed Response',()=>{
    cy.request({
      method:'GET',
      url:`${baseURL}/users?delay=3`
    }).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body.data).to.be.an('array')
    })
  })

//[GET] Menampilkan page 1 lis user
  it('Total Pages',()=>{
    cy.request({
      method:'GET',
      url:`${baseURL}/users?page=1`
    }).then((response)=>{
      expect(response.body.total_pages).to.exist
    })
  })

//[GET] mengecek header yang dikirim
  it('Check Headers',()=>{
    cy.request({
      url:`${baseURL}/users/2`
    }).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.headers).to.has.property('content-type')
    })
  })
  
 //[GET] Mengecek respon waktu 
  it('Check response time',()=>{
    cy.request({
      method:'GET',
      url: `${baseURL}/users`
    }).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.duration).to.be.lessThan(2000)
    })
  })
})