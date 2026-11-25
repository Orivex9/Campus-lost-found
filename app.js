// Browser interface. C handles adding and storing items in memory.
// localStorage keeps reports available after the page is refreshed.
let cReady = false;
let saved = [];
const $ = (id) => document.getElementById(id);

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
}
function syncToC() {
  if (!cReady) return;
  Module._clear_items();
  saved.forEach(x => {
    const args = [x.kind,x.name,x.place,x.contact,x.details].map(s => {
      const p = Module.stringToNewUTF8(s); return p;
    });
    Module._add_item(...args);
    args.forEach(p => Module._free(p));
  });
}
function loadSaved() {
  try { saved = JSON.parse(localStorage.getItem('campusLostFound') || '[]'); }
  catch { saved = []; }
  syncToC();
  render();
}
function persist() {
  localStorage.setItem('campusLostFound', JSON.stringify(saved));
  syncToC(); render();
}
function render() {
  const query = $('search').value.toLowerCase().trim();
  const filter = $('filter').value;
  const visible = saved.filter(x =>
    (filter === 'All' || x.kind === filter) &&
    [x.name,x.place,x.details].join(' ').toLowerCase().includes(query));
  $('totalCount').textContent = saved.length;
  $('lostCount').textContent = saved.filter(x=>x.kind==='Lost').length;
  $('foundCount').textContent = saved.filter(x=>x.kind==='Found').length;
  $('items').innerHTML = visible.map(x => `
    <article class="item">
      <span class="tag ${x.kind==='Found'?'found':''}">${escapeHTML(x.kind)}</span>
      <h3>${escapeHTML(x.name)}</h3>
      <p>📍 ${escapeHTML(x.place)}</p>
      ${x.details ? `<p>${escapeHTML(x.details)}</p>` : ''}
      <p class="contact">Contact: ${escapeHTML(x.contact)}</p>
    </article>`).join('');
  $('empty').style.display = visible.length ? 'none' : 'block';
}
$('itemForm').addEventListener('submit', e => {
  e.preventDefault();
  const entry = {
    kind:$('kind').value, name:$('itemName').value.trim(),
    place:$('place').value.trim(), contact:$('contact').value.trim(),
    details:$('details').value.trim()
  };
  if (!entry.name || !entry.place || !entry.contact) return;
  if (saved.length >= 100) { $('notice').textContent='The demo has reached its 100-report limit.'; return; }
  saved.unshift(entry);
  persist();
  e.target.reset();
  $('notice').textContent='Report published successfully!';
});
$('search').addEventListener('input', render);
$('filter').addEventListener('change', render);

// Emscripten calls this after the C/WebAssembly module is ready.
var Module = {
  onRuntimeInitialized() {
    cReady = true;
    loadSaved();
  }
};

// Load saved reports immediately for local browser preview.
loadSaved();
