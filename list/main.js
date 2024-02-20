let form = document.querySelector('.contact-form')
let editForm = document.querySelector('.edit-form')
let nameInput = document.querySelector('.name-input')
let relInput = document.querySelector('.rel-input')
let phoneInput = document.querySelector('.phone-input')
let editNameInput = document.querySelector('.edit-name-input')
let editRelInput = document.querySelector('.edit-rel-input')
let editPhoneInput = document.querySelector('.edit-phone-input')


let contactList = document.querySelector('.contact-list')
let delBtn = document.querySelector('.del-btn')


let contacts = JSON.parse(localStorage.getItem('contacts')) || [
  // {
  //   id: 1,
  //   name: "Abdulloh",
  //   relation: "O'quvchim",
  //   phone: "+998977007777"
  // },
]

let contact = {
  id: "",
  name: "",
  relation: "",
  phone: ""
}

let count = 0

let editId = ''

let deleteContact = (id) => {
  let index = contacts.findIndex(contact => contact.id == id)

  contacts.splice(index, 1)
  localStorage.setItem('contacts', JSON.stringify(contacts))
  showContacts()
}

let showContacts = ()=> {
  contactList.innerHTML = ''
  contacts.reverse().forEach(contact => {
    let liElement = document.createElement('li')
    liElement.setAttribute('class', 'contact-item bg-white p-3 mb-3 rounded-3')
    liElement.innerHTML = `
      <h3>${contact.name}</h3>
      <p>${contact.relation}</p>
      <p class="text-info">${contact.phone}</p>
      <button id=${contact.id} class="btn bg-danger text-white del-btn">Delete</button>
      <button id=${contact.id} class="btn bg-primary ms-3 px-3 text-white edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
    `
    contactList.appendChild(liElement)
  })

  let delButtons = document.querySelectorAll('.del-btn')
  let editButtons = document.querySelectorAll('.edit-btn')

  delButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      deleteContact(btn.id)
    })
  })

  editButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      let contact = contacts.find(contact => contact.id == btn.id)
      editNameInput.value = contact.name
      editRelInput.value = contact.relation
      editPhoneInput.value = contact.phone
      editId = contact.id
    })
  })
}

showContacts()


let handleInput = (e) => {
  contact = {...contact, [e.target.name] : e.target.value}
}

nameInput.addEventListener('keyup', handleInput)
relInput.addEventListener('keyup', handleInput)
phoneInput.addEventListener('change', handleInput)


form.addEventListener('submit', (e) => {
  e.preventDefault()

  contact.id = count++

  contacts.push(contact)

  localStorage.setItem('contacts', JSON.stringify(contacts))

  form.reset()

  showContacts()
})

editForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let contact = contacts.find(contact => contact.id == editId)

  contact.name = editNameInput.value
  contact.relation = editRelInput.value
  contact.phone = editPhoneInput.value

  localStorage.setItem('contacts', JSON.stringify(contacts))

  showContacts()
})