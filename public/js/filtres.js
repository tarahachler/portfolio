document.addEventListener('DOMContentLoaded', function() {
    const categorieFiltre = document.getElementById('categorie-filtre');
    const projets = document.querySelectorAll('.projet');
  
    categorieFiltre.addEventListener('change', function() {
      const categorieSelectionnee = this.value;
  
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
  