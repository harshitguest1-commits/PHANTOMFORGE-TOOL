require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

/* =========================================
   STATIC FILES
========================================= */

app.use(express.static(
  path.join(__dirname,'public')
));
/* =========================================
   MAIN ROUTE
========================================= */

app.get('/', (req,res) => {

  res.sendFile(

    path.join(
      __dirname,
      'public',
      'index.html'
    )

  );

});

/* =========================================
   AI ENGINE
========================================= */

app.post('/generate-caption', async (req,res) => {

  try{

    const {
      prompt,
      mode
    } = req.body;

    if(!prompt){

      return res.json({

        success:false,

        error:'Prompt missing'

      });

    }

    /* =========================================
       DYNAMIC AI SYSTEM
    ========================================= */

    let systemPrompt = '';

    /* CAPTION MODE */

    if(mode === 'caption'){

      systemPrompt = `
You are PHANTOMFORGE AI.

Generate ultra cinematic captions.

STYLE:
- dark luxury
- futuristic
- emotional
- short powerful lines
- creator aesthetic
- modern social media energy

RULES:
- no emojis
- no explanations
- only return the final caption
`;

    }

    /* VIDEO IDEA MODE */

    else if(mode === 'video'){

      systemPrompt = `
You are PHANTOMFORGE AI.

Generate cinematic short-form video ideas.

STYLE:
- viral editing energy
- futuristic visuals
- emotional pacing
- creator-focused
- highly visual
- aesthetic scenes

RULES:
- concise output
- no emojis
- no explanations
- make it feel cinematic
`;

    }

    /* QUOTE MODE */

    else if(mode === 'quote'){

      systemPrompt = `
You are PHANTOMFORGE AI.

Generate emotional cinematic quotes.

STYLE:
- deep
- dark
- aesthetic
- motivational
- modern creator energy

RULES:
- short quotes
- no emojis
- no explanations
- powerful emotional tone
`;

    }

    /* FALLBACK */

    else{

      systemPrompt = `
You are PHANTOMFORGE AI.

Generate futuristic cinematic content.
`;

    }

    /* =========================================
       OPENROUTER REQUEST
    ========================================= */

    const response = await fetch(

      'https://openrouter.ai/api/v1/chat/completions',

      {

        method:'POST',
headers: {

  'Authorization':
  `Bearer ${process.env.OPENROUTER_API_KEY}`,

  'HTTP-Referer':
  'http://localhost:3000',

  'X-Title':
  'PHANTOMFORGE',

  'Content-Type':
  'application/json'

},
        body:JSON.stringify({
model:'openai/gpt-3.5-turbo',

          messages:[

            {
              role:'system',
              content:systemPrompt
            },

            {
              role:'user',
              content:prompt
            }

          ],

          temperature:0.9,

          max_tokens:140

        })

      }

    );

    const data =
    await response.json();

    console.log(data);

    const caption =

      data.choices?.[0]?.message?.content ||

      'No response generated.';

    res.json({

      success:true,

      caption

    });

  }

  catch(error){

    console.log(error);

    res.json({

      success:false,

      error:'Server error'

    });

  }

});

/* =========================================
   SERVER START
========================================= */

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `PHANTOMFORGE running on ${PORT}`
  );

});