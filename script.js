class PersonalityQuiz {
    constructor() {
        this.questions = [
            {
                question: "How do you usually spend your free time?",
                options: [
                    "Exploring new hobbies or ideas (e.g., painting, reading philosophy)",
                    "Organizing or planning for the week ahead",
                    "Hanging out with friends or going out"
                ],
                traits: {
                    A: { openness: 2, conscientiousness: 0, extraversion: 0 },
                    B: { openness: 0, conscientiousness: 2, extraversion: 0 },
                    C: { openness: 0, conscientiousness: 0, extraversion: 2 }
                }
            },
            {
                question: "When working in a team, you tend to:",
                options: [
                    "Offer creative suggestions and outside-the-box thinking",
                    "Take charge of tasks and ensure deadlines are met",
                    "Keep the mood light and make everyone feel comfortable"
                ],
                traits: {
                    A: { openness: 2, conscientiousness: 0, agreeableness: 0 },
                    B: { openness: 0, conscientiousness: 2, agreeableness: 0 },
                    C: { openness: 0, conscientiousness: 0, agreeableness: 2, extraversion: 1 }
                }
            },
            {
                question: "How do you react to stress?",
                options: [
                    "Try to reframe the situation or distract yourself",
                    "Worry a lot and may feel overwhelmed",
                    "Stay calm and deal with it logically"
                ],
                traits: {
                    A: { openness: 1, neuroticism: -1 },
                    B: { neuroticism: 2 },
                    C: { conscientiousness: 1, neuroticism: -1 }
                }
            },
            {
                question: "You're faced with a tough decision. You:",
                options: [
                    "Trust your gut or imagination",
                    "Make a pros and cons list and stick to it",
                    "Ask others for input and try to keep everyone happy"
                ],
                traits: {
                    A: { openness: 2, conscientiousness: -1 },
                    B: { conscientiousness: 2, openness: -1 },
                    C: { agreeableness: 2, extraversion: 1 }
                }
            },
            {
                question: "Your room or workspace is usually:",
                options: [
                    "Filled with creative or interesting items, not always tidy",
                    "Very neat and well-organized",
                    "Comfortable and lived-in, somewhat clean"
                ],
                traits: {
                    A: { openness: 2, conscientiousness: -1 },
                    B: { conscientiousness: 2, openness: -1 },
                    C: { agreeableness: 1, extraversion: 0 }
                }
            },
            {
                question: "At a party, you are:",
                options: [
                    "Talking about unusual or deep topics with a few people",
                    "Helping the host or managing logistics",
                    "Chatting with everyone, making jokes"
                ],
                traits: {
                    A: { openness: 2, extraversion: 0 },
                    B: { conscientiousness: 2, extraversion: 0 },
                    C: { extraversion: 2, agreeableness: 1 }
                }
            },
            {
                question: "How do you handle disagreement?",
                options: [
                    "Debate passionately if needed",
                    "Try to avoid confrontation and stay neutral",
                    "Smooth things over and maintain harmony"
                ],
                traits: {
                    A: { openness: 1, agreeableness: -1 },
                    B: { neuroticism: 1, agreeableness: 1 },
                    C: { agreeableness: 2, extraversion: 1 }
                }
            },
            {
                question: "Do you prefer:",
                options: [
                    "Variety and change",
                    "Routine and predictability",
                    "Whatever keeps you connected to others"
                ],
                traits: {
                    A: { openness: 2, conscientiousness: -1 },
                    B: { conscientiousness: 2, openness: -1 },
                    C: { agreeableness: 1, extraversion: 1 }
                }
            },
            {
                question: "How would friends describe you?",
                options: [
                    "Creative and insightful",
                    "Reliable and responsible",
                    "Friendly and cheerful"
                ],
                traits: {
                    A: { openness: 2, agreeableness: 0 },
                    B: { conscientiousness: 2, agreeableness: 1 },
                    C: { agreeableness: 2, extraversion: 2 }
                }
            },
            {
                question: "When faced with a challenge, you:",
                options: [
                    "Try a new approach, even if it's risky",
                    "Stick to what's worked in the past",
                    "Seek help or support from others"
                ],
                traits: {
                    A: { openness: 2, conscientiousness: -1 },
                    B: { conscientiousness: 1, openness: -1 },
                    C: { agreeableness: 2, extraversion: 1 }
                }
            }
        ];

        this.currentQuestion = 0;
        this.answers = [];
        this.scores = {
            openness: 0,
            conscientiousness: 0,
            extraversion: 0,
            agreeableness: 0,
            neuroticism: 0
        };

        this.initializeElements();
        this.bindEvents();
        this.showQuestion();
    }

    initializeElements() {
        this.questionElement = document.getElementById('question');
        this.optionsElement = document.getElementById('options');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.quizContainer = document.getElementById('quizContainer');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.resultsSummary = document.getElementById('resultsSummary');
        this.detailedResults = document.getElementById('detailedResults');
        this.retakeBtn = document.getElementById('retakeBtn');
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.retakeBtn.addEventListener('click', () => this.retakeQuiz());
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        
        this.questionElement.textContent = `${this.currentQuestion + 1}. ${question.question}`;
        this.optionsElement.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.option = String.fromCharCode(65 + index); // A, B, C
            
            optionElement.innerHTML = `
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            `;

            // Check if this option was previously selected
            if (this.answers[this.currentQuestion] === String.fromCharCode(65 + index)) {
                optionElement.classList.add('selected');
            }

            optionElement.addEventListener('click', () => this.selectOption(optionElement));
            this.optionsElement.appendChild(optionElement);
        });

        this.updateProgress();
        this.updateNavigation();
    }

    selectOption(optionElement) {
        // Remove selection from all options
        this.optionsElement.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Add selection to clicked option
        optionElement.classList.add('selected');
        
        // Store the answer
        this.answers[this.currentQuestion] = optionElement.dataset.option;
        
        // Enable next button
        this.nextBtn.disabled = false;
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
        } else {
            this.calculateResults();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;
    }

    updateNavigation() {
        this.prevBtn.disabled = this.currentQuestion === 0;
        
        // Enable next button if current question is answered
        const isAnswered = this.answers[this.currentQuestion] !== undefined;
        this.nextBtn.disabled = !isAnswered;
        
        if (this.currentQuestion === this.questions.length - 1) {
            this.nextBtn.textContent = 'Get Results';
        } else {
            this.nextBtn.textContent = 'Next';
        }
    }

    calculateResults() {
        // Reset scores
        this.scores = {
            openness: 0,
            conscientiousness: 0,
            extraversion: 0,
            agreeableness: 0,
            neuroticism: 0
        };

        // Calculate scores based on answers
        this.answers.forEach((answer, questionIndex) => {
            const question = this.questions[questionIndex];
            const traits = question.traits[answer];
            
            if (traits) {
                Object.keys(traits).forEach(trait => {
                    this.scores[trait] += traits[trait];
                });
            }
        });

        // Normalize scores to 0-100 scale
        const maxPossibleScore = 20; // Maximum possible score for any trait
        Object.keys(this.scores).forEach(trait => {
            this.scores[trait] = Math.max(0, Math.min(100, ((this.scores[trait] + maxPossibleScore) / (2 * maxPossibleScore)) * 100));
        });

        this.showResults();
    }

    showResults() {
        // Hide quiz, show results
        this.quizContainer.style.display = 'none';
        this.resultsContainer.style.display = 'block';

        // Find dominant traits
        const sortedTraits = Object.entries(this.scores)
            .sort(([,a], [,b]) => b - a);

        const [dominantTrait, dominantScore] = sortedTraits[0];
        const [secondaryTrait, secondaryScore] = sortedTraits[1];

        // Generate results summary
        const traitNames = {
            openness: 'Openness to Experience',
            conscientiousness: 'Conscientiousness',
            extraversion: 'Extraversion',
            agreeableness: 'Agreeableness',
            neuroticism: 'Neuroticism'
        };

        const traitDescriptions = {
            openness: 'You\'re imaginative, curious, and value creativity. You enjoy thinking deeply, exploring new ideas, and embracing change.',
            conscientiousness: 'You\'re organized, reliable, and goal-driven. You like structure, planning, and take responsibilities seriously.',
            extraversion: 'You\'re outgoing, warm, and value relationships. You tend to be empathetic, cooperative, and enjoy social situations.',
            agreeableness: 'You\'re compassionate, trusting, and cooperative. You value harmony and tend to be helpful and considerate of others.',
            neuroticism: 'You experience emotions intensely and may be more sensitive to stress. You tend to worry more and experience mood swings.'
        };

        this.resultsSummary.innerHTML = `
            <h3>Your Primary Trait: ${traitNames[dominantTrait]}</h3>
            <p>${traitDescriptions[dominantTrait]}</p>
        `;

        // Generate detailed results
        this.detailedResults.innerHTML = sortedTraits.map(([trait, score]) => `
            <div class="trait-result">
                <div class="trait-name">${traitNames[trait]} - ${Math.round(score)}%</div>
                <div class="trait-description">${traitDescriptions[trait]}</div>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${score}%"></div>
                </div>
            </div>
        `).join('');
    }

    retakeQuiz() {
        // Reset quiz state
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = {
            openness: 0,
            conscientiousness: 0,
            extraversion: 0,
            agreeableness: 0,
            neuroticism: 0
        };

        // Show quiz, hide results
        this.quizContainer.style.display = 'flex';
        this.resultsContainer.style.display = 'none';

        // Show first question
        this.showQuestion();
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PersonalityQuiz();
});
