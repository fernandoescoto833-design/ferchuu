
// ==========================================
// GAMEVERSE - JAVASCRIPT
// ==========================================


// ==========================================
// 1. MODO OSCURO / MODO CLARO
// ==========================================

const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('gameverse-theme');

if (savedTheme === 'light') {

    body.classList.add('light-mode');

    const icon = themeToggleBtn.querySelector('i');

    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');

}


themeToggleBtn.addEventListener('click', () => {

    body.classList.toggle('light-mode');

    const icon = themeToggleBtn.querySelector('i');

    if (body.classList.contains('light-mode')) {

        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');

        localStorage.setItem('gameverse-theme', 'light');

    } else {

        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');

        localStorage.setItem('gameverse-theme', 'dark');

    }

});


// ==========================================
// 2. BUSCADOR Y FILTROS
// ==========================================

const searchInput =
    document.getElementById('search-input');

const gameCards =
    document.querySelectorAll('#games-grid .card');

const filterButtons =
    document.querySelectorAll('.filter-btn');

let currentFilter = 'all';


function filterGames() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    gameCards.forEach(card => {

        const title =
            card.querySelector('h3')
                .textContent
                .toLowerCase();

        const category =
            card.dataset.category;

        const matchesSearch =
            title.includes(searchTerm);

        const matchesFilter =
            currentFilter === 'all' ||
            category === currentFilter;

        if (matchesSearch && matchesFilter) {

            card.style.display = 'block';

        } else {

            card.style.display = 'none';

        }

    });

}


searchInput.addEventListener(
    'input',
    filterGames
);


filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        currentFilter =
            button.dataset.filter;

        filterGames();

    });

});


// ==========================================
// 3. FAVORITOS
// ==========================================

const favoriteButtons =
    document.querySelectorAll('.btn-fav');

let favorites =
    JSON.parse(
        localStorage.getItem(
            'gameverse-favorites'
        )
    ) || [];


function updateFavoriteButtons() {

    favoriteButtons.forEach(button => {

        const card =
            button.closest('.card');

        if (!card) return;

        const title =
            card.querySelector('h3').textContent;

        const icon =
            button.querySelector('i');

        if (favorites.includes(title)) {

            icon.classList.remove(
                'fa-regular'
            );

            icon.classList.add(
                'fa-solid'
            );

            button.style.color =
                '#e74c3c';

        } else {

            icon.classList.remove(
                'fa-solid'
            );

            icon.classList.add(
                'fa-regular'
            );

            button.style.color = '';

        }

    });

}


favoriteButtons.forEach(button => {

    button.addEventListener('click', () => {

        const card =
            button.closest('.card');

        const title =
            card.querySelector('h3').textContent;

        if (favorites.includes(title)) {

            favorites =
                favorites.filter(
                    game => game !== title
                );

        } else {

            favorites.push(title);

        }

        localStorage.setItem(
            'gameverse-favorites',
            JSON.stringify(favorites)
        );

        updateFavoriteButtons();

        updateFavoritesSection();

    });

});


function updateFavoritesSection() {

    const favoritesGrid =
        document.getElementById(
            'favorites-grid'
        );

    if (!favoritesGrid) return;


    favoritesGrid.innerHTML = '';


    if (favorites.length === 0) {

        favoritesGrid.innerHTML = `

            <div class="empty-favorites">

                <i class="fa-regular fa-heart"></i>

                <h3>
                    Todavía no tienes favoritos
                </h3>

                <p>
                    Presiona el corazón ❤️ de cualquier
                    juego para agregarlo aquí.
                </p>

                <a
                    href="#catalogo"
                    class="btn btn-primary"
                >
                    Explorar videojuegos
                </a>

            </div>

        `;

        return;

    }


    gameCards.forEach(card => {

        const title =
            card.querySelector('h3').textContent;

        if (favorites.includes(title)) {

            const clone =
                card.cloneNode(true);

            const favoriteButton =
                clone.querySelector('.btn-fav');

            if (favoriteButton) {

                favoriteButton.addEventListener(
                    'click',
                    () => {

                        favorites =
                            favorites.filter(
                                game => game !== title
                            );

                        localStorage.setItem(
                            'gameverse-favorites',
                            JSON.stringify(favorites)
                        );

                        updateFavoriteButtons();

                        updateFavoritesSection();

                    }
                );

            }

            favoritesGrid.appendChild(clone);

        }

    });

}


updateFavoriteButtons();

updateFavoritesSection();


// ==========================================
// 4. RECOMENDADOR
// ==========================================

const recommendButtons =
    document.querySelectorAll(
        '.recommend-btn'
    );

const recommendationResult =
    document.getElementById(
        'recommendation-result'
    );


const recommendations = {

    accion: [
        'Cybernetic Frontier',
        'Cyber Strike',
        'Neon Warriors'
    ],

    rpg: [
        'Eldoria Saga',
        'Myth Realm',
        'Dragon Legacy'
    ],

    terror: [
        'Night Shift',
        'Dark Protocol'
    ],

    deportes: [
        'Nitro Drift Apex',
        'Velocity Rush'
    ]

};


