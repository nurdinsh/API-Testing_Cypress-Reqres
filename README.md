# API Testing Reqres | Cypress
Technical API testing using Cypress with the Reqres service

## Informasi Dasar
API testing menggunakan Reqres adalah pengujian API dengan Cypress yang berfokus pada pembuatan sampel pengujian API yang modular dan memiliki desain yang baik.


---

# Panduan Penggunaan Aplikasi

## Requirement yang harus disipkan sebelum menjalankan aplikasi:
- Menggunakan bahasa `JavaScript`
- Framework `Cypress`
- Code editor `Visual Studio Code`
- Testing dilakukan pada Website [`Reqres`](https://reqres.in/)


## Ringkasan Hasil Testing
Pengujian dilakukan pada `24 Test Case` dengan hasil:
```
24 Passed
0 Failed
0 Not Executed
```
Sehingga hasil pengujian adalah `100% Passed`

## Base URL di beforeEach
Mengonfigurasi `baseUrl` secara global untuk setiap file pengujian (`auth.spec.cy.js`, `resources.spec.cy.js`, dan `users.spec.cy.js`).
```
  beforeEach(() => {
    cy.fixture('example').as('example'); 
    Cypress.config('baseUrl', 'https://reqres.in/api')
  })
```

## Fungsi Helper untuk Request
Membuat fungsi reusable untuk menangani request agar pemanggilan API menjadi lebih sederhana dan terstruktur
```
const makeRequest = (method, endpoint, body = {}, failOnStatusCode = true) => {
  return cy.request({ method, url: endpoint, body, failOnStatusCode })
}
```
## Data Dinamis & Fixture
Dalam pengujian ini, data pengguna valid dan tidak valid disimpan di file `cypress/fixtures/example.json` sebagai berikut:
```
{

  "validUser": { "email": "eve.holt@reqres.in", "password": "pistol" },
  "invalidUser": { "email": "eve.holt$reqres.in", "password": "pistol" }

}

```


[LinkedIn](https://www.linkedin.com/in/mohammad-nurdiansyah-099b31151/) | [GitHub](https://github.com/nurdinsh)
