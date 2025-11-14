// Event List + Search Filter
// We keep it simple: an array of strings, render as list, filter by substring (case-insensitive)
(function(){
  const events = [
    'Orientation Day',
    'Tech Talk: Web Basics',
    'Sports Meet',
    'Cultural Night',
    'Project Showcase',
    'Hackathon 2025',
    'AI Workshop',
    'Music Fest',
    'Photography Walk',
    'Alumni Meetup'
  ];

  const searchInput = document.getElementById('search');
  const clearBtn = document.getElementById('clearBtn');
  const listEl = document.getElementById('eventList');
  const statsEl = document.getElementById('stats');
  const emptyMsg = document.getElementById('emptyMsg');

  function render(items){
    // Clear current list
    listEl.innerHTML = '';

    if(items.length === 0){
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
    }

    // Create list items
    items.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      listEl.appendChild(li);
    });

    statsEl.textContent = `Showing ${items.length} of ${events.length} events.`;
  }

  function currentFilter(){
    const q = searchInput.value.trim().toLowerCase();
    if(!q) return events.slice();
    return events.filter(e => e.toLowerCase().includes(q));
  }

  // Hook up events
  searchInput.addEventListener('input', function(){
    render(currentFilter());
  });

  clearBtn.addEventListener('click', function(){
    searchInput.value = '';
    searchInput.focus();
    render(events);
  });

  // Initial render
  render(events);
})();
