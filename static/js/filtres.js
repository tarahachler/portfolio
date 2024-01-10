document.addEventListener('DOMContentLoaded', function() {
    const filtres = document.getElementById('filtres');
    const boutonsFiltre = filtres.querySelectorAll('.categorie-filtre');
    const projets = document.querySelectorAll('.projet');
  
    boutonsFiltre.forEach(function(bouton) {
      bouton.addEventListener('click', function() {
        const categorieSelectionnee = this.getAttribute('data-category');
        boutonsFiltre.forEach(function(b) {
            b.classList.remove('active');
          });
        this.classList.add('active');
  
        projets.forEach(function(projet) {
          const categoriesProjet = projet.getAttribute('data-categories').split(' ');
  
          if (categorieSelectionnee === 'all' || categoriesProjet.includes(categorieSelectionnee)) {
            projet.style.display = 'block';
          } else {
            projet.style.display = 'none';
          }
        });
      });
    });
  });
  