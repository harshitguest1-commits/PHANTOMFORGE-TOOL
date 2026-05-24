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
   AI ROUTE
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

    let systemPrompt = '';

    if(mode === 'caption'){

      systemPrompt = `
Generate ultra cinematic captions.
Dark luxury creator aesthetic.
Short and powerful.
`;

    }

    else if(mode === 'video'){

      systemPrompt = `
Generate cinematic short-form video ideas.
Highly visual and futuristic.
`;

    }

    else if(mode === 'quote'){

      systemPrompt = `
Generate emotional cinematic quotes.
Deep creator energy.
`;

    }

    else{

      systemPrompt = `
Generate futuristic cinematic content.
`;

    }

    const response = await fetch(

      'https://openrouter.ai/api/v1/chat/completions',

      {

        method:'POST',

        headers:{

          'Authorization':
          `Bearer ${process.env.OPENROUTER_API_KEY}`,

          'HTTP-Referer':
          'https://phantomforge.onrender.com',

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

          max_tokens:120

        })

      }

    );

    const data =
    await response.json();

    console.log(data);

    const caption =

      data.choices?.[0]?.message?.content ||

      'No response generated';

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