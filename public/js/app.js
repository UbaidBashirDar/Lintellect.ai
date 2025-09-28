// Optimized UI wiring for Lintellect.ai
const codeEl = document.getElementById('code');
const langEl = document.getElementById('language');
const reviewBtn = document.getElementById('reviewBtn');
const lintBtn = document.getElementById('lintBtn');
const reportEl = document.getElementById('report');
const suggestionsEl = document.getElementById('suggestions');
function setReport(html) {
reportEl.innerHTML = html;
}
function showSuggestions(html) {
suggestionsEl.classList.remove('hidden');
suggestionsEl.innerHTML = html;
}
function createList(items) {
return `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
}
lintBtn.addEventListener('click', () => {
const code = codeEl.value.trim();
if (!code) return alert('Paste some code first');
setReport('Running static checks...');
const issues = [];
if (code.includes('==') && !code.includes('===')) issues.push('Use === instead of == for strict equality (JS).');
if (code.length > 5000) issues.push('Large file detected. Consider splitting into modules.');
setReport(issues.length ? createList(issues) : 'No issues found.');
});
reviewBtn.addEventListener('click', async () => {
const code = codeEl.value.trim();
const language = langEl.value;
if (!code) return alert('Paste some code first');
setReport('Requesting AI review — please wait...');
try {
const resp = await fetch('/api/review', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ code, language })
});
const data = await resp.json();
if (!resp.ok) throw new Error(data?.error || 'Server error');
const { summary, issues, suggestions, patch } = data.report;
const issuesHtml = issues?.length ? `<ol>${issues.map(it =>
`<li><strong>${it.title}</strong>: ${it.detail}</li>`).join('')}</ol>` : 'No issues found.';
setReport(`<h3>Summary</h3><p>${summary}</p><h3>Issues</h3>${issuesHtml}
`);
if (suggestions?.length) {
showSuggestions('<h3>AI Suggestions</h3><ol>' + suggestions.map(s =>
`<li>${s}</li>`).join('') + '</ol>');
if (patch) {
const btn = document.createElement('button');
btn.textContent = 'Apply Suggested Patch';
btn.addEventListener('click', () => {
if (confirm('Replace editor content with suggested patch?'))
codeEl.value = patch;
});
suggestionsEl.appendChild(btn);
}
}
} catch (err) {
setReport('Error: ' + err.message);
}
});