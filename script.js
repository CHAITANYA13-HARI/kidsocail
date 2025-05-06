const chatHistory = document.getElementById('chat-history');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const input = document.querySelector('#user-input');
const output = document.querySelector('#bot-output');

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      sendMessage();
    }
  });
function sendMessage() {
    const userMsg = chatInput.value;
    addMessage('user', userMsg);
    generateResponse(userMsg);
    chatInput.value = '';
  }
  function addMessage(sender, message) {
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', sender);
    const senderStr = sender.charAt(0).toUpperCase() + sender.slice(1);
    msgElement.innerHTML = `<strong>${senderStr}:</strong> ${message}`;
    chatHistory.appendChild(msgElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }



function generateResponse(userMsg) {
  let botMsg;
  if (userMsg.toLowerCase()==('hello') || userMsg.toLowerCase()==('hi')) {
    botMsg = 'Hello there!';
  }
  else if (userMsg.toLowerCase().includes('how are you') || userMsg.toLowerCase().includes('how are you?')) {
    botMsg = 'I AM FINE !';
  }
  else if (userMsg.toLowerCase().includes('fine')) {
    botMsg = 'How can i help you';
  }
  else if (userMsg.toLowerCase().includes('weather')) {
    const location = userMsg.split('weather')[1].trim();
    getWeatherData(location);
  }
  else if (userMsg.toLowerCase().includes('+')) {
    const operands = userMsg.split('+');
    const result = parseInt(operands[0]) + parseInt(operands[1]);
    botMsg = `The result is ${result}.`;
  } 
  else if(userMsg.toLowerCase().includes('news')){
  fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=(your key)')
  .then(response => response.json())
  .then(data => {
    const articles = data.articles;
          // display the first article to the user
          const title = articles[0].title;
          const description = articles[0].description;
          output.innerHTML = `${title}: ${description}`;
   
  });
  }

  else if (userMsg.toLowerCase().includes('-')) {
    const operands = userMsg.split('-');
    const result = parseInt(operands[0]) - parseInt(operands[1]);
    botMsg = `The result is ${result}.`;
  } 
  else if (userMsg.toLowerCase().includes('*')) {
    const operands = userMsg.split('*');
    const result = parseInt(operands[0]) * parseInt(operands[1]);
    botMsg = `The result is ${result}.`;
  } 
  else if (userMsg.toLowerCase().includes('/')) {
    const operands = userMsg.split('/');
    const result = parseInt(operands[0]) / parseInt(operands[1]);
    botMsg = `The result is ${result}.`;
  }
  
  else {
    botMsg = 'I did not understand your message.';
  }
  
  setTimeout(() => addMessage('bot', botMsg), 1000);
}

function getWeatherData(location) {
  const apiKey = 'your key';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const feelsLike = data.main.feels_like;
      const windSpeed = data.wind.speed;
      const message = `The weather in ${location} is ${weatherDescription}. The temperature is ${temperature}°C, but it feels like ${feelsLike}°C. The wind speed is ${windSpeed} m/s.`;
      addMessage('bot', message);
      
    })
    .catch(error => {
      const message = `Sorry, I couldn't retrieve the weather information for ${location}.`;
      addMessage('bot', message);
    });
}
