// UI-only Admin: fake login + dashboard edit/delete in the browser
(function(){
  const DEMO_USER = { username: 'admin', password: 'admin123' };

  function qs(id){ return document.getElementById(id); }
  function notice(el, type, text){
    if(!el) return;
    el.className = 'notice ' + type;
    el.textContent = text;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 2000);
  }
  function saveSession(){ localStorage.setItem('loggedIn', '1'); }
  function clearSession(){ localStorage.removeItem('loggedIn'); }
  function isLoggedIn(){ return localStorage.getItem('loggedIn') === '1'; }

  // LOGIN PAGE
  const loginForm = qs('loginForm');
  if(loginForm){
    const msg = qs('loginMsg');
    const fill = qs('fillDemo');
    fill && fill.addEventListener('click', () => {
      qs('username').value = DEMO_USER.username;
      qs('password').value = DEMO_USER.password;
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = (qs('username').value || '').trim();
      const p = qs('password').value || '';
      if(u === DEMO_USER.username && p === DEMO_USER.password){
        saveSession();
        window.location.href = 'dashboard.html';
      } else {
        msg.textContent = 'Invalid credentials. Try admin / admin123';
        msg.style.display = 'block';
      }
    });
  }

  // DASHBOARD PAGE
  const table = qs('eventsTable');
  if(table){
    // optional: simple guard
    if(!isLoggedIn()){
      // still allow for demo if needed; uncomment to enforce redirect
      // window.location.href = 'login.html';
    }

    const noticeBox = qs('notice');
    const kpiTotal = qs('kpiTotal');
    const kpiUpcoming = qs('kpiUpcoming');
    const logoutBtn = qs('logoutBtn');
    const addBtn = qs('addEventBtn');
    const search = qs('search');

    const events = [
      { id: 101, name: 'Orientation Day', date: '2025-11-20', location: 'Main Hall', status: 'upcoming' },
      { id: 102, name: 'Tech Talk: Web Basics', date: '2025-11-25', location: 'Lab 2', status: 'upcoming' },
      { id: 103, name: 'Sports Meet', date: '2025-11-30', location: 'Sports Ground', status: 'upcoming' },
      { id: 104, name: 'Cultural Night', date: '2025-12-05', location: 'Auditorium', status: 'upcoming' },
      { id: 105, name: 'Alumni Meetup', date: '2025-12-15', location: 'Conference Room', status: 'upcoming' }
    ];

    let filtered = events.slice();

    function refreshKPIs(){
      kpiTotal.textContent = String(filtered.length);
      // For demo, treat all as upcoming
      kpiUpcoming.textContent = String(filtered.length);
    }

    function cell(content){ return `<td>${content}</td>`; }

    function rowTemplate(e){
      return `<tr data-id="${e.id}">
        ${cell(e.id)}
        ${cell(`<span class="badge">${e.name}</span>`)}
        ${cell(e.date)}
        ${cell(e.location)}
        ${cell(`<button class=\"btn-ok\" data-action=\"edit\">Edit</button> <button class=\"btn-danger\" data-action=\"delete\">Delete</button>`)}
      </tr>`;
    }

    function render(){
      const tbody = table.querySelector('tbody');
      tbody.innerHTML = filtered.map(rowTemplate).join('');
      refreshKPIs();
    }

    function toInputs(tr){
      const id = tr.dataset.id;
      const [idTd, nameTd, dateTd, locTd, actTd] = tr.children;
      nameTd.innerHTML = `<input class="cell-edit" value="${nameTd.textContent.trim()}" />`;
      dateTd.innerHTML = `<input class="cell-edit" type="date" value="${dateTd.textContent.trim()}" />`;
      locTd.innerHTML = `<input class="cell-edit" value="${locTd.textContent.trim()}" />`;
      actTd.innerHTML = `<button class="btn-ok" data-action="save">Save</button> <button class="btn-ghost" data-action="cancel">Cancel</button>`;
      tr.dataset.editing = '1';
    }

    function fromInputs(tr){
      const [idTd, nameTd, dateTd, locTd, actTd] = tr.children;
      const name = nameTd.querySelector('input').value.trim() || 'Untitled';
      const date = dateTd.querySelector('input').value || dateTd.querySelector('input').value;
      const loc = locTd.querySelector('input').value.trim() || 'TBD';
      nameTd.innerHTML = `<span class="badge">${name}</span>`;
      dateTd.textContent = date;
      locTd.textContent = loc;
      actTd.innerHTML = `<button class="btn-ok" data-action="edit">Edit</button> <button class="btn-danger" data-action="delete">Delete</button>`;
      tr.dataset.editing = '0';
    }

    function deleteRow(tr){
      const id = parseInt(tr.dataset.id, 10);
      const idx = events.findIndex(e => e.id === id);
      if(idx !== -1){ events.splice(idx, 1); }
      // Update filtered as well
      const fidx = filtered.findIndex(e => e.id === id);
      if(fidx !== -1){ filtered.splice(fidx, 1); }
      tr.remove();
      refreshKPIs();
      notice(noticeBox, 'success', 'Event deleted (UI only).');
    }

    table.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if(!btn) return;
      const tr = e.target.closest('tr');
      const action = btn.getAttribute('data-action');
      if(action === 'edit'){
        toInputs(tr);
      } else if(action === 'save'){
        fromInputs(tr);
        notice(noticeBox, 'success', 'Event updated (UI only).');
      } else if(action === 'cancel'){
        // Rerender to reset row
        render();
      } else if(action === 'delete'){
        if(confirm('Delete this event? (UI only)')){
          deleteRow(tr);
        }
      }
    });

    addBtn && addBtn.addEventListener('click', () => {
      const newId = Math.max(...events.map(e=>e.id)) + 1;
      const newEvent = { id:newId, name:'New Event', date:'2025-12-20', location:'TBD', status:'upcoming' };
      events.unshift(newEvent);
      filtered = events.slice();
      render();
      notice(noticeBox, 'success', 'New event added (UI only).');
    });

    logoutBtn && logoutBtn.addEventListener('click', () => {
      clearSession();
      window.location.href = 'login.html';
    });

    search && search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      filtered = events.filter(e => `${e.name} ${e.location}`.toLowerCase().includes(q));
      render();
    });

    // initial render
    filtered = events.slice();
    render();
  }
})();
