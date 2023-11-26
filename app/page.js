'use client';

import { useCompletion } from 'ai/react';
import { useState, useCallback } from 'react';

export default function Flowboard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const { complete } = useCompletion({
    api: '/api/completion'
  });

  const fixTypos = useCallback(
    async (c) => {
      const completion = await complete(c);
      console.log("Fixed text: ", completion)
      if (!completion) throw new Error('Failed to check typos');

      setOutput(completion);
    },
    [complete]
  );

  return (
    <div>
      <h1>Typo fixer</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => fixTypos(input)}>Fix</button>

      <div>
        <h2>Output:</h2>
        <p>{output}</p>
      </div>
    </div>
  );
}
