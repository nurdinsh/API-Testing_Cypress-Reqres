describe('Users API Testing', () => {
  
  // Setup global configuration dan intercept API
  beforeEach(() => {
    cy.intercept('**/api/**')
    Cypress.config('baseUrl', 'https://reqres.in/api')
  })

  const makeRequest = (method, endpoint, body = {}, failOnStatusCode = true) => {
    return cy.request({ method, url: endpoint, body, failOnStatusCode });
  };

  //[GET] Menampilkan lis resources 
  it('List Resources', ()=>{
    makeRequest('GET', `/unknown`
    ).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body.data).to.be.an('array')
    })
  })
//[GET] Menampilkan r esources berdasarakan ID 
  it('Single Resource',() =>{
    makeRequest('GET',`/unknown/2`
    ).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body.data.id).to.equal(2)
    })
  })
//[GET] Gagal Menampilakan resource dengan ID yang tidak ada
  it('SIngle resource not found',()=>{
    makeRequest('GET',`/unknown/50`,{}, false
    ).then((response)=>{
      expect(response.status).to.equal(404)
    })
  })
})