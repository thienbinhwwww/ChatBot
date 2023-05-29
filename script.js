// Lấy các phần tử HTML
const chatLog = document.getElementById('chat-log');
const userInputField = document.getElementById('user-input-field');
const sendButton = document.getElementById('send-button');

// Xử lý sự kiện khi người dùng gửi tin nhắn
function handleUserMessage() {
    const userMessage = userInputField.value;
    displayMessage(userMessage, 'user');

    // Xử lý tin nhắn và hiển thị phản hồi của chatbot
    const botResponse = getBotResponse(userMessage);
    displayMessage(botResponse, 'bot');

    // Xóa nội dung trong ô nhập tin nhắn
    userInputField.value = '';
}

// Hiển thị tin nhắn trong chat log
function displayMessage(message, sender) {
    const messageElement = document.createElement('li');
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
}

function getBotResponse(message) {
    fetch('https://api.npoint.io/0e4443cac201a977d3d2')
      .then(response => response.json())
      .then(data => {
        const matchedResponse = data.find(response => {
          return response.keywords.some(keyword => message.includes(keyword));
        });
  
        if (matchedResponse) {
          displayMessage(matchedResponse.response, 'bot');
        } else {
          displayMessage("Xin lỗi, tôi không hiểu. Bạn có thể giải thích rõ hơn được không?", 'bot');
        }
      })
      .catch(error => {
        console.log('Lỗi khi tải JSON:', error);
      });
  }
  


// Xử lý sự kiện khi người dùng nhấn nút Gửi
sendButton.addEventListener('click', handleUserMessage);

// Xử lý sự kiện khi người dùng nhấn phím Enter trong ô nhập tin nhắn
userInputField.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        handleUserMessage();
    }
});

