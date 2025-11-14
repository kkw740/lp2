// Participant List from static JSON, with file:// fallback
(function(){
  const fallback = {
    events: [
      { id: 201, name: 'Orientation Day', date: '2025-11-20', participants: [
        { regNo: 'OD001', name: 'Aarav Patel', email: 'aarav@example.com', mobile: '9876543210' },
        { regNo: 'OD002', name: 'Sara Khan', email: 'sara.k@example.com', mobile: '9123456780' },
        { regNo: 'OD003', name: 'Rohit Sharma', email: 'rohit.s@example.com', mobile: '9988776655' }
      ]},
      { id: 202, name: 'Tech Talk: Web Basics', date: '2025-11-25', participants: [
        { regNo: 'TT101', name: 'Meera Joshi', email: 'meera@example.com', mobile: '9812345678' },
        { regNo: 'TT102', name: 'Vikram Rao', email: 'vikram.rao@example.com', mobile: '9871203456' },
        { regNo: 'TT103', name: 'Karan Singh', email: 'karan.s@example.com', mobile: '9765432109' }
      ]},
      { id: 203, name: 'Sports Meet', date: '2025-11-30', participants: [
        { regNo: 'SM201', name: 'Priya Nair', email: 'priya@example.com', mobile: '9876501234' },
        { regNo: 'SM202', name: 'Anil Kumar', email: 'anil.k@example.com', mobile: '9998887776' }
      ]}
    ]
  };

  const select = document.getElementById('eventSelect');
  const tbody = document.getElementById('tbody');
  const stats = document.getElementById('stats');
  const emptyMsg = document.getElementById('emptyMsg');
  const search = document.getElementById('search');
  const clearBtn = document.getElementById('clearBtn');

  let data = fallback;
  let current = [];

  async function loadData(){
    try{
      const res = await fetch('data/events.json', { cache: 'no-store' });
      if(!res.ok) throw new Error('HTTP ' + res.status);
      data = await res.json();
    }catch(err){
      console.warn('Using fallback data:', err.message);
      data = fallback;
    }
  }

  function populateSelect(){
    select.innerHTML = data.events.map(e => `<option value="${e.id}">${e.name} (${e.date})</option>`).join('');
  }

  function render(list){
    tbody.innerHTML = '';
    if(list.length === 0){
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
    }
    list.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.regNo}</td>
        <td>${p.name}</td>
        <td>${p.email}</td>
        <td>${p.mobile}</td>
      `;
      tbody.appendChild(tr);
    });
    const ev = data.events.find(e => String(e.id) === String(select.value));
    stats.textContent = `${ev ? ev.name : 'Event'} — Showing ${list.length} participant(s).`;
  }

  function applyFilter(){
    const q = search.value.trim().toLowerCase();
    if(!q){ render(current); return; }
    const filtered = current.filter(p => `${p.name} ${p.email} ${p.regNo} ${p.mobile}`.toLowerCase().includes(q));
    render(filtered);
  }

  function onEventChange(){
    const ev = data.events.find(e => String(e.id) === String(select.value));
    current = ev ? ev.participants.slice() : [];
    search.value = '';
    render(current);
  }

  clearBtn.addEventListener('click', () => { search.value=''; applyFilter(); });
  search.addEventListener('input', applyFilter);
  select.addEventListener('change', onEventChange);

  (async function init(){
    await loadData();
    populateSelect();
    if(select.options.length > 0){ select.selectedIndex = 0; }
    onEventChange();
  })();
})();
