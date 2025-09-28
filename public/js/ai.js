// ai.js — Lintellect.ai AI integration frontend

async function requestAIReview(code, language) {
  try {
    const response = await fetch('/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, language })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Server error');
    }

    return await response.json();
  } catch (error) {
    console.error('[Lintellect.ai] AI Review Error:', error);
    return { error: error.message };
  }
}

// Expose to global so app.js can call
window.requestAIReview = requestAIReview;
