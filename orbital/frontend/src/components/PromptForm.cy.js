import React from 'react'
import PromptForm from './PromptForm'

function splitTextBeforeSlash(text) {
  const parts = text.split('/');
  return parts[0]; // Return the first part before the '/'
}

function splitTextAfterSlash(text) {
  const parts = text.split('/');
  return parts[1]; // Return the first part before the '/'
}

// Unit Testing
describe('<PromptForm />', () => {
  it('renders', () => {
    cy.mount(<PromptForm />)
  })
})

describe("Start and End Location options can be selected", () => {
  it('can be selected', () => {
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-09")
    cy.findByRole('option', { name: "EA-02-09" }).click()
  })
})

describe("Submit Button cannot be clicked when neither source and destination are selected", () => {
  it('cannot be clicked', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PromptForm />)
    cy.findByRole('button', {  name: /submit/i}).should('be.disabled');
  })
})

describe("Submit Button cannot be clicked when either source or destination are empty", () => {
  it('cannot be clicked', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('button', {  name: /submit/i}).should('be.disabled');
  })
})

describe("User can view images after submitting", () => {
  it('is visible', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-09")
    cy.findByRole('option', { name: "EA-02-09" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})

  })
})


describe("User can see image count", () => {
  it('is visible', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-09")
    cy.findByRole('option', { name: "EA-02-09" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.findByTestId('ArrowRightIcon').click()
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);})
   


  })
})

describe("User can reach the final picture", () => {
  it('is visible', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-09")
    cy.findByRole('option', { name: "EA-02-09" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);
      for (let i = 0; i < total_img -1; i ++) {
        cy.findByTestId('ArrowRightIcon').click()
      }})
  })
})

describe("User can reach the final picture", () => {
  it('is visible', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-09")
    cy.findByRole('option', { name: "EA-02-09" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);
      for (let i = 0; i < total_img -1; i ++) {
        cy.findByTestId('ArrowRightIcon').click()
      }})
  })
}) 

describe("User can block picture", () => {
  it('is visible', () => {
    cy.viewport(1280, 720);
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-21")
    cy.findByRole('option', { name: "EA-02-21" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);
      for (let i = 0; i < 6; i ++) {
        cy.findByTestId('ArrowRightIcon').click()

      }
      cy.get('.block-logo').click()
      cy.findByRole('button', {
        name: /block this point\?/i
      }).click()
    })
  })
})

describe("User can get alternate path", () => {
  it('is visible', () => {
    cy.viewport(1280, 720);
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-21")
    cy.findByRole('option', { name: "EA-02-21" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);
      for (let i = 0; i < 6; i ++) {
        cy.findByTestId('ArrowRightIcon').click()
        cy.get('.block-logo').click()


        

      }
      cy.findByRole('button', {
        name: /block this point\?/i
      }).click()
      cy.findByRole('button', {
        name: /give me an alternate path/i
      }).click()})
  })
}) 

//Integration Testing

describe("User can use pathfinding functionality", () => {
  it('user can open view the images when they select a start location and end location and submit the form', () => {
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-09")
    cy.findByRole('option', { name: "EA-02-09" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);
      for (let i = 0; i < total_img -1; i ++) {
        cy.findByTestId('ArrowRightIcon').click()
      }})
  })
})

//Separated into component
/*describe("Users can pathfind and are notified upon destination arrival", () => {
  it('lets users see "You have arrived at" text', () => {
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-09")
    cy.findByRole('option', { name: "EA-02-09" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);
      for (let i = 0; i < total_img -1; i ++) {
        cy.findByTestId('ArrowRightIcon').click()
      }})
      cy.findByText(/you have arrived at EA-02-09/i)
  })
}) */

describe("User can get alternate path", () => {
  it('is visible', () => {
    cy.viewport(1280, 720);
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-21")
    cy.findByRole('option', { name: "EA-02-21" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);
      for (let i = 0; i < 6; i ++) {
        cy.findByTestId('ArrowRightIcon').click()
        cy.get('.block-logo').click()

      }
      cy.findByRole('button', {
        name: /block this point\?/i
      }).click()
      cy.findByRole('button', {
        name: /give me an alternate path/i
      }).click()})
  })
})

//Commented as final distance is hidden (Will fail unless distance of 0 is shown for final destination)

/*describe("User can get accurate distance readings", () => {
  it('works for two stops', () => {
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-09")
    cy.findByRole('option', { name: "EA-02-09" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);
      for (let i = 0; i < total_img -1; i ++) {
        cy.findByTestId('ArrowRightIcon').click()
      }})
      cy.findByText(/0m/i)
  })
})

describe("User can get accurate distance readings", () => {
  it('works for multistop stops', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PromptForm />)
    cy.findByRole('combobox', {  name: /start location/i}).type("EA-02-11")
    cy.findByRole('option', { name: "EA-02-11" }).click()
    cy.findByRole('combobox', {
      name: /end location/i
    }).type("EA-02-09")
    cy.findByRole('option', { name: "EA-02-09" }).click()
    cy.findByTestId('AddCircleOutlineIcon').click()
    cy.findByRole('combobox', {
      name: /enter a destination/i
    }).type("EA-02-08")
    cy.findByRole('option', { name: "EA-02-08" }).click()
    cy.findByRole('button', {  name: /submit/i}).click()
    cy.findByRole('img', {name: /cannot be displayed/i})
    cy.get('.imageCount')
    .invoke('text') 
    .then(text => {
      const img_no = splitTextBeforeSlash(text);
      const total_img = splitTextAfterSlash(text);
      cy.log(`Image No.: ${img_no}`);
      cy.log(`Total number of images: ${total_img}`);
      for (let i = 0; i < total_img -1; i ++) {
        cy.findByTestId('ArrowRightIcon').click()
      }})
      cy.findByText(/0m/i)
  })
}) */