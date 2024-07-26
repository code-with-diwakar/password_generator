import { useCallback, useState, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const handleReset = () => {
    setLength(8);
    setNumber(false);
    setCharAllowed(false);
    passwordGenerator();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-500">
      <div className="w-full max-w-md mx-auto bg-slate-400 shadow-gray-900 rounded-lg p-6">
        <h1 className="text-4xl text-center mb-6 font-bold text-gray-800">Password Generator</h1>
        <div className="mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-lg border border-gray-300 rounded-lg"
            placeholder="password"
            readOnly
          />
        </div>
        <div className="mb-4 text-center">
          <button
            onClick={handleReset}
            className="text-2xl py-2 px-6 bg-indigo-600 text-white rounded-lg  transition duration-300"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-lg">Length: {length}</label>
            <input
              type="range"
              id="length"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="text-lg">Numbers</label>
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumber(prev => !prev)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="charInput" className="text-lg">Characters</label>
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
