const questions = [
  {
    question: '오늘 아침에 일어났을 때, 가장 먼저 느낀 감정은?',
    options: [
      { text: '무언가 시작할 준비가 된 기분이에요', value: 3 },
      { text: '그냥 평범하고 무난해요', value: 2 },
      { text: '조금 피곤하고 무기력해요', value: 1 },
      { text: '아무것도 하고 싶지 않아요', value: 0 }
    ]
  },
  {
    question: '친구와 대화할 때, 내 마음은 보통 어떤가요?',
    options: [
      { text: '재미있고 활기차게 이야기해요', value: 3 },
      { text: '대화는 편하지만 보통이에요', value: 2 },
      { text: '조용하게 듣는 쪽이에요', value: 1 },
      { text: '말하고 싶지 않아요', value: 0 }
    ]
  },
  {
    question: '하루를 마무리할 때 가장 많이 느끼는 감정은?',
    options: [
      { text: '성취감이 들어요', value: 3 },
      { text: '괜찮은 하루였어요', value: 2 },
      { text: '아쉬움이 남아요', value: 1 },
      { text: '지쳐서 쉬고 싶어요', value: 0 }
    ]
  },
  {
    question: '스트레스가 쌓였을 때, 나는 주로 어떻게 행동하나요?',
    options: [
      { text: '음악을 듣거나 산책해요', value: 3 },
      { text: '잠깐 쉬었다가 다시 해요', value: 2 },
      { text: '혼자 조용히 정리해요', value: 1 },
      { text: '모든 게 귀찮아져요', value: 0 }
    ]
  },
  {
    question: '앞으로의 계획을 생각하면 지금 내 마음은?',
    options: [
      { text: '설레고 기대돼요', value: 3 },
      { text: '조금 불안하지만 해볼 만해요', value: 2 },
      { text: '쉽게 결정되지 않아요', value: 1 },
      { text: '아예 손대고 싶지 않아요', value: 0 }
    ]
  }
];

const resultProfiles = [
  {
    title: '밝은 새벽',
    summary: '오늘은 마음이 가볍고 희망이 가득한 상태예요.',
    description:
      '당신은 현재 에너지가 충분하고, 삶의 작은 변화도 긍정적으로 받아들이는 편입니다. 주변 사람들과의 연결도 잘 되고 있어, 자신감 있게 앞으로 나아갈 수 있는 시기예요.',
    music: ['Aqua Timez - Alones', 'NewJeans - Hype Boy', 'LANY - ILYSB', 'Sia - Unstoppable'],
    youtube: '밝은 새벽 감성 음악'
  },
  {
    title: '잔잔한 오후',
    summary: '평온하지만 조금 더 깊은 위로가 필요한 순간이에요.',
    description:
      '지금은 안정감을 원하고, 자신의 감정을 차분히 다독이는 시간이 필요합니다. 조용한 휴식과 작은 성취가 마음을 단단하게 만들어 줄 거예요.',
    music: ['오아시스 - Wonderwall', '태연 - Fine', '볼빨간사춘기 - 나만, 봄', 'IU - Love Poem'],
    youtube: '잔잔한 오후 감성 플레이리스트'
  },
  {
    title: '비 오는 저녁',
    summary: '슬픔과 피로가 동시에 올라오는 날이지만, 회복의 가능성도 있어요.',
    description:
      '지금은 무기력함과 서운함이 겹쳐 느껴질 수 있습니다. 하지만 그 감정을 숨기지 않고 천천히 다뤄 나가면, 더 단단한 자신을 만나게 될 거예요.',
    music: ['Lauv - I Like Me Better', 'Yerin Baek - Love, maybe', '백예린 - Square', 'The 1975 - Somebody Else'],
    youtube: '비 오는 저녁 위로 음악'
  },
  {
    title: '별빛의 밤',
    summary: '마음이 많이 지쳐 있지만, 자신을 다시 안아줄 여유가 필요해요.',
    description:
      '지금 당신의 감정은 깊고 무거울 수 있지만, 그 자체가 특별한 신호예요. 혼자만의 시간을 갖고, 작고 따뜻한 것들에 기대면 마음이 조금씩 밝아질 수 있습니다.',
    music: ['BTS - Spring Day', 'Adele - Someone Like You', 'Mina Okabe - Moon River', 'John Mayer - Slow Dance in a Burning Room'],
    youtube: '별빛의 밤 위로 음악'
  }
];

let currentQuestion = 0;
let totalScore = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const progressText = document.getElementById('progress-text');
const progressPercent = document.getElementById('progress-percent');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const resultBox = document.getElementById('result-box');

function startQuiz() {
  currentQuestion = 0;
  totalScore = 0;
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestion];
  questionText.textContent = question.question;
  optionsContainer.innerHTML = '';

  const currentStep = currentQuestion + 1;
  progressText.textContent = `질문 ${currentStep} / ${questions.length}`;
  progressPercent.textContent = `${Math.round((currentStep / questions.length) * 100)}%`;
  progressBar.style.width = `${(currentStep / questions.length) * 100}%`;

  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option.text;
    button.addEventListener('click', () => handleAnswer(option.value));
    optionsContainer.appendChild(button);
  });
}

function handleAnswer(value) {
  totalScore += value;
  currentQuestion += 1;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  let resultIndex = 0;
  if (totalScore >= 12) {
    resultIndex = 0;
  } else if (totalScore >= 8) {
    resultIndex = 1;
  } else if (totalScore >= 4) {
    resultIndex = 2;
  } else {
    resultIndex = 3;
  }

  const profile = resultProfiles[resultIndex];

  resultBox.className = 'result-box';
  resultBox.innerHTML = `
    <h3>${profile.title}</h3>
    <p><strong>${profile.summary}</strong></p>
    <p>${profile.description}</p>
    <h4>추천 음악 4곡</h4>
    <ul>
      ${profile.music.map((track) => `<li>${track}</li>`).join('')}
    </ul>
    <div class="result-actions">
      <a class="result-link" href="https://www.youtube.com/results?search_query=${encodeURIComponent(profile.youtube)}" target="_blank" rel="noopener noreferrer">
        <button type="button">유튜브에서 듣기</button>
      </a>
    </div>
  `;
}

function restart() {
  startQuiz();
}
