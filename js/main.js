// "+" menu toggle
const addBtn = document.querySelector('button.text-xl');
const addMenu = document.getElementById('addMenu');

addBtn.addEventListener('click', e => {
    e.stopPropagation();
    addMenu.classList.toggle('hidden');
});

document.addEventListener('click', e => {
    if (!addBtn.contains(e.target) && !addMenu.contains(e.target)) {
        addMenu.classList.add('hidden');
    }
});

// Bottom navigation
const navBtns = document.querySelectorAll('.nav-btn');
const mainContainer = document.getElementById('mainContainer');

// Chats data
const chats = [
    { name: 'Malika', type: 'private', msg: 'Salom, qalaysan 😂', last: '12:45', initial: 'M', color: 'bg-blue-400' },
    { name: 'Sarvinoz', type: 'private', msg: 'Rasm yuborildi 📷', last: '11:20', initial: 'S', color: 'bg-green-500' },
    { name: 'Akam', type: 'groups', msg: '👍', last: 'вчера', initial: 'J', color: 'bg-purple-500' },
    { name: 'Channel 1', type: 'channels', msg: 'New video uploaded', last: '10:00', initial: 'C', color: 'bg-yellow-500' },
    { name: 'Bot', type: 'bots', msg: 'Reminder set', last: '09:30', initial: 'B', color: 'bg-gray-500' },
];

// Contacts data
// let contacts = ['Malika', 'Sarvinoz', 'Akam', 'Channel 1', 'Bot'];


// Render chats
function renderChats(filter = 'all') {
    mainContainer.innerHTML = '';
    chats.forEach(chat => {
        if(filter !== 'all' && chat.type !== filter) return;

        const div = document.createElement('div');
        div.className = 'flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer';
        div.innerHTML = `
            <div class="w-12 h-12 rounded-full ${chat.color} text-white flex items-center justify-center font-bold">${chat.initial}</div>
            <div class="flex-1">
                <div class="flex justify-between items-center">
                    <h3 class="font-semibold text-black text-lg">${chat.name}</h3>
                    <span class="text-md text-gray-400">${chat.last}</span>
                </div>
                <p class="text-md text-gray-500 truncate">${chat.msg}</p>
            </div>
        `;
        mainContainer.appendChild(div);
    });
}

// Render contacts
function renderContacts() {
    mainContainer.innerHTML = '';
    contacts.forEach(name => {
        const div = document.createElement('div');
        div.className = 'p-4 border-[white] rounded-xl bg-black space-x-4 cursor-pointer';
        div.textContent = name;
        mainContainer.appendChild(div);
    });
}

// Bottom nav
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('text-blue-500', 'font-semibold'));
        btn.classList.add('text-blue-500', 'font-semibold');

        switch(btn.dataset.tab) {
            case 'chats':
                renderChats('all');
                break;
            case 'contacts':
                renderContacts();
                break;
            default:
                mainContainer.innerHTML = `<p class="p-4">Содержимое ${btn.textContent} отсутствует</p>`;
        }
    });
});

// Category buttons (filter)
const categoryBtns = document.querySelectorAll('.filter-btn');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('bg-blue-700'));
        btn.classList.add('bg-blue-700');

        const filter = btn.dataset.type; // all, private, groups, channels, unread, bots
        renderChats(filter);
    });
});

// --- "+" menu buttons ---
const addContactBtn = addMenu.querySelector('button:nth-child(1)');
const addGroupBtn = addMenu.querySelector('button:nth-child(2)');
const addChannelBtn = addMenu.querySelector('button:nth-child(3)');

addContactBtn.addEventListener('click', () => {
    const activeTab = document.querySelector('.nav-btn.text-blue-500')?.dataset.tab;
    if(activeTab !== 'contacts'){
        alert("Создание контакта доступно только в разделе Контакты");
        return;
    }

    const name = prompt("Введите имя нового контакта:");
    if(name && name.trim()!==''){
        contacts.push(name.trim());
        renderContacts();
    }
    addMenu.classList.add('hidden');
});

