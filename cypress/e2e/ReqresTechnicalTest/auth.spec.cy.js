describe('Users API Testing', () => {
  
  // Setup global configuration dan intercept API
  beforeEach(() => {
    cy.fixture('example').as('example'); 
    Cypress.config('baseUrl', 'https://reqres.in/api')
  })

  const makeRequest = (method, endpoint, body = {}, failOnStatusCode = true) => {
    return cy.request({ method, url: endpoint, body, failOnStatusCode });
  };

//[POST] Registrasi berhasil
  it('Register Successful', function(){
    makeRequest('POST',`/register`,this.example.validUser
    ).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).has.property('token')
    })
  })

//[POST] Gagal Registrasi karna email kosong
  it('Register whitout email',()=>{
    makeRequest('POST',`/register`,{
        "password": "pistol"
      },false
    ).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing email or username')
    })
  })

//[POST] Gagal Registrasi karna password kosong
  it('Register whitout password',()=>{
    makeRequest('POST',`/register`,{
        "email": "eve.holt@reqres.in"
      },false
    ).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing password')
    })
  })
  
//[POST] Gagal Registrasi karna email dan password kosong
   it('Register whitout email and password',()=>{
    makeRequest('POST',`/register`,{},false
    ).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing email or username')
    })
  })

//[POST] Gagal Registrasi karna format email salah
  it('Register with wrong email format', function(){
    makeRequest('POST',`/register`,this.example.invalidUser,false
    ).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Note: Only defined users succeed registration')
    })
  })

//[POST] Login berhasil
  it('Login Successful', function (){
    makeRequest('POST',`/login`,this.example.validUser
    ).then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).has.property('token')

    })
  })

  //[POST] Gagal Login karna format email salah
  it('Login with wrong email format', function (){
    makeRequest('POST',`/login`,this.example.invalidUser,false
    ).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('user not found')

    })
  })

//[POST] Gagal login karna password kosong 
  it('Login whitout password', ()=>{
    makeRequest('POST',`/login`,{
            "email": "peter@klaven"
      },false
    ).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing password')
    })
  })

//[POST] Gagal login karna email kosong 
  it('Login whitout email', ()=>{
    makeRequest('POST',`/login`,{
            "password": "diadiadian"
      },false
    ).then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('Missing email or username')
    })
  })
})