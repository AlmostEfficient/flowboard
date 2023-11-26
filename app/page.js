'use client';

import { useCompletion } from 'ai/react';
import { useState, useCallback } from 'react';

export default function Flowboard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const { complete } = useCompletion({
    api: '/api/completion',
    stream: true, // Enable streaming
  });

  const fixTypos = useCallback(async (content) => {
      
      if (!content || content.trim() === '') throw new Error('No input text');

      const completion = await complete(content);
      console.log("Fixed text: ", completion)
      if (!completion) throw new Error('Failed to check typos');

      setOutput(completion);
    },
    [complete]
  );

  const handleSpacebarPress = (e) => {
    if (e.key === ' ' || e.keyCode === 32) { // Check if the spacebar was pressed
      console.log('Spacebar pressed!');
      fixTypos(input);
    }
  };

  return (
  <>
    <header>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.93em' font-size='90'>⏩</text></svg>"
        />
      </header>

    <div>
      <h1>Typo fixer</h1>
      <p>Type and fixed text will be displayed below</p>
      <textarea 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={handleSpacebarPress}
      />

      <div>
        <h2>Output:</h2>
        <p>{output}</p>
      </div>
    </div>
  </>
  );
}