recommendButtons.forEach(button => {

    button.addEventListener('click', () => {

        const genre =
            button.dataset.recommend;

        const games =
            recommendations[genre];

        const randomGame =
            games[
                Math.floor(
                    Math.random() * games.length
                )
            ];

        recommendationResult.innerHTML = `

            <i class="fa-solid fa-star text-neon"></i>

            <strong>
                ¡Te recomendamos jugar ${randomGame}!
            </strong>

            <br>

            <span>
                Esta selección fue elegida especialmente
                para el género que seleccionaste.
            </span>

        `;

    });

});


// ==========================================
// 5. QUIZ GAMER
// ==========================================

const quizQuestions = [

    {
        question:
            '¿Cuál de estos juegos pertenece al género Battle Royale?',

        options: [
            'Minecraft',
            'Fortnite',
            'FIFA',
            'The Sims'
        ],

        answer: 1
    },


    {
        question:
            '¿Qué empresa creó la consola PlayStation?',

        options: [
            'Microsoft',
            'Nintendo',
            'Sony',
            'SEGA'
        ],

        answer: 2
    },


    {
        question:
            '¿Cuál de estos juegos es un RPG?',

        options: [
            'Eldoria Saga',
            'Nitro Drift Apex',
            'Cybernetic Frontier',
            'Rocket League'
        ],

        answer: 0
    },


    {
        question:
            '¿Qué juego es conocido por sus bloques y construcción?',

        options: [
            'Minecraft',
            'Valorant',
            'FIFA',
            'Tekken'
        ],

        answer: 0
    },


    {
        question:
            '¿Cuál de estos es un juego de carreras?',

        options: [
            'Elden Ring',
            'Nitro Drift Apex',
            'Resident Evil',
            'League of Legends'
        ],

        answer: 1
    }

];


let currentQuestion = 0;

let quizScore = 0;


const questionElement =
    document.getElementById(
        'question'
    );

const optionsElement =
    document.getElementById(
        'options'
    );

const feedbackElement =
    document.getElementById(
        'quiz-feedback'
    );


function loadQuestion() {

    const question =
        quizQuestions[currentQuestion];

    questionElement.textContent =
        question.question;

    optionsElement.innerHTML = '';

    feedbackElement.textContent = '';


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    'button'
                );

            button.className =
                'quiz-btn';

            button.textContent =
                option;

            button.addEventListener(
                'click',
                () => {

                    checkQuizAnswer(
                        button,
                        index
                    );

                }
            );

            optionsElement.appendChild(
                button
            );

        }
    );

}


function checkQuizAnswer(
    button,
    selectedAnswer
) {

    const correctAnswer =
        quizQuestions[
            currentQuestion
        ].answer;


    const allButtons =
        document.querySelectorAll(
            '.quiz-btn'
        );


    allButtons.forEach(btn => {

        btn.disabled = true;

    });


    if (
        selectedAnswer ===
        correctAnswer
    ) {

        button.style.backgroundColor =
            '#2ecc71';

        button.style.color =
            '#fff';

        feedbackElement.textContent =
            '¡Correcto! +100 XP 🎯';

        feedbackElement.style.color =
            '#2ecc71';

        quizScore += 100;

    } else {

        button.style.backgroundColor =
            '#e74c3c';

        button.style.color =
            '#fff';

        allButtons[
            correctAnswer
        ].style.backgroundColor =
            '#2ecc71';

        allButtons[
            correctAnswer
        ].style.color =
            '#fff';

        feedbackElement.textContent =
            'Respuesta incorrecta ❌';

        feedbackElement.style.color =
            '#e74c3c';

    }


    setTimeout(() => {

        currentQuestion++;

        if (
            currentQuestion <
            quizQuestions.length
        ) {

            loadQuestion();

        } else {

            finishQuiz();

        }

    }, 1500);

}


function finishQuiz() {

    questionElement.textContent =
        '🏆 ¡Quiz terminado!';

    optionsElement.innerHTML = '';

    feedbackElement.textContent =
        `Obtuviste ${quizScore} XP de ${
            quizQuestions.length * 100
        } XP posibles.`;

    feedbackElement.style.color =
        'var(--primary-neon)';


    const restartButton =
        document.createElement(
            'button'
        );

    restartButton.className =
        'btn btn-primary';

    restartButton.textContent =
        '🔄 Jugar nuevamente';

    restartButton.style.marginTop =
        '20px';


    restartButton.addEventListener(
        'click',
        restartQuiz
    );


    optionsElement.appendChild(
        restartButton
    );

}


function restartQuiz() {

    currentQuestion = 0;

    quizScore = 0;

    loadQuestion();

}


loadQuestion();


// ==========================================
// 6. NAVEGACIÓN ACTIVA
// ==========================================

const navLinks =
    document.querySelectorAll(
        '.nav-links a'
    );


navLinks.forEach(link => {

    link.addEventListener(
        'click',
        () => {

            navLinks.forEach(item => {

                item.classList.remove(
                    'active'
                );

            });

            link.classList.add(
                'active'
            );

        }
    );

});