addGroupBtn.addEventListener('click', () => {
    const name = prompt("Введите название новой группы:");
    if(name && name.trim()!==''){
        chats.push({
            name: name.trim(),
            type: 'groups',
            msg: '',
            last: 'Сейчас',
            initial: name.trim()[0].toUpperCase(),
            color: 'bg-purple-400'
        });
        renderChats('all');
    }
    addMenu.classList.add('hidden');
});

addChannelBtn.addEventListener('click', () => {
    const name = prompt("Введите название нового канала:");
    if(name && name.trim()!==''){
        chats.push({
            name: name.trim(),
            type: 'channels',
            msg: '',
            last: 'Сейчас',
            initial: name.trim()[0].toUpperCase(),
            color: 'bg-yellow-400'
        });
        renderChats('all');
    }
    addMenu.classList.add('hidden');
});

// Initial render
renderChats('all');









function renderContacts() {
    mainContainer.innerHTML = '';
    contacts.forEach((contact, index) => {
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center p-3 border-to border-black/50 mt-2 text-black font-bold rounded cursor-pointer';
        
        div.innerHTML = `
            <span>${contact.name}</span>
            <div class="flex gap-2 ml-auto">
                <button class="edit-btn px-4 py-1 border-2 border-blue-500 text-blue-500 rounded-lg font-bold">Редактировать</button>
                <button class="delete-btn px-2 py-1 border-2 border-red-500 text-red-500 rounded-lg font-bold">Удалить</button>
            </div>
        `;
        mainContainer.appendChild(div);

        // Edit
        div.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const newName = prompt('Редактировать имя контакта:', contact.name);
            if(newName && newName.trim() !== ''){
                contacts[index].name = newName.trim();
                renderContacts();
            }
        });

        // Delete
        div.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if(confirm(`Удалить контакт "${contact.name}"?`)){
                contacts.splice(index, 1);
                renderContacts();
            }
        });

        // Kontaktga bosganda alert yoki routing
        div.addEventListener('click', () => {
            alert(`Вы выбрали контакт: ${contact.name}`);
        });
    });
}




const password = 'sarvinoz_xx'; 
let userPassword = prompt('Parolni kiriting:');

if(userPassword !== password){
    alert('Noto‘g‘ri parol!');
    document.body.innerHTML = '<h2>Access Denied</h2>';
}



// JavaScript qismi

// Contacts array (har doim object format)
let contacts = [
  { name: 'Malika', phone: '+998901234567' },
  { name: 'Sarvinoz', phone: '+998901112233' },
  { name: 'Akam', phone: '+998902223344' },
];

const contactsContainer = document.getElementById('contactsContainer');
const searchInput = document.getElementById('searchInput');

// "+" menu toggle
addBtn.addEventListener('click', e => {
    e.stopPropagation();
    addMenu.classList.toggle('hidden');
});
document.addEventListener('click', e => {
    if (!addBtn.contains(e.target) && !addMenu.contains(e.target)) {
        addMenu.classList.add('hidden');
    }
});

// Render contacts
function renderContacts(list = contacts) {
  if(list.length === 0){
    contactsContainer.classList.add('hidden');
    return;
  } else {
    contactsContainer.classList.remove('hidden');
  }

  contactsContainer.innerHTML = '';
  list.forEach((contact, index) => {
    const div = document.createElement('div');
    div.className = 'flex justify-between items-center p-3 border rounded-lg bg-gray-900 text-white cursor-pointer hover:bg-gray-800 transition mt-2';
    div.innerHTML = `
      <div class="flex flex-col">
        <span class="font-semibold">${contact.name}</span>
        <span class="text-gray-400 text-sm">${contact.phone}</span>
      </div>
      <div class="flex gap-2">
        <button class="px-3 py-1 border-[3px] border-blue-500 rounded-lg text-white edit-btn cursor-pointer">Редактировать</button>
        <button class="px-3 py-1 border-[3px] border-red-500 rounded-lg text-white delete-btn cursor-pointer">Удалить</button>
      </div>
    `;
    contactsContainer.appendChild(div);

    // Bosilganda alert
    div.addEventListener('click', (e) => {
      if(e.target.classList.contains('edit-btn') || e.target.classList.contains('delete-btn')) return;
      alert(`Вы выбрали контакт: ${contact.name}`);
    });

    // Edit
    div.querySelector('.edit-btn').addEventListener('click', () => {
      const newName = prompt('Редактировать имя контакта:', contact.name);
      const newPhone = prompt('Редактировать телефон контакта:', contact.phone);
      if(newName && newPhone){
        contacts[index] = { name: newName.trim(), phone: newPhone.trim() };
        renderContacts(contacts);
      }
    });

    // Delete
    div.querySelector('.delete-btn').addEventListener('click', () => {
      if(confirm(`Удалить контакт "${contact.name}"?`)){
        contacts.splice(index, 1);
        renderContacts(contacts);
      }
    });
  });
}

