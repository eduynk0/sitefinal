document.addEventListener('DOMContentLoaded', () => {

  /**
   * Animação de fade-in e outras animações ao rolar a página
   * --------------------------------------
   */
  // Seleciona todos os elementos que devem ter animação de entrada (fade-in)
  const animatedElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null, // Observa em relação ao viewport
    rootMargin: '0px',
    threshold: 0.1 // Ativa quando 10% do elemento está visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Para de observar depois que a animação acontece
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  /**
   * Controle do Menu Mobile
   * --------------------------------------
   */
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    // Alterna o ícone do botão
    const icon = menuButton.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Fecha o menu ao clicar em um link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const icon = menuButton.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });

  /**
   * Controle das Abas (Tabs) da seção "4 Elementos"
   * --------------------------------------
   */
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const tabId = link.dataset.tab;

      tabLinks.forEach(l => l.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      link.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  /**
   * Player de Música Interativo
   * --------------------------------------
   */
  window.onload = () => {

/* ações para o carregamgento dinamico dos elementos da página */
    const song_img_el = document.getElementById('song-image');
    const song_title_el = document.getElementById('song-title');
    const song_artist_el = document.getElementById('song-artist');
    const song_next_up_el = document.getElementById('song-next-up');

/* ações para os botões */
    const play_btn = document.getElementById('play-btn');
    const play_btn_icon = document.getElementById('play-icon');
    const prev_btn = document.getElementById('prev-btn');
    const next_btn = document.getElementById('next-btn');

/* ações para o palyer */
const audio_player = document.getElementById('music-player');

let current_song_index;
let next_song_index;

let songs = [
    {
        title: 'Midnight Flow',
        artist: 'By Rodery',
        song_path:'music/music1.mp3',
        img_path: 'img/midnightflow.png'
    },
    {
        title: 'Urban Fire',
        artist: 'By Rodery',
        song_path: 'music/music2.mp3',
        img_path: 'img/urban.png'
    }

]

play_btn.addEventListener('click', TogglePlaySong);
next_btn.addEventListener('click', () => ChangeSong());
prev_btn.addEventListener('click', () => ChangeSong(false));

/* ação para iniciar o player */
InitPlayer();

function InitPlayer() {
    current_song_index = 0;
    next_song_index = current_song_index + 1;
    UpdatePlayer();
}

/* ação para atualizar o player */
function UpdatePlayer() {
    let song = songs[current_song_index];

    song_img_el.style = "background-image: url('" + song.img_path + "')";
    song_title_el.innerText = song.title;
    song_artist_el.innerText = song.artist;

    song_next_up_el.innerText = songs[next_song_index].title + " by " +  songs[next_song_index].artist;

    audio_player.src = song.song_path;
}

function TogglePlaySong() {
    if (audio_player.paused) {
        audio_player.play();
        play_btn_icon.classList.remove('fa-play');
        play_btn_icon.classList.add('fa-pause');
    } else {
        audio_player.pause();
        play_btn_icon.classList.add('fa-play');
        play_btn_icon.classList.remove('fa-pause');

    }
}

function ChangeSong (next = true ) {
    if (next) {
        current_song_index++;
        next_song_index = current_song_index +1;

        if (current_song_index > songs.length - 1) {
            current_song_index = 0;
            next_song_index = current_song_index + 1;
        }

        if (next_song_index > songs.length - 1) {
            next_song_index = 0;
        }
    } else {
        current_song_index--;
        next_song_index = current_song_index + 1;

        if (current_song_index < 0) {
            current_song_index = songs.length - 1;
            next_song_index = 0;
        }

    }

    UpdatePlayer();
    TogglePlaySong();
}

}
  /**
   * Sistema de Recomendações de Saúde Mental
   * --------------------------------------
   */
  const moodButtons = document.querySelectorAll('.mood-btn');
  const recommendationBox = document.getElementById('recommendation-box');

  const recommendations = {
    feliz: "Que ótimo! Para manter essa energia, ouça uma batida animada. Dance como se ninguém estivesse olhando. A música é uma celebração da vida!",
    triste: "Tudo bem não se sentir bem. Permita-se sentir. Coloque uma música mais calma, que te abrace. Lembre-se que, como uma faixa, os momentos ruins também passam.",
    estressado: "Respire fundo. O estresse pode ser aliviado com batidas constantes e um ritmo que te ajude a focar. Feche os olhos, concentre-se na música e deixe as preocupações de lado por um momento.",
    'sem-energia': "Precisando de um impulso? Coloque a batida mais forte que encontrar! Deixe o grave da música recarregar suas energias. Um bom som pode ser o melhor energético."
  };

  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      const mood = button.dataset.mood;
      
      // Atualiza a caixa de recomendação
      recommendationBox.innerHTML = `<p>${recommendations[mood]}</p>`;

      // Remove a classe 'active' de todos os botões
      moodButtons.forEach(btn => btn.classList.remove('active'));
      
      // Adiciona a classe 'active' ao botão clicado
      button.classList.add('active');
    });
  });
});