const apiUrl = `${Cypress.env("apiUrl")}`

describe('Backend Test Spec', () => {

  it('should call ping', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/ping`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
  
  it('should call create transaction', () => {
    const account_uuid = `testname${Cypress._.random(0, 1e6)}`
    const transaction_uuid = `testname${Cypress._.random(0, 1e6)}`
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/accounts`,
      body: {
      	account_id: account_uuid,
      	balance: 0
      },
    })
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions`,
      body: {
      	transaction_id: transaction_uuid,
      	account_id: account_uuid,
      	amount: 4,
      	created_at: '2021-11-04T22:49:04.690Z'
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.equal({
      	transaction_id: transaction_uuid,
      	account_id: account_uuid,
      	amount: 4,
      	created_at: "2021-11-04T22:49:04.690Z"
      })
    })
  })
  
  it('should call show transaction', () => {
    const account_uuid = `testname${Cypress._.random(0, 1e6)}`
    const transaction_uuid = `testname${Cypress._.random(0, 1e6)}`
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/accounts`,
      body: {
      	account_id: account_uuid,
      	balance: 0
      },
    })
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions`,
      body: {
      	transaction_id: transaction_uuid,
      	account_id: account_uuid,
      	amount: 4,
      	created_at: '2021-11-04T22:49:04.690Z'
      },
    })
    
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/transactions/${transaction_uuid}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.equal({
      	transaction_id: transaction_uuid,
      	account_id: account_uuid,
      	amount: 4,
      	created_at: '2021-11-04T22:49:04.690Z'
      })
    })
  })
  
  it('should call index transaction', () => {
    const account_uuid = `testname${Cypress._.random(0, 1e6)}`
    const transaction_uuid_1 = `testname${Cypress._.random(0, 1e6)}`
    const transaction_uuid_2 = `testname${Cypress._.random(0, 1e6)}`
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/accounts`,
      body: {
      	account_id: account_uuid,
      	balance: 0
      },
    })
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions`,
      body: {
      	transaction_id: transaction_uuid_1,
      	account_id: account_uuid,
      	amount: 4,
      	created_at: '2021-11-04T22:49:04.690Z'
      },
    })
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions`,
      body: {
      	transaction_id: transaction_uuid_2,
      	account_id: account_uuid,
      	amount: 4,
      	created_at: '2021-11-04T22:49:04.690Z'
      },
    })
    
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/transactions`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.include.members([{
      	transaction_id: transaction_uuid_2,
      	account_id: account_uuid,
      	amount: 4,
      	created_at: '2021-11-04T22:49:04.690Z'
      }])
    })
  })
  
  it('should call get account', () => {
    const account_uuid = `testname${Cypress._.random(0, 1e6)}`
    const transaction_uuid_1 = `testname${Cypress._.random(0, 1e6)}`
    const transaction_uuid_2 = `testname${Cypress._.random(0, 1e6)}`
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/accounts`,
      body: {
      	account_id: account_uuid,
      	balance: 0
      },
    })
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions`,
      body: {
      	transaction_id: transaction_uuid_1,
      	account_id: account_uuid,
      	amount: 2,
      	created_at: '2021-11-04T22:49:04.690Z'
      },
    })
    
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions`,
      body: {
      	transaction_id: transaction_uuid_2,
      	account_id: account_uuid,
      	amount: 4,
      	created_at: '2021-11-04T22:49:04.690Z'
      },
    })
    
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/accounts/${account_uuid}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.equal({
      	account_id: account_uuid,
      	balance: 6
      })
    })
  })
})
