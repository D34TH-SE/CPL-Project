const API_KEY = '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'

const content = document.getElementById('content');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

let isAnswerLoading = false;
let answerSectionID = 0;

sendButton.addEventListener('click', () => handlesendMessage());
chatInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        handlesendMessage();
    }
})

function handlesendMessage() {
    const question = chatInput.value.trim();
    
    addQuestionSection(question)
}

function getAnswer(question){
    const fetchData = 
        fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`, // Replace with your OpenRouter API key
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-r1-distill-llama-70b:free",
                "messages": [
                    {
                        "role": "user",
                        "content": question
                    }
                ],
            })
        });

fetchData.then(response => response.json())
    .then(data => {
        //Response Message
        const resultData = data.choices[0].message.content;
        isAnswerLoading = false;
        addAnswerSection(resultData);
    })

}


function addQuestionSection(message) {
    isAnswerLoading = true;
    const sectionElement = document.createElement('section');
    sectionElement.className = 'question-section';
    sectionElement.textContent = message;

    content.appendChild(sectionElement);
    //Answer section
    addAnswerSection(message)
}

function addAnswerSection(message) {
    if (isAnswerLoading) {
        //Increment answer section ID for tracking
        answerSectionID++;
        const sectionElement = document.createElement('section');
        sectionElement.className = 'answer-section';
        sectionElement.innerHTML =  getLoadingSvg();
        sectionElement.id = answerSectionID;

        content.appendChild(sectionElement);
        getAnswer(message)
    } else {

    }
    
}

function getLoadingSvg() {
    return `<svg style= "height: 25px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>`
}