// Search filtr
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(query) || c.phone.includes(query));
  renderContacts(filtered);
});

// "+" menu: Add Contact
addMenu.querySelector('button:nth-child(1)').addEventListener('click', () => {
  const name = prompt('Введите имя нового контакта:');
  const phone = prompt('Введите телефон нового контакта:');
  if(name && phone){
    contacts.push({ name: name.trim(), phone: phone.trim() });
    renderContacts(contacts);
  }
  addMenu.classList.add('hidden');
});

// Initial render
renderContacts();






function renderContacts(list = contacts) {
  // Agar search bo‘sh bo‘lsa, contactsContainer yashirilsin
  if(searchInput.value.trim() === ''){
    contactsContainer.classList.add('hidden');
    return;
  } else {
    contactsContainer.classList.remove('hidden');
  }

  contactsContainer.innerHTML = '';
  list.forEach((contact, index) => {
    const div = document.createElement('div');
    div.className = 'flex justify-between items-center p-3 border rounded-lg bg-gray-900 text-white cursor-pointer hover:bg-gray-800 transition mt-2';
    div.innerHTML = `
      <div class="flex flex-col">
        <span class="font-semibold">${contact.name}</span>
        <span class="text-gray-400 text-sm">${contact.phone}</span>
      </div>
      <div class="flex gap-2">
        <button class="px-3 py-1 border-[3px] border-blue-500 rounded-lg text-white edit-btn cursor-pointer">Редактировать</button>
        <button class="px-3 py-1 border-[3px] border-red-500 rounded-lg text-white delete-btn cursor-pointer">Удалить</button>
      </div>
    `;
    contactsContainer.appendChild(div);

    // Bosilganda alert yoki sahifaga o‘tish
    div.addEventListener('click', (e) => {
      if(e.target.classList.contains('edit-btn') || e.target.classList.contains('delete-btn')) return;
      // Bu yerga routing kodini qo‘yishingiz mumkin:
      alert(`Вы выбрали контакт: ${contact.name}`); 
    });

    // Edit
    div.querySelector('.edit-btn').addEventListener('click', (e) => {
      e.stopPropagation(); // tugmani bosganda div click ishlamasin
      const newName = prompt('Редактировать имя контакта:', contact.name);
      const newPhone = prompt('Редактировать телефон контакта:', contact.phone);
      if(newName && newPhone){
        contacts[index] = { name: newName.trim(), phone: newPhone.trim() };
        renderContacts(list);
      }
    });

    // Delete
    div.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if(confirm(`Удалить контакт "${contact.name}"?`)){
        contacts.splice(index, 1);
        renderContacts(list);
      }
    });
  });
}

// Search filtr
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(query) || c.phone.includes(query));
  renderContacts(filtered);
});

// "+" menu: Add Contact
addMenu.querySelector('button:nth-child(1)').addEventListener('click', () => {
  const name = prompt('Введите имя нового контакта:');
  const phone = prompt('Введите телефон нового контакта:');
  if(name && phone){
    contacts.push({ name: name.trim(), phone: phone.trim() });
    renderContacts(contacts);
  }
  addMenu.classList.add('hidden');
});

// Initial render
renderContacts();
