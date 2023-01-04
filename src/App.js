import React, { useState, useEffect } from 'react';
import './index.css';

const quoteDBURL =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [quote, setQuote] = useState(
    'Everything you’ve ever wanted is on the other side of fear.'
  );
  const [author, setAuthor] = useState('George Addair');
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [pageColor, setPageColor] = useState('#d86c70');

  const listPageColors = [
    '#76c4AE',
    '#d3d2b5',
    '#9fc2ba',
    '#cabd80',
    '#bee9e4',
    '#e1ceb1',
    '#7ce0f9',
    '#ddb0a0',
    '#caeccf',
    '#d86c70',
  ];

  const handleColors = () => {
    let randomInt = Math.floor(Math.random() * listPageColors.length);
    setPageColor(listPageColors[randomInt]);
  };

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  };

  useEffect(() => {
    fetchQuotes(quoteDBURL);
  }, []);

  const handleRandomQuote = () => {
    let randomInt = Math.floor(Math.random() * quotesArray.length);
    setRandomNumber(randomInt);
    setQuote(quotesArray[randomInt].quote);
    setAuthor(quotesArray[randomInt].author);
  };

  return (
    <div
      style={{ backgroundColor: pageColor, height: '100vh' }}
      className="transition-background duration-1000"
    >
      <div className="flex w-full items-center py-12 px-6 flex justify-center items-center">
        <div>
          <div
            id="quote-box"
            className="max-w-sm h-auto transition-all duration-300 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4  w-full"
          >
            <div>
              <h4
                id="text"
                className="text-gray-800 dark:text-gray-100 font-bold mb-3 transition-all duration-300"
              >
                {quote}
              </h4>
              <p
                className="text-gray-800 dark:text-gray-100 text-sm mb-9"
                id="author"
              >
                - {author}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-gray-800">
                <p className="text-xl dark:text-gray-100 hover:text-gray-400 transition-all duration-300">
                  <a
                    target={'_blank'}
                    rel={'noreferrer'}
                    href={encodeURI(
                      `https://twitter.com/intent/tweet?text=${quote} \n- ${author}`
                    )}
                    id="tweet-quote"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </p>
                <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-400 transition-all duration-300 text-white flex items-center justify-center hover:rotate-180 text-gray-700 hover:text-white"
                
                style={{ backgroundColor: pageColor}}
                >
                  <button
                    aria-label="generate new quote"
                    className="w-full h-full "
                    id="new-quote"
                    onClick={() => {
                      handleRandomQuote();
                      handleColors();
                    }}
                  >
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
