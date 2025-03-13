describe('Users API Testing', () => {
  
  // Setup global configuration dan intercept API
  beforeEach(() => {
    cy.intercept('**/api/**')
    Cypress.config('baseUrl', 'https://reqres.in/api')
  })

  const makeRequest = (method, endpoint, body = {}, failOnStatusCode = true) => {
    return cy.request({ method, url: endpoint, body, failOnStatusCode });
  };

//[GET] Menampilakn List User
  it('List User', () => {
    makeRequest('GET',`/users?page=2`
    ).then((response)=>{
      expect(response.status).to.equal(200)
    })
  })

//[GET] Menampilakn User berdasarkan ID
  it('Single User', () => {
    makeRequest('GET',`/users/2`
    ).then((response)=>{
      expect(response.status).to.equal(200)
    })
  })
  
//[GET] Gagal Menampilakan User dengan ID yang tidak ada
  it('Singgel User Not Found',()=>{
    makeRequest('GET',`/users/50`,{},false
    ).then((response)=>{
      expect(response.status).to.equal(404)
    })
  })

//[POST] Membuat User baru
  it('Create User', () => {
    makeRequest('POST',`/users`,
      {
            "name": "Mohammad",
            "job": "Quality Assurance"
      }
    ).then((response)=>{
      expect(response.status).to.equal(201)
      expect(response.body).has.property('name','Mohammad')
    })
  })

//[POST] Membuat user baru tanpa isi Job
  it('Create user without job',()=>{
    makeRequest('POST',`/users`,
      {
            "name": "Mohammad Nurdiansyah"
      },false
    ).then((response)=>{
      expect(response.status).to.equal(201)
    })
  })

//[PUT] Update User dengan method PUT
  it('Update User with PUT', () => {
    makeRequest('PUT',`/users/2`,
      {
            "name": "Nurdiansyah",
            "job": "QA Engineer"
      }
    ).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).has.property('name','Nurdiansyah')
    })
  })

//[PUT] Update User dengan method PATCH
  it('Update user with PATCH',()=>{
    makeRequest('PATCH',`/users/2`,
      {
          "job" : "SDET"
      }
    ).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).has.property('job','SDET')
    })
  })

//[DELETE] Menghapus user berdarakan ID
  it('Delete User', () => {
    makeRequest('DELETE',`/users/2`
    ).then((response)=>{
      expect(response.status).to.equal(204)
    })
  })

//[GET] Menampilkan delay respon
  it('Delayed Response',()=>{
    makeRequest('GET',`/users?delay=3`
    ).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body.data).to.be.an('array')
    })
  })

//[GET] Menampilkan page 1 lis user
  it('Total Pages',()=>{
    makeRequest('GET',`/users?page=1`
    ).then((response)=>{
      expect(response.body.total_pages).to.exist
    })
  })

//[GET] mengecek header yang dikirim
  it('Check Headers',()=>{
    makeRequest('GET',`/users/2`
    ).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.headers).to.has.property('content-type')
    })
  })

 //[GET] Mengecek respon waktu 
  it('Check response time',()=>{
    makeRequest('GET',`/users`
    ).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.duration).to.be.lessThan(2000)
    })
  })
})