// Lintellect.ai — Express server handling code review requests
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { runReview } from './reviewEngine.js';


dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors());
app.use(express.json({limit:'1mb'}));
app.use(express.static(path.join(__dirname,'..','public')));


app.post('/api/review', async (req, res) => {
try {
const { code, language } = req.body;
if (!code) return res.status(400).json({error:'Missing code'});


const report = await runReview({ code, language });
res.json({ ok:true, report });
} catch (err) {
console.error('[Lintellect.ai] Error:', err);
res.status(500).json({ error:err.message||String(err) });
}
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Lintellect.ai server running on http://localhost:${PORT}`